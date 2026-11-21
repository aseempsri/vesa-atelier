import type { Product } from "./types";

/**
 * CLEARLY LABELLED SAMPLE / DUMMY CATALOGUE.
 *
 * These entries exist only so the UI, cart, and checkout can be exercised locally.
 * They are excluded unless VITE_STORE_SAMPLE_CATALOGUE=true (frontend) or
 * INCLUDE_SAMPLE_CATALOGUE=true (API). They must never be sold in production.
 *
 * Replace with owner-supplied products in `owner-products.ts` when ready.
 * Prices below are dummy integers for layout testing — not real selling prices.
 */
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "sample-hand-poured-01",
    slug: "sample-hand-poured-candle",
    name: "[SAMPLE] Hand-Poured Candle",
    shortDescription: "DUMMY listing — not for sale. Replace with a real product before launch.",
    description:
      "This is a SAMPLE product used to exercise the storefront layout. It is not a real atelier piece and must not be published as available for purchase.",
    categoryId: "hand-poured-candles",
    priceInPaise: 149900,
    images: [
      {
        src: "/og/vesa-atelier-4.jpg",
        alt: "Sample placeholder image — not a product photo",
        position: 0,
      },
      {
        src: "/og/vesa-atelier-7.jpg",
        alt: "Sample secondary placeholder image",
        position: 1,
      },
    ],
    variants: [
      {
        id: "sample-size-small",
        name: "Size",
        value: "Small (sample)",
        priceAdjustmentInPaise: 0,
        active: true,
      },
      {
        id: "sample-size-large",
        name: "Size",
        value: "Large (sample)",
        priceAdjustmentInPaise: 50000,
        active: true,
      },
    ],
    sku: "SAMPLE-HPC-01",
    featured: true,
    active: true,
    sortOrder: 10,
    isSample: true,
    attributes: {
      note: "SAMPLE DATA ONLY",
    },
    careInstructions: "Sample care copy — replace when real instructions are supplied.",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "sample-diy-kit-01",
    slug: "sample-diy-candle-kit",
    name: "[SAMPLE] DIY Candle-Making Kit",
    shortDescription: "DUMMY listing — kit contents and price are placeholders.",
    description:
      "SAMPLE DIY kit entry for grid and detail page review. Do not treat as a sellable product.",
    categoryId: "diy-kits",
    priceInPaise: 249900,
    images: [
      {
        src: "/og/vesa-atelier-5.jpg",
        alt: "Sample placeholder image for DIY kit",
        position: 0,
      },
    ],
    sku: "SAMPLE-DIY-01",
    featured: false,
    active: true,
    sortOrder: 20,
    isSample: true,
    createdAt: "2026-01-02T00:00:00.000Z",
  },
  {
    id: "sample-gift-set-01",
    slug: "sample-candle-gift-set",
    name: "[SAMPLE] Candle Gift Set",
    shortDescription: "DUMMY listing — shows an inactive sample for filter tests.",
    description: "SAMPLE gift set. Marked inactive so it stays out of the live grid.",
    categoryId: "gift-sets",
    priceInPaise: 399900,
    images: [
      {
        src: "/og/vesa-atelier-6.jpg",
        alt: "Sample placeholder image for gift set",
        position: 0,
      },
    ],
    featured: false,
    active: false,
    sortOrder: 30,
    isSample: true,
    createdAt: "2026-01-03T00:00:00.000Z",
  },
];
