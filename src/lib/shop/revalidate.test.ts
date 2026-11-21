import { describe, expect, it } from "vitest";
import { revalidateCartLines } from "./revalidate";
import type { Product } from "./types";

const baseProduct: Product = {
  id: "prod_1",
  slug: "candle",
  name: "Candle",
  categoryId: "hand-poured-candles",
  priceInPaise: 100000,
  images: [],
  featured: false,
  active: true,
  sortOrder: 1,
  variants: [
    {
      id: "size-s",
      name: "Size",
      value: "S",
      priceAdjustmentInPaise: 0,
      active: true,
    },
    {
      id: "size-l",
      name: "Size",
      value: "L",
      priceAdjustmentInPaise: 25000,
      active: true,
    },
  ],
};

function mapOf(...products: Product[]) {
  return new Map(products.map((p) => [p.id, p]));
}

describe("revalidateCartLines", () => {
  it("recalculates totals from catalogue prices, ignoring client prices", () => {
    const result = revalidateCartLines({
      lines: [{ productId: "prod_1", variantId: "size-l", quantity: 2 }],
      productsById: mapOf(baseProduct),
      shippingInPaise: 5000,
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.cart.items[0]?.unitPriceInPaise).toBe(125000);
    expect(result.cart.items[0]?.lineTotalInPaise).toBe(250000);
    expect(result.cart.subtotalInPaise).toBe(250000);
    expect(result.cart.totalInPaise).toBe(255000);
  });

  it("rejects inactive products and missing variants", () => {
    const inactive = { ...baseProduct, active: false };
    const r1 = revalidateCartLines({
      lines: [{ productId: "prod_1", variantId: "size-s", quantity: 1 }],
      productsById: mapOf(inactive),
    });
    expect(r1.ok).toBe(false);

    const r2 = revalidateCartLines({
      lines: [{ productId: "prod_1", quantity: 1 }],
      productsById: mapOf(baseProduct),
    });
    expect(r2.ok).toBe(false);
    if (r2.ok) return;
    expect(r2.errors[0]?.code).toBe("VARIANT_REQUIRED");
  });

  it("blocks sample products unless explicitly allowed", () => {
    const sample = { ...baseProduct, isSample: true };
    const blocked = revalidateCartLines({
      lines: [{ productId: "prod_1", variantId: "size-s", quantity: 1 }],
      productsById: mapOf(sample),
      allowSampleProducts: false,
    });
    expect(blocked.ok).toBe(false);

    const allowed = revalidateCartLines({
      lines: [{ productId: "prod_1", variantId: "size-s", quantity: 1 }],
      productsById: mapOf(sample),
      allowSampleProducts: true,
    });
    expect(allowed.ok).toBe(true);
  });

  it("enforces inventory limits when tracking is enabled", () => {
    const tracked = {
      ...baseProduct,
      trackInventory: true,
      stockQuantity: 1,
    };
    const result = revalidateCartLines({
      lines: [{ productId: "prod_1", variantId: "size-s", quantity: 2 }],
      productsById: mapOf(tracked),
    });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors[0]?.code).toBe("INSUFFICIENT_STOCK");
  });

  it("rejects empty carts and unknown products", () => {
    expect(revalidateCartLines({ lines: [], productsById: mapOf() }).ok).toBe(false);
    const missing = revalidateCartLines({
      lines: [{ productId: "nope", quantity: 1 }],
      productsById: mapOf(),
    });
    expect(missing.ok).toBe(false);
  });
});
