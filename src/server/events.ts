// v1.F — download + print counter: pure logic shared by the Pages Functions
// (functions/api/event.ts, functions/printables/_middleware.ts,
// functions/api/stats.ts) and unit-tested in src/__tests__/events.test.ts.
//
// Privacy: no cookies, no IPs or user agents stored. D1 holds only
// day × page × collection × action × source counts. IPs are used in memory
// for rate limiting and never written anywhere.
import printables from "../data/printables.json";
import printSets from "../data/print-sets.json";

export const ORIGIN = "https://lamill.store";

/** print = Print button; pdf = one design's PDF; print-all = a set PDF;
 *  share = v2.C share button (not built yet). */
export const ACTIONS = ["print", "pdf", "print-all", "share"] as const;
export type Action = (typeof ACTIONS)[number];

/** Where the visitor came from, read from the page URL's utm_source.
 *  "direct" = a PDF requested from off-site (Pinterest, a shared file, Google). */
export const SOURCES = ["", "share", "pdf", "direct"] as const;
export type Source = (typeof SOURCES)[number];

export type Event = { day: string; page: string; collection: string; action: Action; source: Source };

const PAGE_RE = /^\/kids\/[a-z0-9-]+\/(?:[a-z0-9-]+\/)?$/;

export const day = (now: Date) => now.toISOString().slice(0, 10);

/** "/kids/dog-coloring-pages/sleepy-puppy/" → "dog-coloring-pages". */
export function collectionOf(page: string): string {
  return page.split("/")[2] ?? "";
}

export function cleanPage(page: unknown): string | null {
  if (typeof page !== "string" || page.length > 120) return null;
  return PAGE_RE.test(page) ? page : null;
}

export function cleanSource(src: unknown): Source {
  return (SOURCES as readonly unknown[]).includes(src) && src !== "direct" ? (src as Source) : "";
}

/** Body of a POST /api/event ping (sendBeacon, text/plain JSON). */
export function parsePing(body: string, now: Date): Event | null {
  let j: unknown;
  try {
    j = JSON.parse(body);
  } catch {
    return null;
  }
  if (!j || typeof j !== "object") return null;
  const o = j as Record<string, unknown>;
  if (o.action !== "print" && o.action !== "share") return null; // PDFs are counted server-side
  const page = cleanPage(o.page);
  if (!page) return null;
  return { day: day(now), page, collection: collectionOf(page), action: o.action, source: cleanSource(o.source) };
}

const MANIFEST = printables as Record<string, { title: string; url: string }>;
const SETS = new Set(Object.keys(printSets));

/** A GET for /printables/<stem>.pdf → the event to count, or null. */
export function pdfEvent(path: string, referer: string | null, now: Date): Event | null {
  const m = /^\/printables\/([a-z0-9-]+)\.pdf$/.exec(path);
  if (!m || !MANIFEST[m[1]]) return null;
  const stem = m[1];
  const home = new URL(MANIFEST[stem].url).pathname; // the PDF's own page
  let page = home;
  let source: Source = "direct";
  if (referer) {
    try {
      const r = new URL(referer);
      if (r.origin === ORIGIN) {
        source = cleanSource(r.searchParams.get("utm_source"));
        page = cleanPage(r.pathname) ?? home; // the page the button was on
      }
    } catch {
      /* bad referer → treat as direct */
    }
  }
  return { day: day(now), page, collection: collectionOf(home), action: SETS.has(stem) ? "print-all" : "pdf", source };
}

/** Skip crawlers, link previews and scripts — they are not parents printing. */
const BOT_RE = /bot|crawl|spider|slurp|fetch|preview|monitor|curl|wget|python|httpx|go-http|java\/|headless|lighthouse|facebookexternalhit|embedly|quora|whatsapp|telegram|discord|slack/i;
export function isBot(ua: string | null): boolean {
  return !ua || BOT_RE.test(ua);
}

/** Only count the first chunk of a PDF: viewers re-request ranges. */
export function isFirstFetch(range: string | null): boolean {
  return !range || /^bytes=0-/.test(range.trim());
}

/** Best-effort per-isolate limiter: at most LIMIT events per key per minute.
 *  Keys (IPs) live only in this Map, in memory, and expire after a minute. */
export const LIMIT = 30;
export function makeLimiter(limit = LIMIT, windowMs = 60_000) {
  const hits = new Map<string, { n: number; t: number }>();
  return (key: string, nowMs: number): boolean => {
    if (hits.size > 5000) for (const [k, v] of hits) if (nowMs - v.t > windowMs) hits.delete(k);
    const h = hits.get(key);
    if (!h || nowMs - h.t > windowMs) {
      hits.set(key, { n: 1, t: nowMs });
      return true;
    }
    h.n += 1;
    return h.n <= limit;
  };
}

export const UPSERT_SQL =
  "INSERT INTO daily_counts (day, page, collection, action, source, count) VALUES (?1, ?2, ?3, ?4, ?5, 1) " +
  "ON CONFLICT (day, page, collection, action, source) DO UPDATE SET count = count + 1";

// Minimal D1 surface (avoids a @cloudflare/workers-types dependency).
export type D1 = {
  prepare(sql: string): {
    bind(...v: unknown[]): { run(): Promise<unknown>; all<T>(): Promise<{ results: T[] }> };
    all<T>(): Promise<{ results: T[] }>;
  };
};

export async function record(db: D1 | undefined, e: Event): Promise<void> {
  if (!db) return; // binding not set up yet → count nothing, break nothing
  await db.prepare(UPSERT_SQL).bind(e.day, e.page, e.collection, e.action, e.source).run();
}
