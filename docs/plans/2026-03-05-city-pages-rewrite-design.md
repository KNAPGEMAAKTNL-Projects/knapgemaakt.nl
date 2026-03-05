# City Pages Copywriting Rewrite — Design

## Problem

The city/location pages (`webdesign-[city].astro`) use a completely different voice than the rest of the site. They sound like a marketing bureau: "wij bouwen", aggressive pricing, manufactured local knowledge, industry breakdowns. The rest of the site (home, about, wat-ik-doe, contact) speaks in first person, casual, honest — like a real person.

## Goal

Rewrite all city page copy to match the human, personal tone of the rest of the site. Strip everything that doesn't answer the visitor's actual questions:

1. Can this person help me?
2. What do I get?
3. Can I trust this person?

## Design Decisions

### Remove from `OfferLocalSEOSection.astro`

- **Problem/Solution grid** — Replace with simpler, conversational section
- **Offer section with numbered [01]-[06] feature grid** — Too bureau-like. Replace with simple bullet list (wat-ik-doe style)
- **Price (€495) and price comparison callout** — Hard prices removed from other pages
- **Process timeline (1→7→∞)** — Already on home page
- **Industry details section** — Same process for everyone, it's filler
- **City statistics** (businesses, population, founding year) — Doesn't tie back to the offer
- **Landmarks** — Irrelevant to someone looking for a web designer

### Keep and rewrite

- **Hero section** — Keep structure, rewrite to "ik" voice, remove price from trust elements
- **Brief "what you get"** — Conversational paragraph + simple bullets, no numbering
- **Local angle** — Honest: "Ik zit in Buren" + proximity, not fake expertise
- **Related project** — Genuine proof, keep
- **Nearby areas** — Good for SEO interlinking
- **FAQs** — Rewrite in "ik" voice, fewer and more honest
- **Coffee location** — Feels human

### New page structure

1. **Hero** — "Website laten maken in {city}." + honest 1-liner
2. **What you get** — Short paragraph + bullet list (like wat-ik-doe)
3. **Why me / local angle** — Brief, honest: proximity + personal contact
4. **Related project** (if exists)
5. **Nearby areas**
6. **FAQs** — Fewer, rewritten
7. **CTA** — "Kan ik je ergens mee helpen?" style

### Data model changes (`cities.ts`)

**Remove fields:**
- `problemStatement`
- `solutionStatement`
- `priceComparison`
- `industryDetails`
- `stats` (businesses, mainIndustry, economicFact, founded)
- `landmarks`
- `population`

**Keep fields:**
- `name`, `slug`, `region`, `nearbyAreas`
- `heroSubheadline` — rewrite all
- `localProof` — rewrite shorter and honest
- `coffeeLocation`
- `relatedProject`
- `faqs` — rewrite all

### Meta/SEO changes

- Remove €495 from page title and meta description
- Keep "website laten maken [city]" keyword placement
- Keep FAQ schema, breadcrumb schema, local business schema

### Voice rules for rewrite

- Always "ik", never "we/wij"
- No marketing buzzwords ("geoptimaliseerd", "cruciaal", "professioneel overkomen")
- Short sentences, like talking to someone
- Honest about what you don't know (don't pretend deep city expertise)
- Match the tone of the about page: casual, self-aware, no fluff
