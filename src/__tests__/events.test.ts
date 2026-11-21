// v1.F — download + print counter logic (src/server/events.ts).
import { describe, it, expect } from "vitest";
import { cleanPage, collectionOf, isBot, isFirstFetch, makeLimiter, parsePing, pdfEvent } from "../server/events";

const now = new Date("2026-11-20T12:00:00Z");
const chrome = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36";

describe("ping parsing", () => {
  it("accepts a print ping and derives the collection", () => {
    expect(parsePing(JSON.stringify({ action: "print", page: "/kids/dog-coloring-pages/sleepy-puppy/", source: "share" }), now)).toEqual({
      day: "2026-11-20", page: "/kids/dog-coloring-pages/sleepy-puppy/", collection: "dog-coloring-pages", action: "print", source: "share",
    });
  });
  it("rejects PDFs (counted server-side), unknown actions, junk pages and bad JSON", () => {
    expect(parsePing(JSON.stringify({ action: "pdf", page: "/kids/x/" }), now)).toBeNull();
    expect(parsePing(JSON.stringify({ action: "delete", page: "/kids/x/" }), now)).toBeNull();
    expect(parsePing(JSON.stringify({ action: "print", page: "/admin/" }), now)).toBeNull();
    expect(parsePing(JSON.stringify({ action: "print", page: "/kids/x/<script>/" }), now)).toBeNull();
    expect(parsePing("not json", now)).toBeNull();
  });
  it("drops unknown or spoofed sources to ''", () => {
    expect(parsePing(JSON.stringify({ action: "print", page: "/kids/x/", source: "evil" }), now)?.source).toBe("");
    expect(parsePing(JSON.stringify({ action: "print", page: "/kids/x/", source: "direct" }), now)?.source).toBe("");
  });
  it("only allows /kids/ pages one or two levels deep", () => {
    expect(cleanPage("/kids/bible-coloring-pages/")).toBe("/kids/bible-coloring-pages/");
    expect(cleanPage("/kids/a/b/c/")).toBeNull();
    expect(cleanPage("/kids/a")).toBeNull();
    expect(collectionOf("/kids/bible-coloring-pages/noahs-ark/")).toBe("bible-coloring-pages");
  });
});

describe("PDF events", () => {
  it("off-site hit counts as direct on the PDF's own page", () => {
    expect(pdfEvent("/printables/the-angel-visits-mary.pdf", null, now)).toEqual({
      day: "2026-11-20", page: "/kids/bible-coloring-pages/the-angel-visits-mary/", collection: "bible-coloring-pages", action: "pdf", source: "direct",
    });
    expect(pdfEvent("/printables/the-angel-visits-mary.pdf", "https://www.pinterest.com/pin/1/", now)?.source).toBe("direct");
  });
  it("on-site download records the page the button was on and its utm_source", () => {
    const e = pdfEvent("/printables/dog-coloring-pages.pdf", "https://lamill.store/kids/dog-coloring-pages/?utm_source=pdf&utm_medium=link", now);
    expect(e).toMatchObject({ page: "/kids/dog-coloring-pages/", collection: "dog-coloring-pages", action: "print-all", source: "pdf" });
  });
  it("set PDFs are print-all; unknown PDFs are ignored", () => {
    expect(pdfEvent("/printables/christmas-story.pdf", null, now)?.action).toBe("print-all");
    expect(pdfEvent("/printables/christmas-story.pdf", null, now)?.page).toBe("/kids/bible-coloring-pages/christmas/");
    expect(pdfEvent("/printables/nope.pdf", null, now)).toBeNull();
    expect(pdfEvent("/printables/noahs-ark.svg", null, now)).toBeNull();
  });
});

describe("filters", () => {
  it("skips bots and empty user agents, keeps browsers", () => {
    expect(isBot(chrome)).toBe(false);
    expect(isBot("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)")).toBe(true);
    expect(isBot("Pinterestbot/1.0")).toBe(true);
    expect(isBot("curl/8.4.0")).toBe(true);
    expect(isBot(null)).toBe(true);
  });
  it("counts only the first range of a PDF", () => {
    expect(isFirstFetch(null)).toBe(true);
    expect(isFirstFetch("bytes=0-")).toBe(true);
    expect(isFirstFetch("bytes=65536-131071")).toBe(false);
  });
  it("rate-limits per key per minute", () => {
    const allow = makeLimiter(2, 60_000);
    expect([allow("a", 0), allow("a", 1), allow("a", 2), allow("b", 3)]).toEqual([true, true, false, true]);
    expect(allow("a", 61_000)).toBe(true);
  });
});
