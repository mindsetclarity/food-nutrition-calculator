/**
 *   node --experimental-strip-types scripts/test-community-referral.mjs
 */
import assert from 'node:assert/strict';
import { createTestDb } from './lib/test-env.mjs';

const { issueReferralCode, getReferralForUser, verifyCode, redeemCode } = await import('../src/lib/community/referral.ts');
const { createEmailUser } = await import('../src/lib/community/users.ts');
const { findOrCreateGoogleUser } = await import('../src/lib/community/google.ts');
const db = await createTestDb();
const codes = async (uid) => (await db.prepare('SELECT code FROM referral_codes WHERE user_id = ?').bind(uid).all()).results;
const RE = /^BSK-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{8}$/;

// every new user gets exactly one code
const e = await createEmailUser(db, { email: 'a@x.com', password: 'longenough1', username: 'alice', ageConfirmed: true });
assert.ok(e.ok);
const ec = await codes(e.user.id);
assert.equal(ec.length, 1);
assert.match(ec[0].code, RE);
const g = await findOrCreateGoogleUser(db, { sub: 's1', email: 'g@x.com', emailVerified: true, ageConfirmed: true });
assert.ok(g.ok);
assert.equal((await codes(g.user.id)).length, 1);
// existing-user sign-in does not issue another
await findOrCreateGoogleUser(db, { sub: 's1', email: 'g@x.com', emailVerified: true, ageConfirmed: true });
assert.equal((await codes(g.user.id)).length, 1);

// issue is idempotent per user; getReferralForUser
assert.equal(await issueReferralCode(db, e.user.id), ec[0].code);
assert.deepEqual(await getReferralForUser(db, e.user.id), { code: ec[0].code, redeemedAt: null });
assert.equal(await getReferralForUser(db, 9999), null);

// verify
const code = ec[0].code;
assert.deepEqual(await verifyCode(db, 'BSK-NOPENOPE'), { valid: false });
assert.deepEqual(await verifyCode(db, 42), { valid: false });
assert.deepEqual(await verifyCode(db, 'x'.repeat(33)), { valid: false });
const v = await verifyCode(db, `  ${code.toLowerCase()} `);
assert.equal(v.valid, true);
assert.match(v.memberSince, /^\d{4}-\d{2}-\d{2}$/);

// redeem: normalised, single use
assert.deepEqual(await redeemCode(db, 'BSK-NOPENOPE'), { ok: false, reason: 'invalid' });
assert.deepEqual(await redeemCode(db, null), { ok: false, reason: 'invalid' });
assert.deepEqual(await redeemCode(db, ` ${code.toLowerCase()} `, 1234), { ok: true });
assert.deepEqual(await redeemCode(db, code), { ok: false, reason: 'used' });
assert.equal((await getReferralForUser(db, e.user.id)).redeemedAt, 1234);
assert.equal((await verifyCode(db, code)).valid, true); // verify is read-only

// concurrent redeem: exactly one wins
const gc = (await codes(g.user.id))[0].code;
const rs = await Promise.all([redeemCode(db, gc), redeemCode(db, gc)]);
assert.equal(rs.filter((r) => r.ok).length, 1);
assert.deepEqual(rs.find((r) => !r.ok), { ok: false, reason: 'used' });

// revoked
const e2 = await createEmailUser(db, { email: 'b@x.com', password: 'longenough1', username: 'bob', ageConfirmed: true });
const c2 = (await codes(e2.user.id))[0].code;
await db.prepare('UPDATE referral_codes SET revoked_at = 1 WHERE code = ?').bind(c2).run();
assert.deepEqual(await verifyCode(db, c2), { valid: false });
assert.deepEqual(await redeemCode(db, c2), { ok: false, reason: 'revoked' });

// failed issue must not leave a code-less user
const badDb = { ...db, prepare: (sql) => (/INSERT INTO referral_codes/.test(sql) ? { bind: () => ({ run: async () => { throw new Error('UNIQUE constraint failed: referral_codes.code'); } }) } : db.prepare(sql)) };
await assert.rejects(createEmailUser(badDb, { email: 'c@x.com', password: 'longenough1', username: 'carol', ageConfirmed: true }));
assert.equal(await db.prepare("SELECT 1 FROM users WHERE email = 'c@x.com'").first(), null);
await assert.rejects(findOrCreateGoogleUser(badDb, { sub: 's3', email: 'd@x.com', emailVerified: true, ageConfirmed: true }));
assert.equal(await db.prepare("SELECT 1 FROM users WHERE email = 'd@x.com'").first(), null);

console.log('referral tests passed');
