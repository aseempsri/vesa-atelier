import type { OrderStatus, PaymentStatus } from "./types";

/**
 * Authoritative payment → order status transitions.
 * A failed or abandoned payment must never create a paid/confirmed order.
 */

const PAYMENT_TRANSITIONS: Record<PaymentStatus, readonly PaymentStatus[]> = {
  created: ["payment_pending", "payment_pending_verification", "cancelled"],
  payment_pending: ["paid", "payment_failed", "cancelled", "payment_pending_verification"],
  payment_pending_verification: ["paid", "payment_failed", "cancelled"],
  paid: ["refunded"],
  payment_failed: ["payment_pending", "cancelled"],
  cancelled: [],
  refunded: [],
};

const ORDER_TRANSITIONS: Record<OrderStatus, readonly OrderStatus[]> = {
  draft: ["awaiting_payment", "awaiting_verification", "cancelled"],
  awaiting_payment: ["confirmed", "awaiting_verification", "cancelled"],
  awaiting_verification: ["confirmed", "cancelled"],
  confirmed: ["refunded", "cancelled"],
  cancelled: [],
  refunded: [],
};

export function canTransitionPayment(from: PaymentStatus, to: PaymentStatus): boolean {
  if (from === to) return true;
  return PAYMENT_TRANSITIONS[from].includes(to);
}

export function canTransitionOrder(from: OrderStatus, to: OrderStatus): boolean {
  if (from === to) return true;
  return ORDER_TRANSITIONS[from].includes(to);
}

export function transitionPayment(from: PaymentStatus, to: PaymentStatus): PaymentStatus {
  if (!canTransitionPayment(from, to)) {
    throw new Error(`Invalid payment status transition: ${from} → ${to}`);
  }
  return to;
}

export function transitionOrder(from: OrderStatus, to: OrderStatus): OrderStatus {
  if (!canTransitionOrder(from, to)) {
    throw new Error(`Invalid order status transition: ${from} → ${to}`);
  }
  return to;
}

/** Map payment method + current step to initial statuses after order create. */
export function initialStatusesForPaymentMethod(method: "razorpay" | "upi_qr"): {
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
} {
  if (method === "upi_qr") {
    return {
      paymentStatus: "payment_pending_verification",
      orderStatus: "awaiting_verification",
    };
  }
  return {
    paymentStatus: "payment_pending",
    orderStatus: "awaiting_payment",
  };
}

/** Whether analytics `purchase` may fire (authoritative paid only). */
export function isAuthoritativelyPaid(paymentStatus: PaymentStatus): boolean {
  return paymentStatus === "paid";
}
