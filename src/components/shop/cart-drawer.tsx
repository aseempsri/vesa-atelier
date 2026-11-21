import { Link } from "@tanstack/react-router";
import { useCart } from "@/components/shop/cart-provider";
import { QuantityStepper } from "@/components/shop/quantity-stepper";
import { getProductById } from "@/lib/shop/catalogue";
import { formatInrFromPaise } from "@/lib/shop/money";
import { STORE_ENABLED } from "@/lib/shop/config";
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

export function CartDrawer() {
  const {
    drawerOpen,
    setDrawerOpen,
    lines,
    subtotalInPaise,
    updateQuantity,
    removeItem,
    itemCount,
  } = useCart();

  if (!STORE_ENABLED || !drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Cart">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close cart"
        onClick={() => setDrawerOpen(false)}
      />
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l shadow-none motion-safe:animate-in motion-safe:slide-in-from-right"
        style={{
          backgroundColor: VESA_BG,
          borderColor: VESA_GOLD_FAINT,
        }}
      >
        <div
          className="flex items-center justify-between border-b px-6 py-5"
          style={{ borderColor: VESA_GOLD_FAINT }}
        >
          <h2
            className="uppercase"
            style={{
              fontFamily: vesaSans,
              fontSize: "0.65rem",
              letterSpacing: "0.4em",
              color: VESA_CREAM,
              paddingLeft: "0.4em",
            }}
          >
            Your cart ({itemCount})
          </h2>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="uppercase transition-opacity hover:opacity-80"
            style={{
              fontFamily: vesaSans,
              fontSize: "0.55rem",
              letterSpacing: "0.3em",
              color: VESA_GOLD_SOFT,
            }}
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lines.length === 0 ? (
            <div className="space-y-4">
              <p style={{ fontFamily: vesaSerif, color: VESA_BODY, fontSize: "1.1rem" }}>
                Your cart is empty.
              </p>
              <Link
                to="/shop"
                onClick={() => setDrawerOpen(false)}
                className="inline-flex uppercase"
                style={{
                  fontFamily: vesaSans,
                  fontSize: "0.55rem",
                  letterSpacing: "0.35em",
                  color: VESA_GOLD,
                }}
              >
                Explore the collection
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {lines.map((line) => {
                const product = getProductById(line.productId);
                if (!product) return null;
                const variant = product.variants?.find((v) => v.id === line.variantId);
                const unit = product.priceInPaise + (variant?.priceAdjustmentInPaise ?? 0);
                const image = [...product.images].sort((a, b) => a.position - b.position)[0];

                return (
                  <li
                    key={`${line.productId}-${line.variantId ?? ""}`}
                    className="flex gap-4 border-b pb-6"
                    style={{ borderColor: VESA_GOLD_FAINT }}
                  >
                    <div
                      className="h-20 w-16 shrink-0 overflow-hidden border"
                      style={{ borderColor: VESA_GOLD_FAINT }}
                    >
                      {image ? (
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <p
                        style={{
                          fontFamily: vesaSerif,
                          color: VESA_CREAM,
                          fontSize: "1.05rem",
                        }}
                      >
                        {product.name}
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
                      <p
                        style={{
                          fontFamily: vesaSans,
                          color: VESA_BODY,
                          fontSize: "0.8rem",
                        }}
                      >
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
                        className="uppercase transition-opacity hover:opacity-80"
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
                      className="shrink-0"
                      style={{
                        fontFamily: vesaSans,
                        color: VESA_CREAM,
                        fontSize: "0.8rem",
                      }}
                    >
                      {formatInrFromPaise(unit * line.quantity)}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t px-6 py-5 space-y-4" style={{ borderColor: VESA_GOLD_FAINT }}>
          <div className="flex items-center justify-between">
            <span
              className="uppercase"
              style={{
                fontFamily: vesaSans,
                fontSize: "0.55rem",
                letterSpacing: "0.3em",
                color: VESA_GOLD_SOFT,
              }}
            >
              Subtotal
            </span>
            <span style={{ fontFamily: vesaSans, color: VESA_CREAM }}>
              {formatInrFromPaise(subtotalInPaise)}
            </span>
          </div>
          <p style={{ fontFamily: vesaSerif, color: VESA_BODY, fontSize: "0.9rem" }}>
            Shipping is calculated at checkout once delivery rules are configured.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/cart"
              onClick={() => setDrawerOpen(false)}
              className="inline-flex items-center justify-center border px-4 py-3 uppercase transition-opacity hover:opacity-80"
              style={{
                borderColor: VESA_GOLD_FAINT,
                fontFamily: vesaSans,
                fontSize: "0.55rem",
                letterSpacing: "0.35em",
                color: VESA_CREAM,
              }}
            >
              View cart
            </Link>
            <Link
              to="/checkout"
              onClick={() => setDrawerOpen(false)}
              className="inline-flex items-center justify-center px-4 py-3 uppercase transition-opacity hover:opacity-90"
              style={{
                background: VESA_GOLD,
                color: VESA_BG,
                fontFamily: vesaSans,
                fontSize: "0.55rem",
                letterSpacing: "0.35em",
              }}
            >
              Checkout
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
