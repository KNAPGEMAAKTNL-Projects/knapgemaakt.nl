/**
 * City data for local SEO pages
 * Each city has unique content to maximize SEO value (60-70% unique per page)
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

export interface CityData {
	name: string;
	slug: string;
	region: string;
	description: string; // 2-3 sentences about the city for intro
	businessContext: string; // Why businesses in this city need a website
	localFocus: string; // What makes this city unique for local businesses
	nearbyAreas: string[]; // Surrounding areas we also serve
	landmarks?: string; // Optional: notable landmarks or areas
	population?: string; // Optional: city size context
	/** Unique statistics and facts about the city's economy */
	stats?: CityStats;
	/** Specific industries or business types common in this city */
	targetIndustries?: string[];
	/** FAQ items for this city's location page (SEO) */
	faqs: FAQItem[];
	/** Related case study slug if available */
	relatedProject?: string;
}

export const cities: Record<string, CityData> = {
    culemborg: {
		name: "Culemborg",
		slug: "culemborg",
		region: "Rivierenland",
		population: "30.000 inwoners",
		description:
			"Culemborg is een historische vestingstad aan de Lek met een bruisend centrum vol lokale ondernemers. Van de gezellige Markt tot de karakteristieke binnenstad – hier draait alles om persoonlijk contact en lokale verbinding.",
		businessContext:
			"Als ondernemer in Culemborg concurreer je met grotere steden als Utrecht en Tiel. Een professionele website zorgt ervoor dat klanten jou vinden wanneer ze zoeken naar diensten in de regio. Steeds meer Culemborgers oriënteren zich online voordat ze lokaal kopen.",
		localFocus:
			"Wij kennen Culemborg als geen ander – het is onze thuisbasis. We begrijpen de lokale markt, weten wat werkt voor ondernemers aan de Markt of in het Blauwe Huis-gebied, en spreken de taal van de Culemborgse ondernemer.",
		nearbyAreas: ["Beusichem", "Everdingen", "Schalkwijk", "Leerdam"],
		landmarks: "Binnenpoort, Markt, Barbarakerk",
		stats: {
			businesses: "2.800+ ondernemers",
			mainIndustry: "Detailhandel & Horeca",
			economicFact: "De binnenstad telt meer dan 150 winkels en horecazaken op loopafstand",
			founded: "Stadsrechten sinds 1318"
		},
		targetIndustries: ["Horeca", "Retail", "Persoonlijke dienstverlening", "Gezondheid & Fitness"],
		relatedProject: "fitcity-culemborg",
		faqs: [
			{
				question: "Wat kost een website laten maken in Culemborg?",
				answer: "Een professionele website kost €595 eenmalig. Dit is een vaste prijs zonder verborgen kosten. Hosting is inbegrepen, en je website is binnen 7 dagen online. Voor ondernemers aan de Markt of in de binnenstad is dit een fractie van wat grotere bureaus uit Utrecht vragen."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "Gemiddeld 7 dagen van eerste gesprek tot livegang. We werken efficiënt zonder in te leveren op kwaliteit. Je hoeft zelf bijna niks te doen — wij regelen alles."
			},
			{
				question: "Werken jullie alleen voor bedrijven in Culemborg?",
				answer: "Nee, we werken voor ondernemers in heel Nederland. Culemborg is onze thuisbasis, dus we kennen de lokale markt als geen ander. Van de Markt tot bedrijventerrein Pavijen — we begrijpen wat Culemborgse ondernemers nodig hebben."
			},
			{
				question: "Hebben jullie ervaring met fitness- en sportbedrijven?",
				answer: "Ja, we hebben onder andere de website van FitCity Culemborg gemaakt — een sportschool in het hart van de stad. We weten hoe je een fitnesswebsite bouwt die leden aantrekt en direct online inschrijvingen mogelijk maakt."
			},
			{
				question: "Kan ik mijn website later uitbreiden?",
				answer: "Absoluut. We bouwen websites die kunnen meegroeien. Later een webshop toevoegen, extra pagina's, of automatiseringen? Dat kan allemaal. We groeien graag mee met jouw bedrijf."
			}
		],
	},
    utrecht: {
		name: "Utrecht",
		slug: "utrecht",
		region: "Utrecht",
		population: "360.000 inwoners",
		description:
			"Utrecht is het kloppend hart van Nederland – een stad waar historie en innovatie samenkomen. Met de Domtoren als icoon en een bruisende startup-scene is Utrecht dé plek voor ambitieuze ondernemers.",
		businessContext:
			"In Utrecht is de concurrentie groot. Duizenden bedrijven strijden om de aandacht van dezelfde doelgroep. Een website die écht opvalt en goed vindbaar is, maakt het verschil tussen gevonden worden of onzichtbaar blijven.",
		localFocus:
			"Utrecht kent vele gezichten: van de horeca langs de Oudegracht tot de creatieve bureaus op de Wharf, van ZZP'ers in Lombok tot retailers in Hoog Catharijne. Wij bouwen websites die passen bij jouw specifieke Utrechtse doelgroep.",
		nearbyAreas: ["De Bilt", "Zeist", "Bunnik", "Maarssen"],
		landmarks: "Domtoren, Oudegracht, Neude",
		stats: {
			businesses: "45.000+ ondernemers",
			mainIndustry: "Creatieve sector & Tech",
			economicFact: "Utrecht is de snelst groeiende startup-hub van Nederland na Amsterdam",
			founded: "Stadsrechten sinds 1122"
		},
		targetIndustries: ["Startups", "Creatieve bureaus", "Horeca", "Consultancy", "Tech & SaaS"],
		faqs: [
			{
				question: "Wat kost een website laten maken in Utrecht?",
				answer: "Een professionele website kost €595 eenmalig. Vaste prijs, geen verborgen kosten. In Utrecht betaal je bij grote bureaus al snel €3.000-€5.000 voor hetzelfde resultaat. Wij leveren dezelfde kwaliteit voor een fractie van de prijs."
			},
			{
				question: "Hoe snel kan mijn website online zijn?",
				answer: "Binnen 7 dagen. Terwijl Utrechtse bureaus weken plannen en vergaderen, gaan wij direct aan de slag. Je hebt snel een professionele website zonder eindeloos wachten."
			},
			{
				question: "Werken jullie ook voor startups en ZZP'ers?",
				answer: "Zeker. Van creatieve freelancers in Lombok tot tech-startups op het Utrecht Science Park — wij helpen ambitieuze ondernemers die een professionele uitstraling willen zonder enterprise-budgetten. Onze aanpak past perfect bij de Utrechtse startup-mentaliteit."
			},
			{
				question: "Kan ik met €595 concurreren met gevestigde Utrechtse bedrijven?",
				answer: "Absoluut. Een dure website betekent niet automatisch een betere website. Wij bouwen met moderne technologie die sneller laadt en beter scoort in Google dan veel dure WordPress-sites. Jouw website zal er even professioneel uitzien als die van grote spelers."
			},
			{
				question: "Hoe onderscheid ik me van de 45.000 andere ondernemers in Utrecht?",
				answer: "Met een website die opvalt door snelheid, design en vindbaarheid. We optimaliseren je site voor lokale zoektermen, zodat Utrechters die zoeken naar jouw dienst jou vinden — niet je concurrent aan de Oudegracht."
			}
		],
	},
    houten: {
		name: "Houten",
		slug: "houten",
		region: "Regio Utrecht",
		population: "50.000 inwoners",
		description:
			"Houten staat bekend als één van de snelst gegroeide gemeenten van Nederland – een moderne woonplaats met een dorps karakter. De sterke lokale gemeenschap zorgt voor een hecht netwerk van ondernemers.",
		businessContext:
			"Houtenaren zijn loyaal aan lokale ondernemers, maar verwachten wel een professionele uitstraling. Een goede website is je visitekaartje in een gemeente waar mond-tot-mondreclame digitaal wordt versterkt via lokale Facebook-groepen en Nextdoor.",
		localFocus:
			"Van het winkelcentrum Het Rond tot de bedrijventerreinen Doornkade en Loerik – Houten heeft een eigen dynamiek. Wij begrijpen dat Houtenaren waarde hechten aan kwaliteit en betrouwbaarheid boven de laagste prijs.",
		nearbyAreas: ["Bunnik", "'t Goy", "Schalkwijk", "Nieuwegein"],
		landmarks: "Het Rond, Castellum Hoge Woerd, Rondweg",
		stats: {
			businesses: "4.500+ ondernemers",
			mainIndustry: "Zakelijke dienstverlening",
			economicFact: "Houten groeide van 4.000 naar 50.000 inwoners in 40 jaar – uniek in Nederland",
			founded: "Nieuwe stad sinds 1966"
		},
		targetIndustries: ["ZZP & Freelancers", "Coaches & Trainers", "Kinderopvang", "Bouw & Verbouw"],
		faqs: [
			{
				question: "Wat kost een website laten maken in Houten?",
				answer: "Een professionele website kost €595 eenmalig. Vaste prijs, hosting inbegrepen, binnen 7 dagen online. Geen verrassingen achteraf."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "Gemiddeld 7 dagen. Na een kort gesprek gaan we direct aan de slag. Jij hoeft alleen een vragenlijst in te vullen en wat foto's te delen — wij doen de rest."
			},
			{
				question: "Waarom zou ik kiezen voor een lokale webdesigner?",
				answer: "Korte lijnen, persoonlijk contact, en iemand die de Houtense markt begrijpt. Geen callcenters of ticketsystemen, maar direct contact wanneer je vragen hebt."
			},
			{
				question: "Is hosting inbegrepen bij de website?",
				answer: "Ja, hosting is altijd inbegrepen. Je website draait op snelle servers zonder extra maandelijkse kosten. Optioneel: beheerpakket (€49/maand) voor updates en aanpassingen."
			},
			{
				question: "Kan ik later uitbreiden met een webshop?",
				answer: "Absoluut. We bouwen websites die kunnen meegroeien. Een webshop, extra pagina's, of koppelingen met je boekhoudsysteem — alles is mogelijk."
			}
		],
	},
    nieuwegein: {
		name: "Nieuwegein",
		slug: "nieuwegein",
		region: "Regio Utrecht",
		population: "65.000 inwoners",
		description:
			"Nieuwegein combineert stedelijke voorzieningen met een groene omgeving. Oorspronkelijk gebouwd als overloopgemeente voor Utrecht, heeft de stad een eigen identiteit ontwikkeld met een sterk MKB-klimaat.",
		businessContext:
			"Met City Plaza als winkelhart en diverse bedrijventerreinen trekt Nieuwegein zowel lokale als regionale klanten. Online zichtbaarheid bepaalt of klanten uit Utrecht en omgeving jouw bedrijf vinden of naar de concurrent gaan.",
		localFocus:
			"Nieuwegein is praktisch ingesteld. Ondernemers hier waarderen directheid en resultaat. Geen poespas, wel een website die doet wat 'ie moet doen: klanten aantrekken en converteren.",
		nearbyAreas: ["IJsselstein", "Utrecht", "Houten", "Vianen"],
		landmarks: "City Plaza, Fort Vreeswijk, Stadsplein",
		stats: {
			businesses: "6.200+ ondernemers",
			mainIndustry: "MKB & Groothandel",
			economicFact: "Nieuwegein heeft meer dan 35 hectare aan bedrijventerreinen met directe A2/A27 toegang",
			founded: "Gemeente sinds 1971"
		},
		targetIndustries: ["Groothandel", "Logistiek", "Automotive", "Bouwbedrijven", "Installateurs"],
		faqs: [
			{
				question: "Wat kost een website laten maken in Nieuwegein?",
				answer: "Een professionele website kost €595 eenmalig. Vaste prijs, geen verborgen kosten. Hosting inbegrepen, binnen 7 dagen online."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "7 dagen van start tot livegang. Praktisch en efficiënt, zoals Nieuwegein zelf. Geen eindeloze vergaderingen, wel een website die werkt."
			},
			{
				question: "Werken jullie voor MKB-bedrijven?",
				answer: "Ja, MKB-bedrijven zijn onze focus. Van retailers bij City Plaza tot dienstverleners op de bedrijventerreinen — we begrijpen wat lokale ondernemers nodig hebben."
			},
			{
				question: "Is hosting inbegrepen bij de website?",
				answer: "Ja, hosting is altijd inbegrepen zonder extra kosten. Optioneel kun je een beheerpakket (€49/maand) afnemen voor updates en kleine aanpassingen."
			},
			{
				question: "Hoe word ik beter vindbaar in Google?",
				answer: "We bouwen websites die technisch geoptimaliseerd zijn voor zoekmachines. Snelle laadtijd, goede structuur, en lokale SEO zorgen dat je beter gevonden wordt dan concurrenten."
			}
		],
	},
    geldermalsen: {
		name: "Geldermalsen",
		slug: "geldermalsen",
		region: "Rivierenland",
		population: "27.000 inwoners",
		description:
			"Geldermalsen ligt centraal in de Betuwe en vormt een belangrijk knooppunt in het Rivierenland. Met goede verbindingen naar Utrecht, Den Bosch en Nijmegen is het een strategische locatie voor ondernemers.",
		businessContext:
			"In het Rivierenland kiezen klanten vaak lokaal. Een sterke online aanwezigheid zorgt ervoor dat je gevonden wordt door iedereen in de wijde omgeving – van Tiel tot Culemborg, van Leerdam tot Zaltbommel.",
		localFocus:
			"De Betuwe kent een eigen mentaliteit: nuchter, betrouwbaar, en wars van opsmuk. Wij maken websites die bij deze cultuur passen – professioneel zonder pretentie, effectief zonder poespas.",
		nearbyAreas: ["Beesd", "Meteren", "Buurmalsen", "Deil"],
		landmarks: "Station Geldermalsen, Landgoed Doddendael",
		stats: {
			businesses: "2.400+ ondernemers",
			mainIndustry: "Agribusiness & Transport",
			economicFact: "Geldermalsen is een logistieke hub met IC-station en directe verbinding naar Randstad én Brabant",
			founded: "Gemeente West Betuwe sinds 2019"
		},
		targetIndustries: ["Schilders & Klussenbedrijven", "Agrarisch", "Transport & Logistiek", "Ambachtelijke beroepen"],
		relatedProject: "schildersbedrijf-visser",
		faqs: [
			{
				question: "Wat kost een website laten maken in Geldermalsen?",
				answer: "Een professionele website kost €595 eenmalig. Geen uurtje-factuurtje, geen verborgen kosten. Hosting inbegrepen, binnen 7 dagen online."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "7 dagen van eerste gesprek tot livegang. Nuchter en efficiënt, zoals de Betuwe zelf. We leveren wat we beloven, zonder omwegen."
			},
			{
				question: "Werken jullie voor bedrijven in de hele Betuwe?",
				answer: "Ja, we werken voor ondernemers in heel Rivierenland. Van Geldermalsen tot Tiel, van Culemborg tot Zaltbommel — de hele regio is ons werkgebied."
			},
			{
				question: "Is hosting inbegrepen bij de website?",
				answer: "Ja, hosting is altijd inbegrepen. Je website draait op snelle servers zonder extra maandelijkse kosten. Optioneel: beheerpakket (€49/maand) voor updates."
			},
			{
				question: "Hebben jullie ervaring met lokale bedrijven?",
				answer: "Zeker. We hebben onder andere een website gemaakt voor een schildersbedrijf in Geldermalsen. We begrijpen de Betuwse markt en wat lokale ondernemers nodig hebben."
			}
		],
	},
    tiel: {
		name: "Tiel",
		slug: "tiel",
		region: "Rivierenland",
		population: "42.000 inwoners",
		description:
			"Tiel is de grootste stad van het Rivierenland en bekend van de Fruitcorso. Als regionaal centrum trekt de stad klanten uit de hele Betuwe voor winkelen, dienstverlening en horeca.",
		businessContext:
			"Als ondernemer in Tiel bedien je niet alleen de stad zelf, maar ook de wijde omgeving. Inwoners uit dorpen als Zoelen, Wadenoijen en Kapel-Avezaath komen naar Tiel voor hun aankopen. Een goede website vergroot je bereik in heel West-Betuwe.",
		localFocus:
			"Tiel is trots op haar identiteit als fruitstad en regiocentrum. Ondernemers hier zijn ambitieus maar met beide benen op de grond. Wij bouwen websites die deze balans weerspiegelen.",
		nearbyAreas: ["Zoelen", "Drumpt", "Kapel-Avezaath", "Wamel"],
		landmarks: "Fruitcorso, Flipje, Agnietenstraat",
		stats: {
			businesses: "3.800+ ondernemers",
			mainIndustry: "Retail & Food",
			economicFact: "Tiel trekt jaarlijks 100.000+ bezoekers naar de Fruitcorso – de grootste in Nederland",
			founded: "Stadsrechten sinds 1200"
		},
		targetIndustries: ["Retail & Winkels", "Horeca & Catering", "Interieur & Design", "Schoonheidssalons"],
		relatedProject: "byshakir",
		faqs: [
			{
				question: "Wat kost een website laten maken in Tiel?",
				answer: "Een professionele website kost €595 eenmalig. Vaste prijs, hosting inbegrepen, binnen 7 dagen online. Voor Tielse ondernemers in de Agnietenstraat of het centrum is dit een slimme investering die zichzelf terugverdient via nieuwe klanten."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "7 dagen van start tot livegang. We werken efficiënt zodat jij snel online bent en klanten uit heel Rivierenland kunt bereiken — van Zoelen tot Wamel."
			},
			{
				question: "Maken jullie ook websites voor luxe winkels en interieurzaken?",
				answer: "Ja, we hebben onder andere de website van By Shakir gemaakt — een luxe interieurzaak in Tiel. We weten hoe je een premium uitstraling creëert die past bij high-end producten en de verwachte kwaliteit van je klanten."
			},
			{
				question: "Kan ik tijdens de Fruitcorso extra bezoekers naar mijn website trekken?",
				answer: "Absoluut. De Fruitcorso trekt jaarlijks 100.000+ bezoekers naar Tiel. Met een goede website en lokale SEO vinden deze bezoekers jouw zaak. We kunnen speciale landingspagina's maken voor evenementen."
			},
			{
				question: "Bereik ik ook klanten buiten Tiel met mijn website?",
				answer: "Zeker. Als regiocentrum van het Rivierenland bedien je klanten uit Zoelen, Drumpt, Kapel-Avezaath en omliggende dorpen. We optimaliseren je website voor de hele regio, zodat je bereik groter is dan alleen de stad."
			}
		],
	},
    vianen: {
		name: "Vianen",
		slug: "vianen",
		region: "Regio Utrecht",
		population: "20.000 inwoners",
		description:
			"Vianen is een historisch stadje aan de Lek met een monumentale binnenstad. De perfecte ligging tussen Utrecht en Gorinchem maakt het aantrekkelijk voor ondernemers die beide markten willen bedienen.",
		businessContext:
			"Vianen profiteert van haar ligging langs de A2 en A27. Bedrijven hier trekken klanten uit zowel de Randstad als het Rivierenland. Online zichtbaarheid in beide regio's is daarom essentieel.",
		localFocus:
			"De Vianense binnenstad ademt historie, maar de ondernemers kijken vooruit. Wij bouwen moderne websites die de charme van de stad combineren met de professionaliteit die klanten verwachten.",
		nearbyAreas: ["Lexmond", "Hagestein", "Nieuwegein", "Leerdam"],
		landmarks: "Voorstraat, Lekpoort, Binnenhaven",
		stats: {
			businesses: "1.900+ ondernemers",
			mainIndustry: "Handel & Logistiek",
			economicFact: "Vianen was historisch een vrijplaats – ondernemers die elders niet welkom waren vestigden zich hier",
			founded: "Stadsrechten sinds 1336"
		},
		targetIndustries: ["E-commerce & Handel", "Accountants & Administratie", "Makelaars", "Adviesbureaus"],
		faqs: [
			{
				question: "Wat kost een website laten maken in Vianen?",
				answer: "Een professionele website kost €595 eenmalig. Vaste prijs, hosting inbegrepen, binnen 7 dagen online. Geen verborgen kosten."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "7 dagen van start tot livegang. Efficiënt en zonder gedoe, zodat jij snel online bent en klanten uit zowel de Randstad als Rivierenland kunt bereiken."
			},
			{
				question: "Kan ik klanten uit meerdere regio's bereiken?",
				answer: "Ja, we optimaliseren je website voor meerdere regio's. Vianen ligt strategisch — met de juiste SEO bereik je klanten uit Utrecht, Gorinchem en alles daartussen."
			},
			{
				question: "Is hosting inbegrepen bij de website?",
				answer: "Ja, hosting is altijd inbegrepen. Geen extra maandelijkse kosten. Optioneel kun je een beheerpakket (€49/maand) afnemen voor updates en aanpassingen."
			},
			{
				question: "Schrijven jullie ook de teksten voor mijn website?",
				answer: "Ja, we schrijven alle teksten voor je. We onderzoeken jouw branche en concurrenten, en leveren content die jouw klanten aanspreekt. Wil je liever eigen teksten? Geen probleem."
			}
		],
	},
    ijsselstein: {
		name: "IJsselstein",
		slug: "ijsselstein",
		region: "Regio Utrecht",
		population: "35.000 inwoners",
		description:
			"IJsselstein is een historische vestingstad met een levendige binnenstad en een sterke lokale gemeenschap. De Gerbrandytoren aan de horizon symboliseert de verbinding tussen traditie en moderniteit.",
		businessContext:
			"IJsselsteiners zijn gehecht aan hun stad en kiezen graag lokaal. Maar ze verwachten wel dat lokale ondernemers even professioneel overkomen als de grote ketens. Een goede website is geen luxe, maar noodzaak.",
		localFocus:
			"Van de weekmarkt op de Overtoom tot de speciaalzaken in de Benschopperstraat – IJsselstein heeft een eigen winkelcultuur. Wij begrijpen deze dynamiek en bouwen websites die lokale klanten aanspreken.",
		nearbyAreas: ["Lopik", "Nieuwegein", "Montfoort", "Benschop"],
		landmarks: "Gerbrandytoren, Overtoom, Walkade",
		stats: {
			businesses: "3.200+ ondernemers",
			mainIndustry: "Detailhandel & Ambacht",
			economicFact: "IJsselstein heeft de langste winkelstraat van de regio met meer dan 100 speciaalzaken",
			founded: "Stadsrechten sinds 1310"
		},
		targetIndustries: ["Speciaalzaken & Winkels", "Kappers & Barbershops", "Ambachtslieden", "Fysiotherapie & Zorg"],
		faqs: [
			{
				question: "Wat kost een website laten maken in IJsselstein?",
				answer: "Een professionele website kost €595 eenmalig. Vaste prijs, hosting inbegrepen, binnen 7 dagen online. Even professioneel als de grote ketens, voor een fractie van de prijs."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "7 dagen van start tot livegang. Snel en efficiënt, zodat jij je kunt richten op je onderneming terwijl wij je website bouwen."
			},
			{
				question: "Waarom zou ik kiezen voor een lokale webdesigner?",
				answer: "Persoonlijk contact, korte lijnen, en iemand die de IJsselsteinse markt begrijpt. Geen anonieme helpdesks, maar direct contact wanneer je vragen hebt."
			},
			{
				question: "Is hosting inbegrepen bij de website?",
				answer: "Ja, hosting is altijd inbegrepen. Geen extra maandelijkse kosten. Optioneel kun je een beheerpakket (€49/maand) afnemen voor updates en aanpassingen."
			},
			{
				question: "Kan ik concurreren met grote ketens?",
				answer: "Absoluut. Met een snelle, professionele website die goed vindbaar is in Google kun je als lokale ondernemer prima concurreren. IJsselsteiners kiezen graag lokaal — zorg dat ze je vinden."
			}
		],
	},
    beesd: {
		name: "Beesd",
		slug: "beesd",
		region: "Rivierenland",
		population: "6.000 inwoners",
		description:
			"Beesd is een karakteristiek Betuws dorp met een actieve ondernemersgemeenschap. Ondanks het kleinere formaat kent Beesd verrassend veel lokale bedrijvigheid – van hoveniers tot horecazaken.",
		businessContext:
			"In een kleiner dorp als Beesd is persoonlijke reputatie alles. Maar nieuwe klanten oriënteren zich ook hier steeds vaker online. Een professionele website versterkt je lokale reputatie en trekt klanten uit de omliggende dorpen.",
		localFocus:
			"In Beesd kent iedereen elkaar. Wij bouwen websites die deze persoonlijke sfeer uitstralen – professioneel, maar toegankelijk. Geen grote-stadse uitstraling, wel een website die past bij de Betuwse nuchterheid.",
		nearbyAreas: ["Rumpt", "Gellicum", "Rhenoy", "Geldermalsen"],
		landmarks: "Hervormde Kerk, Dorpsstraat",
		stats: {
			businesses: "650+ ondernemers",
			mainIndustry: "Hoveniers & Groenvoorziening",
			economicFact: "Beesd ligt in het hart van de fruitteelt – meer dan 30% van de lokale bedrijvigheid is agrarisch",
			founded: "Eerste vermelding 850 n.Chr."
		},
		targetIndustries: ["Hoveniers & Tuincentra", "Loonwerkers", "B&B's & Recreatie", "Timmerlieden & Aannemers"],
		faqs: [
			{
				question: "Wat kost een website laten maken in Beesd?",
				answer: "Een professionele website kost €595 eenmalig. Betaalbaar voor ondernemers in een kleiner dorp, met dezelfde kwaliteit als een groot bureau."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "7 dagen van start tot livegang. Snel en efficiënt, zodat jij je kunt richten op je klanten terwijl wij je website bouwen."
			},
			{
				question: "Bereik ik ook klanten buiten Beesd?",
				answer: "Zeker. We optimaliseren je website voor de hele regio. Klanten uit Rumpt, Gellicum, Geldermalsen en de rest van de Betuwe vinden jou via Google."
			},
			{
				question: "Is hosting inbegrepen bij de website?",
				answer: "Ja, hosting is altijd inbegrepen. Geen extra maandelijkse kosten. Optioneel kun je een beheerpakket (€49/maand) afnemen voor updates en aanpassingen."
			},
			{
				question: "Werken jullie ook voor kleine bedrijven?",
				answer: "Absoluut. Veel van onze klanten zijn ZZP'ers en kleine bedrijven. Een website van €595 is een slimme investering die zichzelf terugverdient."
			}
		],
	},
    buren: {
		name: "Buren",
		slug: "buren",
		region: "Rivierenland",
		population: "3.000 inwoners",
		description:
			"Buren is een pittoresk vestingstadje met een rijke historie – ooit de residentie van het huis Oranje-Nassau. Het stadje trekt toeristen en heeft een actieve gemeenschap van lokale ondernemers.",
		businessContext:
			"Als ondernemer in Buren heb je een unieke positie: een historische setting die toeristen trekt, gecombineerd met een loyale lokale klantenkring. Een website die beide doelgroepen aanspreekt vergroot je bereik aanzienlijk.",
		localFocus:
			"Buren heeft een bijzondere uitstraling die je website moet weerspiegelen. Wij begrijpen de balans tussen het historische karakter en de moderne wensen van ondernemers die hier actief zijn.",
		nearbyAreas: ["Beusichem", "Maurik", "Zoelen", "Lienden"],
		landmarks: "Museum Buren, Stadsmuur, Markt",
		stats: {
			businesses: "350+ ondernemers",
			mainIndustry: "Toerisme & Horeca",
			economicFact: "Buren was de geboorteplaats van Anna van Buren, stammoeder van het huis Oranje-Nassau",
			founded: "Stadsrechten sinds 1395"
		},
		targetIndustries: ["Restaurants & Cafés", "Kunst & Antiek", "Bed & Breakfasts", "Ambachtelijke producten"],
		faqs: [
			{
				question: "Wat kost een website laten maken in Buren?",
				answer: "Een professionele website kost €595 eenmalig. Vaste prijs, hosting inbegrepen, binnen 7 dagen online. Perfect voor ondernemers in een historisch stadje."
			},
			{
				question: "Hoe lang duurt het om een website te maken?",
				answer: "7 dagen van start tot livegang. Snel en efficiënt, zodat jij je kunt richten op je klanten en toeristen."
			},
			{
				question: "Kan ik ook toeristen bereiken met mijn website?",
				answer: "Absoluut. Buren trekt veel toeristen die online zoeken naar restaurants, winkels en activiteiten. Een goede website zorgt dat ze jou vinden voordat ze langskomen."
			},
			{
				question: "Is hosting inbegrepen bij de website?",
				answer: "Ja, hosting is altijd inbegrepen. Geen extra maandelijkse kosten. Optioneel kun je een beheerpakket (€49/maand) afnemen voor updates en aanpassingen."
			},
			{
				question: "Maken jullie de website passend bij mijn bedrijf?",
				answer: "Altijd. We onderzoeken jouw branche en doelgroep, en bouwen een website die past bij wat jij doet. Geen standaard template, maar een ontwerp dat jouw bedrijf goed representeert."
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
