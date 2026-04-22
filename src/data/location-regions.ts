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
