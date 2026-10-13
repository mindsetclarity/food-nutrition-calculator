import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { parseByteRange } from '../../lib/http/byteRange';

export const prerender = false;

// Cloudflare's static asset server ignores Range requests (always 200 + full body),
// and iOS Safari will not play a video without 206 Partial Content. So videos are
// served through here: read the asset, answer Range requests properly.
const VIDEOS: Record<string, string> = {
  'bhaskar-app-ad.mp4': '/media/bhaskar-app-ad.mp4',
};

export const GET: APIRoute = async ({ params, request }) => {
  const path = VIDEOS[params.name ?? ''];
  if (!path) return new Response('Not found', { status: 404 });

  const assets = (env as unknown as { ASSETS: { fetch(input: URL): Promise<Response> } }).ASSETS;
  const asset = await assets.fetch(new URL(path, request.url));
  if (!asset.ok) return new Response('Not found', { status: 404 });

  const body = new Uint8Array(await asset.arrayBuffer());
  const size = body.length;
  const headers = {
    'Content-Type': 'video/mp4',
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'public, max-age=604800',
  };

  const range = parseByteRange(request.headers.get('Range'), size);
  if (range === 'unsatisfiable') {
    return new Response(null, { status: 416, headers: { ...headers, 'Content-Range': `bytes */${size}` } });
  }
  if (!range) {
    return new Response(body, { status: 200, headers: { ...headers, 'Content-Length': String(size) } });
  }
  return new Response(body.subarray(range.start, range.end + 1), {
    status: 206,
    headers: {
      ...headers,
      'Content-Range': `bytes ${range.start}-${range.end}/${size}`,
      'Content-Length': String(range.end - range.start + 1),
    },
  });
};

export const HEAD = GET;
