# Phase 6: Premium Layout Shell & Navigation

## Shell Architecture
- **SiteLayout:** The universal page wrapper. Manages the global `<html>` and `<body>` tags, basic SEO metadata (title, description, canonical URL, OG tags), skip link for accessibility, and layout structure (header, main, footer).
- **PageHeader:** Reusable component for the top of internal pages, giving them consistent padding, animation (`animate-fade-up`), and layout.
- **Breadcrumbs:** Simple, semantic `<nav>` for non-home pages indicating hierarchy.

## Header Structure
- **Design:** Sticky header with `backdrop-blur` and a translucent white background (`bg-white/80`). 
- **Navigation:** Semantic `<nav>` utilizing the `NavigationLink` component for automatic active state detection (`aria-current="page"`).
- **Mobile Menu:** Hidden on desktop, toggled via a lightweight inline `<script>`. Uses standard `aria-expanded` and `aria-controls` for accessibility.

## Footer Structure
- **Design:** Clean, multi-column grid dividing tools, database sections, and legal links.
- **Typography:** Uses muted colors (`text-muted`) and hover effects for interactive elements.
- **Disclaimer:** Explicit medical disclaimer located at the bottom of the footer for compliance and trust.

## TrustStrip
- Reusable horizontal bar demonstrating the USDA-First approach and site principles. Placed prominently on the homepage to establish immediate credibility.

## Accessibility Decisions
- **Skip Link:** Always included in `SiteLayout`, visible only on focus, to allow keyboard users to jump directly to `#main-content`.
- **Focus Rings:** Centralized `.focus-ring` utility applied to all links and buttons.
- **Semantic HTML:** Deep usage of `<nav>`, `<main>`, `<header>`, and `<footer>`.

## Motion Decisions
- **Page Load:** Elements utilize `animate-fade-up` with staggered animation delays (`animation-delay`) for a premium entrance effect.
- **Hover Microinteractions:** The `hover-lift` utility provides smooth elevation and shadow transition on interactive elements.

## Remaining TODOs for Phase 7
- Complete SEO metadata injection dynamically via Astro props per page (structured data, robust OG).
- Finalize the true homepage copy and remove the Phase 6 Hero placeholder.
- Begin wiring the `calculator` interactive shell.
