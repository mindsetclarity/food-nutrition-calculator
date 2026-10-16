import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { TOPICS } from '../lib/community/db';
import { postUrl } from '../lib/community/posts';
import { getAllFoodPages } from '../lib/foods';
import { getAllLearnArticles } from '../lib/learn';
import { getAllComparePairs } from '../lib/compare/comparePairs';
import { siteConfig } from '../lib/seo/siteConfig';

function generateUrlElement(url: string, priority?: string, changefreq?: string) {
  let xml = `  <url>\n    <loc>${url}</loc>\n`;
  if (changefreq) xml += `    <changefreq>${changefreq}</changefreq>\n`;
  if (priority) xml += `    <priority>${priority}</priority>\n`;
  xml += `  </url>\n`;
  return xml;
}

export const prerender = false;

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ? site.origin : siteConfig.siteUrl;

  const staticRoutes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/calculator', priority: '0.9', changefreq: 'weekly' },
    { path: '/recipe-nutrition-calculator', priority: '0.9', changefreq: 'weekly' },
    { path: '/compare-foods', priority: '0.9', changefreq: 'weekly' },
    { path: '/meal-calorie-calculator', priority: '0.9', changefreq: 'weekly' },
    { path: '/foods', priority: '0.8', changefreq: 'weekly' },
    { path: '/learn', priority: '0.8', changefreq: 'weekly' },
    { path: '/about', priority: '0.5', changefreq: 'monthly' },
    { path: '/contact', priority: '0.8', changefreq: 'monthly' },
    { path: '/methodology', priority: '0.6', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
    { path: '/terms', priority: '0.5', changefreq: 'monthly' },
    { path: '/disclaimer', priority: '0.5', changefreq: 'monthly' },
    { path: '/data-sources', priority: '0.6', changefreq: 'monthly' },
    { path: '/community', priority: '0.6', changefreq: 'daily' },
    ...TOPICS.filter((t) => t.indexable).map((t) => ({ path: `/community/${t.slug}`, priority: '0.6', changefreq: 'daily' })),
  ];

  const foods = getAllFoodPages();
  const articles = getAllLearnArticles();

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const route of staticRoutes) {
    sitemap += generateUrlElement(`${baseUrl}${route.path}`, route.priority, route.changefreq);
  }

  for (const food of foods) {
    sitemap += generateUrlElement(`${baseUrl}/foods/${food.slug}`, '0.7', 'monthly');
  }

  for (const pair of getAllComparePairs()) {
    sitemap += generateUrlElement(`${baseUrl}/compare/${pair.slug}`, '0.6', 'monthly');
  }

  for (const article of articles) {
    sitemap += generateUrlElement(`${baseUrl}/learn/${article.slug}`, '0.7', 'monthly');
  }

  // Community posts: a D1 failure must not take the rest of the sitemap down.
  try {
    const slugs = TOPICS.filter((t) => t.indexable).map((t) => t.slug);
    const { results } = await env.DB
      .prepare(
        `SELECT p.id, p.topic, p.slug FROM posts p JOIN users u ON u.id = p.user_id
         WHERE p.deleted_at IS NULL AND u.is_banned = 0 AND p.topic IN (${slugs.map(() => '?').join(',')})
         ORDER BY p.created_at DESC, p.id DESC LIMIT 5000`,
      )
      .bind(...slugs)
      .all<{ id: number; topic: string; slug: string }>();
    for (const p of results) sitemap += generateUrlElement(`${baseUrl}${postUrl(p)}`, '0.5', 'weekly');
  } catch (e) {
    console.error('sitemap: community posts skipped', e);
  }

  sitemap += `</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
