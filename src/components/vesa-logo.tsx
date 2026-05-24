import logoImage from "@/assets/vesa-logo.png";
import { VESA_WORDMARK_GRADIENT } from "@/lib/vesa-brand";
import { cn } from "@/lib/utils";

type VesaLogoProps = {
  className?: string;
  alt?: string;
  animated?: boolean;
};

export function VesaLogo({
  className,
  alt = "VESA Atelier emblem",
  animated = false,
}: VesaLogoProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("mx-auto block shrink-0", className)}
      style={{
        background: VESA_WORDMARK_GRADIENT,
        WebkitMaskImage: `url(${logoImage})`,
        maskImage: `url(${logoImage})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        filter: "drop-shadow(0 0 20px rgba(201, 165, 90, 0.35))",
        animation: animated ? "vesa-breathe 6s ease-in-out infinite" : undefined,
      }}
    />
  );
}
