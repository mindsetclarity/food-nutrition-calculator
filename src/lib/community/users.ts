import type { User } from './db';
import { hashPassword } from './crypto';
import { validateUsername } from './validate';
import { issueReferralCode } from './referral';

type Db = D1Database;
export type CreateUserResult =
  | { ok: true; user: User }
  | { ok: false; error: 'exists' | 'age' | 'username_taken' | 'invalid' };

export async function getUserById(db: Db, id: number): Promise<User | null> {
  return db.prepare('SELECT * FROM users WHERE id = ?').bind(id).first<User>();
}

export async function findUserByEmail(db: Db, email: string): Promise<User | null> {
  // email column is COLLATE NOCASE
  return db.prepare('SELECT * FROM users WHERE email = ?').bind(email.trim()).first<User>();
}

export async function banUser(db: Db, id: number): Promise<void> {
  await db.prepare('UPDATE users SET is_banned = 1 WHERE id = ?').bind(id).run();
}

export async function unbanUser(db: Db, id: number): Promise<void> {
  await db.prepare('UPDATE users SET is_banned = 0 WHERE id = ?').bind(id).run();
}

/** Owner = verified account whose email equals ADMIN_EMAIL (unset/empty = nobody). */
export function isAdmin(user: User | null, adminEmail: string | undefined): boolean {
  const want = adminEmail?.trim().toLowerCase();
  return !!user && !!want && !!user.email_verified && user.email.trim().toLowerCase() === want;
}

/** Admin user search by username or email (substring, LIKE wildcards escaped), max 50. */
export async function searchUsers(db: Db, q: string): Promise<User[]> {
  const like = `%${q.trim().replace(/[\\%_]/g, '\\$&')}%`;
  const { results } = await db
    .prepare("SELECT * FROM users WHERE username LIKE ?1 ESCAPE '\\' OR email LIKE ?1 ESCAPE '\\' ORDER BY created_at DESC, id DESC LIMIT 50")
    .bind(like)
    .all<User>();
  return results;
}

export function canWrite(user: User | null): boolean {
  return !!user && !user.is_banned && !!user.username;
}

/** A user must never exist without a code: if issuing fails, delete the just-created row and rethrow. */
export async function issueCodeOrRollback(db: Db, userId: number): Promise<void> {
  try {
    await issueReferralCode(db, userId);
  } catch (e) {
    await db.prepare('DELETE FROM users WHERE id = ?').bind(userId).run();
    throw e;
  }
}

export async function createEmailUser(
  db: Db,
  input: { email: string; password: string; username: string; ageConfirmed: boolean },
): Promise<CreateUserResult> {
  const email = input.email.trim();
  if (!input.ageConfirmed) return { ok: false, error: 'age' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || input.password.length < 10 || validateUsername(input.username)) {
    return { ok: false, error: 'invalid' };
  }
  if (await findUserByEmail(db, email)) return { ok: false, error: 'exists' };
  if (await db.prepare('SELECT 1 FROM users WHERE username = ?').bind(input.username).first()) {
    return { ok: false, error: 'username_taken' };
  }

  const hash = await hashPassword(input.password);
  try {
    await db
      .prepare('INSERT INTO users (email, password_hash, username, created_at) VALUES (?, ?, ?, ?)')
      .bind(email, hash, input.username, Date.now())
      .run();
  } catch (e) {
    // Lost a race against a concurrent signup: the UNIQUE index decides which field clashed.
    if (!/UNIQUE/i.test(String(e))) throw e;
    return { ok: false, error: /username/i.test(String(e)) ? 'username_taken' : 'exists' };
  }
  const user = (await findUserByEmail(db, email))!;
  await issueCodeOrRollback(db, user.id);
  return { ok: true, user };
}

export async function verifyEmail(db: Db, userId: number): Promise<void> {
  await db.prepare('UPDATE users SET email_verified = 1 WHERE id = ?').bind(userId).run();
}

/** Sets a new password and signs the user out everywhere. */
export async function setPassword(db: Db, userId: number, password: string): Promise<void> {
  const hash = await hashPassword(password);
  await db.batch([
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').bind(hash, userId),
    db.prepare('DELETE FROM sessions WHERE user_id = ?').bind(userId),
  ]);
}

/** Sets the public username for a Google user who has none yet. */
export async function setUsername(db: Db, userId: number, username: string): Promise<'ok' | 'invalid' | 'username_taken'> {
  if (validateUsername(username)) return 'invalid';
  try {
    const r = await db.prepare('UPDATE users SET username = ? WHERE id = ? AND username IS NULL').bind(username, userId).run();
    return r.meta.changes ? 'ok' : 'invalid';
  } catch (e) {
    if (!/UNIQUE/i.test(String(e))) throw e;
    return 'username_taken';
  }
}

/**
 * Removes the account and everything that references it (posts/replies carry NOT NULL user_id foreign keys,
 * so they are hard-deleted along with their votes, photos, reports and other people's replies on those posts).
 * The Bhaskar code is revoked and detached, not deleted. Rows go first in one batch; R2 objects after
 * (a leftover object is unreachable, a dangling row is not).
 */
export async function deleteUser(db: Db, bucket: R2Bucket, userId: number): Promise<void> {
  const mine = 'SELECT id FROM posts WHERE user_id = ?1';
  const { results } = await db
    .prepare(`SELECT key FROM photos WHERE user_id = ?1 OR post_id IN (${mine})`)
    .bind(userId)
    .all<{ key: string }>();
  await db.batch([
    db.prepare('UPDATE posts SET score = (SELECT COUNT(*) FROM votes v WHERE v.post_id = posts.id AND v.user_id != ?1) WHERE id IN (SELECT post_id FROM votes WHERE user_id = ?1)').bind(userId),
    db.prepare(`DELETE FROM votes WHERE user_id = ?1 OR post_id IN (${mine})`).bind(userId),
    db.prepare(`DELETE FROM reports WHERE reporter_id = ?1 OR post_id IN (${mine}) OR reply_id IN (SELECT id FROM replies WHERE user_id = ?1 OR post_id IN (${mine}))`).bind(userId),
    db.prepare(`DELETE FROM photos WHERE user_id = ?1 OR post_id IN (${mine})`).bind(userId),
    db.prepare(`DELETE FROM replies WHERE user_id = ?1 OR post_id IN (${mine})`).bind(userId),
    db.prepare('DELETE FROM posts WHERE user_id = ?').bind(userId),
    db.prepare('DELETE FROM sessions WHERE user_id = ?').bind(userId),
    db.prepare('DELETE FROM email_tokens WHERE user_id = ?').bind(userId),
    db.prepare('DELETE FROM feedback WHERE user_id = ?').bind(userId),
    db.prepare('UPDATE referral_codes SET revoked_at = COALESCE(revoked_at, ?), user_id = NULL WHERE user_id = ?').bind(Date.now(), userId),
    db.prepare('DELETE FROM users WHERE id = ?').bind(userId),
  ]);
  const settled = await Promise.allSettled(results.map((r) => bucket.delete(r.key)));
  settled.forEach((s) => s.status === 'rejected' && console.error('R2 delete failed during account deletion', s.reason));
}
