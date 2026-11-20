// v1.G — what each printable PDF links back to. scripts/printable_pdfs.py
// reads src/data/printables.json (generated from this module) to stamp every
// PDF with its title, a "lamill.store" footer and a clickable link to its page.
// Regenerate after adding designs (inside the sites1 container):
//   node scripts/printables-manifest.ts
// src/__tests__/printables-manifest.test.ts fails if the JSON is stale.
// Explicit .ts extensions: Node's type stripping needs them.
import { collections, coloringPagePath } from "../config/site.ts";
import { themeCollections, designPath, hubPath } from "../config/coloring.ts";

export const SITE = "https://lamill.store";
// Clicks from inside a PDF show up in GA4 as source "pdf"; canonical URLs unchanged.
export const PDF_UTM = "utm_source=pdf&utm_medium=link";

export type PdfEntry = { title: string; url: string };

const stemOf = (pdf: string) => pdf.replace(/^\/printables\//, "").replace(/\.pdf$/, "");
const withUtm = (path: string) => `${SITE}${path}?${PDF_UTM}`;

export function buildManifest(): Record<string, PdfEntry> {
  const out: Record<string, PdfEntry> = {};
  for (const p of collections.flatMap((c) => c.printables)) {
    if (p.pdf) out[stemOf(p.pdf)] = { title: p.title, url: withUtm(coloringPagePath(p)) };
  }
  for (const c of themeCollections) {
    for (const d of c.designs) out[d.stem] = { title: `${d.title} Coloring Page`, url: withUtm(designPath(c, d)) };
    out[c.hub] = { title: `${c.h1} (Full Set)`, url: withUtm(hubPath(c)) };
  }
  out["christmas-story"] = {
    title: "Christmas Bible Coloring Pages (Full Set)",
    url: withUtm("/kids/bible-coloring-pages/christmas/"),
  };
  return Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)));
}
