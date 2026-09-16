import { c as createComponent } from './astro-component_DEMRXoVo.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, u as unescapeHTML, k as renderTemplate, p as renderSlot } from './entrypoint_DdV4XD_W.mjs';
import 'clsx';

const $$TrustCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TrustCard;
  const { title, icon, class: className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`bg-white border border-border-soft rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col ${className}`, "class")}> <div class="flex items-center mb-4"> ${icon && renderTemplate`<div class="flex-shrink-0 w-10 h-10 rounded-full bg-mint-wash flex items-center justify-center text-usda-emerald font-bold mr-3"> <span>${unescapeHTML(icon)}</span> </div>`} <h3 class="text-xl font-bold text-ink-navy m-0 leading-tight">${title}</h3> </div> <div class="text-soft-slate text-[15px] leading-relaxed flex-grow"> ${renderSlot($$result, $$slots["default"])} </div> </div>`;
}, "C:/fnc/src/components/trust/TrustCard.astro", void 0);

export { $$TrustCard as $ };
