/**
 *   node --experimental-strip-types scripts/test-community-crypto.mjs
 */
import assert from 'node:assert/strict';
import './lib/test-env.mjs';

const { hashPassword, verifyPassword, randomToken, sha256Hex, safeEqual, generateReferralCode } =
  await import('../src/lib/community/crypto.ts');

const h1 = await hashPassword('hunter22');
const h2 = await hashPassword('hunter22');
assert.match(h1, /^pbkdf2\$100000\$[A-Za-z0-9+/]+=*\$[A-Za-z0-9+/]+=*$/);
assert.notEqual(h1, h2);
assert.equal(await verifyPassword('hunter22', h1), true);
assert.equal(await verifyPassword('hunter23', h1), false);
assert.equal(await verifyPassword('x', 'garbage'), false);

for (let i = 0; i < 1000; i++) assert.match(generateReferralCode(), /^BSK-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{8}$/);

const t = randomToken();
assert.equal(t.length, 43);
assert.match(t, /^[A-Za-z0-9_-]+$/);
assert.notEqual(t, randomToken());

assert.equal(await sha256Hex('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');

assert.equal(safeEqual('a', 'a'), true);
assert.equal(safeEqual('a', 'b'), false);
assert.equal(safeEqual('a', 'ab'), false);

console.log('community crypto: ok');
