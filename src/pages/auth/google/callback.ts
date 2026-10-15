import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { safeEqual } from '../../../lib/community/crypto';
import {
  exchangeGoogleCode,
  findOrCreateGoogleUser,
  googleRedirectUri,
  oauthStateCookie,
  OAUTH_STATE_COOKIE,
  parseOauthState,
} from '../../../lib/community/google';
import { createSession, sessionCookie } from '../../../lib/community/sessions';

export const prerender = false;

export const GET: APIRoute = async ({ url, site, cookies }) => {
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) return new Response('Not found', { status: 404 });
  const { state, age } = parseOauthState(cookies.get(OAUTH_STATE_COOKIE)?.value);
  const back = (location: string, ...cookie: string[]) => {
    const headers = new Headers({ Location: location });
    for (const c of [oauthStateCookie(null), ...cookie]) headers.append('Set-Cookie', c);
    return new Response(null, { status: 303, headers });
  };

  const code = url.searchParams.get('code');
  if (!state || !code || !safeEqual(state, url.searchParams.get('state') ?? '')) return back('/login?error=google');

  const profile = await exchangeGoogleCode(
    code,
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    googleRedirectUri(site, url.origin, import.meta.env.DEV),
  );
  if (!profile) return back('/login?error=google');

  const result = await findOrCreateGoogleUser(env.DB, { ...profile, ageConfirmed: age });
  if (!result.ok) return back(result.error === 'age' ? '/signup?error=age' : `/login?error=${result.error === 'email_unverified' ? 'google_unverified' : 'email_in_use'}`);

  const token = await createSession(env.DB, result.user.id);
  return back(result.user.username ? '/account' : '/welcome', sessionCookie(token));
};
