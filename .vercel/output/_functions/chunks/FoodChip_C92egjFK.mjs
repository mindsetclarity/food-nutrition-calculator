import { c as createComponent } from './astro-component_DnVRAbcp.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, k as renderTemplate } from './entrypoint_D0oTHkUW.mjs';
import 'clsx';

const $$FoodChip = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$FoodChip;
  const { label, icon, class: className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`inline-flex items-center gap-1.5 px-3 py-1.5 bg-pure-card border border-border-soft rounded-full shadow-sm text-[13px] font-medium text-ink-navy hover:shadow-premium hover:-translate-y-0.5 transition-all duration-300 ${className}`, "class")} aria-hidden="true"> ${icon && renderTemplate`<span class="text-sm">${icon}</span>`} ${label} </div>`;
}, "C:/foodnutritioncalculator.com/src/components/ui/FoodChip.astro", void 0);

export { $$FoodChip as $ };
