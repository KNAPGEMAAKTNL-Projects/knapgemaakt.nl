# Location Pages Competitive Analysis

**Source**: Claude.ai research session, 2026-04-19
**Sites analyzed**: lemone.com, websteen.nl, suilichem.com, vwebdesign.nl, wowmedia.nl, nationalerijschool.nl
**Purpose**: Reference for designing knapgemaakt.nl's new location-page system.

---

Analyse van zes sites, met focus op wat bruikbaar is voor KNAP GEMAAKT. in Buren. Ik heb sitemaps en/of individuele pagina's opgehaald via web_fetch en web_search. Waar de fetcher URL's niet rechtstreeks toestond, heb ik via Google-indexering gewerkt en dat expliciet vermeld.

## Overview table

| Site | Locatiepagina's | URL-pattern | Uniqueness (1-5) | Vertical x city? | Opvallend |
|------|-----------------|-------------|------------------|------------------|-----------|
| lemone.com | 0 | n.v.t. | n.v.t. | Nee, sectoraal (zorg/food/onderwijs) ipv stedelijk | Bewuste keuze, positioneert zich landelijk maatwerk |
| websteen.nl | ~3-4 (Blaricum, Huizen 2x, regio 't Gooi) | `/webdesign-{stad}` en `/website-laten-{werkwoord}-{stad}`, inconsistent | 2 | Nee, alleen website | Concrete prijzen op pagina, reviews per stad gefilterd |
| suilichem.com | ~26 (16 webdesign + 7 reclamebureau + 3 social) | `/webdesign-{stad}`, `/reclamebureau-{stad}`, `/social-media-uitbesteden-{stad}` | 2 | Ja, drie diensten, ongelijke dekking | Dubbele H1 op elke pagina, klantaantal inconsistent (750/900/honderden) |
| vwebdesign.nl | ~40-60 (drie generaties door elkaar) | `/l{ID}/{slug}`, `/{Stad}-{nummer}`, `/{Stad}-webshop/laten-maken-{nummer}` | 2 | Ja, website + webshop | Inwonersgetal Houten gedupliceerd op Vianen-pagina (template-fout) |
| wowmedia.nl | 307 (alle NL-gemeentes, incl. verouderde) | `/website-laten-maken/webdesign-{stad}` | 1 | Nee, alleen webdesign | Case "The Car Spa, leukste autowasstraat van Amersfoort" op elke stad-pagina |
| nationalerijschool.nl | ~290 hoofd + 125 sub-services (~415 totaal) | `/rijschool/rijschool-in-{stad}/` + varianten, inconsistent | 2 | Ja, binnen auto (regulier/spoed/proefles/pakket) | Slaagcijfer per stad als enige harde lokale metric, "Vilsteren" leakt door op Ommen-pagina |

## Per site

### 1. lemone.com

**Bereikbaarheid:** sitemap.xml en robots.txt werden door de fetcher geweigerd (URL niet eerder in zoekresultaten). Homepage is wel opgehaald. Conclusie is voornamelijk op basis van `site:lemone.com` zoekopdrachten die geen stadspagina's opleveren.

#### A. Schaal en structuur
Geen locatiepagina's. De segmentatie is horizontaal (diensten: strategie, design, development, service) en verticaal (sectoren: zorg, food-health, onderwijs). Enige locatievermelding is de eigen vestiging Zaltbommel. Geen hub, geen stad-SEO-laag.

#### B. On-page content
Niet van toepassing. Ter illustratie: homepage heeft H1 "Puur online vakmanschap" met H2's als "Waar we goed in zijn", "Van strategie tot service", "Werk waar we trots op zijn". Sectorpagina's (`/zorg-voor-een-veilige-digitale-wereld/`, `/digitaal-leiderschap-in-food-health/`) zijn duidelijk handgeschreven met echte klantnamen (Catharina Ziekenhuis, CCV, FitChef).

#### C. Vertrouwen en conversie
Logostrip met nationale klanten (FD, Catharina Ziekenhuis, CCV, PVO). DDA-lidmaatschap als keurmerk. Geen sterren, geen testimonials op homepage, geen prijsinformatie. Telefoon 0418 745 669 prominent. Contactformulier, geen chat.

#### D. SEO en techniek
Title homepage: "Lemone - Puur online vakmanschap". Typefout in meta description ("verzorgd websites, webshops en verzorgd branding") is een menselijk signaal. Stack lijkt Bedrock/Sage (WordPress). Schema-markup niet geverifieerd.

#### E. Anti-template signalen
Niet van toepassing. Wel opvallend: de sectorpagina's zijn de functionele tegenhanger van wat anderen met stadspagina's doen, maar dan op industrie-as. Geen template-gevoel, zeer persoonlijke toon ("Let's make lemonade" in formulier-tagline).

#### Overig opvallend
Lemone concurreert in een ander segment dan KNAP GEMAAKT. (grotere klanten, hoger ticket, landelijk). Geen bruikbaar precedent voor stad-SEO, wel een relevant tegenvoorbeeld: je kunt als bureau ook zonder locatiepagina's bestaan als je je richt op een specifiek segment. Bureaus die wél "Webdesign Zaltbommel" publiceren (Padgin, Toon Online, Digiswift) zijn kleinere MKB-bureaus.

### 2. websteen.nl

**Bereikbaarheid:** sitemap niet toegankelijk via fetcher. Pagina's gevonden via Google en volledig opgehaald: `/webdesign-huizen`, `/website-laten-bouwen-huizen`, `/website-laten-maken-blaricum`, `/website-laten-maken-gooi/`.

#### A. Schaal en structuur
Slechts 3-4 stadspagina's gevonden. Twee URL-patronen naast elkaar (`/webdesign-{stad}` oud, `/website-laten-{werkwoord}-{stad}` nieuw). Huizen heeft twee varianten (kannibalisatie-risico). Regio 't Gooi laadt identieke content als Blaricum (canonical of rewrite). Geen hub, geen footer-locatielinks. Alleen "website laten maken" per stad, geen andere diensten.

#### B. On-page content
Circa 450-500 woorden echt stad-specifieke body, plus 2000+ woorden boilerplate (reviews, prijsblok, stappen, logos).

H1 Huizen: "Website laten bouwen door webbouwers 'made in Huizen'?"

H2's letterlijk: "Webbouwers sinds 2005" / "Nauwe betrokkenheid bij Huizen" / "Waarom is een webbouwer dichtbij Huizen heel handig?" / "Belangrijkste voordelen van een websitebouwer nabij Huizen op een rijtje" / "Websites /webshops gemaakt voor klanten uit Huizen" / "In 5 stappen een website op maat" / "Welke oplossing past bij jou?" / "Effectieve maatwerk website laten maken?" / "Uitnodiging: kom op bezoek in Blaricum" / "Jouw website, gemaakt nabij Huizen".

Sections: intro, historie sinds 2005, lokale binding, voordelen-blok, cases-slider, 5-stappen, reviewscarrousel, prijstabellen, klantlogo's, CTA, uitnodigingsblok.

Uniqueness: **2/5**. Structuur is identiek aan Blaricum. Reviews zijn wél per stad gefilterd (fit20 Huizen, Bootverhuur Huizen, Theaterroute-Huizen versus Lions Club Blaricum Laren, De Droomboom). Kantooradres (Blaricummermeent, A27) en eigenarenverhaal (Roy en Dennis Jongerden, "geboren en getogen in Huizen") zijn echte lokale ankers. Geen wijken, geen landmarks, geen straten.

#### C. Vertrouwen en conversie
Sterke proof: "228 reviews 9.6/10", "4.9/5 Lees 87 Google reviews", "Ruim 700 klanten gingen je voor". Logostrip (Mogelijk, Bergnet, Gemeente Amersfoort, Sennheiser, Phonak). FONK150 plek 43 in 2025. ICT Waarborg, Google Partner, Laravel-certificering.

CTA's: ruim 10 per pagina. Telefoon 035-5251676 in header en footer, e-mail, "Laten we kennismaken!", "Afspraak inplannen", "Gratis brainstorm", "Vrijblijvend advies" (5x in accordeon), "Direct berekenen" + "Meer informatie" per prijskolom, WhatsApp-knop rechtsonder (`wa.me/310850482072`).

Prijsinformatie: zeer expliciet en ongebruikelijk open. Basis website "€ 1.295,- / € 32,70 per maand", Website op maat "€ 9.980,- / € 69,05", Webshop "€ 15.920,- / € 101,65", Webapplicatie "€ 26.795,- / € 216,60".

#### D. SEO en techniek
Title patronen:
- "Website laten bouwen in Huizen – Websteen maatwerk & CMS"
- "Website laten maken door webbouwers in Blaricum? Websteen"

Meta description:
- "Websteen, gevestigd in Blaricum, vlakbij Huizen, maakt al sinds 2005 hoogwaardige maatwerk websites met een bijzonder gebruiksvriendelijk CMS."
- "Laat in Blaricum jouw site bouwen door Websteen: van basis tot maatwerk, eigen CMS, transparante prijzen & vrijblijvend adviesgesprek."

Schema-markup niet hard bevestigd (markdown-extractie stript script-tags). Visuele rating-notatie ("9.6/10", "87 Google reviews") suggereert AggregateRating-schema.

Interne links: uitgebreid naar dienstpagina's, cases, `/beoordelingen`, `/google-reviews`. Geen stad-naar-stad linking. Alt-teksten in het Nederlands, beschrijvend.

#### E. Anti-template signalen
Openingsalinea's vergeleken:

Blaricum en Huizen nieuwe variant beginnen met **exact dezelfde zin, zonder één woord verschil**: *"Wanneer je een professionele maatwerk website wilt laten maken, kan het handig zijn om te kiezen voor een ervaren specialist bij jou in de buurt."*

De "Nauwe betrokkenheid"-alinea wel lokaal gekleurd per stad. Reviews echt per stad gefilterd. Eigenarenverhaal is sterkste anti-template signaal: *"Roy en Dennis Jongerden, beiden eigenaar, geboren en getogen in Huizen"* is inhoudelijk verifieerbaar.

Voelt niet AI-gegenereerd. Informele taal ("Je mag dan ook wel stellen dat Websteen iets met Huizen heeft", "Of het typisch iets uit Huizen is durven we niet te zeggen"). Eerder handmatig copy-paste dan LLM.

Faalt op: geen wijken, geen landmarks, duplicate URL's voor Huizen, regiopagina laadt identieke content als Blaricum.

#### Overig opvallend
Blaricum H1 noemt "In 2026" letterlijk, Huizen niet. Jaartal wordt dus handmatig per pagina ververst, niet gecentraliseerd. Review-teller varieert tussen pagina's (228/227/224/218/212/202), wat wijst op live-feed uit extern systeem.

### 3. suilichem.com

**Bereikbaarheid:** sitemap niet toegankelijk via fetcher. Vier pagina's volledig opgehaald: Beuningen, Dodewaard, Maas en Waal, Elst, Lingewaard. Overige URL's uit footer-linklijst die op elke pagina staat.

#### A. Schaal en structuur
Circa **26 locatiepagina's** in drie diensten:
- Webdesign [stad]: 16 pagina's (Betuwe, Beuningen, Buren, Dodewaard, Druten, Elst, Gelderland, Heteren, Kesteren, Lienden, Lingewaard, Maas en Waal, Ochten, Opheusden, Veenendaal, Zetten)
- Reclamebureau [stad]: 7 pagina's
- Social media uitbesteden [stad]: 3 pagina's (Gelderland, Arnhem, Tiel)

URL-patroon letterlijk: `https://www.suilichem.com/webdesign-{stad}`, platte structuur, geen subfolder. Geen expliciete hub, maar de footer op élke pagina toont alle 26 URLs als platte interlink-lijst (de facto hub).

Meerdere diensten per stad, maar inconsistent: alleen Elst, Kesteren, Lingewaard, Maas en Waal, Opheusden, Betuwe en Gelderland hebben zowel webdesign als reclamebureau. Tiel heeft alleen social media, geen webdesign. **Relevant voor KNAP GEMAAKT.: Buren staat als webdesign-pagina bij Suilichem** (directe concurrent in dezelfde gemeente).

#### B. On-page content
350-650 woorden per pagina. Beuningen ~480, Dodewaard ~640, Maas en Waal ~470, Elst ~370, Lingewaard ~470.

H1 en H-tags van Webdesign Beuningen letterlijk:
- H1: `Webdesign Beuningen`
- H1 (tweede H1, dubbel): `Website laten designen Beuningen`
- H3: `Kosten webdesign Beuningen?`

Dubbele H1 op elke pagina, geen H2. Sections: H1 → intro-alinea → tweede H1 → lange body (SEO, navigatie, design) → H3 over kosten → offerte-alinea → CTA → footer.

Uniqueness: **2/5**. Openingsalinea's gevarieerd (Beuningen begint met visitekaartje-metafoor, Dodewaard met koffie, Maas en Waal met "ijzersterke websites"). Middendeel behandelt consistent SEO-sleutelwoorden, grafisch ontwerper, Facebook/LinkedIn in vergelijkbare bewoording.

Stadsdetails: bijna niets. Stadsnaam is substitutievariabele ("in de regio Elst", "als bureau voor webdesign Lingewaard"). Geen wijken, geen lokale klanten, geen landmarks.

#### C. Vertrouwen en conversie
Google Partner-badge in header. Cijfer "9.6" bovenaan zonder bron of link. Tekstuele klantaantallen **inconsistent tussen pagina's**: 750 (Beuningen), 900 (Buren, Maas en Waal), "honderden" (Zetten, Druten). Dit is de duidelijkste tell van onsynchroon onderhoud.

Geen testimonials op locatiepagina's. Geen KvK-nummer. Adres-tegenstrijdigheid: `Bonegraafseweg 6B, 6669 MH Dodewaard` versus `Edisonring 15, 6669 NA Dodewaard` op verschillende pagina's (NAP-probleem voor lokale SEO).

CTA-tekst wisselt per pagina: "Offerte aanvragen" (Beuningen) versus "Bakkie koffie" (Dodewaard, Maas en Waal, Elst, Lingewaard). Beide linken naar `/afspraak-maken`. Telefoon in header `(0488) 44 30 29`.

Prijsinformatie: geen. Alleen "vrijblijvende offerte", "groot of klein budget", "scherpe prijs".

#### D. SEO en techniek
Title pattern (letterlijk):
- "Webdesign Beuningen | Van Suilichem Online"
- "Webdesign Dodewaard | Van Suilichem Online"

Meta descriptions, inconsistent tussen pagina's:
- Zetten: "Bent u opzoek naar een webdesign Zetten? Van Suilichem Online is het webdesign bureau in Zetten. Neem contact op voor meer informatie." (u-vorm)
- Beuningen: "Meer dan 750 klanten gingen je voor. En of je nu een klein of project wil, Van Suilichem bouwt de website of webshop die jij in gedachten hebt..." (je-vorm, zinsconstructie verraadt copy-paste met typo "klein of project")

Schema-markup: niet bevestigd in markdown-extractie, waarschijnlijk afwezig of minimaal.

Interne links: enorm, maar slecht gestructureerd. Elke pagina heeft 50+ footer-links naar alle andere stad- en dienstpagina's. Body zelf bevat 0 contextuele links. Geen stad-naar-stad vanuit tekst, alleen footer-dump.

Images: **geen inhoudelijke afbeeldingen** op locatiepagina's. Enige image is de Google Partner-badge.

#### E. Anti-template signalen
De zinsopbouw `"[Van Suilichem] als bureau voor webdesign [STAD]"` komt op minstens 8 pagina's terug als vaste template-string. Concrete quotes:

Beuningen: *"Als bureau voor webdesign begrijpt Van Suilichem hoe je een website bouwt die hiervoor zorgt."*

Elst: *"Van Suilichem Online als bureau voor webdesign Elst snapt dat en doet daarom een uitvoerige analyse..."*

Lingewaard: *"Als ervaren bureau voor webdesign Lingewaard weet Van Suilichem Online precies in kaart te brengen..."*

Voelt **niet** AI-gegenereerd. Spelfouten zoals "gene ander" (moet "geen ander"), "Ee webshop wordt meer en meer gezien as" (ontbrekende letter), "water écht toe doet" (moet "wat"), "actie als ondernemer" (moet "actief"). Dit zijn menselijke typefouten, atypisch voor AI.

Faalt op: dubbele H1's, inconsistente klantaantallen, U-vorm vs je-vorm in meta's, lukrake stadsdekking (Veenendaal wel, Nijmegen niet), adres-tegenstrijdigheid, kannibalisatie tussen Gelderland/Betuwe/losse steden.

#### Overig opvallend
Footer-referentie "Overname Elan Media" verklaart waarschijnlijk de adres- en klantaantal-inconsistenties. De cijfer "9.6" is nergens aan schema of bron gekoppeld, lijkt sierlijk nummer.

### 4. vwebdesign.nl

**Bereikbaarheid:** sitemap.xml en homepage geweigerd door fetcher. Culemborg-voorbeeldpagina volledig opgehaald. Overige URLs via `site:vwebdesign.nl` zoekopdrachten.

#### A. Schaal en structuur
Drie URL-patronen naast elkaar:
1. Oud: `/l{ID}/Webdesign-{Stad}` (l7, l10-l14, l21-l24, l26-l27, l150)
2. Nieuw: `/l{ID}/website-{werkwoord}-{stad}` (l383-l394, l443)
3. Derde: `/{Stad}-{nummer}` (Maarssen-438, Tiel-673, Amsterdam-31, Wijk-bij-Duurstede-28), plus provincies (`/Noord-Brabant-697`)

Sequentiële CMS-ID's lopen tot minstens 894. "l" is prefix voor landings, "n" voor news, "p" voor portfolio in hun eigen SiteCMS. Schatting: **40-60 unieke stadspagina's** over drie generaties. Meerdere pagina's per stad (Vianen: l21, l393, l443, én /Vianen-webshop/laten-maken-875; Culemborg: l27 en l392).

Geen schone hub. `/Utrecht-website-laten-maken-333` fungeert als regio-hub. Vierde patroon: webshop per stad (`/Utrecht-webshop/laten-maken-873`, `/Amersfoort-webshop/laten-maken-876`). Dus meerdere diensten per stad, maar alleen website en webshop, geen SEO per stad.

#### B. On-page content
Culemborg l392 (nieuw): ~300-350 woorden. Culemborg l27 (oud): ~600-750 woorden. Nieuwe cluster consistent kort.

H-tags Culemborg /l392/website-maken-culemborg letterlijk:
- H1: "Website maken Culemborg"
- H2: "Complete webdesigner Culemborg" (H4: "Uw website opgeleverd in fases")
- H2: "Resultaatgerichte website bouwer Culemborg" (H4: "Effectiviteit door slim webdesign Culemborg")
- H2: "Eigen website maken?" (H4: "Bij ons kunt u ook een website laten maken Culemborg!")
- H3: "Website maken Culemborg" (CTA-blok)

Sections: H1 + intro → 3 decoratieve images → "buurplaatsen" alinea → drie H2-blokken → breadcrumb → footer-linkblok (24 stadspagina's) → CTA-blok.

Uniqueness: **2/5**. Buurplaatsen-zin vergeleken over 6 pagina's:

Culemborg: *"Wij kunnen de beste websites maken voor bedrijven in de buurt van Culemborg, zoals Utrecht, Houten, IJsselstein, Zeist, Woerden, Harmelen en Maarssen. Ook hebben we voor klanten in Lopik, Montfoort, Vianen en Nieuwegein fantastische en effectieve websites gebouwd!"*

Zeist, Houten, Vianen, Nieuwegein, Lopik noemen **dezelfde ~12 plaatsen in iets andere volgorde**. Klassieke spintax.

Stadsdetails: op l392 **geen enkel Culemborg-specifiek feit**. Oudere l27 zegt "In Culemborg heeft u aardig wat concurrentie, er zijn ongeveer 4000 bedrijven in Culemborg gevestigd". Maar de Houten- én Vianen-variant gebruiken **identiek "48.420 mensen" en "8022 bedrijven" op "58,98 km2"** wat feitelijk onjuist is: Vianen heeft ~20.000 inwoners, niet 48.420. **Dit is een harde template-fout**.

#### C. Vertrouwen en conversie
"4.7/5 - 500+ klanten" badge. Claim "Ook te zien op tv!" met NPO1, RTL 4, De Telegraaf, 3FM-logo's (op oudere l27). Eén Google-review quote (Thomas Dekker van Beetronics) op l27, niet op l392.

CTA's op l392: 4 zichtbare. "Afspraak maken", "Offerte aanvragen", "Stel uw vraag", telefoon 030 760 30 30 (click-to-call). Geen formulier inline, alles linkt naar /contact.htm.

Contact: 030 760 30 30, KvK 57175586, kantoor Einsteinweg 49a IJsselstein, werkuren 9-17u, tweede nummer buiten kantooruren (dubbel tarief).

Prijsinformatie op stadspagina: **geen**. Homepage noemt wel €699/€2.500/€3.900 pakketten, maar die cijfers staan niet op l392.

#### D. SEO en techniek
Title tags letterlijk:
- l392 Culemborg: "Website maken Culemborg"
- l27 Culemborg: "Webdesign in Culemborg. Professioneel webdesign Culemborg"
- l390 Zeist: "Website bouwer Zeist"
- l393 Vianen: "Webdesign bureau Vianen"
- l10 Houten: "Professioneel webdesign? Website laten maken Houten"

Patroon: kale keyword + stadsnaam. Geen merknaam in title, wat CTR drukt. Inconsistent tussen generaties.

Meta descriptions:
- Culemborg l392: "Deze webdesigner maakt websites op maat en we denken mee aan een effectieve internet strategie. U bent er zeker van dat u gevonden wordt..."
- Vianen l393: "Voor professioneel webdesign Vianen zit u goed bij Vcreations Webdesign. Een ervaren website ontwikkelaar en webdesigner Vianen die gespecialiseerd is in unieke en gepersonaliseerde vormgeving."

Schema-markup: niet zichtbaar in extractie, vermoedelijk afwezig. Wel visuele breadcrumb aanwezig.

Interne links: Culemborg l392 linkt expliciet naar 11 buur-stadspagina's in de openingsalinea (l383 IJsselstein, l384 Utrecht, l385 Houten, l386 Maarssen, l387 Nieuwegein, l388 Montfoort, l389 Lopik, l390 Zeist, l391 Woerden, l393 Vianen, l394 Harmelen). Footer herhaalt ~24 oudere pagina's. Sterke onderlinge footprint.

Images: bestandsnamen stad-specifiek (`xwebdesigner-culemborg.jpg`) maar foto's zijn generieke webdesign-mockups, niet echt in Culemborg genomen.

#### E. Anti-template signalen
Openingsalinea's niet identiek, wél geparafraseerd uit dezelfde bouwstenen. Concrete vergelijking:

Culemborg l392: *"Website laten maken Culemborg? Ons webdesign is professioneel, uniek en resultaatgericht. Deze webdesigner maakt websites op maat..."*

Zeist l390: *"Ook uw website laten maken Zeist? Sinds 2004 maken wij websites van de beste kwaliteit. Hoogstaande technieken en fantastisch webdesign."*

Vianen l393: *"Voor professioneel webdesign Vianen zit u goed bij Vcreations Webdesign. Een ervaren website ontwikkelaar..."*

Houten l385: *"Wij zijn de webdesigner Houten die de website maken waarmee u 100% tevreden zal zijn. Uniek webdesign, op maat gemaakt..."*

Bouwstenen (professioneel, uniek, resultaatgericht, op maat, state of the art, sinds 2004, conversiegericht) komen overal in andere volgorde terug. Herkenbaar als **spintax of LLM-parafrase**, niet individueel lokaal geschreven. Middenstukken (CMS, SEO, responsive) bijna letterlijk identiek tussen pagina's.

AI-gevoel: gedeeltelijk ja, eerder pre-LLM-spintax (sommige pagina's zijn jaren oud). Aanwijzingen: onnatuurlijk hoge stadsnaam-frequentie (10+ keer op 300 woorden), grammaticale glitches bij template-substitutie, vage superlatieven ("de beste webdesigner in Houten"), onjuist gedupliceerd inwonersgetal.

Copyright-footer zegt *"Copyright 2004 - 2026 ® Vcreations webdesign BV / Website maken Culemborg"*. De paginanaam lekt in het copyright, wat een dynamische template-variabele verraadt.

#### Overig opvallend
Drie URL-generaties zonder consolidatie of redirects: klassiek SEO-debt. Tel 030 760 30 30 is identiek overal, geen stad-specifiek nummer. Hub-pagina /Nederland-696 en provincie-pagina's (/Noord-Brabant-697, /Zuid-Holland-699) suggereren een derde laag. Claim "500+ klanten" botst met "387 projecten" en "300+ websites" op andere pagina's. **Strategische kwetsbaarheid: klassiek programmatic SEO uit 2015-2018, mogelijk target voor Google helpful-content updates.**

### 5. wowmedia.nl

**Bereikbaarheid:** sitemap volledig opgehaald. 307 unieke locatiepagina's geteld.

#### A. Schaal en structuur
**307 locatiepagina's**, nagenoeg alle NL-gemeentes inclusief verouderde (Haaren, Zederik, Ferwerderadiel, Menterwolde, Littenseradiel, Bellingwedde, Leerdam, Vianen, Neerijnen). Dit wijst op onderhoudsarme content die niet bijgewerkt is na gemeentelijke herindelingen 2019-2023.

URL-patroon letterlijk: `https://wowmedia.nl/website-laten-maken/webdesign-{stad-met-streepjes}`.

Geen hub in navigatie of footer. `/website-laten-maken` is parent-categorie maar rendert dezelfde templatepagina met placeholder "Nederland". Alleen vindbaar via `/sitemap`. Dubbele URL in sitemap (`/webdesign-bergen` twee keer, vermoedelijk door Bergen NH en Bergen L).

Eén service, geen vertical x city. Geen aparte SEO/webshop/hosting per locatie.

#### B. On-page content
800-900 woorden per pagina, waarvan slechts **150-200 woorden stad-gerelateerd**, de rest is identieke cases, beloftes en werkwijze.

H1 Tiel letterlijk: "Wil je een website laten maken? Op zoek naar webdesign in Tiel?"

H2's letterlijk: "Transparant over onze prijzen" / "Onze responsive websites werken op alle schermformaten... Wij zijn hét webdesign bureau in Tiel en omgeving." / "Onze 5 beloftes voor je nieuwe website" / "Ons werk" / "Fremantle" / "Wat hebben wij gedaan?" / "Stichting Hartekind" / "Wat hebben wij gedaan?" / "The Car Spa" / "Wat hebben wij gedaan?" / "Mr. Porter Steakhouse" / "Wat hebben wij gedaan?" / "Jimmy Woo" / "Wat hebben wij gedaan?" / "Efficiënte en simpele werkwijze" / "Offerte aanvragen" / "Factsheet" / "Dit is wat wij doen".

Sections: header → hero → prijsblok → logostrook → 5 beloftes → over-ons → 5 vaste cases → 4-staps werkwijze → offerteformulier met afspraaktool → factsheet → linklijst diensten → footer.

Uniqueness: **1/5**. Tiel, Soest, Uden en Weert zijn **byte-voor-byte identiek** op ~8 posities waar de stadsnaam staat. Cases, beloftes, werkwijze, factsheet: 100% gelijk.

Stadsdetails: **nul**. Geen wijken, landmarks, ondernemers, inwoneraantallen of regio-economie. Meest sprekende signaal: *"The Car Spa, de leukste autowasstraat van Amersfoort en omgeving"* wordt op élke stadspagina onveranderd getoond, ook op Tiel, Urk, Weert. Jimmy Woo blijft "DE hotspot in het centrum van Amsterdam" zelfs op Urk-pagina.

#### C. Vertrouwen en conversie
Sociale proof globaal: "Klantenbeoordeling 9.2/10" zonder bron, factsheet "sinds 2008, 500 websites, 1.500 domeinnamen, 2.000.000 bezoekers p/m". Vijf vaste cases (Fremantle, Hartekind, Car Spa, Mr. Porter, Jimmy Woo). Nul lokale testimonials.

CTA's: 6 conversiepunten. Telefoon 020 224 65 65 (klikbaar), headerknop "Offerte aanvragen", prijsblok CTA "Offerte aanvragen - Binnen één minuut aangevraagd", inline formulier met afspraakkiezer (3 dagen, uurblokken 09-21), footerknop "Gratis advies rapport aanvragen", footer-herhaling telefoon/mail.

Contact: Keizersgracht 62 Amsterdam (op oudere pagina's nog "Herengracht 215 II", adres-inconsistentie). Afspraaktool toont hardcoded "Zondag 19 April, Maandag 20 April, Dinsdag 21 April", suggereert cache-rendering.

Prijsinformatie: concreet. Template **€ 1.750,-**, Maatwerk **€ 3.750,-**. Identiek op alle stadspagina's.

#### D. SEO en techniek
Title pattern:
- "Webdesign Tiel, website laten maken, 15+ jaar ervaring"
- "Webdesign Weert, website laten maken, 15+ jaar ervaring"

Meta description (Tiel, uit SERP): "Op maat de perfecte website laten maken door een creatief full-service webdesign bureau actief in Tiel? Tiel webdesign, voor ieder budget snel geleverd."

Schema-markup: niet bevestigd, markdown-extractie stript scripts. Visuele "9.2/10" zou aggregatieschema kunnen zijn. Geen breadcrumb zichtbaar.

Interne links: **géén stad-naar-stad**, géén link terug naar parent `/website-laten-maken`. Stadpagina's alleen via `/sitemap` vindbaar. Wel links naar generieke diensten (`/webdesign`, `/huisstijl`, `/webhosting`, `/social-media-marketing`). Crawl-efficiëntie-risico.

Images: alle stadspagina's gebruiken **identieke images**. Geen stad-specifieke foto's, geen kaart, geen streetview.

#### E. Anti-template signalen
Openingsalinea's woord-voor-woord:

Tiel: *"Wij zijn een creatief full-service webdesign bureau met 15+ jaar ervaring en actief in Tiel en omgeving... Wij zijn een webdesign bureau uit Amsterdam en actief in Tiel en omgeving. Sinds onze oprichting in 2008, leveren wij een breed scala aan diensten."*

Soest: idem met "Soest".

Uden: idem met "Uden".

**100% identiek op één token na** (stadsnaam). De pagina maskeert templating nauwelijks. The Car Spa-case verraadt de aanpak direct.

AI-gevoel: nee. Ouderwetse programmatic SEO met `{$stad}`-variabele. Menselijke typefouten blijven staan door hele set ("resultaatgericht en zoekmachinevriendelijk website", "internetparter", "Waneer", "aangepast aan jou huisstijl" versus "op basis van jouw huisstijl" in dezelfde pagina).

Faalt op: bewering "hét webdesign bureau in [stad] en omgeving" op 307 pagina's tegelijk, cases niet lokaal, geen afspraakmogelijkheid op lokale locatie, verouderde gemeentes in sitemap.

#### Overig opvallend
Risico op Google Helpful Content-filtering is hoog: 307 near-duplicate pagina's zonder lokale proof of wijken is doorway-/thin-content materiaal. Prijzen €1.750/€3.750 voor een 15+-jaar Amsterdam-bureau zijn aan de onderkant, past bij volume-strategie.

### 6. nationalerijschool.nl

**Bereikbaarheid:** HTML-sitemap volledig opgehaald. 4 stadspagina's geanalyseerd (Amsterdam, Heerlen, Ommen, Amsterdam Zuid).

#### A. Schaal en structuur
Totaal ~415 URLs met stadsnaam:
- Hoofdpagina's "Rijschool in [stad]": ~290
- Spoedcursus per stad: 57
- Proefles autorijden per stad: 30
- Rijbewijs pakket per stad: 30
- Instructeur-vacatures per stad: 8

**URL-inconsistentie** (drie patronen door elkaar):
- `/rijschool/rijschool-in-{stad}/` (meest)
- `/rijschool/rijschool-{stad}/` (zonder "in")
- `/rijschool/{stad}/` (zonder prefix)

Sub-services: `/rijschool/rijschool-in-amsterdam/spoedcursus/` (sub-URL) versus `/proefles-autorijden-amsterdam/` (aparte top-level). Rommelige IA door historische groei.

Vier hubs naast elkaar: `/rijschool-nederland/`, `/locaties/`, `/rijbewijs-pakket-locaties/`, `/proefles-autorijden-locaties/`, `/html-sitemap/`.

Diensten per stad: alleen auto (expliciet: *"Let op: Nationale Rijschool geeft uitsluitend autorijlessen"*). Varianten binnen B-rijbewijs: regulier, spoed, proefles, pakket.

#### B. On-page content
400-650 woorden per pagina. Amsterdam 650, Heerlen 450, Ommen 350, Amsterdam Zuid 500.

H1 Amsterdam: "Rijschool in Amsterdam".

H2's letterlijk in volgorde:
1. "Tot wel €400 korting op je lespakket"
2. "Tot wel €400 korting op je lespakket" (herhaling, template-fout)
3. "Plan direct jouw proefles in Amsterdam"
4. "In 30 dagen je rijbewijs!"
5. "Een rijschool in elke regio van Amsterdam"
6. "Adresgegevens Nationale Rijschool:"
7. "De beste rijschool van Amsterdam - Nationale Rijschool"
8. "Mogelijke examenroute"
9. "Met een spoedcursus je rijbewijs halen in Amsterdam"
10. "Goedkope rijschool in Amsterdam"
11. "Boek nu je proefles"
12. "Rijlespakketten voor jouw autorijbewijs"
13. "Ervaringen van leerlingen"

Sections: hero → promo-banner → postcode-planner → 3 USP-blokjes met stad-slaagcijfer → spoedcursus-CTA → intro → examenroute-afbeelding → pakket-blok → reviews → planner-herhaling.

Uniqueness: **2/5**. Top 20-30 steden hand-geschreven, rest volgt 2-3 mallen:
- Amsterdam (650w): echt stad-specifiek met wijken (*"Amsterdam Noord, Oost, Zuid, Zuidoost of West"*), eigen adres, drukke-stad-referentie.
- Heerlen (450w): generiek dorps-template met vervangbare plaatsnamen (Schaesberg, Benzenrade, Voerendaal). Fictieve quote "van Aaken uit Heerlen".
- Ommen (350w): identiek template als Heerlen, maar H1 zegt "Ommen" terwijl body zegt *"Stap achter het stuur bij Nationale Rijschool in Vilsteren"* en *"onze rijinstructeur in Vilsteren"*. Fictieve quote *"Geesink uit Vilsteren: 'Mijn rijbewijs heeft veel deuren geopend...'"*. **Template-fout lekt door.**

Stadsdetails die wél werken: **slaagcijfer per stad** als enige harde metric. Amsterdam *"18.150 geslaagd"*, Amsterdam Zuid *"2.830 geslaagd"*, Heerlen *"1.735 geslaagd"*, Ommen *"370 geslaagd"*. Ook buurwijken/plaatsen genoemd (meestal 3), examenroute-afbeelding (soms stad-specifiek, soms fout: Heerlen krijgt Weert-plaatje).

Wat niet werkt: geen echte instructeur-namen/foto's, geen stad-specifieke prijzen, geen lokaal telefoonnummer.

#### C. Vertrouwen en conversie
Trustpilot "Uitstekend - 1.662+ reviews" (globale score). 10 review-citaten onderaan, deels stad-gefilterd maar inconsistent (Ommen-pagina toont review over "Utrecht en omstreken"). Fictief-aanvoelende quotes zonder foto/bron.

CTA's: 8-10 instances per pagina. Primair "Boek nu je proefles" en "Plan direct jouw proefles in [stad]". Postcode-widget met rekentool.

Contact: telefoon 088-4201010 (1 landelijk), WhatsApp 06-21937942 (1 landelijk), e-mail. Adres altijd Joop Geesinkweg 901 Duivendrecht.

Prijsinformatie: identiek op elke pagina. Basispakket €795/€985, Spoed €995/€1.185, Gevorderd €1.325/€1.575, Premium €1.855/€2.165, Gegarandeerd €2.120/€2.460, Zekerheid €2.650/€3.050. Ondanks claim *"laagste uurprijs in jouw regio"*.

#### D. SEO en techniek
Title pattern letterlijk:
- "Rijschool in Amsterdam | Nationale Rijschool"
- "Rijschool in Heerlen | Nationale Rijschool"
- "Rijschool in Ommen | Nationale Rijschool"
- "Rijschool in Amsterdam Zuid | Nationale Rijschool"

Strict patroon, geen USP, geen jaartal.

Meta descriptions:
- Utrecht: "Met Nationale Rijschool haal je binnen no-time je rijbewijs in Utrecht. Plan vandaag nog je proefles en ontdek alle voordelen van Nationale Rijschool!"
- Rotterdam: "Met Nationale Rijschool haal je binnen no-time je rijbewijs in Rotterdam. Plan vandaag nog je proefles en ontdek alle voordelen van Nationale Rijschool!"

Pure stad-invulling.

Schema-markup niet bevestigd. LocalBusiness per stad zou onjuist zijn (CBR kent slechts 1 vestiging), dus afwezigheid is verdedigbaar.

Interne links: sterke structuur. "Locaties in de buurt" blok onderaan elke pagina (4-6 buurplaatsen). Footer "Populaire rijles locaties" met 11 vaste top-steden vanaf elke pagina. Linkt ook naar centrale dienst-URL's.

Images: hero deels uniek per top-30 steden, examenroute deels uniek, rest 100% identiek. Ommen gebruikt generieke `locations.jpeg`.

#### E. Anti-template signalen
Probeert bij schaal te uniciteren via: slaagcijfer per stad (sterkste), wijken-lijstje, hero-image top-30, examenroute-afbeelding, "locaties in de buurt"-blok, review-filter op stad.

Faalt zichtbaar op:
1. Ommen-pagina zegt "Vilsteren" in body, fictieve quote "Geesink uit Vilsteren", URL zegt Ommen, ook bestaat `/rijschool-vilsteren/` apart (dubbele content).
2. Heerlen toont examenroute-plaatje van Weert.
3. Fictieve quotes volgen zichtbaar template (achternaam + "uit [stad]").
4. URL-inconsistentie tussen 3 patronen.
5. Gouda-spoedcursus heeft URL `/rijschool-zwijndrecht/spoedcursus/` in sitemap.
6. Reviews niet consistent per stad gefilterd.

AI-gevoel: middelmatig voor de template-pagina's (Heerlen/Ommen), niet voor de hand-geschreven top-steden. Eerder pre-ChatGPT template-werk met mail-merge variabelen dan LLM-generatie.

#### Overig opvallend
SEO-matig werkt dit ondanks de zwakte: ze domineren "rijschool [plaats]" voor kleine plaatsen waar concurrenten geen pagina hebben. Schaal wint van kwaliteit bij long-tail keywords met lage concurrentie. **Minimum viable woordaantal lijkt ~350 woorden** (Ommen rankt met 350w). Eén harde stad-metric (slaagcijfer) doet veel werk voor unicity-perceptie.

## Cross-site patronen

### Wat de meeste doen (patroon)

Vijf van de zes sites gebruiken **één service-template met stadsnaam als variabele**. Sections in vaste volgorde: hero met H1 "[dienst] [stad]", intro-alinea, USP/voordelen-blok, cases (meestal identiek op alle pagina's), werkwijze, prijsblok, CTA-formulier, footer. Meerderheid heeft **geen stad-specifieke foto's** en gebruikt generieke mockups met stad-specifieke bestandsnamen. Titels volgen pattern "[Dienst] [Stad] | [Merknaam]" of "[Dienst in Stad]", meta descriptions zijn getemplatificeerd. Interne linking is of een brute-force footer-linklijst (Suilichem, vwebdesign oud) of afwezig (Wowmedia). Schema-markup is op de meeste sites niet bevestigd aanwezig.

### Wat de beste doen anders (opvallend)

**Websteen** toont concrete prijzen op de stadspagina (€1.295, €9.980, €15.920, €26.795) en filtert reviews per stad (fit20 Huizen op de Huizen-pagina, Lions Club Blaricum Laren op de Blaricum-pagina). Het eigenarenverhaal (Roy en Dennis Jongerden, geboren in Huizen) geeft een verifieerbaar lokaal anker. WhatsApp als directe CTA onderscheidt.

**Nationale Rijschool** presteert op schaal via één stad-specifieke harde metric: slaagcijfer per stad. Dat ene getal (*"370 geslaagd in Ommen"* versus *"18.150 in Amsterdam"*) doet het grootste deel van het unicity-werk. Buurwijken-blok per stad (3-4 plaatsen) en hero-image voor top-30 steden helpen ook.

**Suilichem** gebruikt variabele CTA-tekst ("Offerte aanvragen" versus "Bakkie koffie") en varieert openingsmetaforen (visitekaartje, koffie, ijzersterke websites) per stad.

**vwebdesign** linkt in de openingsparagraaf expliciet naar 11 buur-stadspagina's met correcte interne slugs, wat crawl-equity verdeelt.

### Rode vlaggen (patronen om te vermijden)

Openingsalinea's die byte-voor-byte identiek zijn behalve stadsnaam (Wowmedia). Cases die expliciet een **andere** stad noemen dan de pagina zelf (Car Spa "in Amersfoort" op Tiel-pagina, Jimmy Woo "in centrum Amsterdam" op Urk-pagina). Inconsistente klantaantallen tussen pagina's (Suilichem: 750/900/honderden/1000). Verouderde gemeentes in sitemap door gebrek aan onderhoud (Wowmedia: Haaren, Zederik, Littenseradiel). Dubbele URL's per stad zonder redirect (vwebdesign: l27 én l392 voor Culemborg, Websteen: `/webdesign-huizen` én `/website-laten-bouwen-huizen`). Dubbele H1 op elke pagina (Suilichem). Verkeerd gekoppelde images (Nationale Rijschool: examenroute Weert op Heerlen-pagina). Template-variabele die in content lekt (Nationale Rijschool: "Vilsteren" op Ommen-pagina, vwebdesign: "Website maken Culemborg" in copyright-footer). Inwonersgetal van stad A gedupliceerd op stad B (vwebdesign: Houten-getal op Vianen-pagina). Fictieve quotes met zichtbaar template "[Achternaam] uit [Stad]" zonder foto of bron. U-vorm en je-vorm door elkaar in meta's (Suilichem).

## Aanbeveling voor knapgemaakt.nl

### URL-structuur

Ik kies voor `/webdesign-[stad]/` (wat je al gebruikt), consistent aangehouden. Geen sub-patronen zoals `/locaties/webdesign-[stad]/` want dat voegt niets toe en maakt redirects lastig bij eventuele toekomstige herstructurering. Wanneer hovenier-pagina's er komen: `/hovenier-[stad]/` op dezelfde root. Dus **`/[service]-[stad]/`** als enkele regel. Geen numerieke ID's (vwebdesign-fout). Geen subfolder per dienst (`/hovenier/[stad]/`) want dat creëert twee URL-niveaus zonder SEO-winst bij 17 pagina's per dienst. Wel overwegen: één hub per dienst (`/webdesign/` en `/hovenier/`) die de complete lijst steden toont met 1-regel context. Dit lost ontdekbaarheid op (Wowmedia's zwakte) en geeft crawlers een startpunt.

### Content-skeleton

Totaal richt ik op **600-750 woorden per pagina** (boven het minimum van 350 dat Nationale Rijschool laat werken, onder het opgeblazen 2500 van Websteen dat 85% boilerplate is). Dat is het zoete punt waar je per stad genoeg eigenheid kunt leveren zonder onderhoudsnachtmerrie.

Sections in volgorde:

1. **Hero met H1 "Webdesign [Stad]" + hero-subheadline per stad** (ongeveer 40-60 woorden). De hero-subheadline is jouw eerste unicity-hefboom: niet "De beste webdesigner in [stad]" maar iets wat alleen op die pagina werkt. Bijvoorbeeld verwijzing naar wijk, bedrijventerrein of type ondernemer dat in die stad typisch is.

2. **Lokale proof-alinea** (80-120 woorden). Dit is de sterkste les van alle sites samen: één of twee verifieerbare lokale feiten per pagina maken het verschil. Geen verzonnen instructeur-quotes (Nationale Rijschool-fout). Wel: naam van klant uit die stad (als je er een hebt), reistijd vanuit Buren naar die stad, referentie aan lokale ondernemersvereniging of bedrijventerrein, of aantal projecten dat je in die regio hebt gedaan. Voor de steden waar je nog geen case hebt: expliciet zeggen dat je vanuit Buren werkt en binnen X minuten in [stad] bent, met concrete minuten.

3. **Wat ik voor je maak** (120-150 woorden, grotendeels templated met 1-2 zinnen stad-specifiek). Hier mag boilerplate. Leg kort uit wat jouw aanpak is (strippede template uit je homepage). Eén zin die teruggrijpt op de stad: voorbeeld of klanttype.

4. **Case-referentie** (80-120 woorden). Eén case per pagina, liefst uit dezelfde regio. Als je geen lokale case hebt: kies de thematisch dichtste en benoem expliciet ("Voor een ondernemer in Tiel werkte ik aan... vergelijkbaar met wat ik voor jou in [stad] kan doen"). Vermijd de Wowmedia-fout door de case niet expliciet aan een andere stad te koppelen als dat niet logisch is. Optionele link naar volledige case.

5. **Nearbyareas + wat jouw werkradius betekent** (60-80 woorden). Hier pak je vwebdesign's crosslinking-truc, maar dan eerlijk: noem 4-6 buur-steden/dorpen met interne link. Gebruik dit ook om je werkradius concreet te maken ("Ik werk in Buren en de Betuwe, tot in [stad] en omgeving").

6. **FAQ's per stad** (200-250 woorden, 4-5 vragen). Dit is je tweede unicity-hefboom. Twee FAQ's mogen identiek zijn across alle pagina's (bv. "Hoe lang duurt het?"), twee moeten echt stad-specifiek zijn ("Werk je ook in [wijk]?", "Heb je ervaring met [branche die in die stad sterk is]?"). Bij hoveniers-vertical zijn stad-specifieke FAQ's makkelijker: bodemtype, tuinarchitectuur-stijlen in die regio, gemeentelijke regels.

7. **Prijsindicatie** (50-80 woorden). Websteen bewijst dat open prijzen werken. Ik zou minimaal "vanaf X" tonen, niet leeg laten (Suilichem-fout). Één zin met ranges of startprijs.

8. **CTA-blok** (30-50 woorden). Één primaire CTA (afspraak/kennismaking), telefoon klikbaar, optioneel WhatsApp.

**Boilerplate-ratio:** circa 55-60% van de pagina is templated (wat ik maak, prijsindicatie, CTA), circa 40-45% is stad-specifiek (hero-subheadline, lokale proof, case-referentie, nearbyAreas, 2 van de 5 FAQ's). Dit is het omgekeerde van Wowmedia (~3% stad-specifiek) en dichter bij wat Websteen doet zonder de duplicate-URL-problemen.

### Hoe elke pagina uniek houden zonder handwerk per stad

De truc is: maak 3-4 velden verplicht per stad, de rest mag template blijven. Verplichte velden in je CMS per stad:
- hero-subheadline (1 zin, 12-20 woorden, mag naar wijk/landmark/typisch-voor-die-stad verwijzen)
- localProof (1 alinea, 60-100 woorden, mag reistijd/klant/ondernemersvereniging/project noemen)
- 1 case-referentie-ID (keuze uit je casepool, of placeholder-tekst als er nog geen case is)
- nearbyAreas (lijstje 4-6 plaatsen, handmatig ingevuld want "wat is dichtbij" is contextgevoelig)
- 2 stad-specifieke FAQ-items (de andere 3 komen uit een global pool)

Eén harde metric per stad is optioneel maar bewezen effectief (Nationale Rijschool's slaagcijfer). Voor jou zou dat kunnen zijn: aantal projecten in de regio, reistijd vanuit Buren in minuten, of (later) aantal hoveniers-klanten in die regio.

**AI-generatie van hero-subheadline en localProof** is verantwoord zolang je dat als bronmateriaal behandelt en zelf redigeert. Ik zou voor elke stad een prompt draaien met input "stad + wijken + 1-2 lokale feiten + case-ID". Maar dan daadwerkelijk de output lezen en hervormen. Wowmedia-aanpak ("The Car Spa in Amersfoort" op elke pagina onveranderd) toont wat er gebeurt als niemand leest.

**Vermijden:** verzonnen quotes of klantnamen die niet bestaan. Dit is de Nationale Rijschool-valkuil en werkt op individuele pagina's misschien, maar bij 17 pagina's is het detecteerbaar via herhaald patroon ("[Achternaam] uit [Stad]").

### Schema-markup shortlist

Op elke stadspagina:
1. **LocalBusiness** met vast adres (jouw kantoor in Buren) plus `areaServed` array met de stad-per-pagina. Dit is eerlijker dan LocalBusiness per stad doen (je hebt geen vestiging daar) en Google accepteert `areaServed` als geldige signalering. Voeg `geo` toe met coords Buren.
2. **Service** met `serviceType: "Webdesign"` (of "Hovenier" later), `provider` linkend naar je LocalBusiness, `areaServed` met de stad. Dit is het schema waar veel bureaus op missen.
3. **BreadcrumbList** (Home → Webdesign → [Stad]).
4. **FAQPage** als je FAQ-sectie hebt, vraag en antwoord per item.

Overwegen maar niet verplicht:
5. **AggregateRating** binnen LocalBusiness als je Google-reviews hebt, met de echte score.
6. **WebPage** met `about` naar de stad als Place-entity (geolokaliserings-signaal, minder zwaar maar helpt bij entity-relatie).

Niet doen: LocalBusiness per stad met verzonnen adres. Dat is Google-guidelines-overtreding en bij 17 pagina's detecteerbaar.

### Interne linking-strategie

Gelaagd:
- **Hub per dienst** (`/webdesign/`, later `/hovenier/`) die alle stadspagina's linkt. Dit lost ontdekbaarheid op (Wowmedia's zwakte) en geeft een centraal anker voor PageRank-distributie.
- **Stad → stad** via een "Werkgebied" of "Ook actief in"-blok onderaan elke pagina, maar beperk tot 4-6 echt aangrenzende steden. Niet Suilichem's stijl van 26 links in footer (signaaldilutie).
- **Stad → centrale service-pagina** in hero of CTA-blok, via contextuele tekstlink.
- **Stad → relevante case**, niet naar alle cases.
- **Stad → blogpost** als je er een hebt die thematisch raakt (bv. "Waarom een lokale webdesigner kiezen"), slechts 1 link per pagina.
- **Case → stad** vanuit casepagina's, als de case in een specifieke stad speelt.

Kruislinks dus, geen footer-dump. Dit is wat vwebdesign in hun nieuwere cluster goed doet (11 contextuele stad-links in openingsalinea) maar zonder de spintax eronder.

### Beslissingen die ik nog moet maken

1. **Hovenier-vertical timing.** De vraag is: lanceer je hovenier-city-pages pas als je 1 case hebt, of al eerder met een "Ik ga dit doen"-pagina? Websteen's eigenarenverhaal werkt omdat het verifieerbaar is. Voor hovenier zonder case is de vraag of je authentiek kunt schrijven over iets wat je nog niet hebt gedaan. Mijn neiging: wachten tot eerste case, dan 3-5 steden lanceren, daarna uitbreiden.

2. **Diepte van FAQ's per stad.** Twee stad-specifieke FAQ's per pagina betekent 34 handmatig geschreven items voor 17 steden. Kan dit naar 1 stad-specifieke FAQ zonder unicity in te leveren? Waarschijnlijk ja, zeker als hero-subheadline en localProof al sterk zijn. Maar test met 3 pagina's en bekijk de uitkomst.

3. **Prijstransparantie-niveau.** Websteen is opvallend open (€1.295 basis), Wowmedia ook (€1.750 template). De vraag is of een solo in Buren concurreert op prijs of op positionering. Mijn advies: toon "vanaf X" om de Suilichem-fout (geen enkele prijsindicatie, altijd "vrijblijvende offerte") te vermijden, maar zonder volledige pakketprijzen die je op je hoofdsite wel kunt etaleren.

4. **Hub-pagina copy versus volautomatisch.** Bouw je `/webdesign/` als echte verkooppagina of als lijst-met-korte-intro? Nationale Rijschool heeft 4 hubs naast elkaar wat niemand helpt. Eén sterke dienst-pagina die tegelijk hub is, lijkt schoner.

5. **Review-filtering per stad.** Websteen filtert reviews per stad. Als je Google-reviews ontvangt, wil je dan per stad filteren of alle reviews tonen? Bij 17 steden is filteren alleen zinvol als je per stad minstens 3 reviews hebt; anders oogt het leeg.

6. **Omgaan met steden waar je nul projecten hebt gedaan.** Dit raakt de kernvraag: schrijf je proactief een locatiepagina voor een stad waar je nog niemand hebt gewerkt? Lemone toont dat je zonder stadspagina's kunt bestaan. De vraag is of jouw target-klant (lokale MKB in Betuwe/Gelderland) zoekt op "webdesigner [stad]" of op merk/aanbeveling. Marktdata hierover ontbreekt in deze analyse, zou een vervolgstap kunnen zijn.

7. **Jaartal in titles.** Websteen's Blaricum-pagina noemt "In 2026" letterlijk en moet dus handmatig worden bijgewerkt. Vermijden of juist omarmen als vers-signaal? Ik zou dynamisch jaartal overwegen (via template-helper die server-side het huidige jaar invoegt) zodat je geen handmatige updates hebt.

8. **Gemeentes versus dorpen.** Wowmedia dekt alle (ook verouderde) gemeentes af wat wanhopig oogt. Voor 17 steden rond Buren is de lijst overzichtelijk. Vraag is of je ook kleine kernen (Maurik, Lienden, Echteld) als losse pagina's doet of onder een regio-pagina samenvoegt. Mijn inschatting: 1 pagina per kern met 300-500w zolang je er oprecht iets concreets over kunt zeggen; anders onder regio-pagina. Kwaliteit boven dekking.
