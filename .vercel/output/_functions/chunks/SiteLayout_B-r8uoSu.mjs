import { c as createComponent } from './astro-component_DEMRXoVo.mjs';
import 'piccolore';
import { o as renderComponent, q as renderHead, h as addAttribute, p as renderSlot, k as renderTemplate } from './entrypoint_DdV4XD_W.mjs';
import { a as $$SeoHead, b as $$Header, c as $$Footer } from './SeoHead_BfjWHf_w.mjs';

const $$SiteLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SiteLayout;
  const {
    title,
    description,
    canonicalPath = Astro2.url.pathname,
    noindex,
    ogType,
    ogImage,
    keywords,
    jsonLd,
    bodyClass = ""
  } = Astro2.props;
  return renderTemplate`<html lang="en" class="antialiased scroll-smooth"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="shortcut icon" href="/favicon.ico"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><meta name="apple-mobile-web-app-title" content="FNC"><link rel="manifest" href="/site.webmanifest">${renderComponent($$result, "SeoHead", $$SeoHead, { "title": title, "description": description, "canonicalPath": canonicalPath, "noindex": noindex, "ogType": ogType, "ogImage": ogImage, "keywords": keywords, "jsonLd": jsonLd })}${renderHead()}</head> <body${addAttribute(`min-h-screen flex flex-col bg-background text-foreground ${bodyClass}`, "class")}> <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-brand-600 focus-ring rounded-md m-4 shadow-premium">
Skip to content
</a> ${renderComponent($$result, "Header", $$Header, {})} <main id="main-content" class="flex-grow flex flex-col w-full"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} <div id="a11y-status" class="sr-only" aria-live="polite" aria-atomic="true"></div> </body></html>`;
}, "C:/fnc/src/layouts/SiteLayout.astro", void 0);

export { $$SiteLayout as $ };
