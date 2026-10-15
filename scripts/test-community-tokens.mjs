/**
 *   node --experimental-strip-types scripts/test-community-tokens.mjs
 */
import assert from 'node:assert/strict';
import { createTestDb } from './lib/test-env.mjs';

const { createEmailUser, getUserById, verifyEmail, setPassword } = await import('../src/lib/community/users.ts');
const { createSession, getSessionUser } = await import('../src/lib/community/sessions.ts');
const { verifyPassword } = await import('../src/lib/community/crypto.ts');
const { createEmailToken, consumeEmailToken } = await import('../src/lib/community/tokens.ts');
const { sendEmail } = await import('../src/lib/community/email.ts');
const db = await createTestDb();

const { user } = await createEmailUser(db, { email: 'a@x.com', password: 'correct horse', username: 'alice_1', ageConfirmed: true });

const t = await createEmailToken(db, user.id, 'verify');
assert.equal(await consumeEmailToken(db, t, 'reset'), null, 'wrong purpose');
assert.equal(await consumeEmailToken(db, t, 'verify'), user.id);
assert.equal(await consumeEmailToken(db, t, 'verify'), null, 'single use');
assert.equal(await consumeEmailToken(db, 'nope', 'verify'), null);

const t2 = await createEmailToken(db, user.id, 'verify');
assert.equal(await consumeEmailToken(db, t2, 'verify', Date.now() + 25 * 3600000), null, 'verify expires after 24h');
const t3 = await createEmailToken(db, user.id, 'reset');
assert.equal(await consumeEmailToken(db, t3, 'reset', Date.now() + 2 * 3600000), null, 'reset expires after 1h');
const t4 = await createEmailToken(db, user.id, 'reset');
assert.equal(await consumeEmailToken(db, t4, 'reset', Date.now() + 30 * 60000), user.id, 'reset valid within 1h');

assert.equal((await getUserById(db, user.id)).email_verified, 0);
await verifyEmail(db, user.id);
assert.equal((await getUserById(db, user.id)).email_verified, 1);

const s = await createSession(db, user.id);
await setPassword(db, user.id, 'brand new password');
assert.equal(await getSessionUser(db, s), null, 'sessions invalidated');
const after = await getUserById(db, user.id);
assert.equal(await verifyPassword('brand new password', after.password_hash), true);
assert.equal(await verifyPassword('correct horse', after.password_hash), false);

// sendEmail: posts to Resend, reports success/failure
const realFetch = globalThis.fetch;
let call;
globalThis.fetch = async (url, init) => { call = { url, init }; return new Response('{}', { status: 200 }); };
assert.equal(await sendEmail('key', { to: 'a@x.com', subject: 'S', text: 'T' }), true);
assert.equal(call.url, 'https://api.resend.com/emails');
assert.equal(call.init.headers.Authorization, 'Bearer key');
assert.equal(JSON.parse(call.init.body).from, 'Food Nutrition Calculator <community@foodnutritioncalculator.com>');
globalThis.fetch = async () => new Response('no', { status: 422 });
assert.equal(await sendEmail('key', { to: 'a@x.com', subject: 'S', text: 'T' }), false);
globalThis.fetch = async () => { throw new Error('net'); };
assert.equal(await sendEmail('key', { to: 'a@x.com', subject: 'S', text: 'T' }), false);
globalThis.fetch = realFetch;

console.log('community tokens tests passed');
