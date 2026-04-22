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

Hun oude website deed dat aanbod alleen niet echt recht. De informatie die bezoekers nodig hebben stond er niet op: geen prijzen, geen abonnementsoverzicht en geen manier om je online in te schrijven. Terwijl mensen de sportschool wél vonden via Google.`,
		challenge: `Fitcity had al naamsbekendheid en een goede positie in Google. Maar de website zelf was nog niet ingericht om bezoekers verder te helpen. Iemand die "sportschool Culemborg" zocht, kwam wel op de site terecht, maar vond daar niet de informatie die je verwacht: prijzen, abonnementen, een manier om lid te worden.

Tegelijkertijd hebben de grote ketens als Basic-Fit en Anytime Fitness sites waar je in een paar klikken kunt inschrijven. Die verwachting nemen bezoekers mee. De sportschool verdiende een site die meekon met wat ze eigenlijk al te bieden hadden.`,
		solution: `De eerste keuze die ik maakte: prijzen op de homepage. Andere sportscholen verstoppen hun tarieven achter een contactformulier of laten je eerst bellen. Bij Fitcity is de prijs juist het sterkste verkoopargument, vanaf €20,50 per maand. Daar is geen reden om omheen te lopen.

De tweede keuze was een compleet inschrijfsysteem. Waar je bij de meeste sportscholen alleen je interesse kan kenbaar maken, kun je je hier direct als lid aanmelden. Bankgegevens zijn versleuteld opgeslagen, en alleen de eigenaar heeft toegang tot de ledenadministratie.

Verder: op je telefoon kun je direct bellen met één tik, de aanmeldknop staat op elke pagina, en alle info die je als bezoeker zoekt (prijzen, openingstijden, trainingsaanbod) is binnen twee scrolls te vinden.`,
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
				answer: "Bij Fitcity: de volledige site, online inschrijving, ledenbeheer en een beveiligde omgeving voor de eigenaar. Elk project is anders. Neem gerust contact op, dan vertel ik je wat er bij jouw site zou zitten.",
			},
			{
				question: "Kan ik de website zelf aanpassen als er iets verandert?",
				answer: "Kleine wijzigingen zoals prijzen, openingstijden of teksten pas ik voor je aan. Stuur een appje of mail met wat er moet veranderen, dan regel ik het. Zo hoef je zelf niks technisch te doen.",
			},
			{
				question: "Hoe lang duurt het om zo'n website te maken?",
				answer: "Voor een sportschool website met inschrijfsysteem moet je rekenen op een paar weken. Dat hangt af van hoe snel we de teksten, foto's en gegevens rond hebben. Het bouwen zelf gaat snel, de voorbereiding kost de meeste tijd.",
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
		shortDescription: "Project in ontwikkeling.",
		fullDescription: `Dit project is nog in ontwikkeling. Zodra we de oplevering in zicht hebben, delen we hier de volledige uitwerking: het doel van de opdracht, de aanpak en het eindresultaat.`,
		challenge: "Nog in ontwikkeling.",
		solution: "Nog in ontwikkeling.",
		features: [
			"Projectpagina wordt bijgewerkt na oplevering",
		],
		featured: false,
		targetAudience: "",
		industryKeywords: [],
		technicalHighlights: [],
		industryContext: "",
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
