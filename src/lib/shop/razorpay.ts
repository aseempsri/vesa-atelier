/**
 * Razorpay signature verification helpers (Web Crypto / Node crypto compatible).
 * Secrets must only be used server-side.
 */

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function hmacSha256Hex(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return toHex(signature);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/** Verify checkout callback signature: orderId|paymentId */
export async function verifyRazorpayPaymentSignature(input: {
  orderId: string;
  paymentId: string;
  signature: string;
  keySecret: string;
}): Promise<boolean> {
  const payload = `${input.orderId}|${input.paymentId}`;
  const expected = await hmacSha256Hex(input.keySecret, payload);
  return timingSafeEqual(expected, input.signature);
}

/**
 * Verify webhook signature from `X-Razorpay-Signature` header.
 * Body must be the raw request body string.
 */
export async function verifyRazorpayWebhookSignature(input: {
  rawBody: string;
  signature: string;
  webhookSecret: string;
}): Promise<boolean> {
  const expected = await hmacSha256Hex(input.webhookSecret, input.rawBody);
  return timingSafeEqual(expected, input.signature);
}
