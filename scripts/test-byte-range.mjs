/**
 * Checks for HTTP Range parsing used by /video/[name].
 *
 *   node --experimental-strip-types scripts/test-byte-range.mjs
 *
 * iOS Safari only plays video served with correct 206 responses.
 */
import assert from 'node:assert/strict';

const { parseByteRange } = await import('../src/lib/http/byteRange.ts');

const size = 1000;
assert.deepEqual(parseByteRange('bytes=0-1', size), { start: 0, end: 1 }); // Safari's first probe
assert.deepEqual(parseByteRange('bytes=0-', size), { start: 0, end: 999 });
assert.deepEqual(parseByteRange('bytes=500-', size), { start: 500, end: 999 });
assert.deepEqual(parseByteRange('bytes=900-5000', size), { start: 900, end: 999 }); // end clamped
assert.deepEqual(parseByteRange('bytes=-100', size), { start: 900, end: 999 }); // suffix
assert.deepEqual(parseByteRange('bytes=-5000', size), { start: 0, end: 999 });
assert.equal(parseByteRange('bytes=1000-', size), 'unsatisfiable');
assert.equal(parseByteRange('bytes=5-2', size), 'unsatisfiable');
assert.equal(parseByteRange(null, size), null);
assert.equal(parseByteRange('bytes=-', size), null);
assert.equal(parseByteRange('bytes=0-1,5-9', size), null); // multi-range: serve whole file

console.log('byte range checks passed (11)');
