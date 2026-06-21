import { c as createComponent } from './astro-component_DEMRXoVo.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, k as renderTemplate, o as renderComponent } from './entrypoint_DdV4XD_W.mjs';
import { $ as $$FoodChip } from './FoodChip_Bw_T-lnb.mjs';

const $$PageHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PageHeader;
  const { title, description, breadcrumbs, chipType } = Astro2.props;
  const getChips = () => {
    switch (chipType) {
      case "calculator":
        return [{ icon: "🍌", label: "banana" }, { icon: "🌾", label: "oats" }, { icon: "🥑", label: "avocado" }];
      case "recipe":
        return [{ icon: "🥣", label: "oatmeal" }, { icon: "🍓", label: "berries" }, { icon: "🥜", label: "almonds" }];
      case "meal":
        return [{ icon: "🥗", label: "salad" }, { icon: "🧆", label: "lentils" }, { icon: "🍚", label: "brown rice" }];
      case "compare":
        return [{ icon: "🥑", label: "avocado" }, { icon: "🍠", label: "sweet potato" }];
      case "foods":
        return [{ icon: "🌾", label: "quinoa" }, { icon: "🥒", label: "cucumber" }];
      case "learn":
      case "trust":
        return [];
      default:
        return [];
    }
  };
  const chips = getChips();
  return renderTemplate`${maybeRenderHead()}<div class="bg-warm-ivory border-b border-border-soft pb-12 pt-8 sm:pt-12 relative overflow-hidden"> <div class="absolute inset-0 bg-[radial-gradient(var(--color-emerald-soft)_1px,transparent_1px)] [background-size:20px_20px] opacity-20 -z-10"></div> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <nav class="flex mb-6" aria-label="Breadcrumb"> <ol class="flex items-center space-x-2 text-sm text-soft-slate"> <li> <a href="/" class="hover:text-usda-emerald transition-colors">Home</a> </li> ${breadcrumbs.map((crumb, idx) => renderTemplate`<li class="flex items-center"> <svg class="w-4 h-4 text-border-soft mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg> ${crumb.href ? renderTemplate`<a${addAttribute(crumb.href, "href")} class="hover:text-usda-emerald transition-colors">${crumb.label}</a>` : renderTemplate`<span class="text-ink-navy font-medium">${crumb.label}</span>`} </li>`)} </ol> </nav> <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6"> <div class="max-w-3xl"> <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink-navy tracking-tight mb-4"> ${title} </h1> <p class="text-lg text-soft-slate max-w-2xl leading-relaxed"> ${description} </p> </div> ${chips.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2 shrink-0 pb-1"> <span class="text-xs text-muted-text uppercase tracking-wider font-semibold mr-2 self-center">Try:</span> ${chips.map((chip) => renderTemplate`${renderComponent($$result, "FoodChip", $$FoodChip, { "icon": chip.icon, "label": chip.label, "class": "bg-white" })}`)} </div>`} </div> </div> </div>`;
}, "C:/fnc/src/components/site/PageHeader.astro", void 0);

export { $$PageHeader as $ };
