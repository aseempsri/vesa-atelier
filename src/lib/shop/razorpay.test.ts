import { describe, expect, it } from "vitest";
import { verifyRazorpayPaymentSignature, verifyRazorpayWebhookSignature } from "./razorpay";

async function hmacSha256Hex(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return [...new Uint8Array(signature)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

describe("razorpay signature verification", () => {
  it("accepts a valid payment signature and rejects tampering", async () => {
    const keySecret = "test_razorpay_secret";
    const orderId = "order_ABC123";
    const paymentId = "pay_XYZ789";
    const signature = await hmacSha256Hex(keySecret, `${orderId}|${paymentId}`);

    await expect(
      verifyRazorpayPaymentSignature({
        orderId,
        paymentId,
        signature,
        keySecret,
      }),
    ).resolves.toBe(true);

    await expect(
      verifyRazorpayPaymentSignature({
        orderId,
        paymentId,
        signature: "0".repeat(signature.length),
        keySecret,
      }),
    ).resolves.toBe(false);

    await expect(
      verifyRazorpayPaymentSignature({
        orderId: "order_TAMPERED",
        paymentId,
        signature,
        keySecret,
      }),
    ).resolves.toBe(false);
  });

  it("verifies webhook signatures against the raw body", async () => {
    const webhookSecret = "whsec_test";
    const rawBody = JSON.stringify({
      event: "payment.captured",
      payload: { payment: { entity: { id: "pay_1" } } },
    });
    const signature = await hmacSha256Hex(webhookSecret, rawBody);

    await expect(
      verifyRazorpayWebhookSignature({
        rawBody,
        signature,
        webhookSecret,
      }),
    ).resolves.toBe(true);

    await expect(
      verifyRazorpayWebhookSignature({
        rawBody: rawBody + " ",
        signature,
        webhookSecret,
      }),
    ).resolves.toBe(false);
  });
});
