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
console.log('community schema: ok');
