import aboutImg from "../../aboutus.png";
import Reveal from "./Reveal.jsx";
import { Icon } from "./icons.jsx";

const AUDIENCES = [
  "Importers",
  "Wholesalers",
  "Distributors",
  "Food Manufacturers",
  "Retailers",
  "Food-Service Companies",
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about__grid">
          <Reveal className="about__visual">
            <div className="about__img">
              <img
                src={aboutImg}
                alt="Dehydrated agricultural food products sourced by SevenKNC Global Exim"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal delay={1} className="about__content">
            <span className="eyebrow">About Us</span>
            <h2>About SevenKNC Global Exim</h2>
            <p>
              SevenKNC Global Exim aims to become a trusted and reliable trading and export
              partner for premium-quality agricultural and dehydrated food products from India.
            </p>
            <p>
              The company focuses on connecting Indian suppliers with domestic and international
              buyers through quality products, transparent communication, timely delivery and
              professional service — sourcing and supplying products according to customer
              requirements relating to quality, packaging, quantity and delivery timelines.
            </p>
            <ul className="about__list">
              {AUDIENCES.map((item) => (
                <li key={item}>
                  <Icon name="check" size={16} />
                  {item}
                </li>
              ))}
            </ul>
            <p>
              The business also supports buyers with dependable sourcing, documentation, logistics
              coordination and export-related support.
            </p>
            <a className="btn btn--primary" href="#products">
              Explore Our Products <Icon name="arrow" size={16} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
