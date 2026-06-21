import { c as createComponent } from './astro-component_DEMRXoVo.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_DdV4XD_W.mjs';
import { $ as $$SiteLayout } from './SiteLayout_B-r8uoSu.mjs';
import { $ as $$Button } from './SeoHead_BfjWHf_w.mjs';

const $$500 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$500;
  const { error } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "SiteLayout", $$SiteLayout, { "title": "Internal Server Error | Food Nutrition Calculator", "description": "We are experiencing an internal server error. Please try again later.", "noindex": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="min-h-[70vh] flex flex-col justify-center bg-gray-50/50 py-24"> <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"> <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 text-red-600 mb-8"> <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> </div> <h1 class="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-6">Something went wrong</h1> <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
We're experiencing an internal server error. Our team has been notified and we are working to fix it. Please try again later.
</p> ${false} <div class="mt-8"> ${renderComponent($$result2, "Button", $$Button, { "href": "/", "variant": "primary", "class": "w-full sm:w-auto justify-center interactive-button" }, { "default": ($$result3) => renderTemplate`
Back to Homepage
` })} </div> </div> </div> ` })}`;
}, "C:/fnc/src/pages/500.astro", void 0);
const $$file = "C:/fnc/src/pages/500.astro";
const $$url = "/500";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$500,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
