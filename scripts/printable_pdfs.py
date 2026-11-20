# /// script
# requires-python = ">=3.11"
# dependencies = ["pillow>=10.1", "cairosvg>=2.7", "pypdf>=4"]
# ///
"""Build a print-ready PDF for every coloring page in public/printables/.

Each PDF is one US Letter page (8.5 x 11 in) at 300 dpi, portrait, with the
picture fitted inside 0.4 in margins and centered. Output is bilevel
(pure black/white): crisp line art, small files.

v1.G: every page carries a printed "lamill.store" footer, the footer is a
clickable link to the design's page, and the PDF Title/Subject are set — so a
PDF found in search, shared, or printed leads back to the site. Titles and
URLs come from src/data/printables.json (`node scripts/printables-manifest.ts`).

Run from the repo root:  uv run scripts/printable_pdfs.py [--force]
Re-run whenever a printable is added or changed; commit the PDFs.
--force rebuilds every PDF (needed after changing the layout or footer).
"""

from __future__ import annotations

import io
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

DPI = 300
PAGE_W, PAGE_H = int(8.5 * DPI), int(11 * DPI)
MARGIN = int(0.4 * DPI)
THRESHOLD = 160  # gray → black/white cutoff for line art
FOOTER_H = int(0.35 * DPI)  # strip under the picture for the site footer
FOOTER_TEXT = "More free coloring pages at lamill.store"
FOOTER_PX = 40  # ≈ 9.6 pt at 300 dpi
PT = 72 / DPI  # pixels → PDF points

# Multi-page "print the whole set" PDFs live in src/data/print-sets.json
# (output stem → printable stems, in order); the site reads the same file.
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "printables"
SETS = json.loads((ROOT / "src" / "data" / "print-sets.json").read_text())
MANIFEST = json.loads((ROOT / "src" / "data" / "printables.json").read_text())
FONT = ImageFont.load_default(size=FOOTER_PX)


def load(path: Path) -> Image.Image:
    if path.suffix == ".svg":
        try:
            import cairosvg
        except ImportError as e:  # pragma: no cover
            sys.exit(f"✗ cairosvg not installed ({e}). Run via `uv run scripts/printable_pdfs.py`.")
        png = cairosvg.svg2png(url=str(path), output_width=PAGE_W - 2 * MARGIN)
        img = Image.open(io.BytesIO(png))
    else:
        img = Image.open(path)
    if img.mode in ("RGBA", "LA", "P"):
        img = img.convert("RGBA")
        bg = Image.new("RGBA", img.size, "white")
        img = Image.alpha_composite(bg, img)
    return img.convert("L")


def footer_box() -> tuple[int, int, int, int]:
    """Pixel box (left, top, right, bottom) of the centered footer text."""
    l, t, r, b = ImageDraw.Draw(Image.new("L", (1, 1))).textbbox((0, 0), FOOTER_TEXT, font=FONT)
    x = (PAGE_W - (r - l)) // 2 - l
    y = PAGE_H - MARGIN - FOOTER_H // 2 - (b - t) // 2 - t
    return x + l, y + t, x + r, y + b


def to_page(img: Image.Image) -> Image.Image:
    box_w, box_h = PAGE_W - 2 * MARGIN, PAGE_H - 2 * MARGIN - FOOTER_H
    scale = min(box_w / img.width, box_h / img.height)
    img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    page = Image.new("L", (PAGE_W, PAGE_H), 255)
    page.paste(img, ((PAGE_W - img.width) // 2, MARGIN + (box_h - img.height) // 2))
    l, t, _, _ = footer_box()
    ImageDraw.Draw(page).text((l, t), FOOTER_TEXT, font=FONT, fill=0, anchor="lt")
    return page.point(lambda v: 255 if v > THRESHOLD else 0).convert("1")


def stamp(out: Path, stem: str) -> None:
    """Add the clickable footer link and Title/Subject metadata (pypdf)."""
    try:
        from pypdf import PdfReader, PdfWriter
        from pypdf.annotations import Link
    except ImportError as e:  # pragma: no cover
        sys.exit(f"✗ pypdf not installed ({e}). Run via `uv run scripts/printable_pdfs.py`.")
    entry = MANIFEST.get(stem)
    if entry is None:
        sys.exit(f"✗ {stem}: missing from src/data/printables.json — run `node scripts/printables-manifest.ts`")
    l, t, r, b = footer_box()
    pad = 12
    rect = ((l - pad) * PT, (PAGE_H - b - pad) * PT, (r + pad) * PT, (PAGE_H - t + pad) * PT)
    writer = PdfWriter(clone_from=PdfReader(out))
    for i in range(len(writer.pages)):
        writer.add_annotation(page_number=i, annotation=Link(rect=rect, url=entry["url"], border=[0, 0, 0]))
    page_url = entry["url"].split("?")[0]
    writer.add_metadata({
        "/Title": f"{entry['title']} — Free Printable | LaMill Store",
        "/Subject": f"Free printable coloring page for kids. More at {page_url}",
        "/Author": "LaMill Store (lamill.store)",
        "/Keywords": "coloring page, free printable, kids, lamill.store",
    })
    with out.open("wb") as f:
        writer.write(f)


def main() -> None:
    force = "--force" in sys.argv[1:]
    sources = sorted(p for p in SRC.iterdir() if p.suffix in (".png", ".svg"))
    if not sources:
        sys.exit(f"✗ no .png/.svg printables in {SRC}")
    for src in sources:
        out = src.with_suffix(".pdf")
        if not force and out.exists() and out.stat().st_mtime >= src.stat().st_mtime:
            continue  # up to date — rewriting would only churn git
        to_page(load(src)).save(out, "PDF", resolution=DPI)
        stamp(out, src.stem)
        print(f"✓ {out.relative_to(ROOT)}  ({out.stat().st_size // 1024} KB)", flush=True)
    by_stem = {p.stem: p for p in sources}
    for name, stems in SETS.items():
        missing = [x for x in stems if x not in by_stem]
        if missing:
            sys.exit(f"✗ set {name}: no printable for {', '.join(missing)}")
        out = SRC / f"{name}.pdf"
        if not force and out.exists() and all(out.stat().st_mtime >= by_stem[x].stat().st_mtime for x in stems):
            continue
        pages = [to_page(load(by_stem[x])) for x in stems]
        pages[0].save(out, "PDF", resolution=DPI, save_all=True, append_images=pages[1:])
        stamp(out, name)
        print(f"✓ {out.relative_to(ROOT)}  ({len(pages)} pages, {out.stat().st_size // 1024} KB)", flush=True)


if __name__ == "__main__":
    main()
