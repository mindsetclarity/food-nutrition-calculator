# Traffic growth strategy (Nov 2026 – Mar 2027)

**Rule:** traffic growth comes first. Every change below says how it gains traffic; any
change that could lose traffic is checked before it ships (see "Guardrails").

## Where we stand (2026-11-20)

- 1,018 food pages back live and indexable since today (they were noindexed on Oct 23,
  removed on Nov 13, and served 410 from Nov 18). Sitemap: 1,139 URLs. Recovery takes
  2–6 weeks as Google recrawls.
- 35 Learn articles, 13 calculators, 17 category charts, 45 curated comparisons.
- Food pages are ~1,000 words with search-intent titles ("Calories in Bacon | 37 kcal per
  1 medium slice"), computed FAQs and FAQ schema. 75 have a hand-written note.
- Audience: US/UK/CA/AU first, India second.
- **Gaps found:** no brand or restaurant items (Big Mac, Starbucks, Chipotle), no
  cheddar cheese, no UK Christmas staples (Yorkshire pudding, roast potatoes, pigs in
  blankets, Christmas pudding), no Search Console data in our hands yet.

## The calendar drives the order

| Window | Why it matters | Must be indexed by |
|---|---|---|
| Thanksgiving (Nov 26) | Article is live; too late for big gains | done |
| Christmas (Dec 1–25) | "christmas dinner calories", "mince pie calories" peak, UK-heavy | **Dec 5** |
| **New Year diet season (Dec 28 – Feb 15)** | The year's biggest peak for calorie and weight-loss searches: deficit, TDEE, "how many calories should I eat", calorie counting | **Dec 15** |
| Spring (Mar–Apr) | "summer body", protein, macros | Mar 1 |

Google needs 1–3 weeks to index and rank a new or updated page, so January content must
ship by mid-December.

## Phase 1: recover what we had (now – Nov 30)

| # | Action | Who | Traffic effect |
|---|---|---|---|
| 1 | Search Console: resubmit `sitemap.xml`; Request indexing for the top 10 food pages and the Thanksgiving article | Owner | Speeds up re-indexing of 1,018 pages that served 410 for 2 days |
| 2 | Bing Webmaster Tools: import the site from Search Console | Owner, 5 min | Bing + DuckDuckGo + ChatGPT search use Bing's index: extra 5–10% |
| 3 | Export Search Console Performance (last 6 months, by page and query) and share it | Owner | Turns every later step from guesswork into data |
| 4 | Watch Pages → "Not indexed" weekly; if food pages sit in "Crawled – not indexed" after 3 weeks, give those categories notes first | Both | Catches a quality problem early |

## Phase 2: seasonal content (Nov 21 – Dec 15)

| # | Action | Traffic effect |
|---|---|---|
| 5 | Add UK Christmas foods: roast potatoes, Yorkshire pudding, pigs in blankets, Christmas pudding, Christmas cake, stuffing balls, mulled wine, Quality Street/Celebrations-style chocolates (USDA or published labels) | Each is a searched "calories in X" page in its own right |
| 6 | Article: **Christmas dinner calories** (UK), publish by Dec 5 | Seasonal peak, UK tier-1 |
| 7 | Article: **mince pie / Christmas drinks calories** (mulled wine, eggnog, Baileys) | Low-competition seasonal long tail |
| 8 | Refresh the New Year pages by Dec 15: calorie deficit, TDEE, macro and protein calculators plus "how many calories should I eat to lose weight", "why am I not losing weight", "what is a calorie deficit". Update `updatedAt`, add a 2027 worked example, tighten titles | These already rank for something; fresher, better pages climb in the January peak |
| 9 | New: **How to lose weight in January: a realistic calorie plan** linking the deficit calculator | Captures the "new year diet" wave |

## Phase 3: grow the page count where search demand is (Dec – Feb)

| # | Action | Traffic effect |
|---|---|---|
| 10 | **Restaurant and brand items**: McDonald's, Burger King, Starbucks, Subway, Chipotle, KFC, Greggs, Pret, Costa (UK). Use each chain's published nutrition and name it as the source. Start with ~150 top items | "calories in a big mac" style searches are some of the largest in the niche, and the tier-1 audience searches brands, not generic foods |
| 11 | Fill generic gaps: cheddar and other cheeses by slice, more drinks, protein bars, frozen meals | Every missing common food is a query we can't rank for |
| 12 | Food notes on the top 200 foods by Search Console impressions (75 done) | Unique text lifts weak pages and is what AdSense wants: helps both goals |
| 13 | Continue `docs/content-plan.md` items 3–20, 2–3 per week (banana, chicken breast, pasta, potatoes, …) | Each targets a high-volume head term and links to ~10 food pages |

## Phase 4: make existing pages win more clicks (ongoing)

| # | Action | Traffic effect |
|---|---|---|
| 14 | Every 2 weeks: pages at Search Console positions 5–20 with impressions → rewrite title/description, add the missing answer, add internal links from articles | Biggest return for the effort: page 2 → page 1 can mean 10× the clicks |
| 15 | Food pages: add "per oz" and "per cup" lines where the data allows, and a UK portion line (e.g. 30 g cereal, 80 g fruit) | Matches how US and UK users search ("calories in 1 oz cheddar") |
| 16 | Internal links: every article links 5–10 food pages; every food page links its category chart and one article | Spreads ranking power to the long tail; helps crawling of 1,018 pages |
| 17 | Core Web Vitals check in Search Console; keep the app-ad video lazy and off the critical path | Ranking signal and lower bounce |

## Phase 5: authority (ongoing, owner-led)

| # | Action | Traffic effect |
|---|---|---|
| 18 | List the free tools on AlternativeTo, SaaSHub, Product Hunt; link the site from the Play Store listing | First backlinks; tool pages rank faster |
| 19 | Answer real questions on Reddit (r/loseit, r/CICO, r/nutrition) and Quora with the exact calculator or chart, not the homepage | Direct visits + links |
| 20 | Promote the embeddable recipe nutrition label to food bloggers; each embed carries a link | Scales backlinks without outreach per link |
| 21 | Pinterest pins of the category calorie charts (US audience) | Strong visual traffic source for food content |

## Guardrails (to protect traffic)

- **Never noindex, remove, rename or 410 a page that gets impressions** without checking
  Search Console first. Removed pages always 301 to the closest live page.
- Keep URL slugs stable; renamed foods get a redirect in `astro.config.mjs`.
- Every SEO, routing, nav or content change states its traffic effect in the plan and
  the commit message.
- AdSense: improve quality by **adding** notes and depth, not by removing pages.

## How we measure

| Metric | Source | Target by Feb 28, 2027 |
|---|---|---|
| Clicks per week | Search Console | Back to the pre-Oct 23 level by Dec 31, then 2× by Feb 28 |
| Indexed pages | Search Console → Pages | 1,100+ |
| Pages with ≥1 click/week | Search Console | Up every month |
| Top-10 queries | Search Console | 50+ |

Targets get firm numbers once the Phase 1 Search Console export is in.

## Weekly rhythm

- **Mon:** Search Console check (indexing, top movers, positions 5–20 list).
- **Tue–Thu:** 2–3 articles or 30–50 new foods, plus one page-2 rewrite.
- **Fri:** deploy, request indexing for new pages, one authority action.
