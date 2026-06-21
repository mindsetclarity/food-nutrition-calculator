import { c as createComponent } from './astro-component_DEMRXoVo.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, k as renderTemplate } from './entrypoint_DdV4XD_W.mjs';
import 'clsx';

const $$TrustTOC = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TrustTOC;
  const { sections } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="bg-white border border-border-soft rounded-2xl p-6 shadow-sm mb-12"> <h2 class="text-sm font-bold text-ink-navy uppercase tracking-wider mb-4">On this page</h2> <nav> <ul class="flex flex-wrap gap-x-6 gap-y-3 m-0 p-0 list-none"> ${sections.map((section) => renderTemplate`<li> <a${addAttribute(`#${section.id}`, "href")} class="text-[15px] font-semibold text-usda-emerald hover:text-emerald-800 hover:underline transition-colors flex items-center"> ${section.label} </a> </li>`)} </ul> </nav> </div>`;
}, "C:/fnc/src/components/trust/TrustTOC.astro", void 0);

export { $$TrustTOC as $ };
