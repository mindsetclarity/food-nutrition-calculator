import type { User } from './db';

type Db = D1Database;
const DAY = 86_400_000;
const PER_DAY = 5;

export interface FeedbackRow {
  id: number;
  user_id: number;
  message: string;
  owner_reply: string | null;
  created_at: number;
  replied_at: number | null;
}
export type SendFeedbackResult = { ok: true; id: number } | { ok: false; error: string };

export async function sendFeedback(db: Db, user: User | null, message: string, now = Date.now()): Promise<SendFeedbackResult> {
  if (!user || user.is_banned) return { ok: false, error: 'You cannot send messages right now.' };
  const text = message.trim();
  if (text.length < 10 || text.length > 3000) return { ok: false, error: 'Please write between 10 and 3000 characters.' };
  const recent = await db
    .prepare('SELECT COUNT(*) n FROM feedback WHERE user_id = ? AND created_at > ?')
    .bind(user.id, now - DAY)
    .first<{ n: number }>();
  if ((recent?.n ?? 0) >= PER_DAY) return { ok: false, error: 'You can send up to 5 messages a day. Please try again tomorrow.' };
  const res = await db
    .prepare('INSERT INTO feedback (user_id, message, created_at) VALUES (?, ?, ?)')
    .bind(user.id, text, now)
    .run();
  return { ok: true, id: res.meta.last_row_id };
}

export async function listFeedbackForUser(db: Db, userId: number): Promise<FeedbackRow[]> {
  const { results } = await db
    .prepare('SELECT * FROM feedback WHERE user_id = ? ORDER BY created_at DESC, id DESC')
    .bind(userId)
    .all<FeedbackRow>();
  return results;
}

/** Admin-only (Task 11): includes the sender's username and email. */
export async function listAllFeedback(db: Db, { unrepliedFirst = false } = {}) {
  const order = unrepliedFirst ? 'f.owner_reply IS NOT NULL, ' : '';
  const { results } = await db
    .prepare(
      `SELECT f.*, u.username, u.email FROM feedback f JOIN users u ON u.id = f.user_id
       ORDER BY ${order}f.created_at DESC, f.id DESC`,
    )
    .all<FeedbackRow & { username: string | null; email: string }>();
  return results;
}

export async function replyToFeedback(db: Db, id: number, reply: string, now = Date.now()): Promise<boolean> {
  const text = reply.trim();
  if (text.length < 1 || text.length > 3000) return false;
  const res = await db
    .prepare('UPDATE feedback SET owner_reply = ?, replied_at = ? WHERE id = ?')
    .bind(text, now, id)
    .run();
  return res.meta.changes > 0;
}
