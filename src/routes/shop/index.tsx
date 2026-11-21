import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/shop/product-card";
import { VesaGoldRule, VesaLayout } from "@/components/vesa-layout";
import {
  filterAndSortProducts,
  getActiveProducts,
  getVisibleCategories,
} from "@/lib/shop/catalogue";
import { storeConfig } from "@/lib/shop/config";
import { shopAnalytics } from "@/lib/shop/analytics-events";
import type { SortOption } from "@/lib/shop/types";
import { breadcrumbJsonLd, buildPageHead, itemListJsonLd, webPageJsonLd } from "@/lib/seo";
import {
  vesaSans,
  vesaSerif,
  VESA_BODY,
  VESA_CREAM,
  VESA_GOLD,
  VESA_GOLD_FAINT,
  VESA_GOLD_SOFT,
  VESA_WORDMARK_GRADIENT,
} from "@/lib/vesa-brand";

export const Route = createFileRoute("/shop/")({
  component: ShopPage,
  head: () => {
    const products = getActiveProducts();
    return buildPageHead({
      title: "Shop",
      description:
        "The VESA Collection — hand-poured candles and crafted objects from the atelier.",
      path: "/shop",
      keywords: [
        "VESA Atelier shop",
        "hand-poured candles",
        "buy candles India",
        "DIY candle kits",
      ],
      jsonLd: [
        webPageJsonLd({
          title: "Shop",
          description:
            "The VESA Collection — hand-poured candles and crafted objects from the atelier.",
          path: "/shop",
        }),
        itemListJsonLd(
          products
            .filter((p) => !p.isSample)
            .map((p) => ({
              name: p.name,
              path: `/shop/${p.slug}`,
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

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price — Low to High" },
  { value: "price_desc", label: "Price — High to Low" },
];

function ShopPage() {
  const products = useMemo(() => getActiveProducts(), []);
  const categories = useMemo(() => getVisibleCategories(), []);
  const [categoryId, setCategoryId] = useState<string>("");
  const [sort, setSort] = useState<SortOption>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(
    () =>
      filterAndSortProducts(products, {
        categoryId: categoryId || undefined,
        sort,
      }),
    [products, categoryId, sort],
  );

  useEffect(() => {
    shopAnalytics.viewItemList(filtered);
  }, [filtered]);

  const clearFilters = () => {
    setCategoryId("");
    setSort("featured");
  };

  const hasFilters = Boolean(categoryId) || sort !== "featured";

  return (
    <VesaLayout activeNav="shop">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-4 md:px-8 md:pb-24 md:pt-8">
        <section className="max-w-2xl">
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
            {storeConfig.shopIntro.eyebrow}
          </p>
          <h1
            className="mt-4 text-4xl md:text-5xl"
            style={{
              fontFamily: vesaSerif,
              fontWeight: 300,
              background: VESA_WORDMARK_GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {storeConfig.shopIntro.heading}
          </h1>
          <p
            className="mt-5"
            style={{
              fontFamily: vesaSerif,
              fontSize: "1.15rem",
              color: VESA_BODY,
              lineHeight: 1.7,
            }}
          >
            {storeConfig.shopIntro.supporting}
          </p>
        </section>

        <VesaGoldRule />

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            className="md:hidden uppercase"
            style={{
              fontFamily: vesaSans,
              fontSize: "0.55rem",
              letterSpacing: "0.35em",
              color: VESA_GOLD,
              borderBottom: `1px solid ${VESA_GOLD_FAINT}`,
              paddingBottom: "0.2rem",
            }}
            onClick={() => setFiltersOpen((o) => !o)}
            aria-expanded={filtersOpen}
          >
            {filtersOpen ? "Hide filters" : "Filters & sort"}
          </button>

          <div
            className={`${filtersOpen ? "flex" : "hidden"} w-full flex-col gap-4 md:flex md:w-auto md:flex-row md:items-end`}
          >
            {categories.length > 0 ? (
              <label className="flex flex-col gap-2">
                <span
                  className="uppercase"
                  style={{
                    fontFamily: vesaSans,
                    fontSize: "0.5rem",
                    letterSpacing: "0.3em",
                    color: VESA_GOLD_SOFT,
                  }}
                >
                  Category
                </span>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="border bg-transparent px-3 py-2 outline-none"
                  style={{
                    borderColor: VESA_GOLD_FAINT,
                    color: VESA_CREAM,
                    fontFamily: vesaSans,
                    fontSize: "0.8rem",
                  }}
                >
                  <option value="">All</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            <label className="flex flex-col gap-2">
              <span
                className="uppercase"
                style={{
                  fontFamily: vesaSans,
                  fontSize: "0.5rem",
                  letterSpacing: "0.3em",
                  color: VESA_GOLD_SOFT,
                }}
              >
                Sort
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="border bg-transparent px-3 py-2 outline-none"
                style={{
                  borderColor: VESA_GOLD_FAINT,
                  color: VESA_CREAM,
                  fontFamily: vesaSans,
                  fontSize: "0.8rem",
                }}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="uppercase self-start md:self-end md:mb-2"
                style={{
                  fontFamily: vesaSans,
                  fontSize: "0.5rem",
                  letterSpacing: "0.3em",
                  color: VESA_GOLD_SOFT,
                }}
              >
                Clear filters
              </button>
            ) : null}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p
              style={{
                fontFamily: vesaSerif,
                color: VESA_BODY,
                fontSize: "1.25rem",
              }}
            >
              The collection is being prepared. Pieces will appear here when they are ready.
            </p>
            <p
              className="mt-4 uppercase"
              style={{
                fontFamily: vesaSans,
                fontSize: "0.55rem",
                letterSpacing: "0.3em",
                color: VESA_GOLD_SOFT,
              }}
            >
              Sample catalogue can be enabled locally with VITE_STORE_SAMPLE_CATALOGUE=true
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </VesaLayout>
  );
}
