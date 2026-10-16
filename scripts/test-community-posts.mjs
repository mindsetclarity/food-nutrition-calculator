/**
 *   node --experimental-strip-types scripts/test-community-posts.mjs
 */
import assert from 'node:assert/strict';
import { createTestDb } from './lib/test-env.mjs';

const { createEmailUser, banUser } = await import('../src/lib/community/users.ts');
const { validatePost, validateReply, containsLink, toId, toPage } = await import('../src/lib/community/validate.ts');

// form ids / page numbers: only safe positive integers
for (const v of ['1', '42', 7]) assert.equal(toId(v), Number(v));
for (const v of [null, '', '0', '-3', '1.5', 'abc', '1e400', '9007199254740993', 'Infinity', ' ', '0x10']) assert.equal(toId(v), undefined, String(v));
assert.equal(toPage('3'), 3);
for (const v of [null, '', '0', '-1', '2.5', 'x', '1e400', '99999999999999999999']) assert.equal(toPage(v), 1, String(v));
assert.equal(toPage('10001'), 10000, 'capped');
const { slugify, createPost, listPosts, getPost, createReply, listReplies, countRecent, postUrl } = await import('../src/lib/community/posts.ts');
const db = await createTestDb();
const HOUR = 3600000, DAY = 24 * HOUR;
const mk = async (n) => (await createEmailUser(db, { email: `${n}@x.com`, password: 'correct horse', username: n, ageConfirmed: true })).user;
const body = 'This is a perfectly fine post body.';

assert.equal(slugify('Lost 8kg in 3 months — my plan!'), 'lost-8kg-in-3-months-my-plan');
assert.equal(slugify('!!!'), 'post');
assert.ok(slugify('a'.repeat(100)).length <= 60);

assert.equal(containsLink('see www.x.com'), true);
assert.equal(containsLink('HTTPS://x.com'), true);
assert.equal(containsLink('no links here'), false);

const alice = await mk('alice');
const now = Date.now();
assert.equal(validatePost({ topic: 'diet', title: 'Hi', body }, alice, now).ok, false);
assert.equal(validatePost({ topic: 'diet', title: 'Good title', body: 'short' }, alice, now).ok, false);
assert.equal(validatePost({ topic: 'nope', title: 'Good title', body }, alice, now).ok, false);
assert.equal(validatePost({ topic: 'diet', title: 'Good title', body }, alice, now).ok, true);
assert.equal(validateReply('x', alice, now).ok, false);
assert.equal(validateReply('ok reply', alice, now).ok, true);

// link rule by account age
const linkBody = 'Check this out https://example.com for details please';
assert.equal(validatePost({ topic: 'diet', title: 'Good title', body: linkBody }, { ...alice, created_at: now - HOUR }, now).ok, false);
assert.equal(validatePost({ topic: 'diet', title: 'Good title', body: linkBody }, { ...alice, created_at: now - 2 * DAY }, now).ok, true);
assert.equal(validateReply('see www.x.com', { ...alice, created_at: now - HOUR }, now).ok, false);

// rate limit: 5 posts / hour
for (let i = 0; i < 5; i++) {
  const r = await createPost(db, alice, { topic: 'diet', title: `Post number ${i}`, body }, now + i);
  assert.equal(r.ok, true, `post ${i}`);
}
const sixth = await createPost(db, alice, { topic: 'diet', title: 'Sixth post', body }, now + 10);
assert.equal(sixth.ok, false);
assert.equal((await createPost(db, alice, { topic: 'diet', title: 'Later post', body }, now + 2 * HOUR)).ok, true);
assert.equal(await countRecent(db, 'posts', alice.id, now - 1), 6);

// reply limit 30/hour
const first = await listPosts(db, 'diet', { sort: 'new', page: 1 });
const pid = first[0].id;
for (let i = 0; i < 30; i++) assert.equal((await createReply(db, alice, pid, `reply ${i}`, now + 3 * HOUR)).ok, true);
assert.equal((await createReply(db, alice, pid, 'one too many', now + 3 * HOUR)).ok, false);
assert.equal((await createReply(db, alice, 999999, 'orphan reply', now + 9 * HOUR)).ok, false);

// url + getPost
const p = await getPost(db, pid);
assert.equal(postUrl(p), `/community/diet/${p.id}-${p.slug}`);
assert.equal(first[0].url, postUrl(p));
assert.equal(first[0].username, 'alice');
assert.equal(first[0].firstPhotoKey, null);
assert.equal((await listPosts(db, 'diet', { sort: 'new', page: 1 }))[0].replyCount, 30);
assert.equal(await getPost(db, 424242), null);

// banned author hidden, deleted hidden, unsigned/ban blocked
const bob = await mk('bob');
const bp = await createPost(db, bob, { topic: 'exercise', title: 'Bob post here', body }, now);
assert.equal((await listPosts(db, 'exercise', { sort: 'new', page: 1 })).length, 1);
await banUser(db, bob.id);
assert.equal((await listPosts(db, 'exercise', { sort: 'new', page: 1 })).length, 0);
assert.equal((await createPost(db, { ...bob, is_banned: 1 }, { topic: 'exercise', title: 'Banned post', body }, now)).ok, false);
assert.equal((await createPost(db, { ...alice, username: null }, { topic: 'exercise', title: 'No name post', body }, now)).ok, false);

const carol = await mk('carol');
const cp = await createPost(db, carol, { topic: 'physique', title: 'Carol post here', body }, now);
await db.prepare('UPDATE posts SET deleted_at = ? WHERE id = ?').bind(now, cp.id).run();
assert.equal((await listPosts(db, 'physique', { sort: 'new', page: 1 })).length, 0);

// banned replier hidden from list and count
const dave = await mk('dave');
const t = await createPost(db, dave, { topic: 'physique', title: 'Dave post here', body }, now);
const erin = await mk('erin');
await createReply(db, erin, t.id, 'hello there', now);
await createReply(db, dave, t.id, 'thanks erin', now);
assert.equal((await listReplies(db, t.id)).length, 2);
assert.equal((await listPosts(db, 'physique', { sort: 'new', page: 1 }))[0].replyCount, 2);
await banUser(db, erin.id);
assert.deepEqual((await listReplies(db, t.id)).map((r) => r.username), ['dave']);
assert.equal((await listPosts(db, 'physique', { sort: 'new', page: 1 }))[0].replyCount, 1);

// sort top: score desc then newest; pagination
const frank = await mk('frank');
const ids = [];
for (let i = 0; i < 3; i++) ids.push((await createPost(db, frank, { topic: 'feedback', title: `Feedback ${i} title`, body }, now + i * 1000)).id);
await db.prepare('UPDATE posts SET score = 5 WHERE id = ?').bind(ids[0]).run();
await db.prepare('UPDATE posts SET score = 5 WHERE id = ?').bind(ids[1]).run();
assert.deepEqual((await listPosts(db, 'feedback', { sort: 'top', page: 1 })).map((x) => x.id), [ids[1], ids[0], ids[2]]);
assert.deepEqual((await listPosts(db, 'feedback', { sort: 'new', page: 1 })).map((x) => x.id), [ids[2], ids[1], ids[0]]);
for (let i = 0; i < 20; i++) await db.prepare("INSERT INTO posts (user_id, topic, title, body, slug, created_at) VALUES (?, 'feedback', 'bulk', 'bulk body', 'bulk', ?)").bind(frank.id, now - 1000 - i).run();
assert.equal((await listPosts(db, 'feedback', { sort: 'new', page: 1 })).length, 20);
assert.equal((await listPosts(db, 'feedback', { sort: 'new', page: 2 })).length, 3);

console.log('community posts: ok');
