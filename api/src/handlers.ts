import { productsById, getActiveApiProducts } from "./catalogue";
import { flag, type Env } from "./env";
import { applyRateLimit, clientIp, errorJson, HttpError, json, readJson } from "./http";
import {
  getOrderByProviderOrderId,
  getOrderByPublicReference,
  insertOrder,
  recordWebhookEvent,
  toPublicOrderView,
  updateOrder,
} from "./orders";
import { revalidateCartLines } from "../../src/lib/shop/revalidate";
import {
  initialStatusesForPaymentMethod,
  transitionOrder,
  transitionPayment,
} from "../../src/lib/shop/order-state";
import {
  verifyRazorpayPaymentSignature,
  verifyRazorpayWebhookSignature,
} from "../../src/lib/shop/razorpay";
import { generateOrderId, generatePublicReference } from "../../src/lib/shop/public-reference";
import type { CreateOrderRequest, Order, PaymentMethod } from "../../src/lib/shop/types";
import { assertPaise } from "../../src/lib/shop/money";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s-]{8,20}$/;

function sanitizeText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function validateCreateOrder(body: CreateOrderRequest): CreateOrderRequest {
  if (!body || typeof body !== "object") {
    throw new HttpError(400, "Invalid order payload");
  }
  if (!Array.isArray(body.items) || body.items.length === 0) {
    throw new HttpError(400, "Cart is empty");
  }
  if (body.paymentMethod !== "upi_qr" && body.paymentMethod !== "razorpay") {
    throw new HttpError(400, "Unsupported payment method");
  }

  const customer = {
    fullName: sanitizeText(body.customer?.fullName, 120),
    email: sanitizeText(body.customer?.email, 254),
    phone: sanitizeText(body.customer?.phone, 20),
  };
  if (customer.fullName.length < 2) {
    throw new HttpError(400, "Full name is required");
  }
  if (!EMAIL_RE.test(customer.email)) {
    throw new HttpError(400, "Valid email is required");
  }
  if (!PHONE_RE.test(customer.phone)) {
    throw new HttpError(400, "Valid phone is required");
  }

  const shippingAddress = {
    line1: sanitizeText(body.shippingAddress?.line1, 200),
    line2: sanitizeText(body.shippingAddress?.line2, 200) || undefined,
    landmark: sanitizeText(body.shippingAddress?.landmark, 120) || undefined,
    city: sanitizeText(body.shippingAddress?.city, 100),
    state: sanitizeText(body.shippingAddress?.state, 100),
    postalCode: sanitizeText(body.shippingAddress?.postalCode, 12),
    country: sanitizeText(body.shippingAddress?.country, 56) || "India",
  };
  if (
    shippingAddress.line1.length < 3 ||
    shippingAddress.city.length < 2 ||
    shippingAddress.state.length < 2 ||
    shippingAddress.postalCode.length < 4
  ) {
    throw new HttpError(400, "Complete shipping address is required");
  }

  return {
    items: body.items.map((item) => ({
      productId: sanitizeText(item.productId, 80),
      variantId: item.variantId ? sanitizeText(item.variantId, 80) : undefined,
      quantity: item.quantity,
    })),
    customer,
    shippingAddress,
    paymentMethod: body.paymentMethod,
    giftMessage: sanitizeText(body.giftMessage, 300) || undefined,
    clientTotalInPaise:
      typeof body.clientTotalInPaise === "number" ? body.clientTotalInPaise : undefined,
  };
}

export async function handleGetProducts(env: Env, request: Request): Promise<Response> {
  const products = getActiveApiProducts(env).map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    shortDescription: p.shortDescription,
    categoryId: p.categoryId,
    priceInPaise: p.priceInPaise,
    images: p.images,
    featured: p.featured,
    isSample: Boolean(p.isSample),
    variants: p.variants?.filter((v) => v.active),
  }));
  return json(env, request, { products });
}

export async function handleGetProduct(
  env: Env,
  request: Request,
  slug: string,
): Promise<Response> {
  const product = getActiveApiProducts(env).find((p) => p.slug === slug);
  if (!product) return errorJson(env, request, 404, "Product not found");
  return json(env, request, { product });
}

export async function handleCreateOrder(env: Env, request: Request): Promise<Response> {
  const limit = await applyRateLimit(env, `order:${clientIp(request)}`);
  if (!limit.allowed) {
    return errorJson(env, request, 429, "Too many requests. Please try again shortly.");
  }

  const body = validateCreateOrder(await readJson<CreateOrderRequest>(request));
  const shippingInPaise = 0; // Owner supplies shipping rules later
  const discountInPaise = 0;

  const result = revalidateCartLines({
    lines: body.items,
    productsById: productsById(env),
    shippingInPaise,
    discountInPaise,
    allowSampleProducts: flag(env.ALLOW_SAMPLE_ORDERS, false),
  });

  if (!result.ok) {
    return errorJson(env, request, 400, "Cart could not be validated", result.errors);
  }

  if (
    typeof body.clientTotalInPaise === "number" &&
    body.clientTotalInPaise !== result.cart.totalInPaise
  ) {
    return errorJson(env, request, 409, "Prices changed. Please review your cart and try again.", {
      serverTotalInPaise: result.cart.totalInPaise,
      clientTotalInPaise: body.clientTotalInPaise,
    });
  }

  if (body.paymentMethod === "razorpay" && !razorpayConfigured(env)) {
    return errorJson(
      env,
      request,
      503,
      "Razorpay is not configured yet. Choose another online payment method or try later.",
    );
  }

  const statuses = initialStatusesForPaymentMethod(body.paymentMethod);
  const now = new Date().toISOString();
  const order: Order = {
    id: generateOrderId(),
    publicReference: generatePublicReference(),
    customer: body.customer,
    shippingAddress: body.shippingAddress,
    items: result.cart.items,
    subtotalInPaise: result.cart.subtotalInPaise,
    shippingInPaise: result.cart.shippingInPaise,
    discountInPaise: result.cart.discountInPaise,
    totalInPaise: result.cart.totalInPaise,
    currency: "INR",
    paymentMethod: body.paymentMethod as PaymentMethod,
    paymentStatus: statuses.paymentStatus,
    orderStatus: statuses.orderStatus,
    giftMessage: body.giftMessage,
    createdAt: now,
    updatedAt: now,
  };

  await insertOrder(env, order);

  return json(
    env,
    request,
    {
      publicReference: order.publicReference,
      totalInPaise: order.totalInPaise,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
      paymentMethod: order.paymentMethod,
    },
    201,
  );
}

export async function handleGetOrder(
  env: Env,
  request: Request,
  publicReference: string,
): Promise<Response> {
  const order = await getOrderByPublicReference(env, publicReference);
  if (!order) return errorJson(env, request, 404, "Order not found");
  return json(env, request, toPublicOrderView(order));
}

function razorpayConfigured(env: Env): boolean {
  return Boolean(env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET);
}

export async function handleRazorpayConfig(env: Env, request: Request): Promise<Response> {
  const enabled = razorpayConfigured(env);
  return json(env, request, {
    enabled,
    ...(enabled ? { keyId: env.RAZORPAY_KEY_ID } : {}),
  });
}

export async function handleRazorpayCreateOrder(env: Env, request: Request): Promise<Response> {
  if (!razorpayConfigured(env)) {
    return errorJson(env, request, 503, "Razorpay credentials are not configured");
  }

  const limit = await applyRateLimit(env, `rzp-order:${clientIp(request)}`);
  if (!limit.allowed) {
    return errorJson(env, request, 429, "Too many requests");
  }

  const body = await readJson<{ publicReference?: string }>(request);
  const publicReference = sanitizeText(body.publicReference, 64);
  const order = await getOrderByPublicReference(env, publicReference);
  if (!order) return errorJson(env, request, 404, "Order not found");
  if (order.paymentMethod !== "razorpay") {
    return errorJson(env, request, 400, "Order is not a Razorpay order");
  }
  if (order.paymentStatus === "paid") {
    return errorJson(env, request, 409, "Order is already paid");
  }

  assertPaise(order.totalInPaise, "order.totalInPaise");

  const auth = btoa(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`);
  const rzpResponse = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: order.totalInPaise,
      currency: "INR",
      receipt: order.publicReference.slice(0, 40),
      notes: {
        publicReference: order.publicReference,
      },
    }),
  });

  const rzpBody = (await rzpResponse.json()) as {
    id?: string;
    error?: { description?: string };
  };

  if (!rzpResponse.ok || !rzpBody.id) {
    return errorJson(
      env,
      request,
      502,
      rzpBody.error?.description ?? "Failed to create Razorpay order",
    );
  }

  order.providerOrderId = rzpBody.id;
  order.paymentStatus = transitionPayment(order.paymentStatus, "payment_pending");
  order.orderStatus = transitionOrder(order.orderStatus, "awaiting_payment");
  order.updatedAt = new Date().toISOString();
  await updateOrder(env, order);

  return json(env, request, {
    razorpayOrderId: rzpBody.id,
    amountInPaise: order.totalInPaise,
    currency: "INR" as const,
    keyId: env.RAZORPAY_KEY_ID,
    publicReference: order.publicReference,
  });
}

export async function handleRazorpayVerify(env: Env, request: Request): Promise<Response> {
  if (!razorpayConfigured(env)) {
    return errorJson(env, request, 503, "Razorpay credentials are not configured");
  }

  const body = await readJson<{
    publicReference?: string;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
  }>(request);

  const publicReference = sanitizeText(body.publicReference, 64);
  const razorpayOrderId = sanitizeText(body.razorpayOrderId, 64);
  const razorpayPaymentId = sanitizeText(body.razorpayPaymentId, 64);
  const razorpaySignature = sanitizeText(body.razorpaySignature, 128);

  const order = await getOrderByPublicReference(env, publicReference);
  if (!order) return errorJson(env, request, 404, "Order not found");

  if (order.paymentStatus === "paid") {
    return json(env, request, toPublicOrderView(order));
  }

  const valid = await verifyRazorpayPaymentSignature({
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
    signature: razorpaySignature,
    keySecret: env.RAZORPAY_KEY_SECRET!,
  });

  if (!valid) {
    order.paymentStatus = transitionPayment(order.paymentStatus, "payment_failed");
    order.updatedAt = new Date().toISOString();
    await updateOrder(env, order);
    return errorJson(env, request, 400, "Invalid payment signature");
  }

  if (order.providerOrderId && order.providerOrderId !== razorpayOrderId) {
    return errorJson(env, request, 400, "Payment does not match this order");
  }

  order.providerOrderId = razorpayOrderId;
  order.providerPaymentId = razorpayPaymentId;
  order.paymentStatus = transitionPayment(order.paymentStatus, "paid");
  order.orderStatus = transitionOrder(order.orderStatus, "confirmed");
  order.updatedAt = new Date().toISOString();
  await updateOrder(env, order);

  return json(env, request, toPublicOrderView(order));
}

export async function handleRazorpayWebhook(env: Env, request: Request): Promise<Response> {
  if (!env.RAZORPAY_WEBHOOK_SECRET) {
    return errorJson(env, request, 503, "Webhook secret not configured");
  }

  const rawBody = await request.text();
  const signature = request.headers.get("X-Razorpay-Signature") ?? "";
  const valid = await verifyRazorpayWebhookSignature({
    rawBody,
    signature,
    webhookSecret: env.RAZORPAY_WEBHOOK_SECRET,
  });
  if (!valid) {
    return errorJson(env, request, 400, "Invalid webhook signature");
  }

  const payload = JSON.parse(rawBody) as {
    event?: string;
    id?: string;
    payload?: {
      payment?: {
        entity?: {
          id?: string;
          order_id?: string;
          status?: string;
        };
      };
      order?: {
        entity?: {
          id?: string;
          status?: string;
        };
      };
    };
  };

  const eventId =
    payload.id ||
    `${payload.event}:${payload.payload?.payment?.entity?.id ?? payload.payload?.order?.entity?.id ?? "unknown"}`;

  const recorded = await recordWebhookEvent(env, {
    provider: "razorpay",
    eventId,
    payloadJson: rawBody,
  });
  if (!recorded.inserted) {
    // Idempotent success for retries
    return json(env, request, { ok: true, duplicate: true });
  }

  const paymentEntity = payload.payload?.payment?.entity;
  const providerOrderId = paymentEntity?.order_id || payload.payload?.order?.entity?.id;
  if (!providerOrderId) {
    return json(env, request, { ok: true, ignored: true });
  }

  const order = await getOrderByProviderOrderId(env, providerOrderId);
  if (!order) {
    return json(env, request, { ok: true, unmatched: true });
  }

  const status = paymentEntity?.status ?? payload.payload?.order?.entity?.status;
  if (status === "captured" || status === "paid" || payload.event === "payment.captured") {
    if (order.paymentStatus !== "paid") {
      order.paymentStatus = transitionPayment(order.paymentStatus, "paid");
      order.orderStatus = transitionOrder(order.orderStatus, "confirmed");
      if (paymentEntity?.id) order.providerPaymentId = paymentEntity.id;
      order.updatedAt = new Date().toISOString();
      await updateOrder(env, order);
    }
  } else if (status === "failed" || payload.event === "payment.failed") {
    if (order.paymentStatus !== "paid") {
      order.paymentStatus = transitionPayment(order.paymentStatus, "payment_failed");
      order.updatedAt = new Date().toISOString();
      await updateOrder(env, order);
    }
  }

  return json(env, request, { ok: true });
}

export async function handleUpiSubmitReference(env: Env, request: Request): Promise<Response> {
  const limit = await applyRateLimit(env, `upi-ref:${clientIp(request)}`);
  if (!limit.allowed) {
    return errorJson(env, request, 429, "Too many requests");
  }

  const body = await readJson<{
    publicReference?: string;
    upiReference?: string;
  }>(request);
  const publicReference = sanitizeText(body.publicReference, 64);
  const upiReference = sanitizeText(body.upiReference, 64);
  if (!upiReference) {
    return errorJson(env, request, 400, "UPI reference is required");
  }

  const order = await getOrderByPublicReference(env, publicReference);
  if (!order) return errorJson(env, request, 404, "Order not found");
  if (order.paymentMethod !== "upi_qr") {
    return errorJson(env, request, 400, "Order is not a UPI QR order");
  }
  if (order.paymentStatus === "paid") {
    return json(env, request, toPublicOrderView(order));
  }

  order.upiReference = upiReference;
  order.paymentStatus = transitionPayment(order.paymentStatus, "payment_pending_verification");
  order.orderStatus = transitionOrder(order.orderStatus, "awaiting_verification");
  order.updatedAt = new Date().toISOString();
  await updateOrder(env, order);

  return json(env, request, toPublicOrderView(order));
}
