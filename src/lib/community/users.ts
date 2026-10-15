import type { User } from './db';
import { hashPassword } from './crypto';
import { validateUsername } from './validate';

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

export function canWrite(user: User | null): boolean {
  return !!user && !user.is_banned;
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
  // Task 6: issueReferralCode(db, user.id)
  return { ok: true, user };
}
