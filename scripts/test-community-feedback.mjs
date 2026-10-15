/**
 *   node --experimental-strip-types scripts/test-community-feedback.mjs
 */
import assert from 'node:assert/strict';
import { createTestDb } from './lib/test-env.mjs';

const { createEmailUser, banUser } = await import('../src/lib/community/users.ts');
const { sendFeedback, listFeedbackForUser, listAllFeedback, replyToFeedback } = await import('../src/lib/community/feedback.ts');
const db = await createTestDb();
const mk = async (n) => (await createEmailUser(db, { email: `${n}@x.com`, password: 'correct horse', username: n, ageConfirmed: true })).user;
const [a, b] = [await mk('alice'), await mk('bob')];
const T = 1_700_000_000_000;
const DAY = 86_400_000;

// validation
assert.equal((await sendFeedback(db, a, 'too short', T)).ok, false);
assert.equal((await sendFeedback(db, a, '   ' + 'x'.repeat(9) + '   ', T)).ok, false, 'trimmed length');
assert.equal((await sendFeedback(db, a, 'x'.repeat(3001), T)).ok, false);
assert.equal((await sendFeedback(db, null, 'a valid message here', T)).ok, false);
assert.equal((await sendFeedback(db, a, 'x'.repeat(3000), T)).ok, true);

// privacy + ordering
const s1 = await sendFeedback(db, b, '  bob idea number one  ', T + 1);
assert.equal(s1.ok, true);
await sendFeedback(db, a, 'alice second message', T + 2);
const mine = await listFeedbackForUser(db, a.id);
assert.equal(mine.length, 2);
assert.ok(mine.every((r) => r.message !== 'bob idea number one'));
assert.equal(mine[0].message, 'alice second message', 'newest first');
assert.equal((await listFeedbackForUser(db, b.id))[0].message, 'bob idea number one', 'stored trimmed');

// reply
assert.equal(await replyToFeedback(db, 999999, 'hi', T), false);
assert.equal(await replyToFeedback(db, s1.id, '   ', T), false);
assert.equal(await replyToFeedback(db, s1.id, 'thanks!', T + 10), true);
let row = (await listFeedbackForUser(db, b.id))[0];
assert.equal(row.owner_reply, 'thanks!');
assert.equal(row.replied_at, T + 10);
assert.equal(await replyToFeedback(db, s1.id, 'edited', T + 20), true);
row = (await listFeedbackForUser(db, b.id))[0];
assert.equal(row.owner_reply, 'edited');
assert.equal(row.replied_at, T + 20);

// admin list: unreplied first, with username + email
const all = await listAllFeedback(db, { unrepliedFirst: true });
assert.equal(all.length, 3);
assert.equal(all[all.length - 1].id, s1.id, 'replied last');
assert.equal(all[0].owner_reply, null);
assert.ok(all[0].username && all[0].email);

// rate limit: 5 per rolling 24h (alice has 2 so far)
for (let i = 0; i < 3; i++) assert.equal((await sendFeedback(db, a, `alice more ${i} text`, T + 100 + i)).ok, true);
const sixth = await sendFeedback(db, a, 'alice sixth message', T + 200);
assert.equal(sixth.ok, false);
assert.equal((await sendFeedback(db, b, 'bob still can send', T + 200)).ok, true, 'per-user');
assert.equal((await sendFeedback(db, a, 'alice a day later', T + DAY + 10)).ok, true, 'window rolls');

// banned
await banUser(db, b.id);
assert.equal((await sendFeedback(db, { ...b, is_banned: 1 }, 'banned message here', T + 300)).ok, false);
console.log('feedback ok');
