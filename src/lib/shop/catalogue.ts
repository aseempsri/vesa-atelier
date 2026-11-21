import { getSortedCategories } from "./categories";
import { INCLUDE_SAMPLE_CATALOGUE } from "./config";
import { OWNER_PRODUCTS } from "./owner-products";
import { SAMPLE_PRODUCTS } from "./sample-products";
import type { Product, ProductCategory, SortOption } from "./types";
import { assertPaise } from "./money";

function validateProduct(product: Product): Product {
  assertPaise(product.priceInPaise, `${product.id}.priceInPaise`);
  if (product.compareAtPriceInPaise !== undefined) {
    assertPaise(product.compareAtPriceInPaise, `${product.id}.compareAtPriceInPaise`);
  }
  for (const variant of product.variants ?? []) {
    if (variant.priceAdjustmentInPaise !== undefined) {
      assertPaise(
        variant.priceAdjustmentInPaise,
        `${product.id}.${variant.id}.priceAdjustmentInPaise`,
      );
    }
  }
  return product;
}

/** Build catalogue. Samples only when explicitly flagged. */
export function getCatalogueProducts(options?: { includeSamples?: boolean }): Product[] {
  const includeSamples = options?.includeSamples ?? INCLUDE_SAMPLE_CATALOGUE;
  const products = [...OWNER_PRODUCTS, ...(includeSamples ? SAMPLE_PRODUCTS : [])].map(
    validateProduct,
  );

  return products;
}

export function getActiveProducts(options?: { includeSamples?: boolean }): Product[] {
  return getCatalogueProducts(options)
    .filter((p) => p.active)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}

export function getProductBySlug(
  slug: string,
  options?: { includeSamples?: boolean },
): Product | undefined {
  return getCatalogueProducts(options).find((p) => p.slug === slug && p.active);
}

export function getProductById(
  id: string,
  options?: { includeSamples?: boolean },
): Product | undefined {
  return getCatalogueProducts(options).find((p) => p.id === id);
}

export function productsByIdMap(options?: { includeSamples?: boolean }): Map<string, Product> {
  return new Map(getCatalogueProducts(options).map((p) => [p.id, p]));
}

/** Categories that currently have at least one active product. */
export function getVisibleCategories(options?: { includeSamples?: boolean }): ProductCategory[] {
  const active = getActiveProducts(options);
  const used = new Set(active.map((p) => p.categoryId));
  return getSortedCategories().filter((c) => used.has(c.id));
}

export function filterAndSortProducts(
  products: Product[],
  options: {
    categoryId?: string;
    sort?: SortOption;
    attributeFilters?: Record<string, string>;
  },
): Product[] {
  let result = [...products];

  if (options.categoryId) {
    result = result.filter((p) => p.categoryId === options.categoryId);
  }

  if (options.attributeFilters) {
    for (const [key, value] of Object.entries(options.attributeFilters)) {
      if (!value) continue;
      result = result.filter((p) => String(p.attributes?.[key] ?? "") === value);
    }
  }

  const sort = options.sort ?? "featured";
  switch (sort) {
    case "price_asc":
      result.sort((a, b) => a.priceInPaise - b.priceInPaise);
      break;
    case "price_desc":
      result.sort((a, b) => b.priceInPaise - a.priceInPaise);
      break;
    case "newest":
      result.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
      break;
    case "featured":
    default:
      result.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.sortOrder - b.sortOrder;
      });
      break;
  }

  return result;
}

export function unitPriceInPaise(product: Product, variantId?: string): number {
  const variant = product.variants?.find((v) => v.id === variantId);
  return product.priceInPaise + (variant?.priceAdjustmentInPaise ?? 0);
}
