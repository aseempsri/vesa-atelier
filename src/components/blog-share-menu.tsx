"use client";

import { useState, type MouseEvent } from "react";
import { Check, Copy, Facebook, MessageCircle, Share2, Twitter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VESA_BG, VESA_CREAM, VESA_GOLD, VESA_GOLD_FAINT, vesaSans } from "@/lib/vesa-brand";
import { absoluteUrl } from "@/lib/seo";

type BlogShareMenuProps = {
  slug: string;
  title: string;
  shareTeaser: string;
};

export function BlogShareMenu({ slug, title, shareTeaser }: BlogShareMenuProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = absoluteUrl(`/blog/${slug}`);
  const shareText = `${shareTeaser}\n\n${title}`;

  const stopCardNavigation = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const openShareWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer,width=720,height=620");
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
    <div
      className="absolute bottom-5 right-5 z-10 md:bottom-7 md:right-8"
      onClick={stopCardNavigation}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-105 hover:bg-[#c9a55a]/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a55a]"
            style={{
              color: VESA_GOLD,
              border: `1px solid ${VESA_GOLD_FAINT}`,
              background: "rgba(8, 7, 10, 0.88)",
            }}
            aria-label={`Share ${title}`}
            title="Share this reflection"
          >
            <Share2 size={17} strokeWidth={1.6} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="min-w-48 rounded-none p-1.5"
          style={{
            fontFamily: vesaSans,
            color: VESA_CREAM,
            background: VESA_BG,
            border: `1px solid ${VESA_GOLD_FAINT}`,
          }}
          onClick={(event) => event.stopPropagation()}
        >
          <DropdownMenuItem
            className={itemClass}
            onSelect={() =>
              openShareWindow(
                `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
              )
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
                `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
              )
            }
          >
            <Twitter aria-hidden />X / Twitter
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
