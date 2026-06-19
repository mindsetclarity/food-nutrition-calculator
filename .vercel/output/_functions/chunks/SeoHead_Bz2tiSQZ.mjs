import { c as createComponent } from './astro-component_DnVRAbcp.mjs';
import 'piccolore';
import { v as createRenderInstruction, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, p as renderSlot, k as renderTemplate, o as renderComponent, u as unescapeHTML } from './entrypoint_D0oTHkUW.mjs';
import 'clsx';
import { s as siteConfig } from './siteConfig_Bc-3p4QP.mjs';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Button;
  const {
    variant = "primary",
    size = "md",
    class: className = "",
    href,
    type = "button",
    disabled = false,
    ...rest
  } = Astro2.props;
  const baseStyles = "inline-flex items-center justify-center font-medium focus-premium rounded-[var(--radius-button)] interactive-button transition-all duration-300";
  const variantStyles = {
    primary: "bg-ink-navy text-white hover:bg-deep-slate shadow-ink hover:shadow-premium border border-transparent",
    secondary: "bg-warm-ivory text-ink-navy border border-border-soft hover:bg-soft-cream shadow-soft hover:shadow-premium",
    tertiary: "bg-transparent text-ink-navy hover:text-usda-emerald group",
    quiet: "bg-transparent text-muted-text hover:bg-slate-100/50 hover:text-ink-navy",
    warning: "bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100",
    danger: "bg-red-50 text-red-900 border border-red-200 hover:bg-red-100"
  };
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base"
  };
  const classes = `${baseStyles} ${variantStyles[variant]} ${variant !== "tertiary" ? sizeStyles[size] : ""} ${className}`;
  return renderTemplate`${href ? renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(classes, "class")}${spreadAttributes(rest)}>${renderSlot($$result, $$slots["default"])}${variant === "tertiary" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`}</a>` : renderTemplate`<button${addAttribute(type, "type")}${addAttribute(disabled, "disabled")}${addAttribute(classes, "class")}${spreadAttributes(rest)}>${renderSlot($$result, $$slots["default"])}${variant === "tertiary" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`}</button>`}`;
}, "C:/foodnutritioncalculator.com/src/components/ui/Button.astro", void 0);

const $$NavigationLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$NavigationLink;
  const {
    href,
    class: className = "",
    activeClass = "text-foreground font-semibold",
    inactiveClass = "text-muted hover:text-foreground",
    exact = false
  } = Astro2.props;
  const pathname = new URL(Astro2.request.url).pathname;
  const isActive = exact ? pathname === href : pathname.startsWith(href) && (pathname.length === href.length || pathname[href.length] === "/");
  const finalClass = `${className} ${isActive ? activeClass : inactiveClass} transition-colors focus-ring rounded-sm`;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(finalClass, "class")}${addAttribute(isActive ? "page" : void 0, "aria-current")}> ${renderSlot($$result, $$slots["default"])} </a>`;
}, "C:/foodnutritioncalculator.com/src/components/site/NavigationLink.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const navLinks = [
    { name: "Calculator", href: "/calculator" },
    { name: "Recipe", href: "/recipe-nutrition-calculator" },
    { name: "Meal", href: "/meal-calorie-calculator" },
    { name: "Foods", href: "/foods" },
    { name: "Compare", href: "/compare-foods" },
    { name: "Learn", href: "/learn" }
  ];
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-40 w-full backdrop-blur-xl bg-warm-ivory/85 border-b border-border-soft shadow-sm transition-all duration-300"> <div class="site-container"> <div class="flex justify-between items-center h-[72px]"> <div class="flex items-center hover-lift shrink-0"> <a href="/" class="flex items-center gap-2 text-[22px] font-semibold tracking-tight focus-ring rounded-md text-ink-navy"> <span class="flex items-center justify-center w-8 h-8 rounded-full bg-mint-wash text-usda-emerald border border-emerald-soft shadow-sm"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> </span> <span class="text-usda-emerald">Food</span> <span class="text-ink-navy hidden sm:inline">Nutrition Calculator</span><span class="sm:hidden text-ink-navy">NC</span> </a> </div> <nav class="hidden lg:flex space-x-1 xl:space-x-2 items-center" aria-label="Desktop navigation"> ${navLinks.map((link) => renderTemplate`${renderComponent($$result, "NavigationLink", $$NavigationLink, { "href": link.href, "class": "text-[14px] xl:text-[15px] font-medium px-2 xl:px-3 py-2 rounded-md hover:bg-slate-100/50", "activeClass": "text-usda-emerald font-semibold bg-mint-wash/50", "inactiveClass": "text-soft-slate hover:text-ink-navy" }, { "default": ($$result2) => renderTemplate`${link.name}` })}`)} </nav> <div class="hidden lg:flex items-center space-x-4 shrink-0"> ${renderComponent($$result, "Button", $$Button, { "href": "/calculator", "variant": "primary", "size": "sm", "class": "hover-lift interactive-button shadow-ink" }, { "default": ($$result2) => renderTemplate`
Start Calculating
` })} </div> <div class="flex lg:hidden items-center shrink-0"> <button id="mobile-menu-btn" type="button" class="text-soft-slate hover:text-ink-navy focus-premium p-2 rounded-md transition-colors tap-target" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open main menu"> <svg class="h-6 w-6 menu-icon-open transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> <svg class="h-6 w-6 menu-icon-close hidden transition-transform duration-200 scale-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> </div> </div> <!-- Mobile menu --> <div id="mobile-menu" class="lg:hidden hidden bg-warm-ivory border-b border-border-soft shadow-premium absolute w-full left-0 top-[72px] origin-top motion-fade-in transition-all h-[calc(100vh-72px)] overflow-y-auto"> <nav class="px-4 pt-4 pb-6 space-y-2" aria-label="Mobile navigation"> ${navLinks.map((link) => renderTemplate`${renderComponent($$result, "NavigationLink", $$NavigationLink, { "href": link.href, "class": "block px-4 py-3.5 text-base font-medium rounded-xl hover:bg-slate-100/50 active:bg-slate-200/50 transition-colors", "activeClass": "text-usda-emerald bg-mint-wash", "inactiveClass": "text-deep-slate" }, { "default": ($$result2) => renderTemplate`${link.name}` })}`)} <div class="mt-8 pt-6 border-t border-border-soft flex flex-col space-y-4 px-2"> ${renderComponent($$result, "Button", $$Button, { "href": "/calculator", "variant": "primary", "class": "w-full justify-center interactive-button py-3.5 text-base" }, { "default": ($$result2) => renderTemplate`
Start Calculating
` })} ${renderComponent($$result, "Button", $$Button, { "href": "/recipe-nutrition-calculator", "variant": "secondary", "class": "w-full justify-center interactive-button py-3.5 text-base" }, { "default": ($$result2) => renderTemplate`
Analyze a Recipe
` })} </div> </nav> </div> </header> ${renderScript($$result, "C:/foodnutritioncalculator.com/src/components/site/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/foodnutritioncalculator.com/src/components/site/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="bg-warm-ivory border-t border-border-soft pt-16 pb-12 mt-auto"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-12"> <div class="col-span-1 md:col-span-4 lg:col-span-4"> <a href="/" class="flex items-center gap-2 text-xl font-semibold tracking-tight text-ink-navy mb-4 focus-ring rounded-md inline-flex"> <span class="flex items-center justify-center w-8 h-8 rounded-full bg-mint-wash text-usda-emerald border border-emerald-soft"> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> </span> <span class="text-usda-emerald">Food</span> Nutrition Calculator
</a> <p class="text-[15px] text-soft-slate leading-relaxed max-w-sm mb-6">
A smarter nutrition calculator for foods, meals, and recipes. Source-labeled estimates you can trust.
</p> <div class="bg-pure-card border border-border-soft rounded-lg p-4 inline-block"> <p class="text-xs font-medium text-ink-navy mb-1 flex items-center gap-1.5"> <svg class="w-3.5 h-3.5 text-usda-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
Source Transparency
</p> <p class="text-xs text-soft-slate leading-tight max-w-[240px]">
USDA-first where available &middot; Local fallback clearly labeled &middot; AI parsing does not own final nutrition totals.
</p> </div> </div> <div class="col-span-1 md:col-span-2 lg:col-span-2"> <h3 class="text-xs font-bold text-ink-navy tracking-wider uppercase mb-5">Tools</h3> <ul class="space-y-3.5"> <li><a href="/calculator" class="text-[15px] text-soft-slate hover:text-usda-emerald transition-colors focus-ring rounded-sm">Calculator</a></li> <li><a href="/recipe-nutrition-calculator" class="text-[15px] text-soft-slate hover:text-usda-emerald transition-colors focus-ring rounded-sm">Recipe Calculator</a></li> <li><a href="/meal-calorie-calculator" class="text-[15px] text-soft-slate hover:text-usda-emerald transition-colors focus-ring rounded-sm">Meal Calorie Calculator</a></li> <li><a href="/compare-foods" class="text-[15px] text-soft-slate hover:text-usda-emerald transition-colors focus-ring rounded-sm">Compare Foods</a></li> <li><a href="/foods" class="text-[15px] text-soft-slate hover:text-usda-emerald transition-colors focus-ring rounded-sm">Foods Directory</a></li> </ul> </div> <div class="col-span-1 md:col-span-2 lg:col-span-2"> <h3 class="text-xs font-bold text-ink-navy tracking-wider uppercase mb-5">Learn</h3> <ul class="space-y-3.5"> <li><a href="/learn" class="text-[15px] text-soft-slate hover:text-usda-emerald transition-colors focus-ring rounded-sm">Learn Hub</a></li> </ul> </div> <div class="col-span-1 md:col-span-2 lg:col-span-2"> <h3 class="text-xs font-bold text-ink-navy tracking-wider uppercase mb-5">Trust</h3> <ul class="space-y-3.5"> <li><a href="/about" class="text-[15px] text-soft-slate hover:text-usda-emerald transition-colors focus-ring rounded-sm">About</a></li> <li><a href="/methodology" class="text-[15px] text-soft-slate hover:text-usda-emerald transition-colors focus-ring rounded-sm">Methodology</a></li> <li><a href="/data-sources" class="text-[15px] text-soft-slate hover:text-usda-emerald transition-colors focus-ring rounded-sm">Data Sources</a></li> </ul> </div> <div class="col-span-1 md:col-span-2 lg:col-span-2"> <h3 class="text-xs font-bold text-ink-navy tracking-wider uppercase mb-5">Legal</h3> <ul class="space-y-3.5"> <li><a href="/privacy" class="text-[15px] text-soft-slate hover:text-usda-emerald transition-colors focus-ring rounded-sm">Privacy</a></li> <li><a href="/terms" class="text-[15px] text-soft-slate hover:text-usda-emerald transition-colors focus-ring rounded-sm">Terms</a></li> <li><a href="/disclaimer" class="text-[15px] text-soft-slate hover:text-usda-emerald transition-colors focus-ring rounded-sm">Disclaimer</a></li> </ul> </div> </div> <div class="border-t border-border-soft pt-8 flex flex-col md:flex-row justify-between items-center gap-6"> <p class="text-sm text-soft-slate text-center md:text-left">
&copy; ${currentYear} Food Nutrition Calculator. All rights reserved.
</p> <p class="text-[13px] text-muted-text text-center md:text-right max-w-2xl leading-relaxed"> <strong>Not medical advice:</strong> Nutrition values are estimates for personal planning. They are not a substitute for professional medical advice, diagnosis, or treatment. Always consult a healthcare professional.
</p> </div> </div> </footer>`;
}, "C:/foodnutritioncalculator.com/src/components/site/Footer.astro", void 0);

function buildTitle(title) {
  if (!title) return siteConfig.defaultTitle;
  if (title.includes("|")) return title;
  return `${title} | ${siteConfig.siteName}`;
}
function buildMetaDescription(description) {
  return description || siteConfig.defaultDescription;
}
function buildCanonicalUrl(pathname) {
  const url = new URL(pathname, siteConfig.siteUrl);
  let path = url.pathname;
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  return `${url.origin}${path}`;
}
function buildOpenGraphMetadata(input) {
  return {
    title: buildTitle(input.title),
    description: buildMetaDescription(input.description),
    type: input.ogType || "website"
  };
}
function buildTwitterMetadata(input) {
  return {
    card: siteConfig.twitterCard,
    title: buildTitle(input.title),
    description: buildMetaDescription(input.description)
  };
}
function buildSeoMetadata(input) {
  return {
    title: buildTitle(input.title),
    description: buildMetaDescription(input.description),
    canonicalPath: input.canonicalPath,
    noindex: input.noindex || false
  };
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$JsonLd = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$JsonLd;
  const { schema } = Astro2.props;
  const jsonLdString = JSON.stringify(schema);
  return renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(jsonLdString));
}, "C:/foodnutritioncalculator.com/src/components/seo/JsonLd.astro", void 0);

const $$SeoHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SeoHead;
  const { title, description, canonicalPath, noindex, ogType, jsonLd } = Astro2.props;
  const seo = buildSeoMetadata({ title, description, canonicalPath, noindex });
  const og = buildOpenGraphMetadata({ title, description, ogType });
  const twitter = buildTwitterMetadata({ title, description });
  const canonical = canonicalPath ? buildCanonicalUrl(canonicalPath) : void 0;
  return renderTemplate`<!-- SEO Core --><title>${seo.title}</title><meta name="description"${addAttribute(seo.description, "content")}>${canonical && renderTemplate`<link rel="canonical"${addAttribute(canonical, "href")}>`}${seo.noindex && renderTemplate`<meta name="robots" content="noindex, nofollow">`}${!seo.noindex && renderTemplate`<meta name="robots"${addAttribute(siteConfig.robots, "content")}>`}<!-- Open Graph --><meta property="og:title"${addAttribute(og.title, "content")}><meta property="og:description"${addAttribute(og.description, "content")}>${og.type && renderTemplate`<meta property="og:type"${addAttribute(og.type, "content")}>`}${canonical && renderTemplate`<meta property="og:url"${addAttribute(canonical, "content")}>`}<meta property="og:site_name"${addAttribute(siteConfig.siteName, "content")}><meta property="og:locale"${addAttribute(siteConfig.locale, "content")}><!-- Twitter -->${renderTemplate`<meta name="twitter:card"${addAttribute(twitter.card, "content")}>`}<meta name="twitter:title"${addAttribute(twitter.title, "content")}><meta name="twitter:description"${addAttribute(twitter.description, "content")}><!-- Theme --><meta name="theme-color"${addAttribute(siteConfig.themeColor, "content")}>${jsonLd && renderTemplate`${renderComponent($$result, "JsonLd", $$JsonLd, { "schema": jsonLd })}`}`;
}, "C:/foodnutritioncalculator.com/src/components/seo/SeoHead.astro", void 0);

export { $$Button as $, $$SeoHead as a, $$Header as b, $$Footer as c, renderScript as r };
