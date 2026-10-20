import { Link, createFileRoute } from "@tanstack/react-router";
import { BlogScrollToTop } from "@/components/blog-scroll-to-top";
import { VesaGoldRule, VesaLayout } from "@/components/vesa-layout";
import { availabilityLabel, formatInr, getAllProducts, type Product } from "@/lib/shop/products";
import {
  VESA_BODY,
  VESA_CREAM,
  VESA_GOLD,
  VESA_GOLD_FAINT,
  VESA_GOLD_SOFT,
  VESA_WORDMARK_GRADIENT,
  vesaSans,
  vesaSerif,
} from "@/lib/vesa-brand";
import { breadcrumbJsonLd, buildPageHead, itemListJsonLd, webPageJsonLd } from "@/lib/seo";

const SHOP_DESCRIPTION =
  "Shop VESA Atelier — placeholder sample products listed here until the collection is published.";

export const Route = createFileRoute("/shop/")({
  component: ShopPage,
  head: () => {
    const products = getAllProducts();
    return buildPageHead({
      title: "Shop",
      description: SHOP_DESCRIPTION,
      path: "/shop",
      keywords: [
        "VESA Atelier shop",
        "hand-poured candles",
        "atelier candles India",
        "VESA collection",
      ],
      jsonLd: [
        webPageJsonLd({
          title: "Shop",
          description: SHOP_DESCRIPTION,
          path: "/shop",
        }),
        itemListJsonLd(
          products.map((product) => ({
            name: product.name,
            path: `/shop/${product.slug}`,
          })),
        ),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
        ]),
      ],
    });
  },
});

function GoldCorners() {
  return (
    <>
      {[
        { top: -4, left: -4 },
        { top: -4, right: -4 },
        { bottom: -4, left: -4 },
        { bottom: -4, right: -4 },
      ].map((pos, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute h-[8px] w-[8px] rotate-45"
          style={{
            ...pos,
            border: `1px solid ${VESA_GOLD_SOFT}`,
            background: "#08070a",
          }}
        />
      ))}
    </>
  );
}

function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];

  return (
    <article className="relative" style={{ border: `1px solid ${VESA_GOLD_FAINT}` }}>
      <GoldCorners />
      <Link
        to="/shop/$slug"
        params={{ slug: product.slug }}
        className="block transition-opacity hover:opacity-90"
      >
        {image ? (
          <div className="relative aspect-[5/4] overflow-hidden">
            <img
              src={image}
              alt={`${product.name} — placeholder image`}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}

        <div className="px-6 pb-8 pt-7 md:px-8 md:pb-10 md:pt-8">
          <p
            className="uppercase"
            style={{
              fontFamily: vesaSans,
              fontSize: "0.7rem",
              letterSpacing: "0.45em",
              color: VESA_GOLD,
              paddingLeft: "0.45em",
            }}
          >
            {product.category}
          </p>

          <h2
            className="mt-4 overflow-visible pb-1"
            style={{
              fontFamily: vesaSerif,
              fontWeight: 400,
              fontSize: "clamp(1.65rem, 3vw, 2.1rem)",
              lineHeight: 1.3,
              letterSpacing: "0.02em",
              color: VESA_CREAM,
            }}
          >
            {product.name}
          </h2>

          <p
            className="mt-4"
            style={{
              fontFamily: vesaSerif,
              fontWeight: 300,
              fontSize: "clamp(1.15rem, 1.8vw, 1.3rem)",
              lineHeight: 1.7,
              letterSpacing: "0.02em",
              color: VESA_BODY,
            }}
          >
            {product.shortDescription}
          </p>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span
              style={{
                fontFamily: vesaSerif,
                fontWeight: 400,
                fontSize: "1.45rem",
                letterSpacing: "0.04em",
                color: VESA_CREAM,
              }}
            >
              {formatInr(product.priceInr)}
            </span>
            {product.compareAtPriceInr ? (
              <span
                className="line-through"
                style={{
                  fontFamily: vesaSerif,
                  fontWeight: 300,
                  fontSize: "1.05rem",
                  color: VESA_GOLD_SOFT,
                }}
              >
                {formatInr(product.compareAtPriceInr)}
              </span>
            ) : null}
            <span
              className="uppercase"
              style={{
                fontFamily: vesaSans,
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                color: VESA_GOLD_SOFT,
                paddingLeft: "0.28em",
              }}
            >
              {availabilityLabel(product.availability)}
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-x-3">
            <span style={{ color: VESA_GOLD_SOFT, fontSize: "1.45rem", fontWeight: 300 }}>…</span>
            <span
              className="uppercase"
              style={{
                fontFamily: vesaSans,
                fontSize: "0.75rem",
                letterSpacing: "0.35em",
                color: VESA_GOLD,
                paddingLeft: "0.35em",
              }}
            >
              View details
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function ShopPage() {
  const products = getAllProducts();

  return (
    <VesaLayout activeNav="shop">
      <div className="mx-auto max-w-2xl px-6 pb-16 pt-4 md:max-w-5xl md:px-8 md:pb-24 md:pt-8">
        <section>
          <p
            className="uppercase"
            style={{
              fontFamily: vesaSans,
              fontSize: "0.75rem",
              letterSpacing: "0.55em",
              color: VESA_GOLD_SOFT,
              paddingLeft: "0.55em",
            }}
          >
            Collection
          </p>

          <h1
            className="mt-5 overflow-visible pb-1"
            style={{
              fontFamily: vesaSerif,
              fontWeight: 300,
              fontSize: "clamp(2.85rem, 6.5vw, 4.25rem)",
              lineHeight: 1.25,
              letterSpacing: "0.02em",
              background: VESA_WORDMARK_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 4px 24px rgba(201, 165, 90, 0.2))",
            }}
          >
            Shop
          </h1>

          <p
            className="mt-6"
            style={{
              fontFamily: vesaSerif,
              fontWeight: 300,
              fontSize: "clamp(1.25rem, 2vw, 1.45rem)",
              lineHeight: 1.85,
              letterSpacing: "0.02em",
              color: VESA_BODY,
            }}
          >
            Sample placeholder pieces for the atelier shop. Replace these listings with the real
            collection when it is ready.
          </p>

          <VesaGoldRule />
        </section>

        <section className="grid gap-10 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </section>
      </div>
      <BlogScrollToTop />
    </VesaLayout>
  );
}
