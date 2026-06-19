import { c as createComponent } from './astro-component_DnVRAbcp.mjs';
import 'piccolore';
import { k as renderTemplate, h as addAttribute, o as renderComponent, q as renderHead, p as renderSlot } from './entrypoint_D0oTHkUW.mjs';
import { r as renderScript, a as $$SeoHead, b as $$Header, c as $$Footer } from './SeoHead_Bz2tiSQZ.mjs';
import 'clsx';

const $$MotionObserver = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderScript($$result, "C:/foodnutritioncalculator.com/src/components/site/MotionObserver.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/foodnutritioncalculator.com/src/components/site/MotionObserver.astro", void 0);

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description,
    canonicalPath = Astro2.url.pathname,
    noindex,
    ogType,
    jsonLd
  } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro2.generator, "content")}>${renderComponent($$result, "SeoHead", $$SeoHead, { "title": title, "description": description, "canonicalPath": canonicalPath, "noindex": noindex, "ogType": ogType, "jsonLd": jsonLd })}<!-- Inter Font Fallback (Similar to Geist) --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">${renderHead()}</head> <body class="bg-[var(--color-canvas-soft)] text-[var(--color-ink)] min-h-screen flex flex-col no-body-overflow-guard"> <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-brand-600 focus-ring rounded-md m-4 shadow-premium">
Skip to content
</a> ${renderComponent($$result, "Header", $$Header, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} ${renderComponent($$result, "MotionObserver", $$MotionObserver, {})} <div id="a11y-status" class="sr-only" aria-live="polite" aria-atomic="true"></div> </body></html>`;
}, "C:/foodnutritioncalculator.com/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
