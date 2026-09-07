import { useCallback, useEffect, useState } from "react";
import { galleryImages } from "../assets/products/index.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./icons.jsx";

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(
    () => setLightboxIndex((i) => (i + 1) % galleryImages.length),
    []
  );
  const prev = useCallback(
    () => setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length),
    []
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, next, prev]);

  return (
    <section className="section" id="gallery">
      <div className="container">
        <SectionHeading
          eyebrow="Gallery"
          title="Products & Ingredients"
          subtitle="A look at the dehydrated products and ingredients we supply."
        />
        <div className="gallery__grid">
          {galleryImages.map((img, i) => (
            <Reveal key={i} delay={i % 4}>
              <button
                className="gallery__item"
                onClick={() => setLightboxIndex(i)}
                aria-label={`Open image: ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
                <span className="gallery__caption">{img.alt}</span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
          <button className="lightbox__close" onClick={close} aria-label="Close viewer">
            <Icon name="close" size={20} />
          </button>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={prev}
            aria-label="Previous image"
          >
            <Icon name="chevron-left" size={20} />
          </button>
          <img
            className="lightbox__img"
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
          />
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={next}
            aria-label="Next image"
          >
            <Icon name="chevron-right" size={20} />
          </button>
          <p className="lightbox__caption">
            {galleryImages[lightboxIndex].alt} · {lightboxIndex + 1} / {galleryImages.length}
          </p>
        </div>
      )}
    </section>
  );
}
