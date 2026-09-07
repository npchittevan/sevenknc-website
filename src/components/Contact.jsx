import { FaWhatsapp } from "react-icons/fa6";
import { SITE, whatsappLink, WHATSAPP_MESSAGES } from "../data/siteConfig.js";
import Reveal from "./Reveal.jsx";
import { Icon } from "./icons.jsx";

export default function Contact() {
  return (
    <section className="section section--cream" id="contact">
      <div className="container">
        <div className="contact__grid">
          <Reveal className="contact__info">
            <h2>{SITE.name}</h2>
            <p className="contact__sub">Pune, Maharashtra, India — servicing global B2B buyers.</p>

            <div className="contact__rows">
              <div className="contact__row">
                <span className="contact__row-icon">
                  <Icon name="phone" size={17} />
                </span>
                <span>
                  <strong>Phone</strong>
                  <a href={`tel:${SITE.phoneE164}`}>{SITE.phoneDisplay}</a>
                </span>
              </div>
              <div className="contact__row">
                <span className="contact__row-icon">
                  <Icon name="whatsapp" size={17} />
                </span>
                <span>
                  <strong>WhatsApp</strong>
                  <a href={whatsappLink(WHATSAPP_MESSAGES.contact)} target="_blank" rel="noopener noreferrer">
                    {SITE.phoneDisplay}
                  </a>
                </span>
              </div>
              <div className="contact__row">
                <span className="contact__row-icon">
                  <Icon name="email" size={17} />
                </span>
                <span>
                  <strong>Email</strong>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </span>
              </div>
              <div className="contact__row">
                <span className="contact__row-icon">
                  <Icon name="location" size={17} />
                </span>
                <span>
                  <strong>Office</strong>
                  {SITE.addressLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </span>
              </div>
            </div>

            <div className="contact__actions">
              <a className="btn btn--white" href={`tel:${SITE.phoneE164}`}>
                <Icon name="phone-flip" size={15} /> Call Now
              </a>
              <a
                className="btn btn--whatsapp"
                href={whatsappLink(WHATSAPP_MESSAGES.contact)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={15} /> WhatsApp
              </a>
              <a className="btn btn--outline-light" href={`mailto:${SITE.email}`}>
                <Icon name="email" size={15} /> Email Us
              </a>
              <a className="btn btn--gold" href="#quote">
                Request a Quote
              </a>
            </div>
          </Reveal>

          <Reveal delay={1} className="contact__map">
            <iframe
              title="SevenKNC Global Exim — Pune, Maharashtra, India"
              src={SITE.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="contact__map-footer">
              <span>
                {SITE.name} · Pune, Maharashtra, India
              </span>
              <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer">
                Open in Google Maps <Icon name="arrow" size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
