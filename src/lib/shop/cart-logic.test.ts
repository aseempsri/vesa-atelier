import { describe, expect, it } from "vitest";
import {
  addToCart,
  cartItemCount,
  emptyCart,
  parseCartState,
  removeFromCart,
  updateCartQuantity,
} from "./cart-logic";

describe("cart-logic", () => {
  it("starts empty", () => {
    expect(emptyCart()).toEqual({ lines: [] });
    expect(cartItemCount(emptyCart())).toBe(0);
  });

  it("adds a line and merges same product+variant", () => {
    let cart = addToCart(emptyCart(), { productId: "p1", quantity: 1 });
    cart = addToCart(cart, { productId: "p1", quantity: 2 });
    expect(cart.lines).toEqual([{ productId: "p1", quantity: 3 }]);
    expect(cartItemCount(cart)).toBe(3);
  });

  it("keeps different variants as separate lines", () => {
    let cart = addToCart(emptyCart(), {
      productId: "p1",
      variantId: "v1",
      quantity: 1,
    });
    cart = addToCart(cart, { productId: "p1", variantId: "v2", quantity: 1 });
    expect(cart.lines).toHaveLength(2);
  });

  it("prevents quantity below 1 on update", () => {
    const cart = addToCart(emptyCart(), { productId: "p1", quantity: 2 });
    expect(() => updateCartQuantity(cart, { productId: "p1", quantity: 0 })).toThrow(/at least 1/);
  });

  it("enforces max quantity when provided", () => {
    let cart = addToCart(emptyCart(), {
      productId: "p1",
      quantity: 5,
      maxQuantity: 3,
    });
    expect(cart.lines[0]?.quantity).toBe(3);
    cart = updateCartQuantity(cart, {
      productId: "p1",
      quantity: 10,
      maxQuantity: 4,
    });
    expect(cart.lines[0]?.quantity).toBe(4);
  });

  it("removes a line", () => {
    let cart = addToCart(emptyCart(), { productId: "p1", quantity: 1 });
    cart = addToCart(cart, { productId: "p2", quantity: 1 });
    cart = removeFromCart(cart, { productId: "p1" });
    expect(cart.lines).toEqual([{ productId: "p2", quantity: 1 }]);
  });

  it("parses persisted cart JSON safely", () => {
    expect(parseCartState(null)).toEqual({ lines: [] });
    expect(
      parseCartState({
        lines: [
          { productId: "p1", quantity: 2 },
          { productId: "bad", quantity: 0 },
          { productId: "p1", quantity: 1 },
        ],
      }),
    ).toEqual({ lines: [{ productId: "p1", quantity: 3 }] });
  });
});
