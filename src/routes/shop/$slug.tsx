import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/components/shop/cart-provider";
import { QuantityStepper } from "@/components/shop/quantity-stepper";
import { VesaGoldRule, VesaLayout } from "@/components/vesa-layout";
import { getCategoryById } from "@/lib/shop/categories";
import { getProductBySlug, unitPriceInPaise } from "@/lib/shop/catalogue";
import { formatInrFromPaise } from "@/lib/shop/money";
import { shopAnalytics } from "@/lib/shop/analytics-events";
import { productJsonLd, shouldIndexProduct } from "@/lib/shop/seo";
import { storeConfig } from "@/lib/shop/config";
import type { ProductVariant } from "@/lib/shop/types";
import { breadcrumbJsonLd, buildPageHead } from "@/lib/seo";
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

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    if (!product) {
      return buildPageHead({
        title: "Product not found",
        description: "This piece could not be found.",
        path: "/shop",
        noIndex: true,
      });
    }
    const image = [...product.images].sort((a, b) => a.position - b.position)[0];
    const jsonLd = productJsonLd(product);
    return buildPageHead({
      title: product.name,
      description:
        product.shortDescription ?? product.description ?? `${product.name} from VESA Atelier.`,
      path: `/shop/${product.slug}`,
      imageAlt: image?.alt ?? product.name,
      noIndex: !shouldIndexProduct(product),
      jsonLd: [
        ...(jsonLd ? [jsonLd] : []),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: product.name, path: `/shop/${product.slug}` },
        ]),
      ],
    });
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const { addItem } = useCart();
  const images = useMemo(
    () => [...product.images].sort((a, b) => a.position - b.position),
    [product.images],
  );
  const [activeImage, setActiveImage] = useState(0);
  const activeVariants = product.variants?.filter((v: ProductVariant) => v.active) ?? [];
  const requiresVariant = activeVariants.length > 0;
  const [variantId, setVariantId] = useState<string>(requiresVariant ? "" : "");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const category = getCategoryById(product.categoryId);
  const price = unitPriceInPaise(product, variantId || undefined);

  useEffect(() => {
    shopAnalytics.viewItem(product);
  }, [product]);

  const onAdd = () => {
    if (requiresVariant && !variantId) {
      setError("Please select an option before adding to cart.");
      return;
    }
    setError(null);
    addItem({ productId: product.id, variantId: variantId || undefined, quantity });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2400);
  };

  const current = images[activeImage];

  return (
    <VesaLayout activeNav="shop">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-4 md:px-8 md:pb-24 md:pt-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol
            className="flex flex-wrap gap-2 uppercase"
            style={{
              fontFamily: vesaSans,
              fontSize: "0.5rem",
              letterSpacing: "0.3em",
              color: VESA_GOLD_SOFT,
            }}
          >
            <li>
              <Link to="/shop" className="hover:opacity-80">
                Shop
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li style={{ color: VESA_CREAM }}>{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div
              className="relative aspect-[4/5] overflow-hidden border"
              style={{ borderColor: VESA_GOLD_FAINT, background: "#100e12" }}
            >
              {current ? (
                <img
                  src={current.src}
                  alt={current.alt}
                  className="h-full w-full object-cover"
                  style={{
                    objectPosition:
                      current.focalPointX !== undefined && current.focalPointY !== undefined
                        ? `${current.focalPointX}% ${current.focalPointY}%`
                        : "center",
                  }}
                />
              ) : (
                <div
                  className="flex h-full items-center justify-center uppercase"
                  style={{
                    fontFamily: vesaSans,
                    fontSize: "0.6rem",
                    letterSpacing: "0.35em",
                    color: VESA_GOLD_SOFT,
                  }}
                >
                  Image forthcoming
                </div>
              )}
            </div>
            {images.length > 1 ? (
              <div className="mt-4 flex gap-3 overflow-x-auto">
                {images.map((img, index) => (
                  <button
                    key={`${img.src}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className="h-16 w-14 shrink-0 overflow-hidden border"
                    style={{
                      borderColor: index === activeImage ? VESA_GOLD : VESA_GOLD_FAINT,
                    }}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img src={img.src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            {product.isSample ? (
              <p
                className="mb-3 uppercase"
                style={{
                  fontFamily: vesaSans,
                  fontSize: "0.55rem",
                  letterSpacing: "0.35em",
                  color: VESA_GOLD,
                }}
              >
                Sample listing — not for sale in production
              </p>
            ) : null}
            {category ? (
              <p
                className="uppercase"
                style={{
                  fontFamily: vesaSans,
                  fontSize: "0.55rem",
                  letterSpacing: "0.35em",
                  color: VESA_GOLD_SOFT,
                }}
              >
                {category.label}
              </p>
            ) : null}
            <h1
              className="mt-3 text-4xl md:text-5xl"
              style={{
                fontFamily: vesaSerif,
                fontWeight: 300,
                color: VESA_CREAM,
              }}
            >
              {product.name}
            </h1>
            <p
              className="mt-4"
              style={{
                fontFamily: vesaSans,
                color: VESA_CREAM,
                fontSize: "1.1rem",
                letterSpacing: "0.06em",
              }}
            >
              {formatInrFromPaise(price)}
            </p>
            {product.description ? (
              <p
                className="mt-6"
                style={{
                  fontFamily: vesaSerif,
                  color: VESA_BODY,
                  fontSize: "1.1rem",
                  lineHeight: 1.75,
                }}
              >
                {product.description}
              </p>
            ) : null}

            {product.attributes && Object.keys(product.attributes).length > 0 ? (
              <dl className="mt-8 space-y-3">
                {Object.entries(product.attributes).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex gap-4 border-b pb-2"
                    style={{ borderColor: VESA_GOLD_FAINT }}
                  >
                    <dt
                      className="w-32 uppercase"
                      style={{
                        fontFamily: vesaSans,
                        fontSize: "0.5rem",
                        letterSpacing: "0.3em",
                        color: VESA_GOLD_SOFT,
                      }}
                    >
                      {key}
                    </dt>
                    <dd style={{ fontFamily: vesaSerif, color: VESA_CREAM }}>{String(value)}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {requiresVariant ? (
              <fieldset className="mt-8">
                <legend
                  className="mb-3 uppercase"
                  style={{
                    fontFamily: vesaSans,
                    fontSize: "0.55rem",
                    letterSpacing: "0.35em",
                    color: VESA_GOLD,
                  }}
                >
                  {activeVariants[0]?.name ?? "Options"}
                </legend>
                <div className="flex flex-wrap gap-2" role="radiogroup">
                  {activeVariants.map((variant: ProductVariant) => {
                    const selected = variantId === variant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => {
                          setVariantId(variant.id);
                          setError(null);
                        }}
                        className="border px-4 py-2 transition-opacity hover:opacity-90"
                        style={{
                          borderColor: selected ? VESA_GOLD : VESA_GOLD_FAINT,
                          color: VESA_CREAM,
                          fontFamily: vesaSans,
                          fontSize: "0.75rem",
                        }}
                      >
                        {variant.value}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ) : null}

            <div className="mt-8 flex flex-wrap items-end gap-6">
              <QuantityStepper
                id="product-qty"
                value={quantity}
                onChange={setQuantity}
                max={
                  product.trackInventory && typeof product.stockQuantity === "number"
                    ? product.stockQuantity
                    : undefined
                }
              />
              <button
                type="button"
                onClick={onAdd}
                className="min-h-11 px-8 py-3 uppercase transition-opacity hover:opacity-90"
                style={{
                  background: VESA_GOLD,
                  color: VESA_BG,
                  fontFamily: vesaSans,
                  fontSize: "0.55rem",
                  letterSpacing: "0.35em",
                }}
              >
                Add to cart
              </button>
            </div>

            <div className="sr-only" aria-live="polite">
              {added ? "Added to cart" : ""}
              {error ?? ""}
            </div>
            {error ? (
              <p className="mt-3" role="alert" style={{ fontFamily: vesaSerif, color: "#e8b4b4" }}>
                {error}
              </p>
            ) : null}
            {added ? (
              <p className="mt-3" style={{ fontFamily: vesaSerif, color: VESA_GOLD }}>
                Added to your cart.
              </p>
            ) : null}

            {product.careInstructions ? (
              <>
                <VesaGoldRule />
                <h2
                  className="uppercase"
                  style={{
                    fontFamily: vesaSans,
                    fontSize: "0.55rem",
                    letterSpacing: "0.35em",
                    color: VESA_GOLD,
                  }}
                >
                  Care
                </h2>
                <p
                  className="mt-3"
                  style={{
                    fontFamily: vesaSerif,
                    color: VESA_BODY,
                    lineHeight: 1.7,
                  }}
                >
                  {product.careInstructions}
                </p>
              </>
            ) : null}

            <VesaGoldRule />
            <h2
              className="uppercase"
              style={{
                fontFamily: vesaSans,
                fontSize: "0.55rem",
                letterSpacing: "0.35em",
                color: VESA_GOLD,
              }}
            >
              Shipping & returns
            </h2>
            <p
              className="mt-3"
              style={{
                fontFamily: vesaSerif,
                color: VESA_BODY,
                lineHeight: 1.7,
              }}
            >
              {storeConfig.policies.shippingPath || storeConfig.policies.returnsPath
                ? "Please review the atelier shipping and returns guidance linked from checkout."
                : "Shipping destinations, timelines, and return policies will be confirmed by the atelier. Final delivery details appear at checkout once configured."}
            </p>
          </div>
        </div>
      </div>
    </VesaLayout>
  );
}
