import type { APIRoute } from 'astro';
import { getAllFoodPages } from '../lib/foods';
import { getAllLearnArticles } from '../lib/learn';
import { siteConfig } from '../lib/seo/siteConfig';

function generateUrlElement(url: string, priority?: string, changefreq?: string) {
  let xml = `  <url>\n    <loc>${url}</loc>\n`;
  if (changefreq) xml += `    <changefreq>${changefreq}</changefreq>\n`;
  if (priority) xml += `    <priority>${priority}</priority>\n`;
  xml += `  </url>\n`;
  return xml;
}

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ? site.origin : siteConfig.siteUrl;

  const staticRoutes = [
    { path: '', priority: '1.0', changefreq: 'weekly' },
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

  for (const article of articles) {
    sitemap += generateUrlElement(`${baseUrl}/learn/${article.slug}`, '0.7', 'monthly');
  }

  sitemap += `</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
