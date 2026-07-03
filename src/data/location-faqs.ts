import type { Region } from './location-regions';

export type GlobalFAQId = 'pricing' | 'duration' | 'distance' | 'guarantee';

export interface TemplatedFAQ {
	id: GlobalFAQId;
	question: string;
	answer: string;
}

export const globalFAQs: TemplatedFAQ[] = [
	{
		id: 'pricing',
		question: 'Wat kost een website bij jou?',
		answer:
			'Eenmalig €497 plus €47 per maand. Daarvoor krijg je ontwerp, bouw, hosting, Google-vindbaarheid en lead-opvolging. Let wel: op dit moment zit de agenda vol en neem ik geen nieuwe projecten aan.',
	},
	{
		id: 'duration',
		question: 'Hoe lang duurt het om een website te maken?',
		answer:
			'Het bouwen zelf duurt ongeveer twee weken. Van eerste kennismaking tot livegang zit er gemiddeld 3 tot 5 weken tussen, afhankelijk van hoe snel we teksten en foto\'s rond hebben.',
	},
	{
		id: 'distance',
		question: 'Zit je in {{city}}?',
		answer:
			'Nee, ik zit in Buren. Vanuit hier ben ik in {{travelMinutes}} minuten bij je. Het meeste werk gaat digitaal, maar als je een keer wilt afspreken kan dat prima in {{city}}.',
	},
	{
		id: 'guarantee',
		question: 'Wat garandeer je?',
		answer:
			'Voor de betaalde pakketten: breng je in 90 dagen na livegang minder dan 3 extra klanten via de website binnen, dan werk ik gratis door tot dat aantal wel is gehaald. Enige voorwaarde: je reageert binnen 24 uur op aanvragen die binnenkomen en houdt je Google Bedrijfsprofiel actueel. Anders is de meting niet eerlijk.',
	},
];

export interface FAQTokens {
	city: string;
	travelMinutes: number;
	region: Region;
}

export function renderFAQ(
	faq: TemplatedFAQ,
	tokens: FAQTokens,
): { question: string; answer: string } {
	const replace = (s: string) =>
		s
			.replaceAll('{{city}}', tokens.city)
			.replaceAll('{{travelMinutes}}', String(tokens.travelMinutes))
			.replaceAll('{{region}}', tokens.region);

	return {
		question: replace(faq.question),
		answer: replace(faq.answer),
	};
}

export function getGlobalFAQ(id: GlobalFAQId): TemplatedFAQ {
	const faq = globalFAQs.find((f) => f.id === id);
	if (!faq) throw new Error(`Unknown FAQ id: ${id}`);
	return faq;
}
