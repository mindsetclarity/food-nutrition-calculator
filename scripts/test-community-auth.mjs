/**
 *   node --experimental-strip-types scripts/test-community-auth.mjs
 */
import assert from 'node:assert/strict';
import { createTestDb } from './lib/test-env.mjs';

const { createEmailUser, findUserByEmail, getUserById, banUser, canWrite } = await import('../src/lib/community/users.ts');
const { createSession, getSessionUser, deleteSession, sessionCookie, isSameOriginPost, getSessionUserSafe } = await import('../src/lib/community/sessions.ts');
const { validateUsername } = await import('../src/lib/community/validate.ts');
const db = await createTestDb();

const good = { email: 'A@x.com', password: 'correct horse', username: 'alice_1', ageConfirmed: true };
const r = await createEmailUser(db, good);
assert.equal(r.ok, true);
assert.equal(r.user.username, 'alice_1');
assert.notEqual(r.user.password_hash, 'correct horse');
assert.equal((await findUserByEmail(db, 'a@X.COM')).id, r.user.id);

assert.deepEqual(await createEmailUser(db, { ...good, email: 'a@x.com', username: 'other' }), { ok: false, error: 'exists' });
assert.deepEqual(await createEmailUser(db, { ...good, email: 'b@x.com' }), { ok: false, error: 'username_taken' });
assert.deepEqual(await createEmailUser(db, { ...good, email: 'c@x.com', username: 'carol', ageConfirmed: false }), { ok: false, error: 'age' });
assert.equal(await findUserByEmail(db, 'c@x.com'), null);
assert.deepEqual(await createEmailUser(db, { ...good, email: 'd@x.com', username: 'admin' }), { ok: false, error: 'invalid' });
assert.deepEqual(await createEmailUser(db, { ...good, email: 'not-an-email', username: 'dave' }), { ok: false, error: 'invalid' });
assert.deepEqual(await createEmailUser(db, { ...good, email: 'e@x.com', username: 'erin', password: 'short' }), { ok: false, error: 'invalid' });

assert.equal(validateUsername('ab'), 'Username must be 3-20 letters, numbers or underscores.');
assert.equal(validateUsername('ok_name'), null);
for (const n of ['Admin', 'owner', 'BHASKAR', 'has space', 'x'.repeat(21)]) assert.notEqual(validateUsername(n), null, n);

const token = await createSession(db, r.user.id);
assert.equal((await getSessionUser(db, token)).id, r.user.id);
assert.equal(await getSessionUser(db, token + 'x'), null);
assert.equal(await getSessionUser(db, token, Date.now() + 31 * 86400000), null);
await deleteSession(db, token);
assert.equal(await getSessionUser(db, token), null);

const t2 = await createSession(db, r.user.id);
await banUser(db, r.user.id);
const banned = await getUserById(db, r.user.id);
assert.equal(canWrite(banned), false);
assert.equal(canWrite(null), false);
assert.equal(canWrite({ ...banned, is_banned: 0 }), true);
assert.equal((await getSessionUser(db, t2)).is_banned, 1);

const origErr = console.error; console.error = () => {};
assert.equal(await getSessionUserSafe({ prepare() { throw new Error('D1 down'); } }, 'tok'), null);
assert.equal(await getSessionUserSafe(undefined, 'tok'), null);
console.error = origErr;
assert.equal((await getSessionUserSafe(db, t2)).id, r.user.id);

const c = sessionCookie('abc');
assert.match(c, /^fnc_session=abc; HttpOnly; Secure; SameSite=Lax; Path=\/; Max-Age=2592000$/);
assert.match(sessionCookie(null), /^fnc_session=; .*Max-Age=0/);

const site = 'https://foodnutritioncalculator.com';
const req = (method, origin) => new Request(site + '/x', { method, headers: origin ? { Origin: origin } : {} });
assert.equal(isSameOriginPost(req('POST', 'https://evil.example'), site), false);
assert.equal(isSameOriginPost(req('POST', site), site), true);
assert.equal(isSameOriginPost(req('POST'), site), false);
assert.equal(isSameOriginPost(req('GET', 'https://evil.example'), site), true);
assert.equal(isSameOriginPost(req('HEAD'), site), true);
console.log('community auth: ok');
