import { API_BASE_URL } from "./config";
import type { CreateOrderRequest, CreateOrderResponse, PublicOrderView } from "./types";

export class ShopApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ShopApiError";
    this.status = status;
    this.details = details;
  }
}

function requireApiBase(): string {
  if (!API_BASE_URL) {
    throw new ShopApiError(
      "Store API is not configured. Set VITE_API_BASE_URL to your Worker origin.",
      0,
    );
  }
  return API_BASE_URL;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const base = requireApiBase();
  const response = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  const text = await response.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    const message =
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof (data as { message: unknown }).message === "string"
        ? (data as { message: string }).message
        : `Request failed (${response.status})`;
    throw new ShopApiError(message, response.status, data);
  }

  return data as T;
}

export const shopApi = {
  isConfigured(): boolean {
    return Boolean(API_BASE_URL);
  },

  createOrder(body: CreateOrderRequest) {
    return request<CreateOrderResponse>("/api/orders", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },

  getOrder(publicReference: string) {
    return request<PublicOrderView>(`/api/orders/${encodeURIComponent(publicReference)}`);
  },

  createRazorpayOrder(publicReference: string) {
    return request<{
      razorpayOrderId: string;
      amountInPaise: number;
      currency: "INR";
      keyId: string;
      publicReference: string;
    }>("/api/payments/razorpay/order", {
      method: "POST",
      body: JSON.stringify({ publicReference }),
    });
  },

  verifyRazorpayPayment(input: {
    publicReference: string;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
  }) {
    return request<PublicOrderView>("/api/payments/razorpay/verify", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  submitUpiReference(input: { publicReference: string; upiReference: string }) {
    return request<PublicOrderView>("/api/payments/upi/submit-reference", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  getRazorpayConfig() {
    return request<{ enabled: boolean; keyId?: string }>("/api/payments/razorpay/config");
  },
};
