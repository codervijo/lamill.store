// v2.B — theme coloring collections stay consistent with their assets.
import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { themeCollections } from "../config/coloring";

const root = process.cwd();
const sets = JSON.parse(readFileSync(join(root, "src/data/print-sets.json"), "utf8"));

describe("theme coloring collections", () => {
  it("hubs are unique and never shadow the Bible hub", () => {
    const hubs = themeCollections.map((c) => c.hub);
    expect(new Set(hubs).size).toBe(hubs.length);
    expect(hubs).not.toContain("bible-coloring-pages");
  });

  it("stems are globally unique and slugs unique per hub", () => {
    const stems = themeCollections.flatMap((c) => c.designs.map((d) => d.stem));
    expect(new Set(stems).size).toBe(stems.length);
    for (const c of themeCollections) {
      const slugs = c.designs.map((d) => d.slug);
      expect(new Set(slugs).size, c.id).toBe(slugs.length);
    }
  });

  it("each collection has 6–8 designs with webp, png and pdf", () => {
    for (const c of themeCollections) {
      expect(c.designs.length, c.id).toBeGreaterThanOrEqual(6);
      expect(c.designs.length, c.id).toBeLessThanOrEqual(8);
      for (const d of c.designs)
        for (const ext of ["webp", "png", "pdf"])
          expect(existsSync(join(root, "public/printables", `${d.stem}.${ext}`)), `${d.stem}.${ext}`).toBe(true);
    }
  });

  it("print-all set matches the designs, in order, and its PDF exists", () => {
    for (const c of themeCollections) {
      expect(sets[c.hub], c.hub).toEqual(c.designs.map((d) => d.stem));
      expect(existsSync(join(root, "public/printables", `${c.hub}.pdf`)), c.hub).toBe(true);
    }
  });

  it("related ids point at real collections", () => {
    const ids = new Set(themeCollections.map((c) => c.id));
    for (const c of themeCollections) for (const r of c.related) expect(ids.has(r), `${c.id}→${r}`).toBe(true);
  });
});
