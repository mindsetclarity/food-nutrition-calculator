import type { APIRoute } from 'astro';
import { CLEANUP_LASTMOD, getCleanupPaths } from '../lib/seo/cleanupSitemap';
import { siteConfig } from '../lib/seo/siteConfig';

// Temporary: see src/lib/seo/cleanupSitemap.ts.
export const prerender = true;

export const GET: APIRoute = () => {
  const urls = getCleanupPaths()
    .map(path => `  <url>\n    <loc>${siteConfig.siteUrl}${path}</loc>\n    <lastmod>${CLEANUP_LASTMOD}</lastmod>\n  </url>\n`)
    .join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml' },
  });
};
