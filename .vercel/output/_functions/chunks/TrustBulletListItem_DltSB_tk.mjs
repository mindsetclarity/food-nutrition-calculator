import { c as createComponent } from './astro-component_DEMRXoVo.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, k as renderTemplate, p as renderSlot } from './entrypoint_DdV4XD_W.mjs';
import 'clsx';

const $$TrustBulletList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TrustBulletList;
  const { title, class: className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`my-8 ${className}`, "class")}> ${title && renderTemplate`<h3 class="text-xl font-bold text-ink-navy mb-4">${title}</h3>`} <ul class="space-y-3 m-0 p-0 list-none"> ${renderSlot($$result, $$slots["default"])} </ul> </div>`;
}, "C:/fnc/src/components/trust/TrustBulletList.astro", void 0);

const $$TrustBulletListItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TrustBulletListItem;
  const { class: className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li${addAttribute(`flex items-start ${className}`, "class")}> <svg class="h-5 w-5 text-usda-emerald mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path> </svg> <div class="text-[15px] text-soft-slate leading-relaxed"> ${renderSlot($$result, $$slots["default"])} </div> </li>`;
}, "C:/fnc/src/components/trust/TrustBulletListItem.astro", void 0);

export { $$TrustBulletList as $, $$TrustBulletListItem as a };
