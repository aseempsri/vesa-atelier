/**
 * Shop catalogue.
 *
 * Edit this file to add, update, or remove products. The listing at `/shop/`
 * and each `/shop/<slug>/` page are generated from the `products` array below.
 *
 * Entries marked PLACEHOLDER are sample listings for layout and SEO only —
 * replace the names, copy, images, prices, and enquire/buy links before launch.
 */

export type ProductAvailability = "in_stock" | "preorder" | "sold_out";

export type Product = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  body: string[];
  priceInr: number;
  compareAtPriceInr?: number;
  images: string[];
  category: string;
  tags: string[];
  availability: ProductAvailability;
  /** External buy page, or a mailto / WhatsApp enquire link. */
  buyUrl?: string;
};

/** Replace with the owner's real enquire address or WhatsApp link. */
export const DEFAULT_ENQUIRE_URL = "mailto:hello@vesa.co.in?subject=VESA%20Shop%20enquiry";

const products: Product[] = [
  {
    slug: "sample-product-1",
    name: "Sample Product 1",
    shortDescription: "PLACEHOLDER listing — replace this name, copy, image, and price.",
    description:
      "PLACEHOLDER product page for Sample Product 1. Replace this listing with a real atelier piece before launch.",
    body: [
      "This is a PLACEHOLDER product. The name, description, image, and price are sample content so the shop layout can be reviewed.",
      "Replace this entry in src/lib/shop/products.ts with a real product. Do not publish this sample copy as a finished listing.",
      "There is no checkout on this site. The button below opens an enquire link that the owner should point at email, WhatsApp, or an external shop.",
    ],
    priceInr: 1499,
    compareAtPriceInr: 1999,
    images: ["/og/vesa-atelier-4.jpg", "/og/vesa-atelier-7.jpg"],
    category: "Placeholder",
    tags: ["placeholder", "sample"],
    availability: "in_stock",
  },
  {
    slug: "sample-product-2",
    name: "Sample Product 2",
    shortDescription: "PLACEHOLDER listing — a second sample card for the shop grid.",
    description:
      "PLACEHOLDER product page for Sample Product 2. Replace this listing with a real atelier piece before launch.",
    body: [
      "This is a PLACEHOLDER product used to fill the shop grid. It is not a real item for sale.",
      "Swap the image paths for photographs in /public (or another static folder), then update the price in Indian rupees.",
      "Availability is set to pre-order on this sample so that label can be checked on the listing and detail pages.",
    ],
    priceInr: 2499,
    images: ["/og/vesa-atelier-5.jpg"],
    category: "Placeholder",
    tags: ["placeholder", "sample", "preorder"],
    availability: "preorder",
  },
  {
    slug: "sample-product-3",
    name: "Sample Product 3",
    shortDescription: "PLACEHOLDER listing — shows the sold-out state on a sample card.",
    description:
      "PLACEHOLDER product page for Sample Product 3. Replace this listing with a real atelier piece before launch.",
    body: [
      "This is a PLACEHOLDER product. It is marked sold out so that unavailable state can be reviewed.",
      "When this sample is replaced, set availability to in_stock or preorder, and add a buyUrl if the piece should open an external page.",
    ],
    priceInr: 999,
    images: ["/og/vesa-atelier-6.jpg"],
    category: "Placeholder",
    tags: ["placeholder", "sample"],
    availability: "sold_out",
  },
];

export function getAllProducts(): Product[] {
  return products.slice();
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function availabilityLabel(availability: ProductAvailability): string {
  switch (availability) {
    case "preorder":
      return "Pre-order";
    case "sold_out":
      return "Unavailable";
    default:
      return "Available";
  }
}

export function getProductEnquireUrl(product: Product): string {
  if (product.buyUrl) return product.buyUrl;
  const subject = encodeURIComponent(`Enquiry: ${product.name}`);
  const mailbox = DEFAULT_ENQUIRE_URL.split("?")[0];
  return `${mailbox}?subject=${subject}`;
}

export function getProductCtaLabel(product: Product): string {
  if (product.availability === "sold_out") return "Unavailable";
  if (product.buyUrl && /^https?:/i.test(product.buyUrl)) return "Buy";
  return "Enquire";
}

export function isExternalUrl(url: string): boolean {
  return /^https?:/i.test(url);
}
