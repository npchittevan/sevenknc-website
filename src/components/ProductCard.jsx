import { FaWhatsapp } from "react-icons/fa6";
import { whatsappLink } from "../data/siteConfig.js";
import { enquiryStore } from "../store/enquiryStore.js";
import { Icon } from "./icons.jsx";

export default function ProductCard({ product, onView }) {
  const requestQuote = () => {
    enquiryStore.setProduct(product.name);
    document.querySelector("#quote")?.scrollIntoView({ behavior: "smooth" });
  };

  const message = `Hello SevenKNC Global Exim, I would like to enquire about ${product.name}. Please share details and pricing.`;

  return (
    <article className="product-card">
      <button
        className="product-card__media"
        onClick={() => onView(product)}
        aria-label={`View details for ${product.name}`}
      >
        <span className="product-card__category">{product.category}</span>
        {product.image ? (
          <img src={product.image} alt={product.imageAlt} loading="lazy" />
        ) : (
          <span className="product-card__media--placeholder">
            <Icon name="seedling" size={56} />
          </span>
        )}
        <span className="product-card__title">{product.name}</span>
      </button>

      <div className="product-card__body">
        <p>{product.description}</p>

        <span className="forms-label">Available Forms</span>
        <div className="form-tags">
          {product.forms.map((form) => (
            <span className="form-tag" key={form}>
              {form}
            </span>
          ))}
        </div>

        <div className="app-tags">
          {product.applications.map((app) => (
            <span className="app-tag" key={app}>
              {app}
            </span>
          ))}
        </div>

        <div className="product-card__ctas">
          <button className="btn btn--primary" onClick={requestQuote}>
            Request a Quote
          </button>
          <a
            className="btn btn--whatsapp"
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp enquiry about ${product.name}`}
          >
            <FaWhatsapp size={15} />
          </a>
        </div>
      </div>
    </article>
  );
}
