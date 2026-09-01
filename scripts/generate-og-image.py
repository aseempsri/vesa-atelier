#!/usr/bin/env python3
"""Generate the 1200×630 branded OG image for link previews (WhatsApp, iMessage, etc.).

Composites the VESA crest onto the left dark area of the hero candle photograph.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
BACKGROUND = ROOT / "public" / "og-image.jpg"
LOGO = ROOT / "src" / "assets" / "vesa-logo.png"

# Social platforms cache previews per image URL — bump when the card design changes
# and update DEFAULT_OG_IMAGE in src/lib/seo.ts to match.
REVISION = 5
OUTPUT = ROOT / "public" / "og" / f"vesa-atelier-{REVISION}.jpg"

CANVAS = (1200, 630)
GOLD = (201, 165, 90)


def prepare_logo(max_height: int) -> Image.Image:
    logo = Image.open(LOGO).convert("RGBA")
    r, g, b, _ = logo.split()
    luminance = Image.merge("RGB", (r, g, b)).convert("L")
    logo.putalpha(luminance.point(lambda v: min(255, int(v * 1.65))))

    scale = max_height / logo.height
    size = (int(logo.width * scale), max_height)
    return logo.resize(size, Image.Resampling.LANCZOS)


def build() -> None:
    source = Image.open(BACKGROUND).convert("RGB")

    # Scale to 1200px wide, then crop to 630px tall (keeps candles on the right).
    target_w, target_h = CANVAS
    scaled_h = int(source.height * target_w / source.width)
    source = source.resize((target_w, scaled_h), Image.Resampling.LANCZOS)
    top = max((scaled_h - target_h) // 2 - 20, 0)
    card = source.crop((0, top, target_w, top + target_h)).convert("RGBA")

    # Slight vignette so the logo reads clearly on the left.
    vignette = Image.new("RGBA", card.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(vignette)
    draw.rectangle((0, 0, int(target_w * 0.52), target_h), fill=(8, 7, 10, 72))
    card = Image.alpha_composite(card, vignette.filter(ImageFilter.GaussianBlur(40)))

    logo = prepare_logo(int(target_h * 0.42))
    glow = Image.new("RGBA", card.size, (0, 0, 0, 0))
    glow_mask = logo.split()[3].point(lambda v: min(255, int(v * 0.55)))
    glow_logo = Image.new("RGBA", logo.size, (*GOLD, 0))
    glow_logo.putalpha(glow_mask)
    glow.paste(glow_logo, (0, 0), glow_logo)
    glow = glow.filter(ImageFilter.GaussianBlur(22))

    left_center_x = int(target_w * 0.27)
    x = left_center_x - logo.width // 2
    y = (target_h - logo.height) // 2

    card.alpha_composite(glow, (x - 12, y - 8))
    card.alpha_composite(logo, (x, y))

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    # Baseline JPEG: WhatsApp's preview generator skips progressive files.
    card.convert("RGB").save(OUTPUT, quality=90, optimize=True, progressive=False)


if __name__ == "__main__":
    build()
    print(f"Generated {OUTPUT.relative_to(ROOT)}")
