// v1.E — Bible sub-hubs (verses, preschool, characters, books) stay consistent with their assets.
import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { collections } from "../config/site";

const root = process.cwd();
const sets = JSON.parse(readFileSync(join(root, "src/data/print-sets.json"), "utf8"));
const text = JSON.parse(readFileSync(join(root, "src/data/text-pages.json"), "utf8"));
const all = collections.flatMap((c) => c.printables);
const subsets = collections.filter((c) => c.hub);
const stem = (p: string) => p.replace(/^\/printables\//, "").replace(/\.\w+$/, "");
// static pages living in /kids/bible-coloring-pages/ — a detail slug must never shadow one
const RESERVED = ["christmas", "verses", "preschool", "characters", "books-of-the-bible"];

describe("Bible sub-hubs", () => {
  it("four sub-hubs, six pages each, each with a page file and a print-all set", () => {
    expect(subsets.map((c) => c.id)).toEqual(["verses", "preschool", "characters", "books"]);
    for (const c of subsets) {
      expect(c.printables.length, c.id).toBe(6);
      expect(existsSync(join(root, "src/pages", `${c.hub!.replace(/\/$/, "")}.astro`)), c.hub).toBe(true);
      expect(sets[c.set!], c.id).toEqual(c.printables.map((p) => stem(p.pdf!)));
    }
  });

  it("detail slugs are unique and never shadow a sub-hub page", () => {
    const slugs = all.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const r of RESERVED) expect(slugs, r).not.toContain(r);
  });

  it("every printable has its preview, print file and PDF", () => {
    for (const p of all) for (const f of [p.preview, p.file, p.pdf]) {
      expect(f, p.slug).toBeTruthy();
      expect(existsSync(join(root, "public", f!)), f).toBe(true);
    }
  });

  it("every typeset page belongs to a collection, with matching slug", () => {
    for (const [s, e] of Object.entries(text as Record<string, { slug: string }>)) {
      const p = all.find((x) => stem(x.preview) === s);
      expect(p, s).toBeTruthy();
      expect(p!.slug, s).toBe(e.slug);
    }
  });

  it("books pages list all 66 books once", () => {
    const books = Object.values(text as Record<string, { kind: string; books?: string[] }>).flatMap((e) => e.books ?? []);
    expect(books.length).toBe(66);
    expect(new Set(books).size).toBe(66);
  });

  it("verse text never prints the name Yahweh (operator 2026-11-20: \"the LORD\")", () => {
    for (const e of Object.values(text as Record<string, { text?: string }>)) expect(e.text ?? "").not.toMatch(/Yahweh/);
  });
});
