import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const port = process.env.PORT || 3000;
const host = "0.0.0.0";
const distDirectory = fileURLToPath(new URL("./dist/", import.meta.url));
const vCardDirectory = fileURLToPath(new URL("./src/assets/products/", import.meta.url));

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".vcf": "text/vcard; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function getStoredVCardFilePath() {
  const filePath = join(vCardDirectory, "SevenKNC-Visiting-Card.vcf");
  return existsSync(filePath) ? filePath : null;
}

function getVisitingCardPage(vCardDownloadUrl) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SevenKNC Visiting Card</title>
    <style>
      :root {
        --primary: #1a56db;
        --primary-dark: #1040a0;
        --dark: #0c1929;
        --white: #ffffff;
        --cream: #f0f5ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #edf4ff, #f7fafc);
        color: var(--dark);
        display: grid;
        place-items: center;
        min-height: 100vh;
      }
      .card {
        width: min(680px, calc(100% - 32px));
        background: var(--white);
        border-radius: 22px;
        box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
        padding: 28px;
      }
      .brand {
        color: var(--primary-dark);
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 8px;
      }
      .subtitle {
        color: #475569;
        margin-bottom: 22px;
      }
      .content {
        display: grid;
        grid-template-columns: 1.05fr 0.95fr;
        gap: 24px;
        align-items: center;
      }
      .details {
        display: grid;
        gap: 10px;
        font-size: 0.98rem;
        line-height: 1.6;
      }
      .details strong { color: var(--primary-dark); }
      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 18px;
        border-radius: 10px;
        background: var(--primary);
        color: var(--white);
        text-decoration: none;
        font-weight: 600;
      }
      .btn.secondary {
        background: var(--cream);
        color: var(--primary-dark);
        margin-left: 10px;
      }
      .qr {
        text-align: center;
      }
      .qr img {
        width: min(220px, 100%);
        border: 10px solid #eff6ff;
        border-radius: 18px;
        background: #fff;
      }
      @media (max-width: 640px) {
        .content { grid-template-columns: 1fr; }
        .actions { display: grid; }
        .btn.secondary { margin-left: 0; margin-top: 10px; }
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="brand">SevenKNC Global Exim</div>
      <div class="subtitle">Business Contact Card</div>
      <div class="content">
        <div class="details">
          <div><strong>Name:</strong> Kulashree Chittevan</div>
          <div><strong>Phone:</strong> +91 7499449790</div>
          <div><strong>WhatsApp:</strong> +91 7499449790</div>
          <div><strong>Email:</strong> sevenknc.globalexim@gmail.com</div>
          <div><strong>Office:</strong> A1707, R16, Life Republic Township, Near Gaikwad Nagar, Jambe, Pune 411033, Maharashtra, India</div>
          <div><strong>Website:</strong> https://sevenkncglobalexim.com/</div>
          <div class="actions">
            <a class="btn" href="${vCardDownloadUrl}">Download vCard</a>
            <a class="btn secondary" href="/">Back to website</a>
          </div>
        </div>
        <div class="qr">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(vCardDownloadUrl)}" alt="SevenKNC visiting card QR code" />
        </div>
      </div>
    </div>
  </body>
</html>`;
}

function getFilePath(requestUrl) {
  const requestedPath = decodeURIComponent(requestUrl.split("?")[0]);
  const relativePath = normalize(requestedPath).replace(/^([/\\])+/, "");
  const filePath = join(distDirectory, relativePath);

  return filePath.startsWith(distDirectory) ? filePath : null;
}

const server = createServer((request, response) => {
  const requestUrl = request.url || "/";
  const pathname = decodeURIComponent(requestUrl.split("?")[0]);

  if (pathname === "/visiting-card" || pathname === "/visiting-card/") {
    const protocol = request.headers["x-forwarded-proto"] || "http";
    const hostHeader = request.headers.host || `localhost:${port}`;
    const vCardDownloadUrl = `${protocol}://${hostHeader}/visiting-card.vcf`;

    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(getVisitingCardPage(vCardDownloadUrl));
    return;
  }

  if (pathname === "/visiting-card.vcf") {
    const vCardFilePath = getStoredVCardFilePath();

    if (!vCardFilePath) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Visiting card file not found.");
      return;
    }

    response.writeHead(200, {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": "attachment; filename=SevenKNC-Visiting-Card.vcf",
    });
    createReadStream(vCardFilePath).pipe(response);
    return;
  }

  const filePath = getFilePath(requestUrl);
  const requestedFile = filePath && existsSync(filePath) && statSync(filePath).isFile() ? filePath : join(distDirectory, "index.html");

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