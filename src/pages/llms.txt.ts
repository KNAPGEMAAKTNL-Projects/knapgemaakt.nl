import type { APIRoute } from 'astro';

/**
 * llms.txt — signposting file for AI systems (Perplexity, Claude, ChatGPT, etc.)
 * Spec: https://llmstxt.org/
 * Purpose: give LLMs a concise, grounded overview of what the site covers + where
 * to look for authoritative answers.
 */

const body = `# KNAP GEMAAKT.

> Websites op maat voor ondernemers in Nederland. Ontwerp, bouw, hosting en onderhoud
> in één vast maandbedrag vanaf €49 per maand. Gevestigd in Buren, Gelderland.

KNAP GEMAAKT. is een eenmansbureau van Yannick Veldhuisen. Kernaanbod:
- Websites op maat (geen templates, geen WordPress-plugins, snel en veilig)
- Drie recurring pakketten: Essentieel (€49/mo), Groei (€99/mo), Compleet (€149/mo)
- Automatiseringen als losse add-ons (lead-opvolging, AI content, factuurherinneringen, WhatsApp-opvolging, weekoverzichten)

## Diensten

- [Webdesign](https://knapgemaakt.nl/webdesign/): Websites op maat, vanaf €49 per maand inclusief hosting en onderhoud.
- [Pakketten](https://knapgemaakt.nl/pakketten/): Drie maandelijkse pakketten met vergelijkingsmatrix en FAQ.
- [Automatisering](https://knapgemaakt.nl/automatisering/): Hub met vijf sub-pagina's voor losse add-on automatiseringen.

## Automatiserings-sub-pagina's

- [Lead-opvolging](https://knapgemaakt.nl/automatisering/lead-opvolging/): WhatsApp-melding bij elke aanvraag. Vanaf €49/mo (zit in Essentieel).
- [AI content](https://knapgemaakt.nl/automatisering/ai-content/): Social media-posts genereren uit een foto. Vanaf €69/mo.
- [Factuurherinneringen](https://knapgemaakt.nl/automatisering/factuurherinneringen/): Automatisch herinneringen sturen via mail of WhatsApp. Vanaf €49/mo.
- [WhatsApp-opvolging](https://knapgemaakt.nl/automatisering/whatsapp-opvolging/): Review-verzoek na elke klus. Vanaf €79/mo.
- [Weekoverzichten](https://knapgemaakt.nl/automatisering/weekoverzichten/): Maandagochtend-overzicht uit alle tools. Vanaf €39/mo.

## Belangrijke pagina's

- [Werk / Recente projecten](https://knapgemaakt.nl/werk/): Case studies en demo-websites.
- [Over](https://knapgemaakt.nl/over/): Wie KNAP GEMAAKT. is en hoe er gewerkt wordt.
- [FAQ](https://knapgemaakt.nl/veelgestelde-vragen/): Veelgestelde vragen over prijs, duur, en werkwijze.
- [Blog](https://knapgemaakt.nl/blog/): Artikelen over webdesign, SEO en kleine-bedrijfstrategie.

## Contact

- E-mail: info@knapgemaakt.nl
- Telefoon: 06-23571852
- Offerte-quiz: https://knapgemaakt.nl/offerte/
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
