-- Orders and idempotent webhook processing for VESA storefront API.

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY NOT NULL,
  public_reference TEXT NOT NULL UNIQUE,
  customer_json TEXT NOT NULL,
  shipping_address_json TEXT NOT NULL,
  items_json TEXT NOT NULL,
  subtotal_paise INTEGER NOT NULL,
  shipping_paise INTEGER NOT NULL,
  discount_paise INTEGER NOT NULL,
  total_paise INTEGER NOT NULL,
  currency TEXT NOT NULL CHECK (currency = 'INR'),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('razorpay', 'upi_qr')),
  payment_status TEXT NOT NULL,
  order_status TEXT NOT NULL,
  provider_order_id TEXT,
  provider_payment_id TEXT,
  upi_reference TEXT,
  gift_message TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_public_reference ON orders (public_reference);
CREATE INDEX IF NOT EXISTS idx_orders_provider_order_id ON orders (provider_order_id);

CREATE TABLE IF NOT EXISTS webhook_events (
  id TEXT PRIMARY KEY NOT NULL,
  provider TEXT NOT NULL,
  event_id TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  processed_at TEXT NOT NULL,
  UNIQUE (provider, event_id)
);

CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY NOT NULL,
  window_started_at INTEGER NOT NULL,
  count INTEGER NOT NULL
);
