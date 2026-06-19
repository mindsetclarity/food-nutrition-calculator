# Phase 5 Design System & Visual Language

## Design Principles
- **Premium & Professional:** High-end health-tech SaaS feel, inspired by Vercel and modern tools.
- **Trustworthy:** Clean typography, distinct data source indicators, no cluttered UI.
- **Calm & Minimal:** Neutral backgrounds (slate, zinc, white) with subtle accents.
- **Subtle Motion:** Elegant hover states and micro-interactions, respecting `prefers-reduced-motion`.

## Color Palette (Tailwind v4)
- **Backgrounds:** `--color-background` (white/slate-50), `--color-surface` (white), `--color-surface-elevated` (white with shadow).
- **Text:** `--color-foreground` (slate-900), `--color-muted` (slate-500).
- **Borders:** `--color-border` (slate-200).
- **Accents:** Emerald/Blue for trust, soft gold for premium highlights.

## Typography
- **Primary Font:** Inter (or similar sans-serif system fonts).
- **Scale:** Clean hierarchy, utilizing Tailwind's default scales with tighter tracking on headings.
- **Numerics:** Tabular numerals (`tabular-nums`) for calculator results and tables.

## Component Systems
1. **Buttons (`Button.astro`):** 
   - Variants: primary (slate-900), secondary (white/outline), ghost (transparent), subtle.
   - Consistent focus rings (`ring-2 ring-offset-2 ring-slate-900`).
2. **Cards (`Card.astro`):**
   - Soft shadows (`shadow-sm`, `shadow-md`), rounded corners (`rounded-xl` or `rounded-2xl`).
   - Clean borders. Glass effects where appropriate.
3. **Badges (`Badge.astro` & `SourceBadge.astro`):**
   - Visual indicators for data sources (USDA, LLM, Local, Estimated).
4. **Inputs (`Input.astro`):**
   - Clean borders, clear focus states, accessible labels.
5. **Notices (`Notice.astro`):**
   - Informational, warning, or success callouts.

## Animation & Motion
- Utility classes: `.animate-fade-up`, `.hover-lift`, `.glow-border`.
- All transitions use smooth easing (`transition-all duration-200 ease-out`).

## Accessibility
- High contrast text.
- Visible focus states on interactive elements.
- Semantic HTML tags.
