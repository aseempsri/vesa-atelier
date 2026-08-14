#!/usr/bin/env python3
"""Generate branded 1200×630 social cards for every VESA journal post."""

from pathlib import Path
from textwrap import wrap

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "og" / "blog" / "share"
BACKGROUND = ROOT / "public" / "og-image.jpg"
LOGO = ROOT / "src" / "assets" / "vesa-logo.png"
SERIF = "/System/Library/Fonts/Supplemental/Didot.ttc"
SANS = "/System/Library/Fonts/Supplemental/Arial.ttf"

# Social platforms cache previews per image URL, so bump this whenever the card design changes
# and update shareImage in src/lib/blog/posts.ts to match.
REVISION = 2

POSTS = [
    (
        "self-validation",
        "The Hidden Reason We Keep Seeking Validation",
        "What if the approval you keep waiting for is the one only you can give?",
        (190, 143),
    ),
    (
        "overthinking",
        "Why Do We Overthink Everything?",
        "What is your mind really searching for when it replays the same moment?",
        (882, 126),
    ),
    (
        "saying-no",
        "Why Is It So Hard to Say No?",
        "How much of yourself disappears each time you say yes when you mean no?",
        (1030, 450),
    ),
    (
        "comparison",
        "Why Do We Compare Ourselves to Others?",
        "What if feeling behind has more to do with where you are looking than where you are?",
        (184, 485),
    ),
    (
        "inner-critic",
        "Understanding Your Inner Critic",
        "Whose voice is your inner critic using—and does it deserve the final word?",
        (914, 324),
    ),
    (
        "unnecessary-guilt",
        "Why Do We Feel Guilty Even When We’ve Done Nothing Wrong?",
        "Could the guilt you feel be discomfort—not proof that you did something wrong?",
        (1040, 112),
    ),
    (
        "self-awareness",
        "What Does Self-Awareness Really Mean?",
        "What might change if you became curious about your reactions instead of judging them?",
        (678, 500),
    ),
    (
        "fear-of-being-alone",
        "Why Do Some People Fear Being Alone?",
        "What are you afraid the silence might reveal when everything finally becomes still?",
        (166, 310),
    ),
    (
        "repeating-mistakes",
        "Why Do We Keep Repeating the Same Mistakes?",
        "What if the pattern keeps returning because it is asking to be understood, not punished?",
        (1004, 518),
    ),
    (
        "trust-yourself",
        "Learning to Trust Yourself Again",
        "When did you stop trusting your own voice—and what would it take to hear it again?",
        (738, 118),
    ),
]


def font(path: str, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size, index=index)


def fit_lines(text: str, max_chars: int, max_lines: int) -> list[str]:
    lines = wrap(text, width=max_chars, break_long_words=False)
    if len(lines) <= max_lines:
        return lines
    lines = lines[:max_lines]
    lines[-1] = f"{lines[-1].rstrip('.,;:')}…"
    return lines


def generate(slug: str, title: str, teaser: str, glow_at: tuple[int, int]) -> None:
    source = Image.open(BACKGROUND).convert("RGB")
    source = source.resize((1200, 675), Image.Resampling.LANCZOS).crop((0, 22, 1200, 652))
    source = ImageEnhance.Brightness(source).enhance(0.48)
    source = ImageEnhance.Color(source).enhance(0.72)

    card = source.convert("RGBA")
    overlay = Image.new("RGBA", card.size, (0, 0, 0, 0))
    pixels = overlay.load()
    for x in range(1200):
        alpha = int(238 - min(x / 1200, 1) * 122)
        for y in range(630):
            pixels[x, y] = (8, 7, 10, alpha)
    card = Image.alpha_composite(card, overlay)

    glow = Image.new("RGBA", card.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gx, gy = glow_at
    gd.ellipse((gx - 190, gy - 190, gx + 190, gy + 190), fill=(201, 165, 90, 72))
    glow = glow.filter(ImageFilter.GaussianBlur(95))
    card = Image.alpha_composite(card, glow)

    draw = ImageDraw.Draw(card)
    gold = (201, 165, 90, 255)
    cream = (236, 226, 201, 255)
    body = (232, 220, 198, 210)

    draw.rectangle((28, 28, 1172, 602), outline=(201, 165, 90, 92), width=1)

    brand_cx = 995

    scrim = Image.new("RGBA", card.size, (0, 0, 0, 0))
    ImageDraw.Draw(scrim).ellipse(
        (brand_cx - 250, 110, brand_cx + 250, 500), fill=(8, 7, 10, 208)
    )
    card = Image.alpha_composite(card, scrim.filter(ImageFilter.GaussianBlur(60)))
    draw = ImageDraw.Draw(card)

    logo = Image.open(LOGO).convert("RGBA")
    logo.thumbnail((168, 168), Image.Resampling.LANCZOS)
    # The crest ships gold-on-black, so derive alpha from luminance to drop the black backdrop.
    r, g, b, _ = logo.split()
    luminance = Image.merge("RGB", (r, g, b)).convert("L")
    logo.putalpha(luminance.point(lambda v: min(255, int(v * 1.6))))
    card.alpha_composite(logo, (brand_cx - logo.width // 2, 168))

    draw.text((brand_cx, 372), "VESA", font=font(SERIF, 76), fill=cream, anchor="mm")
    draw.text((brand_cx, 434), "ATELIER", font=font(SANS, 21), fill=gold, anchor="mm")
    draw.line((brand_cx - 108, 434, brand_cx - 62, 434), fill=(201, 165, 90, 165), width=1)
    draw.line((brand_cx + 62, 434, brand_cx + 108, 434), fill=(201, 165, 90, 165), width=1)

    title_lines = fit_lines(title, 25, 3)
    title_font = font(SERIF, 52)
    y = 168
    for line in title_lines:
        draw.text((72, y), line, font=title_font, fill=cream)
        y += 62

    divider_y = max(y + 22, 356)
    draw.polygon(
        ((72, divider_y + 5), (77, divider_y), (82, divider_y + 5), (77, divider_y + 10)),
        fill=gold,
    )
    draw.line((94, divider_y + 5, 228, divider_y + 5), fill=(201, 165, 90, 150), width=1)

    teaser_font = font(SERIF, 29, index=1)
    teaser_lines = fit_lines(teaser, 44, 2)
    teaser_y = divider_y + 34
    for line in teaser_lines:
        draw.text((72, teaser_y), line, font=teaser_font, fill=body)
        teaser_y += 38

    OUTPUT.mkdir(parents=True, exist_ok=True)
    # Baseline (non-progressive) JPEG: WhatsApp's preview generator skips progressive files.
    card.convert("RGB").save(
        OUTPUT / f"{slug}-{REVISION}.jpg", quality=88, optimize=True, progressive=False
    )


if __name__ == "__main__":
    for post in POSTS:
        generate(*post)
    print(f"Generated {len(POSTS)} social cards in {OUTPUT}")
