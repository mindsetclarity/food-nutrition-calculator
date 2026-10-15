import type { User } from './db';
import { randomToken } from './crypto';

type Db = D1Database;
const DAY = 86400000;
export const MAX_PHOTOS = 4;
export const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
export type ImageType = 'image/jpeg' | 'image/png' | 'image/webp';

export interface PhotoView {
  key: string;
  status: 'pending' | 'live' | 'rejected';
  userId: number;
}

export function sniffImageType(b: Uint8Array): ImageType | null {
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'image/jpeg';
  if (b.length >= 8 && [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((x, i) => b[i] === x)) return 'image/png';
  if (b.length >= 12 && String.fromCharCode(...b.slice(0, 4)) === 'RIFF' && String.fromCharCode(...b.slice(8, 12)) === 'WEBP') {
    return 'image/webp';
  }
  return null;
}

/** `bytes` only needs the file header; `size` is the full length. */
export function validatePhotos(
  files: { size: number; bytes: Uint8Array }[],
  user: User,
  now = Date.now(),
): { ok: true; types: ImageType[] } | { ok: false; error: string } {
  void now;
  if (files.length === 0) return { ok: true, types: [] };
  if (!user.email_verified) return { ok: false, error: 'Please verify your email before adding photos.' };
  if (files.length > MAX_PHOTOS) return { ok: false, error: `You can add up to ${MAX_PHOTOS} photos.` };
  const types: ImageType[] = [];
  for (const f of files) {
    if (f.size > MAX_PHOTO_BYTES) return { ok: false, error: 'Each photo must be 5 MB or smaller.' };
    const t = sniffImageType(f.bytes);
    if (!t) return { ok: false, error: 'Photos must be JPEG, PNG or WebP images.' };
    types.push(t);
  }
  return { ok: true, types };
}

export function photoStatusFor(user: User, now = Date.now()): 'pending' | 'live' {
  return now - user.created_at < 7 * DAY ? 'pending' : 'live';
}

/** Writes R2 objects, then all rows in one batch. On any failure it removes the objects it wrote and rethrows. */
export async function savePhotos(
  db: Db,
  bucket: R2Bucket,
  postId: number,
  user: User,
  files: { data: ArrayBuffer | Uint8Array; type: ImageType }[],
  now = Date.now(),
): Promise<void> {
  const status = photoStatusFor(user, now);
  const put: string[] = [];
  try {
    for (const f of files) {
      const key = `p/${postId}/${randomToken()}`;
      await bucket.put(key, f.data, { httpMetadata: { contentType: f.type } });
      put.push(key);
    }
    await db.batch(
      put.map((key) =>
        db.prepare('INSERT INTO photos (key, post_id, user_id, status, created_at) VALUES (?, ?, ?, ?, ?)').bind(key, postId, user.id, status, now),
      ),
    );
  } catch (e) {
    await Promise.allSettled(put.map((k) => bucket.delete(k)));
    throw e;
  }
}

export async function listPostPhotos(db: Db, postId: number, viewer: User | null, viewerIsAdmin = false): Promise<PhotoView[]> {
  const { results } = await db
    .prepare("SELECT key, status, user_id FROM photos WHERE post_id = ? AND status != 'rejected' ORDER BY created_at, rowid")
    .bind(postId)
    .all<any>();
  return results
    .filter((r) => r.status === 'live' || viewerIsAdmin || (!!viewer && viewer.id === r.user_id))
    .map((r) => ({ key: r.key, status: r.status, userId: r.user_id }));
}

/** The photo if `viewer` may see it (live, or pending and theirs), and its post/author are still visible; else null. */
export async function getServablePhoto(db: Db, key: string, viewer: User | null, viewerIsAdmin = false): Promise<PhotoView | null> {
  const r = await db
    .prepare(
      `SELECT ph.key, ph.status, ph.user_id FROM photos ph
       JOIN posts p ON p.id = ph.post_id JOIN users u ON u.id = p.user_id
       WHERE ph.key = ? AND p.deleted_at IS NULL AND u.is_banned = 0`,
    )
    .bind(key)
    .first<any>();
  if (!r) return null;
  const ok = r.status === 'live' || (r.status === 'pending' && (viewerIsAdmin || viewer?.id === r.user_id));
  return ok ? { key: r.key, status: r.status, userId: r.user_id } : null;
}

export async function listPendingPhotos(db: Db): Promise<{ key: string; postId: number; username: string; createdAt: number }[]> {
  const { results } = await db
    .prepare(
      `SELECT ph.key, ph.post_id, u.username, ph.created_at FROM photos ph JOIN users u ON u.id = ph.user_id
       WHERE ph.status = 'pending' ORDER BY ph.created_at, ph.rowid`,
    )
    .all<any>();
  return results.map((r) => ({ key: r.key, postId: r.post_id, username: r.username, createdAt: r.created_at }));
}

export async function approvePhoto(db: Db, key: string): Promise<void> {
  await db.prepare("UPDATE photos SET status = 'live' WHERE key = ? AND status = 'pending'").bind(key).run();
}

export async function rejectPhoto(db: Db, bucket: R2Bucket, key: string): Promise<void> {
  await db.prepare("UPDATE photos SET status = 'rejected' WHERE key = ?").bind(key).run();
  await bucket.delete(key);
}
