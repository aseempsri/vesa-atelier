export type Env = {
  DB: D1Database;
  CORS_ORIGIN?: string;
  INCLUDE_SAMPLE_CATALOGUE?: string;
  ALLOW_SAMPLE_ORDERS?: string;
  RATE_LIMIT_WINDOW_MS?: string;
  RATE_LIMIT_MAX?: string;
  RAZORPAY_KEY_ID?: string;
  RAZORPAY_KEY_SECRET?: string;
  RAZORPAY_WEBHOOK_SECRET?: string;
};

export function flag(value: string | undefined, fallback = false): boolean {
  if (value === undefined || value === "") return fallback;
  return value === "true" || value === "1";
}

export function corsHeaders(env: Env, request: Request): HeadersInit {
  const origin = request.headers.get("Origin") ?? "";
  const allowed = (env.CORS_ORIGIN ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const allowOrigin = allowed.includes("*")
    ? "*"
    : allowed.includes(origin)
      ? origin
      : (allowed[0] ?? "*");

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Razorpay-Signature",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}
