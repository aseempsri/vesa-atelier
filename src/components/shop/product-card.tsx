import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { formatInrFromPaise } from "@/lib/shop/money";
import { getCategoryById } from "@/lib/shop/categories";
import { shopAnalytics } from "@/lib/shop/analytics-events";
import type { Product } from "@/lib/shop/types";
import {
  vesaSans,
  vesaSerif,
  VESA_BODY,
  VESA_CREAM,
  VESA_GOLD,
  VESA_GOLD_FAINT,
  VESA_GOLD_SOFT,
} from "@/lib/vesa-brand";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const images = [...product.images].sort((a, b) => a.position - b.position);
  const primary = images[0];
  const secondary = images[1];
  const [hovered, setHovered] = useState(false);
  const category = getCategoryById(product.categoryId);
  const shown = hovered && secondary ? secondary : primary;

  return (
    <article
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        to="/shop/$slug"
        params={{ slug: product.slug }}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        style={{ outlineColor: VESA_GOLD }}
        onClick={() => shopAnalytics.selectItem(product)}
      >
        <div
          className="relative aspect-[4/5] overflow-hidden border"
          style={{ borderColor: VESA_GOLD_FAINT, background: "#100e12" }}
        >
          {shown ? (
            <img
              src={shown.src}
              alt={shown.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-opacity duration-700 ease-out motion-reduce:transition-none"
              style={{
                objectPosition:
                  shown.focalPointX !== undefined && shown.focalPointY !== undefined
                    ? `${shown.focalPointX}% ${shown.focalPointY}%`
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
          {product.isSample ? (
            <span
              className="absolute left-3 top-3 uppercase"
              style={{
                fontFamily: vesaSans,
                fontSize: "0.5rem",
                letterSpacing: "0.3em",
                color: VESA_GOLD,
              }}
            >
              Sample
            </span>
          ) : null}
        </div>
        <div className="mt-4 space-y-1.5">
          <h2
            style={{
              fontFamily: vesaSerif,
              fontSize: "1.35rem",
              color: VESA_CREAM,
              fontWeight: 400,
            }}
          >
            {product.name}
          </h2>
          {category ? (
            <p
              className="uppercase"
              style={{
                fontFamily: vesaSans,
                fontSize: "0.55rem",
                letterSpacing: "0.3em",
                color: VESA_GOLD_SOFT,
                paddingLeft: "0.3em",
              }}
            >
              {category.label}
            </p>
          ) : null}
          {product.shortDescription ? (
            <p style={{ fontFamily: vesaSerif, color: VESA_BODY, fontSize: "0.95rem" }}>
              {product.shortDescription}
            </p>
          ) : null}
          <p
            style={{
              fontFamily: vesaSans,
              color: VESA_CREAM,
              fontSize: "0.85rem",
              letterSpacing: "0.08em",
            }}
          >
            {formatInrFromPaise(product.priceInPaise)}
          </p>
        </div>
      </Link>
      <Link
        to="/shop/$slug"
        params={{ slug: product.slug }}
        className="mt-4 inline-flex w-fit uppercase transition-opacity hover:opacity-80"
        style={{
          fontFamily: vesaSans,
          fontSize: "0.55rem",
          letterSpacing: "0.35em",
          color: VESA_GOLD,
          borderBottom: `1px solid ${VESA_GOLD_FAINT}`,
          paddingBottom: "0.25rem",
          paddingLeft: "0.35em",
        }}
      >
        View details
      </Link>
    </article>
  );
}
