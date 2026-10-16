import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { isAdmin } from '../../../lib/community/users';
import { getServablePhoto } from '../../../lib/community/photos';

export const prerender = false;

const notFound = () => new Response(null, { status: 404 });

export const GET: APIRoute = async ({ params, locals }) => {
  const key = params.key ?? '';
  if (!/^p\/\d+\/[A-Za-z0-9_-]+$/.test(key)) return notFound();
  const photo = await getServablePhoto(env.DB, key, locals.user, isAdmin(locals.user, env.ADMIN_EMAIL));
  if (!photo) return notFound();
  const obj = await env.PHOTOS.get(key);
  if (!obj) return notFound();
  return new Response(obj.body, {
    headers: {
      'Content-Type': obj.httpMetadata?.contentType ?? 'application/octet-stream',
      'Cache-Control': photo.status === 'live' ? 'public, max-age=86400' : 'private, no-store', // a day, so removed photos age out of caches
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
