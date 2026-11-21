import { absoluteUrl } from "@/lib/seo";
import type { Product } from "./types";

/**
 * Product structured data only when required fields are real.
 * Sample products get noindex and no Product JSON-LD.
 */
export function productJsonLd(product: Product) {
  if (product.isSample) return null;

  const image = product.images
    .slice()
    .sort((a, b) => a.position - b.position)
    .map((img) => absoluteUrl(img.src));

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription ?? product.description,
    image,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "VESA Atelier",
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/shop/${product.slug}`),
      priceCurrency: "INR",
      price: (product.priceInPaise / 100).toFixed(2),
      availability: "https://schema.org/InStock",
    },
  };
}

export function shouldIndexProduct(product: Product): boolean {
  return product.active && !product.isSample;
}
