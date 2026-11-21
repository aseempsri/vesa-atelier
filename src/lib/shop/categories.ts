import type { ProductCategory } from "./types";

/**
 * Category labels and ordering — data-driven; adjust without changing UI code.
 * Empty categories are hidden in the live shop UI.
 */
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: "hand-poured-candles", label: "Hand-Poured Candles", sortOrder: 10 },
  {
    id: "sculptural-decorative",
    label: "Sculptural / Decorative Candles",
    sortOrder: 20,
  },
  { id: "gift-sets", label: "Candle Gift Sets", sortOrder: 30 },
  { id: "diy-kits", label: "DIY Candle-Making Kits", sortOrder: 40 },
  { id: "accessories", label: "Accessories / Other Handmade Pieces", sortOrder: 50 },
];

export function getCategoryById(id: string): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.id === id);
}

export function getSortedCategories(): ProductCategory[] {
  return [...PRODUCT_CATEGORIES].sort((a, b) => a.sortOrder - b.sortOrder);
}
