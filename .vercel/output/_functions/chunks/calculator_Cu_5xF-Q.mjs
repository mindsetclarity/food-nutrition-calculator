import { c as createComponent } from './astro-component_DEMRXoVo.mjs';
import 'piccolore';
import { m as maybeRenderHead, k as renderTemplate, u as unescapeHTML, o as renderComponent } from './entrypoint_DdV4XD_W.mjs';
import { $ as $$SiteLayout } from './SiteLayout_B-r8uoSu.mjs';
import 'clsx';
import { r as renderScript } from './SeoHead_BfjWHf_w.mjs';
import { b as buildFAQPageSchema, a as buildSoftwareApplicationSchema } from './schema_D9quHZ4m.mjs';
import { s as siteConfig } from './siteConfig_IkrsgOX8.mjs';

const $$CalculatorHero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="bg-white py-12 border-b border-border-soft"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <span class="text-[11px] font-bold text-usda-emerald uppercase tracking-widest mb-3 block">Food Nutrition Calculator</span> <h1 class="text-3xl md:text-4xl font-black text-ink-navy mb-4 tracking-tight">Calculate nutrition for one food or a full meal.</h1> <p class="text-[15px] text-soft-slate mb-6 max-w-2xl mx-auto leading-relaxed">
Search a food, choose the amount, and see calories, macros, and source-labeled nutrition totals.
</p> <div class="flex flex-wrap justify-center gap-3"> <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-mint-wash text-usda-emerald border border-emerald-soft rounded-full text-[10px] font-bold uppercase tracking-widest"> <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
USDA-first where available
</span> <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-soft-slate border border-border-soft rounded-full text-[10px] font-bold uppercase tracking-widest"> <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
Local estimates labeled
</span> </div> </div> </div>`;
}, "C:/fnc/src/components/calculator/CalculatorHero.astro", void 0);

const $$CalculatorShell = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="calculator" class="py-12 bg-warm-ivory relative z-10 min-h-screen"> <div class="max-w-[1200px] mx-auto px-4 md:px-6"> <!-- Step Indicator --> <div class="flex items-center justify-center gap-4 md:gap-8 mb-8 text-[11px] font-bold uppercase tracking-widest text-soft-slate"> <span class="flex items-center gap-2"><span class="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-ink-navy">1</span> Search</span> <span class="w-8 h-px bg-slate-200 hidden sm:block"></span> <span class="flex items-center gap-2"><span class="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-ink-navy">2</span> Add amount</span> <span class="w-8 h-px bg-slate-200 hidden sm:block"></span> <span class="flex items-center gap-2"><span class="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-ink-navy">3</span> Review totals</span> </div> <div class="grid grid-cols-1 lg:grid-cols-12 gap-8"> <!-- Input Section (Left Column) --> <div class="lg:col-span-7 flex flex-col gap-6"> <div class="bg-white rounded-[var(--radius-card)] shadow-soft border border-border-soft p-6 md:p-8"> <form id="calc-form" class="flex flex-col sm:flex-row gap-4"> <div class="flex-1 relative"> <label for="food-search" class="block text-[11px] font-bold text-ink-navy uppercase tracking-widest mb-2">Food Item</label> <div class="relative"> <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-soft-slate" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> <input type="text" id="food-search" placeholder="Search banana, oats, chicken breast, rice..." autocomplete="off" class="w-full h-14 pl-12 pr-4 rounded-[var(--radius-button)] bg-white border border-border-soft text-ink-navy placeholder-soft-slate focus-premium transition-shadow shadow-sm disabled:opacity-50 text-base"> </div> <div id="autocomplete-dropdown" class="absolute z-50 w-full mt-2 bg-white border border-border-soft rounded-xl shadow-premium max-h-80 overflow-y-auto hidden"> <!-- Results go here --> </div> </div> <div class="w-full sm:w-28 relative"> <label for="quantity" class="block text-[11px] font-bold text-ink-navy uppercase tracking-widest mb-2">Qty</label> <input type="number" id="quantity" min="0" step="any" class="w-full h-14 px-4 rounded-[var(--radius-button)] bg-white border border-border-soft text-ink-navy focus-premium transition-shadow shadow-sm disabled:opacity-50 text-base font-medium" disabled> </div> <div class="w-full sm:w-36 relative"> <label for="unit" class="block text-[11px] font-bold text-ink-navy uppercase tracking-widest mb-2">Unit</label> <select id="unit" class="w-full h-14 px-4 rounded-[var(--radius-button)] bg-white border border-border-soft text-ink-navy focus-premium transition-shadow shadow-sm appearance-none cursor-pointer disabled:opacity-50 text-base font-medium" disabled> <option value="">--</option> </select> <svg class="absolute right-4 top-[38px] w-4 h-4 text-soft-slate pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg> </div> <div class="w-full sm:w-auto flex items-end"> <button type="submit" id="add-btn" disabled class="w-full h-14 px-8 rounded-[var(--radius-button)] bg-ink-navy text-white font-medium hover:bg-deep-slate transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-ink hover:shadow-premium interactive-button text-base">
Add
</button> </div> </form> <div id="fallback-notice" class="text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 mt-4 p-3 rounded-[var(--radius-button)] hidden flex items-start gap-2"> <svg class="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> <span class="message-text"></span> </div> <div id="selected-food-info" class="hidden mt-6 p-4 bg-white border border-border-soft rounded-[var(--radius-button)] flex items-center justify-between shadow-sm"> <div class="flex items-center gap-3"> <div class="w-10 h-10 rounded-full bg-mint-wash text-usda-emerald flex items-center justify-center font-bold border border-emerald-soft text-lg">✓</div> <div> <div id="selected-food-name" class="font-bold text-ink-navy text-[15px]"></div> <div class="mt-1" id="selected-food-badge-container"></div> </div> </div> <button type="button" id="clear-selection-btn" class="text-xs font-semibold text-soft-slate hover:text-ink-navy px-3 py-1.5 rounded bg-slate-50 hover:bg-slate-100 transition-colors border border-border-soft">Change</button> </div> <div id="error-msg" class="text-red-700 text-sm mt-4 hidden bg-red-50 p-3 rounded-[var(--radius-button)] border border-red-100"></div> </div> <!-- Added Items List --> <div class="bg-white rounded-[var(--radius-card)] shadow-soft border border-border-soft overflow-hidden"> <div class="p-4 border-b border-border-soft bg-slate-50 flex items-center justify-between"> <h3 class="text-sm font-bold text-ink-navy">Selected Foods</h3> <button id="clear-all-btn" class="text-[11px] text-red-600 hover:text-red-700 hidden transition-colors font-bold uppercase tracking-wider bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded border border-red-100">Clear All</button> </div> <div class="responsive-table-wrap"> <table class="w-full text-left border-collapse min-w-[500px]"> <tbody id="meal-list" class="divide-y divide-border-soft text-[15px]"> <tr id="empty-state"> <td colspan="4" class="px-6 py-12 text-center text-soft-slate"> <p class="font-bold text-ink-navy text-base mb-1">Start by adding one food.</p> <p class="text-sm mb-6 max-w-sm mx-auto">Search for a food above, choose the amount, and your totals will appear here.</p> <div class="flex flex-wrap justify-center gap-2 max-w-md"> <span class="inline-block px-3 py-1 bg-slate-50 border border-border-soft rounded-full text-xs font-medium text-ink-navy">banana</span> <span class="inline-block px-3 py-1 bg-slate-50 border border-border-soft rounded-full text-xs font-medium text-ink-navy">oatmeal</span> <span class="inline-block px-3 py-1 bg-slate-50 border border-border-soft rounded-full text-xs font-medium text-ink-navy">Greek yogurt</span> <span class="inline-block px-3 py-1 bg-slate-50 border border-border-soft rounded-full text-xs font-medium text-ink-navy">brown rice</span> <span class="inline-block px-3 py-1 bg-slate-50 border border-border-soft rounded-full text-xs font-medium text-ink-navy">apple</span> </div> </td> </tr> </tbody> </table> </div> </div> </div> <!-- Results Section --> <div class="lg:col-span-5 flex flex-col gap-6 relative"> <div class="sticky top-28 space-y-6"> <div id="totals-empty-state" class="bg-white rounded-[var(--radius-card)] border border-border-soft shadow-soft p-8 text-center text-soft-slate"> <svg class="w-12 h-12 mx-auto mb-4 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> <p class="font-bold text-ink-navy mb-1">Add a food to see totals.</p> <p class="text-sm">Totals will appear here once you select your first item.</p> </div> <div id="totals-dashboard" class="hidden space-y-6"> <div class="bg-ink-navy text-white rounded-[var(--radius-card)] p-6 md:p-8 shadow-premium overflow-hidden relative"> <div class="absolute -right-12 -top-12 w-48 h-48 bg-usda-emerald rounded-full opacity-20 blur-3xl"></div> <h3 class="text-white/70 text-[11px] font-bold uppercase tracking-widest mb-2 relative z-10">Total Calories</h3> <div class="flex items-baseline gap-2 relative z-10"> <div class="text-5xl font-black tracking-tighter" id="total-cals">0</div> <div class="text-white/60 font-semibold">kcal</div> </div> </div> <div class="bg-white rounded-[var(--radius-card)] border border-border-soft shadow-soft p-6"> <h3 class="text-ink-navy text-sm font-bold mb-5 tracking-tight flex items-center justify-between">
Macronutrients
</h3> <div class="space-y-4"> <div> <div class="flex justify-between items-end mb-1.5"> <span class="text-soft-slate font-semibold text-sm">Protein</span> <span class="text-ink-navy font-black"><span id="total-protein">0</span><span class="text-sm text-soft-slate ml-0.5 font-bold">g</span></span> </div> <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden"> <div class="bg-usda-emerald h-2 rounded-full transition-all duration-700 ease-out" style="width: 0%" id="bar-protein"></div> </div> </div> <div> <div class="flex justify-between items-end mb-1.5"> <span class="text-soft-slate font-semibold text-sm">Carbs</span> <span class="text-ink-navy font-black"><span id="total-carbs">0</span><span class="text-sm text-soft-slate ml-0.5 font-bold">g</span></span> </div> <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden"> <div class="bg-nutrient-amber h-2 rounded-full transition-all duration-700 ease-out" style="width: 0%" id="bar-carbs"></div> </div> </div> <div> <div class="flex justify-between items-end mb-1.5"> <span class="text-soft-slate font-semibold text-sm">Fat</span> <span class="text-ink-navy font-black"><span id="total-fat">0</span><span class="text-sm text-soft-slate ml-0.5 font-bold">g</span></span> </div> <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden"> <div class="bg-berry-accent h-2 rounded-full transition-all duration-700 ease-out" style="width: 0%" id="bar-fat"></div> </div> </div> </div> </div> <details class="bg-white rounded-[var(--radius-card)] border border-border-soft shadow-soft group"> <summary class="p-4 font-bold text-sm text-ink-navy cursor-pointer list-none flex items-center justify-between outline-none focus-visible:ring-2 focus-visible:ring-usda-emerald">
Show detailed nutrients
<svg class="w-5 h-5 text-soft-slate group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg> </summary> <div class="p-6 border-t border-border-soft"> <div class="flex justify-between py-2 border-b border-border-soft text-sm"> <span class="text-soft-slate font-medium">Fiber</span> <span class="font-bold text-ink-navy"><span id="total-fiber">0</span>g</span> </div> <div class="flex justify-between py-2 border-b border-border-soft text-sm"> <span class="text-soft-slate font-medium">Sugar</span> <span class="font-bold text-ink-navy"><span id="total-sugar">0</span>g</span> </div> <div class="flex justify-between py-2 text-sm mb-4"> <span class="text-soft-slate font-medium">Sodium</span> <span class="font-bold text-ink-navy"><span id="total-sodium">0</span>mg</span> </div> <p class="text-[11px] text-soft-slate leading-relaxed font-medium bg-slate-50 p-3 rounded"> <strong class="text-ink-navy">Note:</strong> USDA data is used when available. Local estimates are clearly labeled.
</p> </div> </details> </div> </div> </div> </div> </div> </section> ${renderScript($$result, "C:/fnc/src/components/calculator/CalculatorShell.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/fnc/src/components/calculator/CalculatorShell.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$CalculatorSEOFAQ = createComponent(($$result, $$props, $$slots) => {
  const faqs = [
    {
      question: "How do I use a nutrition calculator?",
      answer: "To use our nutrition calculator, simply type the food or ingredient you want to analyze in the search bar. Select the appropriate portion size, and the calculator will instantly display the calorie count and macronutrient breakdown, including protein, carbs, and fats. You can add multiple items to calculate the total nutrition for a complete meal or recipe."
    },
    {
      question: "What is a recipe nutrition calculator?",
      answer: "A recipe nutrition calculator is a tool that allows you to input multiple ingredients and their quantities to determine the overall nutritional value of a complete dish. It sums up calories, macronutrients, and micronutrients for the entire recipe and can even break it down per serving, making it easier to track your dietary intake when cooking at home."
    },
    {
      question: "How do I view detailed nutrition data?",
      answer: "Once you search for a food item and add it to the calculator, click on the item to expand its details. Our calculator provides a comprehensive breakdown of macronutrients (proteins, fats, carbohydrates) as well as essential micronutrients, vitamins, and minerals, all sourced from reliable USDA data."
    },
    {
      question: "What is the food calorie calculator?",
      answer: "The food calorie calculator is a free online tool designed to help you find the exact number of calories in various foods. Whether you're tracking raw ingredients, cooked meals, or packaged goods, this calculator gives you accurate calorie counts to help you meet your weight loss, maintenance, or muscle gain goals."
    },
    {
      question: "What is a nutrient calculator?",
      answer: "A nutrient calculator goes beyond just counting calories. It provides a detailed analysis of the specific nutrients in your food, including carbohydrates, sugars, dietary fiber, proteins, saturated fats, sodium, and vitamins. This helps you ensure you're getting a balanced diet aligned with your health objectives."
    },
    {
      question: "What is a nutrient intake calculator?",
      answer: "A nutrient intake calculator helps you track and manage your daily consumption of essential nutrients. By logging what you eat throughout the day, the calculator aggregates your intake, allowing you to compare your totals against recommended daily allowances and adjust your diet accordingly."
    },
    {
      question: "How to calculate daily nutrient needs?",
      answer: "Calculating your daily nutrient needs depends on your age, gender, weight, height, and physical activity level. While our calculator focuses on the food you consume, you can use standard Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) formulas alongside our tool to balance the nutrients in your meals with your body's specific requirements."
    },
    {
      question: "Why should I use a nutrient calculator?",
      answer: "Using a nutrient calculator empowers you to make informed dietary choices. It takes the guesswork out of meal planning, helping you monitor portion sizes, manage weight, ensure adequate protein intake, control sodium or sugar consumption, and ultimately build healthier eating habits supported by accurate data."
    },
    {
      question: "how much nutrition per day calculator",
      answer: "If you're wondering 'how much nutrition per day' you need, our calculator can help you track the exact amounts of macronutrients and calories you consume against your personal goals. By logging all your daily meals, you can ensure you hit your targets for proteins, fats, and carbs each day."
    },
    {
      question: "how much nutrition do i need calculator",
      answer: "To find out 'how much nutrition do I need', you should first establish your daily caloric and macronutrient goals based on your lifestyle. Then, use our calculator to log your meals and verify that the food you are eating meets those specific nutritional thresholds without exceeding them."
    },
    {
      question: "which wich online nutrition calculator",
      answer: "While we focus on raw ingredients and general recipes, you can use our calculator as an alternative to specific restaurant calculators like the 'Which Wich online nutrition calculator' by manually entering the bread, meats, cheeses, and toppings you choose for your sandwich to get an accurate nutritional breakdown."
    },
    {
      question: "which wich nutrition facts calculator",
      answer: "You can recreate your favorite sandwich orders using our tool as a substitute 'Which Wich nutrition facts calculator'. Simply input each individual component of your sub—such as turkey, provolone, and whole wheat bread—to calculate the total calories and nutrition facts."
    },
    {
      question: "what i ate today nutrition calculator",
      answer: "Our tool functions perfectly as a 'what I ate today nutrition calculator'. You can search and add every meal, snack, and beverage you consumed throughout the day into the calculator to get a complete, accurate summary of your daily calorie and nutrient intake."
    }
  ];
  const jsonLd = buildFAQPageSchema(faqs);
  return renderTemplate(_a || (_a = __template(["", '<section class="py-16 md:py-24 bg-[var(--color-canvas)] border-t border-[var(--color-hairline)]"> <div class="max-w-[800px] mx-auto px-4 md:px-6"> <div class="text-center mb-12"> <h2 class="text-3xl md:text-4xl font-semibold text-[var(--color-ink)] tracking-tight mb-4">\nNutrition Calculator FAQs\n</h2> <p class="text-[var(--color-body)] text-lg">\nAnswers to common questions about using our tools to calculate calories, macros, and track your daily nutrition.\n</p> </div> <div class="space-y-6"> ', ' </div> </div> </section> <script type="application/ld+json">', "<\/script>"])), maybeRenderHead(), faqs.map((faq) => renderTemplate`<div class="bg-[var(--color-canvas-soft)] p-6 rounded-xl border border-[var(--color-hairline)] shadow-sm hover:shadow-md transition-shadow"> <h3 class="font-semibold text-lg md:text-xl text-[var(--color-ink)] mb-3">${faq.question}</h3> <div> <p class="text-[var(--color-body)] leading-relaxed">${faq.answer}</p> </div> </div>`), unescapeHTML(JSON.stringify(jsonLd)));
}, "C:/fnc/src/components/calculator/CalculatorSEOFAQ.astro", void 0);

const $$Calculator = createComponent(($$result, $$props, $$slots) => {
  const title = "Food Nutrition Calculator | USDA-First Calories & Macros";
  const description = "Search foods, add servings, and calculate calories, protein, carbs, fat, fiber, sugar, sodium, and nutrition totals with USDA-first data.";
  const jsonLd = buildSoftwareApplicationSchema({
    name: "Food Nutrition Calculator",
    description,
    url: `${siteConfig.siteUrl}/calculator`
  });
  return renderTemplate`${renderComponent($$result, "SiteLayout", $$SiteLayout, { "title": title, "description": description, "jsonLd": jsonLd }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CalculatorHero", $$CalculatorHero, {})} ${renderComponent($$result2, "CalculatorShell", $$CalculatorShell, {})} ${renderComponent($$result2, "CalculatorSEOFAQ", $$CalculatorSEOFAQ, {})} ` })}`;
}, "C:/fnc/src/pages/calculator.astro", void 0);

const $$file = "C:/fnc/src/pages/calculator.astro";
const $$url = "/calculator";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Calculator,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
