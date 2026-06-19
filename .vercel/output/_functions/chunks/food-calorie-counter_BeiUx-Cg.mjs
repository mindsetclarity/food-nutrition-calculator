import { c as createComponent } from './astro-component_DnVRAbcp.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, k as renderTemplate, o as renderComponent, s as spreadAttributes, p as renderSlot } from './entrypoint_D0oTHkUW.mjs';
import { $ as $$SiteLayout } from './SiteLayout_YHvHq5NO.mjs';
import 'clsx';
import { $ as $$Button } from './SeoHead_Bz2tiSQZ.mjs';

const $$SectionHeading = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SectionHeading;
  const { title, description, class: className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`mb-8 ${className}`, "class")}> <h2 class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">${title}</h2> ${description && renderTemplate`<p class="mt-2 text-lg text-slate-600">${description}</p>`} </div>`;
}, "C:/foodnutritioncalculator.com/src/components/ui/SectionHeading.astro", void 0);

const $$Breadcrumbs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Breadcrumbs;
  const { items, class: className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav aria-label="Breadcrumb"${addAttribute(`py-4 ${className}`, "class")}> <ol role="list" class="flex items-center space-x-2 text-sm text-muted"> <li> <a href="/" class="hover:text-foreground transition-colors focus-ring rounded-sm">Home</a> </li> ${items.map((item) => renderTemplate`<li> <div class="flex items-center"> <svg class="h-4 w-4 shrink-0 text-slate-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path> </svg> ${item.href ? renderTemplate`<a${addAttribute(item.href, "href")} class="hover:text-foreground transition-colors focus-ring rounded-sm"> ${item.label} </a>` : renderTemplate`<span class="text-foreground font-medium" aria-current="page"> ${item.label} </span>`} </div> </li>`)} </ol> </nav>`;
}, "C:/foodnutritioncalculator.com/src/components/site/Breadcrumbs.astro", void 0);

const $$PageHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PageHeader;
  const { title, description, breadcrumbs } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="bg-surface border-b border-border"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 text-center sm:text-left animate-fade-up"> ${breadcrumbs && breadcrumbs.length > 0 && renderTemplate`${renderComponent($$result, "Breadcrumbs", $$Breadcrumbs, { "items": breadcrumbs, "class": "mb-4 hidden sm:block" })}`} ${renderComponent($$result, "SectionHeading", $$SectionHeading, { "title": title, "description": description })} </div> </div>`;
}, "C:/foodnutritioncalculator.com/src/components/placeholders/PageHeader.astro", void 0);

const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Card;
  const { variant = "default", class: className = "", ...rest } = Astro2.props;
  const baseStyles = "rounded-card overflow-hidden";
  const variantStyles = {
    default: "bg-surface border border-border",
    elevated: "bg-surface border border-border shadow-soft",
    glass: "glass-panel"
  };
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(classes, "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "C:/foodnutritioncalculator.com/src/components/ui/Card.astro", void 0);

const $$ToolPlaceholder = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ToolPlaceholder;
  const { title, futureFeatures } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow flex flex-col w-full"> ${renderComponent($$result, "Card", $$Card, { "variant": "elevated", "class": "flex-grow flex flex-col items-center justify-center p-8 sm:p-12 text-center w-full animate-fade-up" }, { "default": ($$result2) => renderTemplate` <div class="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-border shadow-inner"> <svg class="w-8 h-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path> </svg> </div> <h2 class="text-2xl font-bold text-foreground mb-2">${title} is under construction</h2> <p class="text-muted mb-8 max-w-xl mx-auto">This page is part of our Phase 5+ implementation plan. We are currently building the foundation for a premium, USDA-first nutrition experience.</p> <div class="text-left bg-background p-6 rounded-xl border border-border w-full max-w-md mx-auto"> <h3 class="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Planned Features</h3> <ul class="space-y-3"> ${futureFeatures.map((feature) => renderTemplate`<li class="flex items-start"> <svg class="w-5 h-5 text-brand-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> <span class="text-sm text-foreground">${feature}</span> </li>`)} </ul> </div> <div class="mt-8"> ${renderComponent($$result2, "Button", $$Button, { "href": "/", "variant": "subtle", "size": "sm", "class": "hover-lift" }, { "default": ($$result3) => renderTemplate`
&larr; Return to Homepage
` })} </div> ` })} </div>`;
}, "C:/foodnutritioncalculator.com/src/components/placeholders/ToolPlaceholder.astro", void 0);

const $$FoodCalorieCounter = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "SiteLayout", $$SiteLayout, { "title": "Food Calorie Counter - Fast Nutrition Search", "noindex": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageHeader", $$PageHeader, { "title": "Food Calorie Counter", "description": "Look up calories and macros for any food instantly.", "breadcrumbs": [{ label: "Calorie Counter" }] })} ${renderComponent($$result2, "ToolPlaceholder", $$ToolPlaceholder, { "title": "Calorie Counter", "futureFeatures": [
    "Lightning-fast search",
    "Serving size adjustments",
    "Basic macronutrient pie charts",
    "Recent searches cache"
  ] })} ` })}`;
}, "C:/foodnutritioncalculator.com/src/pages/food-calorie-counter.astro", void 0);

const $$file = "C:/foodnutritioncalculator.com/src/pages/food-calorie-counter.astro";
const $$url = "/food-calorie-counter";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$FoodCalorieCounter,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
