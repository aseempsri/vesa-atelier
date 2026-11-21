/**
 * Authoritative catalogue for the API Worker.
 * Imports the same typed data layer as the frontend so prices stay in sync.
 */
import { OWNER_PRODUCTS } from "../../src/lib/shop/owner-products";
import { SAMPLE_PRODUCTS } from "../../src/lib/shop/sample-products";
import type { Product } from "../../src/lib/shop/types";
import { assertPaise } from "../../src/lib/shop/money";
import { flag, type Env } from "./env";

function validate(product: Product): Product {
  assertPaise(product.priceInPaise, `${product.id}.priceInPaise`);
  return product;
}

export function getApiCatalogue(env: Env): Product[] {
  const includeSamples = flag(env.INCLUDE_SAMPLE_CATALOGUE, false);
  return [...OWNER_PRODUCTS, ...(includeSamples ? SAMPLE_PRODUCTS : [])].map(validate);
}

export function productsById(env: Env): Map<string, Product> {
  return new Map(getApiCatalogue(env).map((p) => [p.id, p]));
}

export function getActiveApiProducts(env: Env): Product[] {
  return getApiCatalogue(env).filter((p) => p.active);
}
