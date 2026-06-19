# Phase 22: Trust, About, Privacy, Terms, Disclaimer Pages

## 1. Purpose of Phase 22
The goal of Phase 22 is to strengthen user trust and legal/safety communication by building a suite of transparent, premium-feeling informational pages. These pages outline our data sources, methodology, limitations, and terms of use without overpromising or providing medical advice.

## 2. Routes Created/Updated
Created:
- `/about`
- `/privacy`
- `/terms`
- `/disclaimer`
- `/methodology`
- `/data-sources`

Updated:
- `src/components/site/Footer.astro` (added new links)

## 3. Shared Trust/Legal Components
We created several reusable UI components to ensure the legal pages feel like a cohesive, premium part of the application rather than an afterthought:
- `TrustPageShell.astro`: A unified layout wrapper.
- `TrustHero.astro`: A clean header for informational pages.
- `SafetyDisclaimerBlock.astro`: A prominent, reusable medical disclaimer box.
- `NutritionTruthHierarchy.astro`: A visual breakdown of USDA vs. Local vs. AI parsing.
- `LegalSection.astro`: Standardized formatting for policy text.
- `LegalTOC.astro`: A sticky sidebar for easy navigation of long documents.
- `TrustCTASection.astro`: A global footer component directing users back to the core tools.

## 4. About Page Summary
Explains what the Food Nutrition Calculator does and what makes it different (source transparency). Embeds the Nutrition Truth Hierarchy and clearly defines the AI parsing boundary (AI parses text but does not invent math).

## 5. Privacy Page Summary
An honest, practical privacy template. It explicitly states that while we do not require accounts or store meal histories in a database (in the current MVP), search queries and recipe text are sent to our servers and may be processed by third-party APIs (USDA, LLM providers) to function.

## 6. Terms Page Summary
Outlines acceptable use, limitations of liability, and the educational nature of the tools. Emphasizes that nutrition values are estimates subject to variation.

## 7. Disclaimer Page Summary
A centralized page expanding on why nutrition math is inherently an estimation (brand differences, moisture loss, measurement errors). Explicitly warns that the site is not providing medical diagnoses or allergy safety guarantees.

## 8. Methodology Page Summary
A detailed breakdown of the calculation pipeline. Explains how foods are resolved, how weight (grams) serves as the base for all calculations, and how the deterministic engine scales those values predictably.

## 9. Data Sources Page Summary
Elaborates on the difference between USDA Foundation Foods, SR Legacy, Branded Foods, and our local fallback database. Explains the purpose of the source badges used throughout the application.

## 10. Contact Page Decision
The `/contact` route was skipped because the project does not currently have a defined support email or a backend to handle form submissions. We documented this decision to avoid building non-functional placeholder forms.

## 11. Footer/Internal Link Updates
The global `Footer.astro` was updated to explicitly link to About, Methodology, Data Sources, Privacy, Terms, and Disclaimer under a unified "Legal & Trust" section.

## 12. Privacy Honesty Notes
The privacy policy avoids the common trap of claiming "we process zero data." It correctly acknowledges that to provide intelligent parsing and search, data hits server-side endpoints and configured third-party services.

## 13. Legal Safety Wording
All pages are written as practical informational templates. We avoided claiming FDA/USDA partnerships, lawyer-reviewed compliance guarantees, or medical authority. 

## 14. Accessibility Decisions
The pages use semantic HTML (`h2`, `h3`). The Table of Contents is fully keyboard navigable. High contrast was maintained for readability during long reading sessions.

## 15. Mobile Decisions
The sticky sidebar Table of Contents collapses into a standard block flow on mobile. Long text blocks wrap cleanly without horizontal scrolling.

## 16. What Was Intentionally Not Implemented
- Real legal compliance guarantees.
- Cookie banners (because we didn't add tracking cookies).
- Analytics tracking.
- Account systems.
- Contact forms requiring a backend.

## 17. Known Limitations
These policies are high-level templates suitable for an MVP startup. If the site begins collecting PII or processing payments, these pages would need formal legal review.

## 18. Phase 23 Recommendation
Proceed to Phase 23: Final Polish & Animations.
