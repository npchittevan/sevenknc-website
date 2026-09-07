import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { whatsappLink } from "../data/siteConfig.js";
import { enquiryStore } from "../store/enquiryStore.js";
import { Icon } from "./icons.jsx";

export default function ProductDetail({ product, onClose }) {
  const [activeForm, setActiveForm] = useState(0);

  useEffect(() => {
    setActiveForm(0);
  }, [product]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!product) return null;

  const formDetails = product.formDetails || [];
  const currentForm = formDetails[activeForm] || null;
  const message = `Hello SevenKNC Global Exim, I would like to enquire about ${product.name}. Please share details and pricing.`;

  const requestQuote = () => {
    enquiryStore.setProduct(product.name);
    onClose();
    document.querySelector("#quote")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="product-detail__overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} details`}
      onClick={onClose}
    >
      <div className="product-detail__panel" onClick={(e) => e.stopPropagation()}>
        <button className="product-detail__close" onClick={onClose} aria-label="Close details">
          <Icon name="close" size={18} />
        </button>

        <div className="product-detail__scroll">
          <div className="product-detail__hero">
            <div className="product-detail__media">
              {product.image ? (
                <img src={product.image} alt={product.imageAlt} />
              ) : (
                <span className="product-card__media--placeholder">
                  <Icon name="seedling" size={72} />
                </span>
              )}
            </div>
            <div className="product-detail__intro">
              <span className="product-detail__cat">{product.category}</span>
              <h3>{product.name}</h3>
              <p className="product-detail__desc">{product.description}</p>
            </div>
          </div>

          {formDetails.length > 0 && (
            <div className="product-detail__forms-section">
              <span className="product-detail__section-title">Available Forms</span>
              <div className="product-detail__tabs" role="tablist">
                {formDetails.map((form, i) => (
                  <button
                    key={form.name}
                    role="tab"
                    aria-selected={i === activeForm}
                    className={`product-detail__tab${i === activeForm ? " product-detail__tab--active" : ""}`}
                    onClick={() => setActiveForm(i)}
                  >
                    {form.displayName || form.name}
                  </button>
                ))}
              </div>

              {currentForm && (
                <div className="product-detail__form-panel" role="tabpanel">
                  <div className="product-detail__spec-grid">
                    <div className="product-detail__spec-item">
                      <span className="product-detail__spec-label">Form</span>
                      <span className="product-detail__spec-value">{currentForm.name}</span>
                    </div>
                    <div className="product-detail__spec-item">
                      <span className="product-detail__spec-label">Size / Specification</span>
                      <span className="product-detail__spec-value">{currentForm.size}</span>
                    </div>
                    <div className="product-detail__spec-item">
                      <span className="product-detail__spec-label">Packing Sizes</span>
                      <span className="product-detail__spec-value">{currentForm.packingSizes}</span>
                    </div>
                    <div className="product-detail__spec-item">
                      <span className="product-detail__spec-label">Packaging</span>
                      <span className="product-detail__spec-value">{currentForm.packaging}</span>
                    </div>
                    <div className="product-detail__spec-item">
                      <span className="product-detail__spec-label">Shelf Life</span>
                      <span className="product-detail__spec-value">{currentForm.shelfLife}</span>
                    </div>
                    <div className="product-detail__spec-item">
                      <span className="product-detail__spec-label">Country of Origin</span>
                      <span className="product-detail__spec-value">{currentForm.origin}</span>
                    </div>
                    {currentForm.ingredients && (
                      <div className="product-detail__spec-item product-detail__spec-item--full">
                        <span className="product-detail__spec-label">Ingredients</span>
                        <span className="product-detail__spec-value">{currentForm.ingredients}</span>
                      </div>
                    )}
                  </div>

                  {currentForm.applications && (
                    <div className="product-detail__apps">
                      <span className="product-detail__section-title">Applications</span>
                      <div className="product-detail__apps-list">
                        {currentForm.applications.split(",").map((app) => (
                          <span key={app.trim()} className="product-detail__app-item">
                            <Icon name="check" size={13} />
                            {app.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {product.buyerTypes && product.buyerTypes.length > 0 && (
            <div className="product-detail__buyers">
              <span className="product-detail__section-title">Suitable For</span>
              <div className="product-detail__buyer-tags">
                {product.buyerTypes.map((bt) => (
                  <span key={bt} className="product-detail__buyer-tag">
                    {bt}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="product-detail__ctas">
            <button className="btn btn--primary" onClick={requestQuote}>
              Request a Quote <Icon name="arrow" size={15} />
            </button>
            <a
              className="btn btn--whatsapp"
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={16} /> WhatsApp Inquiry
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
