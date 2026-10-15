import { randomToken, sha256Hex } from './crypto';

type Db = D1Database;
const TTL_MS = { verify: 24 * 3600 * 1000, reset: 3600 * 1000 };

export async function createEmailToken(db: Db, userId: number, purpose: 'verify' | 'reset'): Promise<string> {
  const token = randomToken();
  await db
    .prepare('INSERT INTO email_tokens (token_hash, user_id, purpose, expires_at) VALUES (?, ?, ?, ?)')
    .bind(await sha256Hex(token), userId, purpose, Date.now() + TTL_MS[purpose])
    .run();
  return token;
}

/** Single use: deletes the token and returns its user id, or null if unknown, wrong purpose or expired. */
export async function consumeEmailToken(
  db: Db,
  token: string,
  purpose: 'verify' | 'reset',
  now = Date.now(),
): Promise<number | null> {
  const hash = await sha256Hex(token);
  const row = await db
    .prepare('SELECT user_id, expires_at FROM email_tokens WHERE token_hash = ? AND purpose = ?')
    .bind(hash, purpose)
    .first<{ user_id: number; expires_at: number }>();
  if (!row) return null;
  // Delete first and require a change, so two concurrent requests cannot both consume it.
  const res = await db.prepare('DELETE FROM email_tokens WHERE token_hash = ?').bind(hash).run();
  if (!res.meta.changes || row.expires_at <= now) return null;
  return row.user_id;
}
