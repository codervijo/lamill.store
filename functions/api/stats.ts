// v1.F — operator-only totals: GET /api/stats?key=<STATS_TOKEN>[&days=28].
// 404 unless STATS_TOKEN is set and matches, so the endpoint is invisible
// to everyone else. Never indexed, never cached.
import type { D1 } from "../../src/server/events";

type Ctx = { request: Request; env: { DB?: D1; STATS_TOKEN?: string } };
type Row = { k: string; n: number };

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

function same(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

function table(title: string, rows: Row[]): string {
  const total = rows.reduce((s, r) => s + r.n, 0);
  const body = rows.map((r) => `<tr><td>${esc(r.k || "(none)")}</td><td>${r.n}</td></tr>`).join("");
  return `<h2>${esc(title)} <small>(${total})</small></h2><table>${body || "<tr><td>no data</td><td></td></tr>"}</table>`;
}

export async function onRequestGet({ request, env }: Ctx): Promise<Response> {
  const url = new URL(request.url);
  const key = url.searchParams.get("key") ?? "";
  if (!env.STATS_TOKEN || !same(key, env.STATS_TOKEN)) return new Response("Not found", { status: 404 });
  const headers = { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };
  if (!env.DB) return new Response("<p>D1 binding <code>DB</code> is not set up.</p>", { headers });

  const days = Math.min(Math.max(Number(url.searchParams.get("days")) || 28, 1), 366);
  const since = new Date(Date.now() - (days - 1) * 86_400_000).toISOString().slice(0, 10);
  const q = (col: string, limit = 100) =>
    env.DB!.prepare(
      `SELECT ${col} AS k, SUM(count) AS n FROM daily_counts WHERE day >= ?1 GROUP BY k ORDER BY n DESC, k LIMIT ${limit}`,
    ).bind(since).all<Row>();
  const [byAction, bySource, byCollection, byPage, byDay] = await Promise.all([
    q("action"),
    q("source"),
    q("collection"),
    q("page || ' · ' || action", 100),
    env.DB.prepare("SELECT day AS k, SUM(count) AS n FROM daily_counts WHERE day >= ?1 GROUP BY day ORDER BY day DESC")
      .bind(since).all<Row>(),
  ]);

  const html = `<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>lamill.store counts</title>
<style>body{font:14px system-ui;margin:2em;max-width:60em}table{border-collapse:collapse;margin-bottom:1.5em}td{border-bottom:1px solid #ddd;padding:.25em 1em .25em 0}td:last-child{text-align:right}</style>
<h1>Downloads &amp; prints — last ${days} days (since ${since}, UTC)</h1>
<p>Sources: (none) = on-site visit · share = shared link · pdf = link inside a PDF · direct = PDF opened from off-site. Bots excluded.</p>
${table("By action", byAction.results)}${table("By source", bySource.results)}${table("By collection", byCollection.results)}${table("By day", byDay.results)}${table("Top pages × action", byPage.results)}`;
  return new Response(html, { headers });
}
