#!/usr/bin/env python3
"""Generate the 1200×630 branded VESA card used for every link preview.

Mirrors the homepage hero lockup: crest, gradient wordmark, rule-flanked "Atelier /
Crafted Elegance", and the house tagline.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
BACKGROUND = ROOT / "public" / "og-image.jpg"
LOGO = ROOT / "src" / "assets" / "vesa-logo.png"
SERIF = "/System/Library/Fonts/Supplemental/Didot.ttc"
SERIF_ITALIC_INDEX = 1
SANS = "/System/Library/Fonts/Supplemental/Arial.ttf"

# Social platforms cache previews per image URL, so bump this whenever the card design changes
# and update DEFAULT_OG_IMAGE in src/lib/seo.ts to match.
REVISION = 4
OUTPUT = ROOT / "public" / "og" / f"vesa-atelier-{REVISION}.jpg"

GOLD = (201, 165, 90)
CREAM = (236, 226, 201)
BODY = (232, 220, 198)
# Matches VESA_WORDMARK_GRADIENT in src/lib/vesa-brand.ts.
WORDMARK_STOPS = [
    (0.00, (246, 230, 195)),
    (0.30, (216, 185, 127)),
    (0.65, (180, 137, 71)),
    (1.00, (110, 74, 35)),
]

CANVAS = (1200, 630)
CENTER_X = CANVAS[0] // 2


def font(path: str, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size, index=index)


def tracked_width(text: str, typeface: ImageFont.FreeTypeFont, tracking: float) -> float:
    widths = [typeface.getlength(ch) for ch in text]
    return sum(widths) + tracking * (len(text) - 1)


def draw_tracked_text(
    draw: ImageDraw.ImageDraw,
    center: tuple[int, int],
    text: str,
    typeface: ImageFont.FreeTypeFont,
    tracking: float,
    fill: tuple[int, int, int, int],
) -> float:
    """Draw letter-spaced text centred on `center`; PIL has no native tracking."""
    total = tracked_width(text, typeface, tracking)
    x = center[0] - total / 2
    for ch in text:
        draw.text((x, center[1]), ch, font=typeface, fill=fill, anchor="lm")
        x += typeface.getlength(ch) + tracking
    return total


def gradient_column(height: int) -> list[tuple[int, int, int]]:
    ramp: list[tuple[int, int, int]] = []
    for y in range(height):
        t = y / max(height - 1, 1)
        for i in range(len(WORDMARK_STOPS) - 1):
            p0, c0 = WORDMARK_STOPS[i]
            p1, c1 = WORDMARK_STOPS[i + 1]
            if p0 <= t <= p1:
                local = (t - p0) / (p1 - p0)
                ramp.append(tuple(round(c0[c] + (c1[c] - c0[c]) * local) for c in range(3)))
                break
        else:
            ramp.append(WORDMARK_STOPS[-1][1])
    return ramp


def draw_gradient_wordmark(
    card: Image.Image, center: tuple[int, int], text: str, typeface: ImageFont.FreeTypeFont
) -> None:
    mask = Image.new("L", card.size, 0)
    ImageDraw.Draw(mask).text(center, text, font=typeface, fill=255, anchor="mm")
    box = mask.getbbox()
    if box is None:
        return

    glow = Image.new("RGBA", card.size, (0, 0, 0, 0))
    glow.paste((*GOLD, 96), mask=mask)
    card.alpha_composite(glow.filter(ImageFilter.GaussianBlur(28)))

    gradient = Image.new("RGB", card.size, WORDMARK_STOPS[0][1])
    ramp = gradient_column(box[3] - box[1])
    painter = ImageDraw.Draw(gradient)
    for offset, colour in enumerate(ramp):
        painter.line((0, box[1] + offset, card.width, box[1] + offset), fill=colour)

    card.paste(gradient, (0, 0), mask)


def horizontal_rule(card: Image.Image, x0: int, x1: int, y: int, fade: str) -> None:
    """A hairline that fades to transparent, matching the hero's gradient spans."""
    rule = Image.new("RGBA", card.size, (0, 0, 0, 0))
    pixels = rule.load()
    span = max(x1 - x0, 1)
    for x in range(x0, x1):
        t = (x - x0) / span
        strength = t if fade == "in" else 1 - t
        pixels[x, y] = (*GOLD, int(210 * strength))
    card.alpha_composite(rule)


def build() -> None:
    source = Image.open(BACKGROUND).convert("RGB")
    source = source.resize((1200, 675), Image.Resampling.LANCZOS).crop((0, 22, 1200, 652))
    source = ImageEnhance.Brightness(source).enhance(0.26)
    source = ImageEnhance.Color(source).enhance(0.55)
    card = source.convert("RGBA")

    scrim = Image.new("RGBA", card.size, (0, 0, 0, 0))
    ImageDraw.Draw(scrim).ellipse((150, 20, 1050, 610), fill=(8, 7, 10, 222))
    card = Image.alpha_composite(card, scrim.filter(ImageFilter.GaussianBlur(100)))

    draw = ImageDraw.Draw(card)
    draw.rectangle((28, 28, 1172, 602), outline=(201, 165, 90, 92), width=1)

    logo = Image.open(LOGO).convert("RGBA")
    logo.thumbnail((150, 150), Image.Resampling.LANCZOS)
    # The crest ships gold-on-black, so derive alpha from luminance to drop the black backdrop.
    r, g, b, _ = logo.split()
    luminance = Image.merge("RGB", (r, g, b)).convert("L")
    logo.putalpha(luminance.point(lambda v: min(255, int(v * 1.6))))
    card.alpha_composite(logo, (CENTER_X - logo.width // 2, 76))

    draw_gradient_wordmark(card, (CENTER_X, 300), "VESA", font(SERIF, 118))
    draw = ImageDraw.Draw(card)

    atelier_font = font(SERIF, 30, index=SERIF_ITALIC_INDEX)
    atelier_width = draw_tracked_text(
        draw, (CENTER_X, 396), "ATELIER", atelier_font, 0.55 * 30, (*CREAM, 255)
    )
    draw_tracked_text(
        draw, (CENTER_X, 432), "CRAFTED ELEGANCE", font(SANS, 13), 0.45 * 13, (*GOLD, 190)
    )

    rule_gap = int(atelier_width / 2) + 46
    horizontal_rule(card, CENTER_X - rule_gap - 92, CENTER_X - rule_gap, 414, fade="in")
    horizontal_rule(card, CENTER_X + rule_gap, CENTER_X + rule_gap + 92, 414, fade="out")

    draw = ImageDraw.Draw(card)
    draw.text(
        (CENTER_X, 508),
        "A house of hand-poured candles — composed in shadow, finished in light.",
        font=font(SERIF, 29, index=SERIF_ITALIC_INDEX),
        fill=(*BODY, 205),
        anchor="mm",
    )

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    # Baseline (non-progressive) JPEG: WhatsApp's preview generator skips progressive files.
    card.convert("RGB").save(OUTPUT, quality=88, optimize=True, progressive=False)


if __name__ == "__main__":
    build()
    print(f"Generated {OUTPUT.relative_to(ROOT)}")
