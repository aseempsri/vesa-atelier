import { createFileRoute } from "@tanstack/react-router";
import { VesaGoldRule, VesaLayout } from "@/components/vesa-layout";
import {
  VESA_BODY,
  VESA_CREAM,
  VESA_GOLD,
  VESA_GOLD_SOFT,
  vesaSans,
  vesaSerif,
} from "@/lib/vesa-brand";
import {
  breadcrumbJsonLd,
  buildPageHead,
  personJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () =>
    buildPageHead({
      title: "About",
      description:
        "Learn about VESA Atelier — handcrafted candles founded by Sandhya Srivastava, blending luxurious fragrances with timeless aesthetics.",
      path: "/about",
      keywords: [
        "about VESA Atelier",
        "Sandhya Srivastava",
        "handcrafted candles",
        "Bombay atelier",
      ],
      jsonLd: [
        webPageJsonLd({
          title: "About",
          description:
            "Learn about VESA Atelier — handcrafted candles founded by Sandhya Srivastava, blending luxurious fragrances with timeless aesthetics.",
          path: "/about",
        }),
        personJsonLd(),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]),
      ],
    }),
});

const paragraphs = [
  "At VESA Atelier, we believe that the smallest moments often become the most meaningful ones — the quiet evenings, the warm conversations, the soft glow that turns a space into a feeling.",
  "Founded by Sandhya Srivastava, VESA Atelier was born from a deep love for elegant interiors, calming fragrances, and the beauty of handcrafted artistry. What began as a personal passion slowly transformed into a dream of creating products that bring warmth, comfort, and sophistication into everyday living.",
  "Every candle at VESA Atelier is thoughtfully handcrafted with care, blending luxurious fragrances with timeless aesthetics. Inspired by modern minimalism and traditional warmth, our creations are designed not just as candles, but as experiences — pieces that elevate your home, soothe your senses, and create moments worth remembering.",
  "From rich sandalwood notes to soft floral blends, every fragrance is carefully chosen to evoke emotion, calmness, and connection. Our collections are created for people who appreciate beauty in simplicity and find joy in meaningful details.",
  "More than a brand, VESA Atelier is a reflection of intentional living — where luxury feels personal, and every product carries a touch of soul.",
  "Whether it's a quiet self-care evening, a thoughtful gift, or a beautifully styled home corner, we hope our creations become a part of your story.",
  "Thank you for being here and for supporting a dream built with passion, warmth, and light.",
];

function AboutPage() {
  return (
    <VesaLayout activeNav="about">
      <article className="mx-auto max-w-2xl px-6 pb-16 pt-4 md:px-8 md:pb-24 md:pt-8 lg:max-w-3xl">
        <p
          className="uppercase"
          style={{
            fontFamily: vesaSans,
            fontSize: "0.6rem",
            letterSpacing: "0.65em",
            color: VESA_GOLD_SOFT,
            paddingLeft: "0.65em",
          }}
        >
          Our story
        </p>

        <h1
          className="mt-5"
          style={{
            fontFamily: vesaSerif,
            fontWeight: 300,
            fontSize: "clamp(2.5rem, 6vw, 3.75rem)",
            lineHeight: 1.1,
            letterSpacing: "0.02em",
            background:
              "linear-gradient(180deg, #f6e6c3 0%, #d8b97f 30%, #b48947 65%, #6e4a23 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 4px 24px rgba(201, 165, 90, 0.2))",
          }}
        >
          About VESA Atelier
        </h1>

        <VesaGoldRule />

        <div className="space-y-7">
          {paragraphs.map((text, i) => (
            <p
              key={i}
              style={{
                fontFamily: vesaSerif,
                fontWeight: 300,
                fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)",
                lineHeight: 1.85,
                letterSpacing: "0.02em",
                color: VESA_BODY,
              }}
            >
              {text}
            </p>
          ))}
        </div>

        <VesaGoldRule />

        <div className="text-center">
          <p
            style={{
              fontFamily: vesaSerif,
              fontWeight: 400,
              fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
              fontStyle: "italic",
              letterSpacing: "0.04em",
              color: VESA_CREAM,
            }}
          >
            Welcome to VESA Atelier.
          </p>
          <p
            className="mt-6 uppercase"
            style={{
              fontFamily: vesaSans,
              fontSize: "0.6rem",
              letterSpacing: "0.55em",
              color: VESA_GOLD,
              paddingLeft: "0.55em",
            }}
          >
            Founded by Sandhya Srivastava
          </p>
        </div>
      </article>
    </VesaLayout>
  );
}
