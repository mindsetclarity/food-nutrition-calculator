/**
 *   node --experimental-strip-types scripts/test-community-google.mjs
 */
import assert from 'node:assert/strict';
import { createTestDb } from './lib/test-env.mjs';

const { googleAuthUrl, exchangeGoogleCode, findOrCreateGoogleUser, parseOauthState } = await import('../src/lib/community/google.ts');
const { createEmailUser, canWrite, setUsername, findUserByEmail } = await import('../src/lib/community/users.ts');
const db = await createTestDb();
const count = async () => (await db.prepare('SELECT COUNT(*) AS n FROM users').first()).n;

// auth URL
const u = new URL(googleAuthUrl('cid', 'https://x.test/auth/google/callback', 'st8'));
assert.equal(u.origin + u.pathname, 'https://accounts.google.com/o/oauth2/v2/auth');
assert.equal(u.searchParams.get('client_id'), 'cid');
assert.equal(u.searchParams.get('redirect_uri'), 'https://x.test/auth/google/callback');
assert.equal(u.searchParams.get('response_type'), 'code');
assert.equal(u.searchParams.get('scope'), 'openid email');
assert.equal(u.searchParams.get('state'), 'st8');

// state cookie value
assert.deepEqual(parseOauthState('abc'), { state: 'abc', age: false });
assert.deepEqual(parseOauthState('abc:1'), { state: 'abc', age: true });
assert.deepEqual(parseOauthState(undefined), { state: '', age: false });

// new sub: age required to create
const g1 = { sub: 'sub-1', email: 'G@x.com', emailVerified: true };
assert.deepEqual(await findOrCreateGoogleUser(db, { ...g1, ageConfirmed: false }), { ok: false, error: 'age' });
assert.equal(await count(), 0);
const n1 = await findOrCreateGoogleUser(db, { ...g1, ageConfirmed: true });
assert.equal(n1.ok && n1.isNew, true);
assert.equal(n1.user.username, null);
assert.equal(n1.user.email_verified, 1);
assert.equal(n1.user.google_sub, 'sub-1');
assert.equal(n1.user.password_hash, null);
assert.equal(canWrite(n1.user), false); // no username yet
// same sub -> same user, no age needed
const n2 = await findOrCreateGoogleUser(db, { ...g1, ageConfirmed: false });
assert.equal(n2.ok && !n2.isNew && n2.user.id === n1.user.id, true);
assert.equal(await count(), 1);

// username chosen -> can write
assert.equal(await setUsername(db, n1.user.id, 'gina'), 'ok');
assert.equal(await setUsername(db, n1.user.id, 'admin'), 'invalid');
const e = await createEmailUser(db, { email: 'e@x.com', password: 'correct horse', username: 'erin', ageConfirmed: true });
const n9 = await findOrCreateGoogleUser(db, { sub: 'sub-9', email: 'n9@x.com', emailVerified: true, ageConfirmed: true });
assert.equal(await setUsername(db, n9.user.id, 'erin'), 'username_taken');
assert.equal(await setUsername(db, n1.user.id, 'other_name'), 'invalid'); // already set
assert.equal(canWrite((await findOrCreateGoogleUser(db, { ...g1, ageConfirmed: false })).user), true);

// verified Google email links to email user (no age needed, one row)
const l = await findOrCreateGoogleUser(db, { sub: 'sub-2', email: 'E@x.com', emailVerified: true, ageConfirmed: false });
assert.equal(l.ok && !l.isNew && l.user.id === e.user.id && l.user.google_sub === 'sub-2' && l.user.email_verified === 1, true);
assert.equal(await count(), 3);

// unverified Google email matching existing user -> email_in_use, row untouched
const p = await createEmailUser(db, { email: 'p@x.com', password: 'correct horse', username: 'pat', ageConfirmed: true });
assert.deepEqual(await findOrCreateGoogleUser(db, { sub: 'sub-3', email: 'p@x.com', emailVerified: false, ageConfirmed: true }), { ok: false, error: 'email_unverified' });
const pRow = await db.prepare('SELECT * FROM users WHERE id = ?').bind(p.user.id).first();
assert.equal(pRow.google_sub, null);
assert.equal(await count(), 4);

// linking onto an UNVERIFIED password account drops the password (pre-hijack defence)
assert.equal(pRow.email_verified, 0);
const l2 = await findOrCreateGoogleUser(db, { sub: 'sub-3', email: 'p@x.com', emailVerified: true, ageConfirmed: false });
assert.equal(l2.ok && l2.user.password_hash, null);

// unverified Google email, unused -> refused, nothing written
const before = await count();
assert.deepEqual(await findOrCreateGoogleUser(db, { sub: "sub-4", email: "new@x.com", emailVerified: false, ageConfirmed: true }), { ok: false, error: "email_unverified" });
assert.equal(await count(), before);
assert.equal(await findUserByEmail(db, "new@x.com"), null);

// exchangeGoogleCode with a fake fetch
const jwt = (p) => 'h.' + Buffer.from(JSON.stringify(p)).toString('base64url') + '.s';
const good = { aud: 'cid', iss: 'https://accounts.google.com', sub: 'S', email: 'a@b.com', email_verified: true };
let sent;
const fakeFetch = (payload, ok = true) => async (url, init) => {
  sent = { url, body: String(init.body) };
  return { ok, json: async () => (payload === null ? {} : { id_token: jwt(payload) }) };
};
const ex = (p, ok) => exchangeGoogleCode('code1', 'cid', 'sec', 'https://x.test/cb', fakeFetch(p, ok));
assert.deepEqual(await ex(good), { sub: 'S', email: 'a@b.com', emailVerified: true });
assert.equal(sent.url, 'https://oauth2.googleapis.com/token');
const body = new URLSearchParams(sent.body);
assert.equal(body.get('code'), 'code1');
assert.equal(body.get('client_secret'), 'sec');
assert.equal(body.get('grant_type'), 'authorization_code');
assert.equal(body.get('redirect_uri'), 'https://x.test/cb');
assert.deepEqual(await ex({ ...good, iss: 'accounts.google.com' }), { sub: 'S', email: 'a@b.com', emailVerified: true });
assert.deepEqual(await ex({ ...good, email_verified: 'true' }), { sub: 'S', email: 'a@b.com', emailVerified: true });
assert.deepEqual(await ex({ ...good, email_verified: undefined }), { sub: 'S', email: 'a@b.com', emailVerified: false });
assert.equal(await ex({ ...good, aud: 'other' }), null);
assert.equal(await ex({ ...good, iss: 'https://evil.example' }), null);
assert.equal(await ex({ ...good, email: undefined }), null);
assert.equal(await ex({ ...good, sub: undefined }), null);
assert.equal(await ex(good, false), null);
assert.equal(await ex(null), null);
assert.equal(await exchangeGoogleCode('c', 'cid', 's', 'r', async () => { throw new Error('net'); }), null);

console.log('community google tests passed');
