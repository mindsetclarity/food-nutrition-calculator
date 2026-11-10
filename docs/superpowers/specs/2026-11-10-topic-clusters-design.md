# Topic clusters: related blocks

## Why
Calculator and food chart pages link to no articles, and articles link to no charts. Linking pages on the same topic helps Google see what belongs together (faster indexing of new pages, stronger topic signals for AdSense review) and keeps readers on the site.

## Goals / non-goals
- Goal: every calculator, article and chart page shows a "Related" block of same-topic pages.
- Non-goal: topic hub pages (approach B). Revisit after indexing improves.
- Anti-goal: thin or spammy link lists. Blocks stay small (at most about 7 links) and on-topic.

## Approaches
- **A. Related blocks from one cluster map (chosen).** One data file, one component, used by all three page types.
- B. A plus five hub pages. Rejected for now: hubs need real written content or they become thin pages.
- C. Hand-picked links per page. Rejected: 60+ lists to maintain, drift as pages are added.

## Design
- `src/data/topicClusters.ts`: five clusters (Weight loss and energy, Protein and macros, Body measurements, Labels and tracking, Meals and eating out). Each lists tool paths, article slugs and chart slugs. A page may be in more than one cluster.
- `getRelated(kind, id)`: collects members of the page's clusters, minus itself; up to 2 tools, 3 articles, 2 charts. The list is rotated by the page's position in its cluster so links spread evenly instead of everyone linking to the first members.
- Article pages already show related articles and one tool, so their block shows only tools and charts, skipping the tool already in the article's CTA.
- `RelatedLinks.astro`: titled "Related tools and guides", grouped by type, plain links. Added to `ToolPage`, the four older calculator pages (TDEE, macro, deficit, protein), calculator, meal, recipe, compare and label pages, `LearnArticleLayout`, and the category page.
- Test `scripts/test-topic-clusters.mjs` in `prebuild`: every slug and path exists; every tool page, article and indexed chart is in at least one cluster; no page links to itself; block limits hold.

## Left to the builder
Exact cluster membership (draft in the conversation), titles shown for each link (taken from existing data: article titles, chart headings, a small tool-name map).
