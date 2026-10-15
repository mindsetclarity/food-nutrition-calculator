const RESERVED = new Set(['admin', 'owner', 'bhaskar']);

/** Returns an error message, or null when the username is acceptable. */
export function validateUsername(name: string): string | null {
  if (!/^[A-Za-z0-9_]{3,20}$/.test(name)) return 'Username must be 3-20 letters, numbers or underscores.';
  if (RESERVED.has(name.toLowerCase())) return 'That username is not available.';
  return null;
}

import { TOPICS, type TopicSlug, type User } from './db';

const DAY = 86400000;
export const containsLink = (text: string): boolean => /https?:\/\/|www\./i.test(text);

type Result<T> = { ok: true; value: T } | { ok: false; error: string };
const linkBlocked = (text: string, user: User, now: number) =>
  containsLink(text) && now - user.created_at < DAY;
const LINK_ERROR = 'New accounts cannot post links during their first 24 hours.';

export function validatePost(
  input: { topic: string; title: string; body: string },
  user: User,
  now = Date.now(),
): Result<{ topic: TopicSlug; title: string; body: string }> {
  const topic = TOPICS.find((t) => t.slug === input.topic)?.slug;
  const title = input.title.trim();
  const body = input.body.trim();
  if (!topic) return { ok: false, error: 'Please choose a topic.' };
  if (title.length < 5 || title.length > 120) return { ok: false, error: 'Title must be 5-120 characters.' };
  if (body.length < 20 || body.length > 5000) return { ok: false, error: 'Post must be 20-5000 characters.' };
  if (linkBlocked(title + ' ' + body, user, now)) return { ok: false, error: LINK_ERROR };
  return { ok: true, value: { topic, title, body } };
}

export function validateReply(body: string, user: User, now = Date.now()): Result<string> {
  const text = body.trim();
  if (text.length < 2 || text.length > 2000) return { ok: false, error: 'Reply must be 2-2000 characters.' };
  if (linkBlocked(text, user, now)) return { ok: false, error: LINK_ERROR };
  return { ok: true, value: text };
}
