import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { SITE, whatsappLink, WHATSAPP_MESSAGES } from "../data/siteConfig.js";
import { Icon } from "./icons.jsx";
import logo from "../assets/logo.jpeg";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Industries", href: "#industries" },
  { label: "Quality", href: "#quality" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
        <div className="container navbar__inner">
          <a href="#home" className="navbar__brand" aria-label={`${SITE.name} home`}>
            <img className="navbar__logo" src={logo} alt={`${SITE.name} logo`} />
          </a>

          <nav className="navbar__links" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <a key={link.href} className="navbar__link" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="navbar__ctas">
            <a className="btn btn--primary btn--sm" href="#quote">
              Request a Quote
            </a>
            <button
              className="navbar__burger"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Icon name="bars" size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`mobile-menu${open ? " mobile-menu--open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu__top">
          <span className="mobile-menu__brand">
            <img className="mobile-menu__logo" src={logo} alt={`${SITE.name} logo`} />
          </span>
          <button className="mobile-menu__close" aria-label="Close menu" onClick={close}>
            <Icon name="close" size={20} />
          </button>
        </div>

        <nav className="mobile-menu__links" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} className="mobile-menu__link" href={link.href} onClick={close}>
              {link.label}
              <Icon name="arrow-long" size={18} />
            </a>
          ))}
        </nav>

        <div className="mobile-menu__ctas">
          <a className="btn btn--primary btn--block" href="#quote" onClick={close}>
            Request a Quote
          </a>
          <a
            className="btn btn--whatsapp btn--block"
            href={whatsappLink(WHATSAPP_MESSAGES.hero)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            <FaWhatsapp size={18} /> WhatsApp Us
          </a>
        </div>
      </div>
    </>
  );
}
