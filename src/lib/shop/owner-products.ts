import type { Product } from "./types";

/**
 * Owner-supplied catalogue.
 *
 * Add real products here when photographs, names, descriptions, and prices
 * are provided. Use integer paise for all prices (₹1,499.00 → 149900).
 *
 * Required fields per product: id, slug, name, categoryId, priceInPaise,
 * images[], featured, active, sortOrder. Set isSample to false.
 * Put image files under public/shop/ and reference paths like /shop/your-photo.jpg.
 */
export const OWNER_PRODUCTS: Product[] = [];
