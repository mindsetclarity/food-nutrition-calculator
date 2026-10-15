import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { safeEqual } from './crypto';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

/** Shared shell for the Bhaskar endpoints: POST only, bearer secret, rate limit, JSON body. */
export function referralEndpoint(run: (code: unknown) => Promise<unknown>): APIRoute {
  return async ({ request }) => {
    const secret = env.BHASKAR_API_SECRET;
    const auth = request.headers.get('Authorization') ?? '';
    if (!secret || !safeEqual(auth, `Bearer ${secret}`)) return json({ error: 'unauthorized' }, 401);

    const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    const limit = await env.REFERRAL_LIMITER?.limit({ key: ip });
    if (limit && !limit.success) return json({ error: 'rate_limited' }, 429);

    let body: { code?: unknown };
    try {
      body = await request.json();
    } catch {
      return json({ error: 'bad_request' }, 400);
    }
    if (!body || typeof body !== 'object') return json({ error: 'bad_request' }, 400);
    return json(await run(body.code));
  };
}

export const methodNotAllowed: APIRoute = () =>
  new Response(JSON.stringify({ error: 'method_not_allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', Allow: 'POST' },
  });
