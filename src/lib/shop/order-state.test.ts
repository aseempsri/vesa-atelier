import { describe, expect, it } from "vitest";
import {
  canTransitionOrder,
  canTransitionPayment,
  initialStatusesForPaymentMethod,
  isAuthoritativelyPaid,
  transitionOrder,
  transitionPayment,
} from "./order-state";

describe("order-state machine", () => {
  it("allows razorpay pending → paid and blocks paid → payment_pending", () => {
    expect(canTransitionPayment("payment_pending", "paid")).toBe(true);
    expect(canTransitionPayment("paid", "payment_pending")).toBe(false);
    expect(transitionPayment("payment_pending", "paid")).toBe("paid");
    expect(() => transitionPayment("paid", "payment_pending")).toThrow(
      /Invalid payment status transition/,
    );
  });

  it("keeps UPI QR orders in pending verification until confirmed", () => {
    const initial = initialStatusesForPaymentMethod("upi_qr");
    expect(initial).toEqual({
      paymentStatus: "payment_pending_verification",
      orderStatus: "awaiting_verification",
    });
    expect(canTransitionPayment("payment_pending_verification", "paid")).toBe(true);
    expect(isAuthoritativelyPaid("payment_pending_verification")).toBe(false);
    expect(isAuthoritativelyPaid("paid")).toBe(true);
  });

  it("maps order statuses with validated transitions", () => {
    expect(canTransitionOrder("awaiting_payment", "confirmed")).toBe(true);
    expect(canTransitionOrder("cancelled", "confirmed")).toBe(false);
    expect(transitionOrder("awaiting_verification", "confirmed")).toBe("confirmed");
  });

  it("never treats failed payment as paid", () => {
    expect(canTransitionPayment("payment_failed", "paid")).toBe(false);
    expect(canTransitionPayment("created", "paid")).toBe(false);
  });
});
