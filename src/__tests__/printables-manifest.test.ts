// v1.G — every printable PDF knows its title and the page it links back to.
import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { buildManifest } from "../lib/printables-manifest";

const root = process.cwd();
const json = JSON.parse(readFileSync(join(root, "src/data/printables.json"), "utf8"));

describe("printables manifest", () => {
  it("src/data/printables.json is up to date (run: node scripts/printables-manifest.ts)", () => {
    expect(json).toEqual(buildManifest());
  });

  it("covers every PDF in public/printables and points only at real PDFs", () => {
    const pdfs = readdirSync(join(root, "public/printables")).filter((f) => f.endsWith(".pdf")).map((f) => f.slice(0, -4));
    expect(Object.keys(json).sort()).toEqual(pdfs.sort());
    for (const stem of Object.keys(json)) expect(existsSync(join(root, `public/printables/${stem}.pdf`)), stem).toBe(true);
  });

  it("links are absolute lamill.store page URLs with the pdf UTM", () => {
    for (const [stem, e] of Object.entries(json as Record<string, { url: string }>)) {
      expect(e.url, stem).toMatch(/^https:\/\/lamill\.store\/kids\/[a-z0-9/-]+\/\?utm_source=pdf&utm_medium=link$/);
    }
  });
});
