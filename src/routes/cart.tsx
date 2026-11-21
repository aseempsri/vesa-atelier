import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useCart } from "@/components/shop/cart-provider";
import { QuantityStepper } from "@/components/shop/quantity-stepper";
import { VesaGoldRule, VesaLayout } from "@/components/vesa-layout";
import { getProductById } from "@/lib/shop/catalogue";
import { formatInrFromPaise } from "@/lib/shop/money";
import { shopAnalytics } from "@/lib/shop/analytics-events";
import { storeConfig } from "@/lib/shop/config";
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

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () =>
    buildPageHead({
      title: "Cart",
      description: "Review your VESA Atelier selection before checkout.",
      path: "/cart",
      noIndex: true,
      jsonLd: webPageJsonLd({
        title: "Cart",
        description: "Review your VESA Atelier selection before checkout.",
        path: "/cart",
      }),
    }),
});

function CartPage() {
  const { lines, subtotalInPaise, updateQuantity, removeItem, itemCount } = useCart();

  useEffect(() => {
    shopAnalytics.viewCart(lines, subtotalInPaise);
  }, [lines, subtotalInPaise]);

  const shippingLabel =
    storeConfig.shippingInPaise === null
      ? "Calculated when shipping rules are configured"
      : formatInrFromPaise(storeConfig.shippingInPaise);

  return (
    <VesaLayout activeNav="cart">
      <div className="mx-auto max-w-4xl px-6 pb-16 pt-4 md:px-8 md:pb-24 md:pt-8">
        <p
          className="uppercase"
          style={{
            fontFamily: vesaSans,
            fontSize: "0.75rem",
            letterSpacing: "0.55em",
            color: VESA_GOLD_SOFT,
          }}
        >
          Cart
        </p>
        <h1
          className="mt-3 text-4xl"
          style={{ fontFamily: vesaSerif, color: VESA_CREAM, fontWeight: 300 }}
        >
          Your selection
        </h1>

        <VesaGoldRule />

        {lines.length === 0 ? (
          <div className="py-12 text-center">
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
                borderBottom: `1px solid ${VESA_GOLD_FAINT}`,
                paddingBottom: "0.25rem",
              }}
            >
              Explore the collection
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
            <ul className="space-y-8">
              {lines.map((line) => {
                const product = getProductById(line.productId);
                if (!product) {
                  return (
                    <li
                      key={`${line.productId}-${line.variantId ?? ""}`}
                      className="border-b pb-6"
                      style={{ borderColor: VESA_GOLD_FAINT }}
                    >
                      <p style={{ fontFamily: vesaSerif, color: VESA_BODY }}>
                        A product in your cart is no longer available.
                      </p>
                      <button
                        type="button"
                        className="mt-2 uppercase"
                        style={{
                          fontFamily: vesaSans,
                          fontSize: "0.5rem",
                          letterSpacing: "0.3em",
                          color: VESA_GOLD_SOFT,
                        }}
                        onClick={() =>
                          removeItem({
                            productId: line.productId,
                            variantId: line.variantId,
                          })
                        }
                      >
                        Remove
                      </button>
                    </li>
                  );
                }
                const variant = product.variants?.find((v) => v.id === line.variantId);
                const unit = product.priceInPaise + (variant?.priceAdjustmentInPaise ?? 0);
                const image = [...product.images].sort((a, b) => a.position - b.position)[0];

                return (
                  <li
                    key={`${line.productId}-${line.variantId ?? ""}`}
                    className="flex flex-col gap-4 border-b pb-8 sm:flex-row"
                    style={{ borderColor: VESA_GOLD_FAINT }}
                  >
                    <Link
                      to="/shop/$slug"
                      params={{ slug: product.slug }}
                      className="h-28 w-24 shrink-0 overflow-hidden border"
                      style={{ borderColor: VESA_GOLD_FAINT }}
                    >
                      {image ? (
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </Link>
                    <div className="min-w-0 flex-1 space-y-3">
                      <Link
                        to="/shop/$slug"
                        params={{ slug: product.slug }}
                        style={{
                          fontFamily: vesaSerif,
                          color: VESA_CREAM,
                          fontSize: "1.35rem",
                        }}
                      >
                        {product.name}
                      </Link>
                      {variant ? (
                        <p
                          style={{
                            fontFamily: vesaSans,
                            color: VESA_GOLD_SOFT,
                            fontSize: "0.75rem",
                          }}
                        >
                          {variant.name}: {variant.value}
                        </p>
                      ) : null}
                      <p style={{ fontFamily: vesaSans, color: VESA_BODY }}>
                        {formatInrFromPaise(unit)}
                      </p>
                      <QuantityStepper
                        value={line.quantity}
                        onChange={(quantity) =>
                          updateQuantity({
                            productId: line.productId,
                            variantId: line.variantId,
                            quantity,
                          })
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          removeItem({
                            productId: line.productId,
                            variantId: line.variantId,
                          })
                        }
                        className="uppercase"
                        style={{
                          fontFamily: vesaSans,
                          fontSize: "0.5rem",
                          letterSpacing: "0.3em",
                          color: VESA_GOLD_SOFT,
                        }}
                      >
                        Remove
                      </button>
                    </div>
                    <p
                      className="sm:text-right"
                      style={{
                        fontFamily: vesaSans,
                        color: VESA_CREAM,
                        fontSize: "0.95rem",
                      }}
                    >
                      {formatInrFromPaise(unit * line.quantity)}
                    </p>
                  </li>
                );
              })}
            </ul>

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
                Order summary · {itemCount} items
              </h2>
              <dl className="mt-6 space-y-4">
                <div className="flex justify-between gap-4">
                  <dt style={{ fontFamily: vesaSans, color: VESA_GOLD_SOFT, fontSize: "0.8rem" }}>
                    Subtotal
                  </dt>
                  <dd style={{ fontFamily: vesaSans, color: VESA_CREAM }}>
                    {formatInrFromPaise(subtotalInPaise)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt style={{ fontFamily: vesaSans, color: VESA_GOLD_SOFT, fontSize: "0.8rem" }}>
                    Shipping
                  </dt>
                  <dd
                    className="text-right"
                    style={{ fontFamily: vesaSerif, color: VESA_BODY, fontSize: "0.9rem" }}
                  >
                    {shippingLabel}
                  </dd>
                </div>
                <div
                  className="flex justify-between gap-4 border-t pt-4"
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
                    {formatInrFromPaise(subtotalInPaise + (storeConfig.shippingInPaise ?? 0))}
                  </dd>
                </div>
              </dl>
              <Link
                to="/checkout"
                className="mt-8 flex items-center justify-center px-4 py-3 uppercase"
                style={{
                  background: VESA_GOLD,
                  color: VESA_BG,
                  fontFamily: vesaSans,
                  fontSize: "0.55rem",
                  letterSpacing: "0.35em",
                }}
              >
                Proceed to checkout
              </Link>
            </aside>
          </div>
        )}
      </div>
    </VesaLayout>
  );
}
