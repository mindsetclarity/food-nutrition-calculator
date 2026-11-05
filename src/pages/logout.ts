import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { deleteSession, sessionCookie } from '../lib/community/sessions';

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  const token = cookies.get('fnc_session')?.value;
  if (token) await deleteSession(env.DB, token);
  return new Response(null, { status: 303, headers: { Location: '/', 'Set-Cookie': sessionCookie(null) } });
};
