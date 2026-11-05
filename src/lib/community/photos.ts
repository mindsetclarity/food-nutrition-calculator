import type { User } from './db';
import { randomToken } from './crypto';
import { isAdmin } from './users';

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

const ascii = (b: Uint8Array, i: number, n: number) => String.fromCharCode(...b.subarray(i, i + n));
function concat(parts: Uint8Array[]): Uint8Array {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

/** JPEG: drop APP1 (Exif/XMP) and APP13 (IPTC) segments; everything from SOS on is copied verbatim. */
function stripJpeg(b: Uint8Array): Uint8Array | null {
  if (b[0] !== 0xff || b[1] !== 0xd8) return null;
  const out = [b.subarray(0, 2)];
  let i = 2;
  for (;;) {
    if (b[i] !== 0xff) return null;
    let m = i + 1;
    while (b[m] === 0xff) m++; // fill bytes
    const marker = b[m];
    // Markers without a length (or EOI) before the first scan mean a malformed or image-less file.
    if (marker === undefined || marker === 0x00 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) return null;
    if (m + 2 >= b.length) return null;
    const len = (b[m + 1] << 8) | b[m + 2];
    const end = m + 1 + len;
    if (len < 2 || end > b.length) return null;
    if (marker === 0xda) return concat([...out, b.subarray(i)]);
    if (marker !== 0xe1 && marker !== 0xed) out.push(b.subarray(i, end));
    i = end;
  }
}

const PNG_DROP = new Set(['eXIf', 'tEXt', 'iTXt', 'zTXt']);
/** PNG: drop eXIf and text chunks; stop at IEND (trailing bytes are dropped). */
function stripPng(b: Uint8Array): Uint8Array | null {
  if (sniffImageType(b) !== 'image/png') return null;
  const dv = new DataView(b.buffer, b.byteOffset, b.byteLength);
  const out = [b.subarray(0, 8)];
  for (let i = 8; i + 12 <= b.length; ) {
    const type = ascii(b, i + 4, 4);
    const end = i + 12 + dv.getUint32(i);
    if (end > b.length) return null;
    if (!PNG_DROP.has(type)) out.push(b.subarray(i, end));
    if (type === 'IEND') return concat(out);
    i = end;
  }
  return null;
}

/** WebP: drop EXIF and XMP chunks, clear their VP8X flags and rewrite the RIFF size. */
function stripWebp(b: Uint8Array): Uint8Array | null {
  if (sniffImageType(b) !== 'image/webp') return null;
  const dv = new DataView(b.buffer, b.byteOffset, b.byteLength);
  const riffEnd = 8 + dv.getUint32(4, true);
  if (riffEnd > b.length) return null;
  const parts: Uint8Array[] = [];
  for (let i = 12; i < riffEnd; ) {
    if (i + 8 > riffEnd) return null;
    const fourcc = ascii(b, i, 4);
    const size = dv.getUint32(i + 4, true);
    const end = i + 8 + size + (size & 1);
    if (end > riffEnd) return null;
    if (fourcc === 'VP8X') {
      if (size < 10) return null;
      const c = b.slice(i, end);
      c[8] &= ~0x0c; // EXIF (0x08) and XMP (0x04) present flags
      parts.push(c);
    } else if (fourcc !== 'EXIF' && fourcc !== 'XMP ') parts.push(b.subarray(i, end));
    i = end;
  }
  const out = concat([b.subarray(0, 12), ...parts]);
  new DataView(out.buffer).setUint32(4, out.length - 8, true);
  return out;
}

/**
 * Removes EXIF/GPS/XMP/text metadata so originals uploaded without client-side re-encoding never leak it.
 * Returns null on any parse anomaly: callers must reject the photo rather than store unstripped bytes.
 */
export function stripImageMetadata(bytes: Uint8Array, type: ImageType): Uint8Array | null {
  try {
    return type === 'image/jpeg' ? stripJpeg(bytes) : type === 'image/png' ? stripPng(bytes) : stripWebp(bytes);
  } catch {
    return null;
  }
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

/** Removes one photo (row, then R2 object). Only the post's author or the owner may do this. */
export async function removePhoto(
  db: Db,
  bucket: R2Bucket,
  key: string,
  actor: User,
  adminEmail: string | undefined,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const row = await db
    .prepare('SELECT p.user_id FROM photos ph JOIN posts p ON p.id = ph.post_id WHERE ph.key = ?')
    .bind(key)
    .first<{ user_id: number }>();
  if (!row || (row.user_id !== actor.id && !isAdmin(actor, adminEmail))) return { ok: false, error: 'Not allowed.' };
  await db.prepare('DELETE FROM photos WHERE key = ?').bind(key).run();
  await bucket.delete(key);
  return { ok: true };
}
