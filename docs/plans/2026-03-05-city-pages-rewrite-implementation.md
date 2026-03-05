# City Pages Copywriting Rewrite — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite all city/location page copywriting to match the human, personal tone of the home and about pages. Strip filler, remove hard prices, use "ik" voice.

**Architecture:** Three files change: `CityData` interface in `cities.ts` loses fields, `OfferLocalSEOSection.astro` gets a complete rewrite with simpler structure, and `webdesign-[city].astro` hero/meta gets updated. All 17 city entries get rewritten copy.

**Tech Stack:** Astro, TypeScript

---

### Task 1: Update CityData interface and types

**Files:**
- Modify: `src/data/cities.ts:1-70` (interface section only)

**Step 1: Replace the interface section at the top of cities.ts**

Replace lines 1-70 with:

```ts
/**
 * City data for local SEO pages
 * Each city has unique content written in first-person ("ik") voice.
 * Keep it honest, personal, and free of marketing-speak.
 */

export interface FAQItem {
	question: string;
	answer: string;
}

export interface CityData {
	name: string;
	slug: string;
	region: string;
	nearbyAreas: string[];
	faqs: FAQItem[];
	relatedProject?: string;

	/** Hero subheadline - honest 1-liner about what you do for this area */
	heroSubheadline: string;

	/** Local proof - 1-2 sentences about proximity and personal contact */
	localProof: string;

	/** Coffee meeting suggestion for CTA */
	coffeeLocation?: string;
}
```

This removes: `CityStats`, `IndustryDetail`, `stats`, `landmarks`, `population`, `problemStatement`, `solutionStatement`, `priceComparison`, `industryDetails`.

**Step 2: Don't build yet** — the city data still has the old fields. We'll fix that in Task 4.

---

### Task 2: Rewrite OfferLocalSEOSection.astro

**Files:**
- Modify: `src/components/OfferLocalSEOSection.astro` (complete rewrite)

**Step 1: Replace the entire file with the new component**

```astro
---
import type { CityData } from "../data/cities";
import { getAllCities } from "../data/cities";
import { getProjectBySlug } from "../data/projects";
import FadeIn from "./FadeIn.astro";

interface Props {
	city: CityData;
}

const { city } = Astro.props;

const relatedProject = city.relatedProject ? getProjectBySlug(city.relatedProject) : null;

const allCities = getAllCities();
const citySlugs = new Set(allCities.map(c => c.slug));

function getAreaLink(areaName: string): string | null {
	const slug = areaName.toLowerCase()
		.replace(/['']/g, '')
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
	return citySlugs.has(slug) ? `/webdesign-${slug}/` : null;
}
---

<!-- What you get + Local angle -->
<section class="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-canvas-alt">
	<div class="max-w-5xl mx-auto">
		<FadeIn>
			<span class="text-xs font-bold uppercase tracking-widest text-ink-secondary/60 mb-4 block">Wat je krijgt</span>
			<h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-6">
				Een website die bij je past
			</h2>
			<p class="text-lg text-ink-secondary leading-relaxed mb-8 max-w-2xl">
				Ik ontwerp je website, schrijf de teksten en regel de hosting. Jij geeft feedback, ik doe de rest.
			</p>
		</FadeIn>

		<FadeIn delay={100}>
			<ul class="space-y-3 mb-12 max-w-lg">
				{["Werkt goed op telefoon en laptop", "Vindbaar in Google", "Teksten schrijf ik voor je", "Hosting zit erbij", "Je eigen domeinnaam"].map((feature) => (
					<li class="flex items-center gap-3 text-ink-secondary">
						<div class="w-2 h-2 rounded-full bg-accent shrink-0"></div>
						{feature}
					</li>
				))}
			</ul>
		</FadeIn>

		<FadeIn delay={200}>
			<div class="border-t border-warm pt-10">
				<h3 class="text-xl font-bold tracking-tight mb-3">Persoonlijk contact</h3>
				<p class="text-ink-secondary leading-relaxed mb-4 max-w-2xl">
					{city.localProof}
				</p>
				{city.coffeeLocation && (
					<a
						href="/contact/"
						class="text-ink font-bold inline-flex items-center gap-2 hover:text-accent transition-colors group"
					>
						{city.coffeeLocation}
						<span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
					</a>
				)}
			</div>
		</FadeIn>

		<!-- Nearby areas -->
		<FadeIn delay={300}>
			<div class="border-t border-warm pt-10 mt-10">
				<span class="text-xs font-bold uppercase tracking-widest text-ink-secondary/60 mb-4 block">Ook actief in de omgeving</span>
				<div class="flex flex-wrap gap-2">
					{city.nearbyAreas.map((area) => {
						const link = getAreaLink(area);
						return link ? (
							<a href={link} class="px-4 py-2 bg-canvas text-ink/80 font-medium text-sm rounded-lg hover:bg-accent hover:text-ink transition-colors">
								{area}
							</a>
						) : (
							<span class="px-4 py-2 bg-canvas text-ink/80 font-medium text-sm rounded-lg">
								{area}
							</span>
						);
					})}
				</div>
			</div>
		</FadeIn>
	</div>
</section>

<!-- Related Project -->
{relatedProject && (
	<section class="py-16 md:py-24 px-6 md:px-12 lg:px-16">
		<div class="max-w-5xl mx-auto">
			<FadeIn>
				<span class="text-xs font-bold uppercase tracking-widest text-ink-secondary/60 mb-4 block">Eerder werk in de regio</span>
				<div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
					<div>
						<h3 class="text-2xl font-bold tracking-tight mb-3">
							{relatedProject.title}
						</h3>
						<p class="text-ink-secondary leading-relaxed mb-4">
							{relatedProject.shortDescription}
						</p>
						<a
							href={`/project/${relatedProject.slug}/`}
							class="text-ink font-bold inline-flex items-center gap-2 hover:text-accent transition-colors group"
						>
							Bekijk dit project
							<span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
						</a>
					</div>
					<a href={`/project/${relatedProject.slug}/`} class="relative aspect-video overflow-hidden rounded-xl block group">
						<img
							src={relatedProject.overviewMockup || relatedProject.heroMockup || relatedProject.image}
							alt={`${relatedProject.title} website`}
							width={800}
							height={450}
							loading="lazy"
							decoding="async"
							class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
						/>
					</a>
				</div>
			</FadeIn>
		</div>
	</section>
)}

<!-- FAQ -->
{city.faqs && city.faqs.length > 0 && (
	<section class="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-canvas-alt">
		<div class="max-w-5xl mx-auto">
			<FadeIn>
				<span class="text-xs font-bold uppercase tracking-widest text-ink-secondary/60 mb-4 block">Veelgestelde vragen</span>
				<h3 class="text-2xl md:text-3xl font-bold tracking-tight mb-8">
					Over website laten maken in {city.name}
				</h3>
			</FadeIn>
			<div class="grid md:grid-cols-2 gap-6 md:gap-8">
				{city.faqs.map((faq, i) => (
					<FadeIn delay={i * 100}>
						<div class="space-y-2">
							<h4 class="font-bold">{faq.question}</h4>
							<p class="text-ink-secondary text-sm leading-relaxed">{faq.answer}</p>
						</div>
					</FadeIn>
				))}
			</div>
		</div>
	</section>
)}

<!-- CTA -->
<section class="py-16 md:py-24 px-6 md:px-12 lg:px-16">
	<div class="max-w-3xl mx-auto text-center">
		<FadeIn>
			<h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-6">
				Kan ik je ergens mee helpen?
			</h2>
			<p class="text-ink-secondary text-lg leading-relaxed mb-8">
				Vertel me over je bedrijf en ik denk met je mee. Kijken of het klikt.
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
```

---

### Task 3: Update webdesign-[city].astro hero and meta

**Files:**
- Modify: `src/pages/webdesign-[city].astro`

**Step 1: Update meta description (line 43)**

Replace:
```ts
const metaDescription = `Website laten maken in ${city}? Vanaf €495, klaar in 7 dagen. ✓ Uniek design ✓ Teksten inbegrepen ✓ Razendsnel. Lokale partner in ${cityData.region}.`;
```

With:
```ts
const metaDescription = `Website laten maken in ${city}? Ik bouw websites voor ondernemers. Persoonlijk contact, eerlijke prijzen. KNAP GEMAAKT. uit Buren, ${cityData.region}.`;
```

**Step 2: Update page title (line 46)**

Replace:
```ts
const pageTitle = `Website Laten Maken ${city} | €495 | KNAP GEMAAKT.`;
```

With:
```ts
const pageTitle = `Website Laten Maken ${city} | KNAP GEMAAKT.`;
```

**Step 3: Update hero trust elements (lines 81-85)**

Replace:
```html
<div class="flex flex-wrap items-center gap-4 text-sm text-ink-secondary">
    <span>Vanaf €495</span>
    <span>•</span>
    <span>Klaar in 7 dagen</span>
</div>
```

With:
```html
<div class="flex flex-wrap items-center gap-4 text-sm text-ink-secondary">
    <span>Persoonlijk contact</span>
    <span>•</span>
    <span>Vanuit Buren, {cityData.region}</span>
</div>
```

**Step 4: Update hero subtitle label (line 69-71)**

Replace:
```html
<div class="text-xs font-mono uppercase tracking-[0.2em] text-ink-secondary">
    [ Lokale Partner in {cityData.region} ]
</div>
```

With:
```html
<div class="text-xs font-mono uppercase tracking-[0.2em] text-ink-secondary">
    [ Webdesign in {cityData.region} ]
</div>
```

**Step 5: Update map overlay text (lines 111-119)**

Replace:
```html
<div class="font-mono uppercase tracking-[0.2em] text-accent text-xs mb-1">
    Lokale Partner
</div>
```

With:
```html
<div class="font-mono uppercase tracking-[0.2em] text-accent text-xs mb-1">
    Actief in
</div>
```

And remove the "& Omgeving" line (lines 117-119).

**Step 6: Commit structural changes**

```bash
git add src/data/cities.ts src/components/OfferLocalSEOSection.astro src/pages/webdesign-\[city\].astro
git commit -m "refactor: simplify city page structure, remove filler sections and hard prices"
```

---

### Task 4: Rewrite all city data

**Files:**
- Modify: `src/data/cities.ts:72-end` (all city entries)

**Step 1: Replace all city entries (after the interface) with the following**

Replace everything from `export const cities: Record<string, CityData> = {` to the end of the file with:

```ts
export const cities: Record<string, CityData> = {
	// ============================================
	// RIVIERENLAND REGION
	// ============================================

	culemborg: {
		name: "Culemborg",
		slug: "culemborg",
		region: "Rivierenland",
		nearbyAreas: ["Beusichem", "Everdingen", "Schalkwijk", "Leerdam"],
		relatedProject: "maatwerk-website-voor-fitcity-culemborg",

		heroSubheadline: "Ik zit in Buren, om de hoek. Dus als je een website nodig hebt, hoef je niet ver te zoeken.",

		localProof: "Ik zit in Buren, een kwartiertje rijden. Als er iets is, bel je me gewoon. Ik heb eerder de website van FitCity Culemborg gebouwd, dus ik ken de stad een beetje.",

		coffeeLocation: "Laten we afspreken in Culemborg of bij mij in Buren.",

		faqs: [
			{
				question: "Heb je eerder gewerkt in Culemborg?",
				answer: "Ja, ik heb de website van FitCity Culemborg gebouwd. Dus ik ken de stad. Maar eerlijk: of je nu in Culemborg zit of ergens anders, het werk is hetzelfde."
			},
			{
				question: "Wat kost een website bij jou?",
				answer: "Dat hangt af van wat je nodig hebt. Neem gerust contact op, dan denk ik met je mee. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "De meeste websites lever ik binnen een paar weken op. Soms sneller, hangt van het project af."
			},
			{
				question: "Waarom geen bureau in Utrecht?",
				answer: "Kan ook. Maar bij een bureau betaal je mee aan kantoor, vergaderingen en overhead. Bij mij betaal je voor het werk. En je hebt altijd dezelfde persoon aan de lijn."
			}
		],
	},

	tiel: {
		name: "Tiel",
		slug: "tiel",
		region: "Rivierenland",
		nearbyAreas: ["Zoelen", "Drumpt", "Kapel-Avezaath", "Wamel"],
		relatedProject: "maatwerk-website-voor-by-shakir",

		heroSubheadline: "Ik werk veel voor ondernemers uit Tiel. Persoonlijk contact, zonder bureau-gedoe.",

		localProof: "Vanuit Buren ben ik er zo. Ik heb de website van By Shakir in Tiel gemaakt, dus ik kom er regelmatig.",

		coffeeLocation: "Laten we ergens afspreken in Tiel, of kom langs in Buren.",

		faqs: [
			{
				question: "Ken je Tiel een beetje?",
				answer: "Ik heb de website van By Shakir in Tiel gemaakt en zit zelf in Buren, vlakbij. Dus ja, ik ken de regio."
			},
			{
				question: "Wat kost een website bij jou?",
				answer: "Dat hangt af van wat je nodig hebt. Neem gerust contact op, dan denk ik met je mee. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "De meeste websites lever ik binnen een paar weken op. Soms sneller, soms iets langer — hangt van het project af."
			},
			{
				question: "Waarom jou en niet een bureau?",
				answer: "Bij een bureau betaal je mee aan kantoor en overhead. Bij mij betaal je voor het werk zelf. En je hebt altijd dezelfde persoon aan de lijn — mij."
			}
		],
	},

	geldermalsen: {
		name: "Geldermalsen",
		slug: "geldermalsen",
		region: "Rivierenland",
		nearbyAreas: ["Beesd", "Meteren", "Deil", "Culemborg"],

		heroSubheadline: "Een goede website hoeft niet ingewikkeld te zijn. Ik regel het voor je, vanuit de buurt.",

		localProof: "Ik zit in Buren, om de hoek. De Betuwe is mijn thuisbasis — ik ken de ondernemers hier.",

		coffeeLocation: "Laten we afspreken in Geldermalsen of bij mij in Buren.",

		faqs: [
			{
				question: "Zit je in Geldermalsen?",
				answer: "Nee, in Buren — vlakbij. Maar dat maakt voor het werk niks uit. En als je een keer wilt afspreken kan dat gewoon."
			},
			{
				question: "Wat kost een website?",
				answer: "Dat hangt af van wat je nodig hebt. Neem contact op, dan denk ik met je mee. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "De meeste websites lever ik binnen een paar weken op. Soms sneller, hangt van het project af."
			}
		],
	},

	beesd: {
		name: "Beesd",
		slug: "beesd",
		region: "Rivierenland",
		nearbyAreas: ["Geldermalsen", "Rumpt", "Acquoy", "Leerdam"],

		heroSubheadline: "Klein dorp, maar je bedrijf verdient een goede website. Ik zit vlakbij.",

		localProof: "Beesd is vijf minuten rijden vanuit Buren. Ik ken de Betuwe en de ondernemers hier.",

		coffeeLocation: "Laten we afspreken — ik ben zo bij je.",

		faqs: [
			{
				question: "Werk je ook voor kleine bedrijven?",
				answer: "Juist. De meeste van mijn klanten zijn ondernemers die goed werk leveren maar geen zin hebben in bureau-gedoe. Groot of klein maakt me niet uit."
			},
			{
				question: "Wat kost een website?",
				answer: "Dat hangt af van wat je nodig hebt. Neem contact op, dan denk ik met je mee. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "De meeste websites lever ik binnen een paar weken op. Soms sneller, hangt van het project af."
			}
		],
	},

	buren: {
		name: "Buren",
		slug: "buren",
		region: "Rivierenland",
		nearbyAreas: ["Beusichem", "Maurik", "Zoelen", "Lienden"],

		heroSubheadline: "Ik bouw websites vanuit Buren. Langskomen voor een kop koffie? Kan gewoon.",

		localProof: "Ik zit hier. Letterlijk. Geen team, geen kantoor — gewoon mezelf, m'n bureau en te veel koffie. Langskomen kan altijd.",

		coffeeLocation: "Gewoon langskomen voor een kop koffie.",

		faqs: [
			{
				question: "Kan ik gewoon langskomen?",
				answer: "Ja, ik werk vanuit huis in Buren. Even bellen van tevoren is handig, maar verder: gewoon langskomen."
			},
			{
				question: "Wat kost een website bij jou?",
				answer: "Dat hangt af van wat je nodig hebt. Neem contact op, dan denk ik met je mee. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "De meeste websites lever ik binnen een paar weken op. Soms sneller, hangt van het project af."
			},
			{
				question: "Waarom geen bureau?",
				answer: "Bij een bureau betaal je mee aan kantoor, vergaderingen en overhead. Bij mij betaal je voor het werk. En je hebt altijd dezelfde persoon aan de lijn."
			}
		],
	},

	leerdam: {
		name: "Leerdam",
		slug: "leerdam",
		region: "Rivierenland",
		nearbyAreas: ["Schoonrewoerd", "Kedichem", "Asperen", "Culemborg"],

		heroSubheadline: "Ik bouw websites voor ondernemers die goed werk leveren. En dat doen ze in Leerdam.",

		localProof: "Ik zit in Buren, een klein stukje verderop. Ik werk veel voor ondernemers in het Rivierenland.",

		coffeeLocation: "Laten we ergens afspreken in Leerdam.",

		faqs: [
			{
				question: "Zit je in Leerdam?",
				answer: "Nee, in Buren — niet ver weg. Maar voor het werk maakt dat niks uit. Alles gaat digitaal, en als je wilt spreken we gewoon af."
			},
			{
				question: "Wat kost een website?",
				answer: "Dat hangt af van wat je nodig hebt. Neem contact op, dan denk ik met je mee. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "De meeste websites lever ik binnen een paar weken op. Soms sneller, hangt van het project af."
			}
		],
	},

	// ============================================
	// UTRECHT REGION
	// ============================================

	utrecht: {
		name: "Utrecht",
		slug: "utrecht",
		region: "Utrecht",
		nearbyAreas: ["De Bilt", "Houten", "Nieuwegein", "IJsselstein"],

		heroSubheadline: "Geen Utrechts bureau nodig. Ik bouw websites vanuit Buren — zelfde kwaliteit, persoonlijker contact.",

		localProof: "Ik zit in Buren, maar werk veel voor Utrechtse ondernemers. Alles gaat digitaal, en als je wilt kom ik graag een keer langs.",

		coffeeLocation: "Laten we een keer afspreken in Utrecht.",

		faqs: [
			{
				question: "Je zit niet in Utrecht?",
				answer: "Klopt, ik zit in Buren. Maar ik werk veel voor Utrechtse ondernemers. Het werk gaat digitaal, en als je wilt spreken we gewoon af in Utrecht."
			},
			{
				question: "Waarom geen Utrechts bureau?",
				answer: "Kan ook. Maar bij een bureau betaal je mee aan een kantoor in de binnenstad, vergaderingen en overhead. Bij mij betaal je voor het werk zelf."
			},
			{
				question: "Wat kost een website?",
				answer: "Dat hangt af van wat je nodig hebt. Neem contact op, dan denk ik met je mee. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "De meeste websites lever ik binnen een paar weken op. Soms sneller, soms iets langer — hangt van het project af."
			}
		],
	},

	houten: {
		name: "Houten",
		slug: "houten",
		region: "Utrecht",
		nearbyAreas: ["Bunnik", "Schalkwijk", "Culemborg", "Nieuwegein"],

		heroSubheadline: "Ik bouw websites voor ondernemers in Houten. Persoonlijk, eerlijk, gewoon goed werk.",

		localProof: "Ik zit in Buren, niet ver weg. Het meeste gaat digitaal, maar persoonlijk contact vind ik belangrijk.",

		coffeeLocation: "Laten we ergens afspreken, of bel me gewoon.",

		faqs: [
			{
				question: "Zit je in Houten?",
				answer: "Nee, in Buren — maar dat is niet ver. Het werk gaat digitaal, en als je een keer wilt afspreken kan dat gewoon."
			},
			{
				question: "Wat kost een website?",
				answer: "Dat hangt af van wat je nodig hebt. Neem contact op, dan denk ik met je mee. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "De meeste websites lever ik binnen een paar weken op. Soms sneller, hangt van het project af."
			}
		],
	},

	nieuwegein: {
		name: "Nieuwegein",
		slug: "nieuwegein",
		region: "Utrecht",
		nearbyAreas: ["IJsselstein", "Houten", "Utrecht", "Vianen"],

		heroSubheadline: "Een website die doet wat 'ie moet doen. Geen poespas, wel resultaat.",

		localProof: "Ik zit in Buren, een halfuurtje rijden. Persoonlijk contact, ook op afstand.",

		coffeeLocation: "Laten we ergens afspreken, of bel me gewoon.",

		faqs: [
			{
				question: "Zit je in Nieuwegein?",
				answer: "Nee, in Buren. Maar dat maakt voor het werk niks uit — alles gaat digitaal. En als je wilt spreken we gewoon af."
			},
			{
				question: "Wat kost een website?",
				answer: "Dat hangt af van wat je nodig hebt. Neem contact op, dan denk ik met je mee. Geen verplichtingen."
			},
			{
				question: "Waarom geen bureau in de buurt?",
				answer: "Bij een bureau betaal je mee aan kantoor en overhead. Bij mij betaal je voor het werk zelf. En je hebt altijd dezelfde persoon aan de lijn."
			}
		],
	},

	vianen: {
		name: "Vianen",
		slug: "vianen",
		region: "Utrecht",
		nearbyAreas: ["Lexmond", "Hagestein", "Leerdam", "Nieuwegein"],

		heroSubheadline: "Ik zit in Buren, vlakbij. Persoonlijk contact voor ondernemers in Vianen en omgeving.",

		localProof: "Vianen is vlakbij, langs de A2. Ik zit in Buren en werk veel voor ondernemers in de regio.",

		coffeeLocation: "Laten we afspreken in Vianen of Buren.",

		faqs: [
			{
				question: "Zit je in Vianen?",
				answer: "Nee, in Buren — maar dat is vlakbij. Als je wilt spreken we gewoon af in Vianen."
			},
			{
				question: "Wat kost een website?",
				answer: "Dat hangt af van wat je nodig hebt. Neem contact op, dan denk ik met je mee. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "De meeste websites lever ik binnen een paar weken op. Soms sneller, hangt van het project af."
			}
		],
	},

	ijsselstein: {
		name: "IJsselstein",
		slug: "ijsselstein",
		region: "Utrecht",
		nearbyAreas: ["Nieuwegein", "Lopik", "Montfoort", "Vianen"],

		heroSubheadline: "Een goede website voor je zaak in IJsselstein. Persoonlijk, eerlijk en gewoon goed gemaakt.",

		localProof: "Ik zit in Buren, niet ver weg. Het werk gaat digitaal, maar als je een keer wilt afspreken kan dat altijd.",

		coffeeLocation: "Laten we ergens afspreken, of bel me gewoon.",

		faqs: [
			{
				question: "Zit je in IJsselstein?",
				answer: "Nee, in Buren. Maar dat maakt voor het werk niks uit. Alles gaat digitaal, en als je wilt spreken we gewoon af."
			},
			{
				question: "Wat kost een website?",
				answer: "Dat hangt af van wat je nodig hebt. Neem contact op, dan denk ik met je mee. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "De meeste websites lever ik binnen een paar weken op. Soms sneller, hangt van het project af."
			}
		],
	},

	"wijk-bij-duurstede": {
		name: "Wijk bij Duurstede",
		slug: "wijk-bij-duurstede",
		region: "Utrecht",
		nearbyAreas: ["Cothen", "Langbroek", "Amerongen", "Bunnik"],

		heroSubheadline: "Ik bouw websites voor ondernemers in Wijk bij Duurstede en omgeving. Zonder gedoe.",

		localProof: "Ik zit in Buren, om de hoek. Persoonlijk contact is vanzelfsprekend.",

		coffeeLocation: "Laten we afspreken — ik zit vlakbij.",

		faqs: [
			{
				question: "Zit je in Wijk bij Duurstede?",
				answer: "Nee, in Buren — maar dat is vlakbij. Als je wilt spreken we gewoon af."
			},
			{
				question: "Wat kost een website?",
				answer: "Dat hangt af van wat je nodig hebt. Neem contact op, dan denk ik met je mee. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "De meeste websites lever ik binnen een paar weken op. Soms sneller, hangt van het project af."
			}
		],
	},

	// ============================================
	// BRABANT REGION
	// ============================================

	"den-bosch": {
		name: "Den Bosch",
		slug: "den-bosch",
		region: "Noord-Brabant",
		nearbyAreas: ["Rosmalen", "Vught", "Berlicum", "Engelen"],

		heroSubheadline: "Ik werk graag voor Bossche ondernemers. Persoonlijk, eerlijk, en geen bureau-gedoe.",

		localProof: "Ik zit in Buren, Gelderland. Iets verder weg, maar persoonlijk contact is voor mij het belangrijkst. Of het nu via een belletje of een kop koffie is.",

		coffeeLocation: "Laten we een keer afspreken in Den Bosch.",

		faqs: [
			{
				question: "Je zit niet in Den Bosch?",
				answer: "Klopt, ik zit in Buren, Gelderland. Maar ik werk voor ondernemers door heel Nederland. Het meeste gaat digitaal, en als je wilt kom ik een keer langs."
			},
			{
				question: "Waarom geen Brabants bureau?",
				answer: "Kan ook. Maar bij een bureau betaal je mee aan kantoor en overhead. Bij mij betaal je voor het werk zelf. En je hebt altijd dezelfde persoon aan de lijn."
			},
			{
				question: "Wat kost een website?",
				answer: "Dat hangt af van wat je nodig hebt. Neem contact op, dan denk ik met je mee. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "De meeste websites lever ik binnen een paar weken op. Soms sneller, soms iets langer — hangt van het project af."
			}
		],
	},

	rosmalen: {
		name: "Rosmalen",
		slug: "rosmalen",
		region: "Noord-Brabant",
		nearbyAreas: ["Den Bosch", "Berlicum", "Heesch", "Nistelrode"],

		heroSubheadline: "Een website die past bij jouw bedrijf in Rosmalen. Persoonlijk, eerlijk, goed gemaakt.",

		localProof: "Ik zit in Buren. Het meeste gaat digitaal, maar ik rij ook graag een keer langs als dat fijn is.",

		coffeeLocation: "Laten we een keer afspreken, of bel me gewoon.",

		faqs: [
			{
				question: "Zit je in Rosmalen?",
				answer: "Nee, in Buren, Gelderland. Maar dat maakt voor het werk niks uit. Alles gaat digitaal, en als je wilt spreken we gewoon af."
			},
			{
				question: "Wat kost een website?",
				answer: "Dat hangt af van wat je nodig hebt. Neem contact op, dan denk ik met je mee. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "De meeste websites lever ik binnen een paar weken op. Soms sneller, hangt van het project af."
			}
		],
	},

	oss: {
		name: "Oss",
		slug: "oss",
		region: "Noord-Brabant",
		nearbyAreas: ["Berghem", "Heesch", "Ravenstein", "Lith"],

		heroSubheadline: "Direct, eerlijk, en gewoon goed werk. Zo bouw ik websites voor ondernemers in Oss.",

		localProof: "Ik zit in Buren, Gelderland. Een stukje rijden, maar persoonlijk contact gaat prima op afstand.",

		coffeeLocation: "Laten we een keer bellen of afspreken.",

		faqs: [
			{
				question: "Je zit niet in Oss?",
				answer: "Klopt, ik zit in Buren. Maar het werk gaat digitaal en als je wilt spreken we gewoon af. Afstand is geen probleem."
			},
			{
				question: "Wat kost een website?",
				answer: "Dat hangt af van wat je nodig hebt. Neem contact op, dan denk ik met je mee. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "De meeste websites lever ik binnen een paar weken op. Soms sneller, hangt van het project af."
			}
		],
	},

	// ============================================
	// GELDERLAND (BEYOND RIVIERENLAND)
	// ============================================

	nijmegen: {
		name: "Nijmegen",
		slug: "nijmegen",
		region: "Gelderland",
		nearbyAreas: ["Lent", "Beuningen", "Wijchen", "Malden"],

		heroSubheadline: "Ik bouw websites voor Nijmeegse ondernemers. Persoonlijk contact, gewoon goed werk.",

		localProof: "Ik zit in Buren, niet zo ver weg als je denkt. Persoonlijk contact, ook als we niet in dezelfde stad zitten.",

		coffeeLocation: "Laten we een keer afspreken in Nijmegen.",

		faqs: [
			{
				question: "Je zit niet in Nijmegen?",
				answer: "Nee, in Buren — maar dat is niet ver. Ik werk voor ondernemers door heel Gelderland. Als je wilt spreken we gewoon af in Nijmegen."
			},
			{
				question: "Waarom geen Nijmeegs bureau?",
				answer: "Bij een bureau betaal je mee aan kantoor en overhead. Bij mij betaal je voor het werk zelf. En je hebt altijd dezelfde persoon aan de lijn."
			},
			{
				question: "Wat kost een website?",
				answer: "Dat hangt af van wat je nodig hebt. Neem contact op, dan denk ik met je mee. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "De meeste websites lever ik binnen een paar weken op. Soms sneller, soms iets langer — hangt van het project af."
			}
		],
	},

	// ============================================
	// SOUTH HOLLAND BORDER
	// ============================================

	gorinchem: {
		name: "Gorinchem",
		slug: "gorinchem",
		region: "Zuid-Holland",
		nearbyAreas: ["Hardinxveld-Giessendam", "Sleeuwijk", "Leerdam", "Vianen"],

		heroSubheadline: "Een website voor je bedrijf in Gorinchem. Persoonlijk contact, eerlijke prijzen.",

		localProof: "Ik zit in Buren, niet ver van Gorinchem. Persoonlijk contact, vanuit de regio.",

		coffeeLocation: "Laten we afspreken in Gorinchem of Buren.",

		faqs: [
			{
				question: "Zit je in Gorinchem?",
				answer: "Nee, in Buren — maar dat is niet ver. Als je wilt spreken we gewoon af in Gorinchem."
			},
			{
				question: "Wat kost een website?",
				answer: "Dat hangt af van wat je nodig hebt. Neem contact op, dan denk ik met je mee. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "De meeste websites lever ik binnen een paar weken op. Soms sneller, hangt van het project af."
			}
		],
	},
};

// Helper functions
export function getCityBySlug(slug: string): CityData | undefined {
	return cities[slug];
}

export function getAllCities(): CityData[] {
	return Object.values(cities);
}
```

**Step 2: Commit the data rewrite**

```bash
git add src/data/cities.ts
git commit -m "feat: rewrite all city page copy in personal ik-voice, remove filler content"
```

---

### Task 5: Build verification

**Step 1: Run the build**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors.

**Step 2: If build fails, fix any type errors**

Common issues:
- Other files referencing removed fields (unlikely — we checked, only `OfferLocalSEOSection.astro` uses them)
- Import issues with removed types (`CityStats`, `IndustryDetail`)

**Step 3: Check for any remaining references to removed fields**

Search for: `problemStatement`, `solutionStatement`, `priceComparison`, `industryDetails`, `CityStats`, `IndustryDetail`, `landmarks`, `population`, `\.stats`

If found, remove references.

**Step 4: Final commit if fixes were needed**

```bash
git add -A
git commit -m "fix: resolve build issues from city page rewrite"
```
