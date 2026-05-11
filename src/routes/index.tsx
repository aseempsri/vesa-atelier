import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useEffect, useState } from "react";
import CandleScene from "@/components/CandleScene";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "VESA Atelier — Coming Soon" },
      { name: "description", content: "VESA Atelier — luxury candles, hand-poured. A new ritual of light is coming soon." },
      { property: "og:title", content: "VESA Atelier — Coming Soon" },
      { property: "og:description", content: "Luxury candles. Hand-poured. Slow-burning rituals." },
    ],
  }),
});

function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 60%, oklch(0.22 0.04 55) 0%, oklch(0.10 0.008 60) 55%, oklch(0.06 0.005 60) 100%)" }}
    >
      {/* film grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
        style={{ background: "radial-gradient(ellipse at center, transparent 40%, oklch(0.04 0 0 / 0.85) 100%)" }}
      />

      {/* top nav */}
      <header className="absolute inset-x-0 top-0 z-40 flex items-center justify-between px-8 py-7 md:px-16">
        <div
          className="text-[0.65rem] uppercase tracking-[0.45em]"
          style={{ color: "oklch(0.86 0.09 82)", fontFamily: "Inter, sans-serif" }}
        >
          Est. 2026 · India
        </div>
        <div
          className="text-[0.65rem] uppercase tracking-[0.45em]"
          style={{ color: "oklch(0.86 0.09 82)", fontFamily: "Inter, sans-serif" }}
        >
          vesa.co.in
        </div>
      </header>

      {/* 3D canvas */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <CandleScene />
        </Suspense>
      </div>

      {/* glow behind text */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.78 0.18 55 / 0.18), transparent 70%)" }}
      />

      {/* hero copy */}
      <section className="relative z-30 flex min-h-screen flex-col items-center justify-between px-6 pb-14 pt-32 text-center md:pt-40">
        <div
          className={`flex flex-col items-center transition-all duration-[1800ms] ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {/* monogram */}
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, oklch(0.78 0.13 78))" }} />
            <span
              className="text-[0.7rem] uppercase tracking-[0.6em]"
              style={{ color: "oklch(0.86 0.09 82)", fontFamily: "Inter, sans-serif" }}
            >
              Vesa Atelier
            </span>
            <span className="h-px w-12" style={{ background: "linear-gradient(270deg, transparent, oklch(0.78 0.13 78))" }} />
          </div>

          {/* wordmark */}
          <h1
            className="text-[22vw] font-light leading-[0.85] tracking-[-0.04em] md:text-[16vw] lg:text-[13rem]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              background: "linear-gradient(180deg, oklch(0.96 0.04 85) 0%, oklch(0.78 0.13 78) 50%, oklch(0.50 0.10 60) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 0 40px oklch(0.78 0.18 55 / 0.35))",
            }}
          >
            VESA
          </h1>

          <p
            className="mt-2 text-xs uppercase tracking-[0.7em] md:text-sm"
            style={{ color: "oklch(0.86 0.09 82 / 0.85)", fontFamily: "Inter, sans-serif" }}
          >
            A T E L I E R
          </p>
        </div>

        <div
          className={`flex flex-col items-center transition-all delay-700 duration-[1800ms] ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {/* coming soon */}
          <div className="mb-6 flex items-center gap-5">
            <span className="h-px w-16" style={{ background: "oklch(0.78 0.13 78 / 0.5)" }} />
            <span
              className="relative text-[0.7rem] uppercase tracking-[0.55em]"
              style={{ color: "oklch(0.93 0.025 80)", fontFamily: "Inter, sans-serif" }}
            >
              <span
                className="absolute -left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
                style={{ background: "oklch(0.78 0.18 55)", boxShadow: "0 0 12px oklch(0.78 0.18 55)", animation: "pulse 2s ease-in-out infinite" }}
              />
              Coming Soon
            </span>
            <span className="h-px w-16" style={{ background: "oklch(0.78 0.13 78 / 0.5)" }} />
          </div>

          <p
            className="max-w-md text-sm font-light leading-relaxed md:text-base"
            style={{ color: "oklch(0.88 0.02 80 / 0.75)", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
          >
            A new ritual of light. Hand-poured candles, slow-burned, shaped by quiet hours.
          </p>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: translateY(-50%) scale(1); }
          50% { opacity: 0.5; transform: translateY(-50%) scale(1.4); }
        }
      `}</style>
    </main>
  );
}
