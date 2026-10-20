import { Link } from "@tanstack/react-router";
import { VesaLogo } from "@/components/vesa-logo";
import marbleTexture from "@/assets/vesa-marble.jpg";
import {
  VESA_BG,
  VESA_BODY,
  VESA_CREAM,
  VESA_GOLD,
  VESA_GOLD_FAINT,
  VESA_GOLD_SOFT,
  vesaSans,
  vesaSerif,
} from "@/lib/vesa-brand";

type VesaLayoutProps = {
  children: React.ReactNode;
  activeNav?: "home" | "about" | "blog";
};

export function VesaLayout({ children, activeNav }: VesaLayoutProps) {
  return (
    <div className="relative min-h-screen w-full" style={{ backgroundColor: VESA_BG }}>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-45"
        style={{
          backgroundImage: `url(${marbleTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201, 165, 90, 0.08) 0%, transparent 50%), linear-gradient(180deg, rgba(8,7,10,0.7) 0%, rgba(8,7,10,0.95) 40%, rgba(8,7,10,1) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[2] opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <header className="relative z-30 flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <Link to="/" className="transition-opacity hover:opacity-80">
          <VesaLogo className="h-10 w-10 md:h-11 md:w-11" alt="VESA Atelier" />
        </Link>

        <nav className="flex items-center gap-6 md:gap-8">
          <Link
            to="/"
            className="uppercase transition-colors"
            style={{
              fontFamily: vesaSans,
              fontSize: "0.6rem",
              letterSpacing: "0.4em",
              color: activeNav === "home" ? VESA_CREAM : VESA_GOLD_SOFT,
              paddingLeft: "0.4em",
            }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="uppercase transition-colors"
            style={{
              fontFamily: vesaSans,
              fontSize: "0.6rem",
              letterSpacing: "0.4em",
              color: activeNav === "about" ? VESA_CREAM : VESA_GOLD_SOFT,
              paddingLeft: "0.4em",
            }}
          >
            About
          </Link>
          <Link
            to="/blog"
            className="uppercase transition-colors"
            style={{
              fontFamily: vesaSans,
              fontSize: "0.6rem",
              letterSpacing: "0.4em",
              color: activeNav === "blog" ? VESA_CREAM : VESA_GOLD_SOFT,
              paddingLeft: "0.4em",
            }}
          >
            Blog
          </Link>
        </nav>
      </header>

      <main className="relative z-20">{children}</main>

      <footer
        className="relative z-20 border-t px-6 py-10 md:px-12"
        style={{ borderColor: VESA_GOLD_FAINT }}
      >
        <p
          className="text-center uppercase"
          style={{
            fontFamily: vesaSans,
            fontSize: "0.55rem",
            letterSpacing: "0.5em",
            color: VESA_GOLD_SOFT,
            paddingLeft: "0.5em",
          }}
        >
          vesa.co.in
        </p>
        <p
          className="mt-3 text-center italic"
          style={{
            fontFamily: vesaSerif,
            fontSize: "0.95rem",
            color: VESA_BODY,
          }}
        >
          Crafted for calm. Designed for elegance.
        </p>
      </footer>
    </div>
  );
}

export function VesaGoldRule() {
  return (
    <div className="my-10 flex items-center gap-4 md:my-12">
      <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${VESA_GOLD})` }} />
      <span style={{ color: VESA_GOLD, fontSize: "0.45rem" }}>◆</span>
      <span className="h-px flex-1" style={{ background: `linear-gradient(270deg, transparent, ${VESA_GOLD})` }} />
    </div>
  );
}
