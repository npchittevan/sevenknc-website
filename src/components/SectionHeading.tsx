import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle = null,
  light = false,
  center = true,
}) {
  return (
    <Reveal className={`section-heading${light ? " section-heading--light" : ""}${center ? " text-center" : ""}`}>
      {eyebrow && (
        <span className={`eyebrow${light ? " eyebrow--light" : ""}`}>{eyebrow}</span>
      )}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </Reveal>
  );
}
