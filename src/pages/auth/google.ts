import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { randomToken } from '../../lib/community/crypto';
import { googleAuthUrl, googleRedirectUri, oauthStateCookie } from '../../lib/community/google';

export const prerender = false;

// GET (from /login: no age flag) and POST (from /signup: carries the 18+ checkbox).
const start: APIRoute = async ({ request, url, site }) => {
  if (!env.GOOGLE_CLIENT_ID) return new Response('Not found', { status: 404 });
  let age = false;
  if (request.method === 'POST') age = (await request.formData()).get('age') === '1';
  const state = randomToken();
  const redirectUri = googleRedirectUri(site, url.origin, import.meta.env.DEV);
  return new Response(null, {
    status: 302,
    headers: {
      Location: googleAuthUrl(env.GOOGLE_CLIENT_ID, redirectUri, state),
      'Set-Cookie': oauthStateCookie(age ? `${state}:1` : state),
    },
  });
};
export const GET = start;
export const POST = start;
