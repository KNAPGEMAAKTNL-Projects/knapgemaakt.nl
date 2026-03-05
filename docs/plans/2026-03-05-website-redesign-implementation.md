# KNAP GEMAAKT. Website Redesign - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign knapgemaakt.nl from bold/expressive to warm, trustworthy professional — converting cold email leads from local business owners.

**Architecture:** Astro SSR site with React islands. Redesign touches global styles, layout, header, footer, homepage (complete rewrite), new pages (wat-ik-doe, website-voor-hoveniers), and visual refreshes on existing pages. Content stays for SEO where possible. Redirects handle removed pages.

**Tech Stack:** Astro 5, React 19, Tailwind CSS v4 (Vite plugin, config in global.css `@theme`), Cloudflare Workers, Lenis smooth scroll, Lucide React icons.

**Design Document:** `docs/plans/2026-03-05-website-redesign-design.md`

**Important Conventions:**
- Brand name is always **KNAP GEMAAKT.** (all caps, with period)
- All internal links MUST end with trailing slash (Astro config: `trailingSlash: "always"`)
- Prerendered pages use `export const prerender = true;`
- Redirects for prerendered paths go in `public/_redirects` (Cloudflare edge), NOT middleware
- Blog content and city pages stay untouched (visual refresh cascades from design system changes)

---

## Task 1: Create Feature Branch

**Files:**
- None (git operation)

**Step 1: Create and switch to feature branch**

```bash
git checkout -b redesign/warm-professional
```

**Step 2: Verify branch**

```bash
git branch --show-current
```

Expected: `redesign/warm-professional`

---

## Task 2: Update Design System (global.css)

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Update @theme color variables**

Replace the `@theme` block (lines 15-23) with:

```css
@theme {
  --color-canvas: #FAFAF8;
  --color-canvas-alt: #F5F3EF;
  --color-ink: #1A1A1A;
  --color-ink-secondary: #4A4A4A;
  --color-acid: #CCFF00;
  --color-electric: #7C3AED;
  --color-warm: #E8E4DE;

  --font-sans: "Inter Tight", "Inter Tight Fallback", system-ui, sans-serif;
  --font-display: "Inter Tight", system-ui, sans-serif;
}
```

Key changes: canvas is now warm off-white `#FAFAF8`, ink is soft black `#1A1A1A`, new `canvas-alt` and `warm` colors added, `ink-secondary` for body text, removed Helvetica Now Display (not loaded anyway).

**Step 2: Update body base styles**

In the `@layer base` section, update the body rule (line 38-44) to include the new text size:

```css
body {
  background-color: var(--color-canvas);
  color: var(--color-ink);
  font-family: var(--font-sans);
  font-size: 1.125rem; /* 18px base for readability */
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
```

**Step 3: Remove grid background classes**

Delete the `.bg-grid-light` and `.bg-grid-dark` classes (lines 100-111). These are the bold grid patterns that feel too "developer tool."

**Step 4: Add new utility classes for the redesign**

Add after the `@layer utilities` section:

```css
/* Fade-up entrance animation */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUp 0.6s ease-out forwards;
  opacity: 0;
}

/* Staggered delays for children */
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-up {
    animation: none;
    opacity: 1;
  }
}

/* Glassmorphism card hover effect */
.glass-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-warm);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.8);
  border-color: var(--color-acid);
  box-shadow: 0 0 20px rgba(204, 255, 0, 0.08);
}

/* Gradient orb for hero */
.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .hero-orb {
    animation: drift 20s ease-in-out infinite;
  }
}
```

**Step 5: Update blog typography to work with new colors**

In `.blog-content-light`, the existing styles reference `var(--color-ink)` and `var(--color-acid)` which still work with the updated values. No changes needed here.

**Step 6: Verify build**

```bash
npm run build
```

Expected: Build succeeds. Any pages referencing `bg-grid-light` or `bg-grid-dark` will lose their grid backgrounds (this is intentional — we'll clean up references in later tasks).

**Step 7: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: update design system to warm professional palette

New color system with warm off-white canvas, soft black ink,
and brand colors (acid/electric) reserved for micro-accents.
Remove grid backgrounds, add fade-up and glassmorphism utilities."
```

---

## Task 3: Update Layout.astro

**Files:**
- Modify: `src/layouts/Layout.astro`

**Step 1: Update default description**

Change line 24 from:
```typescript
description = "Jouw nieuwe website in 7 dagen voor €595. Snel, professioneel en zonder gedoe. Vraag vandaag nog vrijblijvend aan bij KNAP GEMAAKT.",
```
to:
```typescript
description = "Professionele websites en webshops voor lokale ondernemers. Persoonlijk, modern en resultaatgericht. KNAP GEMAAKT. uit Buren.",
```

**Step 2: Update body classes**

Change line 181 from:
```html
class="bg-canvas text-ink antialiased overflow-x-hidden selection:bg-acid selection:text-black"
```
to:
```html
class="bg-canvas text-ink antialiased overflow-x-hidden selection:bg-acid/30 selection:text-ink"
```

The selection highlight is now a subtle acid green tint instead of full acid green — matches the "micro-accent" principle.

**Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

**Step 4: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: update layout with new description and subtle selection style"
```

---

## Task 4: Redesign Header

**Files:**
- Modify: `src/components/Header.astro`

**Step 1: Update navigation links**

Replace the `navLinks` array (lines 15-22) with:

```typescript
const navLinks = [
    { href: "/wat-ik-doe/", label: "Wat ik doe" },
    { href: "/over-mij/", label: "Over mij" },
    { href: "/blog/", label: "Blog" },
];
```

**Step 2: Update header styling for warm design**

Replace the header element (line 30-36) with:

```html
<header
    class:list={[
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-300",
        variant === "transparent" ? "bg-transparent" : "bg-canvas/95 md:backdrop-blur-sm border-b border-warm"
    ]}
    id="site-header"
>
```

Change: `border-ink/10` → `border-warm` for warmer border color.

**Step 3: Update logo styling**

Replace the logo link (lines 40-46) with:

```html
<a
    href="/"
    class="header-logo text-xl md:text-2xl font-bold uppercase tracking-tight hover:text-electric transition-colors z-[60] relative"
    aria-label="KNAP GEMAAKT. - Ga naar homepagina"
>
    KNAP GEMAAKT.
</a>
```

Change: `font-black` → `font-bold` (softer weight per design doc).

**Step 4: Update desktop navigation styling**

Replace the desktop nav (lines 49-68) with:

```html
<nav class="hidden md:flex items-center gap-8" aria-label="Hoofdnavigatie">
    {navLinks.map(link => (
        <a
            href={link.href}
            class:list={[
                "nav-link-hover text-sm font-medium tracking-wide transition-colors relative",
                isActive(link.href) ? "text-ink" : "text-ink-secondary hover:text-ink"
            ]}
            aria-current={isActive(link.href) ? "page" : undefined}
        >
            {link.label}
        </a>
    ))}
    <a
        href="/contact/"
        class="bg-ink text-canvas px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-ink/80 transition-colors duration-300"
    >
        Contact
    </a>
</nav>
```

Key changes: removed `font-mono`, removed `uppercase tracking-widest` (too aggressive), CTA button is now `bg-ink` with rounded corners instead of bordered, uses new `text-ink-secondary` color.

**Step 5: Update mobile menu styling**

Replace the mobile menu overlay (lines 89-145) to use warm colors instead of full black:

In the background panels (lines 97-98), change:
```html
<div class="menu-bg-panel menu-bg-panel-1 absolute inset-0 bg-canvas origin-top"></div>
<div class="menu-bg-panel menu-bg-panel-2 absolute inset-0 bg-canvas origin-top"></div>
```

In the mobile nav links (line 109), change the text colors:
```html
isActive(link.href) ? "text-electric" : "text-ink"
```

Update the mobile CTA button (lines 123-132):
```html
<a
    href="/contact/"
    class="mobile-nav-cta group relative mt-12 overflow-hidden"
    style={`--index: ${navLinks.length}`}
>
    <span class="relative z-10 block bg-ink text-canvas px-8 py-4 rounded-lg font-bold text-xl tracking-tight transition-all duration-300 group-hover:bg-electric">
        Contact
    </span>
</a>
```

Remove the decorative corner accents (lines 135-138) and the footer accent (lines 141-143) — these feel too "tech studio."

**Step 6: Update mobile menu CSS styles**

In the `<style is:global>` section, update the color change rules:
- `body.menu-open .header-logo` should keep `color: var(--color-ink)` (not canvas, since menu bg is now canvas)
- `.hamburger-btn.is-active` should keep `color: var(--color-ink)` (not canvas)
- `.hamburger-btn.is-active .hamburger-line` should keep ink color

**Step 7: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

**Step 8: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: redesign header with warm professional styling

Simplified nav (Wat ik doe, Over mij, Blog + Contact CTA).
Warmer border, softer typography, rounded CTA button.
Mobile menu uses warm canvas background instead of dark overlay."
```

---

## Task 5: Redesign Footer

**Files:**
- Modify: `src/components/Footer.astro`

**Step 1: Update footer section styling**

The footer should keep its dark background (`bg-ink`) but remove grid backgrounds. Update the CTA section and footer element to remove `bg-grid-dark` classes.

In the CTA section (line 36): remove `bg-grid-dark` class.
In the footer element (line 65): remove `bg-grid-dark` class.

**Step 2: Update CTA section styling**

Replace the CTA buttons (lines 46-59) with warm professional buttons:

```html
<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
    <a
        href="/contact/"
        class="bg-canvas text-ink px-8 py-4 rounded-lg font-bold tracking-tight hover:bg-canvas/90 transition-colors duration-300 inline-flex items-center justify-center gap-3 group"
    >
        Plan een gesprek in
        <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
    </a>
</div>
```

Single CTA (not two). Rounded button instead of sharp edges.

**Step 3: Update KNAP GEMAAKT. branding in footer**

Replace the big logo section (lines 118-123) with a gradient version:

```html
<div class="pointer-events-none mb-12 md:mb-16">
    <span
        class="text-[12vw] md:text-[10vw] font-bold leading-[0.8] tracking-tight select-none block bg-gradient-to-r from-electric to-acid bg-clip-text text-transparent"
    >
        KNAP GEMAAKT.
    </span>
</div>
```

This replaces the TextRevealCSS component with a static gradient text — electric purple to acid green. Subtle, memorable, brand-reinforcing. Uses `font-bold` instead of `font-black`.

**Step 4: Update region links styling**

Change the region label (line 76) from `text-acid/80` to `text-canvas/60` for subtlety.

Change city link hover color (line 83) from `hover:text-acid` to `hover:text-canvas`.

**Step 5: Update bottom bar links**

Change hover colors from `hover:text-acid` to `hover:text-canvas/80` — subtler, warmer.

**Step 6: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

**Step 7: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: redesign footer with gradient branding and warm styling

Remove grid backgrounds, simplify to single CTA, add gradient
KNAP GEMAAKT. text (electric to acid), soften hover colors."
```

---

## Task 6: Redesign Homepage

This is the largest task. The homepage is a complete rewrite following the approved flow:
Hero → Problem Recognition → Capability Grid → Process → About → CTA

**Files:**
- Modify: `src/pages/index.astro` (complete rewrite)
- Create: `src/components/AnimatedTimeline.astro` (process timeline component)
- Create: `src/components/FadeIn.astro` (scroll-triggered fade-in wrapper)

**Step 1: Create the FadeIn component**

Create `src/components/FadeIn.astro`:

```astro
---
interface Props {
  class?: string;
  delay?: number;
  as?: string;
}

const { class: className = "", delay = 0, as: Tag = "div" } = Astro.props;
---

<Tag
  class:list={["fade-in-section", className]}
  style={delay ? `--fade-delay: ${delay}ms` : undefined}
>
  <slot />
</Tag>

<script>
  function initFadeIn() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".fade-in-section:not(.is-visible)").forEach((el) => {
      observer.observe(el);
    });
  }

  initFadeIn();
  document.addEventListener("astro:after-swap", initFadeIn);
</script>

<style is:global>
  .fade-in-section {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    transition-delay: var(--fade-delay, 0ms);
  }

  .fade-in-section.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .fade-in-section {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
</style>
```

**Step 2: Create the AnimatedTimeline component**

Create `src/components/AnimatedTimeline.astro`:

```astro
---
interface Step {
  title: string;
  description: string;
}

interface Props {
  steps: Step[];
}

const { steps } = Astro.props;
---

<div class="timeline-container relative">
  <!-- Vertical line -->
  <div class="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-warm" aria-hidden="true">
    <div class="timeline-progress absolute top-0 left-0 w-full bg-acid" style="height: 0%"></div>
  </div>

  <!-- Steps -->
  <div class="space-y-12 md:space-y-16">
    {steps.map((step, i) => (
      <div class="timeline-step relative pl-12 md:pl-16" data-step={i}>
        <!-- Dot -->
        <div class="absolute left-2.5 md:left-4.5 top-1 w-3 h-3 rounded-full border-2 border-warm bg-canvas transition-colors duration-500 timeline-dot"></div>
        <!-- Content -->
        <div>
          <span class="text-xs font-bold uppercase tracking-widest text-ink-secondary/60 mb-2 block">
            Stap {i + 1}
          </span>
          <h3 class="text-xl md:text-2xl font-bold text-ink mb-2">{step.title}</h3>
          <p class="text-ink-secondary leading-relaxed max-w-lg">{step.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>

<script>
  function initTimeline() {
    const container = document.querySelector(".timeline-container");
    if (!container) return;

    const progress = container.querySelector(".timeline-progress") as HTMLElement;
    const dots = container.querySelectorAll(".timeline-dot");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = entry.target as HTMLElement;
            const dot = step.querySelector(".timeline-dot");
            if (dot) {
              dot.classList.add("border-acid", "bg-acid");
              dot.classList.remove("border-warm", "bg-canvas");
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    container.querySelectorAll(".timeline-step").forEach((step) => {
      observer.observe(step);
    });

    // Progress line follows scroll
    const updateProgress = () => {
      if (!progress || !container) return;
      const rect = container.getBoundingClientRect();
      const scrollProgress = Math.min(
        Math.max((-rect.top) / (rect.height - window.innerHeight), 0),
        1
      );
      progress.style.height = `${scrollProgress * 100}%`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  initTimeline();
  document.addEventListener("astro:after-swap", initTimeline);
</script>
```

**Step 3: Rewrite the homepage**

Replace the entire content of `src/pages/index.astro` with:

```astro
---
export const prerender = true;

import Layout from "../layouts/Layout.astro";
import Footer from "../components/Footer.astro";
import FadeIn from "../components/FadeIn.astro";
import AnimatedTimeline from "../components/AnimatedTimeline.astro";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema.astro";
import { Monitor, ShoppingBag, Search, Wrench } from "lucide-react";

const processSteps = [
  {
    title: "Kennismaking",
    description: "We bespreken jouw situatie, wensen en doelen. Vrijblijvend en zonder verplichtingen.",
  },
  {
    title: "Voorstel op maat",
    description: "Je ontvangt een helder voorstel met wat ik ga bouwen, hoe lang het duurt en wat het kost.",
  },
  {
    title: "Bouw",
    description: "Ik ga aan de slag. Je krijgt tussendoor updates en kunt feedback geven.",
  },
  {
    title: "Live",
    description: "Je nieuwe website gaat live. Ik zorg dat alles werkt en help je op weg.",
  },
];
---

<Layout
  title="Professionele Websites voor Ondernemers | KNAP GEMAAKT."
  description="Professionele websites en webshops voor lokale ondernemers. Persoonlijk, modern en resultaatgericht. KNAP GEMAAKT. uit Buren."
>
  <LocalBusinessSchema />
  <main>
    <!-- HERO -->
    <section class="min-h-[85vh] flex flex-col justify-center relative overflow-hidden px-6 md:px-12 lg:px-16 py-24">
      <!-- Gradient orb -->
      <div class="hero-orb hidden md:block w-[500px] h-[500px] bg-acid/[0.04] top-1/4 -right-1/4"></div>
      <div class="hero-orb hidden md:block w-[400px] h-[400px] bg-electric/[0.03] bottom-1/4 -left-1/4" style="animation-delay: -10s"></div>

      <div class="max-w-5xl mx-auto w-full relative z-10">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-snug mb-6 md:mb-8">
          Jouw bedrijf verdient een website die <span class="text-electric">werkt</span>.
        </h1>

        <p class="text-lg md:text-xl text-ink-secondary max-w-2xl mb-10 md:mb-12 leading-relaxed">
          Ik bouw professionele websites en webshops voor lokale ondernemers.
          Persoonlijk, snel en zonder gedoe.
        </p>

        <a
          href="/contact/"
          class="bg-ink text-canvas px-8 py-4 rounded-lg font-bold tracking-tight hover:bg-ink/80 transition-colors duration-300 inline-flex items-center justify-center gap-3 group"
        >
          Neem contact op
          <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </a>
      </div>
    </section>

    <!-- PROBLEM RECOGNITION -->
    <section class="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-canvas-alt">
      <div class="max-w-5xl mx-auto">
        <FadeIn>
          <span class="text-xs font-bold uppercase tracking-widest text-ink-secondary/60 mb-4 block">Herken je dit?</span>
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-12 md:mb-16">
            Veel ondernemers lopen hier tegenaan
          </h2>
        </FadeIn>

        <div class="grid md:grid-cols-2 gap-6">
          <FadeIn delay={100}>
            <div class="glass-card p-6 md:p-8 cursor-default">
              <div class="w-2 h-2 rounded-full bg-acid mb-4"></div>
              <h3 class="text-lg font-bold mb-2">Je website ziet er verouderd uit</h3>
              <p class="text-ink-secondary leading-relaxed">Klanten vormen in seconden een eerste indruk. Een verouderde website wekt geen vertrouwen.</p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div class="glass-card p-6 md:p-8 cursor-default">
              <div class="w-2 h-2 rounded-full bg-acid mb-4"></div>
              <h3 class="text-lg font-bold mb-2">Klanten kunnen je niet vinden</h3>
              <p class="text-ink-secondary leading-relaxed">Zonder goede vindbaarheid in Google loop je dagelijks potentiele klanten mis.</p>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div class="glass-card p-6 md:p-8 cursor-default">
              <div class="w-2 h-2 rounded-full bg-acid mb-4"></div>
              <h3 class="text-lg font-bold mb-2">Je betaalt te veel voor te weinig</h3>
              <p class="text-ink-secondary leading-relaxed">Maandelijkse kosten voor een website die nauwelijks iets oplevert. Dat kan anders.</p>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div class="glass-card p-6 md:p-8 cursor-default">
              <div class="w-2 h-2 rounded-full bg-acid mb-4"></div>
              <h3 class="text-lg font-bold mb-2">Je weet niet of het werkt</h3>
              <p class="text-ink-secondary leading-relaxed">Geen idee of je website bezoekers aantrekt of klanten oplevert. Je mist inzicht.</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    <!-- CAPABILITY GRID -->
    <section class="py-20 md:py-28 px-6 md:px-12 lg:px-16">
      <div class="max-w-5xl mx-auto">
        <FadeIn>
          <span class="text-xs font-bold uppercase tracking-widest text-ink-secondary/60 mb-4 block">Wat ik voor je kan doen</span>
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-12 md:mb-16">
            Alles wat je nodig hebt om online te groeien
          </h2>
        </FadeIn>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Large card: Websites -->
          <FadeIn delay={100}>
            <div class="glass-card p-8 md:p-10 md:row-span-2 flex flex-col cursor-default">
              <div class="w-10 h-10 rounded-lg bg-ink flex items-center justify-center mb-6">
                <Monitor className="w-5 h-5 text-canvas" />
              </div>
              <h3 class="text-xl font-bold mb-3">Websites op maat</h3>
              <p class="text-ink-secondary leading-relaxed mb-6">
                Een professionele website die past bij jouw bedrijf. Snel, modern en gebouwd om klanten aan te trekken. Van visitekaartje tot uitgebreide bedrijfssite.
              </p>
              <div class="mt-auto pt-4 border-t border-warm">
                <span class="text-sm text-ink-secondary">Design, tekst, hosting en SEO inbegrepen</span>
              </div>
            </div>
          </FadeIn>

          <!-- Webshops -->
          <FadeIn delay={200}>
            <div class="glass-card p-8 cursor-default">
              <div class="w-10 h-10 rounded-lg bg-ink flex items-center justify-center mb-4">
                <ShoppingBag className="w-5 h-5 text-canvas" />
              </div>
              <h3 class="text-xl font-bold mb-2">Webshops</h3>
              <p class="text-ink-secondary leading-relaxed">
                Een webshop op Shopify die er professioneel uitziet en makkelijk te beheren is.
              </p>
            </div>
          </FadeIn>

          <!-- Online zichtbaarheid -->
          <FadeIn delay={300}>
            <div class="glass-card p-8 cursor-default">
              <div class="w-10 h-10 rounded-lg bg-ink flex items-center justify-center mb-4">
                <Search className="w-5 h-5 text-canvas" />
              </div>
              <h3 class="text-xl font-bold mb-2">Online zichtbaarheid</h3>
              <p class="text-ink-secondary leading-relaxed">
                Gevonden worden in Google. Elke website die ik bouw is geoptimaliseerd voor zoekmachines.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={400}>
          <div class="mt-10 text-center">
            <a
              href="/wat-ik-doe/"
              class="text-ink font-bold inline-flex items-center gap-2 hover:text-electric transition-colors group"
            >
              Bekijk alles wat ik doe
              <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>

    <!-- PROCESS -->
    <section class="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-canvas-alt">
      <div class="max-w-5xl mx-auto">
        <FadeIn>
          <span class="text-xs font-bold uppercase tracking-widest text-ink-secondary/60 mb-4 block">Zo werkt het</span>
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-12 md:mb-16">
            In 4 stappen naar jouw nieuwe website
          </h2>
        </FadeIn>

        <FadeIn delay={200}>
          <AnimatedTimeline steps={processSteps} />
        </FadeIn>
      </div>
    </section>

    <!-- ABOUT -->
    <section class="py-20 md:py-28 px-6 md:px-12 lg:px-16">
      <div class="max-w-5xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <FadeIn>
            <div class="relative">
              <img
                src="/images/yannick.webp"
                alt="Yannick Veldhuisen, oprichter van KNAP GEMAAKT."
                class="rounded-2xl w-full max-w-md"
                loading="lazy"
              />
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div>
              <span class="text-xs font-bold uppercase tracking-widest text-ink-secondary/60 mb-4 block">Wie ik ben</span>
              <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Hoi, ik ben Yannick
              </h2>
              <p class="text-ink-secondary leading-relaxed mb-4">
                Vanuit Buren help ik lokale ondernemers met professionele websites en slimme online oplossingen. Geen grote bureau-praatjes, maar persoonlijk contact en eerlijk advies.
              </p>
              <p class="text-ink-secondary leading-relaxed mb-6">
                Ik geloof dat elk bedrijf — groot of klein — een website verdient die echt iets oplevert.
              </p>

              <div class="flex flex-wrap gap-4 mb-6">
                <span class="text-xs font-medium bg-canvas-alt px-3 py-1.5 rounded-full text-ink-secondary">KVK: 73652377</span>
                <span class="text-xs font-medium bg-canvas-alt px-3 py-1.5 rounded-full text-ink-secondary">Buren, Rivierenland</span>
              </div>

              <a
                href="/over-mij/"
                class="text-ink font-bold inline-flex items-center gap-2 hover:text-electric transition-colors group"
              >
                Meer over mij
                <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</Layout>
```

**Step 4: Verify build**

```bash
npm run build
```

Expected: Build succeeds. The Lucide React icons are already a dependency. Check if `Monitor`, `ShoppingBag`, `Search` are available from `lucide-react`.

**Step 5: Commit**

```bash
git add src/pages/index.astro src/components/FadeIn.astro src/components/AnimatedTimeline.astro
git commit -m "feat: redesign homepage with warm professional layout

New flow: Hero > Problem Recognition > Capability Grid > Process > About.
Includes animated timeline, fade-in scroll effects, glassmorphism cards.
Removes typing rotator, grid backgrounds, and old service-focused layout."
```

---

## Task 7: Create "Wat ik doe" Page

**Files:**
- Create: `src/pages/wat-ik-doe.astro`

**Step 1: Create the capabilities page**

Create `src/pages/wat-ik-doe.astro`:

```astro
---
export const prerender = true;

import Layout from "../layouts/Layout.astro";
import Footer from "../components/Footer.astro";
import FadeIn from "../components/FadeIn.astro";
import FAQSchema from "../components/seo/FAQSchema.astro";
import { Monitor, ShoppingBag, Search, Wrench } from "lucide-react";

const services = [
  {
    icon: "Monitor",
    title: "Websites op maat",
    description: "Een professionele website die past bij jouw bedrijf en doelgroep. Modern design, snelle laadtijd en geoptimaliseerd voor Google.",
    features: ["Responsive design", "SEO-geoptimaliseerd", "Tekst en content inbegrepen", "Hosting inbegrepen", "Eigen domein", "Binnen enkele weken live"],
  },
  {
    icon: "ShoppingBag",
    title: "Webshops",
    description: "Een complete webshop op Shopify. Professioneel ontwerp, makkelijk te beheren en klaar om te verkopen.",
    features: ["Shopify platform", "Productbeheer", "Betalingen (iDEAL, creditcard)", "Voorraadbeheer", "Op maat ontworpen thema", "Klaar voor groei"],
  },
  {
    icon: "Search",
    title: "Online zichtbaarheid",
    description: "Gevonden worden door de juiste klanten. SEO, Google Mijn Bedrijf en lokale vindbaarheid.",
    features: ["Zoekmachine optimalisatie", "Google Mijn Bedrijf", "Lokale vindbaarheid", "Technische SEO", "Snelle laadtijden", "Meetbare resultaten"],
  },
  {
    icon: "Wrench",
    title: "Online tools",
    description: "Slimme tools die je bedrijf tijd besparen. Dashboards, automatiseringen en koppelingen op maat.",
    features: ["Dashboards op maat", "Data-integraties", "Procesautomatisering", "Rapportages", "API-koppelingen", "Op aanvraag"],
  },
];

const iconMap: Record<string, any> = { Monitor, ShoppingBag, Search, Wrench };
---

<Layout
  title="Wat Ik Doe | Websites, Webshops & Online Tools | KNAP GEMAAKT."
  description="Professionele websites, webshops op Shopify en slimme online tools voor lokale ondernemers. Bekijk wat KNAP GEMAAKT. voor jouw bedrijf kan doen."
>
  <main>
    <!-- Hero -->
    <section class="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-12 lg:px-16">
      <div class="max-w-5xl mx-auto">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-snug mb-6">
          Wat ik voor je kan doen
        </h1>
        <p class="text-lg md:text-xl text-ink-secondary max-w-2xl leading-relaxed">
          Van een professionele website tot een complete webshop of slimme online tools.
          Alles wat je nodig hebt om online te groeien.
        </p>
      </div>
    </section>

    <!-- Services -->
    {services.map((service, i) => (
      <section class:list={["py-16 md:py-24 px-6 md:px-12 lg:px-16", i % 2 === 0 ? "bg-canvas-alt" : ""]}>
        <div class="max-w-5xl mx-auto">
          <FadeIn>
            <div class="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <div class="w-12 h-12 rounded-xl bg-ink flex items-center justify-center mb-6">
                  {(() => {
                    const Icon = iconMap[service.icon];
                    return <Icon className="w-6 h-6 text-canvas" />;
                  })()}
                </div>
                <h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-4">{service.title}</h2>
                <p class="text-ink-secondary leading-relaxed mb-6">{service.description}</p>
                <a
                  href="/contact/"
                  class="bg-ink text-canvas px-6 py-3 rounded-lg font-bold text-sm hover:bg-ink/80 transition-colors duration-300 inline-flex items-center gap-2 group"
                >
                  Vraag een gesprek aan
                  <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </a>
              </div>

              <div>
                <ul class="space-y-3">
                  {service.features.map((feature) => (
                    <li class="flex items-center gap-3 text-ink-secondary">
                      <div class="w-2 h-2 rounded-full bg-acid shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    ))}

    <!-- CTA -->
    <section class="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-canvas-alt">
      <div class="max-w-3xl mx-auto text-center">
        <FadeIn>
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Benieuwd wat ik voor jou kan betekenen?
          </h2>
          <p class="text-ink-secondary text-lg leading-relaxed mb-8">
            Vertel me over je bedrijf en ik denk vrijblijvend met je mee.
            Geen verplichtingen, geen verkooppraatjes.
          </p>
          <a
            href="/contact/"
            class="bg-ink text-canvas px-8 py-4 rounded-lg font-bold tracking-tight hover:bg-ink/80 transition-colors duration-300 inline-flex items-center justify-center gap-3 group"
          >
            Neem contact op
            <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
        </FadeIn>
      </div>
    </section>
  </main>
  <Footer hideCTA={true} />
</Layout>
```

**Step 2: Verify build**

```bash
npm run build
```

Expected: Build succeeds. Page accessible at `/wat-ik-doe/`.

**Step 3: Commit**

```bash
git add src/pages/wat-ik-doe.astro
git commit -m "feat: add wat-ik-doe capabilities page

Four service sections (websites, webshops, online zichtbaarheid, tools)
without pricing. Each section has features list and CTA to contact."
```

---

## Task 8: Create Hoveniers Landing Page

**Files:**
- Create: `src/pages/website-voor-hoveniers.astro`

**Step 1: Create the landing page**

Create `src/pages/website-voor-hoveniers.astro`:

```astro
---
export const prerender = true;

import Layout from "../layouts/Layout.astro";
import FadeIn from "../components/FadeIn.astro";
---

<Layout
  title="Professionele Website voor Hoveniers | KNAP GEMAAKT."
  description="Een professionele website voor jouw hoveniersbedrijf. Modern, vindbaar in Google en gebouwd om klanten aan te trekken. Vraag een gratis kennismaking aan."
>
  <main>
    <!-- Hero - Direct, speaks to hoveniers -->
    <section class="min-h-[80vh] flex flex-col justify-center px-6 md:px-12 lg:px-16 py-24 relative overflow-hidden">
      <div class="hero-orb hidden md:block w-[400px] h-[400px] bg-acid/[0.04] top-1/4 -right-1/4"></div>

      <div class="max-w-4xl mx-auto w-full relative z-10">
        <span class="text-xs font-bold uppercase tracking-widest text-ink-secondary/60 mb-4 block">Voor hoveniers</span>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-snug mb-6">
          Een professionele website voor jouw hoveniersbedrijf
        </h1>
        <p class="text-lg md:text-xl text-ink-secondary max-w-2xl leading-relaxed mb-10">
          Laat je werk zien, trek nieuwe klanten aan en word gevonden in Google.
          Zonder technisch gedoe.
        </p>
        <a
          href="/contact/"
          class="bg-ink text-canvas px-8 py-4 rounded-lg font-bold tracking-tight hover:bg-ink/80 transition-colors duration-300 inline-flex items-center justify-center gap-3 group"
        >
          Plan een gratis kennismaking
          <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </a>
      </div>
    </section>

    <!-- Pain points specific to hoveniers -->
    <section class="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-canvas-alt">
      <div class="max-w-4xl mx-auto">
        <FadeIn>
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-12">
            Herkenbaar?
          </h2>
        </FadeIn>

        <div class="space-y-6">
          <FadeIn delay={100}>
            <div class="glass-card p-6 md:p-8">
              <div class="w-2 h-2 rounded-full bg-acid mb-4"></div>
              <h3 class="text-lg font-bold mb-2">Nieuwe klanten komen alleen via mond-tot-mond</h3>
              <p class="text-ink-secondary leading-relaxed">Dat werkt, maar je laat dagelijks klanten liggen die in Google zoeken naar een hovenier in de buurt.</p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div class="glass-card p-6 md:p-8">
              <div class="w-2 h-2 rounded-full bg-acid mb-4"></div>
              <h3 class="text-lg font-bold mb-2">Je hebt geen website of een verouderde</h3>
              <p class="text-ink-secondary leading-relaxed">Potentiele klanten zoeken je op online. Zonder website of met een verouderde site verlies je hun vertrouwen nog voordat je kunt laten zien wat je kunt.</p>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div class="glass-card p-6 md:p-8">
              <div class="w-2 h-2 rounded-full bg-acid mb-4"></div>
              <h3 class="text-lg font-bold mb-2">Je hebt geen tijd voor online marketing</h3>
              <p class="text-ink-secondary leading-relaxed">Je bent druk met je vak. Een website moet gewoon werken, zonder dat je er omkijken naar hebt.</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    <!-- Solution -->
    <section class="py-20 md:py-28 px-6 md:px-12 lg:px-16">
      <div class="max-w-4xl mx-auto">
        <FadeIn>
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Wat je krijgt
          </h2>
          <p class="text-ink-secondary text-lg leading-relaxed mb-10 max-w-2xl">
            Een professionele website die jouw hoveniersbedrijf op zijn best laat zien.
          </p>
        </FadeIn>

        <div class="grid md:grid-cols-2 gap-6">
          {[
            "Modern, professioneel design",
            "Foto's van je projecten in beeld",
            "Vindbaar in Google (SEO)",
            "Contactformulier voor offertes",
            "Werkt perfect op telefoon",
            "Hosting en onderhoud geregeld",
          ].map((feature, i) => (
            <FadeIn delay={i * 80}>
              <div class="flex items-center gap-3 py-3">
                <div class="w-2 h-2 rounded-full bg-acid shrink-0"></div>
                <span class="text-ink font-medium">{feature}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <!-- Simple process -->
    <section class="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-canvas-alt">
      <div class="max-w-4xl mx-auto">
        <FadeIn>
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-12">
            Hoe het werkt
          </h2>
        </FadeIn>

        <div class="grid md:grid-cols-3 gap-8">
          {[
            { step: "1", title: "Gesprek", desc: "We bespreken je wensen en ik bekijk wat er nodig is." },
            { step: "2", title: "Bouw", desc: "Ik ontwerp en bouw je website. Jij geeft feedback." },
            { step: "3", title: "Live", desc: "Je website gaat online. Klaar om klanten aan te trekken." },
          ].map((item, i) => (
            <FadeIn delay={i * 150}>
              <div class="text-center md:text-left">
                <span class="text-4xl font-bold text-acid/30 mb-2 block">{item.step}</span>
                <h3 class="text-xl font-bold mb-2">{item.title}</h3>
                <p class="text-ink-secondary leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 md:py-28 px-6 md:px-12 lg:px-16">
      <div class="max-w-3xl mx-auto text-center">
        <FadeIn>
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Klaar voor een website die werkt?
          </h2>
          <p class="text-ink-secondary text-lg leading-relaxed mb-8">
            Plan een gratis kennismaking. Ik vertel je precies wat ik voor jouw hoveniersbedrijf kan doen.
          </p>
          <a
            href="/contact/"
            class="bg-ink text-canvas px-8 py-4 rounded-lg font-bold tracking-tight hover:bg-ink/80 transition-colors duration-300 inline-flex items-center justify-center gap-3 group"
          >
            Plan een gratis kennismaking
            <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
          <p class="text-sm text-ink-secondary/60 mt-4">Vrijblijvend en zonder verplichtingen</p>
        </FadeIn>
      </div>
    </section>
  </main>

  <!-- Minimal footer - no full site navigation -->
  <footer class="py-8 px-6 border-t border-warm">
    <div class="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-sm text-ink-secondary">
      <span class="font-bold text-ink">KNAP GEMAAKT.</span>
      <div class="flex gap-6">
        <a href="/" class="hover:text-ink transition-colors">Hoofdsite</a>
        <a href="/privacy/" class="hover:text-ink transition-colors">Privacy</a>
      </div>
      <span>&copy; 2026 KNAP GEMAAKT.</span>
    </div>
  </footer>
</Layout>
```

**Step 2: Verify build**

```bash
npm run build
```

Expected: Build succeeds. Page accessible at `/website-voor-hoveniers/`.

**Step 3: Commit**

```bash
git add src/pages/website-voor-hoveniers.astro
git commit -m "feat: add hoveniers landing page for cold email campaign

Focused conversion page targeting hoveniers with specific pain points,
solution features, simple 3-step process, and single CTA.
Minimal footer to keep focus on conversion."
```

---

## Task 9: Set Up Redirects

**Files:**
- Modify: `public/_redirects`
- Modify: `src/middleware.ts`

**Step 1: Add redirects to `public/_redirects`**

Add at the end of `public/_redirects`:

```
# Redesign redirects (old pages -> new pages)
/website-laten-maken /wat-ik-doe/ 301
/website-laten-maken/ /wat-ik-doe/ 301
/automations /wat-ik-doe/ 301
/automations/ /wat-ik-doe/ 301
/aanvragen /contact/ 301
/aanvragen/ /contact/ 301
/portfolio /wat-ik-doe/ 301
/portfolio/ /wat-ik-doe/ 301
```

**Step 2: Verify build**

```bash
npm run build
```

Expected: Build succeeds.

**Step 3: Commit**

```bash
git add public/_redirects
git commit -m "feat: add 301 redirects for removed pages

Redirect website-laten-maken, automations, aanvragen, and portfolio
to their new equivalents for SEO preservation."
```

---

## Task 10: Update Over Mij Page

**Files:**
- Modify: `src/pages/over-mij.astro`

**Step 1: Read the current over-mij page**

Read the file to understand current content before modifying.

**Step 2: Visual refresh**

Update the page to use the new design system:
- Replace `bg-grid-light` / `bg-grid-dark` with `bg-canvas-alt` for alternating sections
- Replace `font-black` with `font-bold` in headings
- Replace `uppercase` headings with normal case
- Replace `text-ink/60` with `text-ink-secondary`
- Replace any `bg-acid` buttons with `bg-ink text-canvas rounded-lg`
- Wrap content sections in `<FadeIn>` components
- Keep the personal story content intact
- Add the import for FadeIn at top

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add src/pages/over-mij.astro
git commit -m "feat: visual refresh over-mij page with warm design system"
```

---

## Task 11: Update Contact Page

**Files:**
- Modify: `src/pages/contact.astro`

**Step 1: Read the current contact page**

Read the file to understand current content before modifying.

**Step 2: Visual refresh**

- Replace grid backgrounds, update button styles, add `rounded-lg`
- Ensure contact details are prominently visible (email, phone, KVK)
- Add "Gevestigd in Buren, werkzaam door heel Nederland"
- Wrap sections in `<FadeIn>` components
- Update form input styling to use warm borders and floating focus effects:
  - `border-warm` instead of `border-ink/10`
  - `focus:border-acid` for the accent touch
  - `rounded-lg` on inputs

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: visual refresh contact page with warm design and visible contact details"
```

---

## Task 12: Update City Pages

**Files:**
- Modify: `src/pages/webdesign-[city].astro`

**Step 1: Read the current city page template**

Read the file to understand current structure.

**Step 2: Visual refresh**

- Remove `bg-grid-light` / `bg-grid-dark` references
- Update button styles to `bg-ink text-canvas rounded-lg`
- Update heading weights from `font-black` to `font-bold`
- Remove `uppercase` from main headings
- Update colors to use `text-ink-secondary` for secondary text
- Keep all SEO content unchanged

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add src/pages/webdesign-[city].astro
git commit -m "feat: visual refresh city SEO pages with warm design system"
```

---

## Task 13: Update Blog Pages

**Files:**
- Modify: `src/pages/blog/index.astro` (if exists) or `src/pages/blog.astro`
- Modify: `src/components/blog/BlogCard.astro`
- Modify: `src/components/blog/BlogCardImage.astro`

**Step 1: Read blog page and card components**

Read the files to understand current structure.

**Step 2: Visual refresh**

- Update blog overview page: remove grid backgrounds, update card borders to `border-warm`
- Update BlogCard: softer borders, rounded corners, `hover:border-acid` for subtle accent
- Update BlogCardImage: rounded corners `rounded-xl`
- Keep all content unchanged

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add src/pages/blog/ src/components/blog/
git commit -m "feat: visual refresh blog pages and cards with warm design"
```

---

## Task 14: Remove Unused Pages and Components

**Files:**
- Delete: `src/pages/website-laten-maken.astro`
- Delete: `src/pages/automations.astro`
- Delete: `src/pages/aanvragen.astro`
- Delete: `src/pages/portfolio.astro`
- Delete: `src/components/TypingRotator.tsx` (no longer used on homepage)
- Delete: `src/components/ConceptShowcase.astro` (portfolio-specific)
- Delete: `src/components/PortfolioSection.astro` (portfolio-specific)
- Delete: `src/components/OfferSection.astro` (pricing-specific)
- Delete: `src/components/OfferLocalSEOSection.astro` (if only used on removed pages)

**Step 1: Verify no remaining imports**

Search for any remaining imports of these components across the codebase:

```bash
grep -r "TypingRotator\|ConceptShowcase\|PortfolioSection\|OfferSection\|OfferLocalSEOSection" src/pages/ src/components/
```

Only delete components that have NO remaining imports.

**Step 2: Delete unused files**

```bash
rm src/pages/website-laten-maken.astro
rm src/pages/automations.astro
rm src/pages/aanvragen.astro
rm src/pages/portfolio.astro
# Only delete components confirmed unused in step 1
```

**Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds with no import errors.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove unused pages and components from pre-redesign

Delete website-laten-maken, automations, aanvragen, portfolio pages.
Delete unused components (TypingRotator, PortfolioSection, etc.).
All old URLs have 301 redirects in public/_redirects."
```

---

## Task 15: Update ContactWidget

**Files:**
- Modify: `src/components/ContactWidget.tsx`

**Step 1: Read current ContactWidget**

Read the file to understand current styling.

**Step 2: Update styling**

- Update colors to match warm design (if it uses acid green backgrounds, change to ink/subtle)
- Update border-radius to `rounded-lg` or `rounded-xl`
- Update any references to `/aanvragen/` to `/contact/`

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add src/components/ContactWidget.tsx
git commit -m "feat: update contact widget styling and link to /contact/"
```

---

## Task 16: Final Verification and Cleanup

**Step 1: Full build and check**

```bash
npm run build
```

**Step 2: Search for remaining references to old patterns**

```bash
grep -r "bg-grid-light\|bg-grid-dark\|/aanvragen/\|font-black" src/ --include="*.astro" --include="*.tsx"
```

Fix any remaining occurrences found.

**Step 3: Search for broken internal links**

```bash
grep -r "href=\"/website-laten-maken/\"\|href=\"/automations/\"\|href=\"/aanvragen/\"\|href=\"/portfolio/\"" src/ --include="*.astro" --include="*.tsx"
```

Replace any found with correct new URLs.

**Step 4: Verify dev server**

```bash
npm run dev
```

Check pages manually:
- `/` — homepage with new design
- `/wat-ik-doe/` — capabilities page
- `/over-mij/` — refreshed about page
- `/contact/` — refreshed contact page
- `/blog/` — refreshed blog
- `/website-voor-hoveniers/` — landing page
- Any city page (e.g., `/webdesign-buren/`)

**Step 5: Commit any remaining fixes**

```bash
git add -A
git commit -m "fix: clean up remaining old design references and broken links"
```

---

## Task 17: Update Sitemap

**Files:**
- Modify: `src/pages/sitemap.xml.ts` (add new pages, remove old)
- Modify: `src/pages/sitemap.astro` (update HTML sitemap)

**Step 1: Read sitemap files**

Read both files to understand current structure.

**Step 2: Update entries**

- Add: `/wat-ik-doe/`, `/website-voor-hoveniers/`
- Remove: `/website-laten-maken/`, `/automations/`, `/aanvragen/`, `/portfolio/`
- Keep all blog, city, and other page entries

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add src/pages/sitemap.xml.ts src/pages/sitemap.astro
git commit -m "feat: update sitemaps with new pages and remove old entries"
```
