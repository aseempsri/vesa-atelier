import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { VesaGoldRule, VesaLayout } from "@/components/vesa-layout";
import {
  VESA_BODY,
  VESA_CREAM,
  VESA_GOLD,
  VESA_GOLD_FAINT,
  vesaSans,
  vesaSerif,
} from "@/lib/vesa-brand";
import { breadcrumbJsonLd, buildPageHead } from "@/lib/seo";

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
      jsonLd: breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    }),
});

const pillars = [
  {
    title: "Handcrafted",
    text: "Every candle is thoughtfully made with care, balancing modern minimalism with traditional warmth.",
  },
  {
    title: "Evocative",
    text: "From rich sandalwood to soft florals, each fragrance is chosen to evoke emotion, calmness, and connection.",
  },
  {
    title: "Intentional",
    text: "Not simply candles, but pieces that elevate a home, soothe the senses, and make a moment memorable.",
  },
];

function AboutPage() {
  return (
    <VesaLayout activeNav="about">
      <div className="relative">
        <div aria-hidden className="about-atmosphere" />

        <article className="relative z-[1] mx-auto max-w-5xl overflow-hidden px-6 pb-20 pt-4 md:px-10 md:pb-28 md:pt-10">
          <header className="relative min-h-[34rem] py-8 md:min-h-[38rem] md:py-14">
            <p className="about-kicker">The house of VESA · Our story</p>
            <h1 className="about-title">
              Made for the
              <br />
              <em>quiet moments.</em>
            </h1>
            <div className="about-intro-row">
              <div className="about-scroll-note" aria-hidden>
                <span />
                Our philosophy
              </div>
              <p className="about-intro">
                We believe the smallest moments often become the most meaningful—the quiet evenings,
                warm conversations, and soft glow that turns a space into a feeling.
              </p>
            </div>
          </header>

          <VesaGoldRule />

          <section className="about-manifesto">
            <p className="about-section-number">01</p>
            <div>
              <p className="about-kicker">Born from a feeling</p>
              <h2 className="about-heading">A personal passion, shaped into light.</h2>
              <p className="about-copy">
                Founded by Sandhya Srivastava, VESA Atelier grew from a deep love for elegant
                interiors, calming fragrances, and handcrafted artistry. What began personally
                became a dream of bringing warmth, comfort, and quiet sophistication into everyday
                living.
              </p>
            </div>
          </section>

          <section className="py-20 md:py-28">
            <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
              <div>
                <p className="about-kicker">Our approach</p>
                <h2 className="about-heading mt-4">Crafted with intention.</h2>
              </div>
              <span
                className="hidden h-px max-w-52 flex-1 md:block"
                style={{ background: VESA_GOLD_FAINT }}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="about-pillar">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="about-founder">
            <div className="about-founder-mark" aria-hidden>
              S
            </div>
            <div className="relative z-[1]">
              <p className="about-kicker">The founder</p>
              <blockquote>
                “Luxury feels most beautiful when it feels <em>personal.</em>”
              </blockquote>
              <p className="about-copy max-w-2xl">
                More than a brand, VESA Atelier is a reflection of intentional living—created for
                those who appreciate beauty in simplicity and find joy in meaningful details.
              </p>
              <p className="about-signature">Sandhya Srivastava</p>
              <p className="about-founder-label">Founder · VESA Atelier</p>
            </div>
          </section>

          <section className="py-24 text-center md:py-32">
            <p className="about-kicker">From our hands to your home</p>
            <h2
              className="about-closing-title mx-auto mt-5 max-w-3xl"
              style={{
                fontFamily: vesaSerif,
                fontSize: "clamp(2.25rem, 6vw, 4.75rem)",
                fontWeight: 300,
                lineHeight: 1.08,
                color: VESA_CREAM,
              }}
            >
              May our creations
              <br />
              become a part of
              <br />
              <em style={{ color: VESA_GOLD }}>your story.</em>
            </h2>
            <p
              className="about-closing-copy mx-auto mt-7 max-w-xl"
              style={{
                color: VESA_BODY,
                fontFamily: vesaSerif,
                fontSize: "1.15rem",
                lineHeight: 1.8,
              }}
            >
              For self-care evenings, thoughtful gifts, and beautifully styled corners. Thank you
              for supporting a dream built with passion, warmth, and light.
            </p>
            <Link to="/" className="about-cta">
              Enter the atelier
              <ArrowUpRight size={15} strokeWidth={1.4} />
            </Link>
          </section>
        </article>
      </div>
    </VesaLayout>
  );
}
