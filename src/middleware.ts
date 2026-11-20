import type { MiddlewareHandler } from 'astro';
import { removedPageRedirect } from './lib/seo/removedPageRedirect';

// public/_headers only applies to static asset responses on Cloudflare Workers.
// Worker-rendered pages (everything under output: 'server') need these set here.
const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
};

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();

  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    if (!response.headers.has(name)) response.headers.set(name, value);
  }

  // The 3,326 thin food/compare pages were removed for good. Ones for a known food 301 to a
  // live page with the same data so their visitors aren't lost; the rest get 410 so Google
  // drops them faster than a 404 (the body is still the normal 404 page).
  if (response.status === 404 && /^\/(foods|compare)\//.test(context.url.pathname)) {
    const to = removedPageRedirect(context.url.pathname);
    if (to) return context.redirect(to + (to.includes('?') ? '' : context.url.search), 301);
    return new Response(response.body, { status: 410, statusText: 'Gone', headers: response.headers });
  }

  if (context.url.pathname.startsWith('/api/')) {
    response.headers.set('X-Robots-Tag', 'noindex');
  }

  return response;
};
