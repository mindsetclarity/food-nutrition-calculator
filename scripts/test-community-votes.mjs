/**
 *   node --experimental-strip-types scripts/test-community-votes.mjs
 */
import assert from 'node:assert/strict';
import { createTestDb } from './lib/test-env.mjs';

const { createEmailUser, banUser, getUserById } = await import('../src/lib/community/users.ts');
const { createPost, createReply, getPost, hasVoted, toggleVote } = await import('../src/lib/community/posts.ts');
const { reportItem, listOpenReports, resolveReport } = await import('../src/lib/community/reports.ts');
const db = await createTestDb();
const mk = async (n) => (await createEmailUser(db, { email: `${n}@x.com`, password: 'correct horse', username: n, ageConfirmed: true })).user;
const body = 'This is a perfectly fine post body.';
const [a, b, c] = [await mk('alice'), await mk('bob'), await mk('carol')];
const post = await createPost(db, a, { topic: 'diet', title: 'Vote on me', body });
const reply = await createReply(db, b, post.id, 'a reply worth reporting');
const score = async () => (await getPost(db, post.id)).score;
const rows = async () => (await db.prepare('SELECT COUNT(*) n FROM votes WHERE post_id = ?').bind(post.id).first()).n;

// votes
assert.deepEqual(await toggleVote(db, b.id, post.id), { ok: true, voted: true, score: 1 });
assert.equal(await hasVoted(db, b.id, post.id), true);
assert.equal(await hasVoted(db, c.id, post.id), false);
assert.deepEqual(await toggleVote(db, c.id, post.id), { ok: true, voted: true, score: 2 });
assert.deepEqual(await toggleVote(db, b.id, post.id), { ok: true, voted: false, score: 1 });
assert.deepEqual(await toggleVote(db, c.id, post.id), { ok: true, voted: false, score: 0 });
assert.equal(await score(), 0);
// score self-heals from votes, never drifts
await db.prepare('UPDATE posts SET score = 99 WHERE id = ?').bind(post.id).run();
assert.equal((await toggleVote(db, b.id, post.id)).score, 1);
assert.equal(await score(), await rows());

// rejections
assert.equal((await toggleVote(db, 999999, post.id)).ok, false);
assert.equal((await toggleVote(db, b.id, 999999)).ok, false);
const noName = (await db.prepare("INSERT INTO users (email, created_at) VALUES ('n@x.com', 1)").run()).meta.last_row_id;
assert.equal((await toggleVote(db, noName, post.id)).ok, false);
await banUser(db, c.id);
assert.equal((await toggleVote(db, c.id, post.id)).ok, false);
assert.equal(await score(), 1);
const bp = await createPost(db, b, { topic: 'diet', title: 'Banned later', body });
await banUser(db, a.id);
assert.equal((await toggleVote(db, b.id, post.id)).ok, false, 'author banned');
await db.prepare('UPDATE users SET is_banned = 0 WHERE id = ?').bind(a.id).run();
await db.prepare('UPDATE posts SET deleted_at = 1 WHERE id = ?').bind(bp.id).run();
assert.equal((await toggleVote(db, b.id, bp.id)).ok, false, 'deleted post');

// reports
assert.equal((await reportItem(db, b.id, { postId: post.id, reason: 'spam' })).ok, true);
assert.equal((await reportItem(db, b.id, { postId: post.id, reason: 'spam' })).ok, true);
assert.equal((await db.prepare('SELECT COUNT(*) n FROM reports').first()).n, 1, 'duplicate -> no new row');
assert.equal((await reportItem(db, a.id, { postId: post.id, reason: 'other' })).ok, true);
assert.equal((await reportItem(db, a.id, { replyId: reply.id, reason: 'harmful' })).ok, true);
assert.equal((await reportItem(db, a.id, { postId: post.id, replyId: reply.id, reason: 'spam' })).ok, false, 'both ids');
assert.equal((await reportItem(db, a.id, { reason: 'spam' })).ok, false, 'neither id');
assert.equal((await reportItem(db, a.id, { postId: post.id, reason: 'bogus' })).ok, false, 'bad reason');
assert.equal((await reportItem(db, a.id, { postId: 999999, reason: 'spam' })).ok, false, 'missing post');
assert.equal((await reportItem(db, a.id, { replyId: 999999, reason: 'spam' })).ok, false, 'missing reply');
assert.equal((await reportItem(db, c.id, { postId: post.id, reason: 'spam' })).ok, false, 'banned reporter');
assert.equal((await reportItem(db, b.id, { postId: bp.id, reason: 'spam' })).ok, false, 'deleted post');

const open = await listOpenReports(db);
assert.equal(open.length, 3);
assert.equal(open[0].reason, 'harmful'); // newest first
assert.equal(open[0].reporter, 'alice');
assert.match(open[0].excerpt, /a reply worth reporting/);
assert.equal(open[0].url, `/community/diet/${post.id}-vote-on-me#reply-${reply.id}`);
assert.equal(open[2].excerpt, 'Vote on me');
await resolveReport(db, open[0].id);
assert.equal((await listOpenReports(db)).length, 2);
// after resolving, the same reporter may report again
assert.equal((await reportItem(db, a.id, { replyId: reply.id, reason: 'harmful' })).ok, true);
assert.equal((await listOpenReports(db)).length, 3);

console.log('community votes/reports tests passed');
