import { industries } from "../data/industries.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./icons.jsx";

export default function Industries() {
  return (
    <section className="section" id="industries">
      <div className="container">
        <SectionHeading
          eyebrow="Applications / Industries Served"
          title="Ingredients for Multiple Industries"
          subtitle="From large food manufacturers to international importers, our dehydrated products support buyers across the food value chain."
        />
        <div className="industries__grid">
          {industries.map((industry, i) => (
            <Reveal key={industry.id} delay={i % 3}>
              <div className="industry-card">
                <span className="industry-card__icon">
                  <Icon name={industry.icon} size={24} />
                </span>
                <h3>{industry.title}</h3>
                <p>{industry.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: 40 }}>
          <a className="btn btn--primary" href="#quote">
            Request a Quote <Icon name="arrow" size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
