/**
 * City data for local SEO pages
 * Each city has unique content to maximize SEO value (60-70% unique per page)
 *
 * STRUCTURE: Offer-first content with location as trust anchor
 * - heroSubheadline: 1-sentence value prop
 * - problemStatement: ~80 words, unique pain points for this city
 * - solutionStatement: ~80 words, how we solve their problems
 * - priceComparison: What local bureaus charge
 * - localProof: ~80 words, genuine local knowledge
 * - industryDetails: 3-4 industries with descriptions
 */

export interface FAQItem {
	question: string;
	answer: string;
}

export interface CityStats {
	/** Number of registered businesses/entrepreneurs */
	businesses?: string;
	/** Key industry or economic sector */
	mainIndustry?: string;
	/** Interesting local economic fact */
	economicFact?: string;
	/** Year the city was founded or received city rights */
	founded?: string;
}

export interface IndustryDetail {
	/** Industry name */
	name: string;
	/** 30-50 words on how a website helps this industry in this city */
	description: string;
}

export interface CityData {
	name: string;
	slug: string;
	region: string;
	nearbyAreas: string[];
	landmarks?: string;
	population?: string;
	stats?: CityStats;
	faqs: FAQItem[];
	relatedProject?: string;

	// === OFFER-FOCUSED CONTENT (new) ===

	/** Hero subheadline - what problem we solve for THIS city (1 sentence) */
	heroSubheadline: string;

	/** Problem narrative - pain points for businesses in this city (3-4 sentences, ~80 words) */
	problemStatement: string;

	/** Solution narrative - how our offer solves their problems (3-4 sentences, ~80 words) */
	solutionStatement: string;

	/** Price comparison - what local/regional bureaus charge (1 sentence) */
	priceComparison: string;

	/** Local proof - genuine local knowledge, why partnership matters (3-4 sentences, ~80 words) */
	localProof: string;

	/** Detailed industries with descriptions (3-4 industries) */
	industryDetails: IndustryDetail[];

	/** Coffee meeting location suggestion for CTA */
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
		population: "30.000 inwoners",
		nearbyAreas: ["Beusichem", "Everdingen", "Schalkwijk", "Leerdam"],
		landmarks: "Binnenpoort, Markt, Barbarakerk",
		stats: {
			businesses: "2.800+ ondernemers",
			mainIndustry: "Detailhandel & Horeca",
			economicFact: "De binnenstad telt meer dan 150 winkels en horecazaken op loopafstand",
			founded: "Stadsrechten sinds 1318"
		},
		relatedProject: "maatwerk-website-voor-fitcity-culemborg",

		// Offer-focused content
		heroSubheadline: "Professionele websites voor ondernemers die niet willen wachten op dure Utrechtse bureaus.",

		problemStatement: "Als ondernemer in Culemborg concurreer je met grotere steden. Klanten oriënteren zich online voordat ze lokaal kopen. Zonder website besta je niet voor nieuwe klanten. Met een trage of verouderde site verlies je bezoekers aan concurrenten die wél professioneel overkomen. Utrechtse bureaus vragen €2.000 tot €5.000 en laten je weken wachten.",

		solutionStatement: "Wij bouwen websites die laden in minder dan een seconde en goed scoren in Google. Binnen 7 dagen online, voor een vaste prijs van €495. Geen maanden wachten, geen verrassingen achteraf. Dezelfde kwaliteit als dure bureaus, zonder de overhead van een Utrechts kantoor.",

		priceComparison: "Utrechtse bureaus vragen €2.000 tot €5.000 voor een vergelijkbare website.",

		localProof: "Culemborg is onze thuisbasis. We kennen de Markt, weten dat Pavijen andere klanten trekt dan de binnenstad, en begrijpen wat werkt voor Culemborgse ondernemers. Die lokale kennis zit in elke website. En ja, je kunt gewoon langskomen voor een kop koffie.",

		industryDetails: [
			{
				name: "Horeca",
				description: "De binnenstad telt 150+ horecazaken. Een website die scoort op 'uit eten Culemborg' trekt gasten die online reserveren. We bouwen sites met menu's, reserveringssystemen en openingstijden die Google begrijpt."
			},
			{
				name: "Retail & Winkels",
				description: "Winkelend publiek oriënteert zich online. Openingstijden, assortiment, locatie: dat verwachten klanten op je website. We zorgen dat je gevonden wordt op 'winkel Culemborg' voordat bezoekers de deur uit gaan."
			},
			{
				name: "Gezondheid & Fitness",
				description: "Van sportscholen tot fysiotherapeuten: mensen zoeken 'sportschool Culemborg' voordat ze lid worden. FitCity is ons bewijs. We weten hoe je nieuwe leden trekt met een website die vertrouwen wekt."
			},
			{
				name: "Zakelijke Dienstverlening",
				description: "Coaches, adviseurs en ZZP'ers: een professionele website wekt vertrouwen voordat het eerste gesprek plaatsvindt. We bouwen sites die jouw expertise uitstralen zonder opschepperig te worden."
			}
		],

		coffeeLocation: "Laten we afspreken op de Markt.",

		faqs: [
			{
				question: "Waarom zou ik als Culemborgse ondernemer niet gewoon naar Utrecht gaan voor mijn website?",
				answer: "Utrechtse bureaus vragen €2.000 tot €5.000. Wij leveren dezelfde kwaliteit voor €495. Plus: wij kennen Culemborg. We weten dat de Markt andere klanten trekt dan bedrijventerrein Pavijen. Die kennis zit in je website."
			},
			{
				question: "Hebben jullie ervaring met horecazaken in Culemborg?",
				answer: "Ja. De binnenstad heeft meer dan 150 winkels en horecazaken. We hebben websites gebouwd voor restaurants, cafés en retailers in vergelijkbare settings. We weten hoe je gasten trekt die online zoeken naar 'uit eten Culemborg'."
			},
			{
				question: "Ik zit op bedrijventerrein Pavijen. Is een website dan nog relevant?",
				answer: "Zeker. B2B-klanten zoeken ook online. Een professionele website met goede vindbaarheid zorgt dat bedrijven uit de regio jou vinden. We optimaliseren voor zoektermen die jouw doelgroep gebruikt."
			},
			{
				question: "Jullie hebben FitCity Culemborg gemaakt. Werken jullie veel met sportscholen?",
				answer: "We hebben inderdaad de website van FitCity gebouwd. Voor sportscholen is online zichtbaarheid cruciaal: mensen zoeken 'sportschool Culemborg' en beslissen binnen seconden. Die ervaring zetten we graag in voor vergelijkbare bedrijven."
			},
			{
				question: "Ik concurreer met grotere ketens. Kan ik dat aan met een website van €495?",
				answer: "Absoluut. Culemborgers kiezen graag lokaal, maar ze verwachten wel een professionele uitstraling. Onze websites laden sneller en scoren beter in Google dan veel dure WordPress-sites van grote ketens."
			}
		],
	},

	tiel: {
		name: "Tiel",
		slug: "tiel",
		region: "Rivierenland",
		population: "42.000 inwoners",
		nearbyAreas: ["Zoelen", "Drumpt", "Kapel-Avezaath", "Wamel"],
		landmarks: "Fruitcorso, Flipje, Agnietenstraat",
		stats: {
			businesses: "3.800+ ondernemers",
			mainIndustry: "Retail & Food",
			economicFact: "Tiel trekt jaarlijks 100.000+ bezoekers naar de Fruitcorso",
			founded: "Stadsrechten sinds 1200"
		},
		relatedProject: "maatwerk-website-voor-by-shakir",

		heroSubheadline: "Websites die passen bij de ambitie van Tiel als regiocentrum van de Betuwe.",

		problemStatement: "Als ondernemer in Tiel bedien je niet alleen de stad, maar de hele regio. Inwoners uit Zoelen, Drumpt en Kapel-Avezaath komen naar Tiel voor aankopen. Maar ze oriënteren zich eerst online. Zonder sterke website mis je klanten die al op weg waren naar jou. Met 3.800 ondernemers is de concurrentie groot.",

		solutionStatement: "Wij bouwen websites die zowel Tielenaren als de wijde omgeving aanspreken. Geoptimaliseerd voor 'winkelen Tiel', 'restaurant Rivierenland' en vergelijkbare zoektermen. Binnen 7 dagen online, voor €495. Een website die meegroeit met je ambities.",

		priceComparison: "Lokale bureaus vragen €1.500 tot €4.000 voor een website.",

		localProof: "We kennen Tiel als regiocentrum. De Agnietenstraat, de Fruitcorso, Flipje: we begrijpen wat de stad bijzonder maakt. We bouwen websites voor ondernemers die ambitieus zijn maar met beide benen op de grond staan. Zoals het hoort in de Betuwe.",

		industryDetails: [
			{
				name: "Retail & Winkels",
				description: "De Agnietenstraat is het winkelhart. Mensen zoeken 'winkelen Tiel' voordat ze komen. Een website met je assortiment, openingstijden en locatie zorgt dat ze bij jou terechtkomen, niet bij de concurrent twee deuren verder."
			},
			{
				name: "Horeca & Catering",
				description: "Tiel is dé plek voor uit eten in de Betuwe. Een website die scoort op 'restaurant Tiel' trekt gasten uit de hele regio. We bouwen sites met menu's, sfeerbeelden en online reserveren."
			},
			{
				name: "Interieur & Design",
				description: "Voor premium producten is uitstraling alles. By Shakir is ons bewijs. Een website die kwaliteit uitstraalt trekt klanten die bereid zijn te betalen voor het beste. Geen kitsch, wel klasse."
			},
			{
				name: "Schoonheid & Verzorging",
				description: "Kappers, schoonheidssalons, nagelstudio's: mensen zoeken 'kapper Tiel' of 'beauty salon Rivierenland'. Een professionele website met foto's van je werk en online boeken maakt het verschil."
			}
		],

		coffeeLocation: "Laten we afspreken in het centrum bij de Agnietenstraat.",

		faqs: [
			{
				question: "Tiel is het centrum van de Betuwe. Bereik ik ook de omliggende dorpen?",
				answer: "Dat is precies het punt. Mensen uit Zoelen, Drumpt, Kapel-Avezaath zoeken online voordat ze naar Tiel komen. 'Kapper Tiel' of 'restaurant Rivierenland': met de juiste zoekwoorden vinden ze jou."
			},
			{
				question: "Jullie hebben By Shakir gemaakt. Werken jullie vaker met luxe winkels?",
				answer: "Ja. Voor premium producten is uitstraling alles. Een website die er goedkoop uitziet past niet bij een luxe interieurzaak. We weten hoe je kwaliteit uitstraalt online, zonder kitscherig te worden."
			},
			{
				question: "Ik zit in de Agnietenstraat. Hoe trek ik meer winkelend publiek?",
				answer: "Mensen zoeken 'winkelen Tiel' of specifieke producten voordat ze komen. Een website met je assortiment, openingstijden en locatie zorgt dat ze bij jou terechtkomen. Niet bij de concurrent."
			},
			{
				question: "De Fruitcorso trekt 100.000 bezoekers. Kan ik daar iets mee?",
				answer: "Absoluut. Bezoekers zoeken 'parkeren Tiel Fruitcorso' of 'eten Tiel centrum'. Een website die daarop scoort trekt klanten tijdens het evenement. We kunnen zelfs een speciale Fruitcorso-pagina maken."
			},
			{
				question: "Is €495 niet te goedkoop voor een professionele website?",
				answer: "We zijn efficiënt, niet goedkoop. Geen kantoor aan de Agnietenstraat, geen projectmanagers, geen weken vergaderen. Wel een website die er even goed uitziet als bij bureaus die €3.000 vragen. Kijk maar naar By Shakir."
			}
		],
	},

	geldermalsen: {
		name: "Geldermalsen",
		slug: "geldermalsen",
		region: "Rivierenland",
		population: "27.000 inwoners",
		nearbyAreas: ["Beesd", "Meteren", "Buurmalsen", "Deil"],
		landmarks: "Station Geldermalsen, Landgoed Doddendael",
		stats: {
			businesses: "2.400+ ondernemers",
			mainIndustry: "Agribusiness & Transport",
			economicFact: "Geldermalsen is een logistieke hub met IC-station en directe verbinding naar Randstad én Brabant",
			founded: "Gemeente West Betuwe sinds 2019"
		},

		heroSubheadline: "Nuchtere websites voor nuchtere Betuwse ondernemers. Geen gedoe, wel resultaat.",

		problemStatement: "De Betuwe kent een eigen mentaliteit: nuchter en wars van opsmuk. Maar klanten zoeken ook hier online. In het Rivierenland kiezen mensen graag lokaal, maar ze verwachten wel een professionele uitstraling. Zonder goede website verlies je klanten aan concurrenten uit Tiel of Utrecht die wél vindbaar zijn.",

		solutionStatement: "Wij maken websites die bij de Betuwse cultuur passen. Professioneel zonder pretentie, effectief zonder poespas. €495, binnen 7 dagen klaar, hosting inbegrepen. Geen gedoe, geen kleine lettertjes. Zo werken wij, zo werkt de Betuwe.",

		priceComparison: "Bureaus uit Utrecht of Den Bosch vragen €2.000 tot €5.000.",

		localProof: "Geldermalsen ligt centraal in de Betuwe met goede verbindingen naar alle kanten. Wij begrijpen dat ondernemers hier geen grote verhalen willen, maar resultaat. Station Geldermalsen brengt forenzen die lokale diensten zoeken. Die vinden jou als je website goed scoort.",

		industryDetails: [
			{
				name: "Schilders & Klussenbedrijven",
				description: "Schilders, loodgieters, timmerlieden: we weten hoe je website er moet uitzien om vertrouwen te wekken. Voorbeelden van je werk, duidelijke contactgegevens, vindbaar op 'schilder Geldermalsen'. Dat werkt."
			},
			{
				name: "Agrarisch",
				description: "Landwinkels, zorgboerderijen, loonwerkers: een website helpt je klanten buiten je directe netwerk te bereiken. Vooral voor nevenactiviteiten als recreatie of verkoop aan particulieren is online zichtbaarheid waardevol."
			},
			{
				name: "Transport & Logistiek",
				description: "Geldermalsen is een logistieke hub. B2B-klanten zoeken ook online naar transporteurs en logistieke dienstverleners. Een professionele website met je diensten en certificeringen maakt het verschil."
			},
			{
				name: "Ambachtelijke beroepen",
				description: "Vakmanschap verdient een website die dat uitstraalt. Foto's van je werk, referenties van tevreden klanten, en gevonden worden als mensen zoeken naar jouw specialisme in de regio."
			}
		],

		coffeeLocation: "Laten we afspreken bij het station of in Geldermalsen centrum.",

		faqs: [
			{
				question: "De Betuwe is nuchter. Geen verkooppraatjes dus?",
				answer: "Precies. €495 voor een website, binnen 7 dagen klaar, hosting inbegrepen. Geen gedoe, geen kleine lettertjes. Dat is het. Zo werken wij, zo werkt de Betuwe."
			},
			{
				question: "Werken jullie veel met ambachtslieden?",
				answer: "Ja. Schilders, loodgieters, timmerlieden: we weten hoe je website er moet uitzien om vertrouwen te wekken. Voorbeelden van je werk, duidelijke contactgegevens, en vindbaar op 'schilder Geldermalsen'. Dat werkt."
			},
			{
				question: "Ik bedien klanten in heel West Betuwe. Kan de website dat aan?",
				answer: "We optimaliseren voor de hele regio. Beesd, Meteren, Deil, Buurmalsen: mensen uit al die dorpen zoeken online. Met de juiste zoekwoorden bereik je ze allemaal."
			},
			{
				question: "Station Geldermalsen trekt forenzen. Kan ik die bereiken?",
				answer: "Slimme vraag. Forenzen zoeken lokale diensten online: kapper, garage, afhaalrestaurant. Een website die goed scoort op die zoektermen trekt klanten die elke dag langs je bedrijf rijden."
			},
			{
				question: "Agrarische sector is groot hier. Bouwen jullie ook voor boeren?",
				answer: "Ja. Landwinkels, zorgboerderijen, loonwerkers: een website helpt je om klanten buiten je directe netwerk te bereiken. Vooral voor nevenactiviteiten is online zichtbaarheid waardevol."
			}
		],
	},

	beesd: {
		name: "Beesd",
		slug: "beesd",
		region: "Rivierenland",
		population: "6.000 inwoners",
		nearbyAreas: ["Rumpt", "Gellicum", "Rhenoy", "Geldermalsen"],
		landmarks: "Hervormde Kerk, Dorpsstraat",
		stats: {
			businesses: "650+ ondernemers",
			mainIndustry: "Hoveniers & Groenvoorziening",
			economicFact: "Beesd ligt in het hart van de fruitteelt met meer dan 30% agrarische bedrijvigheid",
			founded: "Eerste vermelding 850 n.Chr."
		},

		heroSubheadline: "Ook in een klein dorp verdien je een professionele website die klanten uit de hele regio trekt.",

		problemStatement: "In Beesd kent iedereen elkaar. Maar nieuwe klanten niet. Mensen zoeken 'hovenier Betuwe' of 'timmerman West Betuwe' en vinden dan ondernemers die wél een website hebben. Zonder online aanwezigheid mis je klanten die buiten je directe netwerk zitten. Dat zijn er steeds meer.",

		solutionStatement: "Wij bouwen websites die passen bij de Betuwse nuchterheid. Professioneel maar toegankelijk. Geen grote-stadse uitstraling, wel een site die je vindbaarheid vergroot in de hele regio. €495, binnen 7 dagen klaar. Eén nieuwe klant en je hebt het terugverdiend.",

		priceComparison: "De meeste hoveniers in de Betuwe hebben geen website of een verouderde.",

		localProof: "Beesd ligt in het hart van de fruitteelt. Wij begrijpen dat ondernemers hier persoonlijk werken en waarde hechten aan reputatie. Een website versterkt die reputatie en maakt je vindbaar voor klanten uit Rumpt, Gellicum, Rhenoy en verder.",

		industryDetails: [
			{
				name: "Hoveniers & Tuincentra",
				description: "De meeste hoveniers in de Betuwe hebben geen website of een verouderde. Wie wél professioneel online staat, krijgt de klanten die Googelen. Dat zijn er steeds meer. Foto's van je projecten doen de rest."
			},
			{
				name: "Loonwerkers",
				description: "Agrarische dienstverleners bereiken met een website een breder publiek dan via mond-tot-mondreclame alleen. Vooral voor seizoenswerk maakt online vindbaarheid het verschil."
			},
			{
				name: "B&B's & Recreatie",
				description: "Toeristen zoeken 'overnachten Betuwe' of 'B&B fruitstreek'. Een website met foto's, prijzen en boekingsmogelijkheid trekt gasten die anders naar Booking gaan. Zonder 15-20% commissie."
			},
			{
				name: "Timmerlieden & Aannemers",
				description: "Vakmanschap verdient zichtbaarheid. Een portfolio van je projecten, referenties en vindbaar zijn op 'timmerman West Betuwe' levert opdrachten op die je anders mist."
			}
		],

		coffeeLocation: "Laten we afspreken in Beesd of Geldermalsen.",

		faqs: [
			{
				question: "Beesd is klein. Heeft een website hier wel zin?",
				answer: "Juist in een klein dorp. Iedereen kent je, maar nieuwe klanten niet. Mensen die zoeken naar 'hovenier Betuwe' of 'timmerman West Betuwe' vinden jou. Dat zijn klanten die je anders mist."
			},
			{
				question: "Veel hoveniers hier. Hoe onderscheid ik me?",
				answer: "Online aanwezigheid. De meeste hoveniers in de Betuwe hebben geen website of een verouderde. Wie wél professioneel online staat, krijgt de klanten die Googelen. Dat zijn er steeds meer."
			},
			{
				question: "Ik heb een B&B. Werkt dat met zo'n website?",
				answer: "Perfect. Toeristen zoeken 'overnachten Betuwe' of 'B&B fruitstreek'. Een website met foto's, prijzen en boekingsmogelijkheid trekt gasten die anders naar Booking gaan. Zonder commissie."
			},
			{
				question: "Mijn klanten komen uit de hele regio. Kan de website dat?",
				answer: "We optimaliseren voor Beesd én omgeving: Rumpt, Gellicum, Rhenoy, Geldermalsen. Mensen zoeken op regio, niet alleen op dorp. Die bredere dekking zit in de prijs."
			},
			{
				question: "Is €495 niet te veel voor een dorp als Beesd?",
				answer: "Eén nieuwe klant via je website en je hebt het terugverdiend. Een hovenier, timmerman of B&B-eigenaar haalt dat er binnen een maand uit. De vraag is niet of het te duur is, maar of je het kunt missen."
			}
		],
	},

	buren: {
		name: "Buren",
		slug: "buren",
		region: "Rivierenland",
		population: "3.000 inwoners",
		nearbyAreas: ["Beusichem", "Maurik", "Zoelen", "Lienden"],
		landmarks: "Museum Buren, Stadsmuur, Markt",
		stats: {
			businesses: "350+ ondernemers",
			mainIndustry: "Toerisme & Horeca",
			economicFact: "Buren was de geboorteplaats van Anna van Buren, stammoeder van het huis Oranje-Nassau",
			founded: "Stadsrechten sinds 1395"
		},

		heroSubheadline: "Een website die zowel toeristen als lokale klanten aantrekt in dit historische vestingstadje.",

		problemStatement: "Als ondernemer in Buren heb je een unieke positie: een historische setting die toeristen trekt, gecombineerd met een loyale lokale klantenkring. Maar toeristen beslissen ter plekke via hun telefoon. 'Restaurant Buren' of 'wat te doen Rivierenland': wie daar niet op scoort, mist gasten die al in het stadje zijn.",

		solutionStatement: "Wij bouwen websites die beide doelgroepen aanspreken. Modern design dat past bij het historische karakter. Geoptimaliseerd voor toeristische zoektermen én lokale vindbaarheid. €495, binnen 7 dagen online. Plus: je kunt gewoon langskomen voor een kop koffie.",

		priceComparison: "Bureaus uit Utrecht of Tiel vragen €1.500 tot €4.000.",

		localProof: "Wij zitten zelf in Buren. We kennen het stadje, de ondernemers, de sfeer. We weten dat Buren anders is dan Tiel of Utrecht. Die kennis zit in de websites die we bouwen. Persoonlijk contact, korte lijnen, geen gedoe.",

		industryDetails: [
			{
				name: "Restaurants & Cafés",
				description: "Toeristen zoeken 'restaurant Buren' of 'lunch Rivierenland' voordat ze komen. Een website met menu, sfeerbeelden en openingstijden trekt gasten die je anders mist. Vooral dagjesmensen beslissen ter plekke."
			},
			{
				name: "Kunst & Antiek",
				description: "Modern en klassiek gaan prima samen. Een strakke website met mooie foto's van je collectie straalt kwaliteit uit. Mensen verwachten tegenwoordig online te kunnen kijken voordat ze langskomen."
			},
			{
				name: "Bed & Breakfasts",
				description: "Met eigen boekingen verdien je meer dan via Booking. Een website met directe boekingsmogelijkheid bespaart je 15-20% commissie. Gasten die 'B&B Buren' zoeken, willen vaak juist niet via platforms."
			},
			{
				name: "Ambachtelijke producten",
				description: "Streekproducten, handwerk, lokale specialiteiten: een website met je verhaal en producten bereikt klanten die waarde hechten aan authentiek en lokaal. De Betuwe verkoopt."
			}
		],

		coffeeLocation: "Je kunt gewoon langskomen voor een kop koffie in Buren.",

		faqs: [
			{
				question: "Buren trekt toeristen. Hoe vind ik die online?",
				answer: "Toeristen zoeken 'restaurant Buren' of 'wat te doen Rivierenland' voordat ze komen. Een website die daarop scoort trekt gasten die je anders mist. Vooral dagjesmensen beslissen ter plekke via hun telefoon."
			},
			{
				question: "Ik heb een antiekzaak. Past een moderne website daarbij?",
				answer: "Modern en klassiek gaan prima samen. Een strakke website met mooie foto's van je collectie straalt kwaliteit uit. Dat past bij antiek. Mensen verwachten online te kunnen kijken voordat ze langskomen."
			},
			{
				question: "Mijn B&B moet concurreren met Booking en Airbnb. Kan dat?",
				answer: "Met eigen boekingen verdien je meer. Een website met directe boekingsmogelijkheid bespaart je 15-20% commissie. Gasten die 'B&B Buren' zoeken, willen vaak juist niet via Booking."
			},
			{
				question: "Buren is klein. Bereik ik ook mensen van buiten?",
				answer: "Dat is het punt. Lokale klanten kennen je al. Een website trekt bezoekers uit Beusichem, Maurik, Lienden en toeristen uit heel Nederland. Dat zijn klanten die je zonder website niet vindt."
			},
			{
				question: "Jullie zitten zelf in Buren. Voordeel?",
				answer: "We kennen het stadje, de ondernemers, de sfeer. We weten dat Buren anders is dan Tiel of Utrecht. Die kennis zit in de websites die we bouwen. Plus: je kunt gewoon langskomen voor een kop koffie."
			}
		],
	},

	leerdam: {
		name: "Leerdam",
		slug: "leerdam",
		region: "Rivierenland",
		population: "22.000 inwoners",
		nearbyAreas: ["Schoonrewoerd", "Acquoy", "Asperen", "Culemborg"],
		landmarks: "Glasstad, Nationaal Glasmuseum, Lingedijk",
		stats: {
			businesses: "2.100+ ondernemers",
			mainIndustry: "Glasindustrie & Maakindustrie",
			economicFact: "Leerdam staat internationaal bekend als Glasstad met een rijke traditie in glasontwerp en -productie",
			founded: "Stadsrechten sinds 1407"
		},

		heroSubheadline: "Websites die de ambachtelijke traditie van de Glasstad combineren met moderne online zichtbaarheid.",

		problemStatement: "Leerdam heeft een unieke identiteit als Glasstad. Maar klanten oriënteren zich online, ook hier. Zonder website verlies je bezoekers aan concurrenten in Culemborg of Gorinchem die wél vindbaar zijn. De ambachtelijke traditie van Leerdam verdient een professionele online uitstraling.",

		solutionStatement: "Wij bouwen websites die passen bij ondernemers met ambacht en kwaliteit. Modern design, snelle laadtijden, goed vindbaar in Google. €495, binnen 7 dagen online. Een website die je vakmanschap laat zien aan klanten uit de hele regio.",

		priceComparison: "Bureaus uit Utrecht of Gorinchem vragen €2.000 tot €5.000.",

		localProof: "Leerdam ligt strategisch tussen Utrecht, Gorinchem en Culemborg. Wij begrijpen de ambachtelijke mentaliteit van de Glasstad en bouwen websites die kwaliteit uitstralen. Geen opsmuk, wel resultaat.",

		industryDetails: [
			{
				name: "Ambacht & Maakindustrie",
				description: "Leerdam kent een rijke traditie in vakmanschap. Een website met portfolio, werkproces en referenties toont je kwaliteit aan klanten die online zoeken naar specialisten in de regio."
			},
			{
				name: "Retail & Speciaalzaken",
				description: "De binnenstad heeft karakteristieke winkels. Een website met assortiment en openingstijden trekt klanten die zoeken naar 'winkelen Leerdam' of specifieke producten."
			},
			{
				name: "Horeca",
				description: "Bezoekers van het Glasmuseum zoeken lokale horeca. Een website die scoort op 'restaurant Leerdam' of 'lunch Glasstad' trekt deze gasten naar jouw zaak."
			},
			{
				name: "Zakelijke Dienstverlening",
				description: "Accountants, adviseurs en ZZP'ers in Leerdam bedienen vaak de hele regio. Een professionele website vergroot je bereik naar Culemborg, Gorinchem en verder."
			}
		],

		coffeeLocation: "Laten we afspreken in het centrum van Leerdam.",

		faqs: [
			{
				question: "Leerdam is bekend als Glasstad. Hoe bereik ik bezoekers van het museum?",
				answer: "Toeristen zoeken 'restaurant Leerdam' of 'wat te doen Glasstad' na hun museumbezoek. Een website die daarop scoort trekt gasten die al in de stad zijn en iets zoeken."
			},
			{
				question: "Ik heb een ambachtelijk bedrijf. Past een moderne website daarbij?",
				answer: "Juist. Vakmanschap verdient een website die dat uitstraalt. Modern design met foto's van je werk, je proces en referenties. Kwaliteit online tonen trekt klanten die kwaliteit waarderen."
			},
			{
				question: "Mijn klanten komen uit de hele regio. Bereik ik die?",
				answer: "We optimaliseren voor Leerdam én omgeving: Culemborg, Gorinchem, Asperen, Schoonrewoerd. Mensen zoeken op dienst + regio. Met de juiste zoekwoorden bereik je ze allemaal."
			},
			{
				question: "Leerdam ligt tussen grotere steden. Hoe val ik op?",
				answer: "Online zichtbaarheid. Veel ondernemers in Leerdam hebben geen website of een verouderde. Wie wél professioneel online staat, krijgt de klanten die Googelen voordat ze kiezen."
			},
			{
				question: "Is €495 realistisch voor een goede website?",
				answer: "Absoluut. Wij zijn efficiënt: geen duur kantoor, geen weken vergaderen. Wel een snelle, moderne website die er professioneel uitziet. Eén nieuwe klant en je hebt het terugverdiend."
			}
		],
	},

	// ============================================
	// REGIO UTRECHT
	// ============================================

	utrecht: {
		name: "Utrecht",
		slug: "utrecht",
		region: "Regio Utrecht",
		population: "360.000 inwoners",
		nearbyAreas: ["De Bilt", "Zeist", "Bunnik", "Maarssen"],
		landmarks: "Domtoren, Oudegracht, Neude",
		stats: {
			businesses: "45.000+ ondernemers",
			mainIndustry: "Creatieve sector & Tech",
			economicFact: "Utrecht is de snelst groeiende startup-hub van Nederland na Amsterdam",
			founded: "Stadsrechten sinds 1122"
		},

		heroSubheadline: "Dezelfde kwaliteit als Utrechtse bureaus, zonder de overhead van een kantoor aan de Oudegracht.",

		problemStatement: "In Utrecht is de concurrentie groot. 45.000 ondernemers strijden om de aandacht van dezelfde doelgroep. Utrechtse bureaus vragen €3.000 tot €8.000 voor een website en laten je weken wachten. Maar je hebt geen duur bureau nodig om professioneel over te komen. Je hebt een website nodig die werkt.",

		solutionStatement: "Wij leveren hetzelfde resultaat voor €495. Zonder de vergaderingen, zonder de wachttijden. Een website die snel laadt, goed vindbaar is, en binnen 7 dagen online staat. Perfect voor startups, ZZP'ers en ondernemers die niet willen wachten op een duur bureau.",

		priceComparison: "Utrechtse bureaus rekenen €3.000 tot €8.000 voor een website.",

		localProof: "Utrecht kent vele gezichten: van horeca langs de Oudegracht tot creatieve bureaus op de Wharf, van ZZP'ers in Lombok tot retailers in Hoog Catharijne. Wij bouwen websites die passen bij jouw specifieke Utrechtse doelgroep, zonder de prijzen van een kantoor in de binnenstad.",

		industryDetails: [
			{
				name: "Startups",
				description: "Juist voor startups is €495 ideaal. Snel een professionele uitstraling zonder je runway op te branden. Later uitbreiden kan altijd. Veel Utrechtse startups beginnen zo."
			},
			{
				name: "Creatieve bureaus",
				description: "Je doelgroep kijkt kritisch naar design. Wij bouwen websites die je portfolio ondersteunen, niet overschaduwen. Snel, strak, en goed vindbaar op 'grafisch ontwerper Utrecht'."
			},
			{
				name: "Horeca",
				description: "De Oudegracht, Neude, Voorstraat: Utrecht heeft een bruisende horecascene. Een website met menu, sfeer en online reserveren trekt gasten die zoeken naar 'restaurant Utrecht'."
			},
			{
				name: "Consultancy & Coaching",
				description: "Zakelijke dienstverleners bouwen vertrouwen met een professionele website. Geen opsmuk, wel duidelijk wat je doet en voor wie. Vindbaar op de zoektermen die jouw klanten gebruiken."
			}
		],

		coffeeLocation: "Laten we afspreken in Utrecht centrum of kom naar ons in Culemborg.",

		faqs: [
			{
				question: "Waarom zou ik niet gewoon een Utrechts bureau inhuren?",
				answer: "Utrechtse bureaus rekenen €3.000 tot €8.000 voor een website. Ze hebben mooie kantoren aan de Oudegracht en veel overhead. Wij leveren hetzelfde resultaat voor €495. Zonder de vergaderingen, zonder de wachttijden."
			},
			{
				question: "Ik ben een startup met beperkt budget. Is €495 realistisch?",
				answer: "Juist voor startups is dit ideaal. Je hebt snel een professionele uitstraling zonder je runway op te branden aan een dure website. Later uitbreiden kan altijd. Veel Utrechtse startups beginnen zo."
			},
			{
				question: "Mijn doelgroep zit in de creatieve sector. Snappen jullie dat?",
				answer: "We bouwen websites voor creatieve bureaus, freelancers en consultants. We weten dat je doelgroep kritisch kijkt naar design en dat je website je portfolio moet ondersteunen, niet overschaduwen."
			},
			{
				question: "Hoe val ik op tussen 45.000 andere Utrechtse ondernemers?",
				answer: "Door beter vindbaar te zijn. We optimaliseren voor zoektermen die jouw klanten gebruiken. 'Grafisch ontwerper Utrecht Lombok' is specifieker dan 'designer Utrecht'. Dat soort nuances maken het verschil."
			},
			{
				question: "Ik zit op het Utrecht Science Park. Werken jullie daar ook?",
				answer: "Ja. Van tech-startups tot consultancies op het Science Park: we kennen de dynamiek van snelgroeiende bedrijven. Een website die meegroeit is belangrijker dan een website die nu al alles kan."
			}
		],
	},

	houten: {
		name: "Houten",
		slug: "houten",
		region: "Regio Utrecht",
		population: "50.000 inwoners",
		nearbyAreas: ["Bunnik", "'t Goy", "Schalkwijk", "Nieuwegein"],
		landmarks: "Het Rond, Castellum Hoge Woerd, Rondweg",
		stats: {
			businesses: "4.500+ ondernemers",
			mainIndustry: "Zakelijke dienstverlening",
			economicFact: "Houten groeide van 4.000 naar 50.000 inwoners in 40 jaar",
			founded: "Nieuwe stad sinds 1966"
		},

		heroSubheadline: "Websites voor ZZP'ers en lokale ondernemers die waarde hechten aan kwaliteit boven de laagste prijs.",

		problemStatement: "Houtenaren zijn loyaal aan lokale ondernemers, maar verwachten wel een professionele uitstraling. Mond-tot-mondreclame wordt versterkt via Facebook-groepen en Nextdoor. Als iemand je aanbeveelt, zoeken geïnteresseerden je online op. Zonder website verlies je die potentiële klant aan een concurrent die wél professioneel overkomt.",

		solutionStatement: "Wij bouwen websites die passen bij de Houtense verwachting: kwaliteit en betrouwbaarheid. €495, binnen 7 dagen online. Een professionele website maakt van elke aanbeveling een potentiële klant. Geoptimaliseerd voor 'kapper Houten', 'coach Houten' en vergelijkbare lokale zoektermen.",

		priceComparison: "Bureaus uit Utrecht vragen €2.000 tot €5.000.",

		localProof: "Van het winkelcentrum Het Rond tot de bedrijventerreinen Doornkade en Loerik: Houten heeft een eigen dynamiek. Wij begrijpen dat Houtenaren waarde hechten aan kwaliteit en betrouwbaarheid. Die verwachting vertalen we naar een website.",

		industryDetails: [
			{
				name: "ZZP & Freelancers",
				description: "Coaches, trainers, consultants: we bouwen regelmatig websites voor zelfstandigen die een professionele uitstraling willen zonder groot budget. €495 past bij de ZZP-realiteit."
			},
			{
				name: "Coaches & Trainers",
				description: "Een professionele website wekt vertrouwen voordat het eerste gesprek plaatsvindt. Duidelijk wat je doet, voor wie, en hoe contact op te nemen. Vindbaar op 'coach Houten'."
			},
			{
				name: "Kinderopvang",
				description: "Houten is een jonge gemeente met veel gezinnen. Een website die vertrouwen wekt en praktische info biedt (locatie, openingstijden, inschrijving) maakt het verschil voor ouders die kiezen."
			},
			{
				name: "Bouw & Verbouw",
				description: "Aannemers en klussenbedrijven worden steeds vaker online gezocht. Een portfolio van projecten en referenties overtuigt opdrachtgevers die zoeken naar 'aannemer Houten'."
			}
		],

		coffeeLocation: "Laten we afspreken bij Het Rond of in Culemborg.",

		faqs: [
			{
				question: "Houten heeft veel ZZP'ers. Passen jullie websites bij die doelgroep?",
				answer: "Precies onze focus. Coaches, trainers, consultants: we bouwen regelmatig websites voor zelfstandigen die een professionele uitstraling willen zonder groot budget. €495 past bij de ZZP-realiteit."
			},
			{
				question: "Houtenaren delen veel via Facebook en Nextdoor. Helpt een website dan nog?",
				answer: "Juist dan. Als iemand je aanbeveelt in een Houtense Facebook-groep, zoeken geïnteresseerden je online op. Een professionele website maakt van die aanbeveling een klant. Zonder website verlies je die kans."
			},
			{
				question: "Ik zit bij Het Rond. Hoe bereik ik klanten die online zoeken?",
				answer: "We optimaliseren je website voor lokale zoekopdrachten. Iemand die zoekt naar 'kapper Houten' of 'fysiotherapeut Het Rond' vindt jou. Dat is de kracht van lokale SEO."
			},
			{
				question: "Werken jullie ook voor kinderdagverblijven en BSO's?",
				answer: "Ja. Houten is een jonge gemeente met veel gezinnen. Kinderopvang is competitief hier. Een website die vertrouwen wekt en praktische info biedt maakt het verschil voor ouders."
			},
			{
				question: "Mijn klanten zitten vooral in Houten zelf. Is landelijke vindbaarheid relevant?",
				answer: "We focussen op wat voor jou werkt. Voor lokale dienstverleners optimaliseren we specifiek voor Houten en directe omgeving: Bunnik, Schalkwijk, 't Goy. Geen verspilde energie aan bezoekers die nooit klant worden."
			}
		],
	},

	nieuwegein: {
		name: "Nieuwegein",
		slug: "nieuwegein",
		region: "Regio Utrecht",
		population: "65.000 inwoners",
		nearbyAreas: ["IJsselstein", "Utrecht", "Houten", "Vianen"],
		landmarks: "City Plaza, Fort Vreeswijk, Stadsplein",
		stats: {
			businesses: "6.200+ ondernemers",
			mainIndustry: "MKB & Groothandel",
			economicFact: "Nieuwegein heeft meer dan 35 hectare aan bedrijventerreinen met directe A2/A27 toegang",
			founded: "Gemeente sinds 1971"
		},

		heroSubheadline: "Praktische websites voor praktische ondernemers. Geen gedoe, binnen 7 dagen online.",

		problemStatement: "Nieuwegein is praktisch ingesteld. Ondernemers hier willen resultaat, geen eindeloze vergaderingen. Met City Plaza als winkelhart en 35 hectare bedrijventerreinen is de concurrentie groot. Online zichtbaarheid bepaalt of klanten uit Utrecht en omgeving jouw bedrijf vinden of naar de concurrent gaan.",

		solutionStatement: "Wij werken zoals Nieuwegein: geen poespas, wel resultaat. Eén gesprek, wij gaan aan de slag, binnen 7 dagen online. €495 vast. Een website die doet wat 'ie moet doen: klanten aantrekken en converteren. Praktischer wordt het niet.",

		priceComparison: "Bureaus uit Utrecht vragen €2.000 tot €6.000.",

		localProof: "Nieuwegein ligt strategisch met directe toegang tot A2 en A27. Wij begrijpen dat ondernemers hier resultaat willen zien, niet presentaties. Die praktische instelling past bij hoe wij werken: efficiënt, zonder gedoe.",

		industryDetails: [
			{
				name: "Groothandel",
				description: "B2B-klanten zoeken ook online. Een professionele website met je assortiment, certificeringen en contactgegevens zorgt dat bedrijven uit de regio jou vinden als ze zoeken naar leveranciers."
			},
			{
				name: "Logistiek",
				description: "Met 35 hectare bedrijventerreinen is logistiek groot in Nieuwegein. Een website die je diensten duidelijk presenteert en vindbaar is op relevante zoektermen levert opdrachten op."
			},
			{
				name: "Installateurs",
				description: "Eén nieuwe opdracht via je website verdient de investering terug. Installateurs worden steeds vaker online gezocht. 'Loodgieter Nieuwegein' of 'cv-ketel storing': wie bovenaan staat, krijgt de klus."
			},
			{
				name: "Bouwbedrijven",
				description: "Aannemers en bouwers tonen hun vakmanschap met een portfolio online. Referenties, projecten en certificeringen overtuigen opdrachtgevers die zoeken naar betrouwbare partijen."
			}
		],

		coffeeLocation: "Laten we afspreken in Nieuwegein of Culemborg.",

		faqs: [
			{
				question: "Nieuwegein is praktisch ingesteld. Zijn jullie dat ook?",
				answer: "Absoluut. Geen eindeloze vergaderingen of brainstormsessies. Eén gesprek, wij gaan aan de slag, binnen 7 dagen online. €495 vast. Dat is het. Praktischer wordt het niet."
			},
			{
				question: "Ik zit op een bedrijventerrein aan de A2. Hebben jullie ervaring met B2B?",
				answer: "Ja. Nieuwegein heeft 35 hectare aan bedrijventerreinen. We bouwen websites voor groothandels, installateurs en logistieke bedrijven. B2B-klanten zoeken ook online. Die moet je kunnen vinden."
			},
			{
				question: "Mijn klanten komen uit Utrecht én Nieuwegein. Kan de website beide aanspreken?",
				answer: "We optimaliseren voor meerdere regio's. Nieuwegein ligt strategisch: met de juiste zoekwoorden bereik je klanten uit Utrecht, IJsselstein en Houten. Die brede dekking zit in de prijs."
			},
			{
				question: "Ik heb een installatiebedrijf. Is een website €495 waard?",
				answer: "Eén nieuwe opdracht via je website verdient de investering terug. Installateurs worden steeds vaker online gezocht. 'Loodgieter Nieuwegein' of 'cv-ketel storing': wie bovenaan staat, krijgt de klus."
			},
			{
				question: "City Plaza heeft veel concurrentie. Hoe val ik op?",
				answer: "Online zichtbaarheid. Mensen zoeken 'schoenenwinkel Nieuwegein' of 'kado City Plaza' voordat ze komen. Een goede website met lokale SEO zorgt dat ze jou vinden, niet de buurman."
			}
		],
	},

	vianen: {
		name: "Vianen",
		slug: "vianen",
		region: "Regio Utrecht",
		population: "20.000 inwoners",
		nearbyAreas: ["Lexmond", "Hagestein", "Nieuwegein", "Leerdam"],
		landmarks: "Voorstraat, Lekpoort, Binnenhaven",
		stats: {
			businesses: "1.900+ ondernemers",
			mainIndustry: "Handel & Logistiek",
			economicFact: "Vianen was historisch een vrijplaats voor ondernemers",
			founded: "Stadsrechten sinds 1336"
		},

		heroSubheadline: "Strategisch gelegen websites voor ondernemers die zowel Randstad als Rivierenland bedienen.",

		problemStatement: "Vianen profiteert van haar ligging langs A2 en A27. Bedrijven hier trekken klanten uit zowel de Randstad als het Rivierenland. Maar die klanten oriënteren zich online. Zonder website mis je potentiële klanten uit beide regio's. De Voorstraat heeft veel kleine ondernemers die concurreren om dezelfde lokale klanten.",

		solutionStatement: "Wij bouwen websites die beide markten aanspreken. Geoptimaliseerd voor 'accountant Vianen' én 'boekhouder regio Utrecht'. €495, binnen 7 dagen online. Moderne websites die passen bij de historische charme van de stad, met de professionaliteit die klanten verwachten.",

		priceComparison: "Bureaus uit Utrecht of Gorinchem vragen €2.000 tot €5.000.",

		localProof: "Vianen was historisch een vrijplaats voor ondernemers. Die ondernemersgeest leeft nog steeds. Wij begrijpen ondernemers: geen vergaderingen van drie uur, geen facturen die oplopen. Eén gesprek, 7 dagen later een website.",

		industryDetails: [
			{
				name: "E-commerce & Handel",
				description: "Vianen ligt strategisch voor distributie. Een professionele website met je assortiment bereikt klanten uit zowel de Randstad als het Rivierenland. Logistiek voordeel vertaalt naar online bereik."
			},
			{
				name: "Accountants & Administratie",
				description: "Zakelijke klanten oriënteren zich online. Een professionele website wekt vertrouwen voordat het eerste gesprek plaatsvindt. 'Accountant Vianen' én 'boekhouder regio Utrecht' in één website."
			},
			{
				name: "Makelaars",
				description: "Vianen ligt aantrekkelijk voor woningzoekers uit de Randstad. Een makelaar met een goede website die scoort op 'woning kopen Vianen' heeft een voorsprong op de concurrentie."
			},
			{
				name: "Adviesbureaus",
				description: "Consultants en adviseurs bedienen vaak klanten uit een brede regio. Een website die je expertise toont en vindbaar is op relevante zoektermen vergroot je bereik aanzienlijk."
			}
		],

		coffeeLocation: "Laten we afspreken in de Voorstraat of in Culemborg.",

		faqs: [
			{
				question: "Vianen ligt tussen Utrecht en Gorinchem. Kan ik beide markten bereiken?",
				answer: "Precies waarom Vianen strategisch is. We optimaliseren voor beide regio's. 'Accountant Vianen' bereikt lokaal, 'boekhouder regio Utrecht' trekt de Randstad aan. Die dubbele dekking zit in de website."
			},
			{
				question: "De Voorstraat heeft veel kleine ondernemers. Passen jullie daar?",
				answer: "€495 is precies bedoeld voor ondernemers als jullie. Professionele uitstraling zonder het budget van grote ketens. De Voorstraat verdient websites die passen bij de kwaliteit van de winkels."
			},
			{
				question: "Ik heb een adviesbureau. Helpt een website bij B2B?",
				answer: "Zakelijke klanten oriënteren zich ook online. Een professionele website wekt vertrouwen voordat het eerste gesprek plaatsvindt. Voor adviesbureaus en accountants is dat cruciaal."
			},
			{
				question: "Vianen was een vrijplaats voor ondernemers. Zijn jullie ook ondernemersvriendelijk?",
				answer: "We begrijpen ondernemers. Geen vergaderingen van drie uur, geen facturen die oplopen, geen gedoe. Eén gesprek, 7 dagen later een website. Dat is ondernemersvriendelijk."
			},
			{
				question: "Werken jullie ook voor makelaars?",
				answer: "Ja. Vianen ligt aantrekkelijk voor woningzoekers uit de Randstad. Een makelaar met een goede website die scoort op 'woning kopen Vianen' heeft een voorsprong op de concurrentie."
			}
		],
	},

	ijsselstein: {
		name: "IJsselstein",
		slug: "ijsselstein",
		region: "Regio Utrecht",
		population: "35.000 inwoners",
		nearbyAreas: ["Lopik", "Nieuwegein", "Montfoort", "Benschop"],
		landmarks: "Gerbrandytoren, Overtoom, Walkade",
		stats: {
			businesses: "3.200+ ondernemers",
			mainIndustry: "Detailhandel & Ambacht",
			economicFact: "IJsselstein heeft de langste winkelstraat van de regio met meer dan 100 speciaalzaken",
			founded: "Stadsrechten sinds 1310"
		},

		heroSubheadline: "Online zichtbaarheid voor ondernemers in de langste winkelstraat van de regio.",

		problemStatement: "IJsselsteiners zijn gehecht aan hun stad en kiezen graag lokaal. Maar ze oriënteren zich eerst online. Geen website? Dan besta je niet voor nieuwe klanten. Een slechte website? Dan kiest de klant de concurrent. Met 100+ speciaalzaken in de Benschopperstraat is de concurrentie groot. Opvallen begint online.",

		solutionStatement: "Wij bouwen websites die lokale klanten aanspreken. 'Bakker IJsselstein', 'kapper Benschopperstraat': wie bovenaan Google staat, krijgt de klant. €495, binnen 7 dagen online. Een professionele website die past bij de kwaliteit van je zaak.",

		priceComparison: "Bureaus uit Utrecht of Nieuwegein vragen €2.000 tot €5.000.",

		localProof: "Van de weekmarkt op de Overtoom tot de speciaalzaken in de Benschopperstraat: IJsselstein heeft een eigen winkelcultuur. Wij begrijpen deze dynamiek en bouwen websites die lokale klanten aanspreken.",

		industryDetails: [
			{
				name: "Speciaalzaken & Winkels",
				description: "Mensen zoeken 'bakker IJsselstein' of 'kapper Benschopperstraat' voordat ze de deur uitgaan. Wie bovenaan Google staat, krijgt de klant. Zo simpel is het."
			},
			{
				name: "Kappers & Barbershops",
				description: "Een kapsalon heeft geen webshop nodig. Wel: mooie foto's van je werk, openingstijden, prijzen, en een manier om afspraken te maken. Dat bouwen we voor €495."
			},
			{
				name: "Ambachtslieden",
				description: "Vakmanschap verdient zichtbaarheid. Een portfolio van je werk, referenties en vindbaar zijn op relevante zoektermen levert opdrachten op van klanten die kwaliteit waarderen."
			},
			{
				name: "Fysiotherapie & Zorg",
				description: "Zorg is een groeiende sector. Een professionele website met duidelijke informatie over behandelingen, vergoedingen en aanmelden wekt vertrouwen bij nieuwe patiënten."
			}
		],

		coffeeLocation: "Laten we afspreken in IJsselstein centrum.",

		faqs: [
			{
				question: "IJsselstein heeft meer dan 100 speciaalzaken. Hoe val ik op?",
				answer: "Online zichtbaarheid. Mensen zoeken 'bakker IJsselstein' of 'kapper Benschopperstraat' voordat ze de deur uitgaan. Wie bovenaan Google staat, krijgt de klant. Zo simpel is het."
			},
			{
				question: "IJsselsteiners kiezen lokaal. Waarom dan toch een website?",
				answer: "Juist daarom. Ze willen lokaal kopen, maar oriënteren zich eerst online. Geen website? Dan besta je niet. Een slechte website? Dan kies ik de concurrent. Zo denkt de moderne lokale klant."
			},
			{
				question: "Ik heb een kapsalon. Is €495 genoeg voor een goede website?",
				answer: "Meer dan genoeg. Een kapsalon heeft geen webshop nodig. Wel: mooie foto's van je werk, openingstijden, prijzen, en een manier om afspraken te maken. Dat bouwen we voor €495."
			},
			{
				question: "Werken jullie ook voor fysiotherapeuten en zorgverleners?",
				answer: "Ja. Zorg is een groeiende sector in IJsselstein. Een professionele website met duidelijke informatie over behandelingen, vergoedingen en aanmelden wekt vertrouwen bij nieuwe patiënten."
			},
			{
				question: "Ik sta op de weekmarkt aan de Overtoom. Helpt een website dan?",
				answer: "Zeker. Vaste klanten vinden je sowieso. Maar nieuwe klanten zoeken 'markt IJsselstein' of 'verse groenten regio Utrecht'. Een simpele website met je aanbod en standplaats trekt nieuw publiek."
			}
		],
	},

	"wijk-bij-duurstede": {
		name: "Wijk bij Duurstede",
		slug: "wijk-bij-duurstede",
		region: "Regio Utrecht",
		population: "24.000 inwoners",
		nearbyAreas: ["Cothen", "Langbroek", "Amerongen", "Houten"],
		landmarks: "Kasteel Duurstede, Grote Kerk, Lek en Linge",
		stats: {
			businesses: "2.200+ ondernemers",
			mainIndustry: "Toerisme & Ambacht",
			economicFact: "Wijk bij Duurstede was ooit Dorestad, de grootste handelsstad van Noordwest-Europa",
			founded: "Stadsrechten sinds 1300"
		},

		heroSubheadline: "Websites voor ondernemers in een historische stad met een moderne kijk op ondernemen.",

		problemStatement: "Wijk bij Duurstede combineert rijke historie met een actieve ondernemersgemeenschap. Kasteel Duurstede trekt toeristen, de binnenstad heeft karakteristieke winkels. Maar zowel toeristen als lokale klanten oriënteren zich online. Zonder website mis je bezoekers die al op weg zijn naar jou.",

		solutionStatement: "Wij bouwen websites die passen bij de historische uitstraling van de stad. Modern design dat je verhaal vertelt. Geoptimaliseerd voor 'restaurant Wijk bij Duurstede' of 'winkelen Kromme Rijnstreek'. €495, binnen 7 dagen online.",

		priceComparison: "Bureaus uit Utrecht vragen €2.000 tot €5.000.",

		localProof: "Van Kasteel Duurstede tot de jachthaven: Wijk bij Duurstede heeft charme die bezoekers trekt. Wij begrijpen dat ondernemers hier kwaliteit uitstralen en bouwen websites die daarbij passen.",

		industryDetails: [
			{
				name: "Horeca & Restaurants",
				description: "Toeristen bij het kasteel zoeken daarna 'lunch Wijk bij Duurstede'. Een website met menu, sfeer en openingstijden trekt deze gasten naar jouw zaak in plaats van de concurrent."
			},
			{
				name: "Retail & Speciaalzaken",
				description: "De binnenstad heeft karakteristieke winkels. Een website met je assortiment en verhaal onderscheidt je van ketens. Lokale klanten waarderen authenticiteit."
			},
			{
				name: "Recreatie & Toerisme",
				description: "B&B's, bootjes, rondleidingen: de Kromme Rijnstreek trekt recreanten. Een website die vindbaar is op 'overnachten Wijk bij Duurstede' bereikt gasten die al interesse hebben."
			},
			{
				name: "Ambachtelijke beroepen",
				description: "Vakmanschap past bij de historie van de stad. Een portfolio met je werk, je proces en referenties toont kwaliteit aan klanten die het beste zoeken."
			}
		],

		coffeeLocation: "Laten we afspreken bij het kasteel of in de binnenstad.",

		faqs: [
			{
				question: "Wijk bij Duurstede trekt toeristen. Hoe bereik ik die online?",
				answer: "Toeristen zoeken 'restaurant Wijk bij Duurstede' of 'wat te doen Kromme Rijnstreek' na hun kasteelbezoek. Een website die daarop scoort trekt gasten die al in de stad zijn."
			},
			{
				question: "De binnenstad heeft veel kleine winkels. Hoe val ik op?",
				answer: "Online zichtbaarheid. Mensen zoeken specifieke producten voordat ze komen. Een website met je assortiment, openingstijden en je verhaal trekt klanten die kwaliteit zoeken."
			},
			{
				question: "Ik heb een B&B bij de Lek. Werkt een website tegen Booking?",
				answer: "Met eigen boekingen verdien je meer. Een website met directe boekingsmogelijkheid bespaart 15-20% commissie. Gasten die 'B&B Wijk bij Duurstede' zoeken, willen vaak juist niet via platforms."
			},
			{
				question: "Mijn klanten komen uit de hele Kromme Rijnstreek. Kan dat?",
				answer: "We optimaliseren voor de regio: Cothen, Langbroek, Amerongen, Houten. Mensen zoeken op dienst + regio. Met de juiste zoekwoorden bereik je klanten uit de hele streek."
			},
			{
				question: "De historie van Dorestad is uniek. Kan mijn website dat uitstralen?",
				answer: "Absoluut. We bouwen websites die passen bij de historische uitstraling van de stad. Modern design dat je verhaal vertelt zonder ouderwets te worden. Authenticiteit verkoopt."
			}
		],
	},

	// ============================================
	// NOORD-BRABANT REGION
	// ============================================

	"den-bosch": {
		name: "Den Bosch",
		slug: "den-bosch",
		region: "Noord-Brabant",
		population: "160.000 inwoners",
		nearbyAreas: ["Vught", "Rosmalen", "Berlicum", "Sint-Michielsgestel"],
		landmarks: "Sint-Janskathedraal, Markt, De Bossche Bol",
		stats: {
			businesses: "15.000+ ondernemers",
			mainIndustry: "Creatieve sector & Horeca",
			economicFact: "Den Bosch is de provinciale hoofdstad en trekt jaarlijks miljoenen toeristen",
			founded: "Stadsrechten sinds 1185"
		},

		heroSubheadline: "Professionele websites voor Bossche ondernemers die niet willen betalen voor dure stadse bureaus.",

		problemStatement: "Den Bosch bruist van ondernemerschap. Van de Markt tot de creatieve wijken: 15.000 ondernemers strijden om aandacht. Brabantse bureaus vragen €2.500 tot €6.000 voor een website en laten je weken wachten. Maar de Sint-Jan trekt toeristen die vandaag nog een restaurant zoeken. Zonder snelle, vindbare website mis je die kansen.",

		solutionStatement: "Wij leveren dezelfde kwaliteit voor €495. Binnen 7 dagen online, zonder de overhead van een kantoor aan de Markt. Geoptimaliseerd voor 'restaurant Den Bosch', 'kapper Rosmalen' en vergelijkbare zoektermen. Brabantse gezelligheid verdient een website die werkt.",

		priceComparison: "Brabantse bureaus vragen €2.500 tot €6.000 voor een vergelijkbare website.",

		localProof: "Den Bosch combineert Bourgondische gezelligheid met serieus ondernemerschap. Wij begrijpen dat Brabanders recht door zee zijn: geen gelul, wel resultaat. Die mentaliteit past bij hoe wij werken.",

		industryDetails: [
			{
				name: "Horeca & Restaurants",
				description: "De Bossche Bol alleen al trekt bezoekers. Een website die scoort op 'restaurant Den Bosch' of 'lunch Markt' trekt gasten die na de Sint-Jan iets lekkers zoeken. Menu, sfeer, reserveren: wij bouwen het."
			},
			{
				name: "Creatieve sector",
				description: "Den Bosch heeft een bloeiende creatieve scene. Ontwerpers, fotografen, marketeers: een website die je portfolio ondersteunt en vindbaar is op relevante zoektermen trekt opdrachtgevers."
			},
			{
				name: "Retail & Speciaalzaken",
				description: "De binnenstad leeft van speciaalzaken. Een website met je assortiment en verhaal onderscheidt je van ketens. 'Winkelen Den Bosch' begint vaak online."
			},
			{
				name: "Zakelijke Dienstverlening",
				description: "Als provinciehoofdstad trekt Den Bosch veel zakelijke dienstverleners. Een professionele website wekt vertrouwen bij potentiële klanten uit heel Brabant."
			}
		],

		coffeeLocation: "Laten we afspreken op de Markt of in Vught.",

		faqs: [
			{
				question: "Waarom zou ik niet een Bossch bureau inhuren?",
				answer: "Brabantse bureaus vragen €2.500 tot €6.000 voor een website. Wij leveren dezelfde kwaliteit voor €495. Geen kantoor aan de Markt, geen weken wachten, wel een website die werkt."
			},
			{
				question: "Den Bosch trekt veel toeristen. Hoe bereik ik die?",
				answer: "Toeristen zoeken 'restaurant Den Bosch' of 'wat te doen Sint-Jan' terwijl ze al in de stad zijn. Een website die daarop scoort trekt gasten die vandaag nog willen eten of shoppen."
			},
			{
				question: "Ik zit in de creatieve sector. Snappen jullie dat?",
				answer: "We bouwen websites voor ontwerpers, fotografen en creatieve bureaus. Je portfolio moet centraal staan, niet onze ego. Strak design, snel laden, goed vindbaar."
			},
			{
				question: "Mijn klanten komen uit heel Brabant. Kan de website dat?",
				answer: "We optimaliseren voor Den Bosch én de regio: Vught, Rosmalen, Berlicum, heel Brabant. Met de juiste zoekwoorden bereik je klanten uit de hele provincie."
			},
			{
				question: "Is €495 niet te goedkoop voor een professionele website?",
				answer: "We zijn efficiënt, niet goedkoop. Geen duur kantoor, geen weken vergaderen. Wel een snelle, moderne website die professioneel overkomt. Brabanders waarderen directheid: dit is wat het kost."
			}
		],
	},

	rosmalen: {
		name: "Rosmalen",
		slug: "rosmalen",
		region: "Noord-Brabant",
		population: "40.000 inwoners",
		nearbyAreas: ["Den Bosch", "Berlicum", "Heesch", "Nuland"],
		landmarks: "De Groote Wielen, Centrum Rosmalen",
		stats: {
			businesses: "3.500+ ondernemers",
			mainIndustry: "Retail & Dienstverlening",
			economicFact: "Rosmalen is de grootste kern van de gemeente 's-Hertogenbosch buiten de stad zelf",
			founded: "Gefuseerd met Den Bosch in 1996"
		},

		heroSubheadline: "Lokale websites voor ondernemers die liever niet betalen voor dure Bossche bureaus.",

		problemStatement: "Rosmalen heeft een eigen identiteit, ook al hoort het bij Den Bosch. Veel ondernemers bedienen zowel Rosmalen als de wijde omgeving. Bureaus uit Den Bosch vragen €2.000 tot €5.000 en behandelen Rosmalen als voorstad. Maar Rosmalense klanten zoeken 'kapper Rosmalen', niet 'kapper Den Bosch'.",

		solutionStatement: "Wij bouwen websites die Rosmalen serieus nemen. Geoptimaliseerd voor lokale zoektermen, binnen 7 dagen online, voor €495. Een professionele website die je lokale klanten aanspreekt én bezoekers uit Den Bosch en omgeving trekt.",

		priceComparison: "Bossche bureaus vragen €2.000 tot €5.000 voor een website.",

		localProof: "Rosmalen heeft een eigen dynamiek met De Groote Wielen en een levendig centrum. Wij begrijpen dat lokale vindbaarheid hier belangrijk is: mensen zoeken 'fysiotherapeut Rosmalen', niet 'fysiotherapeut Den Bosch'.",

		industryDetails: [
			{
				name: "Retail & Winkels",
				description: "Het centrum van Rosmalen heeft trouwe lokale klanten. Een website die scoort op 'winkelen Rosmalen' trekt bezoekers die liever niet naar de stad gaan."
			},
			{
				name: "Gezondheid & Zorg",
				description: "Fysiotherapeuten, huisartsen, tandartsen: zorg is lokaal. Een professionele website met praktijkinformatie en online aanmelden maakt het verschil voor nieuwe patiënten."
			},
			{
				name: "Horeca",
				description: "De Groote Wielen trekt recreanten. Een website die scoort op 'restaurant Rosmalen' of 'terras Groote Wielen' trekt gasten die lokaal willen eten."
			},
			{
				name: "Zakelijke Dienstverlening",
				description: "ZZP'ers en adviseurs in Rosmalen bedienen vaak heel Brabant. Een professionele website vergroot je bereik zonder dat je naar Den Bosch hoeft te verhuizen."
			}
		],

		coffeeLocation: "Laten we afspreken in Rosmalen centrum.",

		faqs: [
			{
				question: "Rosmalen hoort bij Den Bosch. Waarom een aparte website?",
				answer: "Omdat mensen zoeken op 'kapper Rosmalen', niet 'kapper Den Bosch'. Lokale vindbaarheid maakt het verschil. Wij optimaliseren voor de zoektermen die jouw klanten gebruiken."
			},
			{
				question: "Bossche bureaus zijn duur. Wat kost het bij jullie?",
				answer: "€495 voor een professionele website, binnen 7 dagen online. Geen vergaderingen in Den Bosch, geen overhead. Wel een website die werkt voor jouw Rosmalense klanten."
			},
			{
				question: "Ik bedien klanten uit Rosmalen én Den Bosch. Kan dat?",
				answer: "We optimaliseren voor beide. 'Fysiotherapeut Rosmalen' bereikt lokaal, 'zorg regio Den Bosch' trekt de wijde omgeving aan. Die brede dekking zit in de website."
			},
			{
				question: "De Groote Wielen trekt veel bezoekers. Kan ik die bereiken?",
				answer: "Recreanten zoeken 'restaurant Groote Wielen' of 'terras Rosmalen'. Een website die daarop scoort trekt gasten die al in de buurt zijn en iets zoeken."
			},
			{
				question: "Werken jullie ook voor zorgverleners?",
				answer: "Ja. Fysiotherapeuten, tandartsen, huisartsen: een professionele website met praktijkinformatie en online mogelijkheden wekt vertrouwen bij nieuwe patiënten."
			}
		],
	},

	oss: {
		name: "Oss",
		slug: "oss",
		region: "Noord-Brabant",
		population: "95.000 inwoners",
		nearbyAreas: ["Berghem", "Heesch", "Ravenstein", "Lith"],
		landmarks: "Walkwartier, Grote Kerk, Maaskade",
		stats: {
			businesses: "8.500+ ondernemers",
			mainIndustry: "Food & Farmaceutica",
			economicFact: "Oss is de bakermat van de Nederlandse farmaceutische industrie met historische MSD/Organon wortels",
			founded: "Stadsrechten sinds 1399"
		},

		heroSubheadline: "Nuchtere websites voor nuchtere Osse ondernemers. Werkende oplossingen, geen praatjes.",

		problemStatement: "Oss is een werkstad met een no-nonsense mentaliteit. Ondernemers hier waarderen kwaliteit en directheid. Maar online zichtbaarheid wordt steeds belangrijker. Met 8.500 ondernemers is de concurrentie groot. Bureaus uit Eindhoven of Den Bosch vragen €2.000 tot €5.000 en begrijpen de Osse markt niet.",

		solutionStatement: "Wij werken zoals Oss: direct en effectief. €495 voor een professionele website, binnen 7 dagen online. Geen gelul, wel een website die klanten trekt. Geoptimaliseerd voor 'restaurant Oss', 'aannemer Maasland' en vergelijkbare zoektermen.",

		priceComparison: "Bureaus uit Eindhoven of Den Bosch vragen €2.000 tot €5.000.",

		localProof: "Oss heeft een rijke industriële geschiedenis en een nuchtere werkmentaliteit. Wij begrijpen dat ondernemers hier resultaat willen zien, geen mooie verhalen. Die directheid past bij hoe wij werken.",

		industryDetails: [
			{
				name: "Food & Productie",
				description: "Oss heeft sterke wortels in de voedingsindustrie. B2B-bedrijven in food en productie hebben een professionele website nodig die certificeringen, capaciteit en referenties toont."
			},
			{
				name: "Bouw & Techniek",
				description: "Aannemers, installateurs, technische bedrijven: online zichtbaarheid levert opdrachten op. Een portfolio met projecten en referenties overtuigt opdrachtgevers."
			},
			{
				name: "Retail & Horeca",
				description: "Het Walkwartier en de Maaskade trekken bezoekers. Een website die scoort op 'winkelen Oss' of 'restaurant Maaskade' trekt klanten die online oriënteren."
			},
			{
				name: "Zakelijke Dienstverlening",
				description: "Accountants, adviseurs, verzekeraars: een professionele website wekt vertrouwen bij potentiële klanten uit heel het Maasland."
			}
		],

		coffeeLocation: "Laten we afspreken in Oss centrum of het Walkwartier.",

		faqs: [
			{
				question: "Oss is nuchter. Geen verkooppraatjes dus?",
				answer: "Precies. €495 voor een website, binnen 7 dagen klaar. Geen gedoe, geen kleine lettertjes. Wij zijn net zo direct als Oss zelf. Dat werkt."
			},
			{
				question: "Bureaus uit Eindhoven zijn duur. Wat bieden jullie?",
				answer: "Dezelfde kwaliteit voor €495. Geen kantoor in de stad, geen weken vergaderen. Wel een snelle, professionele website die vindbaar is op de zoektermen die jouw klanten gebruiken."
			},
			{
				question: "Ik bedien klanten in heel het Maasland. Kan dat?",
				answer: "We optimaliseren voor Oss én de regio: Berghem, Heesch, Ravenstein, Lith. Mensen zoeken op dienst + regio. Met de juiste zoekwoorden bereik je klanten uit de hele streek."
			},
			{
				question: "Het Walkwartier is vernieuwd. Hoe profiteer ik daarvan?",
				answer: "Bezoekers zoeken 'winkelen Oss' of 'restaurant Walkwartier'. Een website die daarop scoort trekt klanten die al in de buurt zijn en iets zoeken."
			},
			{
				question: "Werken jullie ook voor B2B en industrie?",
				answer: "Ja. Oss heeft sterke industriële wortels. We bouwen websites voor productiebedrijven, toeleveranciers en technische dienstverleners. B2B-klanten zoeken ook online."
			}
		],
	},

	// ============================================
	// GELDERLAND (excl. Rivierenland)
	// ============================================

	nijmegen: {
		name: "Nijmegen",
		slug: "nijmegen",
		region: "Gelderland",
		population: "180.000 inwoners",
		nearbyAreas: ["Lent", "Beek", "Wijchen", "Malden"],
		landmarks: "Waalkade, Grote Markt, Radboud Universiteit",
		stats: {
			businesses: "16.000+ ondernemers",
			mainIndustry: "Onderwijs, Zorg & Tech",
			economicFact: "Nijmegen is de oudste stad van Nederland en huisvest de Radboud Universiteit met 24.000 studenten",
			founded: "Romeinse oorsprong, stadsrechten 1230"
		},

		heroSubheadline: "Moderne websites voor ondernemers in de oudste stad van Nederland.",

		problemStatement: "Nijmegen combineert historie met innovatie. De Radboud Universiteit, het Radboudumc en een bruisende horecascene zorgen voor diverse ondernemerskansen. Maar met 16.000 ondernemers is de concurrentie groot. Nijmeegse bureaus vragen €3.000 tot €7.000 voor een website. Studenten en professionals verwachten wel een snelle, moderne online ervaring.",

		solutionStatement: "Wij leveren dezelfde kwaliteit voor €495. Websites die snel laden, goed vindbaar zijn, en binnen 7 dagen online staan. Perfect voor startende ondernemers, ZZP'ers en gevestigde bedrijven die niet willen betalen voor dure Nijmeegse overhead.",

		priceComparison: "Nijmeegse bureaus vragen €3.000 tot €7.000 voor een website.",

		localProof: "Nijmegen is een stad van contrasten: Romeinse geschiedenis naast cutting-edge onderzoek, studentencafés naast sterrenrestaurants. Wij bouwen websites die passen bij jouw specifieke Nijmeegse doelgroep.",

		industryDetails: [
			{
				name: "Horeca & Restaurants",
				description: "De Waalkade en Grote Markt bruisen. Een website die scoort op 'restaurant Nijmegen' of 'terras Waalkade' trekt gasten die online hun avond plannen. Menu, sfeer, reserveren: essentieel."
			},
			{
				name: "Zorg & Welzijn",
				description: "Met het Radboudumc is zorg groot in Nijmegen. Fysiotherapeuten, psychologen, alternatieve zorg: een professionele website wekt vertrouwen bij nieuwe patiënten."
			},
			{
				name: "Onderwijs & Coaching",
				description: "Bijles, trainingen, coaching: 24.000 studenten en hun ouders zoeken online. Een website die vindbaar is op relevante zoektermen bereikt deze grote doelgroep."
			},
			{
				name: "Tech & Startups",
				description: "Nijmegen heeft een groeiende techscene rond de universiteit. Een professionele website voor €495 past perfect bij startups die hun runway niet willen verbranden."
			}
		],

		coffeeLocation: "Laten we afspreken op de Grote Markt of Waalkade.",

		faqs: [
			{
				question: "Nijmegen heeft veel bureaus. Waarom kiezen voor jullie?",
				answer: "Nijmeegse bureaus vragen €3.000 tot €7.000. Wij leveren dezelfde kwaliteit voor €495. Geen kantoor aan de Waalkade, geen weken wachten. Wel een website die werkt."
			},
			{
				question: "Ik wil studenten bereiken. Kan dat?",
				answer: "24.000 studenten zoeken bijles, kamers, uitgaan, eten. Een website die scoort op relevante zoektermen bereikt deze doelgroep. We optimaliseren voor de zoektermen die zij gebruiken."
			},
			{
				question: "De Waalkade is populair. Hoe profiteer ik daarvan?",
				answer: "Bezoekers zoeken 'terras Waalkade' of 'restaurant Nijmegen centrum'. Een website die daarop scoort trekt gasten die al in de buurt zijn en iets zoeken."
			},
			{
				question: "Ik heb een zorgpraktijk. Helpt een website?",
				answer: "Absoluut. Patiënten oriënteren zich online op zorgverleners. Een professionele website met je specialisaties, vergoedingen en contactgegevens wekt vertrouwen."
			},
			{
				question: "Is €495 realistisch voor een startup?",
				answer: "Juist voor startups ideaal. Snel een professionele uitstraling zonder je runway op te branden. Later uitbreiden kan altijd. Focus je budget op wat echt telt."
			}
		],
	},

	// ============================================
	// ZUID-HOLLAND
	// ============================================

	gorinchem: {
		name: "Gorinchem",
		slug: "gorinchem",
		region: "Zuid-Holland",
		population: "37.000 inwoners",
		nearbyAreas: ["Arkel", "Dalem", "Schelluinen", "Leerdam"],
		landmarks: "Vestingwerken, Grote Kerk, Buiten de Waterpoort",
		stats: {
			businesses: "3.400+ ondernemers",
			mainIndustry: "Handel & Logistiek",
			economicFact: "Gorinchem is een strategisch gelegen vestingstad op de kruising van Merwede, Linge en Waal",
			founded: "Stadsrechten sinds 1382"
		},

		heroSubheadline: "Strategisch gelegen websites voor ondernemers in deze historische vestingstad.",

		problemStatement: "Gorinchem ligt strategisch op de kruising van rivieren en snelwegen. Ondernemers hier bedienen klanten uit Zuid-Holland, Brabant én Gelderland. Maar die klanten oriënteren zich online. Zonder website mis je potentiële klanten uit alle drie de provincies. Rotterdamse bureaus vragen €2.500 tot €6.000 en kennen Gorinchem niet.",

		solutionStatement: "Wij bouwen websites die je strategische ligging benutten. Geoptimaliseerd voor klanten uit de hele regio: 'aannemer Gorinchem', 'restaurant Alblasserwaard', 'logistiek Rivierenland'. €495, binnen 7 dagen online.",

		priceComparison: "Rotterdamse bureaus vragen €2.500 tot €6.000 voor een website.",

		localProof: "Gorinchem is een vestingstad met ondernemersgeest. De strategische ligging maakt het aantrekkelijk voor handel en logistiek. Wij begrijpen dat je klanten uit meerdere regio's wilt bereiken en bouwen websites die dat mogelijk maken.",

		industryDetails: [
			{
				name: "Handel & Logistiek",
				description: "Gorinchem ligt op een kruispunt van rivieren en snelwegen. Een professionele website voor handels- en logistieke bedrijven bereikt klanten uit heel de regio."
			},
			{
				name: "Bouw & Techniek",
				description: "Aannemers en technische bedrijven in Gorinchem bedienen vaak meerdere provincies. Een portfolio met projecten en referenties overtuigt opdrachtgevers uit de hele regio."
			},
			{
				name: "Horeca & Restaurants",
				description: "De vestingwerken en Buiten de Waterpoort trekken bezoekers. Een website die scoort op 'restaurant Gorinchem' of 'terras vesting' trekt gasten."
			},
			{
				name: "Retail & Speciaalzaken",
				description: "De binnenstad heeft karakteristieke winkels. Online zichtbaarheid trekt klanten uit Gorinchem én de wijde omgeving die specifieke producten zoeken."
			}
		],

		coffeeLocation: "Laten we afspreken in de binnenstad of bij de vestingwerken.",

		faqs: [
			{
				question: "Gorinchem ligt strategisch. Hoe benut ik dat online?",
				answer: "We optimaliseren voor meerdere regio's: Zuid-Holland, Brabant en Gelderland. Met de juiste zoekwoorden bereik je klanten uit alle drie de provincies. Die brede dekking zit in de website."
			},
			{
				question: "Rotterdamse bureaus zijn duur. Wat kost het bij jullie?",
				answer: "€495 voor een professionele website, binnen 7 dagen online. Geen Rotterdamse overhead, wel een website die werkt voor jouw klanten in de hele regio."
			},
			{
				question: "De vestingwerken trekken toeristen. Kan ik die bereiken?",
				answer: "Bezoekers zoeken 'restaurant Gorinchem' of 'terras vesting'. Een website die daarop scoort trekt gasten die al in de stad zijn en iets lekkers zoeken."
			},
			{
				question: "Ik bedien klanten uit meerdere provincies. Kan dat?",
				answer: "Precies onze aanpak. 'Aannemer Gorinchem' bereikt lokaal, 'bouwbedrijf regio Dordrecht' trekt Zuid-Holland, 'verbouwing Rivierenland' bereikt Gelderland. Alles in één website."
			},
			{
				question: "Werken jullie ook voor logistieke bedrijven?",
				answer: "Ja. Gorinchem is een logistieke hub. We bouwen websites voor transportbedrijven, distributeurs en logistieke dienstverleners. B2B-klanten zoeken ook online."
			}
		],
	},
};

export const getCityBySlug = (slug: string): CityData | undefined => {
	return cities[slug.toLowerCase()];
};

export const getAllCities = (): CityData[] => {
	return Object.values(cities);
};
