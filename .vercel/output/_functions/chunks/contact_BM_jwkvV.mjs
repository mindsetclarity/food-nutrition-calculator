import { c as createComponent } from './astro-component_DEMRXoVo.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_DdV4XD_W.mjs';
import { $ as $$TrustPageShell } from './TrustPageShell_Ch39tGqU.mjs';
import { $ as $$LegalTOC, a as $$LegalSection } from './LegalSection_BuKMe5jt.mjs';
import { $ as $$TrustCard } from './TrustCard_CWwzj2SH.mjs';
import { $ as $$Button } from './SeoHead_BfjWHf_w.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const toc = [
    { id: "general-inquiries", label: "1. General Inquiries" },
    { id: "send-message", label: "2. Send a Message" },
    { id: "business", label: "3. Business & Partnerships" }
  ];
  return renderTemplate`${renderComponent($$result, "TrustPageShell", $$TrustPageShell, { "title": "Contact Us | Food Nutrition Calculator", "description": "Get in touch with the Food Nutrition Calculator team for support, feedback, and business inquiries.", "eyebrow": "Contact Us" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="legal-layout flex flex-col md:flex-row gap-8"> <div class="md:w-1/3"> ${renderComponent($$result2, "LegalTOC", $$LegalTOC, { "items": toc })} </div> <div class="legal-content md:w-2/3"> <section class="mb-8"> ${renderComponent($$result2, "TrustCard", $$TrustCard, { "title": "Get in touch", "icon": "✉️" }, { "default": ($$result3) => renderTemplate` <p class="mb-4 text-soft-slate">We're always looking to improve our tools and provide the best possible experience for our users. If you have questions, feedback, or need help, please don't hesitate to reach out.</p> ` })} </section> ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "general-inquiries", "heading": "1. General Inquiries" }, { "default": ($$result3) => renderTemplate` <p>For general questions about how to use the Food Nutrition Calculator, our methodology, or the data sources we rely on, please check our <a href="/methodology" class="text-[var(--color-primary)] hover:underline">Methodology</a> and <a href="/data-sources" class="text-[var(--color-primary)] hover:underline">Data Sources</a> pages first.</p> <p>If your question isn't answered there, feel free to email us at: <a href="mailto:hello@foodnutritioncalculator.com" class="font-medium text-[var(--color-primary)] hover:underline">hello@foodnutritioncalculator.com</a></p> ` })} ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "send-message", "heading": "2. Send a Message" }, { "default": ($$result3) => renderTemplate` <p class="mb-6">Have a specific question, bug report, or feature request? Drop us a message below.</p> <form class="bg-white border border-border-soft p-6 rounded-2xl shadow-sm flex flex-col gap-4" onsubmit="event.preventDefault(); alert('Message sending is currently simulated. Thank you for your feedback!');"> <div class="flex flex-col gap-1"> <label for="name" class="text-sm font-medium text-ink-navy">Name</label> <input type="text" id="name" placeholder="Your name" class="w-full px-4 py-2 rounded-lg border border-border-soft focus:outline-none focus:ring-2 focus:ring-usda-emerald/50" required> </div> <div class="flex flex-col gap-1"> <label for="email" class="text-sm font-medium text-ink-navy">Email Address</label> <input type="email" id="email" placeholder="you@example.com" class="w-full px-4 py-2 rounded-lg border border-border-soft focus:outline-none focus:ring-2 focus:ring-usda-emerald/50" required> </div> <div class="flex flex-col gap-1"> <label for="topic" class="text-sm font-medium text-ink-navy">Topic</label> <select id="topic" class="w-full px-4 py-2 rounded-lg border border-border-soft focus:outline-none focus:ring-2 focus:ring-usda-emerald/50"> <option>General Support</option> <option>Bug Report</option> <option>Feature Request</option> <option>Other</option> </select> </div> <div class="flex flex-col gap-1"> <label for="message" class="text-sm font-medium text-ink-navy">Message</label> <textarea id="message" rows="4" placeholder="How can we help?" class="w-full px-4 py-2 rounded-lg border border-border-soft focus:outline-none focus:ring-2 focus:ring-usda-emerald/50" required></textarea> </div> ${renderComponent($$result3, "Button", $$Button, { "type": "submit", "variant": "primary", "class": "bg-usda-emerald hover:bg-emerald-700 text-white shadow-premium border-none w-full justify-center mt-2" }, { "default": ($$result4) => renderTemplate`
Send Message
` })} </form> ` })} ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "business", "heading": "3. Business & Partnerships" }, { "default": ($$result3) => renderTemplate` <p>For business inquiries, API access requests, or potential partnerships, please contact our business development team.</p> <p>Reach out to: <a href="mailto:partnerships@foodnutritioncalculator.com" class="font-medium text-[var(--color-primary)] hover:underline">partnerships@foodnutritioncalculator.com</a></p> ` })} <section class="mt-16 mb-8 bg-mint-wash border border-emerald-100 rounded-2xl p-8 text-center"> <h2 class="text-2xl font-black text-ink-navy mb-3">Learn more about us</h2> <p class="text-emerald-900 mb-8 max-w-xl mx-auto">
Discover how we process data and our approach to making nutrition transparent and accessible.
</p> <div class="flex flex-col sm:flex-row justify-center items-center gap-4"> ${renderComponent($$result2, "Button", $$Button, { "href": "/about", "variant": "primary", "class": "bg-usda-emerald hover:bg-emerald-700 text-white shadow-premium border-none w-full sm:w-auto justify-center" }, { "default": ($$result3) => renderTemplate`
About Us
` })} ${renderComponent($$result2, "Button", $$Button, { "href": "/privacy", "variant": "secondary", "class": "bg-white hover:bg-gray-50 text-ink-navy border-gray-200 w-full sm:w-auto justify-center" }, { "default": ($$result3) => renderTemplate`
Privacy Policy
` })} </div> </section> </div> </div> ` })}`;
}, "C:/fnc/src/pages/contact.astro", void 0);

const $$file = "C:/fnc/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
