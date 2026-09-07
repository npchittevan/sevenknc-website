// Minimal pub/sub store used to prefill the RFQ form with a selected product.
let productValue = "";
const listeners = new Set();

export const enquiryStore = {
  setProduct(value) {
    productValue = value || "";
    listeners.forEach((fn) => fn(productValue));
  },
  getProduct() {
    return productValue;
  },
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};
