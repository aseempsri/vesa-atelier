import type {
  CustomerDetails,
  Order,
  OrderItem,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  PublicOrderView,
  ShippingAddress,
} from "../../src/lib/shop/types";
import type { Env } from "./env";

type OrderRow = {
  id: string;
  public_reference: string;
  customer_json: string;
  shipping_address_json: string;
  items_json: string;
  subtotal_paise: number;
  shipping_paise: number;
  discount_paise: number;
  total_paise: number;
  currency: "INR";
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  provider_order_id: string | null;
  provider_payment_id: string | null;
  upi_reference: string | null;
  gift_message: string | null;
  created_at: string;
  updated_at: string;
};

export function rowToOrder(row: OrderRow): Order {
  return {
    id: row.id,
    publicReference: row.public_reference,
    customer: JSON.parse(row.customer_json) as CustomerDetails,
    shippingAddress: JSON.parse(row.shipping_address_json) as ShippingAddress,
    items: JSON.parse(row.items_json) as OrderItem[],
    subtotalInPaise: row.subtotal_paise,
    shippingInPaise: row.shipping_paise,
    discountInPaise: row.discount_paise,
    totalInPaise: row.total_paise,
    currency: "INR",
    paymentMethod: row.payment_method,
    paymentStatus: row.payment_status,
    orderStatus: row.order_status,
    providerOrderId: row.provider_order_id ?? undefined,
    providerPaymentId: row.provider_payment_id ?? undefined,
    upiReference: row.upi_reference ?? undefined,
    giftMessage: row.gift_message ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toPublicOrderView(order: Order): PublicOrderView {
  return {
    publicReference: order.publicReference,
    paymentStatus: order.paymentStatus,
    orderStatus: order.orderStatus,
    paymentMethod: order.paymentMethod,
    totalInPaise: order.totalInPaise,
    currency: "INR",
    items: order.items.map((item) => ({
      productNameSnapshot: item.productNameSnapshot,
      variantNameSnapshot: item.variantNameSnapshot,
      quantity: item.quantity,
      lineTotalInPaise: item.lineTotalInPaise,
    })),
    customerName: order.customer.fullName,
    createdAt: order.createdAt,
  };
}

export async function insertOrder(env: Env, order: Order): Promise<void> {
  await env.DB.prepare(
    `INSERT INTO orders (
      id, public_reference, customer_json, shipping_address_json, items_json,
      subtotal_paise, shipping_paise, discount_paise, total_paise, currency,
      payment_method, payment_status, order_status, provider_order_id,
      provider_payment_id, upi_reference, gift_message, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      order.id,
      order.publicReference,
      JSON.stringify(order.customer),
      JSON.stringify(order.shippingAddress),
      JSON.stringify(order.items),
      order.subtotalInPaise,
      order.shippingInPaise,
      order.discountInPaise,
      order.totalInPaise,
      order.currency,
      order.paymentMethod,
      order.paymentStatus,
      order.orderStatus,
      order.providerOrderId ?? null,
      order.providerPaymentId ?? null,
      order.upiReference ?? null,
      order.giftMessage ?? null,
      order.createdAt,
      order.updatedAt,
    )
    .run();
}

export async function getOrderByPublicReference(
  env: Env,
  publicReference: string,
): Promise<Order | null> {
  const row = await env.DB.prepare("SELECT * FROM orders WHERE public_reference = ?")
    .bind(publicReference)
    .first<OrderRow>();
  return row ? rowToOrder(row) : null;
}

export async function getOrderByProviderOrderId(
  env: Env,
  providerOrderId: string,
): Promise<Order | null> {
  const row = await env.DB.prepare("SELECT * FROM orders WHERE provider_order_id = ?")
    .bind(providerOrderId)
    .first<OrderRow>();
  return row ? rowToOrder(row) : null;
}

export async function updateOrder(env: Env, order: Order): Promise<void> {
  await env.DB.prepare(
    `UPDATE orders SET
      payment_status = ?,
      order_status = ?,
      provider_order_id = ?,
      provider_payment_id = ?,
      upi_reference = ?,
      updated_at = ?
     WHERE id = ?`,
  )
    .bind(
      order.paymentStatus,
      order.orderStatus,
      order.providerOrderId ?? null,
      order.providerPaymentId ?? null,
      order.upiReference ?? null,
      order.updatedAt,
      order.id,
    )
    .run();
}

export async function recordWebhookEvent(
  env: Env,
  input: { provider: string; eventId: string; payloadJson: string },
): Promise<{ inserted: boolean }> {
  try {
    await env.DB.prepare(
      `INSERT INTO webhook_events (id, provider, event_id, payload_json, processed_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
      .bind(
        `${input.provider}:${input.eventId}`,
        input.provider,
        input.eventId,
        input.payloadJson,
        new Date().toISOString(),
      )
      .run();
    return { inserted: true };
  } catch {
    // UNIQUE(provider, event_id) — already processed
    return { inserted: false };
  }
}
