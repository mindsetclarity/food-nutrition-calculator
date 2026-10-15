import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { consumeEmailToken } from '../lib/community/tokens';
import { verifyEmail } from '../lib/community/users';

export const prerender = false;

export const GET: APIRoute = async ({ url, locals, redirect }) => {
  const userId = await consumeEmailToken(env.DB, url.searchParams.get('token') ?? '', 'verify');
  if (userId) await verifyEmail(env.DB, userId);
  if (!userId && !locals.user) return redirect('/login');
  return redirect(`/account?verified=${userId ? 1 : 0}`);
};
