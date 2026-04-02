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

		coffeeLocation: "Laten we ergens afspreken in Culemborg.",

		faqs: [
			{
				question: "Heb je eerder gewerkt in Culemborg?",
				answer: "Ja, ik heb de website van FitCity Culemborg gebouwd. Dus ik ken de stad. Maar eerlijk: of je nu in Culemborg zit of ergens anders, het werk is hetzelfde."
			},
			{
				question: "Wat kost een website bij jou?",
				answer: "Geen grote investering vooraf. Je betaalt EUR 49 per maand, inclusief ontwerp, bouw, hosting en onderhoud. Neem gerust contact op, dan leg ik het uit."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "Een eenvoudige site kan al binnen een paar dagen klaar zijn. Grotere projecten duren een paar weken."
			},
			{
				question: "Waarom geen bureau in Utrecht?",
				answer: "Kan ook. Maar bij een bureau gaat een deel van je budget naar kantoorhuur en interne afstemming. Bij mij gaat alles naar de website zelf."
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

		coffeeLocation: "Laten we ergens afspreken in Tiel.",

		faqs: [
			{
				question: "Ken je Tiel een beetje?",
				answer: "Ik heb de website van By Shakir in Tiel gemaakt en zit zelf in Buren, vlakbij. Dus ja, ik ken de regio."
			},
			{
				question: "Wat kost een website bij jou?",
				answer: "EUR 49 per maand, alles inbegrepen. Ontwerp, bouw, hosting en onderhoud. Geen verborgen kosten, geen grote factuur vooraf."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Dat hangt van het project af. Een simpele bedrijfssite staat er snel, complexere projecten duren wat langer."
			},
			{
				question: "Waarom jou en niet een bureau?",
				answer: "Een bureau heeft meer kosten: kantoor, overleg, teamleden. Ik werk alleen, dus je betaalt puur voor het werk. En je belt altijd met mij."
			}
		],
	},

	geldermalsen: {
		name: "Geldermalsen",
		slug: "geldermalsen",
		region: "Rivierenland",
		nearbyAreas: ["Beesd", "Meteren", "Deil", "Culemborg"],

		heroSubheadline: "Een goede website hoeft niet ingewikkeld te zijn. Ik regel het voor je, vanuit de buurt.",

		localProof: "Ik zit in Buren, om de hoek. De Betuwe is mijn thuisbasis. Ik ken de ondernemers hier.",

		coffeeLocation: "Laten we ergens afspreken in Geldermalsen.",

		faqs: [
			{
				question: "Zit je in Geldermalsen?",
				answer: "Nee, in Buren. Vlakbij. Maar dat maakt voor het werk niks uit. En als je een keer wilt afspreken kan dat gewoon."
			},
			{
				question: "Wat kost een website?",
				answer: "Je betaalt een vast bedrag van EUR 49 per maand. Daar zit alles in: ontwerp, bouw, hosting en onderhoud. Vrijblijvend contact opnemen kost je niks."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "Een eenvoudige site kan al binnen een paar dagen klaar zijn. Grotere projecten duren een paar weken."
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

		coffeeLocation: "Laten we ergens afspreken. Ik ben zo bij je.",

		faqs: [
			{
				question: "Werk je ook voor kleine bedrijven?",
				answer: "Juist. De meeste van mijn klanten zijn ondernemers die goed werk leveren maar geen zin hebben in bureau-gedoe. Groot of klein maakt me niet uit."
			},
			{
				question: "Wat kost een website?",
				answer: "Geen grote investering vooraf. Je betaalt EUR 49 per maand, inclusief ontwerp, bouw, hosting en onderhoud. Neem gerust contact op, dan leg ik het uit."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Dat hangt van het project af. Een simpele bedrijfssite staat er snel, complexere projecten duren wat langer."
			}
		],
	},

	buren: {
		name: "Buren",
		slug: "buren",
		region: "Rivierenland",
		nearbyAreas: ["Beusichem", "Maurik", "Zoelen", "Lienden"],

		heroSubheadline: "Ik bouw websites vanuit Buren. Persoonlijk contact, gewoon goed werk.",

		localProof: "Ik zit hier. Letterlijk. Geen team, geen kantoor. Gewoon mezelf en m'n bureau. Als er iets is, bel je me gewoon.",

		coffeeLocation: "Laten we ergens afspreken in Buren.",

		faqs: [
			{
				question: "Hoe werkt het contact?",
				answer: "Gewoon bellen of mailen. Ik reageer persoonlijk, meestal binnen een dag. En als je wilt spreken we ergens af."
			},
			{
				question: "Wat kost een website bij jou?",
				answer: "EUR 49 per maand, alles inbegrepen. Ontwerp, bouw, hosting en onderhoud. Geen verborgen kosten, geen grote factuur vooraf."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "Een eenvoudige site kan al binnen een paar dagen klaar zijn. Grotere projecten duren een paar weken."
			},
			{
				question: "Waarom geen bureau?",
				answer: "Een bureau kan ook, maar dan betaal je mee aan kantoor en overhead. Bij mij is het simpeler: je betaalt voor het werk, en ik ben je vaste aanspreekpunt."
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
				answer: "Nee, in Buren. Een klein stukje verderop. Het meeste gaat digitaal, en als je een keer wilt afspreken kan dat prima."
			},
			{
				question: "Wat kost een website?",
				answer: "Je betaalt een vast bedrag van EUR 49 per maand. Daar zit alles in: ontwerp, bouw, hosting en onderhoud. Vrijblijvend contact opnemen kost je niks."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Dat hangt van het project af. Een simpele bedrijfssite staat er snel, complexere projecten duren wat langer."
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

		heroSubheadline: "Geen Utrechts bureau nodig. Ik bouw websites vanuit Buren. Zelfde kwaliteit, persoonlijker contact.",

		localProof: "Ik zit in Buren, maar werk veel voor Utrechtse ondernemers. Alles gaat digitaal, en als je wilt kom ik graag een keer langs.",

		coffeeLocation: "Laten we een keer afspreken in Utrecht.",

		faqs: [
			{
				question: "Je zit niet in Utrecht?",
				answer: "Klopt, ik zit in Buren. Maar ik werk veel voor Utrechtse ondernemers. Het werk gaat digitaal, en als je wilt spreken we gewoon af in Utrecht."
			},
			{
				question: "Waarom geen Utrechts bureau?",
				answer: "Kan ook. Maar bij een bureau gaat een deel van je budget naar kantoorhuur en teamoverleg. Bij mij gaat alles naar de website zelf."
			},
			{
				question: "Wat kost een website?",
				answer: "Geen grote investering vooraf. Je betaalt EUR 49 per maand, inclusief ontwerp, bouw, hosting en onderhoud. Neem gerust contact op, dan leg ik het uit."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Een eenvoudige site kan al binnen een paar dagen klaar zijn. Grotere projecten duren een paar weken."
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
				answer: "Nee, in Buren. Niet ver hiervandaan. Bijna alles gaat digitaal, maar ik maak graag een keer kennis als je dat fijn vindt."
			},
			{
				question: "Wat kost een website?",
				answer: "EUR 49 per maand, alles inbegrepen. Ontwerp, bouw, hosting en onderhoud. Geen verborgen kosten, geen grote factuur vooraf."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "Dat hangt van het project af. Een simpele bedrijfssite staat er snel, complexere projecten duren wat langer."
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
				answer: "Nee, in Buren. Maar voor het werk maakt dat niks uit. Bijna alles gaat digitaal, en een keer afspreken kan altijd."
			},
			{
				question: "Wat kost een website?",
				answer: "Je betaalt een vast bedrag van EUR 49 per maand. Daar zit alles in: ontwerp, bouw, hosting en onderhoud. Vrijblijvend contact opnemen kost je niks."
			},
			{
				question: "Waarom geen bureau in de buurt?",
				answer: "Bij een bureau betaal je ook voor het kantoor, het team en de afstemming. Bij mij gaat je budget naar de website. En je belt altijd met dezelfde persoon: mij."
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
				answer: "Nee, in Buren. Maar dat is vlakbij. Als je wilt spreken we gewoon af in Vianen."
			},
			{
				question: "Wat kost een website?",
				answer: "Geen grote investering vooraf. Je betaalt EUR 49 per maand, inclusief ontwerp, bouw, hosting en onderhoud. Neem gerust contact op, dan leg ik het uit."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Een eenvoudige site kan al binnen een paar dagen klaar zijn. Grotere projecten duren een paar weken."
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
				answer: "Nee, in Buren. Maar dat is geen probleem. Het werk gaat digitaal, en als je een keer wilt kennismaken kan dat gewoon."
			},
			{
				question: "Wat kost een website?",
				answer: "EUR 49 per maand, alles inbegrepen. Ontwerp, bouw, hosting en onderhoud. Geen verborgen kosten, geen grote factuur vooraf."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Dat hangt van het project af. Een simpele bedrijfssite staat er snel, complexere projecten duren wat langer."
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

		coffeeLocation: "Laten we ergens afspreken. Ik zit vlakbij.",

		faqs: [
			{
				question: "Zit je in Wijk bij Duurstede?",
				answer: "Nee, maar vlakbij. Ik zit in Buren. Als je een keer wilt afspreken zit ik zo bij je."
			},
			{
				question: "Wat kost een website?",
				answer: "Je betaalt een vast bedrag van EUR 49 per maand. Daar zit alles in: ontwerp, bouw, hosting en onderhoud. Vrijblijvend contact opnemen kost je niks."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Een eenvoudige site kan al binnen een paar dagen klaar zijn. Grotere projecten duren een paar weken."
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

		localProof: "Ik zit in Buren, Gelderland. Iets verder weg, maar persoonlijk contact is voor mij het belangrijkst. Gewoon even bellen of mailen.",

		coffeeLocation: "Laten we een keer afspreken in Den Bosch.",

		faqs: [
			{
				question: "Je zit niet in Den Bosch?",
				answer: "Klopt, ik zit in Buren, Gelderland. Maar ik werk voor ondernemers door heel Nederland. Het meeste gaat digitaal, en als je wilt kom ik een keer langs."
			},
			{
				question: "Waarom geen Brabants bureau?",
				answer: "Natuurlijk kan dat. Het verschil: bij mij betaal je niet mee aan een kantoor of teamoverleg. Je betaalt voor het werk. En ik ben je enige aanspreekpunt."
			},
			{
				question: "Wat kost een website?",
				answer: "Geen grote investering vooraf. Je betaalt EUR 49 per maand, inclusief ontwerp, bouw, hosting en onderhoud. Neem gerust contact op, dan leg ik het uit."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Dat hangt van het project af. Een simpele bedrijfssite staat er snel, complexere projecten duren wat langer."
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
				answer: "Nee, in Buren, Gelderland. Maar bijna alles gaat digitaal. En als je een keer wilt kennismaken, rij ik graag langs."
			},
			{
				question: "Wat kost een website?",
				answer: "EUR 49 per maand, alles inbegrepen. Ontwerp, bouw, hosting en onderhoud. Geen verborgen kosten, geen grote factuur vooraf."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Een eenvoudige site kan al binnen een paar dagen klaar zijn. Grotere projecten duren een paar weken."
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
				answer: "Klopt, ik zit in Buren. Het werk gaat digitaal. Als je wilt spreken we af, maar afstand is geen probleem."
			},
			{
				question: "Wat kost een website?",
				answer: "Je betaalt een vast bedrag van EUR 49 per maand. Daar zit alles in: ontwerp, bouw, hosting en onderhoud. Vrijblijvend contact opnemen kost je niks."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Dat hangt van het project af. Een simpele bedrijfssite staat er snel, complexere projecten duren wat langer."
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
				answer: "Nee, in Buren. Maar dat is niet ver. Ik werk voor ondernemers door heel Gelderland. Als je wilt spreken we gewoon af in Nijmegen."
			},
			{
				question: "Waarom geen Nijmeegs bureau?",
				answer: "Kan ook. Het verschil is dat ik geen kantoor of team heb. Je betaalt puur voor het werk. En je hebt altijd met mij te maken, niet steeds iemand anders."
			},
			{
				question: "Wat kost een website?",
				answer: "Geen grote investering vooraf. Je betaalt EUR 49 per maand, inclusief ontwerp, bouw, hosting en onderhoud. Neem gerust contact op, dan leg ik het uit."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Een eenvoudige site kan al binnen een paar dagen klaar zijn. Grotere projecten duren een paar weken."
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
				answer: "Nee, in Buren. Maar dat is niet ver hiervandaan. Als je een keer wilt afspreken kan dat in Gorinchem."
			},
			{
				question: "Wat kost een website?",
				answer: "EUR 49 per maand, alles inbegrepen. Ontwerp, bouw, hosting en onderhoud. Geen verborgen kosten, geen grote factuur vooraf."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Dat hangt van het project af. Een simpele bedrijfssite staat er snel, complexere projecten duren wat langer."
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
