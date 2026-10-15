import type { Post, TopicSlug, User } from './db';
import { canWrite } from './users';
import { validatePost, validateReply } from './validate';

type Db = D1Database;
const HOUR = 3600000;
export const PAGE_SIZE = 20;

export interface PostSummary {
  id: number;
  url: string;
  title: string;
  username: string;
  score: number;
  replyCount: number;
  createdAt: number;
  firstPhotoKey: string | null;
}
export interface ReplyView {
  id: number;
  body: string;
  username: string;
  createdAt: number;
}

export function slugify(title: string): string {
  const s = title
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/g, '');
  return s || 'post';
}

export const postUrl = (p: Pick<Post, 'id' | 'topic' | 'slug'>): string => `/community/${p.topic}/${p.id}-${p.slug}`;

export async function countRecent(db: Db, table: 'posts' | 'replies', userId: number, sinceMs: number): Promise<number> {
  const sql = table === 'posts' ? 'SELECT COUNT(*) n FROM posts WHERE user_id = ? AND created_at >= ?' : 'SELECT COUNT(*) n FROM replies WHERE user_id = ? AND created_at >= ?';
  return (await db.prepare(sql).bind(userId, sinceMs).first<number>('n')) ?? 0;
}

export async function createPost(
  db: Db,
  user: User,
  input: { topic: string; title: string; body: string },
  now = Date.now(),
): Promise<{ ok: true; id: number; url: string } | { ok: false; error: string }> {
  if (!canWrite(user)) return { ok: false, error: 'Your account cannot post right now.' };
  const v = validatePost(input, user, now);
  if (!v.ok) return v;
  if ((await countRecent(db, 'posts', user.id, now - HOUR)) >= 5) {
    return { ok: false, error: 'You can post up to 5 times an hour. Please try again later.' };
  }
  const { topic, title, body } = v.value;
  const slug = slugify(title);
  const r = await db
    .prepare('INSERT INTO posts (user_id, topic, title, body, slug, created_at) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(user.id, topic, title, body, slug, now)
    .run();
  const id = r.meta.last_row_id;
  return { ok: true, id, url: postUrl({ id, topic, slug }) };
}

export async function listPosts(
  db: Db,
  topic: TopicSlug,
  { sort, page }: { sort: 'new' | 'top'; page: number },
): Promise<PostSummary[]> {
  const order = sort === 'top' ? 'p.score DESC, p.created_at DESC, p.id DESC' : 'p.created_at DESC, p.id DESC';
  const { results } = await db
    .prepare(
      `SELECT p.id, p.topic, p.slug, p.title, u.username, p.score, p.created_at,
        (SELECT COUNT(*) FROM replies r JOIN users ru ON ru.id = r.user_id
          WHERE r.post_id = p.id AND r.deleted_at IS NULL AND ru.is_banned = 0) AS reply_count,
        (SELECT key FROM photos ph WHERE ph.post_id = p.id AND ph.status = 'live' ORDER BY ph.created_at, ph.key LIMIT 1) AS photo_key
       FROM posts p JOIN users u ON u.id = p.user_id
       WHERE p.topic = ? AND p.deleted_at IS NULL AND u.is_banned = 0
       ORDER BY ${order} LIMIT ? OFFSET ?`,
    )
    .bind(topic, PAGE_SIZE, (Math.max(1, page) - 1) * PAGE_SIZE)
    .all<any>();
  return results.map((r) => ({
    id: r.id,
    url: postUrl(r),
    title: r.title,
    username: r.username,
    score: r.score,
    replyCount: r.reply_count,
    createdAt: r.created_at,
    firstPhotoKey: r.photo_key ?? null,
  }));
}

/** Raw post row (including deleted); callers decide visibility. */
export async function getPost(db: Db, id: number): Promise<(Post & { username: string; author_banned: number }) | null> {
  return db
    .prepare('SELECT p.*, u.username, u.is_banned AS author_banned FROM posts p JOIN users u ON u.id = p.user_id WHERE p.id = ?')
    .bind(id)
    .first<any>();
}

export async function createReply(
  db: Db,
  user: User,
  postId: number,
  body: string,
  now = Date.now(),
): Promise<{ ok: true; id: number } | { ok: false; error: string }> {
  if (!canWrite(user)) return { ok: false, error: 'Your account cannot post right now.' };
  const v = validateReply(body, user, now);
  if (!v.ok) return v;
  if (!(await db.prepare('SELECT 1 FROM posts WHERE id = ? AND deleted_at IS NULL').bind(postId).first())) {
    return { ok: false, error: 'That post no longer exists.' };
  }
  if ((await countRecent(db, 'replies', user.id, now - HOUR)) >= 30) {
    return { ok: false, error: 'You can reply up to 30 times an hour. Please try again later.' };
  }
  const r = await db
    .prepare('INSERT INTO replies (post_id, user_id, body, created_at) VALUES (?, ?, ?, ?)')
    .bind(postId, user.id, v.value, now)
    .run();
  return { ok: true, id: r.meta.last_row_id };
}

export async function listReplies(db: Db, postId: number): Promise<ReplyView[]> {
  const { results } = await db
    .prepare(
      `SELECT r.id, r.body, u.username, r.created_at FROM replies r JOIN users u ON u.id = r.user_id
       WHERE r.post_id = ? AND r.deleted_at IS NULL AND u.is_banned = 0 ORDER BY r.created_at, r.id`,
    )
    .bind(postId)
    .all<any>();
  return results.map((r) => ({ id: r.id, body: r.body, username: r.username, createdAt: r.created_at }));
}
