/**
 *   node --experimental-strip-types scripts/test-community-delete.mjs
 */
import assert from 'node:assert/strict';
import { createTestDb, IMG } from './lib/test-env.mjs';

const { createEmailUser, deleteUser, getUserById, findUserByEmail } = await import('../src/lib/community/users.ts');
const { createPost, listPosts, createReply, toggleVote, getPost } = await import('../src/lib/community/posts.ts');
const { createSession } = await import('../src/lib/community/sessions.ts');
const { verifyCode, redeemCode, getReferralForUser } = await import('../src/lib/community/referral.ts');
const { buildDiscussionForumPostingSchema } = await import('../src/lib/seo/schema.ts');
const db = await createTestDb();
const body = 'This is a perfectly fine post body.';
const n = async (sql, ...a) => (await db.prepare(sql).bind(...a).first()).n;

const mk = async (name) => {
  const u = (await createEmailUser(db, { email: `${name}@x.com`, password: 'correct horse', username: name, ageConfirmed: true })).user;
  await db.prepare('UPDATE users SET email_verified = 1, created_at = ? WHERE id = ?').bind(Date.now() - 30 * 86400000, u.id).run();
  return getUserById(db, u.id);
};
const alice = await mk('alice');
const bob = await mk('bobby');
const code = (await getReferralForUser(db, alice.id)).code;

const bucket = () => {
  const store = new Map();
  return { store, async put(k, v) { store.set(k, v); }, async delete(k) { store.delete(k); } };
};
const b = bucket();
const PNG = IMG.png;
const ap = await createPost(db, alice, { topic: 'diet', title: 'Alice post', body, files: [new File([PNG], 'a.png')] }, Date.now(), b);
const bp = await createPost(db, bob, { topic: 'diet', title: 'Bob post', body });
assert.equal(b.store.size, 1);
await createReply(db, alice, bp.id, 'alice reply here');
await createReply(db, bob, ap.id, 'bob reply here');
await toggleVote(db, alice.id, bp.id);
await toggleVote(db, bob.id, ap.id);
await createSession(db, alice.id);
await db.prepare("INSERT INTO email_tokens VALUES ('t', ?, 'verify', 1)").bind(alice.id).run();
await db.prepare("INSERT INTO reports (reporter_id, post_id, reason, created_at) VALUES (?, ?, 'x', 1)").bind(alice.id, bp.id).run();
await db.prepare("INSERT INTO feedback (user_id, message, created_at) VALUES (?, 'hello there', 1)").bind(alice.id).run();
assert.equal((await getPost(db, bp.id)).score, 1);

await deleteUser(db, b, alice.id);

assert.equal(await getUserById(db, alice.id), null);
assert.equal(await n('SELECT COUNT(*) n FROM sessions WHERE user_id = ?', alice.id), 0);
assert.equal(await n('SELECT COUNT(*) n FROM email_tokens WHERE user_id = ?', alice.id), 0);
assert.equal(await n('SELECT COUNT(*) n FROM replies WHERE post_id = ?', ap.id), 0, 'others replies on deleted posts removed');
assert.equal(await n('SELECT COUNT(*) n FROM replies WHERE post_id = ?', ap.id), 0, 'replies on deleted posts removed');
assert.equal(await n('SELECT COUNT(*) n FROM reports WHERE reporter_id = ?', alice.id), 0);
assert.equal(await n('SELECT COUNT(*) n FROM feedback WHERE user_id = ?', alice.id), 0);
assert.equal(await n('SELECT COUNT(*) n FROM votes WHERE user_id = ?', alice.id), 0);
assert.equal((await getPost(db, bp.id)).score, 0, 'score recomputed');
assert.equal(await n('SELECT COUNT(*) n FROM photos'), 0);
assert.equal(b.store.size, 0, 'R2 object removed');
assert.equal(await n('SELECT COUNT(*) n FROM posts WHERE user_id = ?', alice.id), 0);
assert.equal(await n('SELECT COUNT(*) n FROM replies WHERE user_id = ?', alice.id), 0);
assert.deepEqual((await listPosts(db, 'diet', { sort: 'new', page: 1 })).map((p) => p.title), ['Bob post']);

// code revoked, not deleted, and detached
assert.deepEqual(await verifyCode(db, code), { valid: false });
assert.deepEqual(await redeemCode(db, code), { ok: false, reason: 'revoked' });
const row = await db.prepare('SELECT * FROM referral_codes WHERE code = ?').bind(code).first();
assert.ok(row.revoked_at && row.user_id === null);

// same email can sign up again, new code
const again = await createEmailUser(db, { email: 'alice@x.com', password: 'correct horse', username: 'alice', ageConfirmed: true });
assert.equal(again.ok, true);
assert.notEqual((await getReferralForUser(db, again.user.id)).code, code);
assert.ok(await findUserByEmail(db, 'alice@x.com'));

// R2 failure does not fail the delete
const failing = { async delete() { throw new Error('r2 down'); } };
const c = await mk('carol');
const origErr = console.error; console.error = () => {};
const cp = await createPost(db, c, { topic: 'diet', title: 'Carol post', body, files: [new File([PNG], 'a.png')] }, Date.now(), b);
await deleteUser(db, failing, c.id);
console.error = origErr;
assert.equal(await getUserById(db, c.id), null);

// JSON-LD
const ld = buildDiscussionForumPostingSchema({ headline: 'T', text: 'x'.repeat(500), author: 'bobby', datePublished: '2026-01-01T00:00:00.000Z', url: 'https://e.com/p', upvotes: 3, replies: 2 });
assert.equal(ld['@type'], 'DiscussionForumPosting');
assert.equal(ld.author.name, 'bobby');
assert.ok(ld.text.length <= 300);
assert.equal(ld.interactionStatistic.length, 2);

// JsonLd component must not allow </script> breakout
const { serializeJsonLd } = await import('../src/lib/seo/jsonLd.ts');
const s = serializeJsonLd({ t: '</script><script>alert(1)</script>' });
assert.ok(!s.includes('</script>') && !s.includes('<'));
assert.equal(JSON.parse(s).t, '</script><script>alert(1)</script>');

console.log('community delete tests passed');
