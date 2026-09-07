import { Icon } from "./icons.jsx";
import Reveal from "./Reveal.jsx";
import apedaLogo from "../assets/apeda.png";
import fssaiLogo from "../assets/FSSAI_logo.png";

const TRUST_ITEMS = [
  {
    icon: "search",
    title: "Quality-Focused Sourcing",
    text: "Products selected according to buyer requirements.",
  },
  {
    icon: "handshake",
    title: "B2B Supply",
    text: "Solutions for food manufacturers, importers, wholesalers and distributors.",
  },
  {
    icon: "layers",
    title: "Flexible Requirements",
    text: "Support for product form, packaging and buyer-specific requirements.",
  },
  {
    icon: "ship",
    title: "Export Support",
    text: "Professional coordination from enquiry through shipment.",
  },
];

const CERTIFICATIONS = [
  {
    title: "APEDA Registered",
    subtitle: "Agricultural & Processed Food Products Export Development Authority",
    logo: apedaLogo,
    alt: "APEDA Logo",
  },
  {
    title: "FSSAI Licensed",
    subtitle: "Lic No 11526996000769",
    logo: fssaiLogo,
    alt: "FSSAI Logo",
  },
];

export default function TrustBar() {
  return (
    <section className="trustbar" aria-label="Why buyers work with SevenKNC">
      <div className="container">
        <div className="trustbar__grid">
          {TRUST_ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i} className="trustbar__item">
              <span className="trustbar__icon">
                <Icon name={item.icon} size={20} />
              </span>
              <span>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </span>
            </Reveal>
          ))}
        </div>
        <div className="trustbar__certs">
          {CERTIFICATIONS.map((cert) => (
            <Reveal key={cert.title} className="trustbar__cert">
              <div className="trustbar__cert-logo">
                <img src={cert.logo} alt={cert.alt} />
              </div>
              <div className="trustbar__cert-info">
                <strong>{cert.title}</strong>
                <span>{cert.subtitle}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
