import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getServablePhoto } from '../../../lib/community/photos';

export const prerender = false;

const notFound = () => new Response(null, { status: 404 });

export const GET: APIRoute = async ({ params, locals }) => {
  const key = params.key ?? '';
  if (!/^p\/\d+\/[A-Za-z0-9_-]+$/.test(key)) return notFound();
  const photo = await getServablePhoto(env.DB, key, locals.user);
  if (!photo) return notFound();
  const obj = await env.PHOTOS.get(key);
  if (!obj) return notFound();
  return new Response(obj.body, {
    headers: {
      'Content-Type': obj.httpMetadata?.contentType ?? 'application/octet-stream',
      'Cache-Control': photo.status === 'live' ? 'public, max-age=31536000, immutable' : 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
