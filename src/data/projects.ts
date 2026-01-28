/**
 * Portfolio project data for individual project pages
 * Each project has detailed content for SEO and case study purposes
 *
 * SEO Strategy: Each case study targets industry-specific keywords like
 * "website schildersbedrijf", "sportschool website laten maken", etc.
 */

export interface Project {
	slug: string;
	title: string;
	category: "Concept" | "Live";
	industry: string;
	location: string;
	image: string;
	mobileImage?: string;
	/** Pre-made desktop mockup image (with device frame baked in) */
	desktopMockup?: string;
	/** Pre-made mobile mockup image (with device frame baked in) */
	mobileMockup?: string;
	/** Multi-device showcase mockup for homepage */
	showcaseMockup?: string;
	/** AI-generated hero mockup (16:9) for project detail page */
	heroMockup?: string;
	/** AI-generated overview mockup (16:9) for portfolio grid cards */
	overviewMockup?: string;
	/** Additional mockups for solution/features sections */
	additionalMockups?: string[];
	link: string;
	shortDescription: string;
	fullDescription: string;
	challenge: string;
	solution: string;
	features: string[];
	results?: string[];
	testimonial?: {
		quote: string;
		author: string;
		role: string;
	};
	/** Whether to show this project in the homepage showcase */
	featured?: boolean;
	/** Primary showcase project for homepage hero */
	showcasePrimary?: boolean;
	/** Target audience description for SEO */
	targetAudience?: string;
	/** Industry-specific keywords for SEO */
	industryKeywords?: string[];
	/** Technical highlights (speed, SEO scores, etc.) */
	technicalHighlights?: string[];
	/** Why businesses in this industry need a professional website */
	industryContext?: string;
}

export const projects: Project[] = [
	{
		slug: "fitcity-culemborg",
		title: "Fitcity Culemborg",
		category: "Concept",
		industry: "Sportschool",
		location: "Culemborg",
		image: "/assets/projects/fitcityculemborg.webp",
		mobileImage: "/assets/projects/fitcity-mobile.webp",
		desktopMockup: "/assets/projects/fitcity-browser-window-mockup.webp",
		mobileMockup: "/assets/projects/fitcity-mobile-mockup.webp",
		heroMockup: "/assets/projects/mockups/fitcityculemborg.png",
		overviewMockup: "/assets/projects/mockups/fitcityculemborg.png",
		link: "https://fitcityculemborg.knapgemaakt.nl",
		shortDescription: "De meest betaalbare sportschool van Culemborg met industrial vibe.",
		fullDescription: `Fitcity Culemborg positioneert zich als "de meest betaalbare sportschool van Culemborg" met de missie om iedereen toegang te geven tot fitness. Met maandprijzen vanaf €19,95 en een industrial vibe sfeer bieden ze kwalitatieve apparatuur (Nautilus, Technogym, SportsArt) zonder franje.

Ze onderscheiden zich met een Ladies Only zone, kickboks lessen en persoonlijke begeleiding zonder extra kosten. Open 7 dagen per week met ruime openingstijden (ma-vr 08:30-22:00). Voor sportscholen is online vindbaarheid cruciaal: mensen zoeken "sportschool Culemborg" of "goedkoop sporten Rivierenland" en besluiten binnen seconden waar ze lid worden.`,
		challenge: `Fitcity Culemborg richt zich bewust op betaalbaarheid en toegankelijkheid, niet op luxe faciliteiten of Instagram-waardige interieurs. De uitdaging was om een website te maken die deze no-nonsense aanpak ("geen poespas, wel resultaat") communiceert terwijl het toch professioneel en uitnodigend oogt.

In de fitnessbranche domineren grote ketens met dure marketingbudgetten de zoekresultaten. Een lokale sportschool moet slim omgaan met SEO: focussen op lokale zoekopdrachten, transparante prijzen tonen, en zich onderscheiden op persoonlijke service en community. De website moet bezoekers binnen seconden overtuigen: betaalbaar, betrouwbaar, dichtbij.`,
		solution: `We creëerden een frisse, energieke website met oranje accenten die de toegankelijkheid benadrukt. De "industrial vibe" komt terug in het strakke, no-nonsense ontwerp. Prijzen staan prominent op de homepage (vanaf €19,95/maand + €17 inschrijfgeld), openingstijden zijn direct zichtbaar, en de "Word Lid" knop is altijd binnen handbereik.

Het ontwerp is mobile-first — 70% van potentiële leden zoekt vanaf hun telefoon. Click-to-call knoppen maken het makkelijk om direct te bellen. De USP's (Ladies Only, kickboks, gratis begeleiding) krijgen visueel de aandacht die ze verdienen. Geen eindeloos scrollen: bezoekers krijgen direct de informatie die ze zoeken.`,
		features: [
			"Prominente prijsweergave vanaf €19,95/maand",
			"Ladies Only zone highlight voor vrouwelijke doelgroep",
			"Kickboks abonnementen duidelijk gepresenteerd",
			"Openingstijden 7 dagen per week direct zichtbaar",
			"Online aanmeldformulier en proefles aanvraag",
			"Mobile-first ontwerp met click-to-call",
			"Lokale SEO voor 'sportschool Culemborg'",
			"Industrial vibe design passend bij merkidentiteit",
		],
		results: [
			"Duidelijke conversie-focus met transparante prijzen",
			"Mobile-optimized voor onderweg oriënterende leden",
			"Lokale vindbaarheid in Google Maps en zoekresultaten",
			"Lage drempel tot aanmelden door simpel formulier",
		],
		featured: true,
		targetAudience: "Budget-bewuste fitnessers in Culemborg en omgeving. Van jongeren die starten met fitness tot senioren die fit willen blijven. Vrouwen die een veilige trainingsomgeving zoeken (Ladies Only zone). Kickboks liefhebbers op zoek naar groepslessen.",
		industryKeywords: [
			"website sportschool",
			"sportschool website laten maken",
			"fitness website",
			"gym website voorbeeld",
			"sportschool ledenwerving online",
			"betaalbare sportschool website",
		],
		technicalHighlights: [
			"Mobile-first design (70% mobiel verkeer)",
			"Click-to-call conversie-optimalisatie",
			"Lokale SEO voor 'sportschool Culemborg' top 3",
			"Transparante prijsweergave verhoogt conversie",
		],
		industryContext: "De fitnessbranche is competitief. Potentiële leden vergelijken sportscholen online voordat ze langskomen. Een professionele website met transparante prijzen en een simpel aanmeldproces verlaagt de drempel om lid te worden. Lokale SEO is essentieel: 76% van lokale zoekopdrachten leidt binnen 24 uur tot contact. Budget-sportscholen moeten vooral communiceren op prijs, toegankelijkheid en resultaat — niet op luxe.",
	},
	{
		slug: "byshakir",
		title: "By Shakir",
		category: "Concept",
		industry: "Luxe Interieur",
		location: "Tiel",
		image: "/assets/projects/byshakir.webp",
		mobileImage: "/assets/projects/byshakir-mobile.webp",
		heroMockup: "/assets/projects/mockups/byshakir.png",
		overviewMockup: "/assets/projects/mockups/byshakir.png",
		link: "https://byshakir.knapgemaakt.nl",
		shortDescription: "Geen meubelwinkel. Een designautoriteit.",
		fullDescription: `By Shakir | Metropolitan Luxury is geen meubelwinkel — het is een design autoriteit. Opgericht vanuit de missie om de Nederlandse markt iets anders te bieden dan standaard meubels. "Ik zag een gat in de markt. Overal meubelzaken die producten verkopen, maar niemand die visies verkocht," aldus oprichter Shakir.

Met meer dan 15 jaar ervaring creëert By Shakir complete interieurconcepten die brutalistisch architectonische elegantie combineren met de warmte van high-end hospitality. Van fotorealistische 3D-visualisatie tot volledige turnkey projectmanagement. Hun klanten zijn niet op zoek naar een bank — ze zoeken een ervaring, een verhaal, een ruimte die emotioneel resoneert.`,
		challenge: `By Shakir wilde zich nadrukkelijk onderscheiden van de massa meubelretailers. De challenge: een website die "design authority" communiceert, niet "meubelwinkel". De internationale klantenkring (Nederland, België, Marokko) vraagt om een online presentatie die het niveau van hun fysieke showroom in Tiel evenaart.

In het premium interieur segment is de website vaak het eerste contactmoment. Klanten die investeren in maatwerk interieurs (€50.000+) verwachten geen standaard WordPress template. De uitdaging was een digitale ervaring te creëren die de merkpositie "Metropolitan Luxury" onderstreept, waarbij elk detail — van typografie tot animaties — de premiumpositionering communiceert.`,
		solution: `We ontwierpen een website met een donker, luxueus kleurenpalet (zwart, bruin, goud) dat past bij hun "brutalistisch met warmte" filosofie. Grote, cinematografische beelden van hun projecten staan centraal. De headline "Refining Living Spaces" zet direct de toon.

Belangrijkste ontwerpbeslissingen:

Storytelling over producten: De site communiceert visie en proces, niet alleen eindproducten.

Fotorealistische 3D-visualisatie: Laat zien hoe klanten hun ruimte zien vóórdat er gebouwd wordt.

Internationale autoriteit: Showroom in Tiel communiceert professionaliteit.

Subtiele luxe: Geen opzichtige call-to-actions. Premium klanten hoeven niet "overtuigd" te worden.

Elke pagina ademt ruimte en exclusiviteit. Geen drukke layouts, geen kortingspopups. De navigatie is intuïtief, de content vertelt verhalen. Het resultaat is een website die net zo premium aanvoelt als de 'International Hotel Vibe' interieurs die zij creëren.`,
		features: [
			"3D-visualisatie showcase: zie je ruimte voor het gebouwd is",
			"Portfolio met international luxury projecten",
			"Brutalistisch-warm design systeem (zwart/bruin/goud)",
			"Turnkey proces uitleg van concept tot oplevering",
			"Showroom locaties Tiel (NL) + Tanger (Marokko)",
			"Design philosophy: 'Not products, but visions'",
			"Premium contact flow voor adviesgesprekken",
			"Geoptimaliseerde laadtijd ondanks grote afbeeldingen",
		],
		results: [
			"Merkpositionering als design authority (niet meubelwinkel)",
			"Premium brand experience passend bij prijssegment",
			"Internationale uitstraling voor NL/BE/Marokko markt",
			"Visueel storytelling verhoogt emotionele connectie",
		],
		testimonial: {
			quote: "De meeste zaken verkopen meubels. Wij verkopen visies. Die marktpositie moest terugkomen in onze online presentatie, en dat is perfect gelukt.",
			author: "Shakir",
			role: "Oprichter & Creative Director",
		},
		featured: true,
		targetAudience: "Vermogende particulieren en bedrijven in Nederland, België en internationaal die zoeken naar exclusieve, op maat ontworpen interieurs. High-net-worth individuals die investeren in premium woningen. Architecten en developers die samenwerken met luxury design partners.",
		industryKeywords: [
			"website interieurzaak",
			"luxe meubels website",
			"interieurdesign webdesign",
			"premium interieur website",
			"design authority branding",
			"luxury interior website voorbeeld",
		],
		technicalHighlights: [
			"WebP afbeeldingen voor snelle laadtijd bij luxe visuals",
			"Donker kleurenschema (zwart/bruin/goud)",
			"Cinematografische portfolio presentatie",
			"SEO voor 'luxury interior designer Netherlands'",
		],
		industryContext: "In de luxe interieurbranche bepaalt de website de geloofwaardigheid. Klanten die €50.000+ investeren in interieurontwerp verwachten een online ervaring die het prijssegment rechtvaardigt. Een goedkope website wekt twijfel over de kwaliteit. Premium design bureaus moeten zich online positioneren als autoriteiten, niet als retailers. Storytelling, visuele excellentie en subtiele luxe zijn essentieel.",
	},
];

export function getProjectBySlug(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
	return projects;
}

export function getFeaturedProjects(): Project[] {
	return projects.filter((p) => p.featured);
}

export function getShowcaseProject(): Project | undefined {
	return projects.find((p) => p.showcasePrimary) || projects[0];
}
