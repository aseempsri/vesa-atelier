import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  VESA_BG,
  VESA_GOLD,
  VESA_GOLD_FAINT,
  VESA_GOLD_SOFT,
  vesaSans,
} from "@/lib/vesa-brand";

const SCROLL_THRESHOLD = 320;

export function BlogScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-6 z-[100] flex items-center gap-2 rounded-full border px-4 py-3 transition-all duration-300 hover:opacity-90 md:bottom-10 md:right-10"
      style={{
        borderColor: VESA_GOLD_FAINT,
        backgroundColor: VESA_BG,
        boxShadow: `0 4px 24px rgba(0, 0, 0, 0.45), 0 0 0 1px ${VESA_GOLD_FAINT}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <ChevronUp
        aria-hidden
        className="h-4 w-4"
        style={{ color: VESA_GOLD }}
        strokeWidth={1.5}
      />
      <span
        className="hidden uppercase sm:inline"
        style={{
          fontFamily: vesaSans,
          fontSize: "0.55rem",
          letterSpacing: "0.35em",
          color: VESA_GOLD_SOFT,
          paddingLeft: "0.35em",
        }}
      >
        To top
      </span>
    </button>,
    document.body,
  );
}
