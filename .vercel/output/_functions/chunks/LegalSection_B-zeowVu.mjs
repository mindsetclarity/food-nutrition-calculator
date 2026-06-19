import { c as createComponent } from './astro-component_DnVRAbcp.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, k as renderTemplate, p as renderSlot } from './entrypoint_D0oTHkUW.mjs';
import 'clsx';

const $$LegalTOC = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$LegalTOC;
  const { items } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<aside class="legal-toc bg-white border border-border-soft rounded-[var(--radius-card)] p-6 shadow-sm w-full"> <h3 class="text-xs font-bold text-usda-emerald uppercase tracking-wider mb-4">Table of Contents</h3> <nav aria-label="Table of contents" class="flex flex-col gap-3"> ${items.map((item) => renderTemplate`<a${addAttribute(`#${item.id}`, "href")} class="text-[15px] font-medium text-soft-slate hover:text-ink-navy transition-colors"> ${item.label} </a>`)} </nav> </aside>`;
}, "C:/foodnutritioncalculator.com/src/components/trust/LegalTOC.astro", void 0);

const $$LegalSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$LegalSection;
  const { id, heading } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(id, "id")} class="legal-section"> <h2 class="text-2xl font-black text-ink-navy m-0">${heading}</h2> <div class="space-y-4 text-soft-slate leading-relaxed text-[17px]"> ${renderSlot($$result, $$slots["default"])} </div> </section>`;
}, "C:/foodnutritioncalculator.com/src/components/trust/LegalSection.astro", void 0);

export { $$LegalTOC as $, $$LegalSection as a };
