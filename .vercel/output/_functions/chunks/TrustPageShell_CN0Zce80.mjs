import { c as createComponent } from './astro-component_DnVRAbcp.mjs';
import 'piccolore';
import { m as maybeRenderHead, k as renderTemplate, o as renderComponent, p as renderSlot } from './entrypoint_D0oTHkUW.mjs';
import { $ as $$SiteLayout } from './SiteLayout_YHvHq5NO.mjs';
import 'clsx';
import { $ as $$Button } from './SeoHead_Bz2tiSQZ.mjs';
import { a as buildWebPageSchema } from './schema_D8-JCEV_.mjs';
import { s as siteConfig } from './siteConfig_Bc-3p4QP.mjs';

const $$TrustHero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TrustHero;
  const { title, description, eyebrow, badges = [], updatedAt } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="bg-white border-b border-border-soft py-16 sm:py-24 relative overflow-hidden" data-reveal> <div class="absolute -right-24 -top-24 w-96 h-96 bg-mint-wash rounded-full opacity-40 blur-3xl pointer-events-none"></div> <div class="site-container relative z-10 text-center"> <span class="inline-block text-xs font-bold text-usda-emerald tracking-wider uppercase mb-4"> ${eyebrow} </span> <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-ink-navy tracking-tight mb-6 max-w-4xl mx-auto leading-tight"> ${title.split("|")[0].trim()} </h1> <p class="text-lg sm:text-xl text-soft-slate leading-relaxed max-w-3xl mx-auto mb-8"> ${description} </p> ${badges.length > 0 && renderTemplate`<div class="flex flex-wrap justify-center gap-3 mb-6"> ${badges.map((badge) => renderTemplate`<span class="inline-flex items-center px-3 py-1 rounded-full text-[13px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100"> ${badge} </span>`)} </div>`} ${updatedAt && renderTemplate`<p class="text-[13px] text-muted-text font-medium mt-6">
Last updated: ${updatedAt} </p>`} </div> </div>`;
}, "C:/foodnutritioncalculator.com/src/components/trust/TrustHero.astro", void 0);

const $$TrustCTASection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="bg-ink-navy text-white py-16 sm:py-24 relative overflow-hidden mt-12"> <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 to-ink-navy opacity-50"></div> <div class="site-container relative z-10 text-center"> <h2 class="text-3xl sm:text-4xl font-black mb-4">Start Calculating</h2> <p class="text-slate-300 max-w-2xl mx-auto mb-10 text-lg">
Ready to see source-labeled nutrition estimates in action? Try the calculators.
</p> <div class="flex flex-col sm:flex-row justify-center items-center gap-4"> ${renderComponent($$result, "Button", $$Button, { "href": "/calculator", "variant": "primary", "class": "bg-usda-emerald hover:bg-emerald-700 text-white shadow-premium border-none w-full sm:w-auto justify-center" }, { "default": ($$result2) => renderTemplate`
Food Calculator
` })} ${renderComponent($$result, "Button", $$Button, { "href": "/recipe-nutrition-calculator", "variant": "secondary", "class": "bg-slate-800 hover:bg-slate-700 text-white border-slate-700 w-full sm:w-auto justify-center" }, { "default": ($$result2) => renderTemplate`
Recipe Calculator
` })} ${renderComponent($$result, "Button", $$Button, { "href": "/learn", "variant": "quiet", "class": "text-slate-300 hover:text-white hover:bg-slate-800 w-full sm:w-auto justify-center" }, { "default": ($$result2) => renderTemplate`
Learn Hub
` })} </div> </div> </section>`;
}, "C:/foodnutritioncalculator.com/src/components/trust/TrustCTASection.astro", void 0);

const $$TrustPageShell = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TrustPageShell;
  const { title, description, eyebrow, badges = [], updatedAt } = Astro2.props;
  const jsonLd = buildWebPageSchema({
    name: title,
    description,
    url: `${siteConfig.siteUrl}${Astro2.url.pathname}`
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$SiteLayout, { "title": title, "description": description, "jsonLd": jsonLd }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main id="main-content" class="min-h-screen bg-warm-ivory pb-24"> ${renderComponent($$result2, "TrustHero", $$TrustHero, { "title": title, "description": description, "eyebrow": eyebrow, "badges": badges, "updatedAt": updatedAt })} <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16"> <div class="prose prose-emerald prose-lg max-w-none text-ink-navy"> ${renderSlot($$result2, $$slots["default"])} </div> </div> ${renderComponent($$result2, "TrustCTASection", $$TrustCTASection, {})} </main> ` })}`;
}, "C:/foodnutritioncalculator.com/src/components/trust/TrustPageShell.astro", void 0);

export { $$TrustPageShell as $ };
