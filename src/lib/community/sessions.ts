import type { User } from './db';
import { randomToken, sha256Hex } from './crypto';

type Db = D1Database;
const SESSION_MS = 30 * 86400 * 1000;

export async function createSession(db: Db, userId: number): Promise<string> {
  const token = randomToken();
  await db
    .prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)')
    .bind(await sha256Hex(token), userId, Date.now() + SESSION_MS)
    .run();
  return token;
}

export async function getSessionUser(db: Db, token: string, now = Date.now()): Promise<User | null> {
  return db
    .prepare(
      'SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ?',
    )
    .bind(await sha256Hex(token), now)
    .first<User>();
}

export async function deleteSession(db: Db, token: string): Promise<void> {
  await db.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(await sha256Hex(token)).run();
}

export function sessionCookie(token: string | null): string {
  const age = token ? 2592000 : 0;
  return `fnc_session=${token ?? ''}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${age}`;
}

/** CSRF guard: state-changing requests must come from our own origin. */
export function isSameOriginPost(request: Request, siteOrigin: string): boolean {
  if (request.method === 'GET' || request.method === 'HEAD') return true;
  return request.headers.get('Origin') === siteOrigin;
}
