import { c as createComponent } from './astro-component_DnVRAbcp.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_D0oTHkUW.mjs';
import { $ as $$TrustPageShell } from './TrustPageShell_CN0Zce80.mjs';
import { $ as $$LegalTOC, a as $$LegalSection } from './LegalSection_B-zeowVu.mjs';
import { $ as $$SafetyDisclaimerBlock } from './SafetyDisclaimerBlock_C0NA5xz4.mjs';

const $$Terms = createComponent(($$result, $$props, $$slots) => {
  const toc = [
    { id: "acceptance", label: "1. Acceptance of Terms" },
    { id: "purpose", label: "2. Educational Purpose" },
    { id: "no-medical-advice", label: "3. No Medical Advice" },
    { id: "estimates", label: "4. Nutrition Estimates" },
    { id: "data-sources", label: "5. Data Sources & AI" },
    { id: "user-responsibility", label: "6. User Responsibility" },
    { id: "acceptable-use", label: "7. Acceptable Use" },
    { id: "intellectual-property", label: "8. Intellectual Property" },
    { id: "limitation-liability", label: "9. Limitation of Liability" }
  ];
  return renderTemplate`${renderComponent($$result, "TrustPageShell", $$TrustPageShell, { "title": "Terms of Use | Food Nutrition Calculator", "description": "Read the terms for using Food Nutrition Calculator, including acceptable use, estimate limitations, AI parsing boundaries, and nutrition data disclaimers.", "eyebrow": "Terms of Use", "updatedAt": "June 2026" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="legal-layout"> ${renderComponent($$result2, "LegalTOC", $$LegalTOC, { "items": toc })} <div class="legal-content"> ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "acceptance", "heading": "1. Acceptance of Terms" }, { "default": ($$result3) => renderTemplate` <p>By accessing and using the Food Nutrition Calculator website, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our tools.</p> ` })} ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "purpose", "heading": "2. Educational Purpose" }, { "default": ($$result3) => renderTemplate` <p>This website and its associated calculators are provided exclusively for general informational, educational, and personal nutrition planning purposes.</p> ` })} ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "no-medical-advice", "heading": "3. No Medical Advice" }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "SafetyDisclaimerBlock", $$SafetyDisclaimerBlock, {})} <p>We do not provide medical diagnoses or treatment plans. You must consult a qualified healthcare professional before making significant changes to your diet, especially if you are managing a medical condition, food allergies, pregnancy, or eating disorders.</p> ` })} ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "estimates", "heading": "4. Nutrition Estimates" }, { "default": ($$result3) => renderTemplate` <p>All values calculated by our tools are <strong>estimates</strong>. Real-world nutrition can vary due to:</p> <ul> <li>Differences between food brands and manufacturers.</li> <li>Preparation and cooking methods (e.g., moisture loss or added fats).</li> <li>Natural variations in crop soil quality and livestock.</li> <li>Measurement errors or varying interpretations of "serving sizes."</li> <li>Missing or incomplete nutrient data in the underlying databases.</li> </ul> ` })} ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "data-sources", "heading": "5. Data Sources & AI Boundaries" }, { "default": ($$result3) => renderTemplate` <p>We utilize a variety of data sources to power the calculators:</p> <ul> <li><strong>USDA Data:</strong> USDA FoodData Central may be used as a primary source when configured. We are not affiliated with, nor endorsed by, the USDA.</li> <li><strong>Local Fallbacks:</strong> A local dataset is used as a fallback when API access is restricted or unavailable.</li> <li><strong>AI Parsing:</strong> Large Language Models (LLMs) may be utilized strictly to parse messy text inputs into structured data. AI is not relied upon to act as the final authority on nutritional math.</li> </ul> ` })} ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "user-responsibility", "heading": "6. User Responsibility" }, { "default": ($$result3) => renderTemplate` <p>As a user, you agree that you are solely responsible for verifying the accuracy of the information provided by this tool before relying on it. You must use your own judgment, check physical commercial product labels, and verify allergen warnings directly with manufacturers.</p> ` })} ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "acceptable-use", "heading": "7. Acceptable Use" }, { "default": ($$result3) => renderTemplate` <p>When using this site, you agree not to:</p> <ul> <li>Aggressively scrape or bulk-download the site's data.</li> <li>Abuse or reverse-engineer the underlying API endpoints.</li> <li>Attempt to access server-side secrets, API keys, or protected infrastructure.</li> <li>Use the site in a manner that disrupts service for other users.</li> </ul> ` })} ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "intellectual-property", "heading": "8. Intellectual Property" }, { "default": ($$result3) => renderTemplate` <p>The site design, original code, and custom content belong to the project owner. Third-party data (such as USDA datasets) remain in the public domain or under their respective licenses. All product names, logos, and brands mentioned are property of their respective owners.</p> ` })} ${renderComponent($$result2, "LegalSection", $$LegalSection, { "id": "limitation-liability", "heading": "9. Limitation of Liability" }, { "default": ($$result3) => renderTemplate` <p>The site may be updated, modified, or become temporarily unavailable without notice. The tools are provided "AS IS" without warranty of any kind. We do not guarantee completeness, absolute accuracy, or suitability for any particular purpose. In no event shall the website operators be liable for any direct, indirect, incidental, or consequential damages arising from the use of the information provided.</p> ` })} </div> </div> ` })}`;
}, "C:/foodnutritioncalculator.com/src/pages/terms.astro", void 0);

const $$file = "C:/foodnutritioncalculator.com/src/pages/terms.astro";
const $$url = "/terms";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Terms,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
