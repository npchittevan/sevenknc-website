import { FaStar } from "react-icons/fa6";
import { testimonials, trustPartnership } from "../data/testimonials.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./icons.jsx";

function Partnership() {
  return (
    <Reveal className="partnership">
      <div>
        <span className="eyebrow">Long-Term Relationships</span>
        <h3>{trustPartnership.title}</h3>
        <p>{trustPartnership.subtitle}</p>
      </div>
      <ul className="partnership__points">
        {trustPartnership.points.map((point) => (
          <li key={point}>
            <Icon name="check" size={15} />
            {point}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default function Testimonials() {
  return (
    <section className="section section--cream" id="testimonials">
      <div className="container">
        <SectionHeading
          eyebrow="Partnerships"
          title={testimonials.length ? "What Our Partners Say" : "Trusted for Long-Term Partnerships"}
          subtitle={
            testimonials.length
              ? "Feedback from businesses we work with around the world."
              : "We focus on dependable sourcing, transparent communication and professional export support."
          }
        />
        {testimonials.length > 0 ? (
          <div className="testimonials__grid">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i % 2}>
                <div className="testimonial-card">
                  <div className="testimonial-card__stars" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <FaStar key={s} size={15} />
                    ))}
                  </div>
                  <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
                  <footer>
                    <span className="testimonial-card__avatar">
                      {t.name.charAt(0).toUpperCase()}
                    </span>
                    <span>
                      <strong>{t.name}</strong>
                      <span>{t.company}</span>
                    </span>
                  </footer>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Partnership />
        )}
      </div>
    </section>
  );
}
