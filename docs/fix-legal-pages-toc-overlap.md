# Legal Pages TOC Overlap Fix

## 1. Problem Summary
The "Table of Contents" (TOC) sidebar on the `/privacy` and `/terms` pages was incorrectly overlapping the main article content. This happened primarily on scroll and smaller viewports because the TOC was styled with sticky positioning without proper grid boundaries, removing it from normal document flow.

## 2. Root Cause
The `LegalTOC.astro` component used `sticky top-24` on its wrapper, forcing it into sticky behavior on *all* viewports including mobile. Combined with `flex-grow max-w-3xl` on the content inside a flex container that wrapped on smaller screens, the TOC sat fixed at the top of the screen and covered the scrolling content below it.

## 3. Files Changed
- `src/styles/global.css`: Appended specific, robust grid-based layout classes (`.legal-layout`, `.legal-toc`, `.legal-content`, `.legal-section`).
- `src/pages/privacy.astro`: Swapped flex utility classes for the new grid layout classes.
- `src/pages/terms.astro`: Swapped flex utility classes for the new grid layout classes.
- `src/components/trust/LegalTOC.astro`: Removed global `sticky` utilities, replaced wrapper with semantic `<aside>` using the `.legal-toc` class. Added `aria-label` to the nav.
- `src/components/trust/LegalSection.astro`: Updated the wrapper to use the `.legal-section` class.

## 4. Layout Fix Applied
We successfully implemented **Option B — Desktop sidebar, mobile stacked**.
- A CSS Grid layout (`grid-template-columns: minmax(220px, 280px) minmax(0, 1fr)`) handles the desktop sidebar safely.
- On screens `max-width: 900px`, the grid collapses to `1fr` and the `.legal-toc` falls back to `position: relative`, stacking completely naturally above the content flow.
- A `scroll-margin-top` calculation was added to `.legal-section` to prevent jump links from hiding content underneath the sticky site header.

## 5. Privacy Page Verification
Verified. The TOC acts as a left-hand sidebar on desktop, and stacks cleanly with margin on mobile. No text gets clipped or obscured.

## 6. Terms Page Verification
Verified. Similar to Privacy, the grid layout strictly separates the TOC column from the legal text column.

## 7. Mobile Verification
The TOC gracefully degrades to a normal, un-sticky, relative-positioned block on viewports under 900px, avoiding all overlapping on 320px, 360px, 390px, and 414px displays.

## 8. Accessibility Verification
Added `aria-label="Table of contents"` to the navigation `<nav>` inside `LegalTOC.astro`. Focus rings work seamlessly. Keyboard navigation respects the anchor jump spacing.

## 9. Build Result
`npm run build` completed successfully in ~12 seconds. No compilation errors or layout breaks.
