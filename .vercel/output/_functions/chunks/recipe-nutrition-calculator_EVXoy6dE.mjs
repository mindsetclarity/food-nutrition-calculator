import { c as createComponent } from './astro-component_DEMRXoVo.mjs';
import 'piccolore';
import { m as maybeRenderHead, k as renderTemplate, h as addAttribute, o as renderComponent } from './entrypoint_DdV4XD_W.mjs';
import { $ as $$SiteLayout } from './SiteLayout_B-r8uoSu.mjs';
import 'clsx';
import { r as renderScript } from './SeoHead_BfjWHf_w.mjs';
import { a as buildSoftwareApplicationSchema } from './schema_D9quHZ4m.mjs';
import { s as siteConfig } from './siteConfig_IkrsgOX8.mjs';

const $$RecipeHero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-white py-12 border-b border-border-soft"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <span class="text-[11px] font-bold text-usda-emerald uppercase tracking-widest mb-3 block">Recipe Nutrition Calculator</span> <h1 class="text-3xl md:text-4xl font-black text-ink-navy mb-4 tracking-tight">Turn a recipe into per-serving nutrition.</h1> <p class="text-[15px] text-soft-slate mb-6 max-w-2xl mx-auto leading-relaxed">
Paste your ingredients, review the matched foods, set servings, and get calories, macros, and a Nutrition Facts-style summary.
</p> <div class="flex flex-wrap justify-center gap-3"> <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-mint-wash text-usda-emerald border border-emerald-soft rounded-full text-[10px] font-bold uppercase tracking-widest">
Reviewable ingredients
</span> <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-soft-slate border border-border-soft rounded-full text-[10px] font-bold uppercase tracking-widest">
Per-serving totals
</span> <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-soft-slate border border-border-soft rounded-full text-[10px] font-bold uppercase tracking-widest">
Source-labeled estimates
</span> </div> </div> </div>`;
}, "C:/fnc/src/components/recipe/RecipeHero.astro", void 0);

const DAILY_VALUES = {
  totalFat: 78,
  // g
  saturatedFat: 20,
  // g
  cholesterol: 300,
  // mg
  sodium: 2300,
  // mg
  totalCarbohydrate: 275,
  // g
  fiber: 28,
  // g
  addedSugars: 50,
  // g
  protein: 50,
  // g (using 50g as general DV for adults)
  vitaminD: 20,
  // mcg
  calcium: 1300,
  // mg
  iron: 18,
  // mg
  potassium: 4700
  // mg
};

function getDailyValueForNutrient(key) {
  return DAILY_VALUES[key] || null;
}
function calculatePercentDailyValue(value, dailyValue) {
  if (value === null || value === void 0 || dailyValue === null || dailyValue <= 0) return null;
  return Math.round(value / dailyValue * 100);
}

function normalizeLabelNutrients(input) {
  return {
    calories: input?.calories ?? null,
    protein: input?.protein ?? null,
    carbohydrates: input?.carbohydrates ?? input?.carbs ?? null,
    fat: input?.fat ?? null,
    fiber: input?.fiber ?? null,
    sugar: input?.sugar ?? null,
    sodium: input?.sodium ?? null,
    saturatedFat: input?.saturatedFat ?? null,
    transFat: input?.transFat ?? null,
    cholesterol: input?.cholesterol ?? null,
    addedSugars: input?.addedSugars ?? null,
    vitaminD: input?.vitaminD ?? null,
    calcium: input?.calcium ?? null,
    iron: input?.iron ?? null,
    potassium: input?.potassium ?? null
  };
}
function detectPartialData(nutrients) {
  const essential = ["calories", "protein", "carbohydrates", "fat"];
  return essential.some((key) => nutrients[key] === null);
}
function getSourceWarnings(sourceSummary) {
  const warnings = [];
  if (!sourceSummary) return warnings;
  if (sourceSummary.localFallbackCount > 0) {
    warnings.push("Some values use local fallback data and are estimates.");
  }
  if (sourceSummary.unknownCount > 0) {
    warnings.push("Some items have unknown sources.");
  }
  return warnings;
}
function buildLabelRows(nutrients) {
  const rows = [];
  const addRow = (label, amount, unit, dvKey, indent, bold, nutrientKey) => {
    const dv = dvKey ? getDailyValueForNutrient(dvKey) : null;
    const percent = dvKey ? calculatePercentDailyValue(amount, dv) : null;
    rows.push({
      label,
      amount,
      unit,
      percentDailyValue: percent,
      indentLevel: indent,
      bold,
      optional: false,
      unavailable: amount === null,
      nutrientKey
    });
  };
  addRow("Total Fat", nutrients.fat, "g", "totalFat", 0, true, "fat");
  addRow("Saturated Fat", nutrients.saturatedFat, "g", "saturatedFat", 1, false, "saturatedFat");
  addRow("Trans Fat", nutrients.transFat, "g", null, 1, false, "transFat");
  addRow("Cholesterol", nutrients.cholesterol, "mg", "cholesterol", 0, true, "cholesterol");
  addRow("Sodium", nutrients.sodium, "mg", "sodium", 0, true, "sodium");
  addRow("Total Carbohydrate", nutrients.carbohydrates, "g", "totalCarbohydrate", 0, true, "carbohydrates");
  addRow("Dietary Fiber", nutrients.fiber, "g", "fiber", 1, false, "fiber");
  addRow("Total Sugars", nutrients.sugar, "g", null, 1, false, "sugar");
  addRow("Includes Added Sugars", nutrients.addedSugars, "g", "addedSugars", 2, false, "addedSugars");
  addRow("Protein", nutrients.protein, "g", null, 0, true, "protein");
  return rows;
}

function formatCalories(value) {
  if (value === null || value === void 0) return "—";
  return Math.round(value).toString();
}
function formatGramValue(value) {
  if (value === null || value === void 0) return "—";
  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}
function formatMilligramValue(value) {
  if (value === null || value === void 0) return "—";
  return Math.round(value).toString();
}
function formatMicrogramValue(value) {
  if (value === null || value === void 0) return "—";
  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}
function formatNutritionAmount(value, unit) {
  if (value === null || value === void 0) return "—";
  let formatted = "";
  if (unit === "g") formatted = formatGramValue(value);
  else if (unit === "mg") formatted = formatMilligramValue(value);
  else if (unit === "mcg") formatted = formatMicrogramValue(value);
  else formatted = Math.round(value).toString();
  return `${formatted}${unit}`;
}
function formatServingLabel(label) {
  return label || "1 serving";
}

const $$NutritionFactsDivider = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$NutritionFactsDivider;
  const { size = "thin" } = Astro2.props;
  const heightClass = {
    thin: "h-[1px]",
    medium: "h-[4px]",
    thick: "h-[8px]"
  }[size];
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`w-full bg-black ${heightClass}`, "class")} aria-hidden="true"></div>`;
}, "C:/fnc/src/components/nutrition-label/NutritionFactsDivider.astro", void 0);

const $$NutritionFactsRow = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$NutritionFactsRow;
  const { label, amount, unit, percentDailyValue, indentLevel, bold, unavailable, nutrientKey } = Astro2.props;
  const paddingLeftClass = {
    0: "pl-0",
    1: "pl-4",
    2: "pl-8"
  }[indentLevel] || "pl-0";
  const formattedAmount = unavailable ? "—" : formatNutritionAmount(amount, unit);
  const dvKeyMapping = {
    fat: "totalFat",
    saturatedFat: "saturatedFat",
    cholesterol: "cholesterol",
    sodium: "sodium",
    carbohydrates: "totalCarbohydrate",
    fiber: "fiber",
    addedSugars: "addedSugars",
    protein: "protein",
    vitaminD: "vitaminD",
    calcium: "calcium",
    iron: "iron",
    potassium: "potassium"
  };
  const dvKey = dvKeyMapping[nutrientKey] || "";
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`label-row-wrapper ${unavailable ? "hidden" : ""}`, "class")}${addAttribute(nutrientKey, "data-nutrient-row")}> ${renderComponent($$result, "NutritionFactsDivider", $$NutritionFactsDivider, { "size": "thin" })} <div${addAttribute(`flex justify-between items-center py-1 text-sm ${paddingLeftClass}`, "class")}> <div class="flex gap-1 items-baseline"> <span${addAttribute(bold ? "font-bold text-black" : "text-black", "class")}>${label}</span> <span class="text-black nutrient-amount"${addAttribute(unit, "data-unit")}>${formattedAmount}</span> </div> <span${addAttribute(`font-bold text-black nutrient-dv ${percentDailyValue === null || percentDailyValue === void 0 ? "hidden" : ""}`, "class")}${addAttribute(dvKey, "data-dv-key")}> ${percentDailyValue}%
</span> </div> </div>`;
}, "C:/fnc/src/components/nutrition-label/NutritionFactsRow.astro", void 0);

const $$NutritionFactsFootnote = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "NutritionFactsDivider", $$NutritionFactsDivider, { "size": "medium" })} ${maybeRenderHead()}<p class="text-[10px] leading-tight text-black mt-2">
* The % Daily Value tells you how much a nutrient in a serving of food contributes to a daily diet. Values are estimates.
</p>`;
}, "C:/fnc/src/components/nutrition-label/NutritionFactsFootnote.astro", void 0);

const $$NutritionFactsWarning = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$NutritionFactsWarning;
  const { warnings = [], partialData = false } = Astro2.props;
  const allWarnings = [...warnings];
  if (partialData) {
    allWarnings.push("Some nutrients are unavailable from the selected food data.");
  }
  allWarnings.push("This label preview is for personal estimation only and is not a commercial packaging label.");
  const uniqueWarnings = Array.from(new Set(allWarnings));
  return renderTemplate`${uniqueWarnings.length > 0 && renderTemplate`${maybeRenderHead()}<div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800 leading-relaxed font-medium"><div class="flex items-start gap-2"><svg class="w-4 h-4 shrink-0 mt-0.5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg><ul class="list-disc list-inside space-y-1">${uniqueWarnings.map((w) => renderTemplate`<li>${w}</li>`)}</ul></div></div>`}`;
}, "C:/fnc/src/components/nutrition-label/NutritionFactsWarning.astro", void 0);

const $$NutritionFactsLabel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$NutritionFactsLabel;
  const {
    title = "Nutrition Facts",
    servingLabel,
    servingsPerContainer,
    nutrients: rawNutrients,
    sourceSummary,
    warnings = [],
    class: className = "",
    compact = false
  } = Astro2.props;
  const nutrients = normalizeLabelNutrients(rawNutrients);
  const partialData = detectPartialData(nutrients);
  const dynamicWarnings = getSourceWarnings(sourceSummary);
  const allWarnings = [...warnings, ...dynamicWarnings];
  const rows = buildLabelRows(nutrients);
  const caloriesStr = formatCalories(nutrients.calories);
  const finalServingLabel = formatServingLabel(servingLabel);
  return renderTemplate`${maybeRenderHead()}<div id="nutrition-label-container"${addAttribute(`bg-white border border-gray-300 p-1 rounded-sm shadow-sm font-sans text-black w-full max-w-sm hidden ${className}`, "class")} aria-label="Nutrition Facts label preview"> <div class="border border-black p-2 sm:p-4 bg-white"> <h2 class="text-3xl sm:text-4xl font-black tracking-tighter m-0 mb-1 leading-none" id="label-title">${title}</h2> <p id="label-servings-per"${addAttribute(`text-sm sm:text-base font-medium m-0 mb-1 leading-tight ${servingsPerContainer ? "" : "hidden"}`, "class")}> ${servingsPerContainer} servings per container
</p> <div class="flex justify-between font-bold text-sm sm:text-base m-0 mb-2 leading-tight"> <span>Serving size</span> <span id="label-serving-size">${finalServingLabel}</span> </div> ${renderComponent($$result, "NutritionFactsDivider", $$NutritionFactsDivider, { "size": "thick" })} <div class="mt-1 mb-1"> <p class="font-bold text-[10px] sm:text-xs m-0 leading-tight">Amount per serving</p> <div class="flex justify-between items-end"> <h3 class="text-3xl sm:text-4xl font-black m-0 leading-none">Calories</h3> <span id="label-calories" class="text-3xl sm:text-4xl font-black m-0 leading-none">${caloriesStr}</span> </div> </div> ${renderComponent($$result, "NutritionFactsDivider", $$NutritionFactsDivider, { "size": "medium" })} <div class="text-right text-xs font-bold py-1">
% Daily Value*
</div> <div id="label-rows-container"> ${rows.map((row) => renderTemplate`${renderComponent($$result, "NutritionFactsRow", $$NutritionFactsRow, { ...row })}`)} </div> ${renderComponent($$result, "NutritionFactsFootnote", $$NutritionFactsFootnote, {})} </div> <div id="label-warnings-container"> ${renderComponent($$result, "NutritionFactsWarning", $$NutritionFactsWarning, { "warnings": allWarnings, "partialData": partialData })} </div> </div> ${renderScript($$result, "C:/fnc/src/components/nutrition-label/NutritionFactsLabel.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/fnc/src/components/nutrition-label/NutritionFactsLabel.astro", void 0);

const $$RecipeCalculatorShell = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="py-12 bg-warm-ivory relative z-10 min-h-screen" data-astro-cid-3gcv7j2p> <div class="max-w-[1200px] mx-auto px-4 md:px-6" data-astro-cid-3gcv7j2p> <!-- Step Indicator --> <div class="flex items-center justify-center gap-4 md:gap-8 mb-8 text-[11px] font-bold uppercase tracking-widest text-soft-slate" data-astro-cid-3gcv7j2p> <span class="flex items-center gap-2" data-astro-cid-3gcv7j2p><span class="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-ink-navy" data-astro-cid-3gcv7j2p>1</span> Paste recipe</span> <span class="w-8 h-px bg-slate-200 hidden sm:block" data-astro-cid-3gcv7j2p></span> <span class="flex items-center gap-2" data-astro-cid-3gcv7j2p><span class="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-ink-navy" data-astro-cid-3gcv7j2p>2</span> Review matches</span> <span class="w-8 h-px bg-slate-200 hidden sm:block" data-astro-cid-3gcv7j2p></span> <span class="flex items-center gap-2" data-astro-cid-3gcv7j2p><span class="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-ink-navy" data-astro-cid-3gcv7j2p>3</span> See totals</span> </div> <div class="grid grid-cols-1 lg:grid-cols-12 gap-8" data-astro-cid-3gcv7j2p> <!-- Input Section (Left) --> <div class="lg:col-span-7 flex flex-col gap-6" data-astro-cid-3gcv7j2p> <div class="bg-white rounded-[var(--radius-card)] shadow-soft border border-border-soft overflow-hidden" data-astro-cid-3gcv7j2p> <div class="p-6 md:p-8 bg-white relative" data-astro-cid-3gcv7j2p> <div class="mb-4 text-[13px] text-soft-slate" data-astro-cid-3gcv7j2p> <p data-astro-cid-3gcv7j2p>AI helps read your text. Final totals come from food data.</p> </div> <form id="recipe-form" class="space-y-5" data-astro-cid-3gcv7j2p> <div data-astro-cid-3gcv7j2p> <label for="recipe-name" class="block text-[11px] font-bold text-ink-navy uppercase tracking-widest mb-2" data-astro-cid-3gcv7j2p>Recipe Name (Optional)</label> <input type="text" id="recipe-name" placeholder="e.g. Protein Oat Bowl" class="w-full h-14 px-4 rounded-[var(--radius-button)] bg-white border border-border-soft text-ink-navy placeholder-soft-slate focus-premium transition-shadow shadow-sm text-base" data-astro-cid-3gcv7j2p> </div> <div data-astro-cid-3gcv7j2p> <div class="flex items-center justify-between mb-2" data-astro-cid-3gcv7j2p> <label for="recipe-ingredients" class="block text-[11px] font-bold text-ink-navy uppercase tracking-widest" data-astro-cid-3gcv7j2p>Ingredients</label> <span class="text-[10px] uppercase font-bold tracking-widest text-usda-emerald bg-mint-wash px-2 py-0.5 rounded border border-emerald-soft" data-astro-cid-3gcv7j2p>1 per line</span> </div> <textarea id="recipe-ingredients" rows="6" placeholder="1 cup rolled oats
1 banana
2 tbsp peanut butter
1 cup whole milk
1 scoop protein powder" class="w-full p-4 rounded-[var(--radius-button)] bg-white border border-border-soft text-ink-navy placeholder-soft-slate focus-premium transition-shadow shadow-sm resize-y text-base leading-relaxed" data-astro-cid-3gcv7j2p></textarea> </div> <div data-astro-cid-3gcv7j2p> <label for="recipe-servings" class="block text-[11px] font-bold text-ink-navy uppercase tracking-widest mb-2" data-astro-cid-3gcv7j2p>Servings / Yield</label> <input type="number" id="recipe-servings" value="2" min="1" max="100" class="w-full sm:w-1/3 h-14 px-4 rounded-[var(--radius-button)] bg-white border border-border-soft text-ink-navy focus-premium transition-shadow shadow-sm text-base font-bold" data-astro-cid-3gcv7j2p> </div> <div class="flex flex-wrap items-center gap-3 pt-6 border-t border-border-soft" data-astro-cid-3gcv7j2p> <button type="submit" id="parse-recipe-btn" class="h-14 px-8 rounded-[var(--radius-button)] bg-ink-navy text-white text-[15px] font-semibold hover:bg-deep-slate transition-colors disabled:opacity-50 shadow-ink hover:shadow-premium interactive-button" data-astro-cid-3gcv7j2p>
Analyze Recipe
</button> <button type="button" id="example-recipe-btn" class="text-[11px] font-bold tracking-widest uppercase text-usda-emerald hover:text-fresh-leaf hover:underline px-4 py-2 interactive-button" data-astro-cid-3gcv7j2p>
Use example
</button> <button type="button" id="clear-recipe-btn" class="text-[11px] font-bold tracking-widest uppercase text-soft-slate hover:text-ink-navy px-4 py-2 hidden ml-auto interactive-button" data-astro-cid-3gcv7j2p>
Clear
</button> </div> <div id="recipe-error" class="hidden mt-4 p-4 bg-red-50 text-red-700 text-[13px] font-medium rounded-[var(--radius-button)] border border-red-100 flex items-start gap-2" data-astro-cid-3gcv7j2p> <svg class="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-3gcv7j2p><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-astro-cid-3gcv7j2p></path></svg> <span class="message-text" data-astro-cid-3gcv7j2p></span> </div> </form> </div> </div> <div id="review-section" class="bg-white rounded-[var(--radius-card)] shadow-soft border border-border-soft overflow-hidden hidden flex-col" data-astro-cid-3gcv7j2p> <div class="p-6 md:p-8 border-b border-border-soft bg-slate-50 flex justify-between items-center" data-astro-cid-3gcv7j2p> <div data-astro-cid-3gcv7j2p> <h3 class="text-lg font-bold text-ink-navy" data-astro-cid-3gcv7j2p>Review matches</h3> <p class="text-xs text-soft-slate mt-1" data-astro-cid-3gcv7j2p>Check the food matches and amounts before calculating totals.</p> </div> <span id="provider-notice" class="text-[10px] uppercase font-bold tracking-widest bg-amber-100 text-amber-800 border border-amber-200 px-2 py-1 rounded hidden" data-astro-cid-3gcv7j2p></span> </div> <div class="p-6 md:p-8 max-h-[600px] overflow-y-auto custom-scrollbar bg-white" id="ingredients-list" data-astro-cid-3gcv7j2p> <!-- Cards go here --> </div> </div> </div> <!-- Results Section (Right) --> <div class="lg:col-span-5 flex flex-col gap-6 relative" data-astro-cid-3gcv7j2p> <div class="sticky top-28 space-y-6" data-astro-cid-3gcv7j2p> <div id="totals-empty-state" class="bg-white rounded-[var(--radius-card)] border border-border-soft shadow-soft p-8 text-center text-soft-slate" data-astro-cid-3gcv7j2p> <svg class="w-12 h-12 mx-auto mb-4 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-3gcv7j2p><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-astro-cid-3gcv7j2p></path></svg> <p class="font-bold text-ink-navy mb-1" data-astro-cid-3gcv7j2p>Paste ingredients to begin.</p> <p class="text-sm" data-astro-cid-3gcv7j2p>Use one ingredient per line. You can review matches before totals are calculated.</p> </div> <div id="totals-dashboard" class="hidden space-y-6" data-astro-cid-3gcv7j2p> <div class="bg-ink-navy text-white rounded-[var(--radius-card)] p-8 shadow-premium overflow-hidden relative" data-astro-cid-3gcv7j2p> <div class="absolute -right-12 -top-12 w-48 h-48 bg-usda-emerald rounded-full opacity-20 blur-3xl" data-astro-cid-3gcv7j2p></div> <h3 class="text-white/70 text-[11px] font-bold uppercase tracking-widest mb-3 relative z-10 flex items-center gap-2" data-astro-cid-3gcv7j2p>
Per Serving
<span class="bg-white/10 text-white px-2 py-0.5 rounded text-[9px]" data-astro-cid-3gcv7j2p><span id="serving-divider-label" data-astro-cid-3gcv7j2p>2</span> servings</span> </h3> <div class="flex items-baseline gap-2 relative z-10 mb-6" data-astro-cid-3gcv7j2p> <div class="text-5xl font-black tracking-tighter" id="ps-cals" data-astro-cid-3gcv7j2p>0</div> <div class="text-white/60 font-semibold" data-astro-cid-3gcv7j2p>kcal</div> </div> <div class="grid grid-cols-3 gap-4 border-t border-white/20 pt-6 relative z-10" data-astro-cid-3gcv7j2p> <div data-astro-cid-3gcv7j2p> <div class="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5" data-astro-cid-3gcv7j2p>Protein</div> <div class="font-black text-xl" data-astro-cid-3gcv7j2p><span id="ps-pro" data-astro-cid-3gcv7j2p>0</span><span class="text-sm font-medium text-white/60 ml-0.5" data-astro-cid-3gcv7j2p>g</span></div> </div> <div data-astro-cid-3gcv7j2p> <div class="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5" data-astro-cid-3gcv7j2p>Carbs</div> <div class="font-black text-xl" data-astro-cid-3gcv7j2p><span id="ps-carbs" data-astro-cid-3gcv7j2p>0</span><span class="text-sm font-medium text-white/60 ml-0.5" data-astro-cid-3gcv7j2p>g</span></div> </div> <div data-astro-cid-3gcv7j2p> <div class="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1.5" data-astro-cid-3gcv7j2p>Fat</div> <div class="font-black text-xl" data-astro-cid-3gcv7j2p><span id="ps-fat" data-astro-cid-3gcv7j2p>0</span><span class="text-sm font-medium text-white/60 ml-0.5" data-astro-cid-3gcv7j2p>g</span></div> </div> </div> </div> <div class="mt-4 transform -rotate-1 hover:rotate-0 transition-transform duration-300" data-astro-cid-3gcv7j2p> ${renderComponent($$result, "NutritionFactsLabel", $$NutritionFactsLabel, { "title": "Nutrition Facts", "servingLabel": "1 serving", "nutrients": {
    calories: null,
    protein: null,
    carbohydrates: null,
    fat: null,
    fiber: null,
    sugar: null,
    sodium: null
  }, "data-astro-cid-3gcv7j2p": true })} <p class="text-[10px] text-center text-soft-slate mt-2" data-astro-cid-3gcv7j2p>For personal planning only. Not a commercial packaging label.</p> </div> <details class="bg-white rounded-[var(--radius-card)] border border-border-soft shadow-soft group" data-astro-cid-3gcv7j2p> <summary class="p-4 font-bold text-sm text-ink-navy cursor-pointer list-none flex items-center justify-between outline-none focus-visible:ring-2 focus-visible:ring-usda-emerald" data-astro-cid-3gcv7j2p>
Show ingredient breakdown
<svg class="w-5 h-5 text-soft-slate group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-3gcv7j2p><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-3gcv7j2p></path></svg> </summary> <div class="p-6 border-t border-border-soft" data-astro-cid-3gcv7j2p> <h4 class="text-[11px] font-bold uppercase tracking-widest mb-3 text-ink-navy" data-astro-cid-3gcv7j2p>Total Recipe Nutrition</h4> <div class="space-y-3 text-sm mb-6" data-astro-cid-3gcv7j2p> <div class="flex justify-between items-center" data-astro-cid-3gcv7j2p> <span class="text-soft-slate font-medium" data-astro-cid-3gcv7j2p>Calories</span> <span class="font-black text-ink-navy" id="tot-cals" data-astro-cid-3gcv7j2p>0</span> </div> <div class="flex justify-between items-center" data-astro-cid-3gcv7j2p> <span class="text-soft-slate font-medium" data-astro-cid-3gcv7j2p>Protein</span> <span class="font-bold text-ink-navy" data-astro-cid-3gcv7j2p><span id="tot-pro" data-astro-cid-3gcv7j2p>0</span>g</span> </div> <div class="flex justify-between items-center" data-astro-cid-3gcv7j2p> <span class="text-soft-slate font-medium" data-astro-cid-3gcv7j2p>Carbs</span> <span class="font-bold text-ink-navy" data-astro-cid-3gcv7j2p><span id="tot-carbs" data-astro-cid-3gcv7j2p>0</span>g</span> </div> <div class="flex justify-between items-center" data-astro-cid-3gcv7j2p> <span class="text-soft-slate font-medium" data-astro-cid-3gcv7j2p>Fat</span> <span class="font-bold text-ink-navy" data-astro-cid-3gcv7j2p><span id="tot-fat" data-astro-cid-3gcv7j2p>0</span>g</span> </div> <div class="flex justify-between items-center pt-3 border-t border-border-soft mt-1" data-astro-cid-3gcv7j2p> <span class="text-soft-slate font-medium" data-astro-cid-3gcv7j2p>Fiber</span> <span class="font-bold text-ink-navy" data-astro-cid-3gcv7j2p><span id="tot-fib" data-astro-cid-3gcv7j2p>0</span>g</span> </div> <div class="flex justify-between items-center" data-astro-cid-3gcv7j2p> <span class="text-soft-slate font-medium" data-astro-cid-3gcv7j2p>Sugar</span> <span class="font-bold text-ink-navy" data-astro-cid-3gcv7j2p><span id="tot-sug" data-astro-cid-3gcv7j2p>0</span>g</span> </div> <div class="flex justify-between items-center" data-astro-cid-3gcv7j2p> <span class="text-soft-slate font-medium" data-astro-cid-3gcv7j2p>Sodium</span> <span class="font-bold text-ink-navy" data-astro-cid-3gcv7j2p><span id="tot-sod" data-astro-cid-3gcv7j2p>0</span>mg</span> </div> </div> <div class="bg-slate-50 rounded p-4 text-[11px] text-soft-slate leading-relaxed font-medium" data-astro-cid-3gcv7j2p> <p data-astro-cid-3gcv7j2p>USDA data is used when available. Local estimates are clearly labeled. AI may help parse text but does not calculate final totals.</p> </div> </div> </details> </div> </div> </div> </div> </div> </section>  ${renderScript($$result, "C:/fnc/src/components/recipe/RecipeCalculatorShell.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/fnc/src/components/recipe/RecipeCalculatorShell.astro", void 0);

const $$RecipeNutritionCalculator = createComponent(($$result, $$props, $$slots) => {
  const title = "Recipe Nutrition Calculator | Calories & Macros Per Serving";
  const description = "Paste recipe ingredients, set servings, and estimate total and per-serving calories, macros, and nutrition facts with source-labeled values.";
  const jsonLd = buildSoftwareApplicationSchema({
    name: "Recipe Nutrition Calculator",
    description,
    url: `${siteConfig.siteUrl}/recipe-nutrition-calculator`
  });
  return renderTemplate`${renderComponent($$result, "SiteLayout", $$SiteLayout, { "title": title, "description": description, "jsonLd": jsonLd }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "RecipeHero", $$RecipeHero, {})} ${renderComponent($$result2, "RecipeCalculatorShell", $$RecipeCalculatorShell, {})} ` })}`;
}, "C:/fnc/src/pages/recipe-nutrition-calculator.astro", void 0);

const $$file = "C:/fnc/src/pages/recipe-nutrition-calculator.astro";
const $$url = "/recipe-nutrition-calculator";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$RecipeNutritionCalculator,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
