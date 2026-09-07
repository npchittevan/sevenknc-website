import { buyerRequirementOptions } from "../data/services.js";
import Reveal from "./Reveal.jsx";
import { Icon } from "./icons.jsx";

export default function BuyerRequirement() {
  return (
    <section className="section requirement" id="requirements">
      <div className="container">
        <div className="requirement__grid">
          <Reveal className="requirement__copy">
            <span className="eyebrow eyebrow--light">Buyer Requirements</span>
            <h2>Have a Specific Product Requirement?</h2>
            <p>
              Tell us what you need and our team will review your requirement and suggest the most
              suitable product option. You can specify the details that matter for your business —
              from form and packaging to destination and timeline.
            </p>
            <a className="btn btn--primary" href="#quote">
              Request a Quote <Icon name="arrow" size={16} />
            </a>
          </Reveal>

          <Reveal delay={1}>
            <ul className="requirement__list">
              {buyerRequirementOptions.map((opt) => (
                <li key={opt}>
                  <Icon name="check" size={15} />
                  {opt}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
