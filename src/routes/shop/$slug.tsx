import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BlogScrollToTop } from "@/components/blog-scroll-to-top";
import { VesaGoldRule, VesaLayout } from "@/components/vesa-layout";
import {
  availabilityLabel,
  formatInr,
  getProductBySlug,
  getProductCtaLabel,
  getProductEnquireUrl,
  isExternalUrl,
} from "@/lib/shop/products";
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
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildPageHead,
  DEFAULT_OG_IMAGE,
  productJsonLd,
} from "@/lib/seo";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) {
      throw notFound();
    }
    return { product };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    if (!product) {
      return buildPageHead({
        title: "Product not found",
        description: "This product could not be found.",
        path: "/shop",
        noIndex: true,
      });
    }
    const image = product.images[0] ? absoluteUrl(product.images[0]) : DEFAULT_OG_IMAGE;
    return buildPageHead({
      title: product.name,
      description: product.description,
      path: `/shop/${product.slug}`,
      image,
      imageAlt: product.name,
      keywords: product.tags,
      jsonLd: [
        productJsonLd(product),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: product.name, path: `/shop/${product.slug}` },
        ]),
      ],
    });
  },
  component: ProductPage,
});

const bodyStyle = {
  fontFamily: vesaSerif,
  fontWeight: 300,
  fontSize: "clamp(1.25rem, 2vw, 1.45rem)",
  lineHeight: 1.85,
  letterSpacing: "0.02em",
  color: VESA_BODY,
} as const;

function ProductCta({ href, label, disabled }: { href: string; label: string; disabled: boolean }) {
  const style = {
    fontFamily: vesaSans,
    fontSize: "0.62rem",
    letterSpacing: "0.32em",
    color: disabled ? VESA_GOLD_SOFT : VESA_GOLD,
    paddingLeft: "0.32em",
    border: `1px solid ${VESA_GOLD_FAINT}`,
    opacity: disabled ? 0.55 : 1,
  } as const;

  if (disabled) {
    return (
      <span className="inline-flex items-center px-6 py-4 uppercase" style={style}>
        {label}
      </span>
    );
  }

  const external = isExternalUrl(href);

  return (
    <a
      href={href}
      className="inline-flex items-center px-6 py-4 uppercase transition-opacity hover:opacity-80"
      style={style}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </a>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [mounted, setMounted] = useState(false);
  const [activeImage, setActiveImage] = useState(product.images[0] ?? "");
  const enquireUrl = getProductEnquireUrl(product);
  const ctaLabel = getProductCtaLabel(product);
  const soldOut = product.availability === "sold_out";

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setActiveImage(product.images[0] ?? "");
  }, [product]);

  return (
    <VesaLayout activeNav="shop">
      <article
        className="mx-auto max-w-2xl px-6 pb-16 pt-4 md:px-8 md:pb-24 md:pt-8 lg:max-w-3xl"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 900ms ease-out, transform 900ms ease-out",
        }}
      >
        <Link
          to="/shop"
          className="inline-block uppercase transition-opacity hover:opacity-80"
          style={{
            fontFamily: vesaSans,
            fontSize: "0.7rem",
            letterSpacing: "0.4em",
            color: VESA_GOLD_SOFT,
            paddingLeft: "0.4em",
          }}
        >
          ← Back to Shop
        </Link>

        <p
          className="mt-8 uppercase"
          style={{
            fontFamily: vesaSans,
            fontSize: "0.75rem",
            letterSpacing: "0.55em",
            color: VESA_GOLD_SOFT,
            paddingLeft: "0.55em",
          }}
        >
          {product.category}
        </p>

        <h1
          className="mt-5 overflow-visible pb-1"
          style={{
            fontFamily: vesaSerif,
            fontWeight: 300,
            fontSize: "clamp(2.35rem, 5.5vw, 3.5rem)",
            lineHeight: 1.25,
            letterSpacing: "0.02em",
            background: VESA_WORDMARK_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 4px 24px rgba(201, 165, 90, 0.2))",
          }}
        >
          {product.name}
        </h1>

        <VesaGoldRule />

        {activeImage ? (
          <div className="overflow-hidden" style={{ border: `1px solid ${VESA_GOLD_FAINT}` }}>
            <img
              src={activeImage}
              alt={`${product.name} — placeholder image`}
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
        ) : null}

        {product.images.length > 1 ? (
          <div className="mt-4 flex gap-3">
            {product.images.map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(image)}
                aria-label="Show product image"
                className="overflow-hidden"
                style={{
                  width: "4.5rem",
                  height: "3.6rem",
                  border: `1px solid ${image === activeImage ? VESA_GOLD : VESA_GOLD_FAINT}`,
                }}
              >
                <img src={image} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span
            style={{
              fontFamily: vesaSerif,
              fontWeight: 400,
              fontSize: "clamp(1.7rem, 3vw, 2.1rem)",
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
                fontSize: "1.2rem",
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
              fontSize: "0.7rem",
              letterSpacing: "0.32em",
              color: VESA_GOLD,
              paddingLeft: "0.32em",
            }}
          >
            {availabilityLabel(product.availability)}
          </span>
        </div>

        <p className="mt-6" style={bodyStyle}>
          {product.shortDescription}
        </p>

        <div className="mt-8 space-y-5">
          {product.body.map((paragraph, i) => (
            <p key={i} style={bodyStyle}>
              {paragraph}
            </p>
          ))}
        </div>

        {product.tags.length ? (
          <p
            className="mt-8 uppercase"
            style={{
              fontFamily: vesaSans,
              fontSize: "0.62rem",
              letterSpacing: "0.28em",
              color: VESA_GOLD_SOFT,
              paddingLeft: "0.28em",
            }}
          >
            {product.tags.join(" · ")}
          </p>
        ) : null}

        <div className="mt-10">
          <ProductCta href={enquireUrl} label={ctaLabel} disabled={soldOut} />
        </div>

        <VesaGoldRule />

        <div className="text-center">
          <Link
            to="/shop"
            className="inline-block uppercase transition-opacity hover:opacity-80"
            style={{
              fontFamily: vesaSans,
              fontSize: "0.75rem",
              letterSpacing: "0.35em",
              color: VESA_GOLD,
              paddingLeft: "0.35em",
            }}
          >
            More from the shop
          </Link>
        </div>
      </article>
      <BlogScrollToTop />
    </VesaLayout>
  );
}
