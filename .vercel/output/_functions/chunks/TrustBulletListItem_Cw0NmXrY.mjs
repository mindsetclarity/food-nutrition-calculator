import { c as createComponent } from './astro-component_DnVRAbcp.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, k as renderTemplate, u as unescapeHTML, p as renderSlot } from './entrypoint_D0oTHkUW.mjs';
import 'clsx';

const $$TrustTOC = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TrustTOC;
  const { sections } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="bg-white border border-border-soft rounded-2xl p-6 shadow-sm mb-12"> <h2 class="text-sm font-bold text-ink-navy uppercase tracking-wider mb-4">On this page</h2> <nav> <ul class="flex flex-wrap gap-x-6 gap-y-3 m-0 p-0 list-none"> ${sections.map((section) => renderTemplate`<li> <a${addAttribute(`#${section.id}`, "href")} class="text-[15px] font-semibold text-usda-emerald hover:text-emerald-800 hover:underline transition-colors flex items-center"> ${section.label} </a> </li>`)} </ul> </nav> </div>`;
}, "C:/foodnutritioncalculator.com/src/components/trust/TrustTOC.astro", void 0);

const $$TrustCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TrustCard;
  const { title, icon, class: className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`bg-white border border-border-soft rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col ${className}`, "class")}> <div class="flex items-center mb-4"> ${icon && renderTemplate`<div class="flex-shrink-0 w-10 h-10 rounded-full bg-mint-wash flex items-center justify-center text-usda-emerald font-bold mr-3"> <span>${unescapeHTML(icon)}</span> </div>`} <h3 class="text-xl font-bold text-ink-navy m-0 leading-tight">${title}</h3> </div> <div class="text-soft-slate text-[15px] leading-relaxed flex-grow"> ${renderSlot($$result, $$slots["default"])} </div> </div>`;
}, "C:/foodnutritioncalculator.com/src/components/trust/TrustCard.astro", void 0);

const $$TrustBulletList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TrustBulletList;
  const { title, class: className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`my-8 ${className}`, "class")}> ${title && renderTemplate`<h3 class="text-xl font-bold text-ink-navy mb-4">${title}</h3>`} <ul class="space-y-3 m-0 p-0 list-none"> ${renderSlot($$result, $$slots["default"])} </ul> </div>`;
}, "C:/foodnutritioncalculator.com/src/components/trust/TrustBulletList.astro", void 0);

const $$TrustBulletListItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TrustBulletListItem;
  const { class: className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li${addAttribute(`flex items-start ${className}`, "class")}> <svg class="h-5 w-5 text-usda-emerald mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path> </svg> <div class="text-[15px] text-soft-slate leading-relaxed"> ${renderSlot($$result, $$slots["default"])} </div> </li>`;
}, "C:/foodnutritioncalculator.com/src/components/trust/TrustBulletListItem.astro", void 0);

export { $$TrustTOC as $, $$TrustCard as a, $$TrustBulletList as b, $$TrustBulletListItem as c };
