import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { redeemVerifyToken } from '../lib/community/tokens';

export const prerender = false;

export const GET: APIRoute = async ({ url, locals, redirect }) => {
  const r = await redeemVerifyToken(env.DB, url.searchParams.get('token') ?? '', locals.user?.id ?? null);
  if (r === 'login') return redirect('/login?next=verify');
  return redirect(`/account?verified=${r === 'verified' ? 1 : 0}`);
};
