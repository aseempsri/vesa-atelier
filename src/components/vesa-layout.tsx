import { Link } from "@tanstack/react-router";
import { VesaLogo } from "@/components/vesa-logo";
import { CartIcon } from "@/components/shop/cart-icon";
import marbleTexture from "@/assets/vesa-marble.jpg";
import { STORE_ENABLED } from "@/lib/shop/config";
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

const BASE_NAV = [
  { to: "/", label: "Home", id: "home" as const },
  { to: "/about", label: "About", id: "about" as const },
  { to: "/blog", label: "Blog", id: "blog" as const },
];

const STORE_NAV = { to: "/shop", label: "Shop", id: "shop" as const };

type VesaNavId = "home" | "about" | "blog" | "shop" | "cart" | "checkout";

type VesaLayoutProps = {
  children: React.ReactNode;
  activeNav?: VesaNavId;
};

export function VesaLayout({ children, activeNav }: VesaLayoutProps) {
  const navItems = STORE_ENABLED ? [...BASE_NAV, STORE_NAV] : BASE_NAV;

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

        <nav className="flex flex-wrap items-center justify-end gap-4 md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              className="uppercase transition-colors"
              style={{
                fontFamily: vesaSans,
                fontSize: "0.6rem",
                letterSpacing: "0.4em",
                color: activeNav === item.id ? VESA_CREAM : VESA_GOLD_SOFT,
                paddingLeft: "0.4em",
              }}
            >
              {item.label}
            </Link>
          ))}
          {STORE_ENABLED ? <CartIcon /> : null}
        </nav>
      </header>

      <main className="relative z-20">{children}</main>

      <footer
        className="relative z-20 border-t px-6 py-10 md:px-12"
        style={{ borderColor: VESA_GOLD_FAINT }}
      >
        {STORE_ENABLED ? (
          <nav className="mb-6 flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                className="uppercase transition-colors"
                style={{
                  fontFamily: vesaSans,
                  fontSize: "0.55rem",
                  letterSpacing: "0.4em",
                  color: activeNav === item.id ? VESA_CREAM : VESA_GOLD_SOFT,
                  paddingLeft: "0.4em",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
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
        {STORE_ENABLED ? (
          <p
            className="mt-4 text-center"
            style={{
              fontFamily: vesaSans,
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              color: VESA_GOLD_SOFT,
            }}
          >
            Online payment only · Shipping details confirmed at checkout
          </p>
        ) : null}
      </footer>
    </div>
  );
}

export function VesaGoldRule() {
  return (
    <div className="my-10 flex items-center gap-4 md:my-12">
      <span
        className="h-px flex-1"
        style={{ background: `linear-gradient(90deg, transparent, ${VESA_GOLD})` }}
      />
      <span style={{ color: VESA_GOLD, fontSize: "0.45rem" }}>◆</span>
      <span
        className="h-px flex-1"
        style={{ background: `linear-gradient(270deg, transparent, ${VESA_GOLD})` }}
      />
    </div>
  );
}
