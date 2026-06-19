import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const robotsTxt = `
User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${site ? site.origin : 'https://foodnutritioncalculator.com'}/sitemap.xml
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
