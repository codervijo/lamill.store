# /// script
# requires-python = ">=3.11"
# dependencies = ["pillow>=10.1"]
# ///
"""v1.E — build the verse and books-of-the-Bible coloring pages.

imagemill draws only the picture (upper half, rows with publish=no, file stem
`<stem>-art`). This script sets the words in code, so they are always spelled
right:

  verse pages  the verse in big outline letters you can color, then the reference
  books pages  the group name, then every book as a colorable "book" tile

Input:  src/data/text-pages.json (stem → kind, art stem, text)
Art:    imagemill out/ dir (IMAGEMILL_OUT, default below)
Output: public/printables/<stem>.png (print file) + .webp (web preview)
        public/image-sitemap-text.xml (these pages only; imagemill owns image-sitemap.xml)

Run from the repo root:  uv run scripts/typeset_pages.py
Then: node scripts/printables-manifest.ts (in the container) and
uv run scripts/printable_pdfs.py to build their PDFs.
"""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
DATA = json.loads((ROOT / "src" / "data" / "text-pages.json").read_text())
OUT = ROOT / "public" / "printables"
ART = Path(os.environ.get("IMAGEMILL_OUT", "~/work/projects/droyfun/imagemill/projects/lamill.store/out")).expanduser()
FONT = ROOT / "scripts" / "fonts" / "Baloo2[wght].ttf"
SITE = "https://lamill.store"

W, H = 1024, 1536
MARGIN = 56
ART_MAX_H = int(H * 0.50)  # picture never takes more than the top half
WEBP_QUALITY = 82


def font(size: int, weight: str = "Bold") -> ImageFont.FreeTypeFont:
    f = ImageFont.truetype(str(FONT), size)
    f.set_variation_by_name(weight)
    return f


def place_art(page: Image.Image, art_stem: str) -> int:
    """Paste the picture's drawn area at the top; return the y where text may start."""
    src = ART / f"{art_stem}.png"
    if not src.exists():
        sys.exit(f"✗ {src} missing — run imagemill for {art_stem} first")
    art = Image.open(src).convert("L")
    box = art.point(lambda v: 255 if v < 200 else 0).getbbox()  # dark pixels only
    if not box:
        sys.exit(f"✗ {art_stem}: blank image")
    art = art.crop(box)
    scale = min((W - 2 * MARGIN) / art.width, ART_MAX_H / art.height, 1.0)
    art = art.resize((round(art.width * scale), round(art.height * scale)), Image.LANCZOS)
    page.paste(art, ((W - art.width) // 2, MARGIN))
    return MARGIN + art.height + 40


def wrap(draw: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont, width: int) -> list[str]:
    lines: list[str] = []
    for word in text.split():
        trial = f"{lines[-1]} {word}" if lines else word
        if lines and draw.textlength(trial, font=f) <= width:
            lines[-1] = trial
        else:
            lines.append(word)
    return lines


def verse(page: Image.Image, top: int, text: str, ref: str) -> None:
    d = ImageDraw.Draw(page)
    bottom = H - MARGIN - 70  # room for the reference line
    for size in range(88, 30, -2):  # biggest outline letters that fit
        f = font(size, "ExtraBold")
        lines = wrap(d, text, f, W - 2 * MARGIN)
        lh = int(size * 1.18)
        if top + lh * len(lines) <= bottom:
            break
    stroke = max(2, size // 22)
    y = top + (bottom - top - lh * len(lines)) // 2
    for line in lines:  # outline letters: white inside, black edge — kids color them in
        x = (W - d.textlength(line, font=f)) // 2
        d.text((x, y), line, font=f, fill=255, stroke_width=stroke, stroke_fill=0)
        y += lh
    rf = font(44, "Bold")
    d.text(((W - d.textlength(ref, font=rf)) // 2, H - MARGIN - 56), ref, font=rf, fill=0)


def books(page: Image.Image, top: int, heading: str, names: list[str]) -> None:
    d = ImageDraw.Draw(page)
    hf = font(64, "ExtraBold")
    d.text(((W - d.textlength(heading, font=hf)) // 2, top - 10), heading, font=hf, fill=255,
           stroke_width=3, stroke_fill=0)
    top += 90
    cols = 1 if len(names) <= 5 else 2 if len(names) <= 12 else 3
    rows = -(-len(names) // cols)
    gap = 14
    tw = (W - 2 * MARGIN - gap * (cols - 1)) // cols
    th = min(96, (H - MARGIN - top - gap * (rows - 1)) // rows)
    if th < 40:
        sys.exit(f"✗ {heading}: {len(names)} books don't fit")
    for size in range(40, 16, -1):  # one size for every tile, so the page looks even
        nf = font(size, "SemiBold")
        if all(d.textlength(n, font=nf) <= tw - 56 for n in names) and size * 1.3 <= th:
            break
    for i, name in enumerate(names):  # column-major: reads down, like a list
        c, r = divmod(i, rows)
        x0 = MARGIN + c * (tw + gap)
        y0 = top + r * (th + gap)
        d.rounded_rectangle((x0, y0, x0 + tw, y0 + th), radius=14, outline=0, width=4, fill=255)
        d.line((x0 + 22, y0 + 6, x0 + 22, y0 + th - 6), fill=0, width=3)  # book spine
        d.text((x0 + 22 + (tw - 22 - d.textlength(name, font=nf)) // 2, y0 + th // 2), name, font=nf, fill=0, anchor="lm")


def main() -> None:
    entries = []
    for stem, e in DATA.items():
        page = Image.new("L", (W, H), 255)
        top = place_art(page, e["art"])
        if e["kind"] == "verse":
            verse(page, top, e["text"], e["ref"])
        else:
            books(page, top, e["heading"], e["books"])
        page.save(OUT / f"{stem}.png", optimize=True)
        page.convert("RGB").save(OUT / f"{stem}.webp", "WEBP", quality=WEBP_QUALITY, method=6)
        entries.append((f"{SITE}/kids/bible-coloring-pages/{e['slug']}/", f"{SITE}/printables/{stem}.webp"))
        print(f"✓ public/printables/{stem}.png + .webp", flush=True)
    urls = "\n".join(
        f"  <url>\n    <loc>{loc}</loc>\n    <image:image><image:loc>{img}</image:loc></image:image>\n  </url>"
        for loc, img in entries
    )
    (ROOT / "public" / "image-sitemap-text.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
        'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'
        f"{urls}\n</urlset>\n"
    )
    print(f"✓ public/image-sitemap-text.xml  ({len(entries)} images)", flush=True)


if __name__ == "__main__":
    main()
