import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { products, PRODUCT_FORMS } from "../data/products.js";
import { SITE, whatsappLink, WHATSAPP_MESSAGES } from "../data/siteConfig.js";
import { enquiryStore } from "../store/enquiryStore.js";
import Reveal from "./Reveal.jsx";
import { Icon } from "./icons.jsx";

const initialForm = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  product: "",
  form: "",
  quantity: "",
  grade: "",
  packaging: "",
  destCountry: "",
  destPort: "",
  timeline: "",
  shipmentTerms: "",
  documentation: "",
  privateLabel: "",
  sample: "",
  additional: "",
};

function Field({ id, label, ...rest }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...rest} />
    </div>
  );
}

export default function QuoteForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const unsubscribe = enquiryStore.subscribe((product) => {
      setForm((prev) => ({ ...prev, product }));
    });
    const current = enquiryStore.getProduct();
    if (current) setForm((prev) => ({ ...prev, product: current }));
    return unsubscribe;
  }, []);

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const summary = [
      "New B2B enquiry from sevenkncglobalexim.in",
      `Name: ${form.fullName}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Country: ${form.country}`,
      `Product: ${form.product}`,
      `Form: ${form.form}`,
      `Quantity: ${form.quantity}`,
      `Grade/Spec: ${form.grade}`,
      `Packaging: ${form.packaging}`,
      `Destination: ${form.destCountry}${form.destPort ? ` / ${form.destPort}` : ""}`,
      `Timeline: ${form.timeline}`,
      `Shipment terms: ${form.shipmentTerms}`,
      `Documentation: ${form.documentation}`,
      `Private label: ${form.privateLabel}`,
      `Samples: ${form.sample}`,
      `Additional: ${form.additional}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(summary), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="section" id="quote">
      <div className="container">
        <div className="quote__grid">
          <Reveal className="quote__side">
            <span className="eyebrow">Request a Quote</span>
            <h2>Get a Quote for Your B2B Requirement</h2>
            <p>
              Share your product, quantity and destination details. Our team will review your
              requirements and get back to you with suitable options.
            </p>
            <ul className="quote__contact-card">
              <li>
                <span className="quote__contact-icon">
                  <Icon name="phone" size={17} />
                </span>
                <span>
                  <strong style={{ display: "block", fontSize: "0.78rem", color: "var(--muted)" }}>
                    Phone
                  </strong>
                  <a href={`tel:${SITE.phoneE164}`}>{SITE.phoneDisplay}</a>
                </span>
              </li>
              <li>
                <span className="quote__contact-icon">
                  <Icon name="whatsapp" size={17} />
                </span>
                <span>
                  <strong style={{ display: "block", fontSize: "0.78rem", color: "var(--muted)" }}>
                    WhatsApp
                  </strong>
                  <a href={whatsappLink(WHATSAPP_MESSAGES.contact)} target="_blank" rel="noopener noreferrer">
                    {SITE.phoneDisplay}
                  </a>
                </span>
              </li>
              <li>
                <span className="quote__contact-icon">
                  <Icon name="email" size={17} />
                </span>
                <span>
                  <strong style={{ display: "block", fontSize: "0.78rem", color: "var(--muted)" }}>
                    Email
                  </strong>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </span>
              </li>
              <li>
                <span className="quote__contact-icon">
                  <Icon name="location" size={17} />
                </span>
                <span>
                  <strong style={{ display: "block", fontSize: "0.78rem", color: "var(--muted)" }}>
                    Office
                  </strong>
                  {SITE.addressLines[0]}
                </span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={1}>
            {submitted ? (
              <div className="quote-form">
                <div className="quote-form__success">
                  <span className="quote-form__success-icon">
                    <Icon name="circle-check" size={34} />
                  </span>
                  <h3>Thank You</h3>
                  <p>
                    Your enquiry has been received. Our team will review your requirements and get
                    back to you.
                  </p>
                  <button className="btn btn--outline" onClick={() => setSubmitted(false)}>
                    Send Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form className="quote-form" onSubmit={handleSubmit} aria-label="Request a quote">
                <div className="quote-form__grid">
                  <Field
                    id="fullName"
                    label="Full Name *"
                    required
                    value={form.fullName}
                    onChange={update("fullName")}
                  />
                  <Field
                    id="company"
                    label="Company Name"
                    value={form.company}
                    onChange={update("company")}
                  />
                  <Field
                    id="email"
                    label="Email *"
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                  />
                  <Field
                    id="phone"
                    label="WhatsApp / Phone *"
                    required
                    value={form.phone}
                    onChange={update("phone")}
                  />
                  <Field
                    id="buyerCountry"
                    label="Country"
                    value={form.country}
                    onChange={update("country")}
                  />

                  <div>
                    <label htmlFor="product">Product Required</label>
                    <select id="product" name="product" value={form.product} onChange={update("product")}>
                      <option value="">Select product</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="form">Product Form</label>
                    <select id="form" name="form" value={form.form} onChange={update("form")}>
                      <option value="">Select form</option>
                      {PRODUCT_FORMS.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <Field
                    id="quantity"
                    label="Required Quantity"
                    value={form.quantity}
                    onChange={update("quantity")}
                  />
                  <Field
                    id="grade"
                    label="Grade / Specification"
                    value={form.grade}
                    onChange={update("grade")}
                  />
                  <Field
                    id="packaging"
                    label="Preferred Packaging"
                    value={form.packaging}
                    onChange={update("packaging")}
                  />
                  <Field
                    id="destCountry"
                    label="Destination Country"
                    value={form.destCountry}
                    onChange={update("destCountry")}
                  />
                  <Field
                    id="destPort"
                    label="Destination Port"
                    value={form.destPort}
                    onChange={update("destPort")}
                  />
                  <Field
                    id="timeline"
                    label="Expected Delivery Timeline"
                    value={form.timeline}
                    onChange={update("timeline")}
                  />
                  <Field
                    id="shipmentTerms"
                    label="Preferred Shipment Terms"
                    value={form.shipmentTerms}
                    onChange={update("shipmentTerms")}
                  />
                  <Field
                    id="documentation"
                    label="Documentation / Compliance Requirements"
                    value={form.documentation}
                    onChange={update("documentation")}
                  />
                  <Field
                    id="privateLabel"
                    label="Private Label Requirement"
                    value={form.privateLabel}
                    onChange={update("privateLabel")}
                  />
                  <Field
                    id="sample"
                    label="Sample Requirement"
                    value={form.sample}
                    onChange={update("sample")}
                  />

                  <div className="quote-form__field--full">
                    <label htmlFor="additional">Additional Requirements</label>
                    <textarea
                      id="additional"
                      name="additional"
                      value={form.additional}
                      onChange={update("additional")}
                    />
                  </div>
                </div>

                <div className="quote-form__submit">
                  <button type="submit" className="btn btn--primary btn--block">
                    Submit Enquiry <Icon name="arrow" size={16} />
                  </button>
                </div>
                <p style={{ fontSize: "0.78rem", color: "var(--muted)", marginTop: "14px" }}>
                  For faster assistance, send the enquiry directly on{" "}
                  <a
                    href={whatsappLink(WHATSAPP_MESSAGES.contact)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--primary)", fontWeight: 600 }}
                  >
                    WhatsApp <FaWhatsapp size={12} style={{ verticalAlign: "-2px" }} />
                  </a>
                  .
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
