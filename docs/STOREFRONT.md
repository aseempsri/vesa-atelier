# VESA Atelier storefront — owner setup

This branch adds a full shop/cart/checkout experience and a separate Cloudflare Worker API for secure order creation and payments. The static site continues to deploy from `main` via GitHub Pages. **Do not merge or deploy until you are ready.**

## Architecture

| Piece | Hosting | Notes |
| --- | --- | --- |
| Marketing site + shop UI | GitHub Pages (`main`) | TanStack Start prerender with `GH_PAGES=1` |
| Orders / payments API | Cloudflare Workers + D1 | Lives in `/api` in this repo; deploy separately |

**Why Cloudflare Workers + D1**

- The repo already includes Wrangler / `@cloudflare/vite-plugin`.
- GitHub Pages cannot host order APIs, webhooks, or secrets.
- Workers give a small, maintainable serverless API with HMAC verification, rate limiting, and idempotent webhooks.
- D1 provides durable order persistence without inventing a second application.

The frontend talks to the API via `VITE_API_BASE_URL` (no trailing slash).

## Feature flags (keep the store hidden until ready)

| Variable | Where | Purpose |
| --- | --- | --- |
| `VITE_STORE_ENABLED` | Frontend build env (GitHub Actions / `.env`) | Shows Shop nav + cart icon when `true` |
| `VITE_STORE_SAMPLE_CATALOGUE` | Frontend build env | Includes clearly labelled `[SAMPLE]` products when `true` |
| `VITE_API_BASE_URL` | Frontend build env | Worker origin, e.g. `https://vesa-storefront-api.<account>.workers.dev` |
| `INCLUDE_SAMPLE_CATALOGUE` | API Worker var | Serve sample products from API catalogue |
| `ALLOW_SAMPLE_ORDERS` | API Worker var | Allow placing orders for sample SKUs (local/dev only) |

Default: store nav/cart **hidden**, sample catalogue **off**.

Local demo example (`.env.local`, never commit secrets):

```bash
VITE_STORE_ENABLED=true
VITE_STORE_SAMPLE_CATALOGUE=true
VITE_API_BASE_URL=http://127.0.0.1:8787
```

## Catalogue maintenance

1. Put real products in `src/lib/shop/owner-products.ts` (typed `Product[]`, prices in **integer paise**).
2. Categories live in `src/lib/shop/categories.ts` (empty categories are hidden automatically).
3. Place product photographs under `public/shop/` (or another stable public path) and reference them in `images[].src`.
4. Sample products in `src/lib/shop/sample-products.ts` are dummy-only — never enable them in production builds.

## Payment configuration

Edit placeholders in `src/lib/shop/config.ts`:

- `paymentMethods.upi_qr` — set `enabled: true` only after providing `qrImageUrl` (and optionally `upiId`, `payeeName`).
- `paymentMethods.razorpay.enabled` — UI enable flag only; the API still refuses Razorpay until Worker secrets exist.
- `shippingInPaise` — leave `null` until shipping rules are decided.
- Policy / support fields — leave empty rather than inventing copy.

### Razorpay secrets (API Worker only)

```bash
cd api
npx wrangler secret put RAZORPAY_KEY_ID
npx wrangler secret put RAZORPAY_KEY_SECRET
npx wrangler secret put RAZORPAY_WEBHOOK_SECRET
```

Webhook URL (after deploy): `https://<your-worker>/api/webhooks/razorpay`

Never put Razorpay secrets in `VITE_*` variables, client code, or git.

## API deploy checklist (owner)

1. Cloudflare account.
2. From `api/`: `npx wrangler login`
3. `npx wrangler d1 create vesa-storefront` → paste `database_id` into `api/wrangler.toml`
4. Apply migrations locally then remotely (`npm run db:migrate:local` / `db:migrate:remote` in `api/`)
5. Set `CORS_ORIGIN` to `https://vesa.co.in` (and localhost for testing)
6. Set Razorpay secrets when ready; leave unset to keep Razorpay disabled
7. `npx wrangler deploy -c wrangler.toml` (owner only — this agent does not deploy)
   Always pass `-c wrangler.toml` from the `api/` directory so the root site `wrangler.jsonc` is not used.
8. Set `VITE_API_BASE_URL` on the frontend build to the Worker URL
9. Enable `VITE_STORE_ENABLED=true` when you want Shop/cart visible on the live site

## Local API testing

```bash
cd api && npm install
npm run db:migrate:local
npm run dev
# Worker defaults to http://127.0.0.1:8787
```

Then run the site with the `.env.local` values above.

## API endpoints

- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:slug`
- `POST /api/orders`
- `GET /api/orders/:publicReference`
- `GET /api/payments/razorpay/config`
- `POST /api/payments/razorpay/order`
- `POST /api/payments/razorpay/verify`
- `POST /api/webhooks/razorpay`
- `POST /api/payments/upi/submit-reference`

Cash on Delivery is not implemented and must not be added.

## Routes (frontend)

- `/shop/` — collection
- `/shop/$slug` — product detail
- `/cart` — cart page (+ drawer)
- `/checkout` — checkout (online payment only)
- `/order-confirmation/$orderReference` — paid / confirmed
- `/order-pending/$orderReference` — UPI awaiting verification
