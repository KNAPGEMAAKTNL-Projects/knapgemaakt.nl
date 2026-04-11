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

	// --- Case study fields (from case-study-workflow.md) ---

	/** Results-driven H1 headline (used instead of title on the page) */
	resultHeadline?: string;
	/** Custom SEO title tag (50-55 chars, keyword front-loaded) */
	seoTitle?: string;
	/** Custom SEO meta description (140-155 chars) */
	seoDescription?: string;
	/** Project timeline: "Van eerste gesprek tot livegang in X weken" */
	timeline?: string;
	/** The strategic insight or discovery that shaped the project direction */
	ahaInsight?: string;
	/** What comes next for the client */
	nextSteps?: string;
	/** Date the case study was last updated (YYYY-MM-DD) */
	lastUpdated?: string;
	/** Industry-specific CTA text */
	industryCta?: string;
	/** FAQ questions and answers for the project page */
	faq?: { question: string; answer: string }[];
	/** Snapshot metadata shown in the bar below the hero */
	snapshot?: {
		services: string;
		keyResult: string;
	};
}

export const projects: Project[] = [
	{
		slug: "maatwerk-website-voor-fitcity-culemborg",
		title: "Fitcity Culemborg",
		category: "Live",
		industry: "Sportschool",
		location: "Culemborg",
		image: "/assets/projects/fitcityculemborg.webp",
		heroMockup: "/assets/projects/mockups/fitcity-culemborg.webp",
		overviewMockup: "/assets/projects/mockups/fitcity-culemborg.webp",
		link: "https://fitcityculemborg.nl/",
		shortDescription: "Een sportschool website met online ledenwerving.",
		fullDescription: `Fitcity Culemborg is de meest betaalbare sportschool van Culemborg. Vanaf €20,50 per maand, zeven dagen per week open, een Ladies Only zone en bokszaktraining twee keer per week. Veel voor weinig geld, dus.

Hun oude website deed dat aanbod alleen niet echt recht. De site was nog niet af en miste de informatie die bezoekers nodig hebben: geen prijzen, geen abonnementsoverzicht, en geen manier om je online in te schrijven. Terwijl mensen de sportschool wél vonden via Google.`,
		challenge: `Fitcity had al naamsbekendheid en een goede positie in Google. Maar de website zelf was nog niet ingericht om bezoekers verder te helpen. Iemand die "sportschool Culemborg" zocht, kwam wel op de site terecht, maar vond daar niet de informatie die je verwacht: prijzen, abonnementen, een manier om lid te worden.

Tegelijkertijd hebben de grote ketens als Basic-Fit en Anytime Fitness sites waar je in een paar klikken kunt inschrijven. Die verwachting nemen bezoekers mee. De sportschool verdiende een site die meekon met wat ze eigenlijk al te bieden hadden.`,
		solution: `De eerste keuze die ik maakte: prijzen op de homepage. Andere sportscholen verstoppen hun tarieven achter formulieren of laten je eerst bellen. Bij Fitcity is de prijs juist het sterkste verkoopargument, vanaf €20,50 per maand. Dat verstop je niet, dat zet je vooraan.

De tweede keuze was een compleet inschrijfsysteem. Geen contactformulier met "ik heb interesse", maar een systeem waar je als nieuw lid gewoon je gegevens invult en direct kunt starten. Bankgegevens worden veilig en versleuteld opgeslagen. De eigenaar beheert alles via een beveiligde omgeving die alleen voor hem toegankelijk is.

Verder: op je telefoon kun je direct bellen met één tik, de "Word Nu Lid" knop staat op elke pagina, en alle info die je als bezoeker zoekt (prijzen, openingstijden, trainingsaanbod) staat binnen twee scrolls.`,
		features: [
			"Online inschrijven: nieuwe leden kunnen direct lid worden via de site",
			"Beveiligd ledenbeheer voor de eigenaar",
			"Alle prijzen en abonnementen direct zichtbaar op de homepage",
			"Ladies Only zone en bokszaktraining apart uitgelicht",
			"Online proeftraining aanvragen",
			"Direct bellen met één tik op je telefoon",
			"Geen cookiebanner nodig dankzij privacy-vriendelijke analytics",
		],
		results: [
			"Nieuwe leden kunnen zich nu 24/7 online inschrijven",
			"Alle prijzen en abonnementen duidelijk zichtbaar",
			"Persoonsgegevens en bankgegevens veilig en versleuteld opgeslagen",
			"Geen cookiebanner nodig, geen irritatie voor bezoekers",
		],
		featured: true,
		targetAudience: "Budget-bewuste fitnessers in Culemborg en omgeving. Van jongeren die starten met fitness tot senioren die fit willen blijven. Vrouwen die een veilige trainingsomgeving zoeken (Ladies Only zone). Bokszak-liefhebbers op zoek naar groepstraining.",
		industryKeywords: [
			"website sportschool",
			"sportschool website laten maken",
			"fitness website",
			"gym website voorbeeld",
			"sportschool ledenwerving online",
			"betaalbare sportschool website",
		],
		technicalHighlights: [
			"Eigen inschrijfsysteem gebouwd, geen duur abonnement op externe software",
			"Bankgegevens van leden worden versleuteld opgeslagen",
			"Voldoet aan de privacywet (AVG)",
			"Geen cookies, geen cookiebanner",
			"Ontworpen voor telefoons eerst, want daar zoeken de meeste mensen",
		],
		industryContext: "De fitnessbranche is competitief. Potentiële leden vergelijken sportscholen online voordat ze langskomen. Een professionele website met transparante prijzen en een simpel aanmeldproces verlaagt de drempel om lid te worden. Lokale SEO is essentieel: 76% van lokale zoekopdrachten leidt binnen 24 uur tot contact. Budget-sportscholen moeten vooral communiceren op prijs, toegankelijkheid en resultaat, niet op luxe.",

		// Case study fields
		resultHeadline: "Sportschool Culemborg: van informatiesite naar online ledenwerving",
		seoTitle: "Website Sportschool Laten Maken | KNAP GEMAAKT.",
		seoDescription:
			"Bekijk hoe ik een sportschool website met online inschrijving maakte in Culemborg. Prijzen op de homepage en leden kunnen 24/7 lid worden.",
		ahaInsight:
			"Andere sportscholen verstoppen hun prijzen. Bij Fitcity is de prijs juist het sterkste verkoopargument, vanaf €20,50 per maand. Dat verstop je niet. Dat zet je op de homepage.",
		lastUpdated: "2026-04-11",
		industryCta: "Ook een website voor jouw sportschool?",
		snapshot: {
			services: "Website + ledenregistratiesysteem",
			keyResult: "24/7 online inschrijving",
		},
		faq: [
			{
				question: "Wat zit er allemaal bij zo'n website?",
				answer: "Bij Fitcity: de volledige site, online inschrijving, ledenbeheer, en een beveiligde omgeving voor de eigenaar. Elk project is anders. Neem gerust contact op, dan vertel ik je wat er bij jouw site zou zitten.",
			},
			{
				question: "Kan ik de website zelf aanpassen als er iets verandert?",
				answer: "Kleine wijzigingen zoals prijzen, openingstijden of teksten pas ik voor je aan. Stuur een appje of mail met wat er moet veranderen, dan regel ik het. Zo hoef je zelf niks technisch te doen.",
			},
			{
				question: "Hoe lang duurt het om zo'n website te maken?",
				answer: "Voor een sportschool website met inschrijfsysteem moet je rekenen op een paar weken. Dat hangt af van hoe snel we de teksten, foto's en gegevens rond hebben. Het bouwwerk zelf gaat snel, de voorbereiding kost de meeste tijd.",
			},
			{
				question: "Worden de gegevens van mijn leden veilig opgeslagen?",
				answer: "Ja. Bankgegevens en persoonsgegevens worden versleuteld opgeslagen en zijn alleen toegankelijk voor jou als eigenaar. De site voldoet aan de privacywet (AVG). De volledige privacyverklaring staat op de site.",
			},
		],
	},
	{
		slug: "maatwerk-website-voor-by-shakir",
		title: "By Shakir",
		category: "Concept",
		industry: "Luxe Interieur",
		location: "Tiel",
		image: "/assets/projects/byshakir.webp",
		mobileImage: "/assets/projects/byshakir-mobile.webp",
		heroMockup: "/assets/projects/mockups/by-shakir.webp",
		overviewMockup: "/assets/projects/mockups/by-shakir.webp",
		link: "https://byshakir.knapgemaakt.nl",
		shortDescription: "Geen meubelwinkel. Een designautoriteit.",
		fullDescription: `By Shakir | Metropolitan Luxury is geen meubelwinkel, het is een design autoriteit. Opgericht vanuit de missie om de Nederlandse markt iets anders te bieden dan standaard meubels. "Ik zag een gat in de markt. Overal meubelzaken die producten verkopen, maar niemand die visies verkocht," aldus oprichter Shakir.

Met meer dan 15 jaar ervaring creëert By Shakir complete interieurconcepten die brutalistisch architectonische elegantie combineren met de warmte van high-end hospitality. Van fotorealistische 3D-visualisatie tot volledige turnkey projectmanagement. Hun klanten zijn niet op zoek naar een bank. Ze zoeken een ervaring, een verhaal, een ruimte die emotioneel resoneert.`,
		challenge: `By Shakir wilde zich nadrukkelijk onderscheiden van de massa meubelretailers. De challenge: een website die "design authority" communiceert, niet "meubelwinkel". De internationale klantenkring (Nederland, België, Marokko) vraagt om een online presentatie die het niveau van hun fysieke showroom in Tiel evenaart.

In het premium interieur segment is de website vaak het eerste contactmoment. Klanten die investeren in maatwerk interieurs verwachten geen standaard WordPress template. De uitdaging was een digitale ervaring te creëren die de merkpositie "Metropolitan Luxury" onderstreept, waarbij elk detail (van typografie tot animaties) de premiumpositionering communiceert.`,
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
			"Showroom locatie in Tiel",
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
		industryContext: "In de luxe interieurbranche bepaalt de website de geloofwaardigheid. Klanten die investeren in interieurontwerp verwachten een online ervaring die het prijssegment rechtvaardigt. Een goedkope website wekt twijfel over de kwaliteit. Premium design bureaus moeten zich online positioneren als autoriteiten, niet als retailers. Storytelling, visuele excellentie en subtiele luxe zijn essentieel.",
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
