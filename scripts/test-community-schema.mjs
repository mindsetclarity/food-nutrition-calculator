/**
 *   node --experimental-strip-types scripts/test-community-schema.mjs
 */
import assert from 'node:assert/strict';
import { createTestDb } from './lib/test-env.mjs';

const { TOPICS } = await import('../src/lib/community/db.ts');
const db = await createTestDb();

const ins = 'INSERT INTO users (email, email_verified, created_at) VALUES (?, 0, ?)';
const r = await db.prepare(ins).bind('A@x.com', 1).run();
assert.equal(r.meta.changes, 1);
await assert.rejects(db.prepare(ins).bind('a@X.COM', 2).run(), /UNIQUE/);

await db.prepare('INSERT INTO referral_codes (code, user_id, created_at) VALUES (?, NULL, ?)').bind('BSK-ABCDEFGH', 1).run();
assert.equal(await db.prepare('SELECT COUNT(*) AS n FROM referral_codes').first('n'), 1);

// batch is atomic: a failing statement rolls back the earlier one
await assert.rejects(db.batch([
  db.prepare(ins).bind('b@x.com', 3),
  db.prepare(ins).bind('B@x.com', 4),
]));
assert.equal(await db.prepare('SELECT COUNT(*) AS n FROM users').first('n'), 1);
assert.equal((await db.prepare('SELECT id FROM users').all()).results.length, 1);

assert.deepEqual(TOPICS.map((t) => t.slug), ['diet', 'exercise', 'physique', 'feedback']);
assert.deepEqual(TOPICS.filter((t) => !t.indexable).map((t) => t.slug), ['feedback']);
// hot queries use indexes, not full scans (D1 bills rows read)
const plan = async (sql, ...args) => (await db.prepare('EXPLAIN QUERY PLAN ' + sql).bind(...args).all()).results.map((r) => r.detail);
for (const [name, sql, args] of [
  ['reply count', 'SELECT COUNT(*) FROM replies WHERE post_id = ? AND deleted_at IS NULL', [1]],
  ['first photo', "SELECT key FROM photos WHERE post_id = ? AND status = 'live' ORDER BY created_at, key LIMIT 1", [1]],
  ['list replies', 'SELECT id FROM replies WHERE post_id = ? AND deleted_at IS NULL ORDER BY created_at, id', [1]],
  ['vote score', 'UPDATE posts SET score = (SELECT COUNT(*) FROM votes WHERE post_id = ?1) WHERE id = ?1', [1]],
  ['recent posts', 'SELECT COUNT(*) n FROM posts WHERE user_id = ? AND created_at >= ?', [1, 1]],
  ['recent replies', 'SELECT COUNT(*) n FROM replies WHERE user_id = ? AND created_at >= ?', [1, 1]],
  ['pending photos', "SELECT key FROM photos WHERE status = 'pending'", []],
  ['open reports', 'SELECT id FROM reports WHERE resolved_at IS NULL', []],
]) {
  const p = await plan(sql, ...args);
  assert.ok(!p.some((d) => /^SCAN /.test(d)), `${name} full-scans: ${p.join(' | ')}`);
}
console.log('community schema: ok');
