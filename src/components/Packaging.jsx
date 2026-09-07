import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./icons.jsx";

const PACKAGING_ITEMS = [
  {
    icon: "box",
    title: "Product Packaging",
    text: "Packaging is planned according to the product and its intended market.",
  },
  {
    icon: "boxes-stacked",
    title: "Bulk Packaging",
    text: "Bulk requirements can be discussed based on quantity and destination.",
  },
  {
    icon: "brush",
    title: "Customized Packaging",
    text: "Buyer-preferred sizes and packaging specifications can be discussed.",
  },
  {
    icon: "ship",
    title: "Container / Shipment Planning",
    text: "Shipment planning is coordinated based on quantity, port and destination.",
  },
];

export default function Packaging() {
  return (
    <section className="section section--tint" id="packaging">
      <div className="container">
        <SectionHeading
          eyebrow="Packaging & Logistics"
          title="Packaging & Container Solutions"
        />
        <Reveal className="packaging__intro">
          Packaging requirements can be discussed based on the product, quantity, destination,
          buyer requirements, preferred packaging size and export requirements. Let our team
          understand your needs and propose the most suitable approach.
        </Reveal>
        <div className="packaging__grid">
          {PACKAGING_ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i}>
              <div className="packaging-card">
                <span className="packaging-card__icon">
                  <Icon name={item.icon} size={24} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="packaging__cta">
          <a className="btn btn--primary" href="#quote">
            Discuss Your Packaging Requirement <Icon name="arrow" size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
