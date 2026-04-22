# Location Pages Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 17-city location-page system with a scalable architecture, ship Culemborg as voice-reference, then roll hub + `/webdesign/` preview + footer-strip once the reference is approved.

**Architecture:** Typed data records in `src/data/locations.ts` (structured, scales to 200), optional prose overrides via `src/content/locations/[slug].md` content collection, auto-computed nearby cities via Haversine, global FAQ pool with token replacement, soft regional anchors via a regionpool. Default template renders lean content from structured data + regionpool; cities with customProse override selected sections.

**Tech Stack:** Astro 5 (SSR on Cloudflare Workers), Tailwind 4, TypeScript, Astro content collections, no test runner (verification via `bun run build` + Playwright-based visual check + Google Rich Results Test).

**Related spec:** `docs/superpowers/specs/2026-04-22-location-pages-overhaul-design.md`

---

## File structure

### Create
- `src/utils/geo.ts` — Haversine distance helper
- `src/data/locations.ts` — 17 typed LocationData entries + helper functions (replaces `cities.ts`)
- `src/data/location-regions.ts` — 5 region records with `introLine` + `commonTraits`
- `src/data/location-faqs.ts` — 4 templated FAQ's + `renderFAQ` token replacer
- `src/components/seo/ServiceSchema.astro` — Schema.org Service JSON-LD
- `src/components/location/LocationHero.astro`
- `src/components/location/LocationProof.astro`
- `src/components/location/LocationOffer.astro`
- `src/components/location/LocationCase.astro`
- `src/components/location/LocationNearby.astro`
- `src/components/location/LocationFAQ.astro`
- `src/content/locations/culemborg.md` — first customProse file (written in Task 18)
- `src/pages/locaties.astro` — location hub (Task 20)

### Modify
- `src/content/config.ts` — add `locations` collection schema
- `src/components/seo/LocalBusinessSchema.astro` — accept optional `areaServed` prop
- `src/pages/webdesign-[city].astro` — rewrite to consume new data + components
- `src/pages/sitemap.xml.ts` — switch imports from `cities` to `locations`, add `/locaties/`
- `src/components/Footer.astro` — replace cities list with single "Locaties" link (Task 22)
- `src/pages/webdesign.astro` — insert "Waar ik werk" showcase block (Task 21)

### Delete
- `src/data/cities.ts`
- `src/components/OfferLocalSEOSection.astro`
- `src/components/LocalSEOSection.astro`

---

## Task 1: Haversine distance helper

**Files:**
- Create: `src/utils/geo.ts`

- [ ] **Step 1: Write the helper**

Create `src/utils/geo.ts`:

```ts
const EARTH_RADIUS_KM = 6371;

export function haversineKm(
	aLat: number,
	aLng: number,
	bLat: number,
	bLng: number,
): number {
	const toRad = (deg: number) => (deg * Math.PI) / 180;
	const dLat = toRad(bLat - aLat);
	const dLng = toRad(bLng - aLng);
	const lat1 = toRad(aLat);
	const lat2 = toRad(bLat);

	const h =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
	return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}
```

- [ ] **Step 2: Verify by running build**

Run: `bun run build`
Expected: clean build (helper is not yet imported anywhere).

- [ ] **Step 3: Commit**

```bash
git add src/utils/geo.ts
git commit -m "feat(locations): add Haversine distance helper"
```

---

## Task 2: Region pool

**Files:**
- Create: `src/data/location-regions.ts`

- [ ] **Step 1: Write the region pool**

Create `src/data/location-regions.ts`:

```ts
export type Region =
	| 'Rivierenland'
	| 'Utrecht'
	| 'Gelderland'
	| 'Noord-Brabant'
	| 'Zuid-Holland';

export interface RegionData {
	region: Region;
	introLine: string;
	commonTraits: string;
}

export const regions: Record<Region, RegionData> = {
	'Rivierenland': {
		region: 'Rivierenland',
		introLine:
			'De Betuwe is mijn thuisbasis. Ik werk veel voor ondernemers langs de A15, tussen Tiel en Gorinchem.',
		commonTraits:
			'In Rivierenland zitten veel familiebedrijven: bouw, installatie, horeca, dienstverleners. Wat ze delen is dat de website vaak de eerste kennismaking is met een nieuwe klant. Dus moet die kloppen.',
	},
	'Utrecht': {
		region: 'Utrecht',
		introLine:
			'Vanuit Buren rijd ik zo de provincie in. Utrecht en omgeving zit in mijn werkgebied, zeker richting Houten, Nieuwegein en IJsselstein.',
		commonTraits:
			'De Utrechtse regio is breed: van MKB in de stad tot dienstverleners in de randgemeentes. Wat veel van mijn klanten hier delen is dat ze ooit naast een bureau zijn gevallen. Persoonlijk contact wint dan.',
	},
	'Gelderland': {
		region: 'Gelderland',
		introLine:
			'Mijn eigen provincie. Buren ligt in Gelderland, dus als je hier zit, hoef je niet ver te zoeken.',
		commonTraits:
			'Gelderse ondernemers zijn nuchter. Ze willen weten wat het kost, wat het oplevert en wie ze bellen als er wat is. Dat past bij hoe ik werk.',
	},
	'Noord-Brabant': {
		region: 'Noord-Brabant',
		introLine:
			'Brabant ligt iets verder, maar goed bereikbaar vanuit Buren via de A2 of A15. Ik werk regelmatig voor ondernemers in Den Bosch, Oss en Rosmalen.',
		commonTraits:
			'Brabantse ondernemers houden van direct contact en helderheid. Geen lange offertes, geen trage mails. Dat komt goed uit, want zo werk ik ook.',
	},
	'Zuid-Holland': {
		region: 'Zuid-Holland',
		introLine:
			'De rand richting Zuid-Holland pak ik graag op. Gorinchem, Leerdam en omgeving zijn goed bereikbaar vanuit Buren.',
		commonTraits:
			'Ondernemers aan de Zuid-Hollandse kant van de regio willen vaak iemand die lokaal denkt maar ook landelijk meekijkt. Dat hoeven bij mij niet twee partijen te zijn.',
	},
};

export function getRegion(region: Region): RegionData {
	return regions[region];
}
```

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add src/data/location-regions.ts
git commit -m "feat(locations): add region pool with soft anchors"
```

---

## Task 3: Templated FAQ pool

**Files:**
- Create: `src/data/location-faqs.ts`

- [ ] **Step 1: Write the FAQ pool + token replacer**

Create `src/data/location-faqs.ts`:

```ts
import type { Region } from './location-regions';

export type GlobalFAQId = 'pricing' | 'duration' | 'distance' | 'guarantee';

export interface TemplatedFAQ {
	id: GlobalFAQId;
	question: string;
	answer: string;
}

export const globalFAQs: TemplatedFAQ[] = [
	{
		id: 'pricing',
		question: 'Wat kost een website bij jou?',
		answer:
			'Tot eind mei nog niks. Ik maak momenteel 2 websites gratis voor ondernemers, in ruil voor een case study na 90 dagen. Vanaf juni start ik met betaald werk: €497 eenmalig plus €47 per maand. Daar zit alles in: ontwerp, bouw, hosting, Google-vindbaarheid en lead-opvolging.',
	},
	{
		id: 'duration',
		question: 'Hoe lang duurt het om een website te maken?',
		answer:
			'Het bouwen zelf duurt ongeveer twee weken. Van eerste kennismaking tot livegang zit er gemiddeld 3 tot 5 weken tussen, afhankelijk van hoe snel we teksten en foto\'s rond hebben.',
	},
	{
		id: 'distance',
		question: 'Zit je in {{city}}?',
		answer:
			'Nee, ik zit in Buren. Vanuit hier ben ik in {{travelMinutes}} minuten bij je. Het meeste werk gaat digitaal, maar als je een keer wilt afspreken kan dat prima in {{city}}.',
	},
	{
		id: 'guarantee',
		question: 'Wat garandeer je?',
		answer:
			'Voor de betaalde pakketten vanaf juni: breng je in 90 dagen na livegang minder dan 3 extra klanten via de website binnen, dan werk ik gratis door tot dat aantal wel is gehaald. Enige voorwaarde: je reageert binnen 24 uur op aanvragen die binnenkomen en houdt je Google Bedrijfsprofiel actueel. Anders is de meting niet eerlijk.',
	},
];

export interface FAQTokens {
	city: string;
	travelMinutes: number;
	region: Region;
}

export function renderFAQ(faq: TemplatedFAQ, tokens: FAQTokens): { question: string; answer: string } {
	const replace = (s: string) =>
		s
			.replaceAll('{{city}}', tokens.city)
			.replaceAll('{{travelMinutes}}', String(tokens.travelMinutes))
			.replaceAll('{{region}}', tokens.region);

	return {
		question: replace(faq.question),
		answer: replace(faq.answer),
	};
}

export function getGlobalFAQ(id: GlobalFAQId): TemplatedFAQ {
	const faq = globalFAQs.find((f) => f.id === id);
	if (!faq) throw new Error(`Unknown FAQ id: ${id}`);
	return faq;
}
```

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add src/data/location-faqs.ts
git commit -m "feat(locations): add templated global FAQ pool"
```

---

## Task 4: Locations data file

**Files:**
- Create: `src/data/locations.ts`

- [ ] **Step 1: Write the locations data + helpers**

Create `src/data/locations.ts`:

```ts
import { haversineKm } from '../utils/geo';
import type { Region } from './location-regions';

export interface LocationData {
	slug: string;
	name: string;
	region: Region;
	travelMinutes: number;
	lat: number;
	lng: number;
	caseSlug?: string;
	hasCustomProse?: boolean;
	showcase?: boolean;
}

export const locations: LocationData[] = [
	// Rivierenland
	{
		slug: 'culemborg',
		name: 'Culemborg',
		region: 'Rivierenland',
		travelMinutes: 15,
		lat: 51.9539,
		lng: 5.2254,
		caseSlug: 'maatwerk-website-voor-fitcity-culemborg',
		showcase: true,
	},
	{
		slug: 'tiel',
		name: 'Tiel',
		region: 'Rivierenland',
		travelMinutes: 15,
		lat: 51.8844,
		lng: 5.4295,
		showcase: true,
	},
	{
		slug: 'geldermalsen',
		name: 'Geldermalsen',
		region: 'Rivierenland',
		travelMinutes: 10,
		lat: 51.8830,
		lng: 5.2904,
	},
	{
		slug: 'beesd',
		name: 'Beesd',
		region: 'Rivierenland',
		travelMinutes: 10,
		lat: 51.8876,
		lng: 5.1859,
	},
	{
		slug: 'buren',
		name: 'Buren',
		region: 'Rivierenland',
		travelMinutes: 0,
		lat: 51.9246,
		lng: 5.3419,
	},
	{
		slug: 'leerdam',
		name: 'Leerdam',
		region: 'Rivierenland',
		travelMinutes: 25,
		lat: 51.8942,
		lng: 5.0932,
	},

	// Utrecht
	{
		slug: 'utrecht',
		name: 'Utrecht',
		region: 'Utrecht',
		travelMinutes: 30,
		lat: 52.0907,
		lng: 5.1214,
		showcase: true,
	},
	{
		slug: 'houten',
		name: 'Houten',
		region: 'Utrecht',
		travelMinutes: 25,
		lat: 52.0296,
		lng: 5.1699,
	},
	{
		slug: 'nieuwegein',
		name: 'Nieuwegein',
		region: 'Utrecht',
		travelMinutes: 25,
		lat: 52.0293,
		lng: 5.0810,
	},
	{
		slug: 'vianen',
		name: 'Vianen',
		region: 'Utrecht',
		travelMinutes: 20,
		lat: 51.9926,
		lng: 5.0918,
	},
	{
		slug: 'ijsselstein',
		name: 'IJsselstein',
		region: 'Utrecht',
		travelMinutes: 30,
		lat: 52.0182,
		lng: 5.0426,
	},
	{
		slug: 'wijk-bij-duurstede',
		name: 'Wijk bij Duurstede',
		region: 'Utrecht',
		travelMinutes: 20,
		lat: 51.9727,
		lng: 5.3426,
	},

	// Noord-Brabant
	{
		slug: 'den-bosch',
		name: 'Den Bosch',
		region: 'Noord-Brabant',
		travelMinutes: 35,
		lat: 51.6978,
		lng: 5.3037,
		showcase: true,
	},
	{
		slug: 'rosmalen',
		name: 'Rosmalen',
		region: 'Noord-Brabant',
		travelMinutes: 40,
		lat: 51.7155,
		lng: 5.3614,
	},
	{
		slug: 'oss',
		name: 'Oss',
		region: 'Noord-Brabant',
		travelMinutes: 30,
		lat: 51.7650,
		lng: 5.5188,
	},

	// Gelderland (non-Rivierenland)
	{
		slug: 'nijmegen',
		name: 'Nijmegen',
		region: 'Gelderland',
		travelMinutes: 45,
		lat: 51.8126,
		lng: 5.8372,
		showcase: true,
	},

	// Zuid-Holland
	{
		slug: 'gorinchem',
		name: 'Gorinchem',
		region: 'Zuid-Holland',
		travelMinutes: 30,
		lat: 51.8357,
		lng: 4.9717,
		showcase: true,
	},
];

export function getAllLocations(): LocationData[] {
	return locations;
}

export function getLocationBySlug(slug: string): LocationData | undefined {
	return locations.find((l) => l.slug === slug);
}

export function getShowcaseLocations(): LocationData[] {
	return locations.filter((l) => l.showcase);
}

export function getLocationsByRegion(): Record<string, LocationData[]> {
	const grouped: Record<string, LocationData[]> = {};
	for (const loc of locations) {
		if (!grouped[loc.region]) grouped[loc.region] = [];
		grouped[loc.region].push(loc);
	}
	for (const key of Object.keys(grouped)) {
		grouped[key].sort((a, b) => a.name.localeCompare(b.name, 'nl'));
	}
	return grouped;
}

export function getNearbyLocations(slug: string, limit = 5): LocationData[] {
	const self = getLocationBySlug(slug);
	if (!self) return [];
	return locations
		.filter((l) => l.slug !== slug)
		.map((l) => ({
			location: l,
			distance: haversineKm(self.lat, self.lng, l.lat, l.lng),
		}))
		.sort((a, b) => a.distance - b.distance)
		.slice(0, limit)
		.map((x) => x.location);
}
```

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: clean build (file is not yet imported by pages).

- [ ] **Step 3: Commit**

```bash
git add src/data/locations.ts
git commit -m "feat(locations): add typed locations data with helpers"
```

---

## Task 5: Content collection schema

**Files:**
- Modify: `src/content/config.ts`

- [ ] **Step 1: Read current config**

Run: `cat src/content/config.ts`
Expected: shows existing collections (likely `blog`).

- [ ] **Step 2: Add locations collection**

Append to `src/content/config.ts` inside the file (preserve existing collections):

```ts
import { z, defineCollection } from 'astro:content';

// ... existing blog collection stays ...

const locations = defineCollection({
	type: 'content',
	schema: z.object({
		heroSubheadline: z.string().optional(),
		localProof: z.string().optional(),
		customFAQs: z
			.array(
				z.object({
					question: z.string(),
					answer: z.string(),
				}),
			)
			.optional(),
	}),
});

export const collections = {
	// ... existing collections ...
	locations,
};
```

- [ ] **Step 3: Create the collection directory with a gitkeep**

Astro expects the collection directory to exist once registered. Create it with a placeholder so commits before Task 18 still build:

```bash
mkdir -p src/content/locations
echo "# Keeps the locations content collection directory in git until Task 18." > src/content/locations/.gitkeep
```

- [ ] **Step 4: Verify build**

Run: `bun run build`
Expected: clean build.

- [ ] **Step 5: Commit**

```bash
git add src/content/config.ts src/content/locations/.gitkeep
git commit -m "feat(locations): register locations content collection"
```

---

## Task 6: Extend LocalBusinessSchema with areaServed

**Files:**
- Modify: `src/components/seo/LocalBusinessSchema.astro`

- [ ] **Step 1: Read current component**

Run: `cat src/components/seo/LocalBusinessSchema.astro`
Expected: shows the component's JSON-LD structure; note the current prop surface.

- [ ] **Step 2: Add optional areaServed prop**

Modify the frontmatter block at the top of the file. Add to the `Props` interface (if present) or define one:

```astro
---
interface Props {
	areaServed?: string;
}

const { areaServed } = Astro.props;

// Build the existing schema object into a variable named `schema` if not already,
// then conditionally add areaServed before stringify:
// if (areaServed) { schema.areaServed = { "@type": "City", "name": areaServed }; }
---
```

In the JSON-LD script tag, output `JSON.stringify(schema)` (adjust to match existing assignment pattern — if the component currently inlines the JSON with `{}` interpolation, refactor to a `schema` object first, then stringify).

- [ ] **Step 3: Verify build**

Run: `bun run build`
Expected: clean build. Existing usages without the prop still work (prop is optional).

- [ ] **Step 4: Commit**

```bash
git add src/components/seo/LocalBusinessSchema.astro
git commit -m "feat(seo): accept optional areaServed on LocalBusinessSchema"
```

---

## Task 7: ServiceSchema component

**Files:**
- Create: `src/components/seo/ServiceSchema.astro`

- [ ] **Step 1: Write the component**

Create `src/components/seo/ServiceSchema.astro`:

```astro
---
interface Props {
	serviceType: string;
	areaServed: string;
	providerId?: string;
	providerName?: string;
	providerUrl?: string;
}

const {
	serviceType,
	areaServed,
	providerId = 'https://knapgemaakt.nl/#localbusiness',
	providerName = 'KNAP GEMAAKT.',
	providerUrl = 'https://knapgemaakt.nl/',
} = Astro.props;

const schema = {
	'@context': 'https://schema.org',
	'@type': 'Service',
	serviceType,
	provider: {
		'@type': 'LocalBusiness',
		'@id': providerId,
		name: providerName,
		url: providerUrl,
	},
	areaServed: {
		'@type': 'City',
		name: areaServed,
	},
};
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add src/components/seo/ServiceSchema.astro
git commit -m "feat(seo): add ServiceSchema component"
```

---

## Task 8: LocationHero component

**Files:**
- Create: `src/components/location/LocationHero.astro`

- [ ] **Step 1: Write the component**

Create `src/components/location/LocationHero.astro`:

```astro
---
import type { LocationData } from '../../data/locations';

interface Props {
	location: LocationData;
	subheadline: string;
	mapImage: string;
}

const { location, subheadline, mapImage } = Astro.props;
---

<section class="flex items-start bg-canvas relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24">
	<div class="max-w-6xl xl:max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
		<div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
			<div class="space-y-6">
				<div class="text-xs font-mono uppercase tracking-[0.2em] text-ink-secondary">
					[ Webdesign in {location.region} ]
				</div>
				<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-snug">
					Webdesign <span class="text-accent">{location.name}.</span>
				</h1>
				<p class="text-lg md:text-xl text-ink-secondary">
					{subheadline}
				</p>

				<div class="flex flex-wrap items-center gap-4 text-sm text-ink-secondary">
					<span>Persoonlijk contact</span>
					<span>•</span>
					<span>Vanuit Buren, {location.travelMinutes} min</span>
				</div>

				<a
					href="/aanvragen/"
					class="w-full sm:w-auto bg-ink text-canvas rounded-lg px-8 py-5 font-bold tracking-tight hover:bg-ink/80 transition-colors duration-300 inline-flex items-center justify-center gap-3 group"
				>
					Plan een kennismaking
					<span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
				</a>
			</div>

			<div class="relative">
				<div class="aspect-square md:aspect-[4/3] relative overflow-hidden group rounded-xl">
					<img
						src={mapImage}
						alt={`Webdesign in ${location.name}, vanuit Buren`}
						width={1024}
						height={768}
						loading="eager"
						fetchpriority="high"
						decoding="async"
						class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"></div>
					<div class="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-center">
						<div class="font-mono uppercase tracking-[0.2em] text-accent text-xs mb-1">
							Actief in
						</div>
						<div class="font-bold uppercase tracking-tight text-canvas" style="font-size: clamp(1.25rem, 5vw, 2.5rem);">
							{location.name}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
```

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: clean build.

- [ ] **Step 3: Commit**

```bash
git add src/components/location/LocationHero.astro
git commit -m "feat(locations): add LocationHero component"
```

---

## Task 9: LocationProof component

**Files:**
- Create: `src/components/location/LocationProof.astro`

- [ ] **Step 1: Write the component**

Create `src/components/location/LocationProof.astro`:

```astro
---
import FadeIn from '../FadeIn.astro';

interface Props {
	proof: string;
}

const { proof } = Astro.props;
---

<section class="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-canvas">
	<div class="max-w-3xl mx-auto">
		<FadeIn>
			<p class="text-lg md:text-xl text-ink leading-relaxed">
				{proof}
			</p>
		</FadeIn>
	</div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/location/LocationProof.astro
git commit -m "feat(locations): add LocationProof component"
```

---

## Task 10: LocationOffer component ("Wat ik voor je maak")

**Files:**
- Create: `src/components/location/LocationOffer.astro`

- [ ] **Step 1: Write the component**

Create `src/components/location/LocationOffer.astro`:

```astro
---
import FadeIn from '../FadeIn.astro';

interface Props {
	cityName: string;
}

const { cityName } = Astro.props;

const features = [
	'Maatwerk site, geen template',
	'Gevonden worden in Google',
	'Lead-opvolging via WhatsApp',
	'Automatische review-verzoeken',
	'Hosting, domein en zakelijk e-mail',
];
---

<section class="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-canvas-alt">
	<div class="max-w-5xl mx-auto">
		<FadeIn>
			<span class="text-xs font-bold uppercase tracking-widest text-ink-secondary/60 mb-4 block">Wat ik voor je maak</span>
			<h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-6">
				Een website die bij je bedrijf past
			</h2>
			<p class="text-lg text-ink-secondary leading-relaxed mb-8 max-w-2xl">
				Ik ontwerp de site, schrijf de teksten en regel de hosting. Je krijgt één pakket waar alles in zit wat je nodig hebt om online klanten binnen te halen.
			</p>
		</FadeIn>

		<FadeIn delay={100}>
			<ul class="space-y-3 mb-12 max-w-lg">
				{features.map((feature) => (
					<li class="flex items-center gap-3 text-ink-secondary">
						<div class="w-2 h-2 rounded-full bg-accent shrink-0"></div>
						{feature}
					</li>
				))}
			</ul>
		</FadeIn>

		<FadeIn delay={200}>
			<p class="text-lg text-ink-secondary max-w-2xl">
				Hetzelfde pakket voor ondernemers in {cityName}.
			</p>
		</FadeIn>
	</div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/location/LocationOffer.astro
git commit -m "feat(locations): add LocationOffer component"
```

---

## Task 11: LocationCase component

**Files:**
- Create: `src/components/location/LocationCase.astro`

- [ ] **Step 1: Write the component**

Create `src/components/location/LocationCase.astro`:

```astro
---
import FadeIn from '../FadeIn.astro';
import { getProjectBySlug } from '../../data/projects';

interface Props {
	caseSlug?: string;
	regionCommonTraits: string;
	cityName: string;
}

const { caseSlug, regionCommonTraits, cityName } = Astro.props;
const project = caseSlug ? getProjectBySlug(caseSlug) : null;
---

<section class="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-canvas">
	<div class="max-w-3xl mx-auto">
		{project ? (
			<FadeIn>
				<span class="text-xs font-bold uppercase tracking-widest text-ink-secondary/60 mb-4 block">Eerder werk</span>
				<h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-6">
					{project.name}
				</h2>
				<p class="text-lg text-ink-secondary leading-relaxed mb-8">
					{project.shortDescription}
				</p>
				<a
					href={`/werk/${project.slug}/`}
					class="inline-flex items-center gap-3 text-ink font-bold tracking-tight hover:text-accent transition-colors group"
				>
					Bekijk de case
					<span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
				</a>
			</FadeIn>
		) : (
			<FadeIn>
				<span class="text-xs font-bold uppercase tracking-widest text-ink-secondary/60 mb-4 block">Voor wie ik werk in deze regio</span>
				<p class="text-lg text-ink-secondary leading-relaxed">
					{regionCommonTraits}
				</p>
			</FadeIn>
		)}
	</div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/location/LocationCase.astro
git commit -m "feat(locations): add LocationCase component"
```

---

## Task 12: LocationNearby component

**Files:**
- Create: `src/components/location/LocationNearby.astro`

- [ ] **Step 1: Write the component**

Create `src/components/location/LocationNearby.astro`:

```astro
---
import FadeIn from '../FadeIn.astro';
import type { LocationData } from '../../data/locations';

interface Props {
	nearby: LocationData[];
	cityName: string;
}

const { nearby, cityName } = Astro.props;
---

<section class="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-canvas-alt">
	<div class="max-w-3xl mx-auto">
		<FadeIn>
			<span class="text-xs font-bold uppercase tracking-widest text-ink-secondary/60 mb-4 block">Werkgebied</span>
			<h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-6">
				Ook actief rond {cityName}
			</h2>
			<p class="text-lg text-ink-secondary leading-relaxed mb-6">
				Vanuit Buren werk ik voor ondernemers in de hele regio. Een paar plekken in de buurt waar ik ook zit:
			</p>
			<ul class="flex flex-wrap gap-3">
				{nearby.map((loc) => (
					<li>
						<a
							href={`/webdesign-${loc.slug}/`}
							class="inline-block border-2 border-warm px-4 py-2 rounded-lg font-bold tracking-tight text-ink hover:border-accent transition-colors"
						>
							{loc.name}
						</a>
					</li>
				))}
			</ul>
		</FadeIn>
	</div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/location/LocationNearby.astro
git commit -m "feat(locations): add LocationNearby component"
```

---

## Task 13: LocationFAQ component

**Files:**
- Create: `src/components/location/LocationFAQ.astro`

- [ ] **Step 1: Write the component**

Create `src/components/location/LocationFAQ.astro`:

```astro
---
import FadeIn from '../FadeIn.astro';

interface FAQ {
	question: string;
	answer: string;
}

interface Props {
	faqs: FAQ[];
}

const { faqs } = Astro.props;
---

<section class="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-canvas">
	<div class="max-w-3xl mx-auto">
		<FadeIn>
			<span class="text-xs font-bold uppercase tracking-widest text-ink-secondary/60 mb-4 block">Vragen die ik vaker hoor</span>
			<h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-10">
				Veelgestelde vragen
			</h2>
		</FadeIn>

		<FadeIn delay={100}>
			<div class="space-y-4">
				{faqs.map((faq) => (
					<details class="group border-2 border-warm rounded-xl overflow-hidden transition-colors hover:border-accent/30 open:border-accent/50">
						<summary class="flex items-center justify-between gap-4 p-6 cursor-pointer list-none font-bold tracking-tight text-ink select-none">
							<span>{faq.question}</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" class="shrink-0 transition-transform duration-300 group-open:rotate-45">
								<line x1="12" y1="5" x2="12" y2="19" />
								<line x1="5" y1="12" x2="19" y2="12" />
							</svg>
						</summary>
						<div class="px-6 pb-6 text-ink/70 leading-relaxed">
							{faq.answer}
						</div>
					</details>
				))}
			</div>
		</FadeIn>
	</div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/location/LocationFAQ.astro
git commit -m "feat(locations): add LocationFAQ component"
```

---

## Task 14: Rewrite `webdesign-[city].astro`

**Files:**
- Modify: `src/pages/webdesign-[city].astro` (complete rewrite)

- [ ] **Step 1: Replace the file**

Replace the entire contents of `src/pages/webdesign-[city].astro` with:

```astro
---
import Layout from '../layouts/Layout.astro';
import Footer from '../components/Footer.astro';
import LocalBusinessSchema from '../components/seo/LocalBusinessSchema.astro';
import ServiceSchema from '../components/seo/ServiceSchema.astro';
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema.astro';
import FAQSchema from '../components/seo/FAQSchema.astro';
import LocationHero from '../components/location/LocationHero.astro';
import LocationProof from '../components/location/LocationProof.astro';
import LocationOffer from '../components/location/LocationOffer.astro';
import LocationCase from '../components/location/LocationCase.astro';
import LocationNearby from '../components/location/LocationNearby.astro';
import LocationFAQ from '../components/location/LocationFAQ.astro';
import Stage0CTABlock from '../components/cta/Stage0CTABlock.astro';

import { getAllLocations, getLocationBySlug, getNearbyLocations, type LocationData } from '../data/locations';
import { getRegion } from '../data/location-regions';
import { globalFAQs, renderFAQ } from '../data/location-faqs';
import { getEntry } from 'astro:content';

export const prerender = true;

export async function getStaticPaths() {
	const cityImages = import.meta.glob('/public/cities/*.webp');
	const availableCityImages = new Set(
		Object.keys(cityImages).map((path) =>
			path.replace('/public/cities/', '').replace('.webp', ''),
		),
	);

	const locations = getAllLocations();

	return locations.map((location) => ({
		params: { city: location.slug },
		props: {
			location,
			hasCityImage: availableCityImages.has(location.slug),
		},
	}));
}

interface Props {
	location: LocationData;
	hasCityImage: boolean;
}

const { location, hasCityImage } = Astro.props;
const regionData = getRegion(location.region);

// Load optional custom prose from content collection
let customProse: {
	heroSubheadline?: string;
	localProof?: string;
	customFAQs?: Array<{ question: string; answer: string }>;
} = {};

if (location.hasCustomProse) {
	const entry = await getEntry('locations', location.slug);
	if (entry) {
		customProse = entry.data;
	}
}

const subheadline =
	customProse.heroSubheadline ??
	`Ik bouw websites voor ondernemers in ${location.name} en ${location.region}. Vanuit Buren, ${location.travelMinutes} minuten rijden.`;

const proof =
	customProse.localProof ??
	`${regionData.introLine} Vanuit Buren ben ik in ${location.travelMinutes} minuten bij je.`;

const mapImage = hasCityImage ? `/cities/${location.slug}.webp` : '/city_map.webp';

// FAQ composition: 3 global templated + guarantee + up to 2 custom
const tokens = { city: location.name, travelMinutes: location.travelMinutes, region: location.region };
const baseFAQs = globalFAQs.map((faq) => renderFAQ(faq, tokens));
const faqs = [...baseFAQs, ...(customProse.customFAQs ?? [])];

const nearby = getNearbyLocations(location.slug, 5);

const metaDescription = `Website laten maken in ${location.name}? Ik bouw websites voor ondernemers in de regio. Vanuit Buren, ${location.travelMinutes} minuten rijden. KNAP GEMAAKT.`;
const pageTitle = `Webdesign ${location.name} | KNAP GEMAAKT.`;

const breadcrumbs = [
	{ name: 'Home', url: 'https://knapgemaakt.nl/' },
	{ name: 'Locaties', url: 'https://knapgemaakt.nl/locaties/' },
	{ name: `Webdesign ${location.name}`, url: `https://knapgemaakt.nl/webdesign-${location.slug}/` },
];
---

<Layout title={pageTitle} description={metaDescription}>
	<LocalBusinessSchema areaServed={location.name} />
	<ServiceSchema serviceType="Webdesign" areaServed={location.name} />
	<BreadcrumbSchema items={breadcrumbs} />
	<FAQSchema faqs={faqs} />
	<main>
		<LocationHero location={location} subheadline={subheadline} mapImage={mapImage} />
		<LocationProof proof={proof} />
		<LocationOffer cityName={location.name} />
		<LocationCase caseSlug={location.caseSlug} regionCommonTraits={regionData.commonTraits} cityName={location.name} />
		<LocationNearby nearby={nearby} cityName={location.name} />
		<LocationFAQ faqs={faqs} />
		<Stage0CTABlock />
		<Footer hideCTA={true} />
	</main>
</Layout>
```

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: clean build. All 17 city pages render (output `dist/webdesign-*/index.html`).

- [ ] **Step 3: Smoke-test a page locally**

Run: `bun run dev`
Open: `http://localhost:4321/webdesign-culemborg/`
Expected: hero with sentence-case H1, proof paragraph, "Wat ik voor je maak" section, FitCity case block (still old content), nearby cities as links, 4 FAQ items (pricing, duration, distance, guarantee), Stage 0 CTA block, footer without duplicate CTA.

- [ ] **Step 4: Grep for unfilled tokens**

Run: `bun run build && grep -rn "{{" dist/webdesign-*/index.html | head`
Expected: empty output (no unreplaced `{{` tokens in built HTML).

- [ ] **Step 5: Commit**

```bash
git add src/pages/webdesign-[city].astro
git commit -m "feat(locations): rewrite city template against new data layer"
```

---

## Task 15: Update sitemap

**Files:**
- Modify: `src/pages/sitemap.xml.ts`

- [ ] **Step 1: Read current sitemap**

Run: `cat src/pages/sitemap.xml.ts`
Expected: imports from `../data/cities` probably.

- [ ] **Step 2: Swap import**

In `src/pages/sitemap.xml.ts`:
- Replace `import { getAllCities } from '../data/cities'` with `import { getAllLocations } from '../data/locations'`
- Replace calls to `getAllCities()` with `getAllLocations()`
- In URL loops that use `cityData.slug`, rename variable to `location.slug` (or keep `cityData` — only names matter)
- Leave the `/locaties/` entry for Task 23 (not this task)

- [ ] **Step 3: Verify build**

Run: `bun run build`
Expected: clean build. Sitemap XML at `dist/sitemap.xml` lists all 17 `/webdesign-[slug]/` URLs.

- [ ] **Step 4: Commit**

```bash
git add src/pages/sitemap.xml.ts
git commit -m "refactor(sitemap): read from locations data layer"
```

---

## Task 16: Update Footer to new data layer (shape preserved for now)

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Read current footer**

Run: `cat src/components/Footer.astro`
Expected: imports from `../data/cities`, renders cities list.

- [ ] **Step 2: Swap imports only, preserve rendering shape**

In `src/components/Footer.astro`:
- Replace `import { ... } from '../data/cities'` with same symbols from `../data/locations` (use `getAllLocations` helper)
- Update the map to use `location.slug` + `location.name`

Do NOT remove the cities list here — footer-strip is Task 22, deferred until after Culemborg approval.

- [ ] **Step 3: Verify build + visual**

Run: `bun run build && bun run dev`
Open: any page, scroll to footer
Expected: cities list still renders, now sourced from `locations.ts`.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.astro
git commit -m "refactor(footer): read cities list from locations data layer"
```

---

## Task 17: Delete deprecated files

**Files:**
- Delete: `src/data/cities.ts`
- Delete: `src/components/OfferLocalSEOSection.astro`
- Delete: `src/components/LocalSEOSection.astro`

- [ ] **Step 1: Confirm zero remaining imports**

Run: `grep -rn "data/cities\|OfferLocalSEOSection\|LocalSEOSection" src/`
Expected: no matches (Tasks 14–16 should have replaced all usages).

- [ ] **Step 2: Delete the files**

```bash
rm src/data/cities.ts
rm src/components/OfferLocalSEOSection.astro
rm src/components/LocalSEOSection.astro
```

- [ ] **Step 3: Verify build**

Run: `bun run build`
Expected: clean build. No import errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore(locations): delete deprecated cities.ts and legacy SEO sections"
```

---

## Task 18: Culemborg custom prose (Phase 3)

**Files:**
- Create: `src/content/locations/culemborg.md`
- Modify: `src/data/locations.ts` (flip `hasCustomProse` for Culemborg)

- [ ] **Step 1: Create the content file**

Create `src/content/locations/culemborg.md`:

```markdown
---
heroSubheadline: "In Buren zit ik om de hoek, een kwartier rijden. Voor FitCity heb ik eerder de website gebouwd, dus Culemborg ken ik een beetje."
localProof: "Culemborg is mijn directe buurstad. Vanuit Buren ben ik er in een kwartier, dus als je wilt afspreken kan dat gewoon bij jou op kantoor of in de stad. Voor FitCity bouwde ik eerder de website, een lokale sportschool. Daardoor weet ik hoe de stad werkt en welke vragen ondernemers hier typisch stellen."
customFAQs:
  - question: "Heb je ervaring met ondernemers in Culemborg?"
    answer: "Ja, ik bouwde de website voor FitCity Culemborg. Die staat live en heeft sindsdien meer ledenaanmeldingen via de site. Voor andere ondernemers in de stad geldt hetzelfde aanbod: maatwerk, persoonlijk contact en een site die bij je bedrijf past."
  - question: "Kun je langskomen voor een kennismaking?"
    answer: "Zeker. Vanuit Buren rijd ik in een kwartier naar Culemborg. We kunnen afspreken bij jou op kantoor, in een café in de stad of bij mij. Wat jij handig vindt."
---
```

- [ ] **Step 2: Flip the flag in locations.ts**

In `src/data/locations.ts`, update Culemborg entry to add `hasCustomProse: true`:

```ts
{
    slug: 'culemborg',
    name: 'Culemborg',
    region: 'Rivierenland',
    travelMinutes: 15,
    lat: 51.9539,
    lng: 5.2254,
    caseSlug: 'maatwerk-website-voor-fitcity-culemborg',
    hasCustomProse: true,
    showcase: true,
},
```

- [ ] **Step 3: Verify build**

Run: `bun run build`
Expected: clean build. Culemborg page now renders with custom heroSubheadline, localProof, and 6 FAQ items (4 global + 2 custom).

- [ ] **Step 4: Smoke-test locally**

Run: `bun run dev`
Open: `http://localhost:4321/webdesign-culemborg/`
Expected: hero subheadline mentions FitCity, localProof paragraph is Culemborg-specific, FAQ section has 6 items including "Heb je ervaring met ondernemers in Culemborg?" and "Kun je langskomen voor een kennismaking?"

- [ ] **Step 5: Run voice rubric (manual)**

Open `C:\Users\yanni\Hub\business\sops\copywriting\core\voice-evaluation.md` and score the 13-item rubric against the Culemborg page copy (hero + proof + 2 custom FAQs). If 2+ items fail, trigger the 20-min blind-test workflow before shipping.

- [ ] **Step 6: Commit**

```bash
git add src/content/locations/culemborg.md src/data/locations.ts
git commit -m "feat(locations): add Culemborg custom prose as voice reference"
```

---

## Task 19: CHECKPOINT — user approves Culemborg

**This is a HARD STOP. Do not proceed to Task 20 until the user has reviewed `/webdesign-culemborg/` on the Cloudflare preview and explicitly approved.**

- [ ] **Step 1: Push branch and request preview**

```bash
git push
```

Cloudflare will deploy a preview URL for the current branch. Share the URL with the user.

- [ ] **Step 2: Request review**

Message the user:

> Culemborg reference is live on preview: [URL]. Review voice, content, schema, and layout. If changes needed, tell me what. Otherwise approve to proceed with hub + webdesign-preview + footer-strip.

- [ ] **Step 3: Wait for approval**

Do not continue until the user has said "approved", "good", or equivalent.

---

## Task 20: `/locaties/` hub page

**Files:**
- Create: `src/pages/locaties.astro`

- [ ] **Step 1: Write the hub page**

Create `src/pages/locaties.astro`:

```astro
---
export const prerender = true;

import Layout from '../layouts/Layout.astro';
import Footer from '../components/Footer.astro';
import FadeIn from '../components/FadeIn.astro';
import TextRevealCSS from '../components/TextRevealCSS.astro';
import BreadcrumbSchema from '../components/seo/BreadcrumbSchema.astro';
import { getLocationsByRegion } from '../data/locations';

const grouped = getLocationsByRegion();
const regionOrder = ['Rivierenland', 'Utrecht', 'Gelderland', 'Noord-Brabant', 'Zuid-Holland'] as const;

const breadcrumbs = [
	{ name: 'Home', url: 'https://knapgemaakt.nl/' },
	{ name: 'Locaties', url: 'https://knapgemaakt.nl/locaties/' },
];
---

<Layout
	title="Locaties | Webdesign in heel Nederland | KNAP GEMAAKT."
	description="Overzicht van alle plekken waar ik websites bouw. Vanuit Buren werk ik voor ondernemers in Rivierenland, Utrecht, Gelderland, Noord-Brabant en Zuid-Holland."
>
	<BreadcrumbSchema items={breadcrumbs} />
	<main class="min-h-screen bg-canvas pt-32 pb-24 px-4 md:px-8 relative overflow-hidden">
		<div class="max-w-5xl mx-auto">
			<FadeIn>
				<div class="mb-16">
					<TextRevealCSS
						text="Locaties."
						class="text-4xl md:text-7xl font-bold tracking-tight leading-snug mb-6"
					/>
					<p class="text-xl md:text-2xl text-ink/70 font-medium max-w-2xl leading-relaxed">
						Vanuit Buren werk ik voor ondernemers door heel het midden van Nederland. Klik op je stad om te zien wat ik daar doe.
					</p>
				</div>
			</FadeIn>

			<FadeIn delay={100}>
				<div class="grid md:grid-cols-2 gap-12">
					{regionOrder.map((region) => (
						grouped[region] && (
							<div>
								<h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-6">{region}</h2>
								<ul class="space-y-3">
									{grouped[region].map((loc) => (
										<li>
											<a
												href={`/webdesign-${loc.slug}/`}
												class="group flex items-baseline justify-between gap-4 border-b border-warm py-3 hover:border-accent transition-colors"
											>
												<span class="font-bold tracking-tight text-ink group-hover:text-accent transition-colors">{loc.name}</span>
												<span class="text-sm text-ink/60">{loc.travelMinutes} min vanuit Buren</span>
											</a>
										</li>
									))}
								</ul>
							</div>
						)
					))}
				</div>
			</FadeIn>
		</div>
	</main>
	<Footer />
</Layout>
```

- [ ] **Step 2: Verify build + smoke test**

Run: `bun run build && bun run dev`
Open: `http://localhost:4321/locaties/`
Expected: hero "Locaties.", 5 regio-groepen met cities alfabetisch, elke city met reistijd, links werken.

- [ ] **Step 3: Commit**

```bash
git add src/pages/locaties.astro
git commit -m "feat(locations): add /locaties/ hub page"
```

---

## Task 21: `/webdesign/` showcase block

**Files:**
- Modify: `src/pages/webdesign.astro`

- [ ] **Step 1: Read the file to find insertion point**

Run: `grep -n "Wat je krijgt\|Wat zit erin\|CTA" src/pages/webdesign.astro`
Expected: line numbers for the section boundaries.

- [ ] **Step 2: Insert "Waar ik werk" section**

Just before the page's CTA section (typically where `Stage0CTABlock` is rendered), insert:

```astro
---
// Add import near the top of the frontmatter:
import { getShowcaseLocations } from '../data/locations';

const showcase = getShowcaseLocations();
---

<!-- Place this in the body, before the final CTA: -->
<section class="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-canvas-alt">
	<div class="max-w-5xl mx-auto">
		<span class="text-xs font-bold uppercase tracking-widest text-ink-secondary/60 mb-4 block">Waar ik werk</span>
		<h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-10">
			Vanuit Buren, door heel de regio
		</h2>
		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
			{showcase.map((loc) => (
				<a
					href={`/webdesign-${loc.slug}/`}
					class="group border-2 border-warm rounded-xl p-5 hover:border-accent transition-colors"
				>
					<div class="font-bold tracking-tight text-ink group-hover:text-accent transition-colors mb-1">
						{loc.name}
					</div>
					<div class="text-sm text-ink/60">
						{loc.region} &bull; {loc.travelMinutes} min vanuit Buren
					</div>
				</a>
			))}
		</div>
		<a
			href="/locaties/"
			class="inline-flex items-center gap-3 text-ink font-bold tracking-tight hover:text-accent transition-colors group"
		>
			Alle locaties
			<span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
		</a>
	</div>
</section>
```

- [ ] **Step 3: Verify build + smoke test**

Run: `bun run build && bun run dev`
Open: `http://localhost:4321/webdesign/`
Expected: "Waar ik werk" block appears before CTA, shows 6 cities, "Alle locaties" links to `/locaties/`.

- [ ] **Step 4: Commit**

```bash
git add src/pages/webdesign.astro
git commit -m "feat(webdesign): add Waar ik werk showcase block"
```

---

## Task 22: Strip cities from footer

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Read current footer**

Run: `cat src/components/Footer.astro`
Expected: shows the cities block (iterates over locations) added in Task 16.

- [ ] **Step 2: Replace cities block with Locaties link**

Find the `<ul>` / `<div>` that renders the cities list and replace with a single link to `/locaties/`. The exact markup depends on footer column layout; aim for:

```astro
<li>
	<a href="/locaties/" class="hover:text-accent transition-colors">Locaties</a>
</li>
```

Remove the import of `getAllLocations` from Footer.astro if it's no longer used anywhere else in the file.

- [ ] **Step 3: Verify build + visual**

Run: `bun run build && bun run dev`
Open: any page, scroll to footer
Expected: cities list is gone, one "Locaties" link in its place, footer layout still balanced. If a visible gap remains, rebalance the column by redistributing remaining links.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.astro
git commit -m "refactor(footer): replace cities list with single Locaties link"
```

---

## Task 23: Add `/locaties/` to sitemap

**Files:**
- Modify: `src/pages/sitemap.xml.ts`

- [ ] **Step 1: Add the route**

In `src/pages/sitemap.xml.ts`, locate the static-routes array (alongside `/contact/`, `/werk/`, etc.) and add `/locaties/`.

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: `dist/sitemap.xml` contains `<loc>https://knapgemaakt.nl/locaties/</loc>`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/sitemap.xml.ts
git commit -m "feat(sitemap): add /locaties/ hub"
```

---

## Task 24: Schema validation

**Files:** none (validation only)

- [ ] **Step 1: Pick 3 archetypes**

- Thick: `https://<preview-url>/webdesign-culemborg/`
- Lean: `https://<preview-url>/webdesign-rosmalen/` (no case, no customProse)
- Hub: `https://<preview-url>/locaties/`

- [ ] **Step 2: Run Google Rich Results Test**

Open `https://search.google.com/test/rich-results` and paste each URL in turn.
Expected for city pages: LocalBusiness, Service, BreadcrumbList, FAQPage all detected, no errors. Warnings (e.g. missing aggregateRating) are acceptable.
Expected for hub: BreadcrumbList detected.

- [ ] **Step 3: Run Schema.org validator**

Open `https://validator.schema.org/` and paste the same 3 URLs.
Expected: all schemas parse; log any warnings in the commit message below.

- [ ] **Step 4: Commit findings**

```bash
git commit --allow-empty -m "test(locations): schema validation pass on 3 archetypes

Culemborg: LocalBusiness + Service + Breadcrumb + FAQPage valid
Rosmalen: same, minus customFAQ items
/locaties/: Breadcrumb valid
Warnings: [list any]"
```

---

## Task 25: Internal-link + build audit

**Files:** none (audit only)

- [ ] **Step 1: Grep built HTML for unfilled tokens**

Run: `bun run build && grep -rn "{{" dist/webdesign-*/index.html dist/locaties/index.html`
Expected: no matches.

- [ ] **Step 2: Check Footer no longer contains per-city links**

Run: `grep -c "webdesign-" dist/index.html`
Expected: matches only come from within-main-content if any (showcase block is on /webdesign/ not /). Footer should show 0 per-city links.

- [ ] **Step 3: Check nearby links resolve**

Run: `grep -oE "/webdesign-[a-z-]+/" dist/webdesign-culemborg/index.html | sort -u`
Expected: 5 unique nearby slugs, all of which appear as directories in `dist/`.

- [ ] **Step 4: Verify /locaties/ lists all 17**

Run: `grep -c "webdesign-" dist/locaties/index.html`
Expected: ≥17 (one per city).

- [ ] **Step 5: Commit findings**

```bash
git commit --allow-empty -m "test(locations): internal-link audit passed (17 cities, 5 nearby per page, hub complete)"
```

---

## Task 26: Remaining cities rollout pattern (Phase 5)

**This is not a single atomic task — it's a pattern to be repeated per city. Each city gets its own commit.**

For each city the user decides to upgrade from lean to thick:

- [ ] **Step 1: User sends brief**

User provides a short brief with any of: specific case to reference, branche/bedrijventerrein/wijk angle, anecdote, preferred hook.

- [ ] **Step 2: Draft customProse**

Create `src/content/locations/[slug].md` with the same frontmatter shape as Culemborg (see Task 18). Follow Voice Bible §7.2 hero register + §10 exemplars.

- [ ] **Step 3: Flip flag**

In `src/data/locations.ts`, set `hasCustomProse: true` on that city.

- [ ] **Step 4: Rubric check**

Score the new page against `core/voice-evaluation.md` 13-item rubric. If 2+ fail, blind-test before shipping.

- [ ] **Step 5: Commit**

```bash
git add src/content/locations/[slug].md src/data/locations.ts
git commit -m "feat(locations): add [city] custom prose"
```

**Showcase-6 priority (minus Culemborg which ships in Task 18):** Tiel, Utrecht, Den Bosch, Nijmegen, Gorinchem. Other 10 may stay lean-template until a hook emerges.

---

## Self-review notes

**Spec coverage:** Every section of the spec (goal, non-goals, IA, data model, skeleton, voice rules, voice workflow, schema, rollout, risks) has at least one task. Phase 5 is documented as a pattern rather than 16 separate tasks, which matches the spec's "batch commits" framing.

**No placeholders:** FAQ templates, regio intros, Culemborg customProse, and lat/lng+travelMinutes values are all concrete. The only value flagged as provisional is travelMinutes (user should verify via Google Maps post-launch); locations.ts carries the initial estimates so the build works today.

**Type consistency:** `LocationData`, `Region`, `TemplatedFAQ`, `FAQTokens`, `RegionData` are defined in Tasks 1–4 and reused with matching names in Tasks 6–14. `getAllLocations()`, `getLocationBySlug()`, `getShowcaseLocations()`, `getLocationsByRegion()`, `getNearbyLocations()` are declared in Task 4 and called consistently in Tasks 14/15/16/20/21/22.

**Known provisional values the user may want to correct post-build:**
- `travelMinutes` per city (driving time from Buren)
- lat/lng of each city (used only for nearby-ordering; rough precision is acceptable)
- showcase-6 pick (currently Culemborg/Tiel/Utrecht/Den Bosch/Nijmegen/Gorinchem — user can swap by flipping `showcase: true` in locations.ts)
