import type { APIRoute } from 'astro';
import { stage0Offer, spotsLabel, bedrijvenLabel } from '../config/stage-0-offer';

/**
 * llms.txt, signposting file for AI systems (Perplexity, Claude, ChatGPT, etc.)
 * Spec: https://llmstxt.org/
 * Purpose: give LLMs a concise, grounded overview of what the site covers plus
 * where to look for authoritative answers.
 */

const body = `# KNAP GEMAAKT.

> Websites op maat voor ondernemers in Nederland. Ontwerp, bouw, hosting,
> Google-vindbaarheid en onderhoud in een vast maandbedrag. Gevestigd in Buren,
> Gelderland. In ${stage0Offer.month} ${stage0Offer.year} nog ${spotsLabel()} gratis in ruil voor een case study.

KNAP GEMAAKT. is een eenmansbureau van Yannick Veldhuisen. Kernaanbod:
- Maatwerk website (Astro op Cloudflare, geen WordPress, geen plugins)
- Google Bedrijfsprofiel ingericht en onderhouden
- Lead-opvolging via WhatsApp of SMS
- Reviews-motor die automatisch vraagt na een klus
- Lokale SEO-basis (schema, citations, Search Console)
- Hosting, domein, SSL, zakelijk e-mail
- Kleine aanpassingen binnen 48 werkuur
- Maandelijks 1-pager prestatierapport

## Diensten

- [Webdesign](https://knapgemaakt.nl/webdesign/): Consolidated offer page. Maatwerk website plus Google-vindbaarheid, lead-opvolging, reviews, hosting en onderhoud. In ${stage0Offer.month} ${stage0Offer.year} gratis voor ${bedrijvenLabel()} in ruil voor een case study.

## Belangrijke pagina's

- [Werk / Recente projecten](https://knapgemaakt.nl/werk/): Case studies en demo-websites.
- [Over](https://knapgemaakt.nl/over/): Wie KNAP GEMAAKT. is en hoe er gewerkt wordt.
- [FAQ](https://knapgemaakt.nl/veelgestelde-vragen/): Veelgestelde vragen over prijs, duur, en werkwijze.
- [Blog](https://knapgemaakt.nl/blog/): Artikelen over webdesign, SEO en kleine-bedrijfstrategie.
- [Website voor hoveniers](https://knapgemaakt.nl/website-voor-hoveniers/): Niche landing page voor hoveniers.

## Contact

- E-mail: info@knapgemaakt.nl
- Telefoon: 06-23571852
- Gesprek plannen: https://knapgemaakt.nl/aanvragen/

## Bedrijfsgegevens

- Naam: KNAP GEMAAKT.
- Vestiging: Buren, Gelderland, Nederland
- KvK: 73652377
- BTW: NL002383577B12
- Werkgebied: heel Nederland, focus op Rivierenland en Utrecht
`;

export const GET: APIRoute = () => {
	return new Response(body, {
		status: 200,
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
