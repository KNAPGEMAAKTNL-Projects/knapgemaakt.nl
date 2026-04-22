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
			'In Rivierenland zitten veel familiebedrijven: bouw, installatie, horeca, dienstverleners en kleinere retail. Wat de meesten delen is dat klanten eerst online kijken voordat ze bellen of langsgaan. De website is in de praktijk de etalage, en vaak de reden dat iemand wél of juist geen contact opneemt. Voor dat soort bedrijven werk ik: duidelijk maken wat je doet, voor wie je het doet, en hoe iemand je bereikt. De rest van het verkooptraject loopt daarna een stuk soepeler.',
	},
	'Utrecht': {
		region: 'Utrecht',
		introLine:
			'Vanuit Buren rijd ik zo de provincie in. Utrecht en omgeving zit in mijn werkgebied, zeker richting Houten, Nieuwegein en IJsselstein.',
		commonTraits:
			'De Utrechtse regio is breed. Van MKB in de stad tot dienstverleners in de randgemeentes, en van jong groeiende zzp\'ers tot gevestigde familiebedrijven. Wat veel van mijn klanten hier gemeen hebben is dat ze ooit naast een bureau zijn gevallen: het project kwam te laat op gang, de contactpersoon wisselde ondertussen twee keer en de factuur was fors voor wat er uiteindelijk opgeleverd werd. Persoonlijk contact met één vaste persoon, die ook het werk zelf doet, wint dan van een polished pitch met een teamfoto.',
	},
	'Gelderland': {
		region: 'Gelderland',
		introLine:
			'Mijn eigen provincie. Buren ligt in Gelderland, dus als je hier zit, hoef je niet ver te zoeken.',
		commonTraits:
			'Gelderse ondernemers zijn over het algemeen nuchter. Ze willen weten wat een website kost, wat die oplevert en wie ze bellen als er wat is. Dat past bij hoe ik werk: één vast bedrag, één aanspreekpunt en heldere afspraken vooraf. Vage pakketten met eindeloze meerwerk-facturen zijn niet mijn stijl, en offertes die je met een vergrootglas moet lezen ook niet. Voor ondernemers buiten Rivierenland pak ik graag Nijmegen en omgeving op, dat is iets meer dan een half uur rijden vanuit Buren.',
	},
	'Noord-Brabant': {
		region: 'Noord-Brabant',
		introLine:
			'Brabant ligt iets verder, maar goed bereikbaar vanuit Buren via de A2 of A15. Ik werk regelmatig voor ondernemers in Den Bosch, Oss en Rosmalen.',
		commonTraits:
			'Brabantse ondernemers houden van direct contact en helderheid. In de praktijk merk ik dat er weinig geduld is voor eindeloze offerte-rondes of e-mails die pas twee dagen later beantwoord worden. Dat komt goed uit, want zo werk ik ook: ik reageer meestal binnen een werkdag en voor een snelle kennismaking bel ik liever dan dat we drie weken over en weer mailen. Van Den Bosch tot Oss is het een klein half uur rijden vanuit Buren, dus langskomen kan zonder gedoe.',
	},
	'Zuid-Holland': {
		region: 'Zuid-Holland',
		introLine:
			'De rand richting Zuid-Holland pak ik graag op. Gorinchem, Leerdam en omgeving zijn goed bereikbaar vanuit Buren.',
		commonTraits:
			'Ondernemers aan de Zuid-Hollandse kant van de regio willen vaak iemand die lokaal denkt maar ook landelijk meekijkt. Dat hoeven bij mij niet twee partijen te zijn. Een maatwerk site die werkt voor klanten in Gorinchem werkt net zo goed voor klanten uit Utrecht of Rotterdam die bij jou online landen. Ik bouw iedere site voor heel Nederland, maar schrijf en structureer \'m zo dat lokale klanten je als eerste vinden. Zuid-Holland is vanuit Buren een half uur rijden via de A15, dus afspreken kan prima ter plekke.',
	},
};

export function getRegion(region: Region): RegionData {
	return regions[region];
}
