/**
 * Storefront feature flags and owner-supplied placeholders.
 *
 * DO NOT invent products, prices, UPI QR assets, Razorpay credentials,
 * shipping rules, or policies. Fill these when the owner supplies them.
 *
 * Frontend env (Vite, public):
 *   VITE_STORE_ENABLED=true|false          — show Shop nav + cart icon
 *   VITE_STORE_SAMPLE_CATALOGUE=true|false — include clearly labelled sample products
 *   VITE_API_BASE_URL=https://api.example.com  — Cloudflare Worker API origin (no trailing slash)
 *
 * Server env (API Worker secrets — never expose to the browser):
 *   RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET
 *   INCLUDE_SAMPLE_CATALOGUE, ALLOW_SAMPLE_ORDERS (local/dev only)
 *   CORS_ORIGIN (e.g. https://vesa.co.in)
 */

function envFlag(value: string | undefined, defaultValue = false): boolean {
  if (value === undefined || value === "") return defaultValue;
  return value === "true" || value === "1";
}

/** Shop nav + cart icon. Default off until the owner is ready. */
export const STORE_ENABLED = envFlag(
  typeof import.meta !== "undefined" ? import.meta.env?.VITE_STORE_ENABLED : undefined,
  false,
);

/** Include dummy sample products in the client catalogue. Default off. */
export const INCLUDE_SAMPLE_CATALOGUE = envFlag(
  typeof import.meta !== "undefined" ? import.meta.env?.VITE_STORE_SAMPLE_CATALOGUE : undefined,
  false,
);

/** Base URL for the order/payment API (Cloudflare Worker). Empty = not configured. */
export const API_BASE_URL =
  (typeof import.meta !== "undefined"
    ? (import.meta.env?.VITE_API_BASE_URL as string | undefined)
    : undefined
  )?.replace(/\/$/, "") ?? "";

/**
 * Owner-supplied payment & commerce placeholders.
 * Edit this object (or replace with CMS/DB later) when real values arrive.
 */
export const storeConfig = {
  /**
   * Payment methods. Never add COD.
   * Enable each method only after credentials/assets are supplied.
   */
  paymentMethods: {
    upi_qr: {
      /** Set true only after QR image (and optionally UPI ID / payee name) are provided. */
      enabled: false,
      /** Path or absolute URL to owner-supplied QR image. Leave empty until provided. */
      qrImageUrl: "" as string,
      /** Owner UPI ID, e.g. business@upi — leave empty until provided. */
      upiId: "" as string,
      /** Payee display name as registered with UPI — leave empty until provided. */
      payeeName: "" as string,
    },
    razorpay: {
      /**
       * Client-side enable flag. Even when true, the API refuses Razorpay
       * until RAZORPAY_KEY_ID / KEY_SECRET are set on the Worker.
       * Public key id may be exposed via GET /api/payments/razorpay/config once enabled.
       */
      enabled: false,
    },
  },

  /**
   * Shipping charge in paise. null = not configured (show explanatory copy; charge 0).
   * Do not invent free-shipping thresholds.
   */
  shippingInPaise: null as number | null,

  /** Discount in paise — only when a real mechanism is configured. */
  discountInPaise: 0,

  /** Optional gift message field on checkout. */
  giftMessageEnabled: false,

  /**
   * Policy / support placeholders — do not invent copy.
   * Link to existing pages when they exist; otherwise leave empty.
   */
  policies: {
    shippingPath: "" as string,
    returnsPath: "" as string,
    privacyPath: "" as string,
    termsPath: "" as string,
    supportEmail: "" as string,
    supportPhone: "" as string,
  },

  shopIntro: {
    eyebrow: "THE VESA COLLECTION",
    heading: "Objects of light, made by hand.",
    supporting:
      "A considered selection of hand-poured candles and craft pieces from the atelier. Details and availability are updated as pieces are ready.",
  },
} as const;

export type StoreConfig = typeof storeConfig;

export function isUpiQrConfigured(): boolean {
  return (
    storeConfig.paymentMethods.upi_qr.enabled &&
    Boolean(storeConfig.paymentMethods.upi_qr.qrImageUrl)
  );
}

export function isRazorpayUiEnabled(): boolean {
  return storeConfig.paymentMethods.razorpay.enabled;
}

export function getConfiguredPaymentMethods(): Array<"upi_qr" | "razorpay"> {
  const methods: Array<"upi_qr" | "razorpay"> = [];
  if (isUpiQrConfigured()) methods.push("upi_qr");
  if (isRazorpayUiEnabled()) methods.push("razorpay");
  return methods;
}
