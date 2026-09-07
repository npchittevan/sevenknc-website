import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { galleryImages } from "../assets/products/index.js";
import { SITE, whatsappLink, WHATSAPP_MESSAGES } from "../data/siteConfig.js";
import { Icon } from "./icons.jsx";

const HERO_POINTS = [
  { icon: "leaf", text: "Dehydrated Onion, Garlic, Ginger & Moringa" },
  { icon: "globe", text: "Global B2B Supply" },
  { icon: "handshake", text: "Buyer-Specific Requirements" },
];

export default function Hero() {
  const [activeImage, setActiveImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return undefined;

    const slideshow = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % galleryImages.length);
    }, 2500);

    return () => window.clearInterval(slideshow);
  }, [isPaused]);

  const currentImage = galleryImages[activeImage];

  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero__grid">
          <div>
            <span className="hero__positioning">
              <Icon name="shield" size={14} />
              Trusted Export Partner from India
            </span>
            <span className="hero__badge">
              <Icon name="leaf" size={14} />
              {SITE.type}
            </span>
            <p className="hero__sub">Premium Dehydrated Food Ingredients from India</p>
            <h1>
              Bringing Nature&rsquo;s Best to <span>the World</span>
            </h1>
            <p className="hero__desc">
              {SITE.name} connects trusted Indian suppliers with global B2B buyers, offering
              dehydrated onion, garlic, ginger and other agricultural food products with a focus
              on quality, transparent communication, dependable sourcing and professional export
              support.
            </p>
            <div className="hero__ctas">
              <a className="btn btn--primary" href="#products">
                Explore Products <Icon name="arrow" size={16} />
              </a>
              <a className="btn btn--outline" href="#quote">
                Request a Quote
              </a>
              <a
                className="btn btn--whatsapp"
                href={whatsappLink(WHATSAPP_MESSAGES.hero)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={17} /> WhatsApp Us
              </a>
            </div>
            <ul className="hero__points">
              {HERO_POINTS.map((p) => (
                <li key={p.text}>
                  <Icon name={p.icon} size={15} />
                  {p.text}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero__visual">
            <div
              className="hero__img-wrap"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              aria-live="polite"
            >
              <img
                key={currentImage.src}
                className="hero__slideshow-img"
                src={currentImage.src}
                alt={currentImage.alt}
                loading={activeImage === 0 ? "eager" : "lazy"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
