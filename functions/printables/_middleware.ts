// v1.F — count PDF downloads (single designs + print-all sets), including
// direct hits from Pinterest, Google or a shared file. Images pass straight
// through. Counting runs after the response is sent (waitUntil).
import { isBot, isFirstFetch, makeLimiter, pdfEvent, record, type D1 } from "../../src/server/events";

type Ctx = { request: Request; env: { DB?: D1 }; next(): Promise<Response>; waitUntil(p: Promise<unknown>): void };

const allow = makeLimiter();

export async function onRequest({ request, env, next, waitUntil }: Ctx): Promise<Response> {
  const res = await next();
  if (request.method !== "GET" || !res.ok) return res;
  const { pathname } = new URL(request.url);
  if (!pathname.endsWith(".pdf")) return res;
  const h = request.headers;
  if (isBot(h.get("User-Agent")) || !isFirstFetch(h.get("Range"))) return res;
  if (!allow(h.get("CF-Connecting-IP") ?? "?", Date.now())) return res;
  const e = pdfEvent(pathname, h.get("Referer"), new Date());
  if (e) waitUntil(record(env.DB, e).catch((err) => console.error("pdf count failed", err)));
  return res;
}
