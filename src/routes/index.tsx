import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import heroImage from "@/assets/vesa-hero.jpg";
import marbleTexture from "@/assets/vesa-marble.jpg";
import { VesaLogo } from "@/components/vesa-logo";
import { VESA_WORDMARK_GRADIENT } from "@/lib/vesa-brand";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "VESA Atelier — A House of Hand-Poured Light" },
      {
        name: "description",
        content:
          "VESA Atelier — a house of hand-poured candles. The first collection arrives soon at vesa.co.in",
      },
      { property: "og:title", content: "VESA Atelier — Coming Soon" },
      {
        property: "og:description",
        content: "A house of hand-poured candles. The first collection arrives soon.",
      },
    ],
  }),
});

const GOLD = "#c9a55a";
const GOLD_SOFT = "rgba(201, 165, 90, 0.55)";
const GOLD_FAINT = "rgba(201, 165, 90, 0.22)";
const CREAM = "#ece2c9";

function Embers() {
  const embers = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 14,
        duration: 12 + Math.random() * 14,
        drift: (Math.random() - 0.5) * 80,
        opacity: 0.25 + Math.random() * 0.55,
      })),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[14] overflow-hidden">
      {embers.map((e) => (
        <span
          key={e.id}
          className="absolute rounded-full"
          style={{
            left: `${e.left}%`,
            bottom: "-10px",
            width: `${e.size}px`,
            height: `${e.size}px`,
            background: GOLD,
            boxShadow: `0 0 ${e.size * 4}px ${e.size}px rgba(255, 190, 110, 0.5)`,
            opacity: e.opacity,
            animation: `vesa-ember ${e.duration}s linear ${e.delay}s infinite`,
            // CSS variable for keyframe drift
            ["--drift" as never]: `${e.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

function Index() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <main
      className="relative h-dvh max-h-dvh w-full overflow-hidden"
      style={{ backgroundColor: "#08070a" }}
    >
      {/* ── Marble base ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-50"
        style={{
          backgroundImage: `url(${marbleTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${scrollY * 0.12}px)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, transparent 0%, rgba(8,7,10,0.55) 55%, rgba(8,7,10,0.98) 100%)",
        }}
      />

      {/* ── Hero photograph (right-anchored, full bleed) ── */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 2600ms ease-out",
        }}
      >
        <img
          src={heroImage}
          alt="Three ivory pillar candles on dark veined marble, one burning, the others smoldering"
          className="h-full w-full object-cover"
          style={{
            objectPosition: "right center",
            transform: `translateY(${scrollY * -0.06}px) scale(${1 + scrollY * 0.00015})`,
            transition: "transform 0.1s linear",
          }}
        />
        {/* Cinematic darkening + left-side lift for type */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(8,7,10,0.95) 0%, rgba(8,7,10,0.75) 30%, rgba(8,7,10,0.25) 60%, rgba(8,7,10,0) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,7,10,0.55) 0%, rgba(8,7,10,0) 25%, rgba(8,7,10,0) 70%, rgba(8,7,10,0.85) 100%)",
          }}
        />
      </div>

      {/* ── Drifting golden embers ── */}
      <Embers />

      {/* ── Film grain ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[15] opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* ── Hairline gold frame around viewport ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-4 z-[16] hidden md:block"
        style={{ border: `1px solid ${GOLD_FAINT}` }}
      >
        {/* corner ornaments */}
        {[
          { top: -5, left: -5 },
          { top: -5, right: -5 },
          { bottom: -5, left: -5 },
          { bottom: -5, right: -5 },
        ].map((pos, i) => (
          <span
            key={i}
            className="absolute h-[10px] w-[10px] rotate-45"
            style={{ ...pos, border: `1px solid ${GOLD_SOFT}`, background: "#08070a" }}
          />
        ))}
      </div>

      {/* ── Top chrome ── */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-8 py-7 md:px-16 md:py-10">
        <div
          className="hidden items-center gap-3 text-[0.6rem] uppercase md:flex"
          style={{
            letterSpacing: "0.4em",
            color: GOLD_SOFT,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
          }}
        >
          <span style={{ color: GOLD }}>◆</span>
          <span style={{ paddingLeft: "0.4em" }}>Maison · Bombay</span>
        </div>
        <div className="ml-auto flex items-center gap-6 md:gap-8">
          <Link
            to="/about"
            className="text-[0.6rem] uppercase transition-opacity hover:opacity-80"
            style={{
              letterSpacing: "0.4em",
              color: GOLD_SOFT,
              fontFamily: "'Inter', sans-serif",
              paddingLeft: "0.4em",
            }}
          >
            About
          </Link>
          <Link
            to="/blog"
            className="text-[0.6rem] uppercase transition-opacity hover:opacity-80"
            style={{
              letterSpacing: "0.4em",
              color: GOLD_SOFT,
              fontFamily: "'Inter', sans-serif",
              paddingLeft: "0.4em",
            }}
          >
            Blog
          </Link>
        </div>
      </header>

      {/* ── Vertical edge labels ── */}
      <div
        aria-hidden
        className="absolute left-6 top-1/2 z-30 hidden -translate-y-1/2 -rotate-90 lg:block"
        style={{
          letterSpacing: "0.65em",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.55rem",
          color: GOLD_SOFT,
          textTransform: "uppercase",
          fontWeight: 400,
          paddingLeft: "0.65em",
        }}
      >
        Cire · Parfum · Lumière
      </div>
      <div
        aria-hidden
        className="absolute right-6 top-1/2 z-30 hidden -translate-y-1/2 rotate-90 lg:block"
        style={{
          letterSpacing: "0.65em",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.55rem",
          color: GOLD_SOFT,
          textTransform: "uppercase",
          fontWeight: 400,
          paddingLeft: "0.65em",
        }}
      >
        N° 001 · Première Collection
      </div>

      {/* ── Main content ── */}
      <section className="relative z-20 flex h-full flex-col justify-center px-8 pb-8 pt-16 md:justify-start md:px-20 md:pb-20 md:pt-28 lg:px-32">
        <div className="flex w-full flex-col items-center md:mt-auto md:items-start">
          {/* Logo + wordmark + tagline — aligned to each other; block sits left on desktop */}
          <div className="flex w-full flex-col items-center text-center md:w-fit md:max-w-xl md:translate-x-[10%] md:-translate-y-[10%]">
            {/* Logo + VESA — locked on one center axis */}
            <div
              className="flex flex-col items-center"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(-12px)",
                transition: "opacity 1800ms ease-out 200ms, transform 1800ms ease-out 200ms",
              }}
            >
              <VesaLogo
                animated
                className="h-[8.5rem] w-[8.5rem] md:h-[15.6rem] md:w-[15.6rem]"
              />
            <h1
              className="mt-1 w-fit text-center text-[clamp(5rem,18vw,7.25rem)] md:mt-3 md:text-[clamp(5.5rem,9vw,12rem)] lg:text-[clamp(6rem,8vw,13rem)]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                lineHeight: 0.85,
                letterSpacing: "0.02em",
                background: VESA_WORDMARK_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 4px 40px rgba(201, 165, 90, 0.28))",
                transition: "opacity 2400ms ease-out 600ms, transform 2400ms ease-out 600ms",
              }}
            >
              VESA
            </h1>
            </div>

            <div
              className="mt-3 flex flex-col items-center md:mt-4"
              style={{
                opacity: mounted ? 1 : 0,
                transition: "opacity 2000ms ease-out 1300ms",
              }}
            >
              <div className="flex items-center justify-center gap-4 md:gap-6">
                <span
                  className="h-px w-12 md:w-20"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${GOLD})`,
                  }}
                />
                <div className="flex flex-col items-center">
                  <span
                    className="uppercase"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 400,
                      fontStyle: "italic",
                      fontSize: "clamp(0.95rem, 2vw, 1.4rem)",
                      letterSpacing: "0.55em",
                      color: CREAM,
                      paddingLeft: "0.55em",
                    }}
                  >
                    Atelier
                  </span>
                  <p
                    className="mt-2 uppercase"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.55rem",
                      letterSpacing: "0.45em",
                      color: GOLD_SOFT,
                      fontWeight: 400,
                      paddingLeft: "0.45em",
                    }}
                  >
                    Crafted Elegance
                  </p>
                </div>
                <span
                  className="h-px w-12 md:w-20"
                  style={{
                    background: `linear-gradient(270deg, transparent, ${GOLD})`,
                  }}
                />
              </div>
            </div>

            <p
              className="mt-6 max-w-md text-center md:mt-10 md:max-w-none md:whitespace-nowrap"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                letterSpacing: "0.03em",
                lineHeight: 1.7,
                color: "rgba(232, 220, 198, 0.78)",
                opacity: mounted ? 1 : 0,
                transition: "opacity 2200ms ease-out 1600ms",
              }}
            >
              A house of hand-poured candles —
              <br className="md:hidden" />
              {" "}
              composed in shadow, finished in light.
            </p>
          </div>

        {/* Bottom row */}
        <div
          className="mt-8 flex w-full flex-col items-center gap-3 md:mt-14 md:flex-row md:items-end md:justify-between md:gap-0 lg:mt-16"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 2200ms ease-out 1900ms, transform 2200ms ease-out 1900ms",
          }}
        >
          {/* Coming soon */}
          <div className="flex items-center gap-4">
            <span
              className="relative hidden h-1.5 w-1.5 rounded-full md:block"
              style={{
                background: GOLD,
                boxShadow: `0 0 14px ${GOLD}`,
                animation: "vesa-pulse 2.4s ease-in-out infinite",
              }}
            />
            <span
              className="uppercase"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: "0.65rem",
                letterSpacing: "0.55em",
                color: CREAM,
                paddingLeft: "0.55em",
              }}
            >
              Coming Soon
            </span>
          </div>

          {/* Domain */}
          <div className="flex items-center gap-3">
            <span
              className="uppercase"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: "0.6rem",
                letterSpacing: "0.5em",
                color: GOLD_SOFT,
                paddingLeft: "0.5em",
              }}
            >
              vesa.co.in
            </span>
          </div>
        </div>
        </div>

      </section>

      <style>{`
        @keyframes vesa-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.6); }
        }
        @keyframes vesa-ember {
          0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
          10% { opacity: var(--ember-opacity, 0.6); }
          90% { opacity: var(--ember-opacity, 0.6); }
          100% { transform: translate(var(--drift, 0), -110vh) scale(1.1); opacity: 0; }
        }
      `}</style>
    </main>
  );
}
