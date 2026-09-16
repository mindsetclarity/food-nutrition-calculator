import { c as createComponent } from './astro-component_DEMRXoVo.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, s as spreadAttributes, p as renderSlot, k as renderTemplate, o as renderComponent } from './entrypoint_DdV4XD_W.mjs';
import { $ as $$SiteLayout } from './SiteLayout_B-r8uoSu.mjs';
import { $ as $$Button, r as renderScript } from './SeoHead_BfjWHf_w.mjs';
import 'clsx';
import { $ as $$FoodChip } from './FoodChip_Bw_T-lnb.mjs';
import { d as buildWebSiteSchema, e as buildOrganizationSchema } from './schema_D9quHZ4m.mjs';

const $$Badge = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Badge;
  const { variant = "default", class: className = "", ...rest } = Astro2.props;
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tabular-nums";
  const variantStyles = {
    default: "bg-slate-100 text-slate-800",
    success: "bg-[#dcfce7] text-[#166534]",
    warning: "bg-[#fef08a] text-[#854d0e]",
    danger: "bg-[#fee2e2] text-[#991b1b]",
    brand: "bg-brand-100 text-brand-900"
  };
  const safeVariant = variantStyles[variant] ? variant : "default";
  const classes = `${baseStyles} ${variantStyles[safeVariant]} ${className}`;
  return renderTemplate`${maybeRenderHead()}<span${addAttribute(classes, "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </span>`;
}, "C:/fnc/src/components/ui/Badge.astro", void 0);

function normalizeSource(source) {
  if (!source) return "unknown";
  const s = source.trim().toLowerCase();
  if (s === "usda") return "usda";
  if (s === "local") return "local";
  if (s === "llm_estimate" || s === "llm") return "llm_estimate";
  if (s === "estimated" || s === "estimate") return "estimated";
  return "unknown";
}
function getSourceLabel(source) {
  switch (source) {
    case "usda":
      return "USDA";
    case "local":
      return "Local";
    case "llm_estimate":
      return "AI Estimate";
    case "estimated":
      return "Estimate";
    case "unknown":
      return "Unknown";
  }
}

const $$SourceBadge = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SourceBadge;
  const { source, class: className = "" } = Astro2.props;
  function getConfig(rawSource) {
    const normalized = normalizeSource(rawSource);
    const text = getSourceLabel(normalized);
    switch (normalized) {
      case "usda":
        return { variant: "success", text };
      case "local":
        return { variant: "default", text };
      case "llm_estimate":
        return { variant: "warning", text };
      case "estimated":
        return { variant: "warning", text };
      case "unknown":
        return { variant: "warning", text };
      default:
        return { variant: "warning", text: "Unknown" };
    }
  }
  const config = getConfig(source);
  return renderTemplate`${renderComponent($$result, "Badge", $$Badge, { "variant": config.variant, "class": className }, { "default": ($$result2) => renderTemplate`${config.text}` })}`;
}, "C:/fnc/src/components/ui/SourceBadge.astro", void 0);

const $$MacroRing = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$MacroRing;
  const { value, max, color, label, subtext } = Astro2.props;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(value / max, 1);
  const offset = circumference - percent * circumference;
  return renderTemplate`${maybeRenderHead()}<div class="macro-card" data-astro-cid-ag7akevp> <div class="macro-ring" aria-hidden="true" data-astro-cid-ag7akevp> <svg class="macro-ring__svg" viewBox="0 0 100 100" data-astro-cid-ag7akevp> <circle class="macro-ring__track" cx="50" cy="50" r="40" data-astro-cid-ag7akevp></circle> <circle class="macro-ring__progress" cx="50" cy="50" r="40"${addAttribute(`stroke: ${color}; stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset};`, "style")} data-astro-cid-ag7akevp></circle> </svg> <span class="macro-ring__number" data-astro-cid-ag7akevp>${value}</span> </div> <div class="macro-card__label" data-astro-cid-ag7akevp>${label}</div> <div class="macro-card__amount" data-astro-cid-ag7akevp>${subtext}</div> </div>`;
}, "C:/fnc/src/components/ui/MacroRing.astro", void 0);

const $$HomeNutritionPreview = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="luxury-card home-nutrition-preview relative overflow-hidden bg-pure-card/90" data-astro-cid-s6bvjyc7> <div class="absolute -right-12 -top-12 w-48 h-48 bg-mint-wash rounded-full opacity-50 blur-2xl" data-astro-cid-s6bvjyc7></div> <div class="absolute -left-12 -bottom-12 w-48 h-48 bg-emerald-soft rounded-full opacity-30 blur-2xl" data-astro-cid-s6bvjyc7></div> <div class="relative z-10 preview-stack" data-astro-cid-s6bvjyc7> <!-- Search Bar Mock --> <div class="preview-search-bar bg-white border border-border-soft rounded-lg px-4 py-3 shadow-sm" data-astro-cid-s6bvjyc7> <svg class="w-5 h-5 text-usda-emerald shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-s6bvjyc7><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-astro-cid-s6bvjyc7></path></svg> <div class="text-sm text-muted-text font-medium border-r border-border-soft pr-2 mr-1 shrink-0 hidden sm:block" data-astro-cid-s6bvjyc7>Search</div> <div class="text-sm text-ink-navy preview-search-query flex-1" data-astro-cid-s6bvjyc7>1 cup oats and banana</div> <div class="ml-auto flex gap-1 shrink-0 hidden sm:flex" data-astro-cid-s6bvjyc7> <span class="bg-slate-100 text-[10px] text-soft-slate px-1.5 py-0.5 rounded font-mono" data-astro-cid-s6bvjyc7>⌘</span> <span class="bg-slate-100 text-[10px] text-soft-slate px-1.5 py-0.5 rounded font-mono" data-astro-cid-s6bvjyc7>K</span> </div> </div> <!-- Resolved Food Item --> <div class="preview-result-card bg-white border border-border-soft rounded-lg p-4 shadow-sm" data-astro-cid-s6bvjyc7> <div class="preview-result-info" data-astro-cid-s6bvjyc7> <h4 class="font-bold text-ink-navy flex items-center gap-2" data-astro-cid-s6bvjyc7>
Oatmeal Bowl
${renderComponent($$result, "SourceBadge", $$SourceBadge, { "source": "USDA", "size": "sm", "data-astro-cid-s6bvjyc7": true })} </h4> <p class="text-xs text-soft-slate mt-1" data-astro-cid-s6bvjyc7>1 cup cooked oats, 1 medium banana</p> </div> <div class="preview-result-stats" data-astro-cid-s6bvjyc7> <div class="text-xl font-bold text-ink-navy" data-astro-cid-s6bvjyc7>265</div> <div class="text-[10px] text-muted-text uppercase tracking-wider font-semibold" data-astro-cid-s6bvjyc7>Calories</div> </div> </div> <!-- Macro Rings --> <div class="macro-grid" data-astro-cid-s6bvjyc7> <div class="bg-white border border-border-soft rounded-lg shadow-sm min-w-0" data-astro-cid-s6bvjyc7> ${renderComponent($$result, "MacroRing", $$MacroRing, { "value": 6, "max": 50, "color": "var(--color-usda-emerald)", "label": "Protein", "subtext": "6g", "data-astro-cid-s6bvjyc7": true })} </div> <div class="bg-white border border-border-soft rounded-lg shadow-sm min-w-0" data-astro-cid-s6bvjyc7> ${renderComponent($$result, "MacroRing", $$MacroRing, { "value": 55, "max": 100, "color": "var(--color-nutrient-amber)", "label": "Carbs", "subtext": "55g", "data-astro-cid-s6bvjyc7": true })} </div> <div class="bg-white border border-border-soft rounded-lg shadow-sm min-w-0" data-astro-cid-s6bvjyc7> ${renderComponent($$result, "MacroRing", $$MacroRing, { "value": 4, "max": 30, "color": "var(--color-berry-accent)", "label": "Fat", "subtext": "4g", "data-astro-cid-s6bvjyc7": true })} </div> </div> <!-- Label Frame & Source Rail --> <div class="preview-engine-card bg-warm-ivory border border-border-soft rounded-lg p-4 shadow-inner" data-astro-cid-s6bvjyc7> <div class="flex sm:flex-row flex-col sm:items-center justify-between border-b border-border-soft pb-2 mb-2 gap-2" data-astro-cid-s6bvjyc7> <span class="text-xs font-bold text-ink-navy tracking-wider uppercase" data-astro-cid-s6bvjyc7>Nutrition Engine</span> <span class="text-[10px] font-semibold text-usda-emerald bg-mint-wash px-2 py-0.5 rounded-full w-fit" data-astro-cid-s6bvjyc7>Deterministic Totals</span> </div> <div class="flex items-center gap-2 mt-3" data-astro-cid-s6bvjyc7> <div class="flex -space-x-2 shrink-0" data-astro-cid-s6bvjyc7> <div class="w-6 h-6 rounded-full bg-mint-wash border border-white flex items-center justify-center text-[10px]" title="Oats" data-astro-cid-s6bvjyc7>🌾</div> <div class="w-6 h-6 rounded-full bg-yellow-50 border border-white flex items-center justify-center text-[10px]" title="Banana" data-astro-cid-s6bvjyc7>🍌</div> </div> <div class="text-xs text-soft-slate ml-1 min-w-0" data-astro-cid-s6bvjyc7>AI parsed → USDA matched</div> </div> </div> </div> </div>`;
}, "C:/fnc/src/components/home/HomeNutritionPreview.astro", void 0);

const $$HomeHero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="relative pt-20 pb-20 lg:pt-28 lg:pb-24 overflow-hidden"> <!-- Subtle Background Enhancements --> <div class="absolute inset-0 bg-warm-ivory -z-10"></div> <div class="absolute inset-0 bg-[radial-gradient(var(--color-emerald-soft)_1px,transparent_1px)] [background-size:24px_24px] opacity-20 -z-10"></div> <div class="site-container"> <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-12"> <!-- Text Content (Left) --> <div class="w-full lg:w-1/2 motion-fade-up text-left"> <div class="inline-flex items-center px-3 py-1 rounded-full bg-mint-wash border border-emerald-soft text-usda-emerald text-sm font-semibold mb-6 shadow-sm"> <span class="flex w-2 h-2 rounded-full bg-fresh-leaf mr-2 animate-pulse"></span>
USDA-first nutrition intelligence
</div> <h1 class="text-[40px] md:text-5xl lg:text-[56px] font-extrabold text-ink-navy tracking-tight mb-6 leading-[1.1]">
A smarter nutrition calculator for <span class="text-usda-emerald inline-block">foods</span>, <span class="text-usda-emerald inline-block">meals</span>, and <span class="text-usda-emerald inline-block">recipes.</span> </h1> <p class="mt-4 text-lg text-soft-slate mb-10 leading-relaxed max-w-lg">
Search foods, analyze recipes, compare meals, and generate Nutrition Facts-style summaries with USDA-first data, local fallback labels, and deterministic nutrition math.
</p> <div class="flex flex-col sm:flex-row gap-4 mb-8"> ${renderComponent($$result, "Button", $$Button, { "href": "/calculator", "variant": "primary", "size": "lg", "class": "shadow-ink hover:shadow-premium" }, { "default": ($$result2) => renderTemplate`
Start Calculating
` })} ${renderComponent($$result, "Button", $$Button, { "href": "/recipe-nutrition-calculator", "variant": "secondary", "size": "lg" }, { "default": ($$result2) => renderTemplate`
Analyze a Recipe
` })} </div> <div class="text-xs text-muted-text flex items-center flex-wrap gap-2 mb-10 border-l-2 border-mint-wash pl-3 py-1"> <span>No login required</span> &middot;
<span>Source-labeled estimates</span> &middot;
<span>AI parsing never owns final nutrition totals</span> </div> <!-- Decorative Vegetarian Chips --> <div class="flex flex-wrap gap-2 max-w-md motion-delay-200 motion-fade-in"> ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🍌", "label": "banana" })} ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🌾", "label": "oats" })} ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🥑", "label": "avocado" })} ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🧆", "label": "chickpeas" })} ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🍚", "label": "brown rice" })} ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🫐", "label": "berries" })} </div> </div> <!-- Product Preview (Right) --> <div class="w-full lg:w-1/2 motion-scale-in motion-delay-300 relative lg:pl-10"> ${renderComponent($$result, "HomeNutritionPreview", $$HomeNutritionPreview, {})} <!-- Floating decorative elements --> <div class="absolute -top-6 -right-6 motion-float hidden lg:block" style="animation-delay: -2s;"> ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🥣", "label": "Greek yogurt", "class": "shadow-ink bg-white/90 backdrop-blur-md" })} </div> <div class="absolute -bottom-8 -left-4 motion-float hidden lg:block" style="animation-delay: -5s;"> ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🍲", "label": "lentils", "class": "shadow-ink bg-white/90 backdrop-blur-md" })} </div> </div> </div> </div> </section>`;
}, "C:/fnc/src/components/home/HomeHero.astro", void 0);

const $$HomeToolsGrid = createComponent(($$result, $$props, $$slots) => {
  const tools = [
    {
      title: "Food Nutrition Calculator",
      benefit: "Search foods and calculate source-labeled nutrition in seconds.",
      trust: "USDA-first database",
      cta: "Calculate Food",
      href: "/calculator",
      accent: "🍌",
      colSpan: "md:col-span-2 lg:col-span-2"
    },
    {
      title: "Recipe Nutrition Calculator",
      benefit: "Paste ingredients and turn a recipe into per-serving nutrition.",
      trust: "Deterministic math",
      cta: "Analyze Recipe",
      href: "/recipe-nutrition-calculator",
      accent: "🥣",
      colSpan: "md:col-span-1 lg:col-span-1"
    },
    {
      title: "Meal Calorie Calculator",
      benefit: "Build breakfast, lunch, dinner, snacks, and drinks into a full-day total.",
      trust: "No login required",
      cta: "Build a Meal",
      href: "/meal-calorie-calculator",
      accent: "🥗",
      colSpan: "md:col-span-1 lg:col-span-1"
    },
    {
      title: "Compare Foods",
      benefit: "Side-by-side nutrition comparison with consistent serving basis.",
      trust: "Source-labeled estimates",
      cta: "Compare Now",
      href: "/compare-foods",
      accent: "🥑 vs 🍠",
      colSpan: "md:col-span-2 lg:col-span-2"
    },
    {
      title: "Food Nutrition Facts Directory",
      benefit: "Browse our library of common food nutrition profiles.",
      trust: "Local fallback included",
      cta: "Browse Library",
      href: "/foods",
      accent: "🌾",
      colSpan: "md:col-span-2 lg:col-span-1"
    },
    {
      title: "Learn Food Nutrition",
      benefit: "Understand calories, macros, labels, and USDA data.",
      trust: "Educational guides",
      cta: "Read Guides",
      href: "/learn",
      accent: "📖",
      colSpan: "md:col-span-1 lg:col-span-2"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="py-24 bg-warm-ivory relative overflow-hidden"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"> <div class="text-center max-w-2xl mx-auto mb-16 reveal-hidden" data-reveal> <h2 class="text-3xl md:text-4xl font-extrabold text-ink-navy tracking-tight mb-4">
A complete suite for <span class="text-usda-emerald">nutrition planning</span> </h2> <p class="text-lg text-soft-slate">
Six powerful tools connected by one source-transparent database.
</p> </div> <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6"> ${tools.map((tool, index) => renderTemplate`<a${addAttribute(tool.href, "href")}${addAttribute(`group block luxury-card p-8 relative overflow-hidden focus-premium reveal-hidden ${tool.colSpan}`, "class")}${addAttribute(`transition-delay: ${index * 100}ms`, "style")} data-reveal> <div class="absolute -right-6 -top-6 text-6xl opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500 transform rotate-12"> ${tool.accent} </div> <div class="relative z-10 h-full flex flex-col"> <h3 class="text-xl font-bold text-ink-navy mb-3 group-hover:text-usda-emerald transition-colors">${tool.title}</h3> <p class="text-[15px] text-soft-slate mb-6 flex-grow">${tool.benefit}</p> <div class="mt-auto"> <div class="flex items-center text-xs text-muted-text font-medium mb-4"> <svg class="w-4 h-4 text-fresh-leaf mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> ${tool.trust} </div> <div class="inline-flex items-center text-[15px] font-semibold text-ink-navy group-hover:text-usda-emerald transition-colors"> ${tool.cta} <svg class="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> </div> </div> </div> </a>`)} </div> </div> </section> ${renderScript($$result, "C:/fnc/src/components/home/HomeToolsGrid.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/fnc/src/components/home/HomeToolsGrid.astro", void 0);

const $$VegetarianIntelligence = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="py-24 bg-white border-y border-border-soft overflow-hidden"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center max-w-2xl mx-auto mb-16 reveal-hidden" data-reveal> <h2 class="text-3xl md:text-4xl font-extrabold text-ink-navy tracking-tight mb-4">
Built for real everyday foods.
</h2> <p class="text-lg text-soft-slate">
Our database resolves common plant-based foods, grains, and produce with high accuracy.
</p> </div> <!-- Decorative Vegetarian Food Cards Showcase --> <div class="relative flex justify-center pb-12"> <!-- Background glow --> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-soft rounded-[100%] blur-[80px] opacity-40"></div> <!-- Center Card --> <div class="relative z-20 luxury-card p-5 w-64 transform transition-transform hover:scale-105 reveal-hidden" style="transition-delay: 100ms" data-reveal> <div class="w-full aspect-[4/3] bg-mint-wash rounded-lg mb-4 flex items-center justify-center text-6xl">
🥣
</div> <h4 class="font-bold text-ink-navy text-lg">Oatmeal Bowl</h4> <div class="text-sm text-soft-slate mb-3">1 cup oats, 1/2 cup berries</div> <div class="flex items-center gap-2"> <span class="bg-emerald-50 text-usda-emerald border border-emerald-100 text-[10px] uppercase font-bold px-2 py-0.5 rounded">USDA Data</span> <span class="text-xs font-semibold text-ink-navy ml-auto">~210 kcal</span> </div> </div> <!-- Left Card (Slightly behind) --> <div class="absolute z-10 top-8 -left-8 md:left-[15%] luxury-card p-4 w-56 transform -rotate-6 transition-transform hover:rotate-0 hover:scale-105 opacity-90 reveal-hidden" style="transition-delay: 200ms" data-reveal> <div class="w-full aspect-[4/3] bg-yellow-50 rounded-lg mb-3 flex items-center justify-center text-5xl">
🥑
</div> <h4 class="font-bold text-ink-navy">Avocado Toast</h4> <div class="text-xs text-soft-slate mb-2">1 slice wheat, 1/2 avocado</div> <div class="text-xs font-semibold text-ink-navy">~235 kcal</div> </div> <!-- Right Card (Slightly behind) --> <div class="absolute z-10 top-12 -right-8 md:right-[15%] luxury-card p-4 w-56 transform rotate-6 transition-transform hover:rotate-0 hover:scale-105 opacity-90 reveal-hidden" style="transition-delay: 300ms" data-reveal> <div class="w-full aspect-[4/3] bg-orange-50 rounded-lg mb-3 flex items-center justify-center text-5xl">
🥗
</div> <h4 class="font-bold text-ink-navy">Quinoa Salad</h4> <div class="text-xs text-soft-slate mb-2">1 cup quinoa, chickpeas</div> <div class="text-xs font-semibold text-ink-navy">~320 kcal</div> </div> </div> <!-- More chips --> <div class="flex flex-wrap justify-center gap-3 mt-12 max-w-3xl mx-auto reveal-hidden" style="transition-delay: 400ms" data-reveal> ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🍌", "label": "banana", "class": "bg-white" })} ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🌾", "label": "brown rice", "class": "bg-white" })} ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🧆", "label": "lentils", "class": "bg-white" })} ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🥬", "label": "spinach", "class": "bg-white" })} ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🥦", "label": "broccoli", "class": "bg-white" })} ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🍠", "label": "sweet potato", "class": "bg-white" })} ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🍅", "label": "tomatoes", "class": "bg-white" })} ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🥒", "label": "cucumber", "class": "bg-white" })} ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🥜", "label": "almonds", "class": "bg-white" })} ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🍓", "label": "berries", "class": "bg-white" })} ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🤍", "label": "tofu", "class": "bg-white" })} </div> </div> </section>`;
}, "C:/fnc/src/components/home/VegetarianIntelligence.astro", void 0);

const $$SourceTruthRail = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SourceTruthRail;
  const { class: className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 ${className}`, "class")}> <div class="flex items-center gap-2 bg-mint-wash border border-emerald-soft rounded-md px-3 py-2 shrink-0"> <div class="w-2 h-2 rounded-full bg-usda-emerald"></div> <span class="text-xs font-bold text-usda-emerald tracking-wide uppercase">USDA-first</span> </div> <svg class="hidden sm:block w-4 h-4 text-border-soft rotate-[-90deg] sm:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> <div class="flex items-center gap-2 bg-slate-50 border border-border-soft rounded-md px-3 py-2 shrink-0"> <div class="w-2 h-2 rounded-full bg-soft-slate"></div> <span class="text-xs font-bold text-soft-slate tracking-wide uppercase">Local Fallback</span> </div> <svg class="hidden sm:block w-4 h-4 text-border-soft rotate-[-90deg] sm:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> <div class="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-md px-3 py-2 shrink-0"> <div class="w-2 h-2 rounded-full bg-indigo-400"></div> <span class="text-xs font-bold text-indigo-700 tracking-wide uppercase">AI Assist</span> </div> </div>`;
}, "C:/fnc/src/components/ui/SourceTruthRail.astro", void 0);

const $$SourceTruthHierarchy = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="py-24 bg-pure-card border-b border-border-soft overflow-hidden"> <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center max-w-2xl mx-auto mb-16 reveal-hidden" data-reveal> <h2 class="text-3xl md:text-4xl font-extrabold text-ink-navy tracking-tight mb-4">
Nutrition numbers should show where they came from.
</h2> <p class="text-lg text-soft-slate">
We built a transparent engine that prioritizes trusted data over AI guesses.
</p> </div> <div class="relative max-w-3xl mx-auto reveal-hidden" style="transition-delay: 200ms" data-reveal> <!-- Vertical connecting line for desktop --> <div class="hidden md:block absolute left-8 top-12 bottom-12 w-0.5 bg-border-soft"></div> <div class="space-y-6 relative"> <!-- Step 1: USDA --> <div class="ivory-card p-6 flex flex-col md:flex-row gap-6 relative z-10 group"> <div class="w-16 h-16 rounded-full bg-mint-wash border border-emerald-soft flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform"> <span class="text-2xl">🏛️</span> </div> <div> <div class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-mint-wash text-usda-emerald mb-2">Primary Source</div> <h3 class="text-xl font-bold text-ink-navy mb-2">USDA FoodData Central</h3> <p class="text-[15px] text-soft-slate leading-relaxed">
Whenever possible, we map your food directly to the USDA database for the highest level of nutritional accuracy.
</p> </div> </div> <!-- Step 2: Local Fallback --> <div class="ivory-card p-6 flex flex-col md:flex-row gap-6 relative z-10 group"> <div class="w-16 h-16 rounded-full bg-slate-50 border border-border-soft flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform"> <span class="text-2xl">📚</span> </div> <div> <div class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-slate-100 text-soft-slate mb-2">Secondary Source</div> <h3 class="text-xl font-bold text-ink-navy mb-2">Local Fallback Database</h3> <p class="text-[15px] text-soft-slate leading-relaxed">
If a food isn't in the USDA database, we rely on a curated local dataset to ensure common foods remain usable.
</p> </div> </div> <!-- Step 3: AI Assist --> <div class="ivory-card p-6 flex flex-col md:flex-row gap-6 relative z-10 group"> <div class="w-16 h-16 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform"> <span class="text-2xl">✨</span> </div> <div> <div class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-indigo-100 text-indigo-700 mb-2">Text Parsing Only</div> <h3 class="text-xl font-bold text-ink-navy mb-2">AI Parsing Assist</h3> <p class="text-[15px] text-soft-slate leading-relaxed">
AI helps read messy ingredient lists (like "1 cup of oats"), but it <strong class="text-ink-navy font-semibold">never</strong> calculates or owns the final nutrition totals. The deterministic engine does the math.
</p> </div> </div> </div> </div> <div class="mt-16 flex justify-center reveal-hidden" style="transition-delay: 400ms" data-reveal> ${renderComponent($$result, "SourceTruthRail", $$SourceTruthRail, {})} </div> </div> </section>`;
}, "C:/fnc/src/components/home/SourceTruthHierarchy.astro", void 0);

const $$RecipeWorkflow = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="py-24 bg-warm-ivory overflow-hidden"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center max-w-3xl mx-auto mb-16 reveal-hidden" data-reveal> <h2 class="text-3xl md:text-4xl font-extrabold text-ink-navy tracking-tight mb-4">
Turn a recipe into per-serving nutrition.
</h2> <p class="text-lg text-soft-slate">
Paste any ingredient list. Our engine parses the text, matches to USDA data, and calculates the exact macros per serving.
</p> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> <!-- Workflow Steps (Left) --> <div class="space-y-8 reveal-hidden" data-reveal> <div class="flex gap-4"> <div class="w-8 h-8 rounded-full bg-mint-wash text-usda-emerald font-bold flex items-center justify-center shrink-0 border border-emerald-soft mt-1">1</div> <div> <h3 class="text-xl font-bold text-ink-navy mb-2">Paste ingredients</h3> <p class="text-[15px] text-soft-slate">Copy and paste directly from a blog or your own notes.</p> </div> </div> <div class="flex gap-4"> <div class="w-8 h-8 rounded-full bg-mint-wash text-usda-emerald font-bold flex items-center justify-center shrink-0 border border-emerald-soft mt-1">2</div> <div> <h3 class="text-xl font-bold text-ink-navy mb-2">Review source matches</h3> <p class="text-[15px] text-soft-slate">Ensure the engine mapped your items to the correct USDA or local records.</p> </div> </div> <div class="flex gap-4"> <div class="w-8 h-8 rounded-full bg-mint-wash text-usda-emerald font-bold flex items-center justify-center shrink-0 border border-emerald-soft mt-1">3</div> <div> <h3 class="text-xl font-bold text-ink-navy mb-2">Get per-serving nutrition</h3> <p class="text-[15px] text-soft-slate">Set your servings and view the deterministic mathematical totals.</p> </div> </div> <div class="flex gap-4"> <div class="w-8 h-8 rounded-full bg-mint-wash text-usda-emerald font-bold flex items-center justify-center shrink-0 border border-emerald-soft mt-1">4</div> <div> <h3 class="text-xl font-bold text-ink-navy mb-2">View Nutrition Facts-style preview</h3> <p class="text-[15px] text-soft-slate">Generate a clean, familiar label for your personal planning.</p> </div> </div> <div class="pt-4"> ${renderComponent($$result, "Button", $$Button, { "href": "/recipe-nutrition-calculator", "variant": "primary", "class": "w-full sm:w-auto" }, { "default": ($$result2) => renderTemplate`
Analyze a Recipe
` })} </div> </div> <!-- Visual Preview (Right) --> <div class="relative reveal-hidden" style="transition-delay: 200ms" data-reveal> <div class="luxury-card bg-white p-6 md:p-8"> <div class="flex justify-between items-start mb-6 border-b border-border-soft pb-4"> <div> <h4 class="text-lg font-bold text-ink-navy">Protein Oat Bowl</h4> <p class="text-xs text-muted-text">1 serving</p> </div> <div class="text-right"> <div class="text-2xl font-bold text-ink-navy">425</div> <div class="text-[10px] uppercase tracking-wider font-semibold text-soft-slate">Calories</div> </div> </div> <div class="space-y-3 mb-6"> <div class="flex justify-between items-center bg-slate-50 px-3 py-2 rounded border border-border-soft"> <span class="text-sm font-medium text-ink-navy flex items-center gap-2">🌾 1/2 cup rolled oats</span> ${renderComponent($$result, "SourceBadge", $$SourceBadge, { "source": "USDA", "size": "sm" })} </div> <div class="flex justify-between items-center bg-slate-50 px-3 py-2 rounded border border-border-soft"> <span class="text-sm font-medium text-ink-navy flex items-center gap-2">🍌 1 medium banana</span> ${renderComponent($$result, "SourceBadge", $$SourceBadge, { "source": "USDA", "size": "sm" })} </div> <div class="flex justify-between items-center bg-slate-50 px-3 py-2 rounded border border-border-soft"> <span class="text-sm font-medium text-ink-navy flex items-center gap-2">🥜 1 tbsp peanut butter</span> ${renderComponent($$result, "SourceBadge", $$SourceBadge, { "source": "USDA", "size": "sm" })} </div> <div class="flex justify-between items-center bg-slate-50 px-3 py-2 rounded border border-border-soft"> <span class="text-sm font-medium text-ink-navy flex items-center gap-2">🥛 1/2 cup almond milk</span> ${renderComponent($$result, "SourceBadge", $$SourceBadge, { "source": "USDA", "size": "sm" })} </div> </div> <div class="grid grid-cols-3 gap-3 border-t border-border-soft pt-4"> <div> <div class="text-xs text-muted-text font-medium mb-1">Protein</div> <div class="text-lg font-bold text-ink-navy">12g</div> <div class="w-full h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden"> <div class="h-full bg-usda-emerald w-[24%]"></div> </div> </div> <div> <div class="text-xs text-muted-text font-medium mb-1">Carbs</div> <div class="text-lg font-bold text-ink-navy">65g</div> <div class="w-full h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden"> <div class="h-full bg-nutrient-amber w-[65%]"></div> </div> </div> <div> <div class="text-xs text-muted-text font-medium mb-1">Fat</div> <div class="text-lg font-bold text-ink-navy">14g</div> <div class="w-full h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden"> <div class="h-full bg-berry-accent w-[28%]"></div> </div> </div> </div> </div> <!-- Decorative Label Float --> <div class="absolute -right-4 -bottom-8 w-48 bg-white border-2 border-ink-navy p-3 shadow-premium transform rotate-3 hidden md:block"> <h5 class="font-black text-xl border-b-8 border-ink-navy pb-1 mb-1 leading-none text-ink-navy">Nutrition Facts</h5> <div class="text-[10px] leading-tight font-medium">1 serving per recipe</div> <div class="flex justify-between font-black text-lg border-b-4 border-ink-navy pb-0.5 mt-1"> <span>Calories</span> <span>425</span> </div> </div> </div> </div> </div> </section>`;
}, "C:/fnc/src/components/home/RecipeWorkflow.astro", void 0);

const $$MealDashboardPreview = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="py-24 bg-pure-card border-t border-border-soft overflow-hidden"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-12"> <!-- Visual Preview (Left) --> <div class="w-full lg:w-1/2 reveal-hidden" data-reveal> <div class="ivory-card p-4 sm:p-6 shadow-ink relative"> <div class="flex justify-between items-center mb-6"> <h3 class="text-lg font-bold text-ink-navy">Daily Meal Total</h3> <span class="text-xs font-semibold text-usda-emerald bg-mint-wash px-2 py-1 rounded">No Login</span> </div> <div class="space-y-4"> <!-- Breakfast --> <div class="bg-white border border-border-soft rounded-lg p-3"> <div class="flex justify-between items-center mb-2"> <h4 class="text-sm font-bold text-ink-navy flex items-center gap-1.5"><span class="text-lg">☀️</span> Breakfast</h4> <span class="text-sm font-bold text-ink-navy">320 kcal</span> </div> <div class="text-xs text-soft-slate">Oats + banana + berries</div> </div> <!-- Lunch --> <div class="bg-white border border-border-soft rounded-lg p-3"> <div class="flex justify-between items-center mb-2"> <h4 class="text-sm font-bold text-ink-navy flex items-center gap-1.5"><span class="text-lg">🥗</span> Lunch</h4> <span class="text-sm font-bold text-ink-navy">450 kcal</span> </div> <div class="text-xs text-soft-slate">Chickpea rice bowl + side salad</div> </div> <!-- Dinner --> <div class="bg-white border border-border-soft rounded-lg p-3 relative opacity-50"> <div class="absolute inset-0 bg-white/50 backdrop-blur-[1px] rounded-lg flex items-center justify-center z-10"> ${renderComponent($$result, "Button", $$Button, { "variant": "quiet", "size": "sm", "class": "bg-white shadow-sm border border-border-soft" }, { "default": ($$result2) => renderTemplate`+ Add Dinner` })} </div> <div class="flex justify-between items-center mb-2"> <h4 class="text-sm font-bold text-ink-navy flex items-center gap-1.5"><span class="text-lg">🍲</span> Dinner</h4> <span class="text-sm font-bold text-ink-navy">--</span> </div> <div class="text-xs text-soft-slate">Empty</div> </div> </div> <div class="mt-6 pt-4 border-t border-border-soft flex justify-between items-end"> <div> <div class="text-[10px] text-muted-text font-bold uppercase tracking-wider mb-1">Current Total</div> <div class="text-3xl font-extrabold text-ink-navy leading-none">770</div> </div> <div class="flex gap-4"> <div class="text-right"> <div class="text-[10px] text-muted-text font-bold uppercase">P</div> <div class="text-sm font-semibold text-usda-emerald">28g</div> </div> <div class="text-right"> <div class="text-[10px] text-muted-text font-bold uppercase">C</div> <div class="text-sm font-semibold text-nutrient-amber">110g</div> </div> <div class="text-right"> <div class="text-[10px] text-muted-text font-bold uppercase">F</div> <div class="text-sm font-semibold text-berry-accent">22g</div> </div> </div> </div> </div> </div> <!-- Text Content (Right) --> <div class="w-full lg:w-1/2 reveal-hidden" style="transition-delay: 200ms" data-reveal> <h2 class="text-3xl md:text-4xl font-extrabold text-ink-navy tracking-tight mb-4">
Build a full-day meal dashboard.
</h2> <p class="text-lg text-soft-slate mb-6">
Add breakfast, lunch, dinner, snacks, and drinks to calculate your full-day totals. See how each food contributes to your macros.
</p> <ul class="space-y-3 mb-8"> <li class="flex items-start"> <svg class="w-5 h-5 text-usda-emerald mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span class="text-[15px] text-ink-navy font-medium">Add multiple items per meal section</span> </li> <li class="flex items-start"> <svg class="w-5 h-5 text-usda-emerald mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span class="text-[15px] text-ink-navy font-medium">See precise macro contributions</span> </li> <li class="flex items-start"> <svg class="w-5 h-5 text-usda-emerald mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> <span class="text-[15px] text-ink-navy font-medium">No account or login required to calculate</span> </li> </ul> ${renderComponent($$result, "Button", $$Button, { "href": "/meal-calorie-calculator", "variant": "primary" }, { "default": ($$result2) => renderTemplate`
Start a Meal Plan
` })} </div> </div> </div> </section>`;
}, "C:/fnc/src/components/home/MealDashboardPreview.astro", void 0);

const $$CompareFoodsPreview = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="py-24 bg-white border-t border-border-soft overflow-hidden"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="text-center max-w-3xl mx-auto mb-16 reveal-hidden" data-reveal> <h2 class="text-3xl md:text-4xl font-extrabold text-ink-navy tracking-tight mb-4">
Compare foods side by side.
</h2> <p class="text-lg text-soft-slate">
See exactly how two foods differ in calories, macros, and nutrients using a consistent serving basis (like 100g). No judgments, just facts.
</p> </div> <div class="max-w-4xl mx-auto relative reveal-hidden" style="transition-delay: 200ms" data-reveal> <!-- Comparison Table/Cards --> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 relative"> <!-- Left Food --> <div class="luxury-card p-4 sm:p-6 bg-pure-card"> <div class="flex flex-col items-center text-center border-b border-border-soft pb-4 mb-4"> <div class="text-5xl mb-3">🧆</div> <h3 class="text-lg font-bold text-ink-navy">Lentils</h3> <div class="text-sm text-soft-slate mb-2">Cooked, boiled</div> ${renderComponent($$result, "SourceBadge", $$SourceBadge, { "source": "USDA", "size": "sm" })} <div class="mt-4 bg-slate-50 px-3 py-1 rounded-full text-xs font-semibold text-ink-navy border border-border-soft">
100g serving
</div> </div> <div class="space-y-4"> <div class="flex justify-between items-center"> <span class="text-sm text-soft-slate font-medium">Calories</span> <span class="text-base font-bold text-ink-navy">116</span> </div> <div class="w-full h-[1px] bg-border-soft"></div> <div class="flex justify-between items-center"> <span class="text-sm text-soft-slate font-medium">Protein</span> <span class="text-base font-bold text-usda-emerald">9.0g</span> </div> <div class="w-full h-[1px] bg-border-soft"></div> <div class="flex justify-between items-center"> <span class="text-sm text-soft-slate font-medium">Carbs</span> <span class="text-base font-bold text-ink-navy">20.1g</span> </div> <div class="w-full h-[1px] bg-border-soft"></div> <div class="flex justify-between items-center"> <span class="text-sm text-soft-slate font-medium">Fiber</span> <span class="text-base font-bold text-ink-navy">7.9g</span> </div> </div> </div> <!-- Right Food --> <div class="luxury-card p-4 sm:p-6 bg-pure-card"> <div class="flex flex-col items-center text-center border-b border-border-soft pb-4 mb-4"> <div class="text-5xl mb-3">🥘</div> <h3 class="text-lg font-bold text-ink-navy">Chickpeas</h3> <div class="text-sm text-soft-slate mb-2">Cooked, boiled</div> ${renderComponent($$result, "SourceBadge", $$SourceBadge, { "source": "USDA", "size": "sm" })} <div class="mt-4 bg-slate-50 px-3 py-1 rounded-full text-xs font-semibold text-ink-navy border border-border-soft">
100g serving
</div> </div> <div class="space-y-4"> <div class="flex justify-between items-center"> <span class="text-sm text-soft-slate font-medium">Calories</span> <span class="text-base font-bold text-ink-navy">164</span> </div> <div class="w-full h-[1px] bg-border-soft"></div> <div class="flex justify-between items-center"> <span class="text-sm text-soft-slate font-medium">Protein</span> <span class="text-base font-bold text-usda-emerald">8.9g</span> </div> <div class="w-full h-[1px] bg-border-soft"></div> <div class="flex justify-between items-center"> <span class="text-sm text-soft-slate font-medium">Carbs</span> <span class="text-base font-bold text-ink-navy">27.4g</span> </div> <div class="w-full h-[1px] bg-border-soft"></div> <div class="flex justify-between items-center"> <span class="text-sm text-soft-slate font-medium">Fiber</span> <span class="text-base font-bold text-ink-navy">7.6g</span> </div> </div> </div> <!-- VS Badge in the middle --> <div class="absolute top-1/2 md:top-[80px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-border-soft rounded-full shadow-sm flex items-center justify-center text-xs font-black text-soft-slate z-20">
VS
</div> </div> <div class="mt-12 text-center"> ${renderComponent($$result, "Button", $$Button, { "href": "/compare-foods", "variant": "secondary" }, { "default": ($$result2) => renderTemplate`
Compare Any Foods
` })} </div> </div> </div> </section>`;
}, "C:/fnc/src/components/home/CompareFoodsPreview.astro", void 0);

const $$NutritionLabelPreview = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="py-24 bg-mint-surface border-y border-emerald-soft overflow-hidden relative"> <div class="absolute inset-0 bg-[radial-gradient(var(--color-usda-emerald)_1px,transparent_1px)] [background-size:32px_32px] opacity-5"></div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"> <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"> <!-- Text Content --> <div class="w-full lg:w-1/2 reveal-hidden" data-reveal> <h2 class="text-3xl md:text-4xl font-extrabold text-ink-navy tracking-tight mb-6">
Turn meals into Nutrition Facts-style summaries.
</h2> <p class="text-lg text-soft-slate mb-6">
Generate clean, familiar nutrition labels for your recipes or full-day meal plans instantly. Perfect for personal tracking and understanding macro breakdowns.
</p> <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8"> <p class="text-sm text-yellow-800 font-medium flex items-start"> <svg class="w-5 h-5 mr-2 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
For personal nutrition planning only. Not an FDA-approved or legally compliant commercial packaging label.
</p> </div> </div> <!-- Label Preview --> <div class="w-full lg:w-1/2 flex justify-center reveal-hidden" style="transition-delay: 200ms" data-reveal> <div class="bg-white border-2 border-ink-navy p-6 shadow-premium max-w-sm w-full transform rotate-2 hover:rotate-0 transition-transform duration-500"> <h3 class="text-3xl font-black text-ink-navy tracking-tighter border-b-[12px] border-ink-navy pb-1 mb-2">Nutrition Facts</h3> <div class="text-sm text-ink-navy font-bold mb-1">1 serving per container</div> <div class="flex justify-between items-end border-b-[6px] border-ink-navy pb-1 mb-2"> <div class="text-sm font-bold">Serving size</div> <div class="text-sm font-bold">1 Bowl (450g)</div> </div> <div class="text-[10px] font-bold text-right mb-1">Amount per serving</div> <div class="flex justify-between items-end border-b-[6px] border-ink-navy pb-1 mb-2"> <div class="text-3xl font-black text-ink-navy">Calories</div> <div class="text-4xl font-black text-ink-navy">425</div> </div> <div class="text-[10px] font-bold text-right border-b border-ink-navy pb-1 mb-1">% Daily Value*</div> <div class="flex justify-between text-sm border-b border-ink-navy pb-1 mb-1"> <div><span class="font-bold">Total Fat</span> 14g</div> <span class="font-bold">18%</span> </div> <div class="flex justify-between text-sm pl-4 border-b border-ink-navy pb-1 mb-1"> <div>Saturated Fat 2g</div> <span class="font-bold">10%</span> </div> <div class="flex justify-between text-sm border-b border-ink-navy pb-1 mb-1"> <div><span class="font-bold">Sodium</span> 120mg</div> <span class="font-bold">5%</span> </div> <div class="flex justify-between text-sm border-b border-ink-navy pb-1 mb-1"> <div><span class="font-bold">Total Carbohydrate</span> 65g</div> <span class="font-bold">24%</span> </div> <div class="flex justify-between text-sm pl-4 border-b border-ink-navy pb-1 mb-1"> <div>Dietary Fiber 8g</div> <span class="font-bold">29%</span> </div> <div class="flex justify-between text-sm border-b-[6px] border-ink-navy pb-1 mb-2"> <div><span class="font-bold">Protein</span> 12g</div> <span class="font-bold"></span> </div> <div class="text-[9px] text-soft-slate leading-tight mt-2">
* The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice. This is an estimate based on USDA data.
</div> </div> </div> </div> </div> </section>`;
}, "C:/fnc/src/components/home/NutritionLabelPreview.astro", void 0);

const $$LearnTrustSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="py-24 bg-warm-ivory border-t border-border-soft"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid grid-cols-1 md:grid-cols-2 gap-12"> <!-- Learn Hub --> <div class="ivory-card p-8 sm:p-10 reveal-hidden" data-reveal> <div class="w-12 h-12 bg-mint-wash text-usda-emerald rounded-full flex items-center justify-center mb-6 border border-emerald-soft"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg> </div> <h3 class="text-2xl font-bold text-ink-navy mb-4">Learn Nutrition</h3> <p class="text-soft-slate mb-8 leading-relaxed">
Read our educational guides on calories, macros, reading nutrition labels, and understanding serving sizes. Empower yourself with knowledge before calculating.
</p> <ul class="space-y-4 mb-8"> <li><a href="/learn/calories-vs-macros" class="text-[15px] font-medium text-ink-navy hover:text-usda-emerald flex items-center group">Calories vs Macros <span class="ml-2 transform transition-transform group-hover:translate-x-1">→</span></a></li> <li><a href="/learn/how-to-read-a-nutrition-facts-label" class="text-[15px] font-medium text-ink-navy hover:text-usda-emerald flex items-center group">Reading Nutrition Labels <span class="ml-2 transform transition-transform group-hover:translate-x-1">→</span></a></li> <li><a href="/learn/serving-size-vs-portion-size" class="text-[15px] font-medium text-ink-navy hover:text-usda-emerald flex items-center group">Serving vs Portion Size <span class="ml-2 transform transition-transform group-hover:translate-x-1">→</span></a></li> </ul> ${renderComponent($$result, "Button", $$Button, { "href": "/learn", "variant": "secondary", "class": "w-full sm:w-auto" }, { "default": ($$result2) => renderTemplate`Visit Learn Hub` })} </div> <!-- Trust & Methodology --> <div class="ivory-card p-8 sm:p-10 reveal-hidden" style="transition-delay: 200ms" data-reveal> <div class="w-12 h-12 bg-slate-100 text-soft-slate rounded-full flex items-center justify-center mb-6 border border-border-soft"> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> </div> <h3 class="text-2xl font-bold text-ink-navy mb-4">Our Methodology</h3> <p class="text-soft-slate mb-8 leading-relaxed">
We believe in transparency. See exactly how our calculator processes text, queries the USDA FoodData Central, and runs deterministic math to produce final estimates.
</p> <div class="bg-slate-50 border border-border-soft p-4 rounded-lg mb-8"> <p class="text-sm text-ink-navy font-semibold mb-2">Key Principles:</p> <ul class="text-sm text-soft-slate space-y-2 list-disc pl-4"> <li>Never override USDA values with AI generation.</li> <li>Always label the source of the nutrition data.</li> <li>Maintain a predictable, math-based engine.</li> </ul> </div> ${renderComponent($$result, "Button", $$Button, { "href": "/methodology", "variant": "secondary", "class": "w-full sm:w-auto" }, { "default": ($$result2) => renderTemplate`Read Methodology` })} </div> </div> </div> </section>`;
}, "C:/fnc/src/components/home/LearnTrustSection.astro", void 0);

const $$HomeCTA = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="final-cta py-32 bg-ink-navy border-t border-deep-slate" data-astro-cid-b24jfwvn> <!-- Subtle Glow --> <div class="absolute inset-0 bg-[radial-gradient(var(--color-usda-emerald)_1px,transparent_1px)] [background-size:40px_40px] opacity-10" data-astro-cid-b24jfwvn></div> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-usda-emerald rounded-full blur-[150px] opacity-20 pointer-events-none" data-astro-cid-b24jfwvn></div> <!-- Decorative Chips safely placed under content via z-index --> <div class="final-cta__decor hidden sm:block" data-astro-cid-b24jfwvn> <div class="final-cta-chip final-cta-chip--avocado" data-astro-cid-b24jfwvn> ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🥑", "label": "avocado", "class": "bg-white text-ink-navy shadow-sm", "data-astro-cid-b24jfwvn": true })} </div> <div class="final-cta-chip final-cta-chip--oats" data-astro-cid-b24jfwvn> ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🌾", "label": "oats", "class": "bg-white text-ink-navy shadow-sm", "data-astro-cid-b24jfwvn": true })} </div> <div class="final-cta-chip final-cta-chip--banana" data-astro-cid-b24jfwvn> ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🍌", "label": "banana", "class": "bg-white text-ink-navy shadow-sm", "data-astro-cid-b24jfwvn": true })} </div> <div class="final-cta-chip final-cta-chip--yogurt" data-astro-cid-b24jfwvn> ${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": "🥣", "label": "yogurt", "class": "bg-white text-ink-navy shadow-sm", "data-astro-cid-b24jfwvn": true })} </div> </div> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 final-cta__content" data-reveal data-astro-cid-b24jfwvn> <div class="text-center relative z-10" data-astro-cid-b24jfwvn> <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6" data-astro-cid-b24jfwvn>
Start with one food.
</h2> <p class="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed" data-astro-cid-b24jfwvn>
Search a food, build a meal, or paste a recipe. Every result stays source-labeled and reviewable.
</p> </div> <div class="final-cta__actions" data-astro-cid-b24jfwvn> <a href="/calculator" class="final-cta__button btn-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-navy" data-astro-cid-b24jfwvn>
Start Calculating
</a> <a href="/recipe-nutrition-calculator" class="final-cta__button btn-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-navy" data-astro-cid-b24jfwvn>
Analyze a Recipe
</a> <a href="/foods" class="final-cta__button btn-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-navy" data-astro-cid-b24jfwvn>
Browse Foods
</a> </div> </div> </section>`;
}, "C:/fnc/src/components/home/HomeCTA.astro", void 0);

const $$HomeSeoContent = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="max-w-4xl mx-auto px-6 py-16 text-left"> <div class="prose prose-lg dark:prose-invert max-w-none text-ink/80"> <h2 class="text-3xl font-bold text-ink mb-6">The Ultimate Free Nutrition Calculator</h2> <p class="mb-4">
Welcome to the most comprehensive <strong>nutrition calculator</strong> available online. Whether you are tracking your daily intake or analyzing complex meals, having an accurate tool is essential. Our platform serves as a versatile <strong>food nutrition calculator</strong> designed to provide precise data directly from the USDA and other highly reliable databases. We believe that everyone should have access to high-quality dietary information without hidden fees, which is why our system functions as a completely <strong>free nutrition calculator</strong> for users of all backgrounds.
</p> <h3 class="text-2xl font-semibold text-ink mt-8 mb-4">A Powerful Recipe Nutrition Calculator</h3> <p class="mb-4">
Cooking at home is one of the best ways to control what goes into your body, but figuring out the exact macros and micros can be challenging. That's where our advanced <strong>recipe nutrition calculator</strong> comes in. With this feature, you can easily input all your ingredients, and we will do the math for you. It's the perfect <strong>nutrition calculator for recipes</strong>, breaking down everything from calories and macronutrients to essential vitamins and minerals.
</p> <p class="mb-4">
If you've been looking for a <strong>nutrition calculator for recipes free</strong> of charge, you've found the right place. Simply paste your recipe, adjust the serving sizes, and instantly get a detailed breakdown. Even if you accidentally misspell it as a <em>receipe nutrition calculator free</em> in your search, our tool is smart enough to handle a wide variety of ingredient names and measurements to give you the most accurate nutritional profile possible.
</p> <h3 class="text-2xl font-semibold text-ink mt-8 mb-4">Comprehensive Nutrition Calculator for Food</h3> <p class="mb-4">
Beyond recipes, our system excels as a standalone <strong>nutrition calculator for food</strong>. Whether you are grabbing a quick snack, comparing two different brands of protein bars, or evaluating a single raw ingredient, our extensive database ensures you have the exact facts. We prioritize data accuracy, highlighting whether the nutritional information comes from verified USDA records or foundation datasets. This transparency is crucial for anyone serious about their diet.
</p> <h3 class="text-2xl font-semibold text-ink mt-8 mb-4">Designed as a Nutrition Calculator for Adults</h3> <p class="mb-4">
Nutritional needs vary drastically depending on age, activity level, and health goals. Our platform is built as a robust <strong>nutrition calculator for adults</strong>, providing the insights needed for weight management, muscle gain, or simply maintaining a balanced lifestyle. Unlike generic tools, our calculator allows you to see the complete nutritional label—just like you would find on physical food packaging—so you can make informed decisions about your daily consumption.
</p> <h3 class="text-2xl font-semibold text-ink mt-8 mb-4">Why Choose Our Platform?</h3> <p class="mb-4">
There are many tools out there, but few combine the ease of use with the rigorous data standards we uphold. As a leading <strong>nutrition calculator</strong>, we ensure that every query you make—whether it's for a simple fruit or a complex multi-ingredient dish using our <strong>recipe nutrition calculator</strong>—returns fast, reliable, and easy-to-understand results.
</p> <p class="mb-4">
We are constantly updating our database to ensure that our <strong>food nutrition calculator</strong> reflects the most current dietary guidelines and food availability. The best part? It remains a strictly <strong>free nutrition calculator</strong>. You don't need a premium subscription to understand what you're eating. Try our <strong>nutrition calculator for recipes</strong> today and see why thousands of users trust our platform to keep their diets on track.
</p> </div> </section>`;
}, "C:/fnc/src/components/home/HomeSeoContent.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const seo = {
    title: "Free Nutrition Calculator | Recipe & Food Calories, Macros",
    description: "Use our free nutrition calculator for food and recipes. Calculate calories, macros, and nutrition facts accurately. The best recipe nutrition calculator for adults.",
    keywords: "Nutrition Calculator, recipe nutrition calculator, food nutrition calculator, free nutrition calculator, receipe nutrition calculator free, nutrition calculator for recipes, nutrition calculator for recipes free, nutrition calculator for food, nutrition calculator for adults",
    ogImage: "/og-image.jpg"
  };
  const jsonLd = [buildWebSiteSchema(), buildOrganizationSchema()];
  return renderTemplate`${renderComponent($$result, "SiteLayout", $$SiteLayout, { "title": seo.title, "description": seo.description, "keywords": seo.keywords, "ogImage": seo.ogImage, "jsonLd": jsonLd }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HomeHero", $$HomeHero, {})} ${renderComponent($$result2, "HomeToolsGrid", $$HomeToolsGrid, {})} ${renderComponent($$result2, "VegetarianIntelligence", $$VegetarianIntelligence, {})} ${renderComponent($$result2, "SourceTruthHierarchy", $$SourceTruthHierarchy, {})} ${renderComponent($$result2, "RecipeWorkflow", $$RecipeWorkflow, {})} ${renderComponent($$result2, "MealDashboardPreview", $$MealDashboardPreview, {})} ${renderComponent($$result2, "CompareFoodsPreview", $$CompareFoodsPreview, {})} ${renderComponent($$result2, "NutritionLabelPreview", $$NutritionLabelPreview, {})} ${renderComponent($$result2, "LearnTrustSection", $$LearnTrustSection, {})} ${renderComponent($$result2, "HomeCTA", $$HomeCTA, {})} ${renderComponent($$result2, "HomeSeoContent", $$HomeSeoContent, {})} ` })}`;
}, "C:/fnc/src/pages/index.astro", void 0);

const $$file = "C:/fnc/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
