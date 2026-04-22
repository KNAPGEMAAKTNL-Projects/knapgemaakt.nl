import { haversineKm } from '../utils/geo';
import type { Region } from './location-regions';

export interface LocationData {
	slug: string;
	name: string;
	region: Region;
	travelMinutes: number;
	lat: number;
	lng: number;
	caseSlug?: string;
	hasCustomProse?: boolean;
	showcase?: boolean;
}

export const locations: LocationData[] = [
	// Rivierenland
	{
		slug: 'culemborg',
		name: 'Culemborg',
		region: 'Rivierenland',
		travelMinutes: 15,
		lat: 51.9539,
		lng: 5.2254,
		caseSlug: 'maatwerk-website-voor-fitcity-culemborg',
		hasCustomProse: true,
		showcase: true,
	},
	{
		slug: 'tiel',
		name: 'Tiel',
		region: 'Rivierenland',
		travelMinutes: 15,
		lat: 51.8844,
		lng: 5.4295,
		showcase: true,
	},
	{
		slug: 'geldermalsen',
		name: 'Geldermalsen',
		region: 'Rivierenland',
		travelMinutes: 10,
		lat: 51.8830,
		lng: 5.2904,
	},
	{
		slug: 'beesd',
		name: 'Beesd',
		region: 'Rivierenland',
		travelMinutes: 10,
		lat: 51.8876,
		lng: 5.1859,
	},
	{
		slug: 'buren',
		name: 'Buren',
		region: 'Rivierenland',
		travelMinutes: 0,
		lat: 51.9246,
		lng: 5.3419,
	},
	{
		slug: 'leerdam',
		name: 'Leerdam',
		region: 'Rivierenland',
		travelMinutes: 25,
		lat: 51.8942,
		lng: 5.0932,
	},

	// Utrecht
	{
		slug: 'utrecht',
		name: 'Utrecht',
		region: 'Utrecht',
		travelMinutes: 30,
		lat: 52.0907,
		lng: 5.1214,
		showcase: true,
	},
	{
		slug: 'houten',
		name: 'Houten',
		region: 'Utrecht',
		travelMinutes: 25,
		lat: 52.0296,
		lng: 5.1699,
	},
	{
		slug: 'nieuwegein',
		name: 'Nieuwegein',
		region: 'Utrecht',
		travelMinutes: 25,
		lat: 52.0293,
		lng: 5.0810,
	},
	{
		slug: 'vianen',
		name: 'Vianen',
		region: 'Utrecht',
		travelMinutes: 20,
		lat: 51.9926,
		lng: 5.0918,
	},
	{
		slug: 'ijsselstein',
		name: 'IJsselstein',
		region: 'Utrecht',
		travelMinutes: 30,
		lat: 52.0182,
		lng: 5.0426,
	},
	{
		slug: 'wijk-bij-duurstede',
		name: 'Wijk bij Duurstede',
		region: 'Utrecht',
		travelMinutes: 20,
		lat: 51.9727,
		lng: 5.3426,
	},

	// Noord-Brabant
	{
		slug: 'den-bosch',
		name: 'Den Bosch',
		region: 'Noord-Brabant',
		travelMinutes: 35,
		lat: 51.6978,
		lng: 5.3037,
		showcase: true,
	},
	{
		slug: 'rosmalen',
		name: 'Rosmalen',
		region: 'Noord-Brabant',
		travelMinutes: 40,
		lat: 51.7155,
		lng: 5.3614,
	},
	{
		slug: 'oss',
		name: 'Oss',
		region: 'Noord-Brabant',
		travelMinutes: 30,
		lat: 51.7650,
		lng: 5.5188,
	},

	// Gelderland (non-Rivierenland)
	{
		slug: 'nijmegen',
		name: 'Nijmegen',
		region: 'Gelderland',
		travelMinutes: 45,
		lat: 51.8126,
		lng: 5.8372,
		showcase: true,
	},

	// Zuid-Holland
	{
		slug: 'gorinchem',
		name: 'Gorinchem',
		region: 'Zuid-Holland',
		travelMinutes: 30,
		lat: 51.8357,
		lng: 4.9717,
		showcase: true,
	},
];

export function getAllLocations(): LocationData[] {
	return locations;
}

export function getLocationBySlug(slug: string): LocationData | undefined {
	return locations.find((l) => l.slug === slug);
}

export function getShowcaseLocations(): LocationData[] {
	return locations.filter((l) => l.showcase);
}

export function getLocationsByRegion(): Record<string, LocationData[]> {
	const grouped: Record<string, LocationData[]> = {};
	for (const loc of locations) {
		if (!grouped[loc.region]) grouped[loc.region] = [];
		grouped[loc.region].push(loc);
	}
	for (const key of Object.keys(grouped)) {
		grouped[key].sort((a, b) => a.name.localeCompare(b.name, 'nl'));
	}
	return grouped;
}

export function getNearbyLocations(slug: string, limit = 5): LocationData[] {
	const self = getLocationBySlug(slug);
	if (!self) return [];
	return locations
		.filter((l) => l.slug !== slug)
		.map((l) => ({
			location: l,
			distance: haversineKm(self.lat, self.lng, l.lat, l.lng),
		}))
		.sort((a, b) => a.distance - b.distance)
		.slice(0, limit)
		.map((x) => x.location);
}
