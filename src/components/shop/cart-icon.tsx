import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/shop/cart-provider";
import { STORE_ENABLED } from "@/lib/shop/config";
import { vesaSans, VESA_CREAM, VESA_GOLD_SOFT } from "@/lib/vesa-brand";

type CartIconProps = {
  /** When true, opens the drawer; otherwise navigates to /cart */
  preferDrawer?: boolean;
  className?: string;
};

export function CartIcon({ preferDrawer = true, className }: CartIconProps) {
  const { itemCount, setDrawerOpen, hydrated } = useCart();

  if (!STORE_ENABLED) return null;

  const countLabel = hydrated ? itemCount : 0;

  if (preferDrawer) {
    return (
      <button
        type="button"
        className={`relative inline-flex items-center transition-opacity hover:opacity-80 ${className ?? ""}`}
        aria-label={`Open cart, ${countLabel} items`}
        onClick={() => setDrawerOpen(true)}
        style={{ color: VESA_GOLD_SOFT }}
      >
        <ShoppingBag className="h-4 w-4" strokeWidth={1.25} aria-hidden />
        <span
          className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center px-1"
          style={{
            fontFamily: vesaSans,
            fontSize: "0.55rem",
            color: VESA_CREAM,
            letterSpacing: "0.05em",
          }}
          aria-hidden
        >
          {countLabel > 0 ? countLabel : ""}
        </span>
      </button>
    );
  }

  return (
    <Link
      to="/cart"
      className={`relative inline-flex items-center transition-opacity hover:opacity-80 ${className ?? ""}`}
      aria-label={`Cart, ${countLabel} items`}
      style={{ color: VESA_GOLD_SOFT }}
    >
      <ShoppingBag className="h-4 w-4" strokeWidth={1.25} aria-hidden />
      <span
        className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center px-1"
        style={{
          fontFamily: vesaSans,
          fontSize: "0.55rem",
          color: VESA_CREAM,
        }}
        aria-hidden
      >
        {countLabel > 0 ? countLabel : ""}
      </span>
    </Link>
  );
}
