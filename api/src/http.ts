import { corsHeaders, type Env } from "./env";

export function json(env: Env, request: Request, body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(env, request),
    },
  });
}

export function errorJson(
  env: Env,
  request: Request,
  status: number,
  message: string,
  details?: unknown,
): Response {
  return json(env, request, { message, details }, status);
}

export async function readJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    throw new HttpError(400, "Invalid JSON body");
  }
}

export class HttpError extends Error {
  status: number;
  details?: unknown;
  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export async function applyRateLimit(
  env: Env,
  key: string,
): Promise<{ allowed: boolean; remaining: number }> {
  const windowMs = Number(env.RATE_LIMIT_WINDOW_MS ?? 60_000);
  const max = Number(env.RATE_LIMIT_MAX ?? 30);
  const now = Date.now();

  const row = await env.DB.prepare("SELECT window_started_at, count FROM rate_limits WHERE key = ?")
    .bind(key)
    .first<{ window_started_at: number; count: number }>();

  if (!row || now - row.window_started_at >= windowMs) {
    await env.DB.prepare(
      `INSERT INTO rate_limits (key, window_started_at, count)
       VALUES (?, ?, 1)
       ON CONFLICT(key) DO UPDATE SET window_started_at = excluded.window_started_at, count = 1`,
    )
      .bind(key, now)
      .run();
    return { allowed: true, remaining: max - 1 };
  }

  if (row.count >= max) {
    return { allowed: false, remaining: 0 };
  }

  await env.DB.prepare("UPDATE rate_limits SET count = count + 1 WHERE key = ?").bind(key).run();

  return { allowed: true, remaining: max - row.count - 1 };
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ||
    "unknown"
  );
}
