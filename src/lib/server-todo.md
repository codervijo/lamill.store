# Server code dropped in the Astro port

Source: `genai/` (TanStack Start). Astro output here is `static`; these did
not translate.

- TODO: `genai/src/server.ts` — TanStack Start SSR fetch entry with h3
  500-normalization (`isH3SwallowedErrorBody`) → `renderErrorPage()`. No
  equivalent needed for static output; Cloudflare serves `dist/` + `404.html`.
- TODO: `genai/src/start.ts`, `genai/src/router.tsx`, `genai/src/routeTree.gen.ts`
  — router/QueryClient bootstrap. Replaced by Astro file-based routing. No
  React Query queries were used by any route.
- TODO: `genai/src/lib/error-capture.ts`, `error-page.ts`,
  `lovable-error-reporting.ts` — Lovable runtime error reporting + root
  `ErrorComponent` ("This page didn't load / Try again"). Dropped; static
  pages have no SSR error boundary. 404 page ported to `src/pages/404.astro`.
- REMOVED (2026-11-07): Kids email signup (`EmailPrompt` in
  `src/components/kids/KidsCollections.tsx`) — it had no backend and only
  showed "Thanks!", so it collected nothing. Re-add only with a real endpoint
  (e.g. a Cloudflare Worker / email provider).

Not ported (unused by any route): `genai/src/components/ui/*` (shadcn/ui
library, ~45 files + Radix deps), `genai/src/hooks/use-mobile.tsx`,
`genai/src/lib/utils.ts` (`cn`). Copy individually if a page needs one.
