import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

// Local development only: load env vars from .env.local (gitignored).
// On the server, real environment variables take precedence via process.env.
try {
  process.loadEnvFile?.(".env.local");
} catch {
  // .env.local not present — use server environment variables.
}

const port = process.env.PORT || 3000;
const host = "0.0.0.0";
const outDirectory = fileURLToPath(new URL("./out/", import.meta.url));

// ---------------------------------------------------------------------------
// Enquiry email endpoint (POST /api/enquiry)
// SMTP credentials come from server environment variables — never committed.
// Required env vars: SMTP_USER, SMTP_PASS, MAIL_TO
// Optional env vars: SMTP_HOST, SMTP_PORT, SMTP_SECURE, MAIL_FROM
// ---------------------------------------------------------------------------
const ENQUIRY_PATH = "/api/enquiry";
const MAX_BODY_BYTES = 64 * 1024;

const smtp = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT || 465),
  secure: (process.env.SMTP_SECURE || "true") !== "false",
  user: process.env.SMTP_USER || "",
  // Gmail app passwords may be pasted with spaces; strip them.
  pass: (process.env.SMTP_PASS || "").replace(/\s+/g, ""),
};

const mailTo = process.env.MAIL_TO || smtp.user;
const mailFrom = process.env.MAIL_FROM || `"SevenKNC Website" <${smtp.user}>`;

// nodemailer is imported lazily so server.js starts even when node_modules
// is absent on the server (static files keep serving; email endpoint
// degrades to a graceful 503 instead of crashing the whole app).
let transporterPromise = null;
function getTransporter() {
  if (!smtp.user || !smtp.pass) return Promise.resolve(null);
  if (!transporterPromise) {
    transporterPromise = import("nodemailer")
      .then(({ default: nodemailer }) =>
        nodemailer.createTransport({
          host: smtp.host,
          port: smtp.port,
          secure: smtp.secure,
          auth: { user: smtp.user, pass: smtp.pass },
        }),
      )
      .catch((error) => {
        console.error("nodemailer unavailable:", error);
        return null;
      });
  }
  return transporterPromise;
}

const ENQUIRY_FIELDS = [
  ["fullName", "Name"],
  ["company", "Company"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["country", "Country"],
  ["product", "Product"],
  ["form", "Product Form"],
  ["quantity", "Quantity"],
  ["grade", "Grade/Spec"],
  ["packaging", "Packaging"],
  ["destCountry", "Destination Country"],
  ["destPort", "Destination Port"],
  ["timeline", "Timeline"],
  ["shipmentTerms", "Shipment Terms"],
  ["documentation", "Documentation"],
  ["privateLabel", "Private Label"],
  ["sample", "Samples"],
  ["additional", "Additional Requirements"],
];

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
  );

function sanitizeFields(body) {
  const fields = {};
  for (const [key] of ENQUIRY_FIELDS) {
    const value = body?.[key];
    if (value == null) continue;
    fields[key] = String(value).slice(0, 2000).trim();
  }
  return fields;
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("payload too large"));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"));
      } catch (error) {
        reject(error);
      }
    });
    request.on("error", reject);
  });
}

async function handleEnquiry(request, response) {
  const send = (status, payload) => {
    response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify(payload));
  };

  if (request.method !== "POST") return send(405, { ok: false, error: "method not allowed" });
  if (!mailTo) return send(503, { ok: false, error: "email not configured" });
  const transporter = await getTransporter();
  if (!transporter) return send(503, { ok: false, error: "email not configured" });

  let fields;
  try {
    fields = sanitizeFields(await readJsonBody(request));
  } catch {
    return send(400, { ok: false, error: "invalid request body" });
  }

  const rows = ENQUIRY_FIELDS.filter(([key]) => fields[key]);
  const text = [
    "New B2B enquiry from sevenkncglobalexim.com",
    "",
    ...rows.map(([key, label]) => `${label}: ${fields[key]}`),
  ].join("\n");
  const html = `<h2>New B2B enquiry</h2><table cellpadding="6" cellspacing="0" border="0">${rows
    .map(
      ([key, label]) =>
        `<tr><td style="vertical-align:top"><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(
          fields[key],
        ).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")}</table>`;

  try {
    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: fields.email || undefined,
      subject: `New B2B enquiry — ${[fields.fullName, fields.product].filter(Boolean).join(" — ") || "Website"}`,
      text,
      html,
    });
    send(200, { ok: true });
  } catch (error) {
    console.error("Enquiry email failed:", error);
    send(502, { ok: false, error: "email send failed" });
  }
}

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".vcf": "text/vcard; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function resolveFile(requestUrl) {
  const requestedPath = decodeURIComponent(requestUrl.split("?")[0]);
  const relativePath = normalize(requestedPath).replace(/^([/\\])+/, "");
  const basePath = join(outDirectory, relativePath);

  if (!basePath.startsWith(outDirectory)) return null;

  const candidates = [basePath, join(basePath, "index.html"), `${basePath}.html`];
  return candidates.find((p) => existsSync(p) && statSync(p).isFile()) || null;
}

const server = createServer((request, response) => {
  const pathname = decodeURIComponent((request.url || "/").split("?")[0]);

  if (pathname === ENQUIRY_PATH || pathname === `${ENQUIRY_PATH}/`) {
    handleEnquiry(request, response);
    return;
  }

  const requestedFile = resolveFile(request.url || "/") || join(outDirectory, "index.html");

  if (!existsSync(requestedFile)) {
    response.writeHead(503, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Build output not found. Run npm run build first.");
    return;
  }

  response.writeHead(200, {
    "Content-Type": contentTypes[extname(requestedFile)] || "application/octet-stream",
  });
  createReadStream(requestedFile).pipe(response);
});

server.listen(port, host, () => {
  console.log(`SevenKNC server listening on ${host}:${port}`);
});
