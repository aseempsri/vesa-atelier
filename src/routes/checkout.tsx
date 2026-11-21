import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/components/shop/cart-provider";
import { VesaGoldRule, VesaLayout } from "@/components/vesa-layout";
import { getProductById } from "@/lib/shop/catalogue";
import {
  API_BASE_URL,
  getConfiguredPaymentMethods,
  isRazorpayUiEnabled,
  isUpiQrConfigured,
  storeConfig,
} from "@/lib/shop/config";
import { formatInrFromPaise } from "@/lib/shop/money";
import { checkoutFormSchema, type CheckoutFormValues } from "@/lib/shop/checkout-schema";
import { shopApi, ShopApiError } from "@/lib/shop/api-client";
import { shopAnalytics } from "@/lib/shop/analytics-events";
import { buildPageHead, webPageJsonLd } from "@/lib/seo";
import {
  vesaSans,
  vesaSerif,
  VESA_BG,
  VESA_BODY,
  VESA_CREAM,
  VESA_GOLD,
  VESA_GOLD_FAINT,
  VESA_GOLD_SOFT,
} from "@/lib/vesa-brand";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () =>
    buildPageHead({
      title: "Checkout",
      description: "Complete your VESA Atelier order with online payment.",
      path: "/checkout",
      noIndex: true,
      jsonLd: webPageJsonLd({
        title: "Checkout",
        description: "Complete your VESA Atelier order with online payment.",
        path: "/checkout",
      }),
    }),
});

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="mt-1"
      style={{ fontFamily: vesaSerif, color: "#e8b4b4", fontSize: "0.9rem" }}
    >
      {message}
    </p>
  );
}

function CheckoutPage() {
  const { lines, subtotalInPaise, clearCart } = useCart();
  const navigate = useNavigate();
  const methods = getConfiguredPaymentMethods();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const defaultMethod = methods[0] ?? "upi_qr";

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      customer: { fullName: "", email: "", phone: "+91" },
      shippingAddress: {
        line1: "",
        line2: "",
        landmark: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
      },
      paymentMethod: defaultMethod,
      giftMessage: "",
      acceptPolicies: false,
      upiReference: "",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  useEffect(() => {
    shopAnalytics.beginCheckout(subtotalInPaise);
  }, [subtotalInPaise]);

  const lineSummaries = useMemo(
    () =>
      lines.map((line) => {
        const product = getProductById(line.productId);
        const variant = product?.variants?.find((v) => v.id === line.variantId);
        const unit = product ? product.priceInPaise + (variant?.priceAdjustmentInPaise ?? 0) : 0;
        return { line, product, variant, unit };
      }),
    [lines],
  );

  const shippingInPaise = storeConfig.shippingInPaise ?? 0;
  const totalInPaise = subtotalInPaise + shippingInPaise;

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);
    setSubmitting(true);
    shopAnalytics.addShippingInfo(totalInPaise);
    shopAnalytics.addPaymentInfo(totalInPaise, values.paymentMethod);

    try {
      if (!API_BASE_URL) {
        throw new Error(
          "Checkout API is not configured yet. Set VITE_API_BASE_URL to your Cloudflare Worker origin.",
        );
      }

      if (values.paymentMethod === "upi_qr" && !isUpiQrConfigured()) {
        throw new Error(
          "UPI QR payment is not configured. The owner must supply a QR image and enable the method.",
        );
      }
      if (values.paymentMethod === "razorpay" && !isRazorpayUiEnabled()) {
        throw new Error("Razorpay is not enabled yet.");
      }

      const created = await shopApi.createOrder({
        items: lines.map((l) => ({
          productId: l.productId,
          variantId: l.variantId,
          quantity: l.quantity,
        })),
        customer: values.customer,
        shippingAddress: {
          ...values.shippingAddress,
          line2: values.shippingAddress.line2 || undefined,
          landmark: values.shippingAddress.landmark || undefined,
        },
        paymentMethod: values.paymentMethod,
        giftMessage: values.giftMessage || undefined,
        clientTotalInPaise: totalInPaise,
      });

      if (values.paymentMethod === "upi_qr") {
        if (values.upiReference) {
          await shopApi.submitUpiReference({
            publicReference: created.publicReference,
            upiReference: values.upiReference,
          });
        }
        clearCart();
        await navigate({
          to: "/order-pending/$orderReference",
          params: { orderReference: created.publicReference },
        });
        return;
      }

      // Razorpay flow
      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        throw new Error("Unable to load Razorpay checkout.");
      }
      const rzpOrder = await shopApi.createRazorpayOrder(created.publicReference);
      await new Promise<void>((resolve, reject) => {
        const rzp = new window.Razorpay!({
          key: rzpOrder.keyId,
          amount: rzpOrder.amountInPaise,
          currency: "INR",
          name: "VESA Atelier",
          description: `Order ${created.publicReference}`,
          order_id: rzpOrder.razorpayOrderId,
          prefill: {
            name: values.customer.fullName,
            email: values.customer.email,
            contact: values.customer.phone,
          },
          theme: { color: "#c9a55a" },
          handler: async (response: unknown) => {
            try {
              const payload = response as {
                razorpay_order_id: string;
                razorpay_payment_id: string;
                razorpay_signature: string;
              };
              const verified = await shopApi.verifyRazorpayPayment({
                publicReference: created.publicReference,
                razorpayOrderId: payload.razorpay_order_id,
                razorpayPaymentId: payload.razorpay_payment_id,
                razorpaySignature: payload.razorpay_signature,
              });
              clearCart();
              shopAnalytics.purchase({
                publicReference: verified.publicReference,
                totalInPaise: verified.totalInPaise,
                paymentStatus: verified.paymentStatus,
              });
              await navigate({
                to: "/order-confirmation/$orderReference",
                params: { orderReference: created.publicReference },
              });
              resolve();
            } catch (err) {
              reject(err);
            }
          },
        });
        rzp.on("payment.failed", () => {
          reject(new Error("Payment failed or was cancelled. You can try again."));
        });
        rzp.open();
      });
    } catch (err) {
      const message =
        err instanceof ShopApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Checkout failed. Please try again.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  });

  if (lines.length === 0) {
    return (
      <VesaLayout activeNav="checkout">
        <div className="mx-auto max-w-xl px-6 py-20 text-center">
          <p style={{ fontFamily: vesaSerif, color: VESA_BODY, fontSize: "1.2rem" }}>
            Your cart is empty.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex uppercase"
            style={{
              fontFamily: vesaSans,
              fontSize: "0.55rem",
              letterSpacing: "0.35em",
              color: VESA_GOLD,
            }}
          >
            Return to the collection
          </Link>
        </div>
      </VesaLayout>
    );
  }

  const inputStyle = {
    borderColor: VESA_GOLD_FAINT,
    color: VESA_CREAM,
    fontFamily: vesaSans,
    background: "transparent",
  } as const;

  return (
    <VesaLayout activeNav="checkout">
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-4 md:px-8 md:pb-24 md:pt-8">
        <p
          className="uppercase"
          style={{
            fontFamily: vesaSans,
            fontSize: "0.75rem",
            letterSpacing: "0.55em",
            color: VESA_GOLD_SOFT,
          }}
        >
          Checkout
        </p>
        <h1
          className="mt-3 text-4xl"
          style={{ fontFamily: vesaSerif, color: VESA_CREAM, fontWeight: 300 }}
        >
          Delivery & payment
        </h1>
        <p className="mt-3" style={{ fontFamily: vesaSerif, color: VESA_BODY }}>
          Online payment only. Totals are confirmed securely before payment.
        </p>

        <VesaGoldRule />

        <form onSubmit={onSubmit} className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]" noValidate>
          <div className="space-y-8">
            <section>
              <h2
                className="uppercase"
                style={{
                  fontFamily: vesaSans,
                  fontSize: "0.55rem",
                  letterSpacing: "0.35em",
                  color: VESA_GOLD,
                }}
              >
                Contact
              </h2>
              <div className="mt-4 grid gap-4">
                <div>
                  <label htmlFor="fullName" className="sr-only">
                    Full name
                  </label>
                  <input
                    id="fullName"
                    placeholder="Full name"
                    className="w-full border px-3 py-3 outline-none"
                    style={inputStyle}
                    {...form.register("customer.fullName")}
                  />
                  <FieldError message={form.formState.errors.customer?.fullName?.message} />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="w-full border px-3 py-3 outline-none"
                    style={inputStyle}
                    {...form.register("customer.email")}
                  />
                  <FieldError message={form.formState.errors.customer?.email?.message} />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Mobile number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Mobile (+91…)"
                    className="w-full border px-3 py-3 outline-none"
                    style={inputStyle}
                    {...form.register("customer.phone")}
                  />
                  <FieldError message={form.formState.errors.customer?.phone?.message} />
                </div>
              </div>
            </section>

            <section>
              <h2
                className="uppercase"
                style={{
                  fontFamily: vesaSans,
                  fontSize: "0.55rem",
                  letterSpacing: "0.35em",
                  color: VESA_GOLD,
                }}
              >
                Shipping address
              </h2>
              <div className="mt-4 grid gap-4">
                {(
                  [
                    ["shippingAddress.line1", "Address line"],
                    ["shippingAddress.line2", "Apartment / suite (optional)"],
                    ["shippingAddress.landmark", "Landmark (optional)"],
                    ["shippingAddress.city", "City"],
                    ["shippingAddress.state", "State"],
                    ["shippingAddress.postalCode", "PIN / postal code"],
                    ["shippingAddress.country", "Country"],
                  ] as const
                ).map(([name, placeholder]) => (
                  <div key={name}>
                    <label htmlFor={name} className="sr-only">
                      {placeholder}
                    </label>
                    <input
                      id={name}
                      placeholder={placeholder}
                      className="w-full border px-3 py-3 outline-none"
                      style={inputStyle}
                      {...form.register(name)}
                    />
                  </div>
                ))}
                <FieldError
                  message={
                    form.formState.errors.shippingAddress?.line1?.message ||
                    form.formState.errors.shippingAddress?.city?.message ||
                    form.formState.errors.shippingAddress?.state?.message ||
                    form.formState.errors.shippingAddress?.postalCode?.message
                  }
                />
              </div>
            </section>

            {storeConfig.giftMessageEnabled ? (
              <section>
                <label
                  htmlFor="giftMessage"
                  className="uppercase"
                  style={{
                    fontFamily: vesaSans,
                    fontSize: "0.55rem",
                    letterSpacing: "0.35em",
                    color: VESA_GOLD,
                  }}
                >
                  Gift message (optional)
                </label>
                <textarea
                  id="giftMessage"
                  rows={3}
                  className="mt-4 w-full border px-3 py-3 outline-none"
                  style={inputStyle}
                  {...form.register("giftMessage")}
                />
              </section>
            ) : null}

            <section>
              <h2
                className="uppercase"
                style={{
                  fontFamily: vesaSans,
                  fontSize: "0.55rem",
                  letterSpacing: "0.35em",
                  color: VESA_GOLD,
                }}
              >
                Payment
              </h2>
              <p className="mt-3" style={{ fontFamily: vesaSerif, color: VESA_BODY }}>
                Online payment methods only.
              </p>

              {methods.length === 0 ? (
                <p
                  className="mt-4 border p-4"
                  style={{ borderColor: VESA_GOLD_FAINT, fontFamily: vesaSerif, color: VESA_BODY }}
                >
                  Payment methods are not enabled yet. The owner must supply a UPI QR image and/or
                  Razorpay credentials, then enable them in <code>src/lib/shop/config.ts</code>.
                </p>
              ) : (
                <div className="mt-4 space-y-3" role="radiogroup" aria-label="Payment method">
                  {methods.includes("upi_qr") ? (
                    <label
                      className="flex cursor-pointer items-start gap-3 border p-4"
                      style={{
                        borderColor: paymentMethod === "upi_qr" ? VESA_GOLD : VESA_GOLD_FAINT,
                      }}
                    >
                      <input
                        type="radio"
                        value="upi_qr"
                        {...form.register("paymentMethod")}
                        className="mt-1"
                      />
                      <span>
                        <span style={{ fontFamily: vesaSans, color: VESA_CREAM }}>UPI QR</span>
                        <span
                          className="mt-1 block"
                          style={{ fontFamily: vesaSerif, color: VESA_BODY, fontSize: "0.95rem" }}
                        >
                          Pay the exact amount shown using the atelier UPI QR. Your order stays
                          pending until payment is verified.
                        </span>
                      </span>
                    </label>
                  ) : null}
                  {methods.includes("razorpay") ? (
                    <label
                      className="flex cursor-pointer items-start gap-3 border p-4"
                      style={{
                        borderColor: paymentMethod === "razorpay" ? VESA_GOLD : VESA_GOLD_FAINT,
                      }}
                    >
                      <input
                        type="radio"
                        value="razorpay"
                        {...form.register("paymentMethod")}
                        className="mt-1"
                      />
                      <span>
                        <span style={{ fontFamily: vesaSans, color: VESA_CREAM }}>Razorpay</span>
                        <span
                          className="mt-1 block"
                          style={{ fontFamily: vesaSerif, color: VESA_BODY, fontSize: "0.95rem" }}
                        >
                          Pay securely online. Confirmation follows server-side verification.
                        </span>
                      </span>
                    </label>
                  ) : null}
                </div>
              )}

              {paymentMethod === "upi_qr" && isUpiQrConfigured() ? (
                <div className="mt-6 space-y-4 border p-4" style={{ borderColor: VESA_GOLD_FAINT }}>
                  <p style={{ fontFamily: vesaSans, color: VESA_CREAM }}>
                    Amount due: {formatInrFromPaise(totalInPaise)}
                  </p>
                  <img
                    src={storeConfig.paymentMethods.upi_qr.qrImageUrl}
                    alt="UPI payment QR code"
                    className="mx-auto max-w-[220px] bg-white p-3"
                  />
                  {storeConfig.paymentMethods.upi_qr.upiId ? (
                    <p style={{ fontFamily: vesaSans, color: VESA_BODY, fontSize: "0.85rem" }}>
                      UPI ID: {storeConfig.paymentMethods.upi_qr.upiId}
                      <button
                        type="button"
                        className="ml-3 uppercase"
                        style={{
                          fontFamily: vesaSans,
                          fontSize: "0.5rem",
                          letterSpacing: "0.25em",
                          color: VESA_GOLD,
                        }}
                        onClick={() =>
                          navigator.clipboard?.writeText(storeConfig.paymentMethods.upi_qr.upiId)
                        }
                      >
                        Copy
                      </button>
                    </p>
                  ) : null}
                  {storeConfig.paymentMethods.upi_qr.payeeName ? (
                    <p style={{ fontFamily: vesaSans, color: VESA_BODY, fontSize: "0.85rem" }}>
                      Payee: {storeConfig.paymentMethods.upi_qr.payeeName}
                    </p>
                  ) : null}
                  <div>
                    <label
                      htmlFor="upiReference"
                      className="uppercase"
                      style={{
                        fontFamily: vesaSans,
                        fontSize: "0.5rem",
                        letterSpacing: "0.3em",
                        color: VESA_GOLD_SOFT,
                      }}
                    >
                      UPI transaction / UTR reference (optional)
                    </label>
                    <input
                      id="upiReference"
                      className="mt-2 w-full border px-3 py-3 outline-none"
                      style={inputStyle}
                      {...form.register("upiReference")}
                    />
                    <p
                      className="mt-2"
                      style={{ fontFamily: vesaSerif, color: VESA_BODY, fontSize: "0.9rem" }}
                    >
                      A reference helps verification but is not proof of payment by itself.
                    </p>
                  </div>
                </div>
              ) : null}
            </section>

            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" {...form.register("acceptPolicies")} />
              <span style={{ fontFamily: vesaSerif, color: VESA_BODY }}>
                I confirm my details are correct and understand this order uses online payment only.
              </span>
            </label>
            <FieldError message={form.formState.errors.acceptPolicies?.message} />

            {submitError ? (
              <p role="alert" style={{ fontFamily: vesaSerif, color: "#e8b4b4" }}>
                {submitError}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={submitting || methods.length === 0}
              className="min-h-11 px-8 py-3 uppercase transition-opacity disabled:opacity-50"
              style={{
                background: VESA_GOLD,
                color: VESA_BG,
                fontFamily: vesaSans,
                fontSize: "0.55rem",
                letterSpacing: "0.35em",
              }}
            >
              {submitting ? "Processing…" : "Place order"}
            </button>
          </div>

          <aside className="h-fit border p-6" style={{ borderColor: VESA_GOLD_FAINT }}>
            <h2
              className="uppercase"
              style={{
                fontFamily: vesaSans,
                fontSize: "0.55rem",
                letterSpacing: "0.35em",
                color: VESA_GOLD,
              }}
            >
              Order summary
            </h2>
            <ul className="mt-6 space-y-4">
              {lineSummaries.map(({ line, product, variant, unit }) => (
                <li
                  key={`${line.productId}-${line.variantId ?? ""}`}
                  className="flex justify-between gap-4 border-b pb-3"
                  style={{ borderColor: VESA_GOLD_FAINT }}
                >
                  <div>
                    <p style={{ fontFamily: vesaSerif, color: VESA_CREAM }}>
                      {product?.name ?? "Unavailable item"} × {line.quantity}
                    </p>
                    {variant ? (
                      <p
                        style={{
                          fontFamily: vesaSans,
                          color: VESA_GOLD_SOFT,
                          fontSize: "0.7rem",
                        }}
                      >
                        {variant.name}: {variant.value}
                      </p>
                    ) : null}
                  </div>
                  <p style={{ fontFamily: vesaSans, color: VESA_CREAM }}>
                    {formatInrFromPaise(unit * line.quantity)}
                  </p>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-3">
              <div className="flex justify-between">
                <dt style={{ fontFamily: vesaSans, color: VESA_GOLD_SOFT }}>Subtotal</dt>
                <dd style={{ fontFamily: vesaSans, color: VESA_CREAM }}>
                  {formatInrFromPaise(subtotalInPaise)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt style={{ fontFamily: vesaSans, color: VESA_GOLD_SOFT }}>Shipping</dt>
                <dd
                  className="text-right"
                  style={{ fontFamily: vesaSerif, color: VESA_BODY, fontSize: "0.9rem" }}
                >
                  {storeConfig.shippingInPaise === null
                    ? "To be confirmed"
                    : formatInrFromPaise(storeConfig.shippingInPaise)}
                </dd>
              </div>
              <div
                className="flex justify-between border-t pt-3"
                style={{ borderColor: VESA_GOLD_FAINT }}
              >
                <dt
                  className="uppercase"
                  style={{
                    fontFamily: vesaSans,
                    fontSize: "0.55rem",
                    letterSpacing: "0.3em",
                    color: VESA_CREAM,
                  }}
                >
                  Total
                </dt>
                <dd style={{ fontFamily: vesaSans, color: VESA_CREAM }}>
                  {formatInrFromPaise(totalInPaise)}
                </dd>
              </div>
            </dl>
          </aside>
        </form>
      </div>
    </VesaLayout>
  );
}
