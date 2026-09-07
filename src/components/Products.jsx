import { useMemo, useState } from "react";
import { products, productFilters } from "../data/products.js";
import { imageIndex } from "../assets/products/index.js";
import SectionHeading from "./SectionHeading.jsx";
import ProductCard from "./ProductCard.jsx";
import ProductDetail from "./ProductDetail.jsx";
import Reveal from "./Reveal.jsx";
import { Icon } from "./icons.jsx";

function SelectFilter({ label, options, value, onChange }) {
  return (
    <div className="filter-select">
      <label htmlFor={`filter-${label.toLowerCase()}`}>{label}</label>
      <div className="filter-select__wrap">
        <select
          id={`filter-${label.toLowerCase()}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" size={14} />
      </div>
    </div>
  );
}

export default function Products() {
  const [productFilter, setProductFilter] = useState("all");
  const [formFilter, setFormFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const catalogue = useMemo(
    () => products.map((p) => ({ ...p, image: p.image ? imageIndex[p.image] : null })),
    []
  );

  const filtered = useMemo(() => {
    const productDef = productFilters.products.find((p) => p.id === productFilter);
    const formDef = productFilters.forms.find((f) => f.id === formFilter);
    const industryDef = productFilters.industries.find((i) => i.id === industryFilter);

    return catalogue.filter((p) => {
      if (productFilter !== "all" && productDef && !productDef.match(p)) return false;
      if (formFilter !== "all" && formDef && !p.forms.includes(formDef.label)) return false;
      if (industryFilter !== "all" && industryDef && !p.applications.includes(industryDef.label))
        return false;
      return true;
    });
  }, [catalogue, productFilter, formFilter, industryFilter]);

  return (
    <section className="section section--cream" id="products">
      <div className="container">
        <SectionHeading
          eyebrow="Our Products"
          title="Our Dehydrated Product Portfolio"
          subtitle="Natural Ingredients. Practical Formats. Global B2B Supply."
        />

        <Reveal className="products__filters">
          <SelectFilter
            label="Product"
            options={productFilters.products}
            value={productFilter}
            onChange={setProductFilter}
          />
          <SelectFilter
            label="Form"
            options={productFilters.forms}
            value={formFilter}
            onChange={setFormFilter}
          />
          <SelectFilter
            label="Industry"
            options={productFilters.industries}
            value={industryFilter}
            onChange={setIndustryFilter}
          />
        </Reveal>

        {filtered.length > 0 ? (
          <div className="products__grid">
            {filtered.map((product) => (
              <Reveal key={product.id}>
                <ProductCard product={product} onView={setSelected} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="products__empty">
            <Icon name="search" size={34} />
            <p>No products match the selected filters. Try adjusting your selection.</p>
          </div>
        )}

        <Reveal className="products__note">
          Looking for a specific grade, form or packaging?{" "}
          <a href="#quote" style={{ color: "var(--primary)", fontWeight: 600 }}>
            Tell us your requirement
          </a>{" "}
          and we&rsquo;ll review it for you.
        </Reveal>
      </div>

      {selected && <ProductDetail product={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
