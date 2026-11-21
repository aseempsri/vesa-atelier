import type { CartLine, Product } from "./types";
import { mergeCartLines } from "./revalidate";
import { unitPriceInPaise } from "./catalogue";

export const CART_STORAGE_KEY = "vesa.storefront.cart.v1";

export type CartState = {
  lines: CartLine[];
};

export function emptyCart(): CartState {
  return { lines: [] };
}

export function parseCartState(raw: unknown): CartState {
  if (!raw || typeof raw !== "object") return emptyCart();
  const lines = (raw as { lines?: unknown }).lines;
  if (!Array.isArray(lines)) return emptyCart();

  const parsed: CartLine[] = [];
  for (const line of lines) {
    if (!line || typeof line !== "object") continue;
    const productId = (line as CartLine).productId;
    const quantity = (line as CartLine).quantity;
    const variantId = (line as CartLine).variantId;
    if (typeof productId !== "string" || !productId) continue;
    if (!Number.isInteger(quantity) || quantity < 1) continue;
    parsed.push({
      productId,
      quantity,
      ...(typeof variantId === "string" && variantId ? { variantId } : {}),
    });
  }
  return { lines: mergeCartLines(parsed) };
}

export function addToCart(
  state: CartState,
  input: {
    productId: string;
    variantId?: string;
    quantity?: number;
    maxQuantity?: number;
  },
): CartState {
  const quantity = input.quantity ?? 1;
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("quantity must be an integer of at least 1");
  }

  const lines = mergeCartLines([
    ...state.lines,
    {
      productId: input.productId,
      variantId: input.variantId,
      quantity,
    },
  ]).map((line) => {
    if (
      line.productId === input.productId &&
      (line.variantId ?? "") === (input.variantId ?? "") &&
      typeof input.maxQuantity === "number"
    ) {
      return { ...line, quantity: Math.min(line.quantity, input.maxQuantity) };
    }
    return line;
  });

  return { lines };
}

export function updateCartQuantity(
  state: CartState,
  input: {
    productId: string;
    variantId?: string;
    quantity: number;
    maxQuantity?: number;
  },
): CartState {
  if (!Number.isInteger(input.quantity) || input.quantity < 1) {
    throw new Error("quantity must be an integer of at least 1");
  }
  const nextQty =
    typeof input.maxQuantity === "number"
      ? Math.min(input.quantity, input.maxQuantity)
      : input.quantity;

  return {
    lines: state.lines.map((line) => {
      if (
        line.productId === input.productId &&
        (line.variantId ?? "") === (input.variantId ?? "")
      ) {
        return { ...line, quantity: nextQty };
      }
      return line;
    }),
  };
}

export function removeFromCart(
  state: CartState,
  input: { productId: string; variantId?: string },
): CartState {
  return {
    lines: state.lines.filter(
      (line) =>
        !(line.productId === input.productId && (line.variantId ?? "") === (input.variantId ?? "")),
    ),
  };
}

export function cartItemCount(state: CartState): number {
  return state.lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function cartSubtotalInPaise(state: CartState, productsById: Map<string, Product>): number {
  let total = 0;
  for (const line of state.lines) {
    const product = productsById.get(line.productId);
    if (!product || !product.active) continue;
    total += unitPriceInPaise(product, line.variantId) * line.quantity;
  }
  return total;
}
