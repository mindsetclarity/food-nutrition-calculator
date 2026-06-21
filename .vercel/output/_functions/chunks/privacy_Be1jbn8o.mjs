import { c as createComponent } from './astro-component_DEMRXoVo.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_DdV4XD_W.mjs';
import { $ as $$TrustPageShell } from './TrustPageShell_Ch39tGqU.mjs';
import { $ as $$LegalTOC, a as $$LegalSection } from './LegalSection_BuKMe5jt.mjs';

const $$Privacy = createComponent(($$result, $$props, $$slots) => {
  const toc = [
    { id: "overview", label: "1. Overview" },
    { id: "information-collected", label: "2. Information You May Provide" },
    { id: "how-we-use", label: "3. How We Use Information" },
    { id: "third-party", label: "4. APIs and Third-Party Providers" },
    { id: "local-storage", label: "5. Local Storage & Cookies" },
    { id: "data-retention", label: "6. Data Retention & Security" },
    { id: "children", label: "7. Children's Privacy" },
    { id: "contact", label: "8. Contact & Changes" }
  ];
  return renderTemplate`${renderComponent($$result, "TrustPageShell", $$TrustPageShell, { "showCta": false, "title": "Privacy Policy | Food Nutrition Calculator", "description": "Read how Food Nutrition Calculator handles meal text, nutrition searches, server requests, third-party APIs, and privacy for calculator users.", "eyebrow": "Privacy Policy", "updatedAt": "June 2026" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="legal-layout"> ${renderComponent($$result2, "LegalTOC", $$LegalTOC, { "items": toc })} <div class="legal-content"> ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "overview", "heading": "1. Overview" }, { "default": ($$result3) => renderTemplate` <p>This page is provided for transparency and general information regarding how the Food Nutrition Calculator operates. Our current MVP is designed to function primarily without requiring user accounts or invasive tracking.</p> ` })} ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "information-collected", "heading": "2. Information You May Provide" }, { "default": ($$result3) => renderTemplate` <p>While using our tools, you may voluntarily input information into our calculators, such as:</p> <ul> <li>Food search queries (e.g., "apple", "chicken breast").</li> <li>Recipe ingredient text or meal descriptions.</li> <li>Quantities, weights, and serving size inputs.</li> </ul> <p>Additionally, standard browser and device request data (such as IP address and user-agent strings) are normally sent with web requests to our hosting servers.</p> ` })} ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "how-we-use", "heading": "3. How We Use Information" }, { "default": ($$result3) => renderTemplate` <p>The text and inputs you provide are used strictly to operate the calculators. This includes:</p> <ul> <li>Returning relevant food search results.</li> <li>Parsing meal or recipe text (if AI parsing features are utilized).</li> <li>Calculating deterministic nutrition estimates based on your inputs.</li> <li>Improving page functionality and resolving application errors locally.</li> </ul> ` })} ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "third-party", "heading": "4. APIs and Third-Party Providers" }, { "default": ($$result3) => renderTemplate` <p>To provide high-quality nutrition data and intelligent parsing, your inputs may be processed by server-side endpoints and third-party providers when configured:</p> <ul> <li><strong>USDA FoodData Central:</strong> Search queries may be routed to USDA APIs to fetch verified nutrition data.</li> <li><strong>LLM Providers:</strong> If you use our natural language recipe or meal parsers, the unstructured text you enter is sent to a configured Large Language Model provider to interpret the text into structured food requests.</li> </ul> <p>We do not expose our internal API keys to the client. However, you should assume that text entered into the natural language parser is processed by these third-party services in order to function.</p> ` })} ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "local-storage", "heading": "5. Local Storage & Cookies" }, { "default": ($$result3) => renderTemplate` <p>The current MVP does not require an account and does not intentionally use cookies for advertising, marketing, or user profiling.</p> <p>Some browser storage (like <code>localStorage</code> or <code>sessionStorage</code>) may be utilized temporarily to maintain basic interface state (such as keeping a modal open or remembering a selected unit metric) while you actively use the tools.</p> ` })} ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "data-retention", "heading": "6. Data Retention & Security" }, { "default": ($$result3) => renderTemplate` <p>Our current version does not provide an account-based saved history system. We do not intentionally store your meal calculations or recipe histories in a long-term user database.</p> <p>Standard server logs may exist depending on our hosting provider's default infrastructure (e.g., Vercel, Netlify). API keys and application secrets are secured server-side. While we use modern web practices, no system is perfectly secure.</p> ` })} ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "children", "heading": "7. Children's Privacy" }, { "default": ($$result3) => renderTemplate` <p>This site is intended for general audiences. It is not directed at, nor do we knowingly collect personal data from, children under the age of 13.</p> ` })} ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "contact", "heading": "8. Contact & Changes" }, { "default": ($$result3) => renderTemplate` <p>This policy is a practical informational template and may be updated periodically to reflect new features or architectural changes to the tools.</p> <p><em>Contact information may be added later as the project develops a formal support infrastructure.</em></p> ` })} </div> </div> ` })}`;
}, "C:/fnc/src/pages/privacy.astro", void 0);

const $$file = "C:/fnc/src/pages/privacy.astro";
const $$url = "/privacy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Privacy,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
