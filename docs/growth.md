# Growth Log — lamill.store

> **What this file is for:** an honest, append-only log of growth experiments
> on this site — what was tried, what was measured, what happened. The data
> source is GSC; this file narrates *why*. Future-you (or future-Claude)
> reads this when deciding what to try next, both on this site and on
> related sister sites.

## How to use this (workflow — re-read this when you forget)

**Add an entry whenever you do something growth-relevant.** That includes:
shipping new content, structural SEO changes (sitemap, schema, redirects,
internal linking), tech changes that affect crawl/indexing, marketing
pushes, backlink campaigns. *Not* every code commit — just things you'd
want to point at when GSC numbers move (or fail to).

**Each entry is a hypothesis you can be wrong about.** Commit to a
measurable KPI and an observation window before acting — otherwise "did
this work?" is just a feeling.

### Lifecycle of one entry

1. **Day of action** — append a new dated H2 with `Status: active`, the
   hypothesis, the KPI you'll watch, current baseline numbers, what you
   did, and the date to review (default: today + 28 days, matching GSC's
   reporting window).
2. **Review day** — pull current GSC numbers, compute delta vs baseline.
   Fill in **Result** and **Learning**. Set **Status** to `shipped` (worked,
   keep going), `failed` (didn't pay off, abandon), or extend the review
   another window if results are ambiguous.
3. **Never rewrite older entries.** Wrong hypotheses are the most valuable
   data — they tell you what NOT to repeat on the next site. Append, don't
   edit.

### Where to get the numbers

```bash
cd ~/work/projects/sites/portfolio && make run ARGS="gsc sync"
```

Then read the row for `lamill.store`. Or pull from
https://search.google.com/search-console directly.

### Format

```
## YYYY-MM-DD — <one-line hypothesis or action>
- **Status:** active | testing | shipped | failed | abandoned
- **Hypothesis:** <what you're betting will work — only on initial / new-bet entries>
- **KPI:** <what GSC metric / query / page>
- **Baseline:** <numbers at start>
- **Action:** <what was done; 1-2 lines>
- **Result:** <numbers after window; "TBD — review YYYY-MM-DD" until then>
- **Learning:** <why it worked / didn't; what to try next; "TBD" until reviewed>
```

---

## 2026-11-07 — Free printables can attract parents through search and sharing.
- **Status:** active
- **Hypothesis:** Free printables can attract parents through search and sharing. Compare standard and personalized activities, then turn the results into a case study that shows ecommerce prospects how LaMill tests customer acquisition.
- **KPI:** any GSC traffic — clicks, impressions, indexed-page count
- **Baseline:** 0 clicks / 0 impressions (just deployed)
- **Action:** project scaffolded via `portfolio new bootstrap`; first deploy pending. After deploy: verify in GSC as `sc-domain:lamill.store` and submit the sitemap.
- **Result:** TBD — review 2026-12-05
- **Learning:** TBD

## 2026-11-08 — v2.B: five everyday/seasonal coloring hubs

**Status:** active · **Review:** 2026-12-06 (28 d after deploy; extend if not yet indexed)

**Hypothesis:** dedicated kids' coloring hubs with 7 original designs sorted
easy → detailed, a PDF per design and a print-all PDF, beat the thin or
off-intent results in each US top 10 and earn impressions within one window.

**KPI:** GSC impressions + clicks per hub URL (and its design pages);
downloads per collection once v1.F measurement exists (not tracked yet —
operator chose to ship without analytics, 2026-11-08).

**Baseline:** 0 impressions / 0 clicks (URLs new). Site-wide: Google still
lists `/` as "unknown to Google" and `/kids/` as "discovered – not indexed".

**Volumes:** Ahrefs (operator screenshots) vs Serpstat (treg, 2026-11-08),
US monthly SV / KD. The two disagree on KD by 15–50 points (different
scales); Serpstat's dog/dragon volumes (50 / 10) look broken. Ahrefs API
units were exhausted, so no third read.

| Hub (final URL) | Target keyword | Ahrefs SV/KD | Serpstat SV/KD | Gap seen in live US top 10 (DataForSEO, 2026-11-08) |
|---|---|---|---|---|
| `/kids/christmas-coloring-pages/` | cute christmas coloring pages (+ christmas coloring pages 135K/27 Serpstat) | 9.9K / 6 | 12.1K / 37 | Adobe Stock, 2 Pinterest pins, a paid PDF pack (mycoloringzone), posts dated 2020–2021 (designdazzle, Hallmark), Crayola category page |
| `/kids/winter-coloring-pages/` | winter coloring pages | 19K / 3 | 27.1K / 26 | #1 is a single Crayola page; Adobe Stock; 2 Pinterest pins; color-online widget; an adults-only set (woojr) — no kids' set sorted by age |
| `/kids/dog-coloring-pages/` | dog coloring pages (+ puppy 8K/0 inside) | 22K / 0 | 50* / 59 | 3 Pinterest pins, Shutterstock, color-online widget, single Crayola page. Puppy SERP shares results with dog (same 75-dog pin, homemade-gifts) → kept inside Dogs |
| `/kids/dragon-coloring-pages/` | dragon coloring pages | 21K / 0 | 10* / 52 | 5 of 8 results are Pinterest pins, an Etsy listing or an eBay listing |
| `/kids/monster-truck-coloring-pages/` | monster truck coloring pages | 8K / 0 | 22.2K / 37 | Narrower gap: dedicated sites with 36–50 PDFs (2xmonstertrucks, funcolorprints); several push branded trucks. Our angle: brand-free originals, levels, one print-all PDF |

\* Serpstat volume looks wrong for these two head terms.

**Not built:** Thanksgiving coloring pages (27K / 2 Ahrefs, 40.5K / 17
Serpstat) — Thanksgiving is 2026-11-26, 18 days out, on a site Google has
not indexed yet. Moved to v5.C for 2027 (live by mid-October).

**What shipped:** 35 imagemill designs (7 per hub; 2 truck designs redone
because the first versions had cartoon faces too close to a TV
character), 35 single-page Letter PDFs, 5 print-all PDFs, hub + detail
pages with BreadcrumbList / CollectionPage / FAQPage / ImageObject JSON-LD,
image sitemap entries, links from `/kids/` and between related hubs; Bible
Christmas ↔ general Christmas cross-linked.

**Result:** *(fill on review day)*
**Learning:** *(fill on review day)*

