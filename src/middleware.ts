import type { MiddlewareHandler } from 'astro';
import { env } from 'cloudflare:workers';
import { getSessionUserSafe, isSameOriginPost } from './lib/community/sessions';

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
  context.locals.user = null;
  let blocked: Response | null = null;

  if (!context.isPrerendered) {
    // /api/referral/ is server-to-server (Bearer auth), so it has no browser Origin.
    if (
      !context.url.pathname.startsWith('/api/referral/') &&
      !isSameOriginPost(context.request, context.url.origin)
    ) {
      blocked = new Response('Forbidden', { status: 403 });
    }

    const token = blocked ? undefined : context.cookies.get('fnc_session')?.value;
    if (token) context.locals.user = await getSessionUserSafe(env.DB, token);
  }

  const response = blocked ?? (await next());

  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    if (!response.headers.has(name)) response.headers.set(name, value);
  }

  if (context.url.pathname.startsWith('/api/')) {
    response.headers.set('X-Robots-Tag', 'noindex');
  }

  return response;
};
