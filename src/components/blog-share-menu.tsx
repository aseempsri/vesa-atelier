"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { Check, Copy, Facebook, MessageCircle, Share2, Twitter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VESA_BG, VESA_CREAM, VESA_GOLD, VESA_GOLD_SOFT, vesaSans } from "@/lib/vesa-brand";
import { absoluteUrl } from "@/lib/seo";

type BlogShareMenuProps = {
  slug: string;
  title: string;
  className?: string;
};

export function BlogShareMenu({ slug, title, className }: BlogShareMenuProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const shareUrl = absoluteUrl(`/blog/${slug}`);

  useEffect(() => {
    setCanNativeShare(typeof navigator.share === "function");
  }, []);

  const stopCardNavigation = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const openShareWindow = (url: string) => {
    const popup = window.open(url, "_blank", "noopener,noreferrer");
    if (!popup) {
      window.location.assign(url);
    }
  };

  const shareNative = async () => {
    try {
      await navigator.share({
        title,
        text: title,
        url: shareUrl,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const itemClass =
    "cursor-pointer gap-3 rounded-none px-3 py-2.5 text-sm focus:bg-[#c9a55a]/10 focus:text-[#ece2c9]";

  return (
    <div className={className} onClick={stopCardNavigation}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full transition-all hover:bg-[#c9a55a]/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a55a]"
            style={{
              color: VESA_GOLD,
              border: `1px solid ${VESA_GOLD_SOFT}`,
              background: "rgba(8, 7, 10, 0.92)",
              fontFamily: vesaSans,
              fontSize: "0.62rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              paddingLeft: "0.95rem",
              paddingRight: "0.85rem",
            }}
            aria-label={`Share ${title}`}
            title="Share this reflection"
          >
            <Share2 size={16} strokeWidth={1.6} aria-hidden className="shrink-0" />
            <span className="inline">Share</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="top"
          sideOffset={8}
          collisionPadding={16}
          className="z-[200] min-w-52 rounded-none p-1.5"
          style={{
            fontFamily: vesaSans,
            color: VESA_CREAM,
            background: VESA_BG,
            border: `1px solid ${VESA_GOLD_SOFT}`,
          }}
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
        >
          {canNativeShare ? (
            <DropdownMenuItem
              className={itemClass}
              onSelect={() => {
                void shareNative();
              }}
            >
              <Share2 aria-hidden style={{ color: VESA_GOLD }} />
              Device share
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem
            className={itemClass}
            onSelect={() =>
              openShareWindow(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`)
            }
          >
            <MessageCircle aria-hidden style={{ color: "#25D366" }} />
            WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem
            className={itemClass}
            onSelect={() =>
              openShareWindow(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
              )
            }
          >
            <Facebook aria-hidden style={{ color: "#1877F2" }} />
            Facebook
          </DropdownMenuItem>
          <DropdownMenuItem
            className={itemClass}
            onSelect={() =>
              openShareWindow(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
              )
            }
          >
            <Twitter aria-hidden />
            X / Twitter
          </DropdownMenuItem>
          <DropdownMenuItem className={itemClass} onSelect={copyLink}>
            {copied ? <Check aria-hidden style={{ color: VESA_GOLD }} /> : <Copy aria-hidden />}
            {copied ? "Link copied" : "Copy link"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
