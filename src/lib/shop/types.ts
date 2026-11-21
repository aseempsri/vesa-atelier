/**
 * Shared storefront types. Money is always integer paise (INR × 100).
 * Never use floating-point for prices or totals.
 */

export type MoneyPaise = number;

export type ProductImage = {
  src: string;
  alt: string;
  position: number;
  focalPointX?: number;
  focalPointY?: number;
};

export type ProductVariant = {
  id: string;
  name: string;
  value: string;
  priceAdjustmentInPaise?: MoneyPaise;
  sku?: string;
  active: boolean;
};

export type ProductCategory = {
  id: string;
  label: string;
  sortOrder: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string;
  description?: string;
  categoryId: string;
  priceInPaise: MoneyPaise;
  /** Only when an approved MRP is supplied by the owner. */
  compareAtPriceInPaise?: MoneyPaise;
  images: ProductImage[];
  variants?: ProductVariant[];
  sku?: string;
  stockQuantity?: number;
  trackInventory?: boolean;
  featured: boolean;
  active: boolean;
  sortOrder: number;
  attributes?: Record<string, string | number | boolean>;
  careInstructions?: string;
  /** True for dummy/sample catalogue rows — never sell in production. */
  isSample?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type CartLine = {
  productId: string;
  variantId?: string;
  quantity: number;
};

export type PaymentMethod = "razorpay" | "upi_qr";

export type PaymentStatus =
  | "created"
  | "payment_pending"
  | "payment_pending_verification"
  | "paid"
  | "payment_failed"
  | "cancelled"
  | "refunded";

export type OrderStatus =
  | "draft"
  | "awaiting_payment"
  | "awaiting_verification"
  | "confirmed"
  | "cancelled"
  | "refunded";

export type CustomerDetails = {
  fullName: string;
  email: string;
  phone: string;
};

export type ShippingAddress = {
  line1: string;
  line2?: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type OrderItem = {
  productId: string;
  productNameSnapshot: string;
  variantId?: string;
  variantNameSnapshot?: string;
  sku?: string;
  unitPriceInPaise: MoneyPaise;
  quantity: number;
  lineTotalInPaise: MoneyPaise;
};

export type Order = {
  id: string;
  publicReference: string;
  customer: CustomerDetails;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotalInPaise: MoneyPaise;
  shippingInPaise: MoneyPaise;
  discountInPaise: MoneyPaise;
  totalInPaise: MoneyPaise;
  currency: "INR";
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  providerOrderId?: string;
  providerPaymentId?: string;
  upiReference?: string;
  giftMessage?: string;
  createdAt: string;
  updatedAt: string;
};

/** Safe subset returned to the browser. */
export type PublicOrderView = {
  publicReference: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  totalInPaise: MoneyPaise;
  currency: "INR";
  items: Array<{
    productNameSnapshot: string;
    variantNameSnapshot?: string;
    quantity: number;
    lineTotalInPaise: MoneyPaise;
  }>;
  customerName: string;
  createdAt: string;
};

export type CreateOrderRequest = {
  items: CartLine[];
  customer: CustomerDetails;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  giftMessage?: string;
  /** Browser-submitted total — compared server-side, never trusted. */
  clientTotalInPaise?: MoneyPaise;
};

export type CreateOrderResponse = {
  publicReference: string;
  totalInPaise: MoneyPaise;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
};

export type SortOption = "featured" | "newest" | "price_asc" | "price_desc";
