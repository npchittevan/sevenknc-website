import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./icons.jsx";

const WHY_ITEMS = [
  {
    icon: "handshake",
    title: "Reliable Sourcing",
    text: "Connecting buyers with dependable Indian suppliers.",
  },
  {
    icon: "shield",
    title: "Quality Focus",
    text: "Attention to product requirements and quality expectations.",
  },
  {
    icon: "message",
    title: "Transparent Communication",
    text: "Clear communication throughout the enquiry and order process.",
  },
  {
    icon: "gears",
    title: "Buyer-Specific Solutions",
    text: "Requirements can be discussed around product form, packaging and quantity.",
  },
  {
    icon: "file-lines",
    title: "Export Support",
    text: "Documentation and logistics coordination support.",
  },
  {
    icon: "seedling",
    title: "Long-Term Partnerships",
    text: "Focused on building sustainable B2B relationships.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section" id="why-us">
      <div className="container">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Partner With SevenKNC Global Exim?"
          subtitle="A dependable trading and export partner built on trust, transparency and buyer-focused service."
        />
        <div className="why__grid">
          {WHY_ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i % 3}>
              <div className="why-card">
                <span className="why-card__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="why-card__icon">
                  <Icon name={item.icon} size={22} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
