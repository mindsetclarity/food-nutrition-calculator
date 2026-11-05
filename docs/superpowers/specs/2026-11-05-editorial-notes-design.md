# Editorial notes for indexed compare and food pages

## Why
AdSense rejected the site for low-value content. Every compare and food page is built from one template, so the indexed pages read like 2,000 others. The site's goal is AdSense revenue, so indexed pages must carry text found nowhere else.

## Goals
- A hand-written note on each of the 45 indexed compare pages (150–250 words) and each of the ~75 indexed food pages (~120 words).
- Indexing follows content: a compare or food page is `index` only when it has a note. No note → `noindex, follow` and left out of the sitemap.
- Remove the Bhaskar app promo from food pages (homepage keeps it).

## Non-goals
- No new pages, no AI-generated text at runtime, no change to nutrition numbers or the calculators.
- Pages without notes stay live for visitors; only their indexing changes.

## Anti-goals
- Notes that restate the table ("banana has 89 kcal…") are the template problem again.
- Medical claims or advice. Notes give general, sourced-style guidance (USDA/NHS-level), never diagnosis or treatment.
- Any number in a note that disagrees with the page's own data.

## Approaches
- **A. Hand-written notes in data files (picked).** Unique, reviewable, cheap to serve. Cost: ~20,000 words of writing.
- B. Smarter templates: still templated; doesn't fix the rejection.
- C. Runtime AI text: per-view cost, inconsistent, same core problem.

## Design
- `src/data/compareNotes.ts`: map of pair slug → `{ summary: string; body: string[]; chooseA: string; chooseB: string }`. `summary` is the 1–2 sentence answer shown under the H1; `body` is 2–3 paragraphs (when each wins, real-world use, one practical tip); `chooseA/chooseB` are "Pick X if…" lines.
- `src/data/foodNotes.ts`: map of food slug → `{ body: string[] }` (how it's eaten, a realistic portion, what's worth knowing).
- `isIndexedComparePair` / `isIndexedFood` in `src/lib/compare/comparePairs.ts` become "has a note". The `CURATED` list still drives which pairs exist.
- Compare page: note's summary under the H1 above the existing auto summary; body + "Which should you pick?" section before the tables.
- Food page: "About {food}" section after the nutrition summary; `AppPromo` removed.
- A test script asserts every note key matches a real pair/food (a typo must fail the build, not silently noindex a page) and that every currently indexed slug has a note.

## Builder's calls
- Exact section placement and styling (reuse existing card classes).
- Writing in batches; ship once every currently indexed page has its note, so nothing drops out of Google mid-way.
- Notes written from each page's actual numbers; owner reviews the text before deploy.
