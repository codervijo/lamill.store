# /// script
# requires-python = ">=3.11"
# dependencies = ["pillow>=10", "cairosvg>=2.7"]
# ///
"""Build a print-ready PDF for every coloring page in public/printables/.

Each PDF is one US Letter page (8.5 x 11 in) at 300 dpi, portrait, with the
picture fitted inside 0.4 in margins and centered. Output is bilevel
(pure black/white): crisp line art, small files.

Run from the repo root:  uv run scripts/printable_pdfs.py
Re-run whenever a printable is added or changed; commit the PDFs.
"""

from __future__ import annotations

import io
import json
import sys
from pathlib import Path

from PIL import Image

DPI = 300
PAGE_W, PAGE_H = int(8.5 * DPI), int(11 * DPI)
MARGIN = int(0.4 * DPI)
THRESHOLD = 160  # gray → black/white cutoff for line art

# Multi-page "print the whole set" PDFs live in src/data/print-sets.json
# (output stem → printable stems, in order); the site reads the same file.
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "printables"
SETS = json.loads((ROOT / "src" / "data" / "print-sets.json").read_text())


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


def to_page(img: Image.Image) -> Image.Image:
    box_w, box_h = PAGE_W - 2 * MARGIN, PAGE_H - 2 * MARGIN
    scale = min(box_w / img.width, box_h / img.height)
    img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    page = Image.new("L", (PAGE_W, PAGE_H), 255)
    page.paste(img, ((PAGE_W - img.width) // 2, (PAGE_H - img.height) // 2))
    return page.point(lambda v: 255 if v > THRESHOLD else 0).convert("1")


def main() -> None:
    sources = sorted(p for p in SRC.iterdir() if p.suffix in (".png", ".svg"))
    if not sources:
        sys.exit(f"✗ no .png/.svg printables in {SRC}")
    for src in sources:
        out = src.with_suffix(".pdf")
        if out.exists() and out.stat().st_mtime >= src.stat().st_mtime:
            continue  # up to date — rewriting would only churn git
        to_page(load(src)).save(out, "PDF", resolution=DPI)
        print(f"✓ {out.relative_to(ROOT)}  ({out.stat().st_size // 1024} KB)", flush=True)
    by_stem = {p.stem: p for p in sources}
    for name, stems in SETS.items():
        missing = [x for x in stems if x not in by_stem]
        if missing:
            sys.exit(f"✗ set {name}: no printable for {', '.join(missing)}")
        out = SRC / f"{name}.pdf"
        if out.exists() and all(out.stat().st_mtime >= by_stem[x].stat().st_mtime for x in stems):
            continue
        pages = [to_page(load(by_stem[x])) for x in stems]
        pages[0].save(out, "PDF", resolution=DPI, save_all=True, append_images=pages[1:])
        print(f"✓ {out.relative_to(ROOT)}  ({len(pages)} pages, {out.stat().st_size // 1024} KB)", flush=True)


if __name__ == "__main__":
    main()
