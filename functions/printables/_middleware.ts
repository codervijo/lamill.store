// v1.F — count PDF downloads (single designs + print-all sets), including
// direct hits from Pinterest, Google or a shared file. Images pass straight
// through. Counting runs after the response is sent (waitUntil).
import { isBot, isFirstFetch, makeLimiter, pdfEvent, record, type D1 } from "../../src/server/events";

type Ctx = { request: Request; env: { DB?: D1 }; next(): Promise<Response>; waitUntil(p: Promise<unknown>): void };

const allow = makeLimiter();

export async function onRequest({ request, env, next, waitUntil }: Ctx): Promise<Response> {
  const { pathname } = new URL(request.url);
  if (!pathname.endsWith(".pdf")) return next();
  // Cloudflare's zone cache stores .pdf by default and answers repeat requests
  // without reaching this function, so those downloads went uncounted
  // (2026-11-21). Tell the CDN not to store PDFs; browsers still cache them.
  const res = withNoEdgeCache(await next());
  // 304 = a browser re-opening its cached copy: still a download.
  if (request.method !== "GET" || !(res.ok || res.status === 304)) return res;
  const h = request.headers;
  if (isBot(h.get("User-Agent")) || !isFirstFetch(h.get("Range"))) return res;
  if (!allow(h.get("CF-Connecting-IP") ?? "?", Date.now())) return res;
  const e = pdfEvent(pathname, h.get("Referer"), new Date());
  if (e) waitUntil(record(env.DB, e).catch((err) => console.error("pdf count failed", err)));
  return res;
}

function withNoEdgeCache(res: Response): Response {
  const out = new Response(res.body, res);
  out.headers.set("Cloudflare-CDN-Cache-Control", "no-store");
  return out;
}
