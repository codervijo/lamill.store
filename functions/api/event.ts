// v1.F — POST /api/event: Print / share button pings (navigator.sendBeacon).
// PDFs are counted server-side in functions/printables/_middleware.ts.
import { ORIGIN, isBot, makeLimiter, parsePing, record, type D1 } from "../../src/server/events";

type Ctx = { request: Request; env: { DB?: D1 }; waitUntil(p: Promise<unknown>): void };

const allow = makeLimiter();
const done = () => new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });

export async function onRequestPost({ request, env, waitUntil }: Ctx): Promise<Response> {
  const origin = request.headers.get("Origin");
  if (origin && origin !== ORIGIN) return new Response(null, { status: 403 });
  if (isBot(request.headers.get("User-Agent"))) return done();
  if (!allow(request.headers.get("CF-Connecting-IP") ?? "?", Date.now())) return done();
  const body = (await request.text()).slice(0, 1000);
  const e = parsePing(body, new Date());
  if (!e) return new Response(null, { status: 400 });
  waitUntil(record(env.DB, e).catch((err) => console.error("event write failed", err)));
  return done();
}
