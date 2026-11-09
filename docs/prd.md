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
- Everyday-theme activities in v1 — v1 is Bible-based only (everyday/seasonal coloring starts in v2, operator 2026-11-08).

## 4. Versions

Two-level versioning convention (canonical: `sites/portfolio/AI_AGENTS.md`):

- `vN` = major capability tier; SemVer-MAJOR semantics.
- `vN.X` = phase letter within a tier; internal slicing.

| Version | Theme | Acceptance |
|---|---|---|
| v0 | scaffold | local builds, CF wrangler.jsonc + public/_headers in place, repo initialized |
| v1 | storefront hub + free Bible-based Kids' Activities | homepage with Kids' Activities live and Etsy shop + physical goods store marked "coming soon"; free Bible-based coloring pages hub live (incl. Christmas set); deployed and indexed in GSC |
| v2 | everyday + seasonal coloring — urgent batch | up to 6 non-Bible coloring collections from the first-batch list, each validated against the live US top 10 (concrete gap recorded), 6–8 original B/W designs, per-page Letter PDFs + print-all PDF, linked from `/kids/`; Bible collections stay live and unchanged (operator 2026-11-08) |
| v3 | connect the dots + mazes | free printable connect-the-dots and maze hubs targeting the general (non-Bible) printable searches; Bible-themed vs everyday scope decided in v3.A (operator 2026-11-08) |
| v4 | Bible word searches | free printable Bible word search hub (moved from v1.E, operator 2026-11-08) |
| v5 | everyday + seasonal coloring — backlog | remaining collections from the brief (next, seasonal, expand lists), same bar as v2 (operator 2026-11-08) |
| v6 | Work with LaMill | "Work with LaMill" path for ecommerce prospects (moved v1.B → v2 on 2026-11-07, v2 → v6 on 2026-11-08); scope not yet planned |
| v7 | photo → coloring page | parents turn their own photo into a printable coloring page, converted in the browser with no AI; the photo never leaves the device (operator 2026-11-08) |

## 5. Phases

| Phase | Theme | Features | Status |
|---|---|---|---|
| **v0.A** | scaffolded | `portfolio new bootstrap` ran; standard files written; git initialized | ✅ |
| **v1.A** | planning / decisions lock | lock v1 scope, storefront list (download measurement → v1.F, operator 2026-11-07) | ✅ |
| **v1.B** | storefront hub | homepage: Kids' Activities live; Etsy shop + physical goods store marked "coming soon" ("Work with LaMill" path → v2, operator 2026-11-07) | ✅ |
| **v1.C** | Bible coloring pages hub | `/kids/bible-coloring-pages/`: free printable Bible coloring pages grouped by Bible story (sub-sets → v1.E, operator 2026-11-07); each coloring page gets its own page at `/kids/bible-coloring-pages/<story>/` (large view, Download + Print, Bible passage, related pages); print UX: (1) print-ready output — `@page` CSS so each page prints as exactly one page, portrait, fitted to Letter/A4, safe margins, no browser headers/footers or site chrome; (2) one-tap Print button straight to the OS print dialog with the image already filling the page; (3) print-ready PDF download as fallback (more reliable than images, esp. on phones) — a web page cannot discover or configure network printers, so the OS print dialog (AirPrint / Mopria / Windows / ChromeOS driverless discovery) is the printer path; printables are portrait, full-resolution download (needs imagemill portrait-size + original-export support first — operator chose option B, 2026-11-07); deploy + GSC verify + sitemap submit. Targets: "bible coloring pages to print" 5,400*/KD 5, "free bible coloring page" 1,300/KD 3, "bible story coloring sheets" 1,000/KD 4, "bible coloring pages for preschoolers" 1,000/KD 4 | ✅ |
| **v1.D** | Christmas Bible coloring pages | nativity / Christmas-story coloring pages under the coloring hub; seasonal — must be live and indexed before mid-December. Target: "christmas bible coloring pages" 140/KD 8; landing page `/kids/bible-coloring-pages/christmas/` | 🚧 in progress |
| **v1.E** | Bible coloring sub-sets | sub-pages under `/kids/bible-coloring-pages/`: verses (verse text set in code, not generated), preschoolers (simpler pages), characters (King David, Ruth, Paul & Silas), books of the Bible | planned |
| **v1.F** | download measurement | measure downloads, repeat visits, referrals; method not yet chosen (Cloudflare Web Analytics + beacon, GA4, or GSC only) | planned |
| **v2.A** | planning / validation | refresh first-batch numbers via treg; review live US top 10 per candidate; record the gap we can beat (artwork, age/difficulty options, direct PDF, print-all pack) — low KD alone does not qualify; pick ≤ 6; URL pattern `/kids/<topic>-coloring-pages/` + `/<design>/` detail pages; sub-intents start inside parent (puppies → dogs, hearts → Valentine's, ice cream → food) unless the SERP shows a distinct intent; download tracking deferred to v1.F (operator 2026-11-08); result 2026-11-08: 5 picked (Christmas, winter, dogs + puppies, dragons, monster trucks), Thanksgiving first deferred (18 days to the holiday on an unindexed site), then added back to v2.B by operator 2026-11-08 to test fast ranking; evidence in `docs/growth.md` | ✅ |
| **v2.B** | first-batch collections | candidates (Ahrefs SV / KD, operator screenshots): Thanksgiving 27K/2, dog 22K/0 (+ puppy 8K/0), dragon 21K/0, winter 19K/3, cute Christmas 9.9K/6 (one general `/kids/christmas-coloring-pages/` covering cute/free/printable, cross-linked with the Bible Christmas set), monster truck 8K/0; per collection: 6–8 original B/W designs (imagemill, no franchise characters), large previews, Letter PDF per design + print-all PDF, unique title/description/alt, page + image sitemap, links from `/kids/` and related collections; per-page log of gap, target keyword, final URL | 🚧 in progress |
| **v2.C** | share button | Share button on every coloring detail page (Bible + theme), every hub and the Christmas Bible page; behavior by device (operator 2026-11-08): **phone** (coarse pointer + Web Share API) → native share sheet with page title + link; second action "Send the PDF" shares the printable file via `navigator.share({files})` when `navigator.canShare` allows it (hubs: the print-all PDF), PDF pre-fetched when the menu opens so the share keeps the tap's user activation; **desktop** → "Copy link" with a "Copied" confirmation (clipboard API, text-select fallback); shared links carry `?utm_source=share&utm_medium=<sheet|copy|pdf>` for v1.F referral counting (canonical unchanged); no third-party scripts, no share counts; button hidden in print; acceptance: verified on iPhone Safari, Android Chrome, desktop Chrome/Firefox/Safari | planned |
| **v3.A** | planning / decisions lock | decide theme scope (Bible-themed puzzles aimed at general searches, or everyday themes — v1 non-goal), puzzle generation method, URL structure | planned |
| **v3.B** | connect the dots hub | `/kids/connect-the-dots/`: free printable dot-to-dot pages, Christmas set. Targets: "dot to dot worksheets" / "dot to dot to print" / "dot-to-dot printables" 9,900*/KD 14–18, "connect the dots print" 9,900/KD 28, "connect the dots coloring pages" 1,300/KD 31, "christmas connect the dots" 590/KD 13; Bible-specific ("bible dot to dot" 70/KD 8) too small to target alone | planned |
| **v3.C** | printable mazes hub | `/kids/mazes/`: free printable mazes, kindergarten and difficult sets; includes the Bible mazes page `/kids/bible-mazes/` (moved from v1.F, operator 2026-11-08: "maze bible" 390/KD 6, "bible maze" 140/KD 6, "bible mazes" 110/KD 5). Targets: "printable mazes" 6,600/KD 18, "free printable mazes for kindergarten" 2,400/KD 27, "maze printable kindergarten" 1,900/KD 24, "difficult printable maze" 880/KD 11–13 | planned |
| **v4.A** | planning / decisions lock | word search scope, puzzle generation method (grid generator in code vs. images) | planned |
| **v4.B** | Bible word search hub | `/kids/bible-word-search/`: free printable Bible word searches; kids' and books-of-the-Bible sets. Targets: "word search bible puzzles" 5,400*/KD 1–18 (cluster scores conflict), "bible word search puzzle free" 880/KD 9, "bible books word search" 720/KD 4, "children's bible word search puzzles" 260/KD 8 (moved from v1.E, operator 2026-11-08) | planned |
| **v5.A** | planning / validation | same validation bar as v2.A for each backlog collection; decide order by season deadline | planned |
| **v5.B** | next batch | mermaid 18K/0, horse 11K/1, car 10K/1, happy birthday 9.9K/0, butterfly 8.3K/1, shark 7.2K/2, fairy 7.1K/0, cow 7K/0, turtle 6.8K/0 — `/kids/<topic>-coloring-pages/` | planned |
| **v5.C** | seasonal batch | Valentine's Day 18K/1 (+ hearts inside unless split), St. Patrick's Day 9.3K/0, Easter 19K/1, spring 20K/3, summer 21K/4, pumpkin 12K/1, cute Halloween 8K/3 — each live ≥ 6 weeks before its season | planned |
| **v5.D** | expand batch | mandala 20K/2, coloring pages for girls 19K/5, for teens 12K/4, kawaii 11K/2, heart 10K/0, cozy 8.3K/0, food 7.6K/0 (+ ice cream 7.5K/0 inside unless split), flower 6.6K/1 | planned |
| **v7.A** | planning / decisions lock | URL and page (likely `/kids/photo-coloring-page/`, linked from the `/kids/` "Put your child in the story" teaser); conversion method in the browser (canvas edge detection + threshold, line-weight and detail sliders); target keywords (not yet researched — check "photo to coloring page" family before building); privacy copy ("your photo stays on your device"); what counts as done for quality (pets, toys, faces) | planned |
| **v7.B** | in-browser converter | pick or take a photo → preview as black-and-white line art → adjust detail → Print (one Letter page, same print CSS as coloring pages) or download PDF generated in the browser; no upload, no account, no server cost; works on phone and desktop | planned |

Keyword figures: Serpstat via treg, Google US, pulled 2026-11-07; US monthly
search volume / Serpstat difficulty (0–100). Single source, not cross-checked.
v2/v5 figures: Ahrefs (operator screenshots, 2026-11-08), to be refreshed in v2.A/v5.A. v3 figures pulled 2026-11-08, Serpstat; Serpstat KD-1 rows flagged as misspellings were dropped.
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
  - *Answered 2026-11-08:* v2 (urgent batch) and v5 (backlog).
- How are downloads, repeat visits, and referrals measured (GA, GSC,
  something else)?
  - *Deferred 2026-11-07:* moved to v1.F; method still open.
- What are the Etsy shop names/URLs and the physical goods store URL?
- What does "personalized activities" mean concretely, and which phase
  ships it?
  - *Partly answered 2026-11-08:* first form is photo → coloring page in the
    browser (v7). Name/picture-in-story pages still open.
