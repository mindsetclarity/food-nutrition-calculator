import { c as createComponent } from './astro-component_DEMRXoVo.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_DdV4XD_W.mjs';
import { $ as $$SiteLayout } from './SiteLayout_B-r8uoSu.mjs';
import { $ as $$Button } from './SeoHead_BfjWHf_w.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  const navLinks = [
    { name: "Food Nutrition Calculator", href: "/calculator" },
    { name: "Recipe Nutrition Analyzer", href: "/recipe-nutrition-calculator" },
    { name: "Compare Foods", href: "/compare-foods" },
    { name: "Meal Calorie Calculator", href: "/meal-calorie-calculator" },
    { name: "Browse Foods Directory", href: "/foods" },
    { name: "Learn Hub", href: "/learn" }
  ];
  return renderTemplate`${renderComponent($$result, "SiteLayout", $$SiteLayout, { "title": "Page Not Found | Food Nutrition Calculator", "description": "The page you're looking for may have moved, or the food/article link may not exist.", "noindex": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-[70vh] flex flex-col justify-center bg-gray-50/50 py-24"> <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 mb-8"> <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> </div> <h1 class="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-6">Page not found</h1> <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
The page you're looking for may have moved, or the food/article link may not exist. Try searching with one of our main tools below.
</p> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto"> ${navLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all group"> <span class="font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">${link.name}</span> <svg class="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg> </a>`)} </div> <div class="mt-12"> ${renderComponent($$result2, "Button", $$Button, { "href": "/", "variant": "outline", "class": "w-full sm:w-auto justify-center" }, { "default": ($$result3) => renderTemplate`
Back to Homepage
` })} </div> </div> </div> ` })}`;
}, "C:/fnc/src/pages/404.astro", void 0);

const $$file = "C:/fnc/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
