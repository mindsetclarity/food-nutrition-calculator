import { c as createComponent } from './astro-component_DnVRAbcp.mjs';
import 'piccolore';
import { m as maybeRenderHead, k as renderTemplate, h as addAttribute, o as renderComponent } from './entrypoint_D0oTHkUW.mjs';
import { $ as $$SiteLayout } from './SiteLayout_YHvHq5NO.mjs';
import { $ as $$PageHeader } from './PageHeader_HYTGeVGt.mjs';
import 'clsx';
import { r as renderScript } from './SeoHead_Bz2tiSQZ.mjs';
import { g as getAllFoodPages } from './foodPageData_C_HatsBl.mjs';
import { a as buildWebPageSchema } from './schema_D8-JCEV_.mjs';
import { s as siteConfig } from './siteConfig_Bc-3p4QP.mjs';

const $$FoodSearchFilter = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="mb-8"> <label for="directory-search" class="sr-only">Search directory</label> <div class="relative"> <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none"> <svg class="h-5 w-5 text-soft-slate" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> </div> <input type="search" id="directory-search" class="block w-full pl-12 pr-4 h-14 text-[15px] border border-border-soft rounded-[var(--radius-button)] bg-white focus-premium transition-shadow text-ink-navy placeholder-soft-slate shadow-sm" placeholder="Filter foods..."> </div> </div> ${renderScript($$result, "C:/foodnutritioncalculator.com/src/components/foods/FoodSearchFilter.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/foodnutritioncalculator.com/src/components/foods/FoodSearchFilter.astro", void 0);

function getFoodsDirectorySeo() {
  return {
    title: "Food Nutrition Facts | Calories & Macros for Common Foods",
    description: "Browse calories, macros, serving sizes, and nutrition facts for common US foods. Use the calculator for USDA-first food nutrition search."
  };
}

function sortFoodsForDirectory(foods) {
  const safeFoods = Array.isArray(foods) ? foods : [];
  return [...safeFoods].sort((a, b) => {
    const nameA = String(a?.displayName || a?.name || "");
    const nameB = String(b?.displayName || b?.name || "");
    return nameA.localeCompare(nameB);
  });
}
function getUniqueCategories(foods) {
  const safeFoods = Array.isArray(foods) ? foods : [];
  const categories = new Set(
    safeFoods.map((food) => food?.category).filter((c) => Boolean(c))
  );
  return Array.from(categories).sort();
}

const $$FoodCategoryGrid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$FoodCategoryGrid;
  const { foods } = Astro2.props;
  const categories = getUniqueCategories(foods);
  return renderTemplate`${maybeRenderHead()}<div class="mb-4"> <div class="flex flex-wrap gap-2" id="category-filters"> <button type="button" class="category-filter-btn active bg-ink-navy text-white px-5 py-2 rounded-[var(--radius-button)] text-[11px] font-bold uppercase tracking-widest shadow-ink transition-all" data-category="all">
All
</button> ${categories.map((cat) => renderTemplate`<button type="button" class="category-filter-btn bg-slate-100 text-soft-slate hover:text-ink-navy hover:bg-slate-200 px-5 py-2 rounded-[var(--radius-button)] text-[11px] font-bold uppercase tracking-widest transition-colors"${addAttribute(cat.toLowerCase(), "data-category")}> ${cat} </button>`)} </div> </div> ${renderScript($$result, "C:/foodnutritioncalculator.com/src/components/foods/FoodCategoryGrid.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/foodnutritioncalculator.com/src/components/foods/FoodCategoryGrid.astro", void 0);

const $$FoodCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$FoodCard;
  const { food } = Astro2.props;
  const slug = food.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const url = `/foods/${slug}`;
  const protein = food.nutrientsPer100g?.protein || 0;
  const carbs = food.nutrientsPer100g?.carbohydrates || 0;
  const fat = food.nutrientsPer100g?.fat || 0;
  const calories = food.nutrientsPer100g?.calories || 0;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(url, "href")} class="food-card group luxury-card bg-white p-6 relative border border-border-soft flex flex-col hover:-translate-y-1 transition-all duration-300"${addAttribute(food.name.toLowerCase(), "data-name")}${addAttribute((food.category || "").toLowerCase(), "data-category")}> <div class="flex justify-between items-start mb-4"> <div class="pr-4"> <h3 class="text-[15px] font-bold text-ink-navy group-hover:text-usda-emerald transition-colors leading-snug line-clamp-2"> ${food.name} </h3> ${food.category && renderTemplate`<span class="text-[11px] font-medium text-soft-slate mt-1 block uppercase tracking-wider">${food.category}</span>`} </div> <!-- We can use a simple mini ring if we want, but since MacroRing expects a big size, let's just do a tiny CSS ring or simple numbers. Let's just use simple numbers here for cards. --> <div class="text-right shrink-0 bg-slate-50 p-2 rounded"> <div class="text-[10px] font-bold uppercase tracking-widest text-soft-slate">Per 100g</div> <div class="flex items-baseline justify-end"> <span class="text-xl font-black text-ink-navy">${Math.round(calories)}</span> </div> </div> </div> <div class="mt-auto pt-4 border-t border-border-soft grid grid-cols-3 gap-2"> <div> <div class="text-[10px] uppercase font-bold tracking-widest text-soft-slate mb-1">Protein</div> <div class="text-[13px] font-bold text-ink-navy">${Number(protein).toFixed(1)}<span class="text-soft-slate font-medium ml-0.5">g</span></div> </div> <div> <div class="text-[10px] uppercase font-bold tracking-widest text-soft-slate mb-1">Carbs</div> <div class="text-[13px] font-bold text-ink-navy">${Number(carbs).toFixed(1)}<span class="text-soft-slate font-medium ml-0.5">g</span></div> </div> <div> <div class="text-[10px] uppercase font-bold tracking-widest text-soft-slate mb-1">Fat</div> <div class="text-[13px] font-bold text-ink-navy">${Number(fat).toFixed(1)}<span class="text-soft-slate font-medium ml-0.5">g</span></div> </div> </div> <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"> <svg class="w-5 h-5 text-usda-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg> </div> </a>`;
}, "C:/foodnutritioncalculator.com/src/components/foods/FoodCard.astro", void 0);

const $$FoodEmptyState = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="food-empty-state" class="hidden luxury-card bg-pure-card p-12 md:p-20 text-center border border-border-soft flex flex-col items-center"> <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-5 text-3xl">
🔍
</div> <h2 class="text-xl font-bold text-ink-navy mb-2">No local foods match your filter</h2> <p class="text-[15px] text-soft-slate max-w-md mx-auto mb-6">
The directory only shows a subset of our fallback database. For the full USDA database, use the calculator.
</p> <a href="/calculator" class="inline-flex items-center justify-center px-6 py-3 bg-ink-navy text-white text-[13px] font-bold tracking-widest uppercase rounded-[var(--radius-button)] hover:bg-deep-slate transition-colors shadow-sm">
Open Calculator
</a> </div>`;
}, "C:/foodnutritioncalculator.com/src/components/foods/FoodEmptyState.astro", void 0);

const $$FoodsDirectoryShell = createComponent(($$result, $$props, $$slots) => {
  const foods = sortFoodsForDirectory(getAllFoodPages());
  return renderTemplate`${maybeRenderHead()}<main id="main-content" class="min-h-screen bg-warm-ivory pb-24 relative z-10"> <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20"> <div class="luxury-card bg-pure-card overflow-hidden"> <div class="p-6 md:p-8 bg-white/50 border-b border-border-soft"> ${renderComponent($$result, "FoodSearchFilter", $$FoodSearchFilter, {})} ${renderComponent($$result, "FoodCategoryGrid", $$FoodCategoryGrid, { "foods": foods })} </div> <div class="p-6 md:p-8"> <div id="food-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> ${foods.map((food) => renderTemplate`${renderComponent($$result, "FoodCard", $$FoodCard, { "food": food })}`)} </div> ${renderComponent($$result, "FoodEmptyState", $$FoodEmptyState, {})} </div> </div> </section>  <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-center border-t border-border-soft pt-12"> <div class="bg-white rounded-[var(--radius-card)] p-8 sm:p-10 shadow-sm border border-border-soft"> <h3 class="text-[15px] font-bold text-ink-navy mb-3">About These Values</h3> <p class="text-soft-slate text-[13px] font-medium leading-relaxed mb-6 max-w-2xl mx-auto">
These food pages use the local fallback database for common foods. Nutrition values are estimates and can vary by brand, preparation method, and serving size. Use the calculator for USDA-first live search where available.
</p> <div class="flex flex-wrap justify-center gap-6 text-[13px] font-bold uppercase tracking-widest"> <a href="/calculator" class="text-usda-emerald hover:text-fresh-leaf transition-colors">Food Calculator</a> <a href="/recipe-nutrition-calculator" class="text-usda-emerald hover:text-fresh-leaf transition-colors">Recipe Calculator</a> <a href="/compare-foods" class="text-usda-emerald hover:text-fresh-leaf transition-colors">Compare Foods</a> <a href="/meal-calorie-calculator" class="text-usda-emerald hover:text-fresh-leaf transition-colors">Meal Calculator</a> </div> </div> </section> </main>`;
}, "C:/foodnutritioncalculator.com/src/components/foods/FoodsDirectoryShell.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const seo = getFoodsDirectorySeo();
  const jsonLd = buildWebPageSchema({
    name: "Food Nutrition Facts | Calories & Macros for Common Foods",
    description: "Browse calories, macros, serving sizes, and nutrition facts for common US foods. Use the calculator for USDA-first food nutrition search.",
    url: `${siteConfig.siteUrl}/foods`
  });
  return renderTemplate`${renderComponent($$result, "SiteLayout", $$SiteLayout, { "title": seo.title, "description": seo.description, "jsonLd": jsonLd }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHeader", $$PageHeader, { "title": "Nutrition Directory", "description": "Browse common foods in our deterministic database. Fast, exact, and judgment-free.", "breadcrumbs": [{ label: "Directory" }], "chipType": "foods" })} ${renderComponent($$result2, "FoodsDirectoryShell", $$FoodsDirectoryShell, {})} ` })}`;
}, "C:/foodnutritioncalculator.com/src/pages/foods/index.astro", void 0);

const $$file = "C:/foodnutritioncalculator.com/src/pages/foods/index.astro";
const $$url = "/foods";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
