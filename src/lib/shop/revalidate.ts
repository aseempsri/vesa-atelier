import { assertPaise, multiplyPaise, sumPaise } from "./money";
import type { CartLine, MoneyPaise, OrderItem, Product, ProductVariant } from "./types";

export type RevalidationErrorCode =
  | "EMPTY_CART"
  | "PRODUCT_NOT_FOUND"
  | "PRODUCT_INACTIVE"
  | "VARIANT_REQUIRED"
  | "VARIANT_INVALID"
  | "VARIANT_INACTIVE"
  | "INSUFFICIENT_STOCK"
  | "INVALID_QUANTITY"
  | "SAMPLE_PRODUCT_BLOCKED";

export type RevalidationError = {
  code: RevalidationErrorCode;
  message: string;
  productId?: string;
  variantId?: string;
};

export type RevalidatedCart = {
  items: OrderItem[];
  subtotalInPaise: MoneyPaise;
  shippingInPaise: MoneyPaise;
  discountInPaise: MoneyPaise;
  totalInPaise: MoneyPaise;
};

function findVariant(product: Product, variantId?: string): ProductVariant | undefined {
  if (!variantId) return undefined;
  return product.variants?.find((v) => v.id === variantId);
}

function unitPrice(product: Product, variant?: ProductVariant): MoneyPaise {
  const base = assertPaise(product.priceInPaise, "product.priceInPaise");
  const adjustment = variant?.priceAdjustmentInPaise
    ? assertPaise(variant.priceAdjustmentInPaise, "variant.priceAdjustmentInPaise")
    : 0;
  return base + adjustment;
}

/**
 * Recalculate cart lines from the authoritative catalogue.
 * Never trusts browser-submitted prices.
 */
export function revalidateCartLines(input: {
  lines: CartLine[];
  productsById: Map<string, Product>;
  shippingInPaise?: MoneyPaise;
  discountInPaise?: MoneyPaise;
  /** When false, sample products cannot be ordered (production default). */
  allowSampleProducts?: boolean;
}): { ok: true; cart: RevalidatedCart } | { ok: false; errors: RevalidationError[] } {
  const errors: RevalidationError[] = [];
  const items: OrderItem[] = [];
  const shippingInPaise = assertPaise(input.shippingInPaise ?? 0, "shipping");
  const discountInPaise = assertPaise(input.discountInPaise ?? 0, "discount");
  const allowSample = input.allowSampleProducts === true;

  if (!input.lines.length) {
    return {
      ok: false,
      errors: [{ code: "EMPTY_CART", message: "Cart is empty." }],
    };
  }

  for (const line of input.lines) {
    if (!Number.isInteger(line.quantity) || line.quantity < 1) {
      errors.push({
        code: "INVALID_QUANTITY",
        message: "Quantity must be an integer of at least 1.",
        productId: line.productId,
        variantId: line.variantId,
      });
      continue;
    }

    const product = input.productsById.get(line.productId);
    if (!product) {
      errors.push({
        code: "PRODUCT_NOT_FOUND",
        message: "A product in the cart is no longer available.",
        productId: line.productId,
      });
      continue;
    }

    if (!product.active) {
      errors.push({
        code: "PRODUCT_INACTIVE",
        message: `${product.name} is not available for purchase.`,
        productId: product.id,
      });
      continue;
    }

    if (product.isSample && !allowSample) {
      errors.push({
        code: "SAMPLE_PRODUCT_BLOCKED",
        message: "Sample catalogue products cannot be purchased.",
        productId: product.id,
      });
      continue;
    }

    const hasVariants = (product.variants?.length ?? 0) > 0;
    const activeVariants = product.variants?.filter((v) => v.active) ?? [];
    if (hasVariants && activeVariants.length > 0 && !line.variantId) {
      errors.push({
        code: "VARIANT_REQUIRED",
        message: `Select an option for ${product.name}.`,
        productId: product.id,
      });
      continue;
    }

    const variant = findVariant(product, line.variantId);
    if (line.variantId && !variant) {
      errors.push({
        code: "VARIANT_INVALID",
        message: `Selected option for ${product.name} is invalid.`,
        productId: product.id,
        variantId: line.variantId,
      });
      continue;
    }
    if (variant && !variant.active) {
      errors.push({
        code: "VARIANT_INACTIVE",
        message: `Selected option for ${product.name} is unavailable.`,
        productId: product.id,
        variantId: variant.id,
      });
      continue;
    }

    if (product.trackInventory && typeof product.stockQuantity === "number") {
      if (line.quantity > product.stockQuantity) {
        errors.push({
          code: "INSUFFICIENT_STOCK",
          message: `Only ${product.stockQuantity} of ${product.name} remaining.`,
          productId: product.id,
          variantId: variant?.id,
        });
        continue;
      }
    }

    const price = unitPrice(product, variant);
    items.push({
      productId: product.id,
      productNameSnapshot: product.name,
      variantId: variant?.id,
      variantNameSnapshot: variant ? `${variant.name}: ${variant.value}` : undefined,
      sku: variant?.sku ?? product.sku,
      unitPriceInPaise: price,
      quantity: line.quantity,
      lineTotalInPaise: multiplyPaise(price, line.quantity),
    });
  }

  if (errors.length) {
    return { ok: false, errors };
  }

  const subtotalInPaise = sumPaise(items.map((i) => i.lineTotalInPaise));
  const totalInPaise = Math.max(0, subtotalInPaise + shippingInPaise - discountInPaise);

  return {
    ok: true,
    cart: {
      items,
      subtotalInPaise,
      shippingInPaise,
      discountInPaise,
      totalInPaise,
    },
  };
}

/** Merge duplicate product+variant lines by summing quantities. */
export function mergeCartLines(lines: CartLine[]): CartLine[] {
  const map = new Map<string, CartLine>();
  for (const line of lines) {
    const key = `${line.productId}::${line.variantId ?? ""}`;
    const existing = map.get(key);
    if (existing) {
      existing.quantity += line.quantity;
    } else {
      map.set(key, { ...line });
    }
  }
  return [...map.values()];
}
