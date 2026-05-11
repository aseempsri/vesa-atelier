import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroImage from "@/assets/vesa-hero.jpg";
import marbleTexture from "@/assets/vesa-marble.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "VESA Atelier — Coming Soon" },
      { name: "description", content: "VESA Atelier — luxury hand-poured candles. A new house of light, opening soon at vesa.co.in" },
      { property: "og:title", content: "VESA Atelier — Coming Soon" },
      { property: "og:description", content: "A new house of light. Hand-poured candles, opening soon." },
    ],
  }),
});

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
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#08070a" }}
    >
      {/* Marble texture base */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-60"
        style={{
          backgroundImage: `url(${marbleTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      />
      {/* Vignette over marble */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 0%, rgba(8,7,10,0.65) 55%, rgba(8,7,10,0.98) 100%)",
        }}
      />

      {/* Hero candle photograph — full bleed */}
      <div
        className={`absolute inset-0 z-[2] transition-opacity ease-out`}
        style={{
          opacity: mounted ? 1 : 0,
          transitionDuration: "2400ms",
        }}
      >
        <img
          src={heroImage}
          alt="A single ivory candle burning against smoked glass and dark marble"
          className="h-full w-full object-cover"
          style={{
            objectPosition: "center 40%",
            transform: `translateY(${scrollY * -0.08}px) scale(${1 + scrollY * 0.0002})`,
            transition: "transform 0.1s linear",
          }}
        />
        {/* darkening overlay to let type breathe */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,7,10,0.55) 0%, rgba(8,7,10,0.15) 35%, rgba(8,7,10,0.25) 65%, rgba(8,7,10,0.85) 100%)",
          }}
        />
      </div>

      {/* Subtle film grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[15] opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* TOP CHROME */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <div
          className="text-[0.6rem] uppercase"
          style={{
            letterSpacing: "0.4em",
            color: "rgba(212, 175, 122, 0.75)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
          }}
        >
          MMXXVI
        </div>
        <div
          className="text-[0.6rem] uppercase"
          style={{
            letterSpacing: "0.4em",
            color: "rgba(212, 175, 122, 0.75)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
          }}
        >
          India
        </div>
      </header>

      {/* MAIN CONTENT */}
      <section className="relative z-20 flex min-h-screen flex-col items-center justify-between px-6 pb-10 pt-24 md:pt-28">
        {/* Top: tiny eyebrow */}
        <div
          className="flex flex-col items-center transition-all ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(-8px)",
            transitionDuration: "1800ms",
            transitionDelay: "200ms",
          }}
        >
          <span
            className="text-[0.55rem] uppercase md:text-[0.65rem]"
            style={{
              letterSpacing: "0.7em",
              color: "rgba(232, 220, 198, 0.55)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
            }}
          >
            Maison de Lumière
          </span>
        </div>

        {/* Center: WORDMARK */}
        <div className="flex flex-col items-center">
          <h1
            className="leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(5rem, 26vw, 18rem)",
              letterSpacing: "0.06em",
              background:
                "linear-gradient(180deg, #f4e4c1 0%, #d4af7a 35%, #a47842 70%, #6b4a25 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 2px 30px rgba(212, 175, 122, 0.25))",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 2200ms ease-out 400ms, transform 2200ms ease-out 400ms",
            }}
          >
            VESA
          </h1>

          <div
            className="mt-3 flex items-center gap-3 md:gap-5"
            style={{
              opacity: mounted ? 1 : 0,
              transition: "opacity 2000ms ease-out 1100ms",
            }}
          >
            <span
              className="h-px w-8 md:w-14"
              style={{ background: "linear-gradient(90deg, transparent, rgba(212, 175, 122, 0.7))" }}
            />
            <span
              className="uppercase"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(0.65rem, 1.5vw, 0.85rem)",
                letterSpacing: "0.55em",
                color: "rgba(232, 220, 198, 0.85)",
                paddingLeft: "0.55em",
              }}
            >
              Atelier
            </span>
            <span
              className="h-px w-8 md:w-14"
              style={{ background: "linear-gradient(270deg, transparent, rgba(212, 175, 122, 0.7))" }}
            />
          </div>
        </div>

        {/* Bottom: Coming Soon + domain */}
        <div
          className="flex w-full max-w-3xl flex-col items-center gap-6"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 2000ms ease-out 1500ms, transform 2000ms ease-out 1500ms",
          }}
        >
          <p
            className="max-w-md text-center"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
              letterSpacing: "0.02em",
              lineHeight: 1.6,
              color: "rgba(232, 220, 198, 0.7)",
            }}
          >
            A house of hand-poured candles.
            <br />
            Composed in shadow, finished in light.
          </p>

          <div className="flex items-center gap-4">
            <span className="h-px w-10" style={{ background: "rgba(212, 175, 122, 0.5)" }} />
            <span
              className="relative uppercase"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: "0.65rem",
                letterSpacing: "0.55em",
                color: "rgba(244, 228, 193, 0.95)",
                paddingLeft: "0.55em",
              }}
            >
              Coming Soon
            </span>
            <span className="h-px w-10" style={{ background: "rgba(212, 175, 122, 0.5)" }} />
          </div>

          <div
            className="mt-2 text-[0.6rem] uppercase"
            style={{
              letterSpacing: "0.5em",
              color: "rgba(212, 175, 122, 0.6)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              paddingLeft: "0.5em",
            }}
          >
            vesa.co.in
          </div>
        </div>
      </section>
    </main>
  );
}
