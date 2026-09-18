/**
 * Internal link checker.
 *
 * Crawls every internal link reachable from the homepage, plus every URL in
 * the sitemap, and reports any that do not return 200.
 *
 * This exists because the foods directory once built its hrefs by slugifying
 * the food name instead of reading the food's slug, so "Almonds" linked to
 * /foods/almonds while the page was /foods/almond. Most of the directory
 * pointed at 404s and nothing caught it: the build succeeded, every page
 * rendered, and the sitemap (which used the real slug) stayed correct.
 *
 * Needs a running server, since routes like /about are rendered on demand and
 * have no file in dist/:
 *
 *   npm run dev            # in one shell
 *   npm run check:links    # in another
 *
 * Override the target with BASE_URL=https://example.com npm run check:links
 */

const BASE = (process.env.BASE_URL || 'http://localhost:4321').replace(/\/$/, '');
const MAX_PAGES = Number(process.env.MAX_PAGES || 500);

const status = new Map(); // path -> status code
const linkedFrom = new Map(); // path -> Set of pages linking to it

async function head(path) {
  if (status.has(path)) return status.get(path);
  let code = 0;
  try {
    const res = await fetch(BASE + path, { redirect: 'manual' });
    code = res.status;
  } catch (err) {
    code = `ERR:${err.message.slice(0, 40)}`;
  }
  status.set(path, code);
  return code;
}

function internalLinks(html) {
  const out = new Set();
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const clean = href.split('#')[0].split('?')[0];
    if (clean) out.add(clean);
  }
  return out;
}

const queue = ['/'];
const crawled = new Set();

// Seed from the sitemap too, so orphaned-but-indexed pages are covered.
try {
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (res.ok) {
    const xml = await res.text();
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      try {
        queue.push(new URL(m[1]).pathname);
      } catch {
        /* ignore malformed loc */
      }
    }
  }
} catch {
  console.warn('could not read sitemap.xml; crawling from / only');
}

while (queue.length && crawled.size < MAX_PAGES) {
  const path = queue.shift();
  if (crawled.has(path)) continue;
  crawled.add(path);

  const code = await head(path);
  if (code !== 200) continue;

  let html = '';
  try {
    html = await (await fetch(BASE + path)).text();
  } catch {
    continue;
  }

  for (const link of internalLinks(html)) {
    if (!linkedFrom.has(link)) linkedFrom.set(link, new Set());
    linkedFrom.get(link).add(path);
    if (!crawled.has(link) && !queue.includes(link)) queue.push(link);
  }
}

// Check every link target, including ones we never crawled into.
for (const target of linkedFrom.keys()) await head(target);

const broken = [...linkedFrom.keys()]
  .filter((p) => status.get(p) !== 200)
  .sort();

if (broken.length) {
  console.error(`\nBROKEN INTERNAL LINKS: ${broken.length}\n`);
  for (const p of broken) {
    const sources = [...linkedFrom.get(p)].slice(0, 3);
    console.error(`  ${status.get(p)}  ${p}`);
    console.error(`        linked from: ${sources.join(', ')}`);
  }
  process.exit(1);
}

console.log(
  `link check passed (${crawled.size} pages crawled, ${linkedFrom.size} link targets, 0 broken)`,
);
