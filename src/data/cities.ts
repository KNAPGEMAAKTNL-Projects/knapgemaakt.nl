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
				answer: "Hangt ervan af wat je wilt. Stuur me een berichtje en ik geef je een eerlijke inschatting. Kost je niks om te vragen."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "Reken op een paar weken. Soms gaat het sneller, hangt van het project af."
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
				answer: "Elke website is anders, dus er is geen standaardprijs. Vertel me wat je zoekt, dan geef ik je een eerlijk beeld."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Reken op een paar weken. Het hangt af van hoe groot het project is, maar ik hou je op de hoogte."
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
				answer: "Dat verschilt per project. Mail of bel me even, dan kijk ik wat bij je past. Vrijblijvend."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "Meestal een paar weken. Simpele sites soms sneller. Ik geef je vooraf een eerlijke planning."
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
				answer: "Iedere website is maatwerk, dus een vaste prijs heb ik niet. Neem contact op en ik geef je een eerlijke inschatting. Gewoon vrijblijvend."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Een paar weken is normaal. Bij een simpelere website kan het sneller. Dat bespreken we vooraf."
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
				answer: "Dat is voor elk project anders. Vertel me wat je zoekt en ik geef je een eerlijk beeld. Geen kleine lettertjes."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "Reken op twee tot vier weken. Soms gaat het sneller, hangt af van het project."
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
				answer: "Hangt van je wensen af. Neem contact op, dan kijk ik wat je nodig hebt. Vrijblijvend, gewoon even praten."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Meestal een weekje of twee, drie. Vooraf bespreken we de planning zodat je weet waar je aan toe bent."
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
				answer: "Verschilt per project. Bel of mail me, dan bespreek ik graag wat er mogelijk is. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Gemiddeld een paar weken. Ik geef je vooraf een realistische planning."
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
				answer: "Dat verschilt per website. Stuur me een berichtje met wat je zoekt, dan geef ik je een eerlijke inschatting."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "Dat hangt af van het project. Reken op een paar weken. Ik houd je op de hoogte van de voortgang."
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
				answer: "Iedere ondernemer heeft iets anders nodig, dus een vaste prijs heb ik niet. Neem contact op, dan denk ik met je mee. Kost niks om te vragen."
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
				answer: "Hangt af van wat je wilt. Even bellen of mailen is de snelste manier om erachter te komen. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "De meeste sites zijn binnen een paar weken klaar. Je krijgt vooraf een planning zodat je weet waar je aan toe bent."
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
				answer: "Dat bespreek ik liever persoonlijk. Neem contact op en ik geef je een eerlijk beeld van wat het kost. Vrijblijvend."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Een paar weken, soms korter. Hangt van de omvang af. Ik geef je vooraf een realistische inschatting."
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
				answer: "Elk project is anders. Mail me wat je in gedachten hebt, dan geef ik je een inschatting. Gewoon vrijblijvend."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Meestal twee tot drie weken. Simpele sites soms sneller. Ik plan het vooraf met je door."
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
				answer: "Verschilt per project. Laat me weten wat je zoekt en ik geef je een eerlijke inschatting. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Reken op een paar weken. Kan soms sneller, hangt van het project af. Ik geef je vooraf een planning."
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
				answer: "Hangt van het project af. Stuur me een berichtje en ik denk met je mee. Kost je niks om te vragen."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "De meeste projecten zijn binnen een paar weken af. Je krijgt vooraf een duidelijke planning."
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
				answer: "Dat verschilt. De beste manier om erachter te komen is even contact opnemen. Vrijblijvend, gewoon een gesprekje."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Reken op twee tot vier weken. Soms sneller. Ik spreek vooraf met je af wanneer je het kunt verwachten."
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
				answer: "Elk project is anders, dus een standaardprijs heb ik niet. Neem contact op en ik geef je een eerlijk beeld."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Gemiddeld een paar weken. Sommige projecten gaan sneller. Vooraf bespreken we de planning."
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
				answer: "Dat hangt van je wensen af. Bel of mail me, dan kijk ik wat bij je past. Geen verplichtingen."
			},
			{
				question: "Hoe lang duurt het?",
				answer: "Meestal ben ik er een paar weken mee bezig. Je weet vooraf wanneer je het kunt verwachten."
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
