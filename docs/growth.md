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
not indexed yet. Moved to v6.C for 2027 (live by mid-October).

**What shipped:** 35 imagemill designs (7 per hub; 2 truck designs redone
because the first versions had cartoon faces too close to a TV
character), 35 single-page Letter PDFs, 5 print-all PDFs, hub + detail
pages with BreadcrumbList / CollectionPage / FAQPage / ImageObject JSON-LD,
image sitemap entries, links from `/kids/` and between related hubs; Bible
Christmas ↔ general Christmas cross-linked.

**Result:** *(fill on review day)*
**Learning:** *(fill on review day)*


## 2026-11-08 — v2.B add-on: Thanksgiving hub (fast-ranking test)

**Status:** active · **Review:** 2026-11-27 (day after Thanksgiving), then 2026-12-06 with the other v2.B hubs

**Hypothesis:** a new Thanksgiving hub can earn impressions before the holiday
(2026-11-26), even though the site isn't indexed yet. Added by the operator
after the v2.A review had deferred it ("sometimes Google ranks pages fast").

**KPI:** GSC impressions / clicks on `/kids/thanksgiving-coloring-pages/` and
its 7 design pages between deploy and 2026-11-26. Any impressions before the
holiday = test passed; zero = keep the page for 2027 and judge it then.

**Target:** thanksgiving coloring pages — Ahrefs 27K / KD 2 (operator), Serpstat 40.5K / KD 17.
**Gap seen (DataForSEO top 10, 2026-11-08):** mid-size blogs (DLTK, honeyandlime,
thebestideasforkids, hessunacademy, Monday Mandala, a Yahoo listicle) plus a
Pinterest pin; none sorts by age, and none has a blank "thankful tree" page.
**URL:** `/kids/thanksgiving-coloring-pages/` (7 designs, print-all PDF).

**Result:** *(fill on review day)*
**Learning:** *(fill on review day)*


## 2026-11-09 — Image sitemap submitted to GSC

**Status:** active · **Review:** 2026-12-07

**Hypothesis:** submitting `image-sitemap.xml` directly in GSC (it was only
declared in robots.txt) gets coloring-page images indexed sooner and earns
Google Images impressions — the search surface parents browse for printables.

**KPI:** GSC image-search impressions (`type=image`) for the site; image
sitemap fetched with 0 errors.

**Baseline (2026-11-09):** 0 impressions / 0 clicks (28d, web); image search
not yet measured. `sitemap-index.xml` in GSC: 68 submitted / 0 indexed (last
fetched 2026-11-07; live sitemap now has 78 URLs). URL inspection: 6 of 10
sampled URLs indexed.

**What was done:** `uv run portfolio settings gsc submit-sitemap --site
lamill.store --url https://lamill.store/image-sitemap.xml` → submitted
(63 images), pending first fetch.

**Result:** *(fill on review day)*
**Learning:** *(fill on review day)*


## 2026-11-10 — Index snapshot: 76/78 indexed, 0 impressions

**Status:** shipped (reviewed 2026-11-20) · **Review:** 2026-11-17 (first-impressions check), then with the 2026-12-06 v2.B review

**Hypothesis:** now that 76 of 78 sitemap URLs are indexed, the first GSC
impressions (web or image) appear within 7 days, without any new content,
links or resubmission.

**KPI:** any non-zero GSC impressions (`type=web` or `type=image`) for the
site by 2026-11-17; the 2 pending URLs indexed by then.

**Baseline (2026-11-10):**
- URL inspection of all 78 sitemap URLs: 76 "Submitted and indexed" (PASS),
  all first crawled 2026-11-10 between ~00:09 and 05:03 UTC.
- 2 "Discovered – currently not indexed" (never crawled):
  `/kids/dragon-coloring-pages/dragon-campfire/`,
  `/kids/winter-coloring-pages/polar-bear-and-cub/` — siblings on the same
  template are indexed, so read as crawl queue, not quality.
- GSC performance 2026-11-07 → 2026-11-10 (`dataState=all`): 0 impressions,
  0 clicks, both web and image.
- Ahrefs Domain Rating: 0 (no referring domains).
- Sitemaps: `sitemap-index.xml` (GSC reports 68 submitted vs 78 live — cause
  unknown) and `image-sitemap.xml` (63 pages / 63 images), both fetched
  2026-11-10 with 0 errors.

**Why 0 impressions (working read, not verified):** indexed < 1 day; DR 0
puts new pages below the viewed results even for KD-0 terms; no branded
searches; GSC lags ~2 days. The crawl batch started ~00:09 UTC, before the
image sitemap submission (01:29 UTC), so the fast indexing can't be credited
to that submission.

**Result (reviewed 2026-11-20, 3 days late):** hypothesis passed. GSC 28d to
2026-11-20 (`dataState=all`): web 38 impressions / 0 clicks across 23 URLs;
image ~50 impressions / 0 clicks, almost all on `/kids/bible-coloring-pages/noahs-ark/`.
Both pending URLs now "Submitted and indexed" (dragon-campfire crawled
2026-11-13, polar-bear-and-cub 2026-11-11). Visible queries are long-tail,
one scene each ("coloring page of jesus calming the storm", "puppy coloring
pages pdf", "pumpkin pie coloring sheet"), positions 35–100. Best web URL
was a PDF: `/printables/the-angel-visits-mary.pdf`, 28 impressions, pos 6.4.
Image queries use "simple / outline / easy drawing" wording.
**Learning:** first impressions arrive without links or resubmission, but only
for single-design long-tail queries and PDFs. No hub head term shows yet (DR 0).
Follow-ups: v1.G (PDFs link back) and image-search alt wording — see the
2026-11-20 entry.


## 2026-11-20 — v1.G PDFs link back + image-search alt wording

**Status:** active · **Review:** 2026-12-18 (28 d after deploy)

**Hypothesis:** (1) PDFs rank on their own (the best web URL was a PDF at
pos 6.4), so a titled PDF with a clickable "lamill.store" footer turns PDF
impressions into site visits. (2) Alt text in searchers' words ("coloring page
for kids", "simple" for easy designs, "outline") lifts Google Images impressions
beyond the Noah's Ark page.

**KPI:** (1) GA4 sessions with `utm_source=pdf`; GSC clicks on `/printables/*.pdf`.
(2) GSC image impressions (`type=image`) and number of distinct pages with
image impressions.

**Baseline (28d to 2026-11-20):** PDF clicks 0; `utm_source=pdf` sessions 0
(the link didn't exist); image ~50 impressions on 3 pages (≈48 on Noah's Ark).

**Action:** all 73 PDFs rebuilt with footer, clickable link to the design's
page (`?utm_source=pdf&utm_medium=link`) and Title/Subject/Author metadata;
alt text and ImageObject `description` regenerated from `designAlt()` /
`printableAlt()` on every coloring image. No image files renamed.

**Result:** *(fill on review day)*
**Learning:** *(fill on review day)*


## 2026-11-20 — v1.E Bible sub-hubs: verses, preschool, characters, books of the Bible

**Status:** active · **Review:** 2026-12-18 (28 d after deploy)

**Hypothesis:** four Bible sub-hubs (6 pages each + print-all PDF) earn impressions on
long-tail queries the main Bible hub can't rank for: verse, character and
books-of-the-Bible searches, where the US top 10 is mostly adult verse art, charts,
Pinterest pins and paid Etsy packs.

**KPI:** GSC impressions + clicks for the 4 hub URLs and 24 detail URLs; image
impressions on the new pages; print-all downloads per set (v1.F `/api/stats`, action
`print-all`).

**Baseline (2026-11-20):** 0 impressions / 0 clicks (URLs new).

**Volumes:** Google Ads US monthly via DataForSEO (treg, 2026-11-20); no KD
(Serpstat and SE Ranking were out of capacity on treg).

| Hub | Target | US / mo | Live US top 10 (2026-11-20) |
|---|---|---|---|
| `/kids/bible-coloring-pages/verses/` | bible verse coloring pages | 2,900 | seekingscripture, Pinterest, blog roundups, adult verse art (joditt), Etsy paid bundle — few kids' verse pages with outline letters |
| `/kids/bible-coloring-pages/preschool/` | preschool bible coloring pages | 1,000 | established ministry sites (ministryspark 52 pages, christianpreschoolprintables, ministry-to-children, kids-bible-lessons) — hardest of the four |
| `/kids/bible-coloring-pages/characters/` | per-character terms | david 590, joseph's coat 480, esther 390, abraham 320, ruth & naomi 210, paul & silas 90 | "david coloring page": Pinterest ×2, Etsy, David & Goliath pages — king David with harp is open |
| `/kids/bible-coloring-pages/books-of-the-bible/` | books of the bible printable / coloring pages | 1,000 / 480 | charts and lists (answeredfaith, radiantpearl), Pinterest ×4, Etsy — almost no colorable versions |

Hub term "bible character coloring pages" is only 70/mo, so characters were chosen
by individual name volume. Higher-volume verse topics not yet built: fruit of the
spirit 1,900 (one page shipped), armor of god 880 (one page shipped).

**What shipped:** 24 imagemill images ($0.26). Verse and books pages are composed:
the picture is generated and the words are set in code (`scripts/typeset_pages.py`,
Baloo 2). Verses use the WEB with "the LORD" for "Yahweh". Also: 24 detail pages,
4 hubs, 28 PDFs (24 singles + 4 print-all), `public/image-sitemap-text.xml` for the
12 composed images, and links from `/kids/` and the main Bible hub.

**Result:** *(fill on review day)*
**Learning:** *(fill on review day)*


## 2026-11-21 — v2.D validation: princesses, musical instruments, ballet, flowers

**Status:** active (evidence for v2.E) · **Review:** with the v2.E hubs, 28 d after deploy

**Data:** Google Ads US monthly volume via DataForSEO; DataForSEO Labs KD; live US top
10 via treg (2026-11-21); total ≈ $0.11. DataForSEO KD came back 0–5 for every term,
including 40K+ head terms, so it does not separate these themes. The decision rests on
the top 10, not on KD.

| Hub (final URL) | Target | US / mo | Long tail inside | Live US top 10 | Gap we can beat | Verdict |
|---|---|---|---|---|---|---|
| `/kids/princess-coloring-pages/` | princess coloring pages | 40,500 (printable 5,400) | castle 590, unicorn princess 390 | Crayola Disney #1, Disney PDF #3, littlecolorables (Disney names), mondaymandala 500 pages, yaycoloringpages, Pinterest, Etsy | intent is largely Disney, which we can't serve; original-princess results do rank (mondaymandala, yay). No age-sorted kids' set. Realistic target is the long tail (castle, unicorn princess, princess and dragon), not the head term at DR 0 | keep, long-tail focus |
| `/kids/musical-instrument-coloring-pages/` | music coloring pages / musical instruments coloring pages | 2,400 / 880 | guitar 1,600, music notes 880, piano 590, violin 480, drum 390, electric guitar 320, trumpet 210 | Crayola music & dance, Pinterest, mondaymandala 49, preschoolplayandlearn 47 instruments, thecolor (online), a paid 151-page bundle, first-school, Crate & Barrel, Etsy | kids' set sorted by age with one instrument per page plus a band scene. "Guitar coloring page" has its own dedicated collections (mondaymandala 30, colorconfetti 30, iheartcraftythings 50), so a separate guitar hub would be justified later. One hub per operator 2026-11-21 | keep |
| `/kids/ballerina-coloring-pages/` | ballerina / ballet coloring pages (one cluster) | 6,600 | dance 1,600, ballet shoes 170 | homemade-gifts, mondaymandala 37, Pinterest, coloring.ws (cute), Vecteezy stock, thecolor (online), YouTube | Google's related searches show unmet asks: "black ballerina", "boy ballerina", "easy ballerina". Set includes a boy dancer and dancers with different hair and features, sorted easy to detailed | keep — strongest gap |
| `/kids/flower-coloring-pages/` | flower coloring pages | 60,500 (seasonal peak 90,500 Apr–May) | rose 3,600, sunflower 1,900, tulip 1,900 (spring), daisy 1,300, easy flower 1,000 | Crayola adult flowers #1, abcmouse 200+, mondaymandala 66, Pinterest ×2, Crayola plants, Adobe Stock, homemade-gifts 100+ | head term held by big sites. Named-flower detail pages (rose, sunflower, tulip, daisy) are the realistic entry. Live by spring 2027 for the peak | keep, named-flower focus |

URL choice: "ballerina coloring page(s)" and "ballet coloring pages" share one cluster
volume (6,600). Ballerina is the phrasing people type and matches the top results, so
the hub is `/kids/ballerina-coloring-pages/` (PRD candidate was `ballet`). Flowers
also appear in v6.D, which was left unchanged (operator 2026-11-21).

**Result:** *(fill on review day)*
**Learning:** *(fill on review day)*


## 2026-11-21 — v2.E: princess, musical instrument, ballerina, flower hubs

**Status:** active · **Review:** 2026-12-19 (28 d after deploy)

**Hypothesis:** the four v2.D hubs earn impressions first on their long tail
(named flowers, guitar/piano/violin, unicorn princess and princess castle, boy and
curly-hair ballerina pages), not the head terms. The ballerina hub moves first,
because the v2.D top 10 left its related searches unanswered.

**KPI:** GSC impressions + clicks per hub and per design URL; image impressions;
`print-all` and `pdf` downloads per hub in `/api/stats`.

**Baseline (2026-11-21):** 0 impressions / 0 clicks (URLs new). Evidence and target
volumes are in the 2026-11-21 v2.D entry.

**What shipped:** 28 imagemill designs ($0.31), 7 per hub sorted easy → detailed;
28 PDFs + 4 print-all PDFs; hub + detail pages with the same schema as v2.B; links
from `/kids/` and the homepage. The sitewide descriptions now list the new themes.

**Result:** *(fill on review day)*
**Learning:** *(fill on review day)*
