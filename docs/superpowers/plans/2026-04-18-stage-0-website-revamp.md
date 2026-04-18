# Stage 0 Website Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure knapgemaakt.nl to reflect Stage 0 business reality. Consolidate offer at `/webdesign/`, remove `/pakketten/` and `/automatisering/*`, add Stage 0 gratis-april callout driven by a config module, standardize CTAs site-wide, rewrite FAQ.

**Architecture:** Single config module (`src/config/stage-0-offer.ts`) drives the Stage 0 callout and right-service-card content on homepage + `/webdesign/`. Legacy pages get 301-redirected via `public/_redirects`. `/offerte/` stays live but demoted from primary flow. No test framework exists in the repo; verification relies on `npm run build`, local dev server, grep sweeps, and post-deploy curl checks.

**Tech Stack:** Astro 5, Tailwind CSS 4, React 19 (islands only), Cloudflare Workers (`@astrojs/cloudflare`). No test framework installed.

**Spec reference:** `docs/superpowers/specs/2026-04-18-stage-0-website-revamp-design.md` (read this first for full rationale, copy drafts, and acceptance criteria).

**Voice rules (absolute):**
- Zero em-dashes anywhere (the long-dash character), in code or in copy. Use commas, colons, periods, parentheses. (The only exceptions are the grep commands in this plan that search for the character; they must contain it.)
- Informal `je`/`jij` throughout.
- Plain Dutch, readable by a 10-year-old.
- Trailing slashes on every internal link (`trailingSlash: "always"` in Astro config).
- No `hyphens: auto` in CSS (use `overflow-wrap: break-word`).

---

## File Structure

Before starting, here's the file-by-file plan.

### Files to create

| Path | Responsibility |
|---|---|
| `src/config/stage-0-offer.ts` | Stage 0 offer data (month, spots, enabled flag) + Dutch pluralization helpers |

### Files to rewrite (major)

| Path | Scope |
|---|---|
| `src/pages/webdesign.astro` | Full rewrite. 9-section consolidated offer page per spec §5 |
| `src/pages/veelgestelde-vragen.astro` | Rewrite all 9 answers, add 2 Stage 0 questions, update title + description |

### Files to modify (surgical)

| Path | Change |
|---|---|
| `src/pages/index.astro` | Hero CTA target + text, Stage 0 callout under CTA row, service-cards grid content rewrite, bottom-CTA copy |
| `src/components/Header.astro` | Remove Pakketten + Automatisering nav links, change CTA to `Kennismaken` → `/aanvragen/` (desktop + mobile) |
| `src/components/Footer.astro` | Remove Pakketten + Automatisering from legal strip |
| `src/pages/aanvragen.astro` | Rewrite dropdown options, rewrite URL-param `optionMap`, remove `quiz_context` hidden input |
| `src/pages/contact.astro` | Rewrite dropdown options, standardize sidebar CTA to `Plan een kennismaking` |
| `src/pages/website-voor-hoveniers.astro` | Audit + standardize CTAs |
| `src/pages/llms.txt.ts` | Drop `/pakketten/` and `/automatisering/*` entries; verify `/webdesign/` is listed |
| `src/pages/sitemap.astro` | Drop any hardcoded links to deleted pages |
| `src/pages/404.astro` | Drop any suggestions pointing to deleted pages |
| `src/pages/privacy.astro` | Replace `/pakketten/` and `/automatisering/` inline references |
| `src/pages/algemene-voorwaarden.astro` | Same as privacy |
| `src/pages/klant/jonkers.astro` | Fix single `/automatisering/` reference (per grep) |
| `src/pages/offerte.astro` | Replace any `/pakketten/` or `/automatisering/` inline references |
| `public/_redirects` | Append 7 new redirects; fix 7 existing chained redirects that still point to `/pakketten/` or `/automatisering/` |
| `src/content/blog/*.md` | Replace `/pakketten/` and `/automatisering/` inline links (content rewriting out of scope; link substitution only) |

### Files to delete

| Path |
|---|
| `src/pages/pakketten.astro` |
| `src/pages/automatisering.astro` |
| `src/pages/automatisering/ai-content.astro` |
| `src/pages/automatisering/factuurherinneringen.astro` |
| `src/pages/automatisering/lead-opvolging.astro` |
| `src/pages/automatisering/weekoverzichten.astro` |
| `src/pages/automatisering/whatsapp-opvolging.astro` |
| `src/pages/automatisering/` (directory, after files above are gone) |

### Files untouched

Blog posts (content), `/webdesign-[city]/` pages (location SEO), `/over/`, `/werk/`, `/plan/`, `/preview/`, `/api/**`, all other components, all design tokens, all assets.

---

## Task 1: Create stage-0-offer config module

**Files:**
- Create: `src/config/stage-0-offer.ts`

- [ ] **Step 1: Create the config file**

Write `src/config/stage-0-offer.ts`:

```typescript
export const stage0Offer = {
  enabled: true,
  month: "april",
  year: 2026,
  spotsRemaining: 2,
  ctaUrl: "/aanvragen/",
  detailsUrl: "/webdesign/",
} as const;

export function spotsLabel(n: number = stage0Offer.spotsRemaining): string {
  return n === 1 ? "1 plek" : `${n} plekken`;
}

export function bedrijvenLabel(n: number = stage0Offer.spotsRemaining): string {
  return n === 1 ? "1 bedrijf" : `${n} bedrijven`;
}

export function monthUpper(): string {
  return stage0Offer.month.toUpperCase();
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npm run build`
Expected: clean build (no new TS errors). If you see an "unused variable" warning on `stage0Offer`, ignore it; it'll be consumed in subsequent tasks.

- [ ] **Step 3: Commit**

```bash
git add src/config/stage-0-offer.ts
git commit -m "feat: add stage 0 offer config module

Single source of truth for the 'gratis april' Stage 0 offer: month,
spotsRemaining, enabled flag, and Dutch pluralization helpers.
Consumed by homepage hero, homepage right service card, and
/webdesign/ hero callout."
```

---

## Task 2: Update `public/_redirects`

**Files:**
- Modify: `public/_redirects`

Goal: (a) append 7 new redirects for the pages being removed; (b) update 7 existing redirects that currently point to `/pakketten/` or `/automatisering/` so they go directly to `/webdesign/` (avoid 301 chains).

- [ ] **Step 1: Append new redirects**

Append to `public/_redirects` (after the last line):

```
# 2026-04-18 Stage 0 restructure, consolidated offer page
/pakketten                             /webdesign/  301
/pakketten/                            /webdesign/  301
/automatisering                        /webdesign/  301
/automatisering/                       /webdesign/  301
/automatisering/lead-opvolging         /webdesign/  301
/automatisering/lead-opvolging/        /webdesign/  301
/automatisering/whatsapp-opvolging     /webdesign/  301
/automatisering/whatsapp-opvolging/    /webdesign/  301
/automatisering/factuurherinneringen   /webdesign/  301
/automatisering/factuurherinneringen/  /webdesign/  301
/automatisering/ai-content             /webdesign/  301
/automatisering/ai-content/            /webdesign/  301
/automatisering/weekoverzichten        /webdesign/  301
/automatisering/weekoverzichten/       /webdesign/  301
```

Note: the section header uses a regular hyphen before "consolidated", not an em-dash. Check visually.

- [ ] **Step 2: Update chained redirects**

Edit these existing lines to point directly to `/webdesign/`:

Line 40-41:
```
# OLD
/ict-diensten/slimmer-werken /automatisering/ 301
/ict-diensten/slimmer-werken/ /automatisering/ 301
# NEW
/ict-diensten/slimmer-werken /webdesign/ 301
/ict-diensten/slimmer-werken/ /webdesign/ 301
```

Line 44-45:
```
# OLD
/wat-ik-doe /pakketten/ 301
/wat-ik-doe/ /pakketten/ 301
# NEW
/wat-ik-doe /webdesign/ 301
/wat-ik-doe/ /webdesign/ 301
```

Line 52-59:
```
# OLD
/ict-diensten /pakketten/ 301
/ict-diensten/ /pakketten/ 301
/ict-diensten/website-hosting /pakketten/ 301
/ict-diensten/website-hosting/ /pakketten/ 301
/ict-diensten/email-hosting /pakketten/ 301
/ict-diensten/email-hosting/ /pakketten/ 301
/ict-diensten/automatisering /automatisering/ 301
/ict-diensten/automatisering/ /automatisering/ 301
# NEW
/ict-diensten /webdesign/ 301
/ict-diensten/ /webdesign/ 301
/ict-diensten/website-hosting /webdesign/ 301
/ict-diensten/website-hosting/ /webdesign/ 301
/ict-diensten/email-hosting /webdesign/ 301
/ict-diensten/email-hosting/ /webdesign/ 301
/ict-diensten/automatisering /webdesign/ 301
/ict-diensten/automatisering/ /webdesign/ 301
```

Line 62-63:
```
# OLD
/automations /automatisering/ 301
/automations/ /automatisering/ 301
# NEW
/automations /webdesign/ 301
/automations/ /webdesign/ 301
```

- [ ] **Step 3: Verify no em-dashes or stray characters**

Run: `grep -n '—' public/_redirects`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add public/_redirects
git commit -m "feat: consolidate /pakketten/ and /automatisering/ redirects to /webdesign/

Adds 14 new 301 redirect rules for the pages being deleted in this
restructure. Also updates 14 existing chained redirects (legacy
/ict-diensten/*, /wat-ik-doe, /automations) to point directly at
/webdesign/ instead of through the deprecated /pakketten/ or
/automatisering/ intermediate pages."
```

---

## Task 3: Rewrite `/webdesign/` page

**Files:**
- Rewrite: `src/pages/webdesign.astro`

This is the biggest task. Rewrite the entire page from scratch per spec §5. Use existing imports and components as building blocks: `Layout`, `Footer`, `FadeIn`, `FAQSection`, `Breadcrumb`, `ServiceSchema`, `BreadcrumbSchema`, `DraggableScroll`, `getAllProjects`.

- [ ] **Step 1: Rewrite `webdesign.astro` frontmatter and Layout wrapper**

Replace the current frontmatter (lines 1-34) with:

```astro
---
export const prerender = true;

import Layout from "../layouts/Layout.astro";
import Footer from "../components/Footer.astro";
import FadeIn from "../components/FadeIn.astro";
import FAQSection from "../components/FAQSection.astro";
import Breadcrumb from "../components/Breadcrumb.astro";
import ServiceSchema from "../components/seo/ServiceSchema.astro";
import BreadcrumbSchema from "../components/seo/BreadcrumbSchema.astro";
import FAQSchema from "../components/seo/FAQSchema.astro";
import { DraggableScroll } from "../components/DraggableScroll";
import { getAllProjects } from "../data/projects";
import { stage0Offer, spotsLabel, bedrijvenLabel } from "../config/stage-0-offer";

const projects = getAllProjects();

const breadcrumbs = [
	{ name: "Home", url: "https://knapgemaakt.nl/" },
	{ name: "Webdesign", url: "https://knapgemaakt.nl/webdesign/" }
];

const faqs = [
	{
		question: "Waarom is dit nu gratis?",
		answer: "Ik ben bezig met een Grand Slam Offer opbouwen en heb concrete case studies nodig om mijn waarde te kunnen aantonen. Gratis werk in ruil voor een case study is sneller dan tegen een slecht argument verkopen. In april nog 2 plekken, daarna start ik met betaald tegen 497 euro setup plus 47 euro per maand."
	},
	{
		question: "Wat gebeurt er na 90 dagen?",
		answer: "Nulmeting opnieuw, case study afgerond, testimonial als je dat wilt. Daarna kun je blijven of niet. Geen contract bindt je aan mij."
	},
	{
		question: "Wat als ik niet tevreden ben?",
		answer: "Dan gaat de site eraf, je krijgt niks gevraagd, we gaan allebei door. Ik verkies eerlijkheid boven een betaalde klant die intern klaagt."
	},
	{
		question: "Krijg ik de broncode?",
		answer: "Ja. De site staat op Cloudflare onder jouw account, de code in een Git-repo die van jou is. Als je na 90 dagen met iemand anders verder wilt, kan dat zonder gedoe."
	},
	{
		question: "Waarom geen WordPress?",
		answer: "WordPress is een CMS voor mensen die zelf hun site beheren. De meeste ondernemers willen dat helemaal niet, ze willen dat het werkt. Zonder WordPress is de site sneller, veiliger, en heeft minder onderhoud nodig."
	},
	{
		question: "Hoe lang duurt het voor Google me vindt?",
		answer: "Voor je bedrijfsnaam meestal 1 tot 2 weken. Voor 'hovenier [stad]'-achtige zoekopdrachten 2 tot 6 maanden. Sneller als je al een Google Bedrijfsprofiel hebt met reviews, langzamer als je vanaf nul begint."
	},
	{
		question: "Kan ik zelf teksten aanleveren?",
		answer: "Liever wel, want jij weet het best wat je doet. Schrijven is niet jouw vak, dus ik werk je tekst na. Foto's van jouzelf en je werk zijn belangrijker dan perfect gepolijste copy."
	}
];
---

<Layout
  title="Webdesign op maat in Buren | KNAP GEMAAKT."
  description="Maatwerk websites voor ondernemers. Snel, goed vindbaar in Google, en alles in één vast maandbedrag. In april nog 2 plekken gratis in ruil voor een case study."
>
  <BreadcrumbSchema items={breadcrumbs} />
  <ServiceSchema
    name="Webdesign op maat"
    description="Websites vanaf de grond opgebouwd. Ontwerp, bouw, hosting, Google-vindbaarheid en onderhoud in één aanpak. In april nog 2 plekken gratis in ruil voor een case study."
    serviceType="WebDesign"
    url="https://knapgemaakt.nl/webdesign/"
    price="0"
  />
  <FAQSchema faqs={faqs} />
  <main>
    <!-- TASK 3 STEPS 2-10 build the page body inside this <main> -->
  </main>
  <Footer hideCTA={true} />
</Layout>
```

- [ ] **Step 2: Write the hero section**

Inside `<main>`, add the hero:

```astro
<!-- HERO -->
<section class="pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-12 lg:px-16">
  <div class="max-w-5xl mx-auto">
    <div class="mb-6">
      <Breadcrumb items={breadcrumbs} />
    </div>
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-snug mb-6">
      Webdesign op maat, in Buren
    </h1>
    <p class="text-lg md:text-xl text-ink/70 max-w-2xl leading-relaxed mb-10">
      Ik bouw websites vanaf de grond op, zonder WordPress en zonder template. Sneller dan wat je gewend bent, goed vindbaar in Google, en beheerd in één vast maandbedrag. Voor ondernemers met één bedrijf, 0 tot 5 medewerkers en geen zin om zelf een CMS te leren.
    </p>

    {stage0Offer.enabled && (
      <div class="mb-10 border-l-4 border-accent bg-canvas-alt/50 px-6 py-5 rounded-r-lg max-w-2xl">
        <p class="font-bold tracking-tight text-lg mb-2">
          Nu in {stage0Offer.month}: {spotsLabel()} gratis
        </p>
        <p class="text-ink/70 leading-relaxed mb-3">
          Ik bouw op dit moment gratis voor {bedrijvenLabel()} in Nederland. Jij krijgt het volledige pakket, ik krijg een case study over 90 dagen en een korte testimonial als je tevreden bent. Voorkeur voor hoveniers en lokale dienstverleners, maar als je bedrijf past kijken we samen.
        </p>
        <a href={stage0Offer.ctaUrl} class="text-sm font-bold text-ink hover:text-accent transition-colors inline-flex items-center gap-1 group">
          Past dit bij jou?
          <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </a>
      </div>
    )}

    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
      <a href="/aanvragen/" class="bg-ink text-canvas px-8 py-4 rounded-lg font-bold tracking-tight hover:bg-ink/80 transition-colors duration-300 inline-flex items-center justify-center">
        Plan een kennismaking
      </a>
      <a href="#wat-zit-erin" class="text-ink font-bold tracking-tight hover:text-accent transition-colors duration-300 inline-flex items-center gap-2 group px-4 py-4">
        Zie wat erin zit
        <span class="transition-transform duration-300 group-hover:translate-y-1">&darr;</span>
      </a>
    </div>
    <p class="text-xs text-ink/50 font-mono">
      Meestal antwoord binnen een werkdag. Geen verkooppraatje vooraf.
    </p>
  </div>
</section>
```

- [ ] **Step 3: Write the `Wat zit erin` section**

Append after the hero:

```astro
<!-- WAT ZIT ERIN -->
<section id="wat-zit-erin" class="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-canvas-alt">
  <div class="max-w-5xl mx-auto">
    <FadeIn>
      <span class="text-xs font-bold uppercase tracking-widest text-ink/40 mb-4 block">Wat je krijgt</span>
      <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        Wat zit erin
      </h2>
      <p class="text-ink/70 text-lg leading-relaxed max-w-2xl mb-12">
        Het pakket heeft acht onderdelen. Eén website, maar ook alles eromheen dat een site pas echt nuttig maakt: vindbaarheid, klantcontact, meting, onderhoud. Op maat waar dat waarde toevoegt, standaard waar dat prima is.
      </p>
    </FadeIn>

    <div class="grid md:grid-cols-2 gap-6 md:gap-8">
      <FadeIn delay={100}>
        <div class="p-6 md:p-8 bg-canvas border border-warm rounded-xl h-full">
          <span class="text-xs font-mono text-ink/40 mb-2 block">01</span>
          <h3 class="text-xl font-bold mb-3">Maatwerk website</h3>
          <p class="text-ink/70 leading-relaxed">Gebouwd met Astro op Cloudflare. Laadt onder de seconde, werkt even goed op een oude telefoon als op een nieuwe laptop. Geen WordPress, geen plugins, geen beheersysteem.</p>
        </div>
      </FadeIn>
      <FadeIn delay={150}>
        <div class="p-6 md:p-8 bg-canvas border border-warm rounded-xl h-full">
          <span class="text-xs font-mono text-ink/40 mb-2 block">02</span>
          <h3 class="text-xl font-bold mb-3">Google Bedrijfsprofiel</h3>
          <p class="text-ink/70 leading-relaxed">Opgezet, categorieën goed ingevuld, foto's, Q&amp;A, posts. Voor lokale zoekopdrachten is dit meestal belangrijker dan je website zelf.</p>
        </div>
      </FadeIn>
      <FadeIn delay={200}>
        <div class="p-6 md:p-8 bg-canvas border border-warm rounded-xl h-full">
          <span class="text-xs font-mono text-ink/40 mb-2 block">03</span>
          <h3 class="text-xl font-bold mb-3">Lead-opvolging naar je telefoon</h3>
          <p class="text-ink/70 leading-relaxed">Elke aanvraag komt als WhatsApp of SMS op je toestel. Binnen 5 minuten terugbellen converteert tot 10&times; beter dan een dag later. Dus maak ik dat 5-minuten-venster zo makkelijk mogelijk voor je.</p>
        </div>
      </FadeIn>
      <FadeIn delay={250}>
        <div class="p-6 md:p-8 bg-canvas border border-warm rounded-xl h-full">
          <span class="text-xs font-mono text-ink/40 mb-2 block">04</span>
          <h3 class="text-xl font-bold mb-3">Reviews-motor</h3>
          <p class="text-ink/70 leading-relaxed">Na een afgeronde klus gaat er automatisch een vriendelijk review-verzoek uit. Op Google, niet op een of ander platform waar niemand kijkt.</p>
        </div>
      </FadeIn>
      <FadeIn delay={300}>
        <div class="p-6 md:p-8 bg-canvas border border-warm rounded-xl h-full">
          <span class="text-xs font-mono text-ink/40 mb-2 block">05</span>
          <h3 class="text-xl font-bold mb-3">Lokale SEO-basis</h3>
          <p class="text-ink/70 leading-relaxed">Schema-markup, citations in 20 Nederlandse directories, Google Search Console ingericht, basis-indexering. Niets geks, gewoon goed geregeld vanaf dag één.</p>
        </div>
      </FadeIn>
      <FadeIn delay={350}>
        <div class="p-6 md:p-8 bg-canvas border border-warm rounded-xl h-full">
          <span class="text-xs font-mono text-ink/40 mb-2 block">06</span>
          <h3 class="text-xl font-bold mb-3">Hosting, domein, SSL, zakelijk e-mail</h3>
          <p class="text-ink/70 leading-relaxed">Allemaal in het pakket. Geen losse facturen van 4 verschillende partijen.</p>
        </div>
      </FadeIn>
      <FadeIn delay={400}>
        <div class="p-6 md:p-8 bg-canvas border border-warm rounded-xl h-full">
          <span class="text-xs font-mono text-ink/40 mb-2 block">07</span>
          <h3 class="text-xl font-bold mb-3">Kleine aanpassingen binnen 48 werkuur</h3>
          <p class="text-ink/70 leading-relaxed">Adres veranderd, prijzen bijgewerkt, foto verruild. Mail me, meestal staat het dezelfde werkdag erop.</p>
        </div>
      </FadeIn>
      <FadeIn delay={450}>
        <div class="p-6 md:p-8 bg-canvas border border-warm rounded-xl h-full">
          <span class="text-xs font-mono text-ink/40 mb-2 block">08</span>
          <h3 class="text-xl font-bold mb-3">Maandelijks 1-pager prestatierapport</h3>
          <p class="text-ink/70 leading-relaxed">Bezoekers, aanvragen, Google-plek voor je belangrijkste zoekwoorden. Op één A4. Zodat je ziet waar je geld heen gaat.</p>
        </div>
      </FadeIn>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Write the `Wat vraag ik terug` section**

Append:

```astro
<!-- WAT VRAAG IK TERUG -->
<section class="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-canvas">
  <div class="max-w-5xl mx-auto">
    <FadeIn>
      <span class="text-xs font-bold uppercase tracking-widest text-ink/40 mb-4 block">De afspraak</span>
      <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        Wat ik ervoor terug vraag
      </h2>
      <p class="text-ink/70 text-lg leading-relaxed max-w-2xl mb-12">
        Gratis heeft voorwaarden. Geen kleine lettertjes, wel drie dingen.
      </p>
    </FadeIn>

    <div class="grid md:grid-cols-3 gap-8 md:gap-12">
      <FadeIn delay={100}>
        <div>
          <span class="text-5xl font-bold text-accent block mb-4">1</span>
          <h3 class="text-xl font-bold mb-3">Een nulmeting vooraf</h3>
          <p class="text-ink/70 leading-relaxed">Voor we beginnen zetten we op één A4 waar je nu staat. Bezoekers per maand, Google-plek voor je belangrijkste zoekwoord, aantal reviews, aanvragen per week. Ruwe schattingen zijn prima. Boekhouding hoef ik niet te zien. De publieke data zoek ik zelf op.</p>
        </div>
      </FadeIn>
      <FadeIn delay={200}>
        <div>
          <span class="text-5xl font-bold text-accent block mb-4">2</span>
          <h3 class="text-xl font-bold mb-3">Een meting na 90 dagen</h3>
          <p class="text-ink/70 leading-relaxed">We vullen dezelfde A4 opnieuw in. Het verschil schrijf ik op als case study. Jouw naam eronder of niet, jij bepaalt.</p>
        </div>
      </FadeIn>
      <FadeIn delay={300}>
        <div>
          <span class="text-5xl font-bold text-accent block mb-4">3</span>
          <h3 class="text-xl font-bold mb-3">Een korte review en een intro</h3>
          <p class="text-ink/70 leading-relaxed">Als je tevreden bent: een review in tekst of op video, wat jij makkelijker vindt. En als je iemand kent die hier ook wat aan zou hebben, een introductie. Geen verplichting.</p>
        </div>
      </FadeIn>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Write the `Waarom geen template?` section**

Append (this section's content is preserved from the original webdesign page with light edits, see original lines 54-90 for reference but use the text below since it has been edited for voice):

```astro
<!-- WAAROM GEEN TEMPLATE -->
<section class="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-canvas-alt">
  <div class="max-w-5xl mx-auto">
    <FadeIn>
      <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-8">
        Waarom geen template?
      </h2>
      <div class="grid md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <p class="text-ink/70 leading-relaxed mb-6">
            De meeste websites voor kleine bedrijven draaien op WordPress met een kant-en-klaar thema. Dat werkt, maar het is traag. Tientallen plugins die bij elke pagina meeladen, updates die dingen stukmaken, en laadtijden waar je bezoekers niet op wachten.
          </p>
          <p class="text-ink/70 leading-relaxed">
            Ik bouw elke website op maat. Geen overbodige plugins, geen trage laadtijden, geen ingewikkeld beheersysteem. Wat jouw bedrijf nodig heeft, meer niet.
          </p>
        </div>
        <div>
          <ul class="space-y-4">
            {[
              "Elk ontwerp past specifiek bij jouw bedrijf",
              "Snel, ook op een trage verbinding",
              "Werkt net zo goed op mobiel als op desktop",
              "Geen plugins die onderhoud nodig hebben",
              "Gebouwd om goed te scoren in Google",
              "Teksten schrijf ik mee als je dat wilt",
              "Hosting en domeinnaam erbij geregeld"
            ].map((feature) => (
              <li class="flex items-start gap-3 text-ink/70">
                <div class="w-2 h-2 rounded-full bg-accent shrink-0 mt-2.5"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeIn>
  </div>
</section>
```

- [ ] **Step 6: Write the `Hoe het werkt` section**

Append:

```astro
<!-- HOE HET LOOPT -->
<section class="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-canvas">
  <div class="max-w-5xl mx-auto">
    <FadeIn>
      <span class="text-xs font-bold uppercase tracking-widest text-ink/40 mb-4 block">Van eerste contact tot dag 90</span>
      <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        Hoe het loopt
      </h2>
      <p class="text-ink/70 text-lg leading-relaxed max-w-2xl mb-12">
        Van eerste contact tot dag-90-meting duurt gemiddeld 12 weken. De bouw zelf ongeveer twee weken.
      </p>
    </FadeIn>

    <ol class="space-y-8">
      <FadeIn delay={100}>
        <li class="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
          <span class="text-4xl font-bold text-accent shrink-0 md:w-24">1.</span>
          <div>
            <h3 class="text-xl font-bold mb-2">Kennismaking (30 min, video)</h3>
            <p class="text-ink/70 leading-relaxed">Jij vertelt wat je doet en wat knelt. Ik vertel wat ik zou bouwen. Past het niet, dan zeggen we dat. Geen offerte, geen follow-up mail, geen gedoe.</p>
          </div>
        </li>
      </FadeIn>
      <FadeIn delay={150}>
        <li class="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
          <span class="text-4xl font-bold text-accent shrink-0 md:w-24">2.</span>
          <div>
            <h3 class="text-xl font-bold mb-2">Nulmeting (30 min, video of schriftelijk)</h3>
            <p class="text-ink/70 leading-relaxed">Publieke data heb ik al verzameld. Ik leg ze je voor, we vullen samen de rest in. Eén A4.</p>
          </div>
        </li>
      </FadeIn>
      <FadeIn delay={200}>
        <li class="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
          <span class="text-4xl font-bold text-accent shrink-0 md:w-24">3.</span>
          <div>
            <h3 class="text-xl font-bold mb-2">Ontwerp en bouw (1 tot 2 weken)</h3>
            <p class="text-ink/70 leading-relaxed">Geen fase-plannen of PDF-presentaties. Halverwege stuur ik je een link naar een preview-url, dan zie je waar ik sta.</p>
          </div>
        </li>
      </FadeIn>
      <FadeIn delay={250}>
        <li class="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
          <span class="text-4xl font-bold text-accent shrink-0 md:w-24">4.</span>
          <div>
            <h3 class="text-xl font-bold mb-2">Livegang</h3>
            <p class="text-ink/70 leading-relaxed">We zetten de site live, Google-profiel gaat mee, lead-opvolging wordt getest. Ik stuur je binnen een dag een proefbericht via WhatsApp om te checken of het aankomt.</p>
          </div>
        </li>
      </FadeIn>
      <FadeIn delay={300}>
        <li class="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
          <span class="text-4xl font-bold text-accent shrink-0 md:w-24">5.</span>
          <div>
            <h3 class="text-xl font-bold mb-2">Meting na 90 dagen</h3>
            <p class="text-ink/70 leading-relaxed">Halfuurtje video. Zelfde A4 opnieuw, we kijken wat is verschoven. Hier komt je case study uit en eventueel je testimonial.</p>
          </div>
        </li>
      </FadeIn>
    </ol>
  </div>
</section>
```

- [ ] **Step 7: Write the `Voor wie` section**

Append:

```astro
<!-- VOOR WIE -->
<section class="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-canvas-alt">
  <div class="max-w-5xl mx-auto">
    <div class="grid md:grid-cols-2 gap-10 md:gap-16">
      <FadeIn>
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-6">Voor wie is dit</h2>
        <p class="text-ink/70 text-lg leading-relaxed">
          Ondernemers met één bedrijf, 0 tot 5 medewerkers, en een dienst die lokaal geleverd wordt. Hoveniers en dienstverleners zoals schoonmaakbedrijven, schilders, elektriciens, installateurs, kappers, coaches. Je bent vakman of vakvrouw eerst, marketeer later.
        </p>
      </FadeIn>
      <FadeIn delay={150}>
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-ink/60">Voor wie dit niet is</h2>
        <p class="text-ink/70 text-lg leading-relaxed">
          Webshops met meer dan 10 producten, want dat is een ander vak en andere tools. Mensen die zelf in een CMS willen werken, want mijn aanpak heeft geen CMS en dat is ook precies waarom het sneller en veiliger is. Snelle klussen van "zet dit even op een pagina voor 100 euro", want dat ben ik niet en doe ik ook niet.
        </p>
      </FadeIn>
    </div>
  </div>
</section>
```

- [ ] **Step 8: Write the `Werk` showcase section**

Append (this reuses the pattern from `index.astro:116-221`):

```astro
<!-- WERK SHOWCASE -->
<section class="py-20 md:py-28 bg-canvas relative overflow-hidden">
  <div class="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 mb-12 md:mb-16 relative z-10">
    <FadeIn>
      <span class="text-xs font-bold uppercase tracking-widest text-ink/40 mb-4 block">Werk</span>
      <h2 class="text-3xl md:text-4xl font-bold tracking-tight">
        Recente projecten
      </h2>
    </FadeIn>
  </div>

  <FadeIn delay={200}>
    <DraggableScroll client:visible className="pb-4 pl-6 md:pl-12 lg:pl-[max(1rem,calc((100vw-64rem)/2+1rem))]">
      {projects.map(project => (
        <a
          href={`/project/${project.slug}/`}
          class="flex-shrink-0 w-[380px] md:w-[480px] lg:w-[560px] rounded-2xl border border-warm bg-white overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group block"
        >
          <div class="aspect-[16/10] bg-gradient-to-br from-canvas-alt to-canvas flex items-center justify-center overflow-hidden">
            {project.overviewMockup ? (
              <img
                src={project.overviewMockup}
                alt={project.title}
                width="1200"
                height="750"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                draggable="false"
              />
            ) : (
              <span class="text-ink/50/40 text-sm">Preview</span>
            )}
          </div>
          <div class="p-5">
            {project.category === "Live" ? (
              <span class="inline-block text-[10px] font-bold uppercase tracking-widest bg-accent text-white px-2 py-0.5 rounded-full mb-2">LIVE</span>
            ) : (
              <span class="inline-block text-[10px] font-bold uppercase tracking-widest bg-ink/10 text-ink px-2 py-0.5 rounded-full mb-2">IN ONTWIKKELING</span>
            )}
            <h3 class="font-bold text-lg mb-1">{project.title}</h3>
            <p class="text-sm text-ink/50">{project.industry} &middot; {project.location}</p>
          </div>
        </a>
      ))}
      <a
        href="/werk/"
        class="flex-shrink-0 w-[200px] md:w-[250px] mr-6 rounded-2xl border border-warm bg-canvas-alt flex flex-col items-center justify-center hover:border-accent transition-colors duration-300 group"
      >
        <span class="text-ink/50 group-hover:text-ink transition-colors font-bold mb-1">Bekijk alles</span>
        <span class="text-accent text-sm">Naar portfolio &rarr;</span>
      </a>
    </DraggableScroll>
  </FadeIn>
</section>
```

- [ ] **Step 9: Write the FAQ section**

Append:

```astro
<!-- FAQ -->
<section class="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-canvas-alt">
  <div class="max-w-3xl mx-auto">
    <FadeIn>
      <span class="text-xs font-bold uppercase tracking-widest text-ink/40 mb-4 block">Veelgestelde vragen</span>
      <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-12">
        Dingen die anderen ook vroegen
      </h2>
    </FadeIn>
    <FadeIn delay={100}>
      <FAQSection faqs={faqs} />
    </FadeIn>
  </div>
</section>
```

- [ ] **Step 10: Write the Slot CTA section**

Append:

```astro
<!-- SLOT CTA -->
<section class="py-20 md:py-28 px-6 md:px-12 lg:px-16 bg-ink text-canvas relative overflow-hidden">
  <div class="max-w-5xl mx-auto text-center relative z-10">
    <FadeIn>
      <h2 class="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
        {stage0Offer.enabled
          ? `${spotsLabel()} in ${stage0Offer.month}. Past jouw bedrijf?`
          : "Klaar voor een website die wel werkt?"}
      </h2>
      <p class="text-canvas/60 text-lg mb-10 max-w-xl mx-auto">
        30 minuten videocall. Jij vertelt wat je doet, ik vertel wat ik zou bouwen en waarom. Past het niet bij mij? Dan zeg ik dat ook. Scheelt ons allebei tijd.
      </p>
      <a
        href="/aanvragen/"
        class="bg-accent text-white px-8 py-4 rounded-lg font-bold tracking-tight hover:bg-accent/90 transition-colors duration-300 inline-flex items-center justify-center gap-3 group"
      >
        Plan een kennismaking
        <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
      </a>
    </FadeIn>
  </div>
</section>
```

- [ ] **Step 11: Build and visually verify**

Run: `npm run build`
Expected: clean build, no TS errors, no missing imports.

Run: `npm run dev`
Navigate to `http://localhost:4321/webdesign/`
Verify each section renders. Check at 375px, 768px, 1440px widths. Confirm no layout overflow, hero callout shows, CTAs link to `/aanvragen/`, anchor `#wat-zit-erin` works from secondary link.

- [ ] **Step 12: Check for em-dashes in the new file**

Run: `grep -n '—' src/pages/webdesign.astro`
Expected: no output. If any found, replace with comma, colon, or period.

- [ ] **Step 13: Commit**

```bash
git add src/pages/webdesign.astro
git commit -m "feat: rewrite /webdesign/ as Stage 0 consolidated offer page

9-section structure: hero with Stage 0 callout, wat zit erin (8
components), wat vraag ik terug, waarom geen template, hoe het
loopt, voor wie, werk showcase, FAQ, slot CTA. Config-driven
callout (src/config/stage-0-offer.ts) so the 'gratis in april'
messaging can be toggled off for Stage 1 transition with one flag.
FAQPage schema added for AI Overview citations."
```

---

## Task 4: Homepage patches

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add config import to homepage frontmatter**

In `src/pages/index.astro`, after the `getAllProjects` import (line 11), add:

```astro
import { stage0Offer, spotsLabel, bedrijvenLabel } from "../config/stage-0-offer";
```

- [ ] **Step 2: Update primary CTA**

Find lines 49-54:

```astro
<a
  href="/offerte/"
  class="bg-ink text-canvas px-8 py-4 rounded-lg font-bold tracking-tight hover:bg-ink/80 transition-colors duration-300 inline-flex items-center justify-center"
>
  Advies op maat in 2 min
</a>
```

Replace with:

```astro
<a
  href="/aanvragen/"
  class="bg-ink text-canvas px-8 py-4 rounded-lg font-bold tracking-tight hover:bg-ink/80 transition-colors duration-300 inline-flex items-center justify-center"
>
  Plan een kennismaking
</a>
```

- [ ] **Step 3: Add Stage 0 callout below CTA row**

After the closing `</div>` that ends the CTA row (after line 62), add:

```astro
{stage0Offer.enabled && (
  <div class="mt-8 flex items-start gap-3 max-w-xl">
    <span class="w-2 h-2 rounded-full bg-accent mt-2 shrink-0"></span>
    <p class="text-sm text-ink/70 leading-relaxed">
      <strong class="text-ink">Nu in {stage0Offer.month}: {spotsLabel()} gratis.</strong>
      {' '}Ik bouw voor {bedrijvenLabel()} in Nederland een volledige site, in ruil voor een case study.
      {' '}<a href={stage0Offer.detailsUrl} class="underline hover:text-accent transition-colors">Bekijk wat erin zit &rarr;</a>
    </p>
  </div>
)}
```

- [ ] **Step 4: Rewrite left service card**

Find the `Stap 1` card at lines 80-94. Replace with:

```astro
<FadeIn delay={100}>
  <a href="/webdesign/" class="glass-card p-8 md:p-10 flex flex-col cursor-pointer group block h-full">
    <div class="w-10 h-10 rounded-lg bg-ink flex items-center justify-center mb-5">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-canvas" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
    </div>
    <span class="text-xs font-mono uppercase tracking-widest text-ink/40 mb-2">Het aanbod</span>
    <h3 class="text-2xl font-bold mb-3">Wat je krijgt</h3>
    <p class="text-ink/70 leading-relaxed mb-4">
      Alles in één aanpak. Geen losse rekeningen voor hosting en onderhoud, geen beheersysteem waar je cursussen voor nodig hebt.
    </p>
    <ul class="space-y-2 text-sm text-ink/70 mb-6">
      <li class="flex items-start gap-2"><span class="text-accent mt-1">&bull;</span> Maatwerk site op Astro en Cloudflare</li>
      <li class="flex items-start gap-2"><span class="text-accent mt-1">&bull;</span> Google Bedrijfsprofiel ingericht en onderhouden</li>
      <li class="flex items-start gap-2"><span class="text-accent mt-1">&bull;</span> Lead-opvolging via WhatsApp op je telefoon</li>
      <li class="flex items-start gap-2"><span class="text-accent mt-1">&bull;</span> Reviews-motor die automatisch vraagt na een klus</li>
      <li class="flex items-start gap-2"><span class="text-accent mt-1">&bull;</span> Hosting, domein, SSL en zakelijk e-mail</li>
    </ul>
    <span class="mt-auto text-sm font-bold text-ink group-hover:text-accent transition-colors inline-flex items-center gap-1">
      Bekijk het hele aanbod <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
    </span>
  </a>
</FadeIn>
```

- [ ] **Step 5: Rewrite right service card**

Find the `Stap 2` card at lines 96-110. Replace with:

```astro
<FadeIn delay={200}>
  <a href={stage0Offer.enabled ? stage0Offer.ctaUrl : "/webdesign/"} class="glass-card p-8 md:p-10 flex flex-col cursor-pointer group block h-full">
    <div class="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-5">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-canvas" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><circle cx="12" cy="15" r="1.5" fill="currentColor"/></svg>
    </div>
    {stage0Offer.enabled ? (
      <>
        <span class="text-xs font-mono uppercase tracking-widest text-ink/40 mb-2">Nu in {stage0Offer.month}</span>
        <h3 class="text-2xl font-bold mb-3">Gratis bouw voor {bedrijvenLabel()}</h3>
        <p class="text-ink/70 leading-relaxed mb-6">
          Ik zoek {bedrijvenLabel()} in Nederland waarvoor ik kosteloos bouw, in ruil voor een case study na 90 dagen. Voorkeur voor hoveniers en lokale dienstverleners, maar als je bedrijf past kijken we samen.
        </p>
        <span class="mt-auto text-sm font-bold text-ink group-hover:text-accent transition-colors inline-flex items-center gap-1">
          Past dit bij jou? <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </span>
      </>
    ) : (
      <>
        <span class="text-xs font-mono uppercase tracking-widest text-ink/40 mb-2">Wat kost het</span>
        <h3 class="text-2xl font-bold mb-3">Een vast maandbedrag</h3>
        <p class="text-ink/70 leading-relaxed mb-6">
          Setup 497 euro, daarna 47 euro per maand. Alles erin: hosting, onderhoud, Google, lead-opvolging, reviews, kleine aanpassingen. Minimaal 12 maanden, daarna opzegbaar per maand.
        </p>
        <span class="mt-auto text-sm font-bold text-ink group-hover:text-accent transition-colors inline-flex items-center gap-1">
          Bekijk het volledige aanbod <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </span>
      </>
    )}
  </a>
</FadeIn>
```

- [ ] **Step 6: Update bottom CTA section**

Find lines 237-253. Replace subtext (line 243) and button text (line 247-250):

```astro
<!-- OLD -->
<p class="text-canvas/60 text-lg mb-10 max-w-xl mx-auto">
  Plan een kennismaking in. Vertel wat je bedrijf doet, ik kom met een concreet voorstel en een vaste prijs.
</p>
<a
  href="/aanvragen/"
  class="bg-accent text-white px-8 py-4 rounded-lg font-bold tracking-tight hover:bg-accent/90 transition-colors duration-300 inline-flex items-center justify-center gap-3 group"
>
  Plan een gesprek in

<!-- NEW -->
<p class="text-canvas/60 text-lg mb-10 max-w-xl mx-auto">
  Plan een kennismaking. Vertel wat je bedrijf doet, ik kom met een concreet voorstel. Past het niet, dan zeg ik dat ook.
</p>
<a
  href="/aanvragen/"
  class="bg-accent text-white px-8 py-4 rounded-lg font-bold tracking-tight hover:bg-accent/90 transition-colors duration-300 inline-flex items-center justify-center gap-3 group"
>
  Plan een kennismaking
```

- [ ] **Step 7: Build and visually verify**

Run: `npm run build`
Expected: clean build.

Run: `npm run dev`
Navigate to `http://localhost:4321/`. Verify:
- Hero primary CTA says "Plan een kennismaking", links to `/aanvragen/`
- Stage 0 callout visible below CTA row with dot + underlined link
- Left service card says "Het aanbod / Wat je krijgt" with 5-bullet list
- Right service card says "Nu in april / Gratis bouw voor 2 bedrijven"
- Bottom CTA button says "Plan een kennismaking"
- Rotating words still animating

Test both states by temporarily flipping `stage0Offer.enabled = false` in the config and reloading. Right card should swap to "Wat kost het / Een vast maandbedrag". Revert the flag before committing.

- [ ] **Step 8: Grep for em-dashes**

Run: `grep -n '—' src/pages/index.astro`
Expected: no output.

- [ ] **Step 9: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: homepage Stage 0 patch

Primary CTA retargets to /aanvragen/ with 'Plan een kennismaking'
copy. New Stage 0 callout below CTA row. Service cards grid
repurposed: left card 'Het aanbod / Wat je krijgt' links to
/webdesign/, right card 'Nu in april / Gratis bouw voor 2
bedrijven' links to /aanvragen/ (with Stage 1 fallback variant
when stage0Offer.enabled is false). Bottom-CTA copy standardized
to 'Plan een kennismaking'."
```

---

## Task 5: Header nav cleanup

**Files:**
- Modify: `src/components/Header.astro`

- [ ] **Step 1: Update `standaloneLinks` array**

Find lines 27-32:

```javascript
const standaloneLinks = [
    { href: "/webdesign/", label: "Webdesign" },
    { href: "/pakketten/", label: "Pakketten" },
    { href: "/automatisering/", label: "Automatisering" },
    { href: "/werk/", label: "Werk" },
];
```

Replace with:

```javascript
const standaloneLinks = [
    { href: "/webdesign/", label: "Webdesign" },
    { href: "/werk/", label: "Werk" },
];
```

- [ ] **Step 2: Update comment on line 5**

Line 5:

```javascript
// OLD: * Nav: Webdesign | Pakketten | Automatisering | Werk | Over (dropdown)
// NEW: * Nav: Webdesign | Werk | Over (dropdown)
```

- [ ] **Step 3: Update desktop CTA**

Find lines 104-110:

```astro
<a
    href="/offerte/"
    class="bg-ink text-canvas text-sm font-bold tracking-tight px-5 py-2.5 rounded-lg hover:bg-ink/80 transition-colors duration-200 ml-2"
>
    Advies op maat
</a>
```

Replace with:

```astro
<a
    href="/aanvragen/"
    class="bg-ink text-canvas text-sm font-bold tracking-tight px-5 py-2.5 rounded-lg hover:bg-ink/80 transition-colors duration-200 ml-2"
>
    Kennismaken
</a>
```

- [ ] **Step 4: Update mobile overlay CTA**

Find lines 193-199:

```astro
<a
    href="/offerte/"
    class="inline-flex items-center justify-center bg-ink text-canvas px-8 py-4 rounded-lg font-bold tracking-tight hover:bg-ink/80 transition-colors duration-200"
>
    Advies op maat
</a>
```

Replace with:

```astro
<a
    href="/aanvragen/"
    class="inline-flex items-center justify-center bg-ink text-canvas px-8 py-4 rounded-lg font-bold tracking-tight hover:bg-ink/80 transition-colors duration-200"
>
    Kennismaken
</a>
```

- [ ] **Step 5: Build + verify**

Run: `npm run build` then `npm run dev`.
Navigate to `http://localhost:4321/`. Confirm nav shows `Webdesign | Werk | Over (dropdown) | Kennismaken` and CTA links to `/aanvragen/`. Test mobile hamburger overlay (shrink viewport to 375px) and confirm same links.

- [ ] **Step 6: Grep for em-dashes**

Run: `grep -n '—' src/components/Header.astro`
Expected: no output.

- [ ] **Step 7: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat(nav): drop Pakketten + Automatisering, update CTA

Nav becomes Webdesign | Werk | Over (dropdown) | Kennismaken.
CTA retargets from /offerte/ to /aanvragen/. Compact
'Kennismaken' variant used in nav to fit button width; full
'Plan een kennismaking' stays the in-page primary CTA."
```

---

## Task 6: Footer cleanup

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Remove Pakketten and Automatisering links from legal strip**

Find lines 120-128:

```astro
<div class="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 font-mono text-xs text-canvas/50 uppercase tracking-widest mb-6">
    <a href="/pakketten/" class="hover:text-canvas/80 transition-colors">Pakketten</a>
    <a href="/automatisering/" class="hover:text-canvas/80 transition-colors">Automatisering</a>
    <a href="/contact/" class="hover:text-canvas/80 transition-colors">Contact</a>
    <a href="/veelgestelde-vragen/" class="hover:text-canvas/80 transition-colors">FAQ</a>
    <a href="/algemene-voorwaarden/" class="hover:text-canvas/80 transition-colors">Voorwaarden</a>
    <a href="/privacy/" class="hover:text-canvas/80 transition-colors">Privacy</a>
    <a href="/sitemap/" class="hover:text-canvas/80 transition-colors">Sitemap</a>
</div>
```

Replace with:

```astro
<div class="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 font-mono text-xs text-canvas/50 uppercase tracking-widest mb-6">
    <a href="/contact/" class="hover:text-canvas/80 transition-colors">Contact</a>
    <a href="/veelgestelde-vragen/" class="hover:text-canvas/80 transition-colors">FAQ</a>
    <a href="/algemene-voorwaarden/" class="hover:text-canvas/80 transition-colors">Voorwaarden</a>
    <a href="/privacy/" class="hover:text-canvas/80 transition-colors">Privacy</a>
    <a href="/sitemap/" class="hover:text-canvas/80 transition-colors">Sitemap</a>
</div>
```

- [ ] **Step 2: Build + verify**

Run: `npm run dev`. Navigate to any page with footer (e.g., `/`). Scroll to footer, confirm legal strip reads `Contact | FAQ | Voorwaarden | Privacy | Sitemap`.

- [ ] **Step 3: Grep for em-dashes**

Run: `grep -n '—' src/components/Footer.astro`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat(footer): drop Pakketten + Automatisering from legal strip"
```

---

## Task 7: Aanvragen form updates

**Files:**
- Modify: `src/pages/aanvragen.astro`

- [ ] **Step 1: Remove `quiz_context` hidden input**

Find line 34:

```astro
<input type="hidden" name="quiz_context" id="quiz-context-input" />
```

Delete this line.

- [ ] **Step 2: Rewrite specification dropdown options**

Find lines 219-224:

```astro
<option value="" disabled selected>Maak een keuze...</option>
<option value="Website">Website</option>
<option value="Pakketkeuze">Pakketkeuze</option>
<option value="Automatisering">Automatisering</option>
<option value="Iets anders">Iets anders</option>
```

Replace with:

```astro
<option value="" disabled selected>Maak een keuze...</option>
<option value="April-actie">Ik wil meedoen aan de april-actie (gratis plek)</option>
<option value="Nieuwe website">Ik wil een nieuwe website</option>
<option value="Iets anders">Iets anders</option>
```

- [ ] **Step 3: Rewrite URL-param `optionMap`**

Find lines 506-520:

```javascript
const optionMap: Record<string, string> = {
    "nieuwe-website": "Website",
    "webdesign": "Website",
    "websites-op-maat": "Website",
    "automatisering": "Automatisering",
    "lead-opvolging": "Automatisering",
    "ai-content": "Automatisering",
    "factuurherinneringen": "Automatisering",
    "whatsapp-opvolging": "Automatisering",
    "weekoverzichten": "Automatisering",
    "pakketten": "Pakketkeuze",
    "pakket-essentieel": "Pakketkeuze",
    "pakket-groei": "Pakketkeuze",
    "pakket-compleet": "Pakketkeuze",
};
```

Replace with:

```javascript
const optionMap: Record<string, string> = {
    "april":          "April-actie",
    "gratis":         "April-actie",
    "webdesign":      "Nieuwe website",
    "nieuwe-website": "Nieuwe website",
    "anders":         "Iets anders",
};
```

- [ ] **Step 4: Build + verify form behavior**

Run: `npm run dev`. Navigate to `http://localhost:4321/aanvragen/`.

Test matrix:
- Load page fresh, confirm dropdown has exactly 4 options (1 disabled + 3 active)
- Navigate to `http://localhost:4321/aanvragen/?onderwerp=april`, confirm dropdown auto-selects "Ik wil meedoen aan de april-actie (gratis plek)"
- Navigate to `http://localhost:4321/aanvragen/?onderwerp=webdesign`, confirm dropdown auto-selects "Ik wil een nieuwe website"
- Navigate to `http://localhost:4321/aanvragen/?onderwerp=anders`, confirm dropdown auto-selects "Iets anders"
- Navigate to `http://localhost:4321/aanvragen/?onderwerp=lead-opvolging`, confirm dropdown stays on "Maak een keuze..." (legacy slug no longer mapped, that's expected)
- Fill out the full form (pick a time slot) and submit, confirm POST to `/api/submissions` succeeds and `specification` field in the request body matches the selected dropdown value

- [ ] **Step 5: Grep for em-dashes and dead references**

Run: `grep -n '—\|quiz_context\|Pakketkeuze' src/pages/aanvragen.astro`
Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add src/pages/aanvragen.astro
git commit -m "feat(aanvragen): Stage 0 dropdown + remove quiz_context

Dropdown becomes 3 options: april-actie / nieuwe website / iets
anders. URL-param optionMap simplified to 5 slugs (april, gratis,
webdesign, nieuwe-website, anders). Quiz_context hidden input
removed since /offerte/ is no longer in primary flow."
```

---

## Task 8: Contact form updates

**Files:**
- Modify: `src/pages/contact.astro`

- [ ] **Step 1: Rewrite subject dropdown options**

Find lines 121-125:

```astro
<option value="" disabled selected>Maak een keuze...</option>
<option value="Nieuwe website">Nieuwe website</option>
<option value="Automatisering">Automatisering</option>
<option value="Prijzen">Prijzen</option>
<option value="Iets anders">Iets anders</option>
```

Replace with:

```astro
<option value="" disabled selected>Maak een keuze...</option>
<option value="Nieuwe website">Nieuwe website</option>
<option value="April-actie">Vraag over de april-actie</option>
<option value="Prijzen">Prijzen en tarieven</option>
<option value="Iets anders">Iets anders</option>
```

- [ ] **Step 2: Standardize sidebar CTA**

Find lines 210-216 (the sidebar booking card):

```astro
<a
    href="/aanvragen/"
    class="inline-flex items-center justify-center gap-3 px-6 py-3 bg-accent text-ink font-bold tracking-tight text-sm rounded-lg hover:bg-canvas hover:text-ink transition-colors duration-300 group w-full"
>
    Plan een gesprek in
    <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
</a>
```

Change button text from `Plan een gesprek in` to `Plan een kennismaking`:

```astro
<a
    href="/aanvragen/"
    class="inline-flex items-center justify-center gap-3 px-6 py-3 bg-accent text-ink font-bold tracking-tight text-sm rounded-lg hover:bg-canvas hover:text-ink transition-colors duration-300 group w-full"
>
    Plan een kennismaking
    <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
</a>
```

- [ ] **Step 3: Build + verify**

Run: `npm run dev`. Navigate to `http://localhost:4321/contact/`. Confirm:
- Subject dropdown has 4 options with new labels
- Sidebar card reads "Plan een kennismaking" on the button

- [ ] **Step 4: Grep for em-dashes and dead references**

Run: `grep -n '—\|Automatisering' src/pages/contact.astro`
Expected: no output (the word "Automatisering" should no longer appear as an option).

- [ ] **Step 5: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat(contact): Stage 0 dropdown + standardize CTA

Subject dropdown becomes 4 options: nieuwe website / april-actie /
prijzen / iets anders. Sidebar booking CTA text standardized from
'Plan een gesprek in' to 'Plan een kennismaking'."
```

---

## Task 9: FAQ page rewrite

**Files:**
- Rewrite: `src/pages/veelgestelde-vragen.astro`

- [ ] **Step 1: Rewrite frontmatter `faqs` array and Layout props**

Replace lines 11-58 with:

```astro
const faqs = [
	{
		question: "Wat kost een website laten maken?",
		answer: "In april nog niks. Ik bouw momenteel gratis voor 2 Nederlandse bedrijven in ruil voor een case study. Vanaf mei start ik met betaald werk: 497 euro eenmalig plus 47 euro per maand, met alles erin (site, hosting, Google-vindbaarheid, lead-opvolging, reviews, kleine aanpassingen)."
	},
	{
		question: "Hoe lang duurt het om een website te bouwen?",
		answer: "De bouw zelf ongeveer twee weken. Van eerste kennismaking tot livegang zit er gemiddeld 3 tot 5 weken tussen, afhankelijk van hoe snel we teksten en foto's rond hebben. Grotere projecten met extra koppelingen duren iets langer."
	},
	{
		question: "Kan ik zelf dingen aanpassen op mijn website?",
		answer: "Kleine aanpassingen regel ik voor je, meestal dezelfde werkdag of binnen 48 werkuur. Dat zit in het pakket. Je hoeft zelf niets technisch te doen en er is geen CMS waar je in moet werken."
	},
	{
		question: "Wat zit er in het pakket?",
		answer: "Maatwerk site, Google Bedrijfsprofiel, lead-opvolging via WhatsApp, reviews-motor, lokale SEO-basis, hosting en domein, zakelijk e-mail, kleine aanpassingen binnen 48 werkuur, en een maandelijks 1-pager rapport. Acht onderdelen, één vast maandbedrag."
	},
	{
		question: "Waarom geen WordPress?",
		answer: "WordPress is een CMS voor mensen die zelf hun site beheren. De meeste ondernemers willen dat helemaal niet, ze willen dat het werkt. Zonder WordPress is de site sneller, veiliger, en heeft minder onderhoud nodig. Resultaat: beter scoren in Google en minder gedoe achteraf."
	},
	{
		question: "Werk je alleen in de regio Buren?",
		answer: "Nee, ik werk door heel Nederland. De meeste communicatie gaat via videobellen en e-mail. Voor klanten in de regio Rivierenland kan ik ook langskomen."
	},
	{
		question: "Wat heb je van mij nodig om te beginnen?",
		answer: "Vooral een goed gesprek. Ik wil begrijpen wat je bedrijf doet en wie je klanten zijn. Logo, foto's en een idee van welke pagina's je wilt zijn handig, maar niet verplicht om te starten."
	},
	{
		question: "Hoe zit het met e-mail en hosting?",
		answer: "Hosting, SSL, domeinbeheer en zakelijk e-mail op je eigen domein zitten allemaal in het pakket. Alles bij één aanspreekpunt, dus geen losse rekening voor server, SSL of e-mail."
	},
	{
		question: "Hoe neem ik contact op?",
		answer: "Bel 06-23571852, mail naar info@knapgemaakt.nl, of plan direct een kennismaking in via de website. Ik reageer binnen 24 uur."
	},
	{
		question: "Wat is de april-actie? Wie komt daarvoor in aanmerking?",
		answer: "Ik bouw tot eind april 2 websites gratis voor Nederlandse ondernemers, in ruil voor een case study en testimonial na 90 dagen. Voorkeur gaat uit naar hoveniers en lokale dienstverleners, maar als je bedrijf past kijken we samen. Plan een kennismaking om te zien of we matchen."
	},
	{
		question: "Wat gebeurt er na april?",
		answer: "Vanaf mei start ik met betaald werk: 497 euro eenmalig plus 47 euro per maand, 12 maanden minimum. Dezelfde pakketinhoud als in april, met een 90-dagen niet-goed-geld-terug garantie op de setup-fee."
	}
];

const breadcrumbs = [
	{ name: "Home", url: "https://knapgemaakt.nl/" },
	{ name: "Veelgestelde vragen", url: "https://knapgemaakt.nl/veelgestelde-vragen/" }
];
---

<Layout
	title="Veelgestelde vragen | Webdesign in Buren | KNAP GEMAAKT."
	description="Antwoorden op veelgestelde vragen over maatwerk websites, de april-actie (gratis bouw in ruil voor een case study) en wat er na april gebeurt. KNAP GEMAAKT. uit Buren."
>
```

Keep the rest of the file (FAQSchema + BreadcrumbSchema + page body) intact. Only the `faqs` array, `breadcrumbs`, and Layout title + description change.

- [ ] **Step 2: Build + verify**

Run: `npm run build` then `npm run dev`.
Navigate to `http://localhost:4321/veelgestelde-vragen/`. Confirm:
- 11 questions render in the accordion
- No Essentieel/Groei/Compleet references anywhere
- Answers for Q1 and Q4 reference "april-actie" and "het pakket" correctly
- Q10 and Q11 are the new Stage 0 questions

Check page source to confirm FAQPage JSON-LD schema is present and reflects all 11 Q&A pairs.

- [ ] **Step 3: Grep for em-dashes and dead references**

Run: `grep -n '—\|Essentieel\|Groei\|Compleet\|pakketten-pagina' src/pages/veelgestelde-vragen.astro`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add src/pages/veelgestelde-vragen.astro
git commit -m "feat(faq): rewrite for Stage 0 reality

Removed all Essentieel/Groei/Compleet references. Rewrote 9
answers to reflect the single-offer structure and april-actie.
Added 2 new questions: 'wat is de april-actie' and 'wat gebeurt
er na april'. Updated title + description. FAQPage schema picks
up all 11 Q&A pairs automatically."
```

---

## Task 10: Niche landing page CTA audit

**Files:**
- Modify: `src/pages/website-voor-hoveniers.astro`

- [ ] **Step 1: Read the file and identify CTAs**

Run: open `src/pages/website-voor-hoveniers.astro` and scan for `href="/offerte/"`, `Advies op maat`, `Plan een gesprek in`, any em-dashes, any links to `/pakketten/` or `/automatisering/` (grep returned no matches earlier, but confirm visually).

- [ ] **Step 2: Standardize CTAs**

For any CTA button or link found:
- Target `/offerte/` becomes `/aanvragen/`
- Text `Advies op maat` or `Plan een gesprek in` becomes `Plan een kennismaking`
- Any em-dashes in copy get replaced (comma, colon, period)

- [ ] **Step 3: Build + verify**

Run: `npm run dev`. Navigate to `http://localhost:4321/website-voor-hoveniers/`. Scroll the full page, confirm every CTA reads `Plan een kennismaking` and links to `/aanvragen/`.

- [ ] **Step 4: Grep check**

Run: `grep -n '—\|Advies op maat\|Plan een gesprek in\|/offerte/\|/pakketten/\|/automatisering/' src/pages/website-voor-hoveniers.astro`
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add src/pages/website-voor-hoveniers.astro
git commit -m "chore(hoveniers): standardize CTAs to 'Plan een kennismaking'"
```

---

## Task 11: Supporting pages audit

**Files:**
- Modify: `src/pages/404.astro`
- Modify: `src/pages/privacy.astro`
- Modify: `src/pages/algemene-voorwaarden.astro`
- Modify: `src/pages/klant/jonkers.astro`
- Modify: `src/pages/sitemap.astro`
- Modify: `src/pages/llms.txt.ts`
- Modify: `src/pages/offerte.astro`

For each file: read, remove/replace references to `/pakketten/` and `/automatisering/`, strip em-dashes, standardize any CTAs.

- [ ] **Step 1: `src/pages/404.astro`**

Read the file. For any "popular pages" section or suggested links, remove entries pointing to `/pakketten/` or `/automatisering/*`. Replace with `/webdesign/`, `/werk/`, `/blog/`. Standardize any CTA button text.

- [ ] **Step 2: `src/pages/privacy.astro`**

Read the file. For any inline reference to `/pakketten/` or `/automatisering/`, replace with `/webdesign/` or generic wording ("het aanbod"). No structural changes.

- [ ] **Step 3: `src/pages/algemene-voorwaarden.astro`**

Same approach as privacy. The word "pakketten" may appear in clauses about service tiers; rewrite to refer to "het aanbod" in singular.

- [ ] **Step 4: `src/pages/klant/jonkers.astro`**

Read the file, find the single `/automatisering/` reference (per earlier grep). Replace with `/webdesign/` or remove the link if context no longer makes sense.

- [ ] **Step 5: `src/pages/sitemap.astro`**

Read the file. Remove any hardcoded links to `/pakketten/`, `/automatisering/`, or `/automatisering/*`. Add a link to `/webdesign/` if not already present in the sitemap listing.

- [ ] **Step 6: `src/pages/llms.txt.ts`**

Read the file (this is a TypeScript file generating llms.txt for AI crawlers). Remove entries for `/pakketten/` and `/automatisering/*`. Confirm `/webdesign/` is listed with accurate description. This file is critical for AI crawlers (ChatGPT, Perplexity, etc.).

- [ ] **Step 7: `src/pages/offerte.astro`**

Read the file. The page stays live but no longer drives primary traffic. Remove any inline links to `/pakketten/` or `/automatisering/`. Strip em-dashes. Do not rewrite the quiz itself.

- [ ] **Step 8: Build + verify all affected pages**

Run: `npm run build`
Expected: clean build.

Run: `npm run dev`. For each page modified, navigate to it and visually confirm:
- No broken links
- No references to dead pages
- Formatting intact

- [ ] **Step 9: Grep check**

Run: `grep -rn '—' src/pages/404.astro src/pages/privacy.astro src/pages/algemene-voorwaarden.astro src/pages/klant/jonkers.astro src/pages/sitemap.astro src/pages/llms.txt.ts src/pages/offerte.astro`
Expected: no output.

- [ ] **Step 10: Commit**

```bash
git add src/pages/404.astro src/pages/privacy.astro src/pages/algemene-voorwaarden.astro src/pages/klant/jonkers.astro src/pages/sitemap.astro src/pages/llms.txt.ts src/pages/offerte.astro
git commit -m "chore: purge /pakketten/ and /automatisering/ references from supporting pages

404, privacy, algemene voorwaarden, klant/jonkers, sitemap, llms.txt,
and /offerte/ cleaned of inline links to the consolidated pages.
llms.txt updated so AI crawlers know /webdesign/ is the canonical
offer page. /offerte/ stays live but no longer in the primary flow."
```

---

## Task 12: Inline link sweep across remaining files

**Files:**
- Modify: `src/content/blog/*.md` (any file still referencing `/pakketten/` or `/automatisering/`)
- Modify: any other component or page file with inline references

- [ ] **Step 1: Run comprehensive grep for pakketten references**

Run: `grep -rn '/pakketten/' src/`
Expected: a list of remaining references.

Known hits from earlier audit:
- `src/content/blog/website-laten-maken-kosten.md:59` and `:113`

For each hit:
- If it's a blog post content reference (e.g., "zie de pakketten-pagina"), replace the link `/pakketten/` with `/webdesign/` and update surrounding text so it still reads naturally (e.g., "zie het aanbod" or "bekijk het pakket"). Do NOT rewrite the broader blog content; surgical link substitution only.
- If it's in another page, use the same approach.

- [ ] **Step 2: Run comprehensive grep for automatisering references**

Run: `grep -rn '/automatisering/' src/`
Expected: a list of remaining references.

Known hits from earlier audit:
- `src/content/blog/website-laten-maken-kosten.md:150`

For each hit: same approach. Replace link target with `/webdesign/` and adjust surrounding text.

- [ ] **Step 3: Verify zero references remain**

Run: `grep -rn '/pakketten/\|/automatisering/' src/`
Expected: no output.

- [ ] **Step 4: Build + verify**

Run: `npm run build`
Expected: clean build.

Run: `npm run dev` and spot-check 2-3 blog posts that were modified. Confirm the edited sentences still read naturally and the links work.

- [ ] **Step 5: Commit**

```bash
git add src/content/blog/
git commit -m "chore: inline link sweep, redirect /pakketten/ and /automatisering/ references

Blog posts that referenced the consolidated pages now link directly
to /webdesign/. Surrounding text minimally adjusted so the
sentences still read naturally. Content itself unchanged (no rewrites)."
```

---

## Task 13: Delete legacy source files

**Files:**
- Delete: `src/pages/pakketten.astro`
- Delete: `src/pages/automatisering.astro`
- Delete: `src/pages/automatisering/ai-content.astro`
- Delete: `src/pages/automatisering/factuurherinneringen.astro`
- Delete: `src/pages/automatisering/lead-opvolging.astro`
- Delete: `src/pages/automatisering/weekoverzichten.astro`
- Delete: `src/pages/automatisering/whatsapp-opvolging.astro`
- Delete: `src/pages/automatisering/` (empty directory)

- [ ] **Step 1: Delete the files via git**

```bash
git rm src/pages/pakketten.astro
git rm src/pages/automatisering.astro
git rm src/pages/automatisering/ai-content.astro
git rm src/pages/automatisering/factuurherinneringen.astro
git rm src/pages/automatisering/lead-opvolging.astro
git rm src/pages/automatisering/weekoverzichten.astro
git rm src/pages/automatisering/whatsapp-opvolging.astro
```

- [ ] **Step 2: Remove the now-empty directory**

```bash
rmdir src/pages/automatisering
```

(On Windows this happens automatically when the directory has no files.)

- [ ] **Step 3: Verify build still passes**

Run: `npm run build`
Expected: clean build. No "page not found" errors (the redirects handle incoming requests).

- [ ] **Step 4: Run dev server and spot-check redirects**

Run: `npm run dev`. Test these URLs (each should return a redirect response or land on /webdesign/):
- `http://localhost:4321/pakketten/`
- `http://localhost:4321/automatisering/`
- `http://localhost:4321/automatisering/lead-opvolging/`

Note: Cloudflare `_redirects` does not run in `astro dev`. In local dev, these will 404. After deploy to Cloudflare, test with `curl -I https://knapgemaakt-preview.pages.dev/pakketten/` (or production URL) and expect `HTTP/2 301` with `location: /webdesign/`.

- [ ] **Step 5: Commit**

```bash
git commit -m "chore: delete /pakketten/ and /automatisering/* source files

7 source files removed. Incoming traffic handled by 301 redirects
in public/_redirects (set up in earlier commit). The automatisering
directory is also removed since it's now empty."
```

---

## Task 14: Build + full smoke test

**Files:** (none, this is a verification task)

- [ ] **Step 1: Clean build**

Run: `npm run build`
Expected:
- Zero errors
- Zero warnings related to missing pages, missing imports, or broken links
- Build output shows deleted pages are no longer in the route manifest

- [ ] **Step 2: Start production preview**

Run: `npm run preview`
Expected: preview server starts on `http://localhost:4321/`.

- [ ] **Step 3: Walk the critical user journeys**

Manually test:

1. **Homepage**: Load `/`. Confirm rotating words animate, hero CTA links to `/aanvragen/`, Stage 0 callout visible, service cards updated, bottom CTA standardized.

2. **Webdesign page**: Load `/webdesign/`. Confirm all 9 sections render top-to-bottom, secondary hero link scrolls to `#wat-zit-erin`, FAQ accordion works, slot CTA reads "2 plekken in april".

3. **Aanvragen form**: Load `/aanvragen/`. Fill in dummy data, pick a time slot, submit. Confirm POST to `/api/submissions` succeeds and `specification` in payload matches dropdown value.

4. **Contact form**: Load `/contact/`. Submit a dummy contact message. Confirm POST to `/api/submissions` succeeds.

5. **FAQ page**: Load `/veelgestelde-vragen/`. Confirm 11 questions, no Essentieel/Groei/Compleet text, FAQPage schema present in page source.

6. **Nav + footer on any page**: Confirm nav has Webdesign | Werk | Over | Kennismaken. Confirm footer legal strip has 5 items (Contact, FAQ, Voorwaarden, Privacy, Sitemap).

7. **Stage 1 smoke test**: Temporarily edit `src/config/stage-0-offer.ts` and set `enabled: false`. Reload homepage and `/webdesign/`. Confirm:
   - Homepage Stage 0 callout disappears
   - Homepage right service card swaps to "Wat kost het / Een vast maandbedrag"
   - /webdesign/ hero callout disappears
   - /webdesign/ slot CTA headline swaps to "Klaar voor een website die wel werkt?"
   Revert the flag back to `true`.

- [ ] **Step 4: Final repo-wide grep check**

Run the following, all expected to produce no output:

```bash
grep -rn '—' src/ public/_redirects
grep -rn '/pakketten/' src/
grep -rn '/automatisering/' src/
grep -rn 'Essentieel\|Groei\|Compleet' src/pages/ src/components/
grep -rn 'Advies op maat' src/
grep -rn 'Plan een gesprek in' src/
```

Exception: the strings `Groei` may match generic Dutch usage (e.g., a blog post saying "groeien"). Review output and confirm it's not the dead package name.

- [ ] **Step 5: No commit yet. Proceed to Task 15 for final review**

---

## Task 15: Final acceptance review

**Files:** (none, this is the acceptance gate)

Review against the spec's §16 acceptance criteria. Check each box before declaring complete.

- [ ] **Step 1: Acceptance checklist**

- [ ] All 7 new redirects resolve with HTTP 301 to `/webdesign/` (test after Cloudflare deploy)
- [ ] `/webdesign/` renders the new 9-section structure with all approved copy
- [ ] Homepage primary CTA text is `Plan een kennismaking`, target is `/aanvragen/`
- [ ] Homepage shows Stage 0 callout below CTA row
- [ ] Homepage right service card reads "Nu in april" with correct spots count from config
- [ ] Nav CTA reads `Kennismaken`, target `/aanvragen/`
- [ ] Nav standalone links are `Webdesign | Werk` only
- [ ] Footer legal strip has no Pakketten or Automatisering entries
- [ ] Aanvragen dropdown has exactly 3 options (plus default); no `quiz_context` hidden input
- [ ] Contact dropdown has 4 options; sidebar CTA reads `Plan een kennismaking`
- [ ] FAQ page has 11 questions; no Essentieel/Groei/Compleet references in any answer
- [ ] `/website-voor-hoveniers/` CTAs standardized
- [ ] `grep -r '/pakketten/' src/` returns zero hits
- [ ] `grep -r '/automatisering/' src/` returns zero hits
- [ ] Build passes without warnings
- [ ] All copy passes a read-aloud test
- [ ] Zero em-dashes in the repo (per `grep -rn '—' src/ public/_redirects`)
- [ ] Flipping `stage0Offer.enabled` to `false` hides the callout + right service card swap happens
- [ ] No broken links across the site (spot-check nav + footer from 3 random pages)

- [ ] **Step 2: Prepare the pull request**

Create a feature branch if not already on one, push, and open a PR with the following description:

```markdown
## Summary
- Consolidates Stage 0 offer at `/webdesign/` (replaces 7 legacy pages via 301s)
- Adds `src/config/stage-0-offer.ts` as single source of truth for the april-actie
- Rewrites FAQ, updates forms, standardizes site-wide CTAs to `Plan een kennismaking`
- Flipping `stage0Offer.enabled = false` prepares for Stage 1 transition

## Test plan
- [x] Build passes
- [x] Homepage + /webdesign/ + /aanvragen/ + /contact/ + /veelgestelde-vragen/ render correctly
- [x] Stage 0 callout shows when enabled, hides when disabled
- [x] Form submissions post correctly to /api/submissions
- [x] Zero em-dashes, zero /pakketten/ or /automatisering/ inline references
- [ ] After deploy: curl -I on each redirect URL returns 301 → /webdesign/
- [ ] After deploy: AI crawler smoke test (fetch llms.txt and confirm no dead URLs)

🤖 Generated with Claude Code
```

- [ ] **Step 3: Deploy and post-deploy verify**

After merging to master and Cloudflare deploys, run:

```bash
curl -I https://knapgemaakt.nl/pakketten/
curl -I https://knapgemaakt.nl/automatisering/
curl -I https://knapgemaakt.nl/automatisering/lead-opvolging/
curl -I https://knapgemaakt.nl/automatisering/whatsapp-opvolging/
curl -I https://knapgemaakt.nl/automatisering/factuurherinneringen/
curl -I https://knapgemaakt.nl/automatisering/ai-content/
curl -I https://knapgemaakt.nl/automatisering/weekoverzichten/
```

Expected for each: `HTTP/2 301` and `location: /webdesign/`.

Also verify:

```bash
curl -s https://knapgemaakt.nl/llms.txt | grep -E 'pakketten|automatisering'
```

Expected: no output.

Also verify:

```bash
curl -I https://knapgemaakt.nl/webdesign/
```

Expected: `HTTP/2 200`.

- [ ] **Step 4: Submit to Google Search Console**

In GSC, navigate to URL Inspection and request indexing for:
- `https://knapgemaakt.nl/webdesign/` (major rewrite)
- `https://knapgemaakt.nl/veelgestelde-vragen/` (major rewrite)

Google will pick up the 301s on the next crawl automatically.

---

## Self-review notes

After the initial plan draft, verified:

**Spec coverage:** Every numbered section in the spec maps to at least one task. Spec §5 → Task 3 (all 10 sub-steps map to spec §5.1-5.10). Spec §6 → Task 4. Spec §7 → Tasks 5 and 6. Spec §8 → Task 7. Spec §9 → Task 8. Spec §10 → Task 9. Spec §11 → Tasks 10, 11. Spec §12 → Task 12. Spec §13 (voice rules) → referenced in every task's grep check. Spec §15 (migration order) → this plan follows it. Spec §16 (acceptance) → Task 15. Spec §17 (rollback) → referenced in PR description.

**Placeholder scan:** No "TBD", "TODO", or "similar to Task N" references in the plan. Copy blocks are either inline or quoted from the spec file (which exists in the repo).

**Type consistency:** `stage0Offer`, `spotsLabel`, `bedrijvenLabel`, `monthUpper` are defined in Task 1 and consumed in Tasks 3, 4 with consistent names and signatures.

**Known gap handled:** Pluralization (`1 plek` vs `N plekken`, `1 bedrijf` vs `N bedrijven`) handled via helper functions in the config module, per the spec self-review flag.
