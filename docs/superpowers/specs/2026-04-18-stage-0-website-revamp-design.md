# Stage 0 Website Revamp Design Spec

**Date:** 2026-04-18
**Status:** Approved, pending implementation plan
**Scope:** knapgemaakt.nl website restructure to reflect Stage 0 business reality
**Reference:** `C:\Users\yanni\Hub\business\knapgemaakt-scaling-plan.md`

## 1. Problem

The current site has two overlapping decision trees (pick a pakket, pick an automation), a primary CTA funneling to a quiz (`/offerte/`) that belongs in a later stage, and a hub of automatisering sub-pages that muddy the offer. Stage 0 reality: one offer, free in exchange for a case study, with a target of 2 new free clients in april. The site should reflect that, preserve the SEO equity that's actually earning traffic (blogs + location pages + homepage via GBP), and transition cleanly to Stage 1 pricing when graduation triggers fire.

## 2. Decisions locked

| # | Decision | Chosen |
|---|---|---|
| 1 | Where does the consolidated offer page live? | Repurpose `/webdesign/` (preserves Bing/AI ranking URL) |
| 2 | Hero posture on `/webdesign/` | Evergreen H1 + Stage 0 urgency callout |
| 3 | Section order on `/webdesign/` | Classic offer page (hero → wat zit erin → wat vraag ik terug → waarom geen template → hoe het werkt → voor wie → werk → FAQ → slot-CTA) |
| 4 | Homepage service-cards section | Keep 7/5 asymmetric grid; left card reframed as "Wat je krijgt", right card as "Nu in april" |
| 5 | Redirects strategy | 301 all deleted pages to `/webdesign/`; `/offerte/` stays live but demoted from primary CTA |
| 6 | Aanvragen dropdown | 3-option Purpose-first: april-actie / nieuwe website / iets anders |
| 7 | Contact form dropdown | 4 options: Nieuwe website / Vraag over de april-actie / Prijzen en tarieven / Iets anders |
| 8 | FAQ page (`/veelgestelde-vragen/`) | Rewrite all 9 answers, add 2 Stage 0 specific = 11 Qs total |
| 9 | Nav CTA copy | Compact `Kennismaken` in nav; full `Plan een kennismaking` in-page |

## 3. Non-negotiable rules

- **No em-dashes anywhere** (copy or commentary). Use commas, colons, periods, parentheses.
- **No hyphens: auto** (produces ugly Dutch breaks). Use `overflow-wrap: break-word`.
- **Trailing slashes on all internal links** (Astro config has `trailingSlash: "always"`).
- **Plain Dutch, `je`/`jij`, readable by a 10-year-old.** No marketing jargon, no vague claims.
- **No stock photos, no fabricated social proof.**
- **Design fidelity:** do not symmetrize the 7/5 grid, do not add `max-w-*` / `mx-auto` wrappers not in the original, do not normalize spacing across sections.
- **Existing SEO-earning pages untouched in this PR:** all blog posts (their inline `/pakketten/` and `/automatisering/` links get swept but content is not rewritten), all `/webdesign-[city]/` location pages, `/veelgestelde-vragen/` FAQ page (we do rewrite this since its content explicitly names dead pakketten).
- **Copy voice:** must score 12+ of 20 quality signals per `Hub/business/sops/copywriting/core/quality-signals.md` and avoid all 18 red flags in `anti-ai-detection.md`.

## 4. Architecture

### 4.1 URL map

| URL | Current | After |
|---|---|---|
| `/webdesign/` | Service page (WordPress-critique heavy) | Consolidated Stage 0 offer page |
| `/pakketten/` | Live, 3 tiers | 301 → `/webdesign/` |
| `/automatisering/` | Live, hub | 301 → `/webdesign/` |
| `/automatisering/lead-opvolging/` | Live | 301 → `/webdesign/` |
| `/automatisering/whatsapp-opvolging/` | Live | 301 → `/webdesign/` |
| `/automatisering/factuurherinneringen/` | Live | 301 → `/webdesign/` |
| `/automatisering/ai-content/` | Live | 301 → `/webdesign/` |
| `/automatisering/weekoverzichten/` | Live | 301 → `/webdesign/` |
| `/offerte/` | Live, primary CTA target | Live, not in primary flow |
| `/` | Primary CTA to `/offerte/` | Primary CTA to `/aanvragen/` |
| `/aanvragen/` | Live, 4-option dropdown | Live, 3-option dropdown, no quiz_context |
| `/contact/` | Live, 4-option dropdown | Live, updated 4-option dropdown |
| `/veelgestelde-vragen/` | 9 Qs, names dead pakketten | 11 Qs, Stage 0 aligned |
| `/website-voor-hoveniers/` | Live, niche landing | Live, CTAs standardized |
| `/werk/`, `/over/`, `/blog/`, `/blog/*`, `/webdesign-[city]/`, `/klant/jonkers/` | Live | Live (audit only for CTA consistency + dead link sweep) |

### 4.2 Source files to delete

```
src/pages/pakketten.astro
src/pages/automatisering.astro
src/pages/automatisering/ai-content.astro
src/pages/automatisering/factuurherinneringen.astro
src/pages/automatisering/lead-opvolging.astro
src/pages/automatisering/weekoverzichten.astro
src/pages/automatisering/whatsapp-opvolging.astro
src/pages/automatisering/   (directory, after files above)
```

### 4.3 New source files

```
src/config/stage-0-offer.ts                                (spots config module)
public/_redirects                                          (new or appended)
docs/superpowers/specs/2026-04-18-stage-0-website-revamp-design.md  (this file)
```

### 4.4 Stage-0 offer config module

`src/config/stage-0-offer.ts`:

```typescript
export const stage0Offer = {
  enabled: true,
  month: "april",
  year: 2026,
  spotsRemaining: 2,
  ctaUrl: "/aanvragen/",
  detailsUrl: "/webdesign/",
} as const;
```

Imported by:

- `src/pages/index.astro` (hero callout + right service-card content)
- `src/pages/webdesign.astro` (hero callout + slot CTA context)

When `enabled: false`: callout components return `null`. Stage 1 transition is one boolean flip plus a hero-copy swap on `/webdesign/` (swap "wat vraag ik terug" for "wat kost het").

### 4.5 Redirects

`public/_redirects` (Netlify-style syntax honored by `@astrojs/cloudflare`):

```
# Stage 0 website restructure, april 2026
/pakketten/                            /webdesign/  301
/automatisering/                       /webdesign/  301
/automatisering/lead-opvolging/        /webdesign/  301
/automatisering/whatsapp-opvolging/    /webdesign/  301
/automatisering/factuurherinneringen/  /webdesign/  301
/automatisering/ai-content/            /webdesign/  301
/automatisering/weekoverzichten/       /webdesign/  301
```

All inline references inside the repo must still be replaced with direct `/webdesign/` links; redirects are a safety net, not the primary path.

## 5. `/webdesign/` page design

### 5.1 Page skeleton

1. **Hero** (breadcrumb + H1 + answer-capsule + Stage 0 callout + CTAs + microcopy)
2. **Wat zit erin** (8 components, 2×4 grid with icon + one-liner)
3. **Wat vraag ik terug** (3-item transparency block: nulmeting / case study / testimonial + referral)
4. **Waarom geen template?** (keep existing WordPress-critique content, light edits for voice)
5. **Hoe het werkt** (5-step proces: kennismaking → nulmeting → bouw → livegang → dag-90 meting)
6. **Voor wie** (two-column: *voor* hoveniers + dienstverleners / *niet voor* webshops, CMS-gebruikers, €100-klussers)
7. **Werk** (reuse existing `DraggableScroll` + `getAllProjects()` component, same as homepage)
8. **FAQ** (existing `FAQSection` component, 6-8 Stage 0 specific questions)
9. **Slot CTA** (dark section matching existing bottom-CTA style)

### 5.2 Hero (approved copy)

**Breadcrumb:** Home › Webdesign

**H1:** `Webdesign op maat, in Buren`

**Answer capsule** (40-60 words, immediately under H1, no special styling beyond `text-lg`):

> Ik bouw websites vanaf de grond op, zonder WordPress en zonder template. Sneller dan wat je gewend bent, goed vindbaar in Google, en beheerd in één vast maandbedrag. Voor ondernemers met één bedrijf, 0 tot 5 medewerkers en geen zin om zelf een CMS te leren.

**Stage 0 callout** (accent-bordered card, reads from `stage0Offer` config):

> **Nu in april: 2 plekken gratis**
>
> Ik bouw op dit moment gratis voor 2 Nederlandse bedrijven. Jij krijgt het volledige pakket, ik krijg een case study over 90 dagen en een korte testimonial als je tevreden bent. Voorkeur voor hoveniers en lokale dienstverleners, maar als je bedrijf past kijken we samen.
>
> `Past dit bij jou? →` → `/aanvragen/`

When `stage0Offer.enabled === false`: render `null` (callout disappears; rest of hero unchanged).

**Primary CTA button:** `Plan een kennismaking` → `/aanvragen/`

**Secondary link:** `Zie wat erin zit ↓` → `#wat-zit-erin` anchor

**Microcopy under CTAs:** *Meestal antwoord binnen een werkdag. Geen verkooppraatje vooraf.*

### 5.3 Wat zit erin (approved copy)

Intro paragraph:

> Het pakket heeft acht onderdelen. Eén website, maar ook alles eromheen dat een site pas echt nuttig maakt: vindbaarheid, klantcontact, meting, onderhoud. Op maat waar dat waarde toevoegt, standaard waar dat prima is.

Grid items (2×4 on desktop, stacked on mobile):

| # | Title | Body |
|---|---|---|
| 1 | Maatwerk website | Gebouwd met Astro op Cloudflare. Laadt onder de seconde, werkt even goed op een oude telefoon als op een nieuwe laptop. Geen WordPress, geen plugins, geen beheersysteem. |
| 2 | Google Bedrijfsprofiel | Opgezet, categorieën goed ingevuld, foto's, Q&A, posts. Voor lokale zoekopdrachten is dit meestal belangrijker dan je website zelf. |
| 3 | Lead-opvolging naar je telefoon | Elke aanvraag komt als WhatsApp of SMS op je toestel. Binnen 5 minuten terugbellen converteert tot 10× beter dan een dag later. Dus maak ik dat 5-minuten-venster zo makkelijk mogelijk voor je. |
| 4 | Reviews-motor | Na een afgeronde klus gaat er automatisch een vriendelijk review-verzoek uit. Op Google, niet op een of ander platform waar niemand kijkt. |
| 5 | Lokale SEO-basis | Schema-markup, citations in 20 Nederlandse directories, Google Search Console ingericht, basis-indexering. Niets geks, gewoon goed geregeld vanaf dag één. |
| 6 | Hosting, domein, SSL, zakelijk e-mail | Allemaal in het pakket. Geen losse facturen van 4 verschillende partijen. |
| 7 | Kleine aanpassingen binnen 48 werkuur | Adres veranderd, prijzen bijgewerkt, foto verruild. Mail me, meestal staat het dezelfde werkdag erop. |
| 8 | Maandelijks 1-pager prestatierapport | Bezoekers, aanvragen, Google-plek voor je belangrijkste zoekwoorden. Op één A4. Zodat je ziet waar je geld heen gaat. |

Icons: Hugeicons via MCP, accent-color backgrounds consistent with existing card iconography.

### 5.4 Wat vraag ik terug (approved copy)

> **Wat ik ervoor terug vraag**
>
> Gratis heeft voorwaarden. Geen kleine lettertjes, wel drie dingen.
>
> **Eén: een nulmeting vooraf.** Voor we beginnen zetten we op één A4 waar je nu staat. Bezoekers per maand, Google-plek voor je belangrijkste zoekwoord, aantal reviews, aanvragen per week. Ruwe schattingen zijn prima. Boekhouding hoef ik niet te zien. De publieke data zoek ik zelf op.
>
> **Twee: een meting na 90 dagen.** We vullen dezelfde A4 opnieuw in. Het verschil schrijf ik op als case study. Jouw naam eronder of niet, jij bepaalt.
>
> **Drie: als je tevreden bent, een korte review.** In tekst of op video, wat jij makkelijker vindt. En als je iemand kent die hier ook wat aan zou hebben: een introductie. Geen verplichting.

### 5.5 Waarom geen template (reuse + light edit)

Keep the existing `/webdesign/` section content (WordPress critique). Light edit pass during implementation to strip any em-dashes, tighten sentence rhythm, apply voice rules. No structural change.

### 5.6 Hoe het werkt (approved copy)

> **Hoe het loopt**
>
> Van eerste contact tot dag-90-meting duurt gemiddeld 12 weken. De bouw zelf ongeveer twee weken.
>
> **1. Kennismaking (30 min, video)**
> Jij vertelt wat je doet en wat knelt. Ik vertel wat ik zou bouwen. Past het niet, dan zeggen we dat. Geen offerte, geen follow-up mail, geen gedoe.
>
> **2. Nulmeting (30 min, video of schriftelijk)**
> Publieke data heb ik al verzameld. Ik leg ze je voor, we vullen samen de rest in. Eén A4.
>
> **3. Ontwerp en bouw (1 tot 2 weken)**
> Geen fase-plannen of PDF-presentaties. Halverwege stuur ik je een link naar een preview-url, dan zie je waar ik sta.
>
> **4. Livegang**
> We zetten de site live, Google-profiel gaat mee, lead-opvolging wordt getest. Ik stuur je binnen een dag een proefbericht via WhatsApp om te checken of het aankomt.
>
> **5. Meting na 90 dagen**
> Halfuurtje video. Zelfde A4 opnieuw, we kijken wat is verschoven. Hier komt je case study uit en eventueel je testimonial.

### 5.7 Voor wie (approved copy)

Two-column layout on desktop, stacked on mobile.

**Kolom links: Voor wie is dit**

> Ondernemers met één bedrijf, 0 tot 5 medewerkers, en een dienst die lokaal geleverd wordt. Hoveniers en dienstverleners zoals schoonmaakbedrijven, schilders, elektriciens, installateurs, kappers, coaches. Je bent vakman of vakvrouw eerst, marketeer later.

**Kolom rechts: Voor wie dit niet is**

> Webshops met meer dan 10 producten, want dat is een ander vak en andere tools. Mensen die zelf in een CMS willen werken, want mijn aanpak heeft geen CMS en dat is ook precies waarom het sneller en veiliger is. Snelle klussen van "zet dit even op een pagina voor €100", want dat ben ik niet en doe ik ook niet.

### 5.8 Werk (reuse component)

```astro
import { DraggableScroll } from "../components/DraggableScroll";
import { getAllProjects } from "../data/projects";
```

Same component as homepage. Include the 2 Live projects + 2 demo cards (hovenier, elektricien). Short eyebrow `WERK` + H2 `Recente projecten`. No new code.

### 5.9 FAQ (approved draft, 7 items)

> **Veelgestelde vragen**
>
> **Waarom is dit nu gratis?**
> Ik ben bezig met een Grand Slam Offer opbouwen en heb concrete case studies nodig om mijn waarde te kunnen aantonen. Gratis werk in ruil voor een case study is sneller dan tegen een slecht argument verkopen. In april nog 2 plekken, daarna start ik met betaald tegen €497 setup + €47 per maand.
>
> **Wat gebeurt er na 90 dagen?**
> Nulmeting opnieuw, case study afgerond, testimonial als je dat wilt. Daarna kun je blijven of niet. Geen contract bindt je aan mij.
>
> **Wat als ik niet tevreden ben?**
> Dan gaat de site eraf, je krijgt niks gevraagd, we gaan allebei door. Ik verkies eerlijkheid boven een betaalde klant die intern klaagt.
>
> **Krijg ik de broncode?**
> Ja. De site staat op Cloudflare onder jouw account, de code in een Git-repo die van jou is. Als je na 90 dagen met iemand anders verder wilt, kan dat zonder gedoe.
>
> **Waarom geen WordPress?**
> WordPress is een CMS voor mensen die zelf hun site beheren. De meeste ondernemers willen dat helemaal niet, ze willen dat het werkt. Zonder WordPress is de site sneller, veiliger, en heeft minder onderhoud nodig. Voor- en nadelen staan [hier uitgelegd](/blog/wordpress-vs-moderne-alternatieven/).
>
> **Hoe lang duurt het voor Google me vindt?**
> Voor je bedrijfsnaam meestal 1 tot 2 weken. Voor "hovenier [stad]"-achtige zoekopdrachten 2 tot 6 maanden. Sneller als je al een Google Bedrijfsprofiel hebt met reviews, langzamer als je vanaf nul begint.
>
> **Kan ik zelf teksten aanleveren?**
> Liever wel, want jij weet het best wat je doet. Schrijven is niet jouw vak, dus ik werk je tekst na. Foto's van jouzelf en je werk zijn belangrijker dan perfect gepolijste copy.

Add FAQPage JSON-LD schema (re-use `FAQSchema.astro` component pattern from `/veelgestelde-vragen/`).

### 5.10 Slot CTA (approved copy)

Dark section (`bg-ink text-canvas`) matching existing bottom-CTA pattern:

> **2 plekken in april. Past jouw bedrijf?**
>
> 30 minuten videocall. Jij vertelt wat je doet, ik vertel wat ik zou bouwen en waarom. Past het niet bij mij? Dan zeg ik dat ook. Scheelt ons allebei tijd.
>
> `[Plan een kennismaking]` → `/aanvragen/`

When `stage0Offer.enabled === false`: H2 changes to evergreen variant (e.g., "Klaar om te bouwen?"), rest stays. Handled in component props.

### 5.11 Meta + SEO

- **Title:** `Webdesign op maat in Buren | KNAP GEMAAKT.` (≤55 chars)
- **Description:** `Maatwerk websites voor ondernemers. Snel, goed vindbaar in Google, en alles in één vast maandbedrag. In april nog 2 plekken gratis in ruil voor een case study.` (≤160 chars)
- **Schema stack:** keep existing `ServiceSchema` + `BreadcrumbSchema` + add `FAQPage` schema for the new FAQ block
- **Primary keyword:** "webdesign" naturally in H1, answer capsule, first H2 section

## 6. Homepage changes (`src/pages/index.astro`)

### 6.1 Hero patch

**Keep as-is:** H1 with `TypingRotator`, rotating words list, existing subhead, secondary CTA "Bekijk werk" → `/werk/`.

**Change:**

- Primary CTA text: `Advies op maat in 2 min` → `Plan een kennismaking`
- Primary CTA target: `/offerte/` → `/aanvragen/`
- Add Stage 0 callout below CTA row, importing from `stage0Offer` config

**Callout markup pattern:**

```astro
{stage0Offer.enabled && (
  <div class="mt-8 flex items-start gap-3 max-w-xl">
    <span class="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
    <p class="text-sm text-ink/70">
      <strong class="text-ink">Nu in {stage0Offer.month}: {stage0Offer.spotsRemaining} plekken gratis.</strong>
      {' '}Ik bouw voor 2 Nederlandse bedrijven een volledige site, in ruil voor een case study.
      {' '}<a href={stage0Offer.detailsUrl} class="underline">Bekijk wat erin zit →</a>
    </p>
  </div>
)}
```

### 6.2 Service cards section (the "Stap 1 | Stap 2" block)

Preserve 7/5 asymmetric grid. Drop "Stap 1 / Stap 2" framing.

**Left card (7-col), "Het aanbod":**

- Eyebrow: `HET AANBOD` (replaces `STAP 1`)
- Title: **Wat je krijgt**
- Body:
  > Alles in één aanpak. Geen losse rekeningen voor hosting en onderhoud, geen beheersysteem waar je cursussen voor nodig hebt.
- Mini-list (5 items):
  - Maatwerk site op Astro en Cloudflare
  - Google Bedrijfsprofiel ingericht en onderhouden
  - Lead-opvolging via WhatsApp op je telefoon
  - Reviews-motor die automatisch vraagt na een klus
  - Hosting, domein, SSL en zakelijk e-mail
- Link CTA: `Bekijk het hele aanbod →` → `/webdesign/`
- Icon: existing monitor icon (same as current Stap 1)

**Right card (5-col), "Nu in april":**

- Eyebrow: `NU IN {stage0Offer.month.toUpperCase()}` (e.g., `NU IN APRIL`)
- Title: **Gratis bouw voor {stage0Offer.spotsRemaining} bedrijven** (e.g., "Gratis bouw voor 2 bedrijven")
- Body:
  > Ik zoek 2 Nederlandse bedrijven waarvoor ik kosteloos bouw, in ruil voor een case study na 90 dagen. Voorkeur voor hoveniers en lokale dienstverleners, maar als je bedrijf past kijken we samen.
- Link CTA: `Past dit bij jou? →` → `/aanvragen/`
- Icon: swap pyramid for calendar-with-dot or flag Hugeicon; keep `bg-accent` background consistent with current right-card styling

When `stage0Offer.enabled === false`: right card swaps to a Stage 1 variant (e.g., title "€497 setup + €47 per maand", body summarizing paid offer terms). Exact Stage 1 copy out of scope for this spec; right card component should accept props so the swap is a content change, not a structural rewrite.

### 6.3 Bottom CTA section (dark block)

- H2: keep `Klaar voor een website die wél werkt?`
- Subtext: **change** from `Plan een kennismaking in. Vertel wat je bedrijf doet, ik kom met een concreet voorstel en een vaste prijs.` to:
  > Plan een kennismaking. Vertel wat je bedrijf doet, ik kom met een concreet voorstel. Past het niet, dan zeg ik dat ook.
- Button text: `Plan een gesprek in` → `Plan een kennismaking`
- Button target: keep `/aanvragen/`

## 7. Nav + Footer

### 7.1 Header (`src/components/Header.astro`)

**`standaloneLinks` array:**

```js
const standaloneLinks = [
    { href: "/webdesign/", label: "Webdesign" },
    { href: "/werk/", label: "Werk" },
];
```

**CTA button (desktop, line 105-110; mobile, line 193-199):**

- Text: `Advies op maat` → `Kennismaken`
- `href`: `/offerte/` → `/aanvragen/`

### 7.2 Footer (`src/components/Footer.astro`)

**Legal strip (line 121-127):** drop Pakketten and Automatisering. Final strip:

```html
<a href="/contact/">Contact</a>
<a href="/veelgestelde-vragen/">FAQ</a>
<a href="/algemene-voorwaarden/">Voorwaarden</a>
<a href="/privacy/">Privacy</a>
<a href="/sitemap/">Sitemap</a>
```

**Default CTA props (line 11-14):** `ctaHeadline` can stay, but the button label inside the CTA block needs to reference `Plan een kennismaking`. Check the CTA button rendering and update to match.

## 8. Aanvragen form (`src/pages/aanvragen.astro`)

### 8.1 Dropdown rewrite (line 218-224)

```html
<option value="" disabled selected>Maak een keuze...</option>
<option value="April-actie">Ik wil meedoen aan de april-actie (gratis plek)</option>
<option value="Nieuwe website">Ik wil een nieuwe website</option>
<option value="Iets anders">Iets anders</option>
```

### 8.2 URL-param `optionMap` rewrite (line 506-520)

```js
const optionMap: Record<string, string> = {
  "april":     "April-actie",
  "gratis":    "April-actie",
  "webdesign": "Nieuwe website",
  "nieuwe-website": "Nieuwe website",
  "anders":    "Iets anders",
};
```

All legacy slugs (`pakket-*`, `lead-opvolging`, `ai-content`, `factuurherinneringen`, `whatsapp-opvolging`, `weekoverzichten`) removed.

### 8.3 Remove `quiz_context` hidden input

Remove line 34:

```html
<input type="hidden" name="quiz_context" id="quiz-context-input" />
```

And any JS that references `quiz-context-input`. The `/offerte/` quiz page no longer participates in the primary funnel and doesn't need to inject quiz context into the aanvragen form.

### 8.4 Header copy, light refresh

H1 `Laten we kennismaken` is fine. Lead paragraph `Vul het formulier in en plan direct een vrijblijvend gesprek.` is fine. No changes here beyond the dropdown + quiz_context removal.

## 9. Contact form (`src/pages/contact.astro`)

### 9.1 Dropdown rewrite (line 121-125)

```html
<option value="" disabled selected>Maak een keuze...</option>
<option value="Nieuwe website">Nieuwe website</option>
<option value="April-actie">Vraag over de april-actie</option>
<option value="Prijzen">Prijzen en tarieven</option>
<option value="Iets anders">Iets anders</option>
```

### 9.2 Sidebar CTA copy (line 214)

- Button text: `Plan een gesprek in` → `Plan een kennismaking`
- Target: keep `/aanvragen/`

## 10. FAQ page rewrite (`src/pages/veelgestelde-vragen.astro`)

### 10.1 Meta

- Title: `Webdesign & Hosting | KNAP GEMAAKT.` → `Veelgestelde vragen | Webdesign in Buren | KNAP GEMAAKT.`
- Description: drop "pakketten en automatisering" reference; add Stage 0 angle.

### 10.2 Questions list (11 total)

Preserve question wording where it still works; rewrite all 9 answers to remove Essentieel/Groei/Compleet references. Add 2 new Stage 0 specific questions at the end.

1. Wat kost een website laten maken?
2. Hoe lang duurt het om een website te bouwen?
3. Kan ik zelf dingen aanpassen op mijn website?
4. Wat zit er in het pakket? *(formerly: maandbedrag)*
5. Waarom geen WordPress?
6. Werk je alleen in de regio Buren?
7. Wat heb je van mij nodig om te beginnen?
8. Hoe zit het met e-mail en hosting?
9. Hoe neem ik contact op?
10. **NEW:** Wat is de april-actie? Wie komt daarvoor in aanmerking?
11. **NEW:** Wat gebeurt er na april?

### 10.3 Answer-rewrite principles

- Each answer 30-60 words, self-contained (FAQPage schema compatibility)
- No pakket names; refer to "het aanbod" or "het pakket" singular
- No Essentieel/Groei/Compleet pricing; instead: "gratis tijdens de april-actie, daarna €497 setup + €47/mo"
- Apply the voice rules: fragments OK, no em-dashes, no participial tacking, position-taking welcome
- Cross-reference with `/webdesign/` FAQ: shared questions (like "Waarom geen WordPress?") get matched wording to avoid contradiction

Full draft copy for the 11 answers is produced during implementation. Sample for Q1 to calibrate:

> **Wat kost een website laten maken?**
> In april nog niks: ik bouw momenteel gratis voor 2 Nederlandse bedrijven in ruil voor een case study. Vanaf mei start ik met betaald werk: €497 eenmalig plus €47 per maand, alles erin (site, hosting, Google, lead-opvolging, reviews, kleine aanpassingen).

## 11. Niche + supporting pages audit

### 11.1 `/website-voor-hoveniers/`

- Standardize any CTA buttons to `Plan een kennismaking` → `/aanvragen/`
- Strip any em-dashes
- No structural change. Content stays (niche positioning still valid per scaling plan §3)

### 11.2 `/over/`, `/werk/`, `/klant/jonkers/`

- Spot-check each for CTA copy consistency (standardize to `Plan een kennismaking`)
- `/klant/jonkers/` grep-matched `/automatisering/` once. Audit that occurrence, replace with `/webdesign/` or remove the link

### 11.3 `/sitemap.xml.ts`, `/sitemap.astro`, `/llms.txt.ts`

- Verify generated XML sitemap drops deleted routes (likely auto-handled by `@astrojs/sitemap`, confirm during implementation)
- Audit `sitemap.astro` (human-readable) for hardcoded links to deleted pages; remove
- Audit `llms.txt.ts`: remove entries for `/pakketten/` and `/automatisering/*`. Add entry for `/webdesign/` if not already present. Important for AI crawlers.

### 11.4 `/404.astro`

- Audit "popular pages" suggestions. Remove any pointing to deleted URLs. Suggest `/webdesign/`, `/werk/`, `/blog/` instead.

### 11.5 `/privacy/`, `/algemene-voorwaarden/`

- Both matched grep for pakket/automatisering. Read during implementation, replace references with `/webdesign/` or "het aanbod" language.

### 11.6 `/offerte/` and `/preview/` and `/plan/`

- `/offerte/`: stays live. Read file, strip any pakket/automatisering references in copy, update any `/pakketten/` inline links.
- `/preview/`: unknown purpose. Read, decide during implementation.
- `/plan/`: unknown purpose. Read, decide during implementation.

## 12. Inline link sweep

After source-file deletions and redirects are in place, grep the full `src/` tree and fix inline references:

```bash
grep -r '/pakketten/' src/
grep -r '/automatisering/' src/
```

Known hits (non-exhaustive):

- `src/content/blog/website-laten-maken-kosten.md:59`, `:113`, `:150`
- Other blog posts likely have similar

Replace `/pakketten/` → `/webdesign/`; replace `/automatisering/` → `/webdesign/`. Redirects catch anything missed, but internal links shouldn't rely on 301 round-trips.

Scope: **code only** in this PR. Blog *content* rewriting (Stage 0 CTA injection per scaling plan §3A) is a separate, later phase.

## 13. Voice + copy rules (implementer reference)

Applies to all new and rewritten copy in this PR.

### 13.1 Hard rules

- **No em-dashes** anywhere. Period.
- `je`/`jij` informal throughout.
- No hyphens in web copy. `overflow-wrap: break-word` in CSS.
- Trailing slashes on all internal links.
- No stock photos, no fabricated social proof, no vague claims.

### 13.2 Anti-AI patterns to avoid

- Tricolons in mundane descriptive passages
- Transition markers (`Furthermore`, `Moreover`, `Daarnaast`, `Bovendien`) opening paragraphs
- Participial phrase tacking (`, wat zorgt voor...`, `, waarbij we...`)
- Negation-elevation (`Niet alleen X, maar Y`) or `Not just X, it's Y` constructions
- Inflated stakes (calling mundane things "revolutionary" or "game-changing")
- Hypophora abuse (question → immediate answer as structural transition)
- Uniform paragraph and sentence length
- Announce-then-deliver mini-structure ("Hier zijn de drie voordelen: [list] Deze drie voordelen maken...")

### 13.3 Quality signals to hit

- Sentence length variation: at least one ≤5-word sentence per section, at least one ≥25-word sentence
- Paragraph length variation: mix one-sentence paragraphs with 2-4-sentence paragraphs
- Specific numbers in every claim ("binnen 5 minuten", "20 directories", "48 uur" not "snel")
- Named entities (Astro, Cloudflare, WhatsApp, specific Dutch directory counts)
- Position-taking per section (*wat dit niet is*, *waarom geen X*)
- Second-person dominance: `je/jij` at ≥3:1 ratio vs `we/ik`
- Selective imperfection (fragments for emphasis, occasional self-deprecation)
- Read-aloud clean: every sentence sounds natural when spoken

### 13.4 Reference files

- Anti-AI patterns: `Hub/business/sops/copywriting/core/anti-ai-detection.md`
- Copy-design constraints: `Hub/business/sops/copywriting/core/copy-design-constraints.md`
- Quality signals: `Hub/business/sops/copywriting/core/quality-signals.md`
- SEO-copy rules: `Hub/business/sops/copywriting/core/seo-copy-rules.md`
- Voice benchmark (Dutch): `src/content/blog/website-laten-maken-kosten.md`

## 14. Out of scope (explicit)

- Blog post content rewrites or new blog posts
- Blog inline CTA injection for the Stage 0 offer (scaling plan §3A, separate later phase)
- `/webdesign-[city]/` location page content updates (inline link sweep only)
- Programmatic `/hovenier-[stad]/` pages (scaling plan §3A, after first hovenier case study)
- Admin dashboard changes or any backend schema changes
- Stage 1 transition copy (right card variant, FAQ swap, /webdesign/ "wat kost het" block), drafted at graduation-trigger time
- Full reactivation of `/offerte/` quiz flow
- Mollie payment integration for Stage 1 pricing

## 15. Migration checklist (implementer sequence)

Recommended order to minimize broken states during implementation.

1. Create `src/config/stage-0-offer.ts` config module
2. Create `public/_redirects` with all 7 redirects
3. Create new `/webdesign/` page (full rewrite per §5)
4. Update homepage (`index.astro`) per §6
5. Update nav (`Header.astro`) per §7.1
6. Update footer (`Footer.astro`) per §7.2
7. Update aanvragen form per §8
8. Update contact form per §9
9. Rewrite FAQ page per §10
10. Audit supporting pages per §11
11. Run inline link sweep per §12
12. Delete legacy source files per §4.2
13. Verify sitemap + llms.txt auto-drop deleted routes
14. Build + local dev test: every route in the URL map, including redirects
15. Visual regression check: homepage, `/webdesign/`, `/aanvragen/`, `/contact/`, `/veelgestelde-vragen/`, `/website-voor-hoveniers/`
16. Deploy to Cloudflare preview; verify redirects work via `curl -I`; check GBP-linked homepage renders correctly

## 16. Acceptance criteria

Before merging:

- [ ] All 7 redirects resolve with HTTP 301 to `/webdesign/`
- [ ] `/webdesign/` renders the new 9-section structure with all approved copy
- [ ] Homepage primary CTA text is `Plan een kennismaking`, target is `/aanvragen/`
- [ ] Homepage shows Stage 0 callout below CTA row (since `stage0Offer.enabled` is `true`)
- [ ] Homepage right service card reads "Nu in april" with correct spots count from config
- [ ] Nav CTA reads `Kennismaken`, target `/aanvragen/`
- [ ] Nav standalone links are `Webdesign | Werk` only
- [ ] Footer legal strip has no Pakketten or Automatisering entries
- [ ] Aanvragen dropdown has exactly 3 options + default; no `quiz_context` hidden input
- [ ] Contact dropdown has 4 options; sidebar CTA reads `Plan een kennismaking`
- [ ] FAQ page has 11 questions; no Essentieel/Groei/Compleet references in any answer
- [ ] `/website-voor-hoveniers/` CTAs standardized
- [ ] `grep -r '/pakketten/' src/` and `grep -r '/automatisering/' src/` return zero hits
- [ ] Build passes without warnings
- [ ] All copy passes a read-aloud test and contains zero em-dashes
- [ ] Flipping `stage0Offer.enabled` to `false` locally hides the callout + right service card swap happens (Stage 1 smoke test)
- [ ] Visual regression (Playwright) shows no layout drift on homepage or `/webdesign/`

## 17. Rollback

If something breaks in production:

- **Fast rollback:** revert the commit in GitHub; Cloudflare redeploys within minutes
- **Partial rollback:** flip `stage0Offer.enabled = false` in config; hides Stage 0 callout + right service card swaps (no other user-visible breakage)
- **Redirect rollback:** delete `public/_redirects` entries; legacy URLs will 404 instead of 301 (not ideal, but harmless compared to wrong content)

Deleted source files can be recovered from git history. Redirects are additive and non-destructive.

## 18. Links

- Scaling plan: `C:\Users\yanni\Hub\business\knapgemaakt-scaling-plan.md`
- Copywriting SOPs: `C:\Users\yanni\Hub\business\sops\copywriting\core\`
- SEO SOPs: `C:\Users\yanni\Hub\business\sops\seo\`
- Project CLAUDE.md: `C:\Code\clients\knapgemaakt.nl\CLAUDE.md`
- Design fidelity rules: `C:\Users\yanni\.claude\rules\design-fidelity.md`
- Astro conversion rules: `C:\Users\yanni\.claude\rules\astro-conversion.md`
