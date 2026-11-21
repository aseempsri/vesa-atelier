import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import type { CartLine, Product } from "./types";
import { isAuthoritativelyPaid } from "./order-state";
import type { PaymentStatus } from "./types";

type GtagFn = (...args: unknown[]) => void;

function gtag(): GtagFn | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as Window & { gtag?: GtagFn };
  return typeof w.gtag === "function" ? w.gtag : undefined;
}

function track(event: string, params?: Record<string, unknown>) {
  const fn = gtag();
  if (!fn || !GA_MEASUREMENT_ID) return;
  fn("event", event, params);
}

function itemPayload(product: Product, quantity = 1, variantId?: string) {
  const variant = product.variants?.find((v) => v.id === variantId);
  return {
    item_id: product.id,
    item_name: product.name,
    item_category: product.categoryId,
    price: product.priceInPaise / 100,
    quantity,
    ...(variant ? { item_variant: `${variant.name}: ${variant.value}` } : {}),
  };
}

/** Privacy-appropriate ecommerce events — only when GA is already configured. */
export const shopAnalytics = {
  viewItemList(products: Product[], listName = "Shop") {
    track("view_item_list", {
      item_list_name: listName,
      items: products.slice(0, 20).map((p) => itemPayload(p)),
    });
  },
  selectItem(product: Product) {
    track("select_item", { items: [itemPayload(product)] });
  },
  viewItem(product: Product) {
    track("view_item", {
      currency: "INR",
      value: product.priceInPaise / 100,
      items: [itemPayload(product)],
    });
  },
  addToCart(product: Product, quantity: number, variantId?: string) {
    track("add_to_cart", {
      currency: "INR",
      value: (product.priceInPaise / 100) * quantity,
      items: [itemPayload(product, quantity, variantId)],
    });
  },
  removeFromCart(product: Product, quantity: number, variantId?: string) {
    track("remove_from_cart", {
      currency: "INR",
      value: (product.priceInPaise / 100) * quantity,
      items: [itemPayload(product, quantity, variantId)],
    });
  },
  viewCart(lines: CartLine[], valueInPaise: number) {
    track("view_cart", {
      currency: "INR",
      value: valueInPaise / 100,
      items: lines.map((l) => ({
        item_id: l.productId,
        quantity: l.quantity,
      })),
    });
  },
  beginCheckout(valueInPaise: number) {
    track("begin_checkout", {
      currency: "INR",
      value: valueInPaise / 100,
    });
  },
  addShippingInfo(valueInPaise: number) {
    track("add_shipping_info", {
      currency: "INR",
      value: valueInPaise / 100,
    });
  },
  addPaymentInfo(valueInPaise: number, method: string) {
    track("add_payment_info", {
      currency: "INR",
      value: valueInPaise / 100,
      payment_type: method,
    });
  },
  /**
   * Fire only after authoritative payment confirmation (paid).
   * Do not fire for pending QR verification orders.
   */
  purchase(input: { publicReference: string; totalInPaise: number; paymentStatus: PaymentStatus }) {
    if (!isAuthoritativelyPaid(input.paymentStatus)) return;
    track("purchase", {
      transaction_id: input.publicReference,
      currency: "INR",
      value: input.totalInPaise / 100,
    });
  },
};
