// The copy-paste label for bloggers. It lands on other people's sites, so it is self-contained:
// inline styles only, no scripts or classes, every value escaped. scripts/test-embed.mjs checks this.
import { escapeHtml } from '../safety/escapeHtml';
import { buildLabelRows, normalizeLabelNutrients } from './buildNutritionLabel';
import { formatCalories, formatNutritionAmount } from './formatLabelValue';

const clean = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : null);

const THIN = 'border-top:1px solid #000';
const row = 'display:flex;justify-content:space-between;gap:8px;padding:2px 0;color:#000';
const text = 'color:#000';

export function buildEmbedHtml(input: { recipeName: string; servings: number; nutrients: Record<string, unknown> }): string {
  const nutrients = normalizeLabelNutrients(
    Object.fromEntries(Object.entries(input.nutrients).map(([k, v]) => [k, clean(v)])),
  );
  const name = input.recipeName.trim();
  const servings = clean(input.servings) ?? 1;

  const rows = buildLabelRows(nutrients)
    .filter(r => !r.unavailable)
    .map(r => {
      const indent = r.indentLevel ? `;padding-left:${r.indentLevel * 12}px` : '';
      const weight = r.bold ? 'font-weight:700;color:#000' : text;
      const percent = r.percentDailyValue == null ? '' : `<span style="font-weight:700;color:#000">${r.percentDailyValue}%</span>`;
      return `<div style="${row};${THIN}${indent}"><span style="${text}"><span style="${weight}">${r.label}</span> ${formatNutritionAmount(r.amount, r.unit)}</span>${percent}</div>`;
    })
    .join('');

  return [
    `<div style="box-sizing:border-box;max-width:300px;margin:0 0 16px;border:1px solid #000;padding:8px;background:#fff;color:#000;font:14px/1.3 Arial,Helvetica,sans-serif;text-align:left;overflow-wrap:anywhere">`,
    name ? `<h3 style="margin:0 0 4px;font:700 15px/1.3 Arial,Helvetica,sans-serif;color:#000">${escapeHtml(name)}</h3>` : '',
    `<div style="font-size:30px;font-weight:900;line-height:1.1;color:#000">Nutrition Facts</div>`,
    `<div style="padding-bottom:4px;border-bottom:6px solid #000;color:#000">${servings} ${servings === 1 ? 'serving' : 'servings'} per recipe</div>`,
    `<div style="font-size:12px;font-weight:700;padding-top:4px;color:#000">Amount per serving</div>`,
    `<div style="display:flex;justify-content:space-between;align-items:baseline;font-weight:900;border-bottom:3px solid #000;color:#000"><span style="font-size:20px;color:#000">Calories</span><span style="font-size:28px;color:#000">${formatCalories(nutrients.calories)}</span></div>`,
    `<div style="font-size:12px;font-weight:700;text-align:right;padding:2px 0;color:#000">% Daily Value*</div>`,
    rows,
    `<div style="font-size:11px;line-height:1.35;border-top:3px solid #000;margin-top:2px;padding-top:4px;color:#000">*Based on a 2,000 calorie diet. Estimate by <a href="https://foodnutritioncalculator.com" style="color:#000;text-decoration:underline">foodnutritioncalculator.com</a>. Not for commercial packaging.</div>`,
    `</div>`,
  ].join('');
}
