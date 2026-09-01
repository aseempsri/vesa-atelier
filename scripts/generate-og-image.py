#!/usr/bin/env python3
"""Generate the 1200×630 branded OG image for link previews (WhatsApp, iMessage, etc.).

Composites the full VESA lockup (crest + wordmark) onto the left dark area of the
hero candle photograph.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
BACKGROUND = ROOT / "public" / "og-image.jpg"
LOCKUP = ROOT / "src" / "assets" / "vesa-lockup.png"

# Social platforms cache previews per image URL — bump when the card design changes
# and update DEFAULT_OG_IMAGE in src/lib/seo.ts to match.
REVISION = 7
OUTPUT = ROOT / "public" / "og" / f"vesa-atelier-{REVISION}.jpg"

CANVAS = (1200, 630)
GOLD = (201, 165, 90)


def prepare_lockup(max_height: int) -> Image.Image:
    lockup = Image.open(LOCKUP).convert("RGBA")
    r, g, b, _ = lockup.split()
    luminance = Image.merge("RGB", (r, g, b)).convert("L")
    # The source PNG is fully opaque with a black backdrop — derive alpha from brightness.
    alpha = luminance.point(lambda v: min(255, max(0, int((v - 42) * 3.6))))
    lockup.putalpha(alpha)

    scale = max_height / lockup.height
    size = (int(lockup.width * scale), max_height)
    return lockup.resize(size, Image.Resampling.LANCZOS)


def build() -> None:
    source = Image.open(BACKGROUND).convert("RGB")

    target_w, target_h = CANVAS
    scaled_h = int(source.height * target_w / source.width)
    source = source.resize((target_w, scaled_h), Image.Resampling.LANCZOS)
    top = max((scaled_h - target_h) // 2 - 20, 0)
    card = source.crop((0, top, target_w, top + target_h)).convert("RGBA")

    vignette = Image.new("RGBA", card.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(vignette)
    draw.rectangle((0, 0, int(target_w * 0.54), target_h), fill=(8, 7, 10, 36))
    card = Image.alpha_composite(card, vignette.filter(ImageFilter.GaussianBlur(48)))

    lockup = prepare_lockup(int(target_h * 0.78))
    glow = Image.new("RGBA", card.size, (0, 0, 0, 0))
    glow_mask = lockup.split()[3].point(lambda v: min(255, int(v * 0.45)))
    glow_lockup = Image.new("RGBA", lockup.size, (*GOLD, 0))
    glow_lockup.putalpha(glow_mask)
    glow.paste(glow_lockup, (0, 0), glow_lockup)
    glow = glow.filter(ImageFilter.GaussianBlur(26))

    left_center_x = int(target_w * 0.27)
    x = left_center_x - lockup.width // 2
    y = (target_h - lockup.height) // 2

    card.alpha_composite(glow, (x - 10, y - 6))
    card.alpha_composite(lockup, (x, y))

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    # Baseline JPEG: WhatsApp's preview generator skips progressive files.
    card.convert("RGB").save(OUTPUT, quality=90, optimize=True, progressive=False)


if __name__ == "__main__":
    build()
    print(f"Generated {OUTPUT.relative_to(ROOT)}")
