---
project: lamill.store
prd_version: 1
project_version: v1.D
status: in progress
owner: Vijo
last_updated: 2026-11-07
---

# lamill.store — PRD

## 1. Problem

Owner-operated ecommerce businesses (Etsy sellers, small product brands)
need help with branded storefronts, better product pages, and attracting
customers directly — and want proof a builder can actually grow a store.
LaMill Store is that proof: a hub for LaMill's own storefronts that doubles
as a live showcase for prospective ecommerce clients.

## 2. Users

- **Primary (business):** owner-operated ecommerce businesses — Etsy
  sellers or small product brands with existing products and some sales —
  who want a branded storefront, better product pages, or direct customer
  acquisition.
- **First consumer cohort (test):** parents of children aged 5–9 looking
  for free, screen-free activities for their kids.
- **Audience size:** *unknown — not yet measured.*

## 3. Goals & non-goals

**Goals:**
- Attract qualified ecommerce clients by showing how LaMill builds and
  grows real storefronts.
- Start with free kids' downloads; measure downloads, repeat visits, and
  referrals.
- Compare standard vs personalized activities, and turn the results into a
  case study showing prospects how LaMill tests customer acquisition.

**Non-goals:**
- Payments — deferred until downloads / repeat visits / referrals are
  measured.
- Etsy shops and physical goods store in v1 — shown as "coming soon" only.
- Everyday-theme activities in v1 — v1 is Bible-based only.

## 4. Versions

Two-level versioning convention (canonical: `sites/portfolio/AI_AGENTS.md`):

- `vN` = major capability tier; SemVer-MAJOR semantics.
- `vN.X` = phase letter within a tier; internal slicing.

| Version | Theme | Acceptance |
|---|---|---|
| v0 | scaffold | local builds, CF wrangler.jsonc + public/_headers in place, repo initialized |
| v1 | storefront hub + free Bible-based Kids' Activities | homepage with Kids' Activities live and Etsy shop + physical goods store marked "coming soon"; free Bible-based printables live as three hubs (coloring pages incl. Christmas set, word searches, mazes); deployed and indexed in GSC |
| v2 | Work with LaMill | "Work with LaMill" path for ecommerce prospects (moved from v1.B, operator 2026-11-07); scope not yet planned |

## 5. Phases

| Phase | Theme | Features | Status |
|---|---|---|---|
| **v0.A** | scaffolded | `portfolio new bootstrap` ran; standard files written; git initialized | ✅ |
| **v1.A** | planning / decisions lock | lock v1 scope, storefront list (download measurement → v1.H, operator 2026-11-07) | ✅ |
| **v1.B** | storefront hub | homepage: Kids' Activities live; Etsy shop + physical goods store marked "coming soon" ("Work with LaMill" path → v2, operator 2026-11-07) | ✅ |
| **v1.C** | Bible coloring pages hub | `/kids/bible-coloring-pages/`: free printable Bible coloring pages grouped by Bible story (sub-sets → v1.G, operator 2026-11-07); each coloring page gets its own page at `/kids/bible-coloring-pages/<story>/` (large view, Download + Print, Bible passage, related pages); print UX: (1) print-ready output — `@page` CSS so each page prints as exactly one page, portrait, fitted to Letter/A4, safe margins, no browser headers/footers or site chrome; (2) one-tap Print button straight to the OS print dialog with the image already filling the page; (3) print-ready PDF download as fallback (more reliable than images, esp. on phones) — a web page cannot discover or configure network printers, so the OS print dialog (AirPrint / Mopria / Windows / ChromeOS driverless discovery) is the printer path; printables are portrait, full-resolution download (needs imagemill portrait-size + original-export support first — operator chose option B, 2026-11-07); deploy + GSC verify + sitemap submit. Targets: "bible coloring pages to print" 5,400*/KD 5, "free bible coloring page" 1,300/KD 3, "bible story coloring sheets" 1,000/KD 4, "bible coloring pages for preschoolers" 1,000/KD 4 | ✅ |
| **v1.D** | Christmas Bible coloring pages | nativity / Christmas-story coloring pages under the coloring hub; seasonal — must be live and indexed before mid-December. Target: "christmas bible coloring pages" 140/KD 8; landing page `/kids/bible-coloring-pages/christmas/` | 🚧 in progress |
| **v1.E** | Bible word search hub | `/kids/bible-word-search/`: free printable Bible word searches; kids' and books-of-the-Bible sets. Targets: "word search bible puzzles" 5,400*/KD 1–18 (cluster scores conflict), "bible word search puzzle free" 880/KD 9, "bible books word search" 720/KD 4, "children's bible word search puzzles" 260/KD 8 | planned |
| **v1.F** | Bible mazes page | `/kids/bible-mazes/`: free printable Bible-story mazes. Targets: "maze bible" 390/KD 6, "bible maze" 140/KD 6, "bible mazes" 110/KD 5 | planned |
| **v1.G** | Bible coloring sub-sets | sub-pages under `/kids/bible-coloring-pages/`: verses (verse text set in code, not generated), preschoolers (simpler pages), characters (King David, Ruth, Paul & Silas), books of the Bible | planned |
| **v1.H** | download measurement | measure downloads, repeat visits, referrals; method not yet chosen (Cloudflare Web Analytics + beacon, GA4, or GSC only) | planned |

Keyword figures: Serpstat via treg, Google US, pulled 2026-11-07; US monthly
search volume / Serpstat difficulty (0–100). Single source, not cross-checked.
\* Serpstat assigns one volume to a cluster of near-identical phrasings —
one page target per cluster, volumes not additive.

## 6. Open questions

- *(append-only log; mark answered with date but never delete)*
- Where do Etsy shop profiles, the physical goods catalog, and short case
  studies go — later v1 phases or v2? (AI_AGENTS.md lists them; "as results
  come in" for case studies.)
  - *Partly answered 2026-11-07:* Etsy shop and physical store are
    "coming soon" placeholders in v1; v1 starts with Kids' Activities,
    Bible-based only. Tier/phase for their full build still open.
- Which phase adds everyday-theme activities?
- How are downloads, repeat visits, and referrals measured (GA, GSC,
  something else)?
  - *Deferred 2026-11-07:* moved to v1.H; method still open.
- What are the Etsy shop names/URLs and the physical goods store URL?
- What does "personalized activities" mean concretely, and which phase
  ships it?
