import { getPost, postUrl } from './posts';
import { canWrite, getUserById } from './users';

type Db = D1Database;
export const REPORT_REASONS = [
  { slug: 'spam', label: 'Spam' },
  { slug: 'harmful', label: 'Harmful advice' },
  { slug: 'photo', label: 'Inappropriate photo' },
  { slug: 'other', label: 'Other' },
] as const;

export interface OpenReport {
  id: number;
  reporter: string;
  reason: string;
  createdAt: number;
  kind: 'post' | 'reply';
  excerpt: string;
  url: string;
}

export async function reportItem(
  db: Db,
  reporterId: number,
  { postId, replyId, reason }: { postId: number; replyId?: number; reason: string },
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!REPORT_REASONS.some((r) => r.slug === reason)) return { ok: false, error: 'Please choose a reason.' };
  if (!canWrite(await getUserById(db, reporterId))) return { ok: false, error: 'Your account cannot report right now.' };
  const post = await getPost(db, postId);
  let live = !!post && !post.deleted_at && !post.author_banned;
  if (live && replyId != null) {
    const r = await db
      .prepare('SELECT 1 FROM replies r JOIN users u ON u.id = r.user_id WHERE r.id = ? AND r.post_id = ? AND r.deleted_at IS NULL AND u.is_banned = 0')
      .bind(replyId, postId)
      .first();
    live = !!r;
  }
  if (!live) return { ok: false, error: 'That item no longer exists.' };
  // Reply reports store only reply_id (post is derived). One open report per reporter per item: insert only if none exists.
  await db
    .prepare(
      `INSERT INTO reports (reporter_id, post_id, reply_id, reason, created_at)
       SELECT ?1, ?2, ?3, ?4, ?5 WHERE NOT EXISTS (
         SELECT 1 FROM reports WHERE reporter_id = ?1 AND resolved_at IS NULL AND post_id IS ?2 AND reply_id IS ?3)`,
    )
    .bind(reporterId, replyId == null ? postId : null, replyId ?? null, reason, Date.now())
    .run();
  return { ok: true };
}

export async function listOpenReports(db: Db): Promise<OpenReport[]> {
  const { results } = await db
    .prepare(
      `SELECT rp.id, rp.reason, rp.created_at, ru.username AS reporter,
              rp.reply_id, COALESCE(rp.post_id, r.post_id) AS pid, r.body
       FROM reports rp
       JOIN users ru ON ru.id = rp.reporter_id
       LEFT JOIN replies r ON r.id = rp.reply_id
       WHERE rp.resolved_at IS NULL
       ORDER BY rp.created_at DESC, rp.id DESC`,
    )
    .all<any>();
  const out: OpenReport[] = [];
  for (const r of results) {
    const post = await getPost(db, r.pid);
    if (!post) continue;
    out.push({
      id: r.id,
      reporter: r.reporter,
      reason: r.reason,
      createdAt: r.created_at,
      kind: r.reply_id ? 'reply' : 'post',
      excerpt: r.reply_id ? String(r.body).slice(0, 140) : post.title,
      url: postUrl(post) + (r.reply_id ? `#reply-${r.reply_id}` : ''),
    });
  }
  return out;
}

export async function resolveReport(db: Db, id: number, now = Date.now()): Promise<void> {
  await db.prepare('UPDATE reports SET resolved_at = ? WHERE id = ? AND resolved_at IS NULL').bind(now, id).run();
}
