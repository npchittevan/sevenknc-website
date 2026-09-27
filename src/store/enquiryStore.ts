// Minimal pub/sub store used to prefill the RFQ form with a selected product.
let productValue = "";
const listeners = new Set<(value: string) => void>();

export const enquiryStore = {
  setProduct(value: string) {
    productValue = value || "";
    listeners.forEach((fn) => fn(productValue));
  },
  getProduct() {
    return productValue;
  },
  subscribe(fn: (value: string) => void) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
};
