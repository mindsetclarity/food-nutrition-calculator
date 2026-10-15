/**
 *   node --experimental-strip-types scripts/test-community-admin.mjs
 */
import assert from 'node:assert/strict';
import { createTestDb } from './lib/test-env.mjs';

const U = await import('../src/lib/community/users.ts');
const { createPost, createReply, listPosts, listReplies } = await import('../src/lib/community/posts.ts');
const { reportItem, listOpenReports } = await import('../src/lib/community/reports.ts');
const { listPostPhotos } = await import('../src/lib/community/photos.ts');
const db = await createTestDb();
const ADMIN = 'Owner@Example.com';

const mk = async (name, email, verified = true) => {
  const u = (await U.createEmailUser(db, { email, password: 'correct horse', username: name, ageConfirmed: true })).user;
  if (verified) await U.verifyEmail(db, u.id);
  await db.prepare('UPDATE users SET created_at = ? WHERE id = ?').bind(Date.now() - 30 * 86400000, u.id).run();
  return U.getUserById(db, u.id);
};
const admin = await mk('theboss', 'owner@example.com');
const author = await mk('author', 'a@x.com');
const rando = await mk('rando', 'r@x.com');
const unverifiedAdmin = await mk('fakeadmin', 'fake@x.com', false);

// isAdmin
assert.equal(U.isAdmin(admin, ` ${ADMIN} `), true);
assert.equal(U.isAdmin(admin, undefined), false);
assert.equal(U.isAdmin(admin, ''), false);
assert.equal(U.isAdmin(null, ADMIN), false);
assert.equal(U.isAdmin(author, ADMIN), false);
assert.equal(U.isAdmin(unverifiedAdmin, 'fake@x.com'), false);

const PNG = Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]);
const objs = new Map();
const bucket = { put: async (k, v) => void objs.set(k, v), get: async (k) => objs.get(k) ?? null, delete: async (k) => void objs.delete(k) };
const file = () => new File([PNG], 'a.png', { type: 'image/png' });
const mkPost = async (title) => (await createPost(db, author, { topic: 'diet', title, body: 'body text here that is long enough', files: [file()] }, Date.now(), bucket));

// deletePost
const p1 = await mkPost('First post title');
assert.ok(p1.ok, JSON.stringify(p1));
assert.equal(objs.size, 1);
assert.equal((await reportItem(db, rando.id, { postId: p1.id, reason: 'spam' })).ok, true);
const { deletePost, deleteReply } = await import('../src/lib/community/posts.ts');
assert.deepEqual(await deletePost(db, bucket, p1.id, rando, ADMIN), { ok: false, error: 'Not allowed.' });
assert.equal(objs.size, 1, 'refused delete keeps photos');
assert.deepEqual(await deletePost(db, bucket, p1.id, unverifiedAdmin, 'fake@x.com'), { ok: false, error: 'Not allowed.' });
assert.deepEqual(await deletePost(db, bucket, p1.id, author, ADMIN), { ok: true });
assert.equal(objs.size, 0, 'photo objects removed');
assert.equal((await db.prepare('SELECT COUNT(*) n FROM photos WHERE post_id = ?').bind(p1.id).first('n')), 0);
assert.equal((await listPosts(db, 'diet', { sort: 'new', page: 1 })).length, 0);
assert.equal((await listOpenReports(db)).length, 0, 'open reports resolved');
assert.deepEqual(await deletePost(db, bucket, 99999, admin, ADMIN), { ok: false, error: 'Not allowed.' });

// admin deletes someone else's post
const p2 = await mkPost('Second post title');
assert.deepEqual(await deletePost(db, bucket, p2.id, admin, ADMIN), { ok: true });
assert.equal(objs.size, 0);

// deleteReply
const p3 = await createPost(db, author, { topic: 'diet', title: 'Third post title', body: 'body text here that is long enough' });
const r1 = await createReply(db, rando, p3.id, 'my reply text');
await reportItem(db, author.id, { postId: p3.id, replyId: r1.id, reason: 'spam' });
assert.deepEqual(await deleteReply(db, r1.id, author, ADMIN), { ok: false, error: 'Not allowed.' });
assert.deepEqual(await deleteReply(db, r1.id, rando, ADMIN), { ok: true });
assert.equal((await listReplies(db, p3.id)).length, 0);
assert.equal((await listOpenReports(db)).length, 0);
const r2 = await createReply(db, rando, p3.id, 'another reply');
assert.deepEqual(await deleteReply(db, r2.id, admin, ADMIN), { ok: true });

// ban / unban
await U.banUser(db, author.id);
assert.equal(U.canWrite(await U.getUserById(db, author.id)), false);
assert.equal((await listPosts(db, 'diet', { sort: 'new', page: 1 })).length, 0);
await U.unbanUser(db, author.id);
assert.equal(U.canWrite(await U.getUserById(db, author.id)), true);
assert.equal((await listPosts(db, 'diet', { sort: 'new', page: 1 })).length, 1);

// user search
assert.deepEqual((await U.searchUsers(db, 'OWN')).map((u) => u.username), ['theboss']);
assert.deepEqual((await U.searchUsers(db, 'a@x')).map((u) => u.username), ['author']);
assert.equal((await U.searchUsers(db, '%')).length, 0, 'LIKE wildcards are escaped');
assert.equal((await U.searchUsers(db, '')).length, 4);

console.log('community admin: all passed');
