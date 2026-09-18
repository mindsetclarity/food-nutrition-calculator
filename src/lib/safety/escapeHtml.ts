// src/lib/safety/escapeHtml.ts

const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Escape text before interpolating it into an innerHTML template.
 *
 * Food names and brands come from USDA FoodData Central, which routinely
 * returns ampersands and quotes ("BEN & JERRY'S", 'CEREAL, 12" ROUND'), so
 * writing them raw corrupts the surrounding markup and lets feed content be
 * parsed as HTML. Prefer textContent where the value stands alone; use this
 * where a template genuinely has to build markup.
 */
export function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[&<>"']/g, (char) => HTML_ENTITIES[char]);
}
