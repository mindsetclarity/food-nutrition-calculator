import assert from 'node:assert/strict';
import { escapeHtml } from '../src/lib/safety/escapeHtml.ts';

let checks = 0;
const check = (actual, expected, label) => {
  assert.equal(actual, expected, label);
  checks++;
};

// Every character that can break out of a markup template.
check(escapeHtml('&'), '&amp;', 'ampersand');
check(escapeHtml('<'), '&lt;', 'less than');
check(escapeHtml('>'), '&gt;', 'greater than');
check(escapeHtml('"'), '&quot;', 'double quote');
check(escapeHtml("'"), '&#39;', 'single quote');

// Real USDA descriptions that previously corrupted the dropdown markup.
check(escapeHtml("BEN & JERRY'S"), 'BEN &amp; JERRY&#39;S', 'brand with ampersand and apostrophe');
check(escapeHtml('PIZZA, 12" ROUND'), 'PIZZA, 12&quot; ROUND', 'inch mark in a food name');

// A name closing the attribute it sits in must not become live markup.
check(
  escapeHtml('" onmouseover="alert(1)'),
  '&quot; onmouseover=&quot;alert(1)',
  'attribute breakout is neutralised',
);
check(
  escapeHtml('<img src=x onerror=alert(1)>'),
  '&lt;img src=x onerror=alert(1)&gt;',
  'tag injection is neutralised',
);

// Escaping must be total, not first-match-only.
check(escapeHtml('a&b&c'), 'a&amp;b&amp;c', 'every occurrence is replaced');

// Nullish values render as nothing rather than "null"/"undefined".
check(escapeHtml(null), '', 'null');
check(escapeHtml(undefined), '', 'undefined');

// Non-strings still stringify (serving sizes arrive as numbers).
check(escapeHtml(0), '0', 'zero is kept, not treated as empty');
check(escapeHtml(28.35), '28.35', 'number');

// Ordinary text is untouched.
check(escapeHtml('Banana, raw'), 'Banana, raw', 'plain name is unchanged');

console.log(`escape-html checks passed (${checks})`);
