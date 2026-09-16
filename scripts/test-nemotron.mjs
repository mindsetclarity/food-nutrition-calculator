/**
 * Checks for the Nemotron provider.
 *
 *   node --experimental-strip-types scripts/test-nemotron.mjs
 *
 * Offline checks always run. The live round-trip runs only when NVIDIA_API_KEY
 * is set in .env, so the script stays useful in CI without a key.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { stripReasoningBlocks, safeParseJSON } from '../src/lib/llm/json.ts';

// --- offline: reasoning traces must never reach the JSON slicer ---------------

// Braces inside <think> are the whole problem: without stripping, the slice
// would start at the '{' in the reasoning and run to the real closing brace.
assert.equal(
  stripReasoningBlocks('<think>could be {a:1} or [2,3]</think>{"items":[]}'),
  '{"items":[]}',
  'closed think block should be removed'
);

assert.equal(
  stripReasoningBlocks('{"a":1}<think>truncated mid-thought {'),
  '{"a":1}',
  'unterminated think block should be dropped'
);

assert.equal(
  stripReasoningBlocks('<THINK>upper</THINK>{"a":1}'),
  '{"a":1}',
  'tag matching should be case-insensitive'
);

assert.equal(
  stripReasoningBlocks('{"plain":true}'),
  '{"plain":true}',
  'text without reasoning should pass through untouched'
);

// The regression this guards: parsing a reasoning-wrapped payload end to end.
assert.deepEqual(
  safeParseJSON('<think>I think {"wrong":1} looks right</think>{"items":[{"foodName":"egg"}]}').data,
  { items: [{ foodName: 'egg' }] },
  'safeParseJSON must ignore JSON that appears inside reasoning'
);

console.log('offline checks passed (5)');

// --- live: does the real endpoint honour our request shape? -------------------

const env = Object.fromEntries(
  (fs.existsSync('.env') ? fs.readFileSync('.env', 'utf8') : '')
    .split('\n')
    .filter((l) => l.trim() && !l.trim().startsWith('#') && l.includes('='))
    .map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()])
);

const apiKey = process.env.NVIDIA_API_KEY || env.NVIDIA_API_KEY;
if (!apiKey || apiKey.startsWith('your_')) {
  console.log('NVIDIA_API_KEY not set - skipping live round-trip.');
  process.exit(0);
}

const model = process.env.NEMOTRON_MODEL || env.NEMOTRON_MODEL || 'nvidia/llama-3.1-nemotron-ultra-253b-v1';
const baseUrl = process.env.NVIDIA_BASE_URL || env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1';

console.log(`calling ${model} ...`);

// Mirrors the body createOpenAICompatibleProvider builds for nemotron.
const res = await fetch(`${baseUrl}/chat/completions`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
  body: JSON.stringify({
    model,
    messages: [
      { role: 'system', content: 'detailed thinking off' },
      { role: 'user', content: 'Parse "2 large eggs and a cup of oats" into JSON: {"items":[{"foodName":string,"quantity":number,"unit":string}]}. Reply with JSON only.' }
    ],
    temperature: 0,
    max_tokens: 1200
  })
});

assert.ok(res.ok, `endpoint returned ${res.status}: ${await res.text().catch(() => '')}`);

const data = await res.json();
const text = data.choices?.[0]?.message?.content ?? '';
assert.ok(text, 'response contained no message content');

const parsed = safeParseJSON(text);
assert.ok(parsed.data, `could not parse JSON from response: ${parsed.error}\n---\n${text}`);
assert.ok(Array.isArray(parsed.data.items) && parsed.data.items.length > 0, 'expected a non-empty items array');

console.log('live round-trip passed:', JSON.stringify(parsed.data.items));
console.log('tokens:', data.usage?.total_tokens ?? 'n/a');
