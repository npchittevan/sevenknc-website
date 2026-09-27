import { NextResponse } from "next/server";
import { sendEmail } from "../../../server/email";
import { query } from "../../../server/db";

export const runtime = "nodejs";

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
] as const;

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export async function POST(request: Request) {
  const recipient = process.env.CONTACT_FORM_RECIPIENT_EMAIL;
  if (!recipient) {
    // Fail closed — sending to nowhere would silently drop submissions.
    console.error("email.contact_form.recipient_unset");
    return NextResponse.json({ ok: false, error: "email not configured" }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid request body" }, { status: 400 });
  }

  const fields: Record<string, string> = {};
  for (const [key] of ENQUIRY_FIELDS) {
    const value = body?.[key];
    if (value == null) continue;
    fields[key] = String(value).slice(0, 2000).trim();
  }

  // Persist to the admin panel's inquiry list — best effort; a DB
  // hiccup must not block the notification email below.
  try {
    await query(
      `INSERT INTO inquiries (name, company, email, phone, country, product, subject, message, payload)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fields.fullName || "Unknown",
        fields.company || null,
        fields.email || "no-email@provided",
        fields.phone || null,
        fields.country || fields.destCountry || null,
        fields.product || null,
        [fields.product, fields.quantity].filter(Boolean).join(" — ") || "Website enquiry",
        fields.additional || null,
        JSON.stringify(fields),
      ],
    );
  } catch (error) {
    console.error("inquiry.persist.failed", error);
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
          fields[key]!,
        ).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")}</table>`;

  try {
    const { messageId } = await sendEmail({
      to: recipient,
      replyTo: fields.email || undefined,
      subject: `New B2B enquiry — ${[fields.fullName, fields.product].filter(Boolean).join(" — ") || "Website"}`,
      text,
      html,
    });
    console.log("email.send.ok", { messageId, to: recipient });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("email.send.failed", error);
    return NextResponse.json({ ok: false, error: "email send failed" }, { status: 502 });
  }
}

export function GET() {
  return NextResponse.json({ ok: false, error: "method not allowed" }, { status: 405 });
}
