import { processSteps } from "../data/services.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./icons.jsx";

export default function Process() {
  return (
    <section className="section section--cream" id="process">
      <div className="container">
        <SectionHeading
          eyebrow="How It Works"
          title="Export & Supply Process"
          subtitle="A clear, coordinated path from your first enquiry to shipment."
        />
        <div className="process__grid">
          {processSteps.map((step, i) => (
            <Reveal key={step.step} delay={i % 3}>
              <div className="process-card">
                <span className="process-card__step">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: 40 }}>
          <a className="btn btn--primary" href="#quote">
            Ready to Start? Request a Quote <Icon name="arrow" size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
