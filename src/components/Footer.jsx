import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { products } from "../data/products.js";
import { SITE, whatsappLink, WHATSAPP_MESSAGES } from "../data/siteConfig.js";
import { Icon } from "./icons.jsx";
import logo from "../assets/logo.jpeg";

const SOCIAL_ICONS = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
};

const COMPANY_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Industries", href: "#industries" },
  { label: "Quality", href: "#quality" },
  { label: "Contact", href: "#contact" },
];

const BUYER_LINKS = [
  { label: "Request a Quote", href: "#quote" },
  { label: "Packaging Requirements", href: "#packaging" },
  { label: "Product Enquiry", href: "#products" },
  { label: "WhatsApp", href: whatsappLink(WHATSAPP_MESSAGES.footer) },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <span className="footer__brand">
              <img className="footer__logo" src={logo} alt={`${SITE.name} logo`} />
            </span>
            <p className="footer__about">
              An India-based trading and export company supplying premium dehydrated agricultural
              and food products to global B2B buyers — with dependable sourcing, transparent
              communication and professional export support.
            </p>
            <p className="footer__tagline">{SITE.tagline}</p>
            {SITE.social.length > 0 && (
              <div className="footer__socials">
                {SITE.social.map((s) => {
                  const SocIcon = SOCIAL_ICONS[s.platform];
                  return SocIcon ? (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="footer__social-link"
                    >
                      <SocIcon size={18} />
                    </a>
                  ) : null;
                })}
              </div>
            )}
          </div>

          <div>
            <h4>Company</h4>
            <ul className="footer__links">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Products</h4>
            <ul className="footer__links">
              {products.map((product) => (
                <li key={product.id}>
                  <a href="#products">{product.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Buyer Support</h4>
            <ul className="footer__links">
              {BUYER_LINKS.map((link) => (
                <li key={link.label}>
                  {link.label === "WhatsApp" ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  ) : (
                    <a href={link.href}>{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
            <h4 style={{ marginTop: 26 }}>Contact</h4>
            <ul className="footer__contact">
              <li>
                <Icon name="location" size={15} />
                <span>
                  {SITE.name}
                  <br />
                  Pune, Maharashtra, India
                </span>
              </li>
              <li>
                <Icon name="phone" size={15} />
                <a href={`tel:${SITE.phoneE164}`}>{SITE.phoneDisplay}</a>
              </li>
              <li>
                <Icon name="email" size={15} />
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 {SITE.name}. All Rights Reserved.</span>
          <span>{SITE.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
