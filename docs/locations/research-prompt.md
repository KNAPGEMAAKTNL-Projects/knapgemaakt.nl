# Location Pages Competitive Analysis, Research Prompt

**Target**: Claude.ai (with web browsing / research mode enabled)
**Purpose**: Before redesigning knapgemaakt.nl's location page system, learn how other Dutch web-design and service sites structure theirs. Focus on sitemap scale, URL patterns, content depth, anti-template tactics, and conversion elements.

**When the result comes back**: save the full response to `docs/locations/research/competitive-analysis.md`, then we use it as reference for the location-page system spec.

---

## Paste this prompt into Claude.ai

Hoi. Ik wil dat je een competitive analysis doet van hoe vijf Nederlandse websites hun "locatiepagina's" (city pages / service-plus-city landing pages) hebben opgezet. Gebruik de web browsing / research tools om sitemaps en pagina's op te halen.

### Achtergrond (kort)

Ik run KNAP GEMAAKT., een solo web-designer in Buren. Mijn huidige locatiepagina's zitten op `/webdesign-[stad]/`, met zo'n 17 steden. Ze voelen half-af: te veel "wat je krijgt" boilerplate, weinig echt onderscheidend per stad. Ik ga het systeem herontwerpen en wil eerst zien hoe concurrenten het doen. Zowel wat ik wil kopiëren als wat ik wil vermijden.

Mijn huidige aanpak: één vast template met per-stad velden (hero-subheadline, localProof, nearbyAreas, FAQ's, optioneel gerelateerd project). Geen populatiestats, geen economische feiten, geen landmarks (die zijn er ooit uit gehaald omdat ze gekunsteld voelden). Eerstepersoons-tone ("ik", niet "wij").

Toekomstvisie: ook `/hovenier-[stad]/`-achtige vertical+city pages erbij, zodra ik een hovenier-case-study heb.

### Te onderzoeken sites

1. **lemone.com**
2. **websteen.nl** (als .com niet bestaat, probeer .nl)
3. **suilichem.com**
4. **vwebdesign.nl** (voorbeeld: https://www.vwebdesign.nl/l392/website-maken-culemborg)
5. **wowmedia.nl** (voorbeeld: https://wowmedia.nl/website-laten-maken/webdesign-tiel, sitemap: https://wowmedia.nl/sitemap)

Extra referentie voor schaal-inspiratie (andere branche, maar extreem veel locatiepagina's):

6. **nationalerijschool.nl** (sitemap: https://nationalerijschool.nl/html-sitemap/)

### Wat ik per site wil weten

Per site, haal eerst de sitemap op (probeer `/sitemap.xml`, `/sitemap_index.xml`, `/sitemap`, of een HTML-sitemap). Identificeer welke URL-patronen naar locatiepagina's verwijzen. Tel ze. Sample dan 3 tot 5 pagina's per site (kies gevarieerde steden, geen drie buurdorpen).

Voor elke site rapporteer:

**A. Schaal en structuur**
- Hoeveel locatiepagina's totaal (schatting van sitemap)
- URL-patroon: `/service-[stad]/`, `/[service]/[stad]/`, `/l123/[service]-[stad]`, etc. Noteer de exacte vorm
- Hiërarchie: zit er een hub / landing "alle locaties" pagina tussen?
- Service × stad combos: alleen webdesign per stad, of ook andere diensten per stad? (Als ja, welke diensten?)

**B. On-page content**
- Gemiddelde woordaantal per pagina (schatting)
- H1 en H2 patroon (copy-paste de H-tags van één voorbeeldpagina)
- Sections op een typische pagina (hero, what-you-get, testimonial, FAQ, etc.), in volgorde
- Hoe "uniek" voelt de content per pagina? (1 = compleet templated met alleen stadsnaam-swap, 5 = elke pagina echt anders geschreven)
- Specifieke stads-details die ze gebruiken (wijken? landmarks? ondernemers-voorbeelden? getallen? niets?)

**C. Vertrouwen en conversie**
- Sociale proof: testimonials per stad, logo's, reviews, sterren?
- CTA's: hoeveel, welke tekst, waar op de pagina?
- Contact: telefoon, formulier, chat, afspraak-tool?
- Prijsinformatie: concrete bedragen, ranges, "vanaf", of geen prijzen?

**D. SEO en techniek**
- Title tag patroon (copy-paste 2 voorbeelden)
- Meta description (copy-paste 2 voorbeelden)
- Schema-markup zichtbaar in de page source? (LocalBusiness, FAQPage, BreadcrumbList, Service, etc.)
- Interne links: linken locatiepagina's naar elkaar? Naar een centrale service-pagina? Naar blogposts?
- Images: uniek per stad of één default?

**E. Anti-template signalen**
- Wat doet elke pagina om niet als "template met stad-swap" te voelen?
- Waar faalt dat juist? (bijv. identieke openingsalinea behalve de stadsnaam)
- Voelt het als AI-gegenereerd? Waarom wel/niet?

### Output-format

Geef je antwoord in deze structuur:

```markdown
# Location Pages Competitive Analysis

## Overview table

| Site | Locatiepagina's | URL-pattern | Uniqueness (1-5) | Vertical x city? | Opvallend |
|------|-----------------|-------------|------------------|------------------|-----------|
| ... | ... | ... | ... | ... | ... |

## Per site

### 1. lemone.com
[Volledige analyse met A-E kopjes]

### 2. websteen.nl
[...]

[etc. voor alle 6]

## Cross-site patronen

### Wat de meeste doen (patroon)
- ...

### Wat de beste doen anders (opvallend)
- ...

### Rode vlaggen (patronen om te vermijden)
- ...

## Aanbeveling voor knapgemaakt.nl

### URL-structuur
[Concreet voorstel voor mijn situatie, met reden]

### Content-skeleton (sections, volgorde, geschatte woordaantal per sectie)
[Concreet voorstel]

### Hoe elke pagina uniek houden zonder handwerk per stad
[3 tot 5 tactieken uit de analyse, concreet toe te passen]

### Schema-markup shortlist
[Welke schemas zijn het waard]

### Interne linking-strategie
[Hub + nearby + service-pagina's]

### Beslissingen die ik nog moet maken
[Open vragen waar de data geen duidelijk antwoord op gaf]
```

### Regels voor het antwoord

- Nederlands. Eerste persoon ("ik"), geen "wij".
- Geen em-dashes. Gebruik komma's, dubbele punten, punten, of haakjes.
- Geen marketing-jargon ("geoptimaliseerd", "cruciaal", "professioneel").
- Als je een site niet kunt bereiken (robots.txt, paywall, JS-only), zeg dat expliciet en sla hem niet stil over.
- Geef concrete voorbeelden en quotes uit de pagina's, niet alleen samenvattingen.
- Als iets je opvalt wat niet in mijn vragen zat, voeg het toe onder "Overig opvallend".

Bedankt.

---

## Notes for future sessions

- After pasting the result back, save to `docs/locations/research/competitive-analysis.md`
- Then we can draft the spec for the new location-page system using this analysis as reference
- Re-run this prompt if competitor landscape shifts meaningfully (probably once a year max)
