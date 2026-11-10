# Post-Launch TODOs

These items are intentionally deferred until after the initial MVP launch:

- Connect domain (`foodnutritioncalculator.com`).
- Configure Vercel env variables with real production keys.
- Verify production API routes.
- Submit sitemap to search engines (Google Search Console).
- Add privacy-reviewed analytics later.
- Expand food database.
- Expand Learn articles.
- Add user feedback mechanism.
- Add monitoring/error logging after privacy review.
- Consider saved meals/accounts later.
- Improve USDA matching relevance.
- Add brand-specific foods later.

## Dated

- **2026-12-10: remove the temporary cleanup sitemap.** Delete `src/lib/seo/cleanupSitemap.ts`, `src/pages/sitemap-cleanup.xml.ts`, `scripts/test-cleanup-sitemap.mjs` (and its `prebuild` and `test:cleanup-sitemap` entries), and its line in `public/robots.txt`, then remove it under Sitemaps in Search Console. It only exists to get Google to recrawl and drop the thin pages that are now noindex.
