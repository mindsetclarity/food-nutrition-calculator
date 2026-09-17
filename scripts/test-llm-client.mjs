/**
 * Offline checks for the LLM client against a local fake OpenAI-compatible host.
 *
 *   node --experimental-strip-types scripts/test-llm-client.mjs
 *
 * Covers two bugs seen against OpenRouter's free Nemotron route:
 *  - the timeout was cleared once headers arrived, so a host that sends 200
 *    headers and then holds the body open hung a meal parse for 306s;
 *  - 200 responses with empty or non-JSON content were accepted as answers.
 */
import assert from 'node:assert/strict';
import http from 'node:http';
import { registerHooks } from 'node:module';

// Astro/Vite supply import.meta.env and extensionless imports; plain node does
// not, so provide both for source files under src/.
registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith('.') && !/\.[cm]?[jt]s$/.test(spec)) {
      try { return next(spec + '.ts', ctx); } catch {}
    }
    return next(spec, ctx);
  },
  load(url, ctx, next) {
    const out = next(url, ctx);
    if (url.includes('/src/') && url.endsWith('.ts')) {
      return { ...out, source: 'import.meta.env = process.env;\n' + String(out.source) };
    }
    return out;
  }
});

// Scripted fake host: each request takes the next behaviour off the queue.
let script = [];
let hits = 0;
const reply = (content) => JSON.stringify({ choices: [{ message: { content } }], usage: {} });
const server = http.createServer((req, res) => {
  req.resume();
  req.on('end', () => {
    hits++;
    const step = script.shift() ?? 'json';
    if (step === 'stall-body') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(' '); // headers + a byte, then nothing - like OpenRouter's keep-alive
      return;
    }
    if (step === 'http-500') { res.writeHead(500); res.end('{}'); return; }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (step === 'empty') res.end(reply(''));
    else if (step === 'prose') res.end(reply('Here are the foods I found: eggs and toast.'));
    else res.end(reply('{"items":[{"foodName":"egg","quantity":2}]}'));
  });
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));

Object.assign(process.env, {
  LLM_PROVIDER: 'openrouter',
  OPENROUTER_API_KEY: 'test-key',
  OPENROUTER_BASE_URL: `http://127.0.0.1:${server.address().port}`
});

const { generateJSONWithLLM } = await import('../src/lib/llm/client.ts');
const ask = (timeoutMs = 10000) => generateJSONWithLLM({
  task: 'meal_parse',
  messages: [{ role: 'user', content: '2 eggs' }],
  timeoutMs
});
const run = async (steps, timeoutMs) => { script = steps; hits = 0; const t = Date.now(); const r = await ask(timeoutMs); return { r, ms: Date.now() - t, hits }; };

// 1. A stalled body is aborted within the budget instead of hanging.
{
  const { r, ms } = await run(['stall-body', 'stall-body'], 1500);
  assert.equal(r.ok, false);
  assert.equal(r.error.code, 'LLM_TIMEOUT');
  assert.ok(ms < 2500, `stalled body should abort near the 1.5s budget, took ${ms}ms`);
}

// 2. Empty content is retried once and the retry's answer is used.
{
  const { r, hits } = await run(['empty', 'json']);
  assert.equal(hits, 2);
  assert.deepEqual(r.json, { items: [{ foodName: 'egg', quantity: 2 }] });
  assert.ok(r.warnings.some((w) => /Retried/.test(w)));
}

// 3. Prose instead of JSON is retried too.
{
  const { r, hits } = await run(['prose', 'json']);
  assert.equal(hits, 2);
  assert.ok(r.json);
}

// 4. Two misses in a row give up without a third call.
{
  const { r, hits } = await run(['empty', 'prose']);
  assert.equal(hits, 2);
  assert.equal(r.json, undefined);
}

// 5. A real HTTP failure is not retried - it will not fix itself in milliseconds.
{
  const { r, hits } = await run(['http-500']);
  assert.equal(hits, 1);
  assert.equal(r.ok, false);
}

// 6. A good first answer makes exactly one call.
{
  const { r, hits } = await run(['json']);
  assert.equal(hits, 1);
  assert.ok(r.json);
}

// 7. Both attempts share one budget: a slow miss leaves no time to retry.
{
  // First attempt stalls to the full budget and times out (!ok), so no retry.
  const { hits, ms } = await run(['stall-body', 'json'], 1000);
  assert.equal(hits, 1, 'a timed-out attempt must not be retried');
  assert.ok(ms < 2000, `took ${ms}ms`);
}

server.closeAllConnections();
server.close();
console.log('llm client checks passed (7)');
