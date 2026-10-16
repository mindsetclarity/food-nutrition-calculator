/**
 *   node --experimental-strip-types scripts/test-community-photos.mjs
 */
import assert from 'node:assert/strict';
import { createTestDb, IMG } from './lib/test-env.mjs';

const { createEmailUser, verifyEmail, getUserById } = await import('../src/lib/community/users.ts');
const { createPost } = await import('../src/lib/community/posts.ts');
const P = await import('../src/lib/community/photos.ts');
const db = await createTestDb();
const DAY = 86400000;
const now = Date.now();

const PNG = IMG.png;
const JPG = IMG.jpg;
const WEBP = IMG.webp;
const PDF = new TextEncoder().encode('%PDF-1.4 renamed.jpg');

// sniffing
assert.equal(P.sniffImageType(PNG), 'image/png');
assert.equal(P.sniffImageType(JPG), 'image/jpeg');
assert.equal(P.sniffImageType(WEBP), 'image/webp');
assert.equal(P.sniffImageType(PDF), null);
assert.equal(P.sniffImageType(new Uint8Array(0)), null);

const mk = async (n, verified, age) => {
  const u = (await createEmailUser(db, { email: `${n}@x.com`, password: 'correct horse', username: n, ageConfirmed: true })).user;
  if (verified) await verifyEmail(db, u.id);
  await db.prepare('UPDATE users SET created_at = ? WHERE id = ?').bind(now - age, u.id).run();
  return getUserById(db, u.id);
};
const old = await mk('olduser', true, 8 * DAY);
const fresh = await mk('freshuser', true, 3 * DAY);
const unverified = await mk('unverified', false, 8 * DAY);
const other = await mk('otheruser', true, 8 * DAY);

// status by age
assert.equal(P.photoStatusFor(fresh, now), 'pending');
assert.equal(P.photoStatusFor(old, now), 'live');

// validation
const f = (bytes, size = bytes.length) => ({ size, bytes });
assert.deepEqual(P.validatePhotos([f(PNG), f(JPG), f(WEBP)], old, now), { ok: true, types: ['image/png', 'image/jpeg', 'image/webp'] });
assert.deepEqual(P.validatePhotos([], unverified, now), { ok: true, types: [] });
assert.equal(P.validatePhotos([f(PDF)], old, now).ok, false);
assert.equal(P.validatePhotos([f(PNG, 6 * 1024 * 1024)], old, now).ok, false);
assert.equal(P.validatePhotos([f(PNG, 5 * 1024 * 1024)], old, now).ok, true);
assert.equal(P.validatePhotos([f(PNG), f(PNG), f(PNG), f(PNG), f(PNG)], old, now).ok, false);
assert.equal(P.validatePhotos([f(PNG)], unverified, now).ok, false);

// fake bucket
const bucket = () => {
  const calls = [];
  const store = new Map();
  return { calls, store,
    async put(k, v, o) { calls.push(['put', k]); store.set(k, { v, o }); },
    async get(k) { return store.get(k) ?? null; },
    async delete(k) { calls.push(['delete', k]); store.delete(k); } };
};
const fakeFile = (bytes, name = 'a.png') => new File([bytes], name);
const body = 'This is a perfectly fine post body.';
const count = async (t) => (await db.prepare(`SELECT COUNT(*) n FROM ${t}`).first()).n;

// createPost with photos, fresh account -> pending
let b = bucket();
let r = await createPost(db, fresh, { topic: 'diet', title: 'Photo post one', body, files: [fakeFile(PNG), fakeFile(JPG)] }, now, b);
assert.equal(r.ok, true);
assert.equal(b.calls.length, 2);
const rows = (await db.prepare('SELECT * FROM photos WHERE post_id = ?').bind(r.id).all()).results;
assert.equal(rows.length, 2);
assert.ok(rows.every((x) => x.status === 'pending' && /^p\/\d+\/[A-Za-z0-9_-]+$/.test(x.key) && x.key.startsWith(`p/${r.id}/`)));
assert.equal(b.store.get(rows[0].key).o.httpMetadata.contentType, rows[0].key && b.store.get(rows[0].key).o.httpMetadata.contentType);
assert.ok(['image/png', 'image/jpeg'].includes(b.store.get(rows[0].key).o.httpMetadata.contentType));
const pid = r.id;

// visibility
assert.equal((await P.listPostPhotos(db, pid, null)).length, 0);
assert.equal((await P.listPostPhotos(db, pid, other)).length, 0);
assert.equal((await P.listPostPhotos(db, pid, fresh)).length, 2);
assert.equal((await P.listPostPhotos(db, pid, other, true)).length, 2);
assert.equal((await P.listPostPhotos(db, pid, fresh))[0].status, 'pending');
// serving rules
assert.equal(await P.getServablePhoto(db, rows[0].key, null), null);
assert.equal(await P.getServablePhoto(db, rows[0].key, other), null);
assert.equal((await P.getServablePhoto(db, rows[0].key, fresh)).status, 'pending');
assert.equal(await P.getServablePhoto(db, 'p/1/nope', fresh), null);

// pending list / approve / reject
assert.equal((await P.listPendingPhotos(db)).length, 2);
await P.approvePhoto(db, rows[0].key);
assert.equal((await P.listPostPhotos(db, pid, null)).length, 1);
assert.equal((await P.getServablePhoto(db, rows[0].key, null)).status, 'live');
b.calls.length = 0;
await P.rejectPhoto(db, b, rows[1].key);
assert.deepEqual(b.calls, [['delete', rows[1].key]]);
assert.equal((await P.listPostPhotos(db, pid, fresh)).length, 1);
assert.equal(await P.getServablePhoto(db, rows[1].key, fresh), null);

// old account -> live immediately
b = bucket();
r = await createPost(db, old, { topic: 'diet', title: 'Photo post two', body, files: [fakeFile(WEBP)] }, now, b);
assert.equal((await P.listPostPhotos(db, r.id, null)).length, 1);

// empty file entries are ignored; unverified without photos can post
b = bucket();
r = await createPost(db, unverified, { topic: 'diet', title: 'No photo post', body, files: [new File([], '')] }, now, b);
assert.equal(r.ok, true);
assert.equal(b.calls.length, 0);

// invalid photos: nothing written
const posts0 = await count('posts');
const photos0 = await count('photos');
b = bucket();
for (const files of [[fakeFile(PDF, 'x.jpg')], [fakeFile(new Uint8Array(6 * 1024 * 1024).fill(0x41))], Array(5).fill(0).map(() => fakeFile(PNG))]) {
  assert.equal((await createPost(db, old, { topic: 'diet', title: 'Bad photos here', body, files }, now, b)).ok, false);
}
assert.equal((await createPost(db, unverified, { topic: 'diet', title: 'Bad photos here', body, files: [fakeFile(PNG)] }, now, b)).ok, false);
assert.equal(await count('posts'), posts0);
assert.equal(await count('photos'), photos0);
assert.equal(b.calls.length, 0);

// R2 failure mid-way: earlier objects and the post row are removed
b = bucket();
let n = 0;
const put = b.put;
b.put = async (k, v, o) => { if (++n === 2) throw new Error('r2 down'); return put(k, v, o); };
r = await createPost(db, old, { topic: 'diet', title: 'Failing upload', body, files: [fakeFile(PNG), fakeFile(JPG)] }, now, b);
assert.equal(r.ok, false);
assert.equal(await count('posts'), posts0);
assert.equal(await count('photos'), photos0);
assert.equal(b.store.size, 0);

// metadata stripping (EXIF/GPS must never be stored)
const has = (b, s) => Buffer.from(b).includes(s);
const strip = P.stripImageMetadata;
assert.deepEqual(strip(IMG.pngMeta, 'image/png'), IMG.png, 'png: eXIf/tEXt/iTXt/zTXt dropped, rest intact');
assert.deepEqual(strip(IMG.png, 'image/png'), IMG.png);
assert.deepEqual(strip(IMG.jpgMeta, 'image/jpeg'), IMG.jpg, 'jpeg: APP1/APP13 dropped, rest intact');
assert.ok(!has(strip(IMG.jpgMeta, 'image/jpeg'), 'Exif') && has(strip(IMG.jpgMeta, 'image/jpeg'), 'JFIF'));
const w = strip(IMG.webpMeta, 'image/webp');
assert.deepEqual(w, IMG.webp, 'webp: EXIF/XMP dropped, RIFF size fixed, VP8X flags cleared');
assert.ok(!has(w, 'EXIF') && !has(w, 'XMP ') && has(w, 'VP8L'));
assert.equal(Buffer.from(w).readUInt32LE(4), w.length - 8);
assert.equal(w[20] & 0x0c, 0);
assert.equal(w[20] & 0x10, 0x10, 'alpha flag kept');
// anomalies -> null
assert.equal(strip(IMG.png.slice(0, -12), 'image/png'), null, 'png without IEND');
assert.equal(strip(IMG.png.slice(0, 20), 'image/png'), null, 'png truncated chunk');
assert.equal(strip(IMG.jpg.slice(0, 10), 'image/jpeg'), null, 'jpeg truncated segment');
assert.equal(strip(Uint8Array.from([0xff, 0xd8, 0xff, 0xd9]), 'image/jpeg'), null, 'jpeg without scan');
assert.equal(strip(Uint8Array.from([0xff, 0xd8, 0x00, 0x00]), 'image/jpeg'), null, 'jpeg garbage');
assert.equal(strip(IMG.webp.slice(0, -2), 'image/webp'), null, 'webp riff size beyond data');
assert.equal(strip(JPG.slice(0, 3), 'image/jpeg'), null);

// createPost stores stripped bytes; unparseable photos are rejected with nothing written
b = bucket();
r = await createPost(db, old, { topic: 'diet', title: 'Exif photo post', body, files: [fakeFile(IMG.jpgMeta), fakeFile(IMG.pngMeta), fakeFile(IMG.webpMeta)] }, now, b);
assert.equal(r.ok, true);
const stored = [...b.store.values()].map((x) => new Uint8Array(x.v));
assert.equal(stored.length, 3);
for (const s of stored) assert.ok(!has(s, 'GPS!'), 'no metadata stored');
const posts1 = await count('posts');
b = bucket();
r = await createPost(db, old, { topic: 'diet', title: 'Broken photo post', body, files: [fakeFile(IMG.png.slice(0, 20))] }, now, b);
assert.deepEqual(r, { ok: false, error: "Couldn't process this photo. Please try a different one." });
assert.equal(await count('posts'), posts1);
assert.equal(b.calls.length, 0);

console.log('photos: all assertions passed');
