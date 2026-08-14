#!/usr/bin/env python3
"""Generate the 1200×630 branded VESA card used for every link preview."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
BACKGROUND = ROOT / "public" / "og-image.jpg"
LOGO = ROOT / "src" / "assets" / "vesa-logo.png"
SERIF = "/System/Library/Fonts/Supplemental/Didot.ttc"
SANS = "/System/Library/Fonts/Supplemental/Arial.ttf"

# Social platforms cache previews per image URL, so bump this whenever the card design changes
# and update DEFAULT_OG_IMAGE in src/lib/seo.ts to match.
REVISION = 3
OUTPUT = ROOT / "public" / "og" / f"vesa-atelier-{REVISION}.jpg"

GOLD = (201, 165, 90, 255)
CREAM = (236, 226, 201, 255)


def font(path: str, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size, index=index)


def build() -> None:
    source = Image.open(BACKGROUND).convert("RGB")
    source = source.resize((1200, 675), Image.Resampling.LANCZOS).crop((0, 22, 1200, 652))
    source = ImageEnhance.Brightness(source).enhance(0.34)
    source = ImageEnhance.Color(source).enhance(0.6)
    card = source.convert("RGBA")

    scrim = Image.new("RGBA", card.size, (0, 0, 0, 0))
    ImageDraw.Draw(scrim).ellipse((250, 40, 950, 590), fill=(8, 7, 10, 214))
    card = Image.alpha_composite(card, scrim.filter(ImageFilter.GaussianBlur(90)))

    glow = Image.new("RGBA", card.size, (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse((420, 130, 780, 490), fill=(201, 165, 90, 46))
    card = Image.alpha_composite(card, glow.filter(ImageFilter.GaussianBlur(110)))

    draw = ImageDraw.Draw(card)
    draw.rectangle((28, 28, 1172, 602), outline=(201, 165, 90, 92), width=1)

    cx = 600
    logo = Image.open(LOGO).convert("RGBA")
    logo.thumbnail((196, 196), Image.Resampling.LANCZOS)
    # The crest ships gold-on-black, so derive alpha from luminance to drop the black backdrop.
    r, g, b, _ = logo.split()
    luminance = Image.merge("RGB", (r, g, b)).convert("L")
    logo.putalpha(luminance.point(lambda v: min(255, int(v * 1.6))))
    card.alpha_composite(logo, (cx - logo.width // 2, 108))

    draw.text((cx, 388), "VESA", font=font(SERIF, 108), fill=CREAM, anchor="mm")
    draw.text((cx, 476), "ATELIER", font=font(SANS, 26), fill=GOLD, anchor="mm")
    draw.line((cx - 158, 476, cx - 92, 476), fill=(201, 165, 90, 170), width=1)
    draw.line((cx + 92, 476, cx + 158, 476), fill=(201, 165, 90, 170), width=1)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    # Baseline (non-progressive) JPEG: WhatsApp's preview generator skips progressive files.
    card.convert("RGB").save(OUTPUT, quality=88, optimize=True, progressive=False)


if __name__ == "__main__":
    build()
    print(f"Generated {OUTPUT.relative_to(ROOT)}")
