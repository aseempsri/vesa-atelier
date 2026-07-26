import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { VesaGoldRule, VesaLayout } from "@/components/vesa-layout";
import { getPostBySlug, type BlogBlock, type BlogSection } from "@/lib/blog/posts";
import {
  VESA_BODY,
  VESA_CREAM,
  VESA_GOLD,
  VESA_GOLD_SOFT,
  VESA_WORDMARK_GRADIENT,
  vesaSans,
  vesaSerif,
} from "@/lib/vesa-brand";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) {
      throw notFound();
    }
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return { meta: [{ title: "Post not found — VESA Atelier" }] };
    }
    return {
      meta: [
        { title: `${post.title} — VESA Atelier` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
      ],
    };
  },
  component: BlogPostPage,
});

const bodyStyle = {
  fontFamily: vesaSerif,
  fontWeight: 300,
  fontSize: "clamp(1.25rem, 2vw, 1.45rem)",
  lineHeight: 1.85,
  letterSpacing: "0.02em",
  color: VESA_BODY,
} as const;

function BlogBlockView({ block }: { block: BlogBlock }) {
  if (block.type === "list") {
    return (
      <ul className="space-y-3 pl-1">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3"
            style={bodyStyle}
          >
            <span
              aria-hidden
              className="mt-[0.7em] shrink-0"
              style={{ color: VESA_GOLD, fontSize: "0.4rem" }}
            >
              ◆
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return <p style={bodyStyle}>{block.text}</p>;
}

function BlogSectionView({ section }: { section: BlogSection }) {
  return (
    <section className="space-y-6">
      {section.heading ? (
        <div className="pt-4">
          <div className="mb-4 flex items-center gap-3">
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
          <h2
            style={{
              fontFamily: vesaSerif,
              fontWeight: 500,
              fontSize: "clamp(1.9rem, 3.4vw, 2.4rem)",
              lineHeight: 1.25,
              letterSpacing: "0.03em",
              background: VESA_WORDMARK_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {section.heading}
          </h2>
        </div>
      ) : null}
      <div className="space-y-5">
        {section.blocks.map((block, i) => (
          <BlogBlockView key={i} block={block} />
        ))}
      </div>
    </section>
  );
}

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  return (
    <VesaLayout activeNav="blog">
      <article
        className="mx-auto max-w-2xl px-6 pb-16 pt-4 md:px-8 md:pb-24 md:pt-8 lg:max-w-3xl"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 900ms ease-out, transform 900ms ease-out",
        }}
      >
        <Link
          to="/blog"
          className="inline-block uppercase transition-opacity hover:opacity-80"
          style={{
            fontFamily: vesaSans,
            fontSize: "0.7rem",
            letterSpacing: "0.4em",
            color: VESA_GOLD_SOFT,
            paddingLeft: "0.4em",
          }}
        >
          ← Back to Blog
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
          {post.eyebrow}
        </p>

        <h1
          className="mt-5"
          style={{
            fontFamily: vesaSerif,
            fontWeight: 300,
            fontSize: "clamp(2.35rem, 5.5vw, 3.5rem)",
            lineHeight: 1.15,
            letterSpacing: "0.02em",
            background: VESA_WORDMARK_GRADIENT,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 4px 24px rgba(201, 165, 90, 0.2))",
          }}
        >
          {post.title}
        </h1>

        <VesaGoldRule />

        <div className="space-y-14 md:space-y-16">
          {post.sections.map((section, i) => (
            <BlogSectionView key={i} section={section} />
          ))}
        </div>

        <VesaGoldRule />

        <div className="text-center">
          <p
            style={{
              fontFamily: vesaSerif,
              fontWeight: 400,
              fontSize: "clamp(1.4rem, 2.5vw, 1.75rem)",
              fontStyle: "italic",
              letterSpacing: "0.04em",
              color: VESA_CREAM,
            }}
          >
            {post.closingThought}
          </p>
          <Link
            to="/blog"
            className="mt-8 inline-block uppercase transition-opacity hover:opacity-80"
            style={{
              fontFamily: vesaSans,
              fontSize: "0.75rem",
              letterSpacing: "0.35em",
              color: VESA_GOLD,
              paddingLeft: "0.35em",
            }}
          >
            More reflections
          </Link>
        </div>
      </article>
    </VesaLayout>
  );
}
