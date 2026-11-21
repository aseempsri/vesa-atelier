import { corsHeaders, type Env } from "./env";
import {
  handleCreateOrder,
  handleGetOrder,
  handleGetProduct,
  handleGetProducts,
  handleRazorpayConfig,
  handleRazorpayCreateOrder,
  handleRazorpayVerify,
  handleRazorpayWebhook,
  handleUpiSubmitReference,
} from "./handlers";
import { errorJson, HttpError } from "./http";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(env, request),
      });
    }

    try {
      if (request.method === "GET" && url.pathname === "/api/health") {
        return Response.json(
          { ok: true, service: "vesa-storefront-api" },
          { headers: corsHeaders(env, request) },
        );
      }

      if (request.method === "GET" && url.pathname === "/api/products") {
        return handleGetProducts(env, request);
      }

      const productMatch = url.pathname.match(/^\/api\/products\/([^/]+)$/);
      if (request.method === "GET" && productMatch) {
        return handleGetProduct(env, request, decodeURIComponent(productMatch[1]!));
      }

      if (request.method === "POST" && url.pathname === "/api/orders") {
        return handleCreateOrder(env, request);
      }

      const orderMatch = url.pathname.match(/^\/api\/orders\/([^/]+)$/);
      if (request.method === "GET" && orderMatch) {
        return handleGetOrder(env, request, decodeURIComponent(orderMatch[1]!));
      }

      if (request.method === "GET" && url.pathname === "/api/payments/razorpay/config") {
        return handleRazorpayConfig(env, request);
      }

      if (request.method === "POST" && url.pathname === "/api/payments/razorpay/order") {
        return handleRazorpayCreateOrder(env, request);
      }

      if (request.method === "POST" && url.pathname === "/api/payments/razorpay/verify") {
        return handleRazorpayVerify(env, request);
      }

      if (request.method === "POST" && url.pathname === "/api/webhooks/razorpay") {
        return handleRazorpayWebhook(env, request);
      }

      if (request.method === "POST" && url.pathname === "/api/payments/upi/submit-reference") {
        return handleUpiSubmitReference(env, request);
      }

      return errorJson(env, request, 404, "Not found");
    } catch (error) {
      if (error instanceof HttpError) {
        return errorJson(env, request, error.status, error.message, error.details);
      }
      console.error("Unhandled API error", error);
      return errorJson(env, request, 500, "Internal server error");
    }
  },
} satisfies ExportedHandler<Env>;
