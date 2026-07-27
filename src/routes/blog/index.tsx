import { Link, createFileRoute } from "@tanstack/react-router";
import { BlogScrollToTop } from "@/components/blog-scroll-to-top";
import { VesaGoldRule, VesaLayout } from "@/components/vesa-layout";
import { getAllPosts } from "@/lib/blog/posts";
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
import { blogJsonLd, breadcrumbJsonLd, buildPageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  component: BlogPage,
  head: () =>
    buildPageHead({
      title: "Blog",
      description:
        "Reflections from VESA Atelier — thoughts on calm, self-worth, boundaries, and living with intention.",
      path: "/blog",
      keywords: [
        "VESA Atelier blog",
        "self worth",
        "mindfulness reflections",
        "intentional living",
      ],
      jsonLd: [
        blogJsonLd(),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]),
      ],
    }),
});

function BlogPage() {
  const posts = getAllPosts();

  return (
    <VesaLayout activeNav="blog">
      <div className="mx-auto max-w-2xl px-6 pb-16 pt-4 md:px-8 md:pb-24 md:pt-8 lg:max-w-3xl">
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
            Journal
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
            Blog
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
            Quiet reflections on presence, self-worth, and the light we carry
            within.
          </p>

          <VesaGoldRule />
        </section>

        <section className="space-y-10">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="relative block px-6 py-8 transition-opacity hover:opacity-90 md:px-10 md:py-10"
              style={{ border: `1px solid ${VESA_GOLD_FAINT}` }}
            >
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
                {post.eyebrow}
              </p>

              <h2
                className="mt-4 overflow-visible pb-1"
                style={{
                  fontFamily: vesaSerif,
                  fontWeight: 400,
                  fontSize: "clamp(1.75rem, 3.5vw, 2.35rem)",
                  lineHeight: 1.3,
                  letterSpacing: "0.02em",
                  color: VESA_CREAM,
                }}
              >
                {post.title}
              </h2>

              <div className="mt-6">
                <p
                  className="overflow-visible pb-1"
                  style={{
                    fontFamily: vesaSerif,
                    fontWeight: 400,
                    fontStyle: "italic",
                    fontSize: "clamp(1.25rem, 2.4vw, 1.55rem)",
                    lineHeight: 1.4,
                    letterSpacing: "0.01em",
                    color: VESA_CREAM,
                  }}
                >
                  {post.subtitle}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span
                    aria-hidden
                    style={{ color: VESA_GOLD, fontSize: "0.4rem" }}
                  >
                    ◆
                  </span>
                  <span
                    className="h-px flex-1"
                    style={{
                      background: `linear-gradient(90deg, ${VESA_GOLD}, transparent)`,
                      maxWidth: "4.5rem",
                      opacity: 0.7,
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {post.excerptLines.slice(0, 3).map((line, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: vesaSerif,
                      fontWeight: 300,
                      fontSize: "clamp(1.25rem, 2vw, 1.4rem)",
                      lineHeight: 1.75,
                      letterSpacing: "0.02em",
                      color: VESA_BODY,
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>

              <p
                className="mt-2 flex flex-wrap items-baseline gap-x-3"
                style={{
                  fontFamily: vesaSerif,
                  fontWeight: 300,
                  fontSize: "1.45rem",
                  letterSpacing: "0.15em",
                  color: VESA_GOLD_SOFT,
                }}
              >
                <span>…</span>
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
                  Read more
                </span>
              </p>
            </Link>
          ))}
        </section>
      </div>
      <BlogScrollToTop />
    </VesaLayout>
  );
}
