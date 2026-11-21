import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  addToCart,
  CART_STORAGE_KEY,
  cartItemCount,
  cartSubtotalInPaise,
  emptyCart,
  parseCartState,
  removeFromCart,
  updateCartQuantity,
  type CartState,
} from "@/lib/shop/cart-logic";
import { productsByIdMap } from "@/lib/shop/catalogue";
import { shopAnalytics } from "@/lib/shop/analytics-events";
import { getProductById } from "@/lib/shop/catalogue";
import type { CartLine } from "@/lib/shop/types";

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotalInPaise: number;
  hydrated: boolean;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  addItem: (input: { productId: string; variantId?: string; quantity?: number }) => void;
  updateQuantity: (input: { productId: string; variantId?: string; quantity: number }) => void;
  removeItem: (input: { productId: string; variantId?: string }) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>(emptyCart);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) setState(parseCartState(JSON.parse(raw)));
    } catch {
      setState(emptyCart());
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const productsById = useMemo(() => productsByIdMap(), []);

  const addItem = useCallback(
    (input: { productId: string; variantId?: string; quantity?: number }) => {
      const product = getProductById(input.productId);
      const maxQuantity =
        product?.trackInventory && typeof product.stockQuantity === "number"
          ? product.stockQuantity
          : undefined;
      setState((prev) => addToCart(prev, { ...input, maxQuantity }));
      if (product) {
        shopAnalytics.addToCart(product, input.quantity ?? 1, input.variantId);
      }
      setDrawerOpen(true);
    },
    [],
  );

  const updateQuantity = useCallback(
    (input: { productId: string; variantId?: string; quantity: number }) => {
      const product = getProductById(input.productId);
      const maxQuantity =
        product?.trackInventory && typeof product.stockQuantity === "number"
          ? product.stockQuantity
          : undefined;
      setState((prev) => updateCartQuantity(prev, { ...input, maxQuantity }));
    },
    [],
  );

  const removeItem = useCallback(
    (input: { productId: string; variantId?: string }) => {
      const product = getProductById(input.productId);
      const line = state.lines.find(
        (l) => l.productId === input.productId && (l.variantId ?? "") === (input.variantId ?? ""),
      );
      setState((prev) => removeFromCart(prev, input));
      if (product && line) {
        shopAnalytics.removeFromCart(product, line.quantity, input.variantId);
      }
    },
    [state.lines],
  );

  const clearCart = useCallback(() => setState(emptyCart()), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines: state.lines,
      itemCount: cartItemCount(state),
      subtotalInPaise: cartSubtotalInPaise(state, productsById),
      hydrated,
      drawerOpen,
      setDrawerOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [state, productsById, hydrated, drawerOpen, addItem, updateQuantity, removeItem, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
