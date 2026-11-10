/**
 * Guards the topic clusters behind the "Related tools and guides" blocks.
 *
 *   node --experimental-strip-types scripts/test-topic-clusters.mjs
 *
 * A renamed article, chart or tool must fail here instead of shipping a broken
 * related link, and a new page must be put in a cluster.
 */
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { readFileSync, readdirSync, existsSync } from 'node:fs';

registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith('.') && !/\.[cm]?[jt]s$/.test(spec)) {
      try { return next(spec + '.ts', ctx); } catch {}
    }
    return next(spec, ctx);
  }
});

const { TOPIC_CLUSTERS, TOOL_NAMES, PINNED, getRelated, LIMITS } = await import('../src/lib/topicClusters.ts');
const { CATEGORY_INTROS } = await import('../src/data/categoryIntros.ts');

const inCluster = (kind, id) => TOPIC_CLUSTERS.some(c => c[kind].includes(id));

// Tools: every tool page exists, has a name, and is clustered.
const toolPages = readdirSync('src/pages')
  .filter(f => /-calculator\.astro$|^calculator\.astro$|^compare-foods\.astro$|^nutrition-label-generator\.astro$/.test(f))
  .map(f => '/' + f.replace(/\.astro$/, ''));
for (const path of toolPages) assert.ok(inCluster('tools', path), `tool page not in a cluster: ${path}`);
for (const c of TOPIC_CLUSTERS) for (const path of c.tools) {
  assert.ok(existsSync(`src/pages${path}.astro`), `no page for tool ${path}`);
  assert.ok(TOOL_NAMES[path], `no TOOL_NAMES entry for ${path}`);
}

// Articles: read slugs as text, since the article index uses import.meta.glob.
const articleFiles = ['src/data/learnArticles.ts', ...readdirSync('src/data/learn').map(f => `src/data/learn/${f}`)];
const articleSlugs = new Set(articleFiles.flatMap(f => [...readFileSync(f, 'utf8').matchAll(/^\s*slug: '([^']+)'/gm)].map(m => m[1])));
assert.equal(articleSlugs.size, 34, 'expected 34 articles; update this count when adding one');
for (const slug of articleSlugs) assert.ok(inCluster('articles', slug), `article not in a cluster: ${slug}`);
for (const c of TOPIC_CLUSTERS) for (const slug of c.articles) assert.ok(articleSlugs.has(slug), `unknown article ${slug}`);

// Charts: only indexed charts (those with an intro), all clustered.
for (const slug of Object.keys(CATEGORY_INTROS)) assert.ok(inCluster('charts', slug), `chart not in a cluster: ${slug}`);
for (const c of TOPIC_CLUSTERS) for (const slug of c.charts) assert.ok(Object.hasOwn(CATEGORY_INTROS, slug), `unknown chart ${slug}`);

// Every member: no self link, no duplicates, limits hold.
const KIND = { tools: 'tool', articles: 'article', charts: 'chart' };
for (const c of TOPIC_CLUSTERS) for (const [group, kind] of Object.entries(KIND)) for (const id of c[group]) {
  const r = getRelated(kind, id);
  for (const g of Object.keys(KIND)) {
    assert.ok(!r[g].includes(id), `${id} links to itself`);
    assert.equal(new Set(r[g]).size, r[g].length, `${id} has duplicate ${g}`);
    assert.ok(r[g].length <= LIMITS[g], `${id} has too many ${g}`);
  }
  assert.ok(r.tools.length + r.articles.length + r.charts.length > 0, `${id} gets no related links`);
}

// Pins point at real pages and win the first slot.
const known = { tools: new Set(Object.keys(TOOL_NAMES)), articles: articleSlugs, charts: new Set(Object.keys(CATEGORY_INTROS)) };
for (const [id, pins] of Object.entries(PINNED)) for (const [group, ids] of Object.entries(pins)) for (const x of ids) {
  assert.ok(known[group].has(x), `PINNED ${id} → unknown ${group} ${x}`);
  assert.notEqual(x, id, `PINNED ${id} pins itself`);
}
assert.equal(getRelated('chart', 'indian-foods').articles[0], 'indian-takeaway-calories');
assert.equal(getRelated('chart', 'beverages').tools[0], '/water-intake-calculator');
assert.equal(getRelated('article', 'calories-in-fruit-lowest-to-highest').charts[0], 'fruits');
assert.deepEqual(getRelated('article', 'tdee-explained').articles, [], 'articles get no article links');
assert.deepEqual(getRelated('chart', 'fruits').charts, [], 'charts get no chart links');
assert.ok(!getRelated('tool', '/macro-calculator', ['/learn/how-much-protein-do-i-need', '/foods/category/protein-foods']).articles.includes('how-much-protein-do-i-need'), 'href skips work');
assert.ok(!getRelated('tool', '/macro-calculator', ['/foods/category/protein-foods']).charts.includes('protein-foods'), 'chart href skips work');

assert.ok(getRelated('tool', '/bmi-calculator').articles.length > 0, 'small cluster still yields articles');
assert.ok(!getRelated('article', 'tdee-explained', ['/tdee-calculator']).tools.includes('/tdee-calculator'), 'skip list honoured');
assert.notDeepEqual(getRelated('tool', '/tdee-calculator').tools, getRelated('tool', '/calorie-deficit-calculator').tools, 'rotation spreads links');
assert.notDeepEqual(getRelated('article', 'tdee-explained').charts, getRelated('article', 'what-is-a-calorie-deficit').charts, 'rotation spreads chart links across articles');
assert.deepEqual(getRelated('tool', '/not-a-page'), { tools: [], articles: [], charts: [] }, 'unknown id gives nothing');

console.log('topic clusters: ok');
