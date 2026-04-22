# Location Pages Overhaul, Design Spec

**Date:** 2026-04-22
**Status:** Design approved by user, ready for writing-plans
**Related research:** `docs/locations/research/competitive-analysis.md` (2026-04-19)
**Voice reference:** `VOICE-BIBLE.md` v0.2 (project-root, gitignored)

---

## 1. Goal

Rebuild the location-page system so the 17 existing cities match the voice and structure recommended by the competitive research, and so adding the next 183 cities (toward a 200-city footprint) is scriptable without per-page hand-writing. Culemborg ships first as reference; the other 16 follow only after approval.

## 2. Background

Current location pages live at `/webdesign-[city]/`, templated from `src/data/cities.ts` and rendered through `src/pages/webdesign-[city].astro` + `src/components/OfferLocalSEOSection.astro`. Issues: Title Case H1, €49/mnd pricing-FAQ (outdated — current is €497 setup + €47/mnd with mei-actie + resultaatgarantie), hero-subheadline and localProof feel repetitive across cities, no service hub, no Service schema, footer carries a bare stadslinks-dump that research flags as a signaal-verwatering pattern.

User plans to scale to ~200 cities (webdesign-breed, later niche-verticals). Data architecture must support that; content can stay selective.

## 3. Non-goals

- Hoveniers or other vertical-city pages — deferred to post-first-case, separate spec
- Launching 200 cities in this batch — we build the infrastructure, ship the 17 we have
- Population stats, landmarks, economic factoids per city (research flagged as cringe/template-trigger)
- LocalBusiness-per-city with fabricated vestigingsadres (Google-guidelines violation)
- Fabricated client quotes or "[Achternaam] uit [Stad]"-style reviews
- Per-city telefoonnummer or second vestiging
- Travel-time fetching via Google Maps API in this batch (manual for 17 is trivial, scriptable later)

## 4. Information architecture

### 4.1 URL patterns

- `/webdesign-[stad]/` — retained as-is (17 pages, no redirects needed)
- `/locaties/` — new hub listing all cities, grouped by region
- `/webdesign/` — existing hoofddienst page gains compact "Waar ik werk" block previewing 6 showcase cities + link to `/locaties/`
- Future: `/hovenier-[stad]/` on same root when that vertical lands

### 4.2 Hub page: `/locaties/`

- Short intro (2–3 sentences) about the work-radius from Buren
- Cities grouped by region in columns: Rivierenland, Utrecht, Gelderland, Noord-Brabant, Zuid-Holland
- Each city: name as link + 1-line context combining `{{region}}` and `{{travelMinutes}} min`
- No FAQ, no pricing on hub (concentrated at `/webdesign/` and on each city page)
- No search/filter at current scale; revisit when a region exceeds ~30 entries

### 4.3 `/webdesign/` preview block

- Inserted between existing "Wat je krijgt" section and CTA
- Section H2: sentence case, e.g. "Waar ik werk"
- 6 hand-picked showcase cities (flagged `showcase: true` in `locations.ts`): Culemborg, Tiel, Utrecht, Den Bosch, Nijmegen, Gorinchem (user can revise). One-line context per city, link to `/webdesign-[slug]/`
- Trailing link: "Zie alle locaties" → `/locaties/`

### 4.4 Footer change

- Existing `cities`-array in `Footer.astro` is removed (currently renders a bare list of stadslinks)
- Replaced by one "Locaties" link → `/locaties/`
- Layout reflow verified after removal; if a gap emerges, rebalance the affected footer-column

### 4.5 Sitemap

- `/locaties/` added to `src/pages/sitemap.xml.ts`
- Stadspagina-iteration continues to read from `locations.ts` via `getAllLocations()` (renamed helper)

## 5. Data model

### 5.1 `src/data/locations.ts` (replaces `src/data/cities.ts`)

```ts
export type Region =
  | 'Rivierenland'
  | 'Utrecht'
  | 'Gelderland'
  | 'Noord-Brabant'
  | 'Zuid-Holland';

export interface LocationData {
  slug: string;              // 'culemborg'
  name: string;              // 'Culemborg'
  region: Region;
  travelMinutes: number;     // harde per-stad unicity-metric, manually sourced from Google Maps
  lat: number;               // for auto-nearby Haversine calc
  lng: number;
  caseSlug?: string;         // optional, links to src/data/projects.ts
  hasCustomProse?: boolean;  // true → read overrides from src/content/locations/[slug].md
  showcase?: boolean;        // true → appears in /webdesign/ "Waar ik werk" block
}

export function getAllLocations(): LocationData[] { ... }
export function getLocationBySlug(slug: string): LocationData | undefined { ... }
export function getShowcaseLocations(): LocationData[] { ... }
export function getLocationsByRegion(): Record<Region, LocationData[]> { ... }
export function getNearbyLocations(slug: string, limit?: number): LocationData[] { ... }
```

`getNearbyLocations` computes Haversine distance against all other entries, returns the closest 4–6 that are in our list. At 200 cities it stays O(n) per page-build; acceptable.

### 5.2 `src/data/location-regions.ts`

```ts
export interface RegionData {
  region: Region;
  introLine: string;    // 2–3 zinnen regio-context, shown on cities without customProse
  commonTraits: string; // 1 alinea over typische ondernemers/infrastructuur — soft anchor
}
```

One record per Region. Content written per region, not per city. Soft anchors only (type ondernemers, A-wegen, regio-naam). No inwonertal, no landmarks.

### 5.3 `src/data/location-faqs.ts`

```ts
export interface TemplatedFAQ {
  id: 'pricing' | 'duration' | 'distance' | 'guarantee';
  question: string;  // may contain {{city}}
  answer: string;    // may contain {{city}} {{travelMinutes}} {{region}}
}
```

Four global FAQ's. The pricing and guarantee items mirror `/veelgestelde-vragen/` Q1/Q11 verbatim (per user's Question-5 answer A). The distance item uses `{{travelMinutes}}` for unicity. The duration item is fully templated but identical across cities.

### 5.4 Content collection `src/content/locations/[slug].md`

Added to `src/content/config.ts`:

```ts
const locations = defineCollection({
  type: 'content',
  schema: z.object({
    heroSubheadline: z.string().optional(),
    localProof: z.string().optional(),
    customFAQs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
  }),
});
```

Body prose not used in this iteration. Frontmatter-only overrides are sufficient.

### 5.5 Migration from `cities.ts`

The existing 17 records map cleanly:
- `name`, `slug`, `region` carry over
- `nearbyAreas` is discarded (auto-computed now)
- `heroSubheadline`, `localProof`, `faqs`, `coffeeLocation` are discarded (rewritten via new voice pass; most held €49/mnd claim anyway)
- `relatedProject` becomes `caseSlug`
- `travelMinutes` filled manually from Google Maps (Buren as origin)
- `lat`, `lng` filled from city centers (any standard source)
- Culemborg: `showcase: true` set in Phase 1, `hasCustomProse: true` flipped in Phase 3 once `culemborg.md` exists (flag before file would fail the Astro build)
- Tiel's By Shakir caseSlug is dropped until the project ships (project is marked `featured: false` already)

## 6. Page skeleton

Every city page renders 7 sections, target total 600–750 words per page.

### 6.1 Hero (50–70w)

- H1 sentence case: `Webdesign {{city}}.`
- Subheadline: `customProse.heroSubheadline` if present, else default `Ik bouw websites voor ondernemers in {{city}} en {{region}}. Vanuit Buren, {{travelMinutes}} minuten rijden.`
- Trust-row: `Persoonlijk contact • Vanuit Buren, {{travelMinutes}} min`
- One primary CTA → `/aanvragen/`
- Map image: per-city webp when present (`public/cities/{{slug}}.webp`), else fallback `/city_map.webp`

### 6.2 Lokale proof (80–120w)

- `customProse.localProof` if present
- Else: `regionData.introLine` + closing line referencing `{{travelMinutes}}` minutes and nearest-known anchor-point
- Soft-anchor only: Rivierenland / Betuwe / A15 / A27 / MKB / familiebedrijven / dienstverleners
- First person, informal

### 6.3 Wat ik voor je maak (120–150w)

- Templated body from `/webdesign/` "Wat je krijgt" offer text (shortened), unchanged per city
- Closing sentence references city: e.g. `Hetzelfde pakket voor ondernemers in {{city}}.`

### 6.4 Case-referentie of regio-krachten (80–120w)

- If `caseSlug` set: 1-alinea over die case with a reason it matches the city/region, link to the case page
- Else: `regionData.commonTraits` alinea (type ondernemers, wat ze nodig hebben)
- Never: fabricated client, fabricated quote, generic stock-proof

### 6.5 Werkgebied + nearby (60–80w)

- Kort zinnetje over werk-radius vanuit Buren
- Lijst van 4–6 nearest cities from `getNearbyLocations(slug)`
- Each rendered as link to `/webdesign-[slug]/`

### 6.6 FAQ (250–350w, 4–5 items)

- 3 items uit global pool, tokens filled: `pricing`, `duration`, `distance`
- Always include `guarantee` item from global pool
- 0–2 items uit `customProse.customFAQs` (appended)

### 6.7 CTA-blok

- Reuses `src/components/cta/Stage0CTABlock.astro` (Stage 0 + post-mei variant, already carries mei-actie / €497+€47/mnd / resultaatgarantie)
- No new component needed

## 7. Voice rules per section

Applied globally across all location pages; enforced in drafting and in post-draft QA.

**Always:**
- H1 and H2 in sentence case, not Title Case
- First person (`ik`), informal (`je`/`jij`)
- No em-dashes, no Oxford commas
- No "niet X, maar Y" negation-elevation
- No fragment-stapels ("Eén prijs. Geen tiers.")
- No "Nederlandse" as redundant qualifier
- `bouw` always paired with object (never standalone)
- Modal particles where natural: `gerust`, `dus`, `even`, `wel`, `nou ja`, `gewoon`
- Review, not testimonial
- Papierwerk or rompslomp, not papierwinkel
- Regio, not gemeente

**Per section variance:**
- Hero subheadline: short, direct, reistijd or regio anchor — never "De beste X in Y"
- Local proof: conversational, soft regional anchor, NO city-as-keyword-stuffing (max 2 mentions)
- Case block: if used, frame as relevant example not flex; no superlatives
- FAQ answers: human-pitched, no bullet stacks; distance FAQ acknowledges `{{travelMinutes}}` minutes concretely

## 8. Voice-compliance workflow

Location pages are the highest AI-tell risk surface per `Hub/business/sops/copywriting/` Session 4 Prompt 7. The implementation plan therefore encodes these disciplines:

**Load stack on every draft:**
- `core/anti-ai-detection.md`, `quality-signals.md`, `seo-copy-rules.md`, `copy-design-constraints.md`
- `lang/nl/anti-ai-nl.md`, `formality-nl.md`, `find-replace-nl.md`, `evidence-nl.md`
- `VOICE-BIBLE.md` v0.2
- `core/voice-failure-modes.md`, `core/voice-evaluation.md`

**Per-city drafting ritual:**
1. Retrieve stylistically nearest exemplar from VOICE-BIBLE `§10` (RAG anchor)
2. Draft customProse (hero + localProof + 1–2 custom-FAQ) straight in NL
3. Run `core/voice-evaluation.md` 13-item rubric against the output
4. If 2+ rubric items fail: trigger 20-min blind-test workflow before shipping
5. Log corrections to `feedback/FEEDBACK-LOG.md` (Hub) if a pattern emerges

**Industry voice layer:** no `voice/solo-web-designer.md` file exists. Stack is core + lang/nl + VOICE-BIBLE only.

## 9. Schema-markup

Per-page JSON-LD emitted in this order:

1. **LocalBusiness** (extend existing `LocalBusinessSchema.astro`)
   - Fixed Buren address and geo
   - New `areaServed: [{ "@type": "City", "name": "{{city}}" }]`
   - `aggregateRating` only if real Google Business Profile reviews available at build time

2. **Service** (new `ServiceSchema.astro`)
   - `serviceType: "Webdesign"`
   - `provider` linked to the LocalBusiness via `@id`
   - `areaServed` with the page's city
   - `offers` optional — omit during Stage 0 to avoid publishing pricing mismatched with the gratis-actie

3. **BreadcrumbList** (existing `BreadcrumbSchema.astro`)
   - Home → Locaties → Webdesign {{city}} (adds missing middle level)

4. **FAQPage** (existing `FAQSchema.astro`)
   - All FAQ items shown on the page (global templated + customFAQs)

5. **WebPage with `about: Place`**
   - Lightweight entity signal: `{ "@type": "Place", "name": "{{city}}" }`

**Validation:** Google Rich Results Test + Schema.org validator run on three archetypes after Phase 3 (Culemborg thick, one lean city, `/locaties/` hub). Warnings acceptable, errors are blockers.

## 10. Rollout

Build order matters because ripping `cities.ts` out before the new infrastructure lands breaks every stadspagina.

**Phase 1 — Infrastructure + template migration (one atomic commit)**
- Create `src/data/locations.ts` with 17 migrated entries + new fields (`travelMinutes`, `lat`, `lng`, `caseSlug`, `showcase`). `hasCustomProse` NOT set on anyone yet — that flag flips only when a matching `.md` file exists (Phase 3)
- Create `src/data/location-regions.ts` with 5 region records
- Create `src/data/location-faqs.ts` with 4 templated FAQ's
- Extend `src/content/config.ts` with `locations` collection schema (collection is empty for now)
- New components: `ServiceSchema.astro`, `LocationHero.astro`, `LocationBody.astro`, `LocationFAQ.astro`, `LocationNearby.astro`
- Update `LocalBusinessSchema.astro` to accept optional `areaServed` prop
- Haversine helper in `src/utils/geo.ts`
- Rewrite `src/pages/webdesign-[city].astro` to read from `locations.ts`
- Update `src/pages/sitemap.xml.ts` and `src/components/Footer.astro` to read from new helpers (Footer keeps the cities-block shape for now; Phase 4 strips it)
- Delete `src/data/cities.ts`, `src/components/OfferLocalSEOSection.astro`, `src/components/LocalSEOSection.astro`
- Verify: all 17 pages render with lean-template (no customProse yet), new pricing-FAQ visible everywhere, schemas valid
- Commit expected to be large but mechanical; atomicity avoids a broken half-state

**Phase 2 — Skipped** (merged into Phase 1 for atomicity)

**Phase 3 — Culemborg reference (one commit)**
- Write `src/content/locations/culemborg.md` with customProse (heroSubheadline + localProof + 2 custom-FAQ)
- Flip Culemborg `hasCustomProse: true` in `locations.ts`
- Deploy to Cloudflare preview
- **CHECKPOINT: user approves Culemborg before Phase 4**

**Phase 4 — Hub + webdesign preview + footer (one commit, after Phase 3 approval)**
- New `src/pages/locaties.astro`
- `/webdesign/` page extended with "Waar ik werk" block listing the 6 showcase cities
- `Footer.astro` cities-section removed, replaced with one "Locaties" link
- `/locaties/` added to sitemap

**Phase 5 — Remaining 16 cities (batch commits)**
- Per city: user sends a short brief (case / bedrijventerrein / branche-hint / special angle) — optional
- Assistant drafts NL customProse, user edits where needed
- Showcase-6 (minus Culemborg = 5 others) get customProse prioritized
- The remaining 10 may stay on lean-template indefinitely until a hook emerges
- Batch-of-3-or-4 discipline: rubric-check on every page, blind-test trigger if 2+ items fail

**Phase 6 — Schema validation + QA sweep**
- Rich Results Test on each archetype (thick, lean, hub)
- Internal link audit: no broken nearby-links, `/locaties/` paths work, footer does not 404
- Lighthouse run on Culemborg + one lean city + hub

## 11. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Mass-rewrite breaks a page that is currently indexed and ranking | Preserve existing URL slugs; monitor Search Console post-launch for drops |
| Auto-nearby returns weird pairings at small scale (17 cities span multiple regions) | Cap at 6 results, use Haversine, accept that Rivierenland cities will pair with Rivierenland first |
| Token-substitution errors in FAQ templates | Snapshot test: render all 17 pages at build, grep for unfilled `{{` |
| Schema validation errors after launch | Rich Results Test gated in Phase 6 before full deploy |
| Voice drift across the 16 later cities | Rubric-per-page discipline, rolling blind-test trigger |
| Content-collection file missing when `hasCustomProse: true` | Astro will throw at build; catch early in Phase 3 smoke test |

## 12. Open decisions carried into writing-plans

- Exact showcase-6 list (Culemborg, Tiel, Utrecht, Den Bosch, Nijmegen, Gorinchem proposed — user may swap)
- Exact wording of the 4 global FAQ templates before Phase 1 ships
- Whether `regionData.introLine` reuses any of the current 5 regio-openings in `cities.ts` or starts fresh (recommendation: fresh, current ones are pre-voice-bible)
- Whether by-default-showcase cities show customProse from day one or run lean until written

These are design-stable choices that belong in the implementation plan, not further brainstorming.
