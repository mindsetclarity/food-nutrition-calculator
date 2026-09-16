import { c as createComponent } from './astro-component_DEMRXoVo.mjs';
import 'piccolore';
import { m as maybeRenderHead, k as renderTemplate, o as renderComponent } from './entrypoint_DdV4XD_W.mjs';
import { $ as $$SiteLayout } from './SiteLayout_B-r8uoSu.mjs';
import { $ as $$PageHeader } from './PageHeader_BHzF09sN.mjs';
import { r as renderScript } from './SeoHead_BfjWHf_w.mjs';
import 'clsx';
import { t as templateEnter, a as templateExit } from './template-depth_BXgNZiNr.mjs';
import { a as buildSoftwareApplicationSchema } from './schema_D9quHZ4m.mjs';
import { s as siteConfig } from './siteConfig_IkrsgOX8.mjs';

const $$CompareSearchPanel = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="luxury-card overflow-hidden bg-pure-card relative z-20"> <div class="p-6 md:p-8 bg-white/50 border-b border-border-soft"> <div class="flex items-center justify-between mb-2"> <h3 class="text-[11px] font-bold text-ink-navy uppercase tracking-widest flex items-center gap-2"> <svg class="w-4 h-4 text-usda-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
Food Search
</h3> <span class="text-[10px] uppercase font-bold tracking-widest text-usda-emerald bg-mint-wash px-2 py-0.5 rounded border border-emerald-soft">USDA First</span> </div> <p class="text-[13px] text-soft-slate font-medium mb-6">Search for up to 4 foods to compare side-by-side.</p> <div class="relative"> <label for="compare-search" class="sr-only">Search foods</label> <input type="search" id="compare-search" class="block w-full h-14 pl-5 pr-12 text-[15px] border border-border-soft rounded-[var(--radius-button)] bg-white focus-premium transition-shadow text-ink-navy placeholder-soft-slate shadow-sm" placeholder="Type a food (e.g. oats, almond milk)..." autocomplete="off"> <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none"> <svg class="h-5 w-5 text-soft-slate" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> </div> <div id="compare-search-results" class="absolute z-50 mt-2 w-full bg-white rounded-[var(--radius-card)] shadow-premium border border-border-soft overflow-hidden hidden max-h-96 overflow-y-auto custom-scrollbar"> <div id="compare-search-loading" class="hidden p-8 text-center text-soft-slate text-[13px] font-medium flex flex-col items-center"> <svg class="animate-spin h-6 w-6 text-usda-emerald mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg>
Searching USDA Database...
</div> <ul id="compare-search-list" class="divide-y divide-border-soft"></ul> </div> </div> <p id="compare-limit-warning" class="hidden mt-3 text-[13px] font-medium text-amber-700 bg-amber-50 px-4 py-2 rounded-[var(--radius-button)] border border-amber-200">
You can compare up to 4 foods at once. Remove one to add another.
</p> </div> </div>`;
}, "C:/fnc/src/components/compare/CompareSearchPanel.astro", void 0);

const $$CompareExampleButtons = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="mt-4"> <div class="flex items-center gap-3 mb-4"> <h3 class="text-[11px] uppercase tracking-widest font-bold text-ink-navy">Quick Comparisons</h3> <div class="h-px bg-border-soft flex-1"></div> </div> <div class="flex flex-col gap-3"> <button type="button" class="compare-example-btn group flex justify-between items-center px-5 py-4 bg-white border border-border-soft rounded-[var(--radius-button)] hover:bg-slate-50 transition-colors shadow-sm" data-q1="rolled oats" data-q2="quinoa"> <div class="flex flex-col text-left"> <span class="text-[13px] font-bold text-ink-navy group-hover:text-usda-emerald transition-colors">Oats vs Quinoa</span> <span class="text-[11px] font-medium text-soft-slate">Compare grains</span> </div> <svg class="w-5 h-5 text-soft-slate group-hover:text-usda-emerald transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg> </button> <button type="button" class="compare-example-btn group flex justify-between items-center px-5 py-4 bg-white border border-border-soft rounded-[var(--radius-button)] hover:bg-slate-50 transition-colors shadow-sm" data-q1="whole milk" data-q2="almond milk"> <div class="flex flex-col text-left"> <span class="text-[13px] font-bold text-ink-navy group-hover:text-usda-emerald transition-colors">Whole Milk vs Almond Milk</span> <span class="text-[11px] font-medium text-soft-slate">Compare dairy & plant milks</span> </div> <svg class="w-5 h-5 text-soft-slate group-hover:text-usda-emerald transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg> </button> <button type="button" class="compare-example-btn group flex justify-between items-center px-5 py-4 bg-white border border-border-soft rounded-[var(--radius-button)] hover:bg-slate-50 transition-colors shadow-sm" data-q1="peanut butter" data-q2="almond butter"> <div class="flex flex-col text-left"> <span class="text-[13px] font-bold text-ink-navy group-hover:text-usda-emerald transition-colors">Peanut Butter vs Almond Butter</span> <span class="text-[11px] font-medium text-soft-slate">Compare nut butters</span> </div> <svg class="w-5 h-5 text-soft-slate group-hover:text-usda-emerald transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg> </button> </div> </div>`;
}, "C:/fnc/src/components/compare/CompareExampleButtons.astro", void 0);

const $$SelectedCompareFoodCard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="selected-foods-container" class="hidden grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-2"></div> <template id="selected-food-template">${templateEnter()} <div class="luxury-card bg-pure-card p-5 relative group border border-border-soft overflow-hidden"> <button type="button" class="remove-food-btn absolute top-3 right-3 text-soft-slate hover:text-red-600 bg-white hover:bg-red-50 w-8 h-8 flex items-center justify-center rounded-full transition-colors opacity-50 group-hover:opacity-100 shadow-sm border border-border-soft tap-target z-10" aria-label="Remove food"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg> </button> <div class="pr-8"> <h3 class="food-name font-bold text-ink-navy text-[15px] mb-3 leading-snug line-clamp-2">Name</h3> <div class="flex items-end gap-4 mb-4"> <div> <span class="text-[10px] font-bold uppercase tracking-widest text-soft-slate block mb-1">Calories</span> <div class="flex items-baseline"> <span class="food-cals text-2xl font-black text-ink-navy leading-none">0</span> <span class="text-[11px] font-bold uppercase tracking-widest text-soft-slate ml-1">kcal</span> </div> </div> <div> <span class="text-[10px] font-bold uppercase tracking-widest text-soft-slate block mb-1">Protein</span> <div class="flex items-baseline"> <span class="food-pro text-xl font-bold text-ink-navy leading-none">0</span> <span class="text-[11px] font-bold uppercase tracking-widest text-soft-slate ml-1">g</span> </div> </div> </div> <div class="source-badge-container"></div> </div> </div> ${templateExit()}</template>`;
}, "C:/fnc/src/components/compare/SelectedCompareFoodCard.astro", void 0);

const $$CompareBasisToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="compare-basis-control" class="hidden justify-center my-6"> <div class="bg-slate-100 p-1 rounded-[var(--radius-button)] inline-flex border border-border-soft shadow-inner"> <button type="button" class="basis-btn bg-ink-navy text-white shadow-ink px-6 py-2.5 rounded-[var(--radius-button)] text-[13px] font-bold transition-all tap-target" data-basis="100g">
Per 100g
</button> <button type="button" class="basis-btn text-soft-slate hover:text-ink-navy hover:bg-slate-100 px-6 py-2.5 rounded-[var(--radius-button)] text-[13px] font-bold transition-all tap-target" data-basis="serving">
Per Serving
</button> </div> </div>`;
}, "C:/fnc/src/components/compare/CompareBasisToggle.astro", void 0);

const $$CompareNutritionTable = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="compare-table-container" class="hidden bg-pure-card rounded-[var(--radius-card)] shadow-sm border border-border-soft overflow-x-auto custom-scrollbar luxury-card mb-8"> <table class="min-w-full divide-y divide-border-soft"> <thead id="compare-table-head" class="bg-slate-50"> <!-- Injected --> </thead> <tbody id="compare-table-body" class="bg-white divide-y divide-border-soft"> <!-- Injected --> </tbody> </table> </div>`;
}, "C:/fnc/src/components/compare/CompareNutritionTable.astro", void 0);

const $$CompareDifferenceSummary = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="compare-difference-summary" class="hidden mb-8"> <h3 class="text-[11px] uppercase tracking-widest font-bold text-ink-navy mb-4 flex items-center gap-2"> <svg class="w-4 h-4 text-usda-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
Key Differences
</h3> <div id="compare-insights-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"> <!-- Injected --> </div> </div>`;
}, "C:/fnc/src/components/compare/CompareDifferenceSummary.astro", void 0);

const $$CompareSourceSummary = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="compare-source-summary" class="hidden text-center bg-white border border-border-soft rounded-[var(--radius-button)] py-4 shadow-sm mb-12"> <p id="source-summary-text" class="text-[11px] font-bold text-soft-slate uppercase tracking-widest">
Comparing 0 foods: 0 USDA
</p> </div>`;
}, "C:/fnc/src/components/compare/CompareSourceSummary.astro", void 0);

const $$CompareEmptyState = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="compare-empty-state" class="luxury-card bg-pure-card p-12 md:p-20 text-center flex flex-col items-center"> <div class="w-24 h-24 bg-mint-wash rounded-full flex items-center justify-center mb-6 border border-emerald-soft text-4xl">
⚖️
</div> <h2 class="text-2xl font-bold text-ink-navy tracking-tight mb-3">Compare Foods Side-by-Side</h2> <p class="text-[15px] text-soft-slate max-w-md mx-auto leading-relaxed">
Search and add up to 4 foods to see how their calories, protein, carbs, and fat stack up against each other.
</p> </div>`;
}, "C:/fnc/src/components/compare/CompareEmptyState.astro", void 0);

const $$CompareNotice = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="compare-notice" class="hidden mb-8 bg-amber-50 rounded-[var(--radius-card)] p-6 border border-amber-200"> <div class="flex items-start"> <div class="flex-shrink-0"> <svg class="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path> </svg> </div> <div class="ml-4"> <h3 class="text-[11px] font-bold text-amber-800 uppercase tracking-widest mb-2">Attention Required</h3> <div class="mt-2 text-[14px] font-medium text-amber-700"> <ul id="compare-warnings-list" class="list-disc pl-5 space-y-1"></ul> </div> </div> </div> </div>`;
}, "C:/fnc/src/components/compare/CompareNotice.astro", void 0);

const $$CompareFoodsShell = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<main id="main-content" class="min-h-screen bg-warm-ivory pb-24 relative z-10"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20"> <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"> <!-- Search Column --> <div class="lg:col-span-5 flex flex-col gap-8"> ${renderComponent($$result, "CompareSearchPanel", $$CompareSearchPanel, {})} ${renderComponent($$result, "CompareExampleButtons", $$CompareExampleButtons, {})} </div> <!-- Content Column --> <div class="lg:col-span-7 flex flex-col gap-6"> ${renderComponent($$result, "SelectedCompareFoodCard", $$SelectedCompareFoodCard, {})} ${renderComponent($$result, "CompareBasisToggle", $$CompareBasisToggle, {})} ${renderComponent($$result, "CompareNotice", $$CompareNotice, {})} ${renderComponent($$result, "CompareEmptyState", $$CompareEmptyState, {})} ${renderComponent($$result, "CompareNutritionTable", $$CompareNutritionTable, {})} ${renderComponent($$result, "CompareDifferenceSummary", $$CompareDifferenceSummary, {})} ${renderComponent($$result, "CompareSourceSummary", $$CompareSourceSummary, {})} </div> </div> </div> </main> ${renderScript($$result, "C:/fnc/src/components/compare/CompareFoodsShell.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/fnc/src/components/compare/CompareFoodsShell.astro", void 0);

const $$CompareFoods = createComponent(($$result, $$props, $$slots) => {
  const title = "Compare Foods | Side-by-Side Nutrition Comparison";
  const description = "Compare calories, protein, carbs, fat, and micronutrients of two foods side-by-side using USDA-first nutrition data.";
  const jsonLd = buildSoftwareApplicationSchema({
    name: "Compare Foods",
    description,
    url: `${siteConfig.siteUrl}/compare-foods`
  });
  return renderTemplate`${renderComponent($$result, "SiteLayout", $$SiteLayout, { "title": title, "description": description, "jsonLd": jsonLd }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHeader", $$PageHeader, { "title": "Compare Foods", "description": "See exactly how two foods differ in calories and macros. No judgments, just deterministic facts.", "breadcrumbs": [{ label: "Compare Foods" }], "chipType": "compare" })} ${renderComponent($$result2, "CompareFoodsShell", $$CompareFoodsShell, {})} ` })}`;
}, "C:/fnc/src/pages/compare-foods.astro", void 0);

const $$file = "C:/fnc/src/pages/compare-foods.astro";
const $$url = "/compare-foods";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CompareFoods,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
