import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./icons.jsx";

const QUALITY_ITEMS = [
  {
    icon: "search",
    title: "Product Selection",
    text: "Products are selected in line with buyer requirements and intended applications.",
  },
  {
    icon: "eye",
    title: "Quality Inspection",
    text: "Samples and lots are reviewed to help ensure they meet the agreed expectations.",
  },
  {
    icon: "file-lines",
    title: "Product Specifications",
    text: "Specifications are discussed and confirmed with buyers before finalizing an order.",
  },
  {
    icon: "user-tie",
    title: "Buyer Requirements",
    text: "Form, grade, quantity, packaging and delivery needs are captured and confirmed.",
  },
  {
    icon: "clipboard-list",
    title: "Documentation",
    text: "Export-related documentation is coordinated in support of the shipment.",
  },
  {
    icon: "clipboard-check",
    title: "Pre-Shipment Checks",
    text: "Order details are reviewed before shipment to align with agreed requirements.",
  },
];

export default function Quality() {
  return (
    <section className="section section--green" id="quality">
      <div className="container">
        <SectionHeading
          eyebrow="Quality Control"
          title="A Quality-Focused Approach to Every Order"
          subtitle="Our commitment to quality is reflected in how requirements are understood, documented and delivered."
          light
        />
        <div className="quality__grid">
          {QUALITY_ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i % 3}>
              <div className="quality-card">
                <span className="quality-card__icon">
                  <Icon name={item.icon} size={22} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="quality__note">
          Detailed quality specifications will be shared by our team as per the product and buyer
          requirements.
        </Reveal>
      </div>
    </section>
  );
}
