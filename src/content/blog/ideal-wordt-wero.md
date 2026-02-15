---
title: "iDEAL wordt Wero: Wat betekent dit voor jouw webshop?"
description: "iDEAL gaat over naar Wero. Wat er verandert, wat hetzelfde blijft, en wat je als webshophouder moet weten over deze overgang."
publishDate: 2026-01-29
author: "Yannick Veldhuisen"
tags: ["Wero", "iDEAL", "Webshop", "Betalingen"]
image: "/assets/blog/overgang-van-ideal-naar-wero.webp"
imageAlt: "De overgang van iDEAL naar Wero uitgelegd"
---

Je hebt het waarschijnlijk al voorbij zien komen: iDEAL wordt Wero. De "Sowieso Wero"-campagne draait volop, en misschien vraag je je af wat dit nou eigenlijk voor jouw webshop betekent.

Het korte antwoord: voor de meeste webshophouders verandert er voorlopig weinig. Maar er zitten ook een paar leuke dingen aan te komen.

## Wat is Wero?

Wero is de opvolger van iDEAL. De naam combineert "we" en "Euro" (met een knipoog naar het Italiaanse "vero", wat "echt" betekent. Best een leuke naam eigenlijk).

Achter Wero staat de European Payments Initiative (EPI), een samenwerkingsverband van 16 grote Europese banken. ING, Rabobank en ABN AMRO zitten er allemaal in. Het idee: een Europees betaalsysteem dat niet afhankelijk is van Amerikaanse partijen als Visa, Mastercard of PayPal. Europa dat samen iets bouwt, dat zie je ook niet elke dag.

Voor jou als ondernemer betekent dit dat je straks met één betaalmethode klanten kunt bedienen in Nederland, Duitsland, België, Frankrijk en Luxemburg. Best handig als je ook over de grens verkoopt, of dat in de toekomst zou willen.

## De tijdlijn

- **8 januari 2026**: De nationale mediacampagne is gestart
- **29 januari 2026**: Het gecombineerde "iDEAL | Wero" logo mag worden gebruikt
- **31 maart 2026**: Webshops tonen het nieuwe co-branded logo
- **Eind 2026**: De technische migratie begint en Wero wordt een zelfstandige betaalmethode
- **Eind 2027**: iDEAL verdwijnt volledig, alleen Wero blijft over
- **Tot eind 2028**: Prijsgarantie, de kosten blijven vergelijkbaar met iDEAL

## Wat blijft hetzelfde?

Eigenlijk best veel.

Je klanten betalen nog steeds via hun eigen bankapp. Het geld gaat nog steeds direct van hun rekening naar die van jou. De beveiliging blijft hetzelfde (vingerafdruk of pincode via de bankapp). En de betaling is nog steeds binnen seconden verwerkt.

De ervaring voor je klanten blijft grotendeels gelijk. Ze kiezen een betaalmethode, openen hun bankapp, bevestigen, klaar. Het ziet er straks alleen iets anders uit. Nieuwe jas, zelfde persoon.

## Wat verandert er?

Een paar dingen. [Ik heb alle 7 verschillen in detail uitgelegd](/blog/wero-vs-ideal-verschillen/) voor wie meer context wil.

### Internationale klanten

Met iDEAL kon je alleen Nederlandse klanten bedienen. Wero werkt straks in heel Europa. Een Duitse bezoeker op je webshop kan dan betalen met zijn eigen Duitse bankapp, net zo makkelijk als een Nederlandse klant.

Voor webshops die ook over de grens verkopen (of dat willen), opent dit mogelijkheden zonder aparte integraties voor Giropay of Bancontact. In [mijn artikel over verkopen aan Duitse klanten](/blog/meer-verkopen-duitsers-wero/) ga ik daar dieper op in.

### Chargebacks

Bij iDEAL was een betaling definitief: zodra een klant betaalde, was het geld van jou. Wero introduceert een disputemechanisme, vergelijkbaar met creditcards. Klanten kunnen betalingen betwisten, tot 120 dagen na de transactie (in sommige gevallen tot 540 dagen).

In de praktijk betekent dit dat goede administratie (track & trace, orderbevestigingen) nog een stukje handiger wordt. Als je dat al bijhoudt, zit je goed.

### Abonnementen en terugkerende betalingen

Eind 2026 of begin 2027 krijgt Wero ondersteuning voor subscriptions. Je klant keurt één keer een "digitaal mandaat" goed, en jij kunt daarna periodiek afschrijven. Als je ooit een SEPA-incasso hebt aangevraagd weet je hoeveel formulieren dat kost. Dit is dat, maar dan zonder de formulieren.

### Request-to-Pay

Als je diensten verkoopt in plaats van producten, is dit een fijne toevoeging. Met Request-to-Pay stuur je een betaalverzoek rechtstreeks naar de bankapp van je klant. De factuurgegevens zitten in het verzoek, waardoor je boekhouding (Moneybird, Exact) automatisch kan worden bijgewerkt. Je kunt zelfs automatische herinneringen instellen. [Voor ZZP'ers](/blog/wero-request-to-pay-zzp/) is dit handig omdat het sneller betaald worden en minder herinneringen sturen betekent.

## Hoe zit het met de kosten?

iDEAL was altijd vrij goedkoop: vaak zo'n €0,29 per transactie, ongeacht het bedrag. Wero gaat werken met een percentage-model met caps (maximumbedragen).

**Tot eind 2028** geldt er een prijsgarantie: je betaalt vergelijkbaar met wat je nu voor iDEAL betaalt.

**Vanaf 2029** gaat het nieuwe model in. De exacte percentages zijn nog niet bekend, maar EPI noemt het "merchant-friendly: een klein percentage met ingebouwde caps."

Wat dit concreet voor jou betekent, hangt af van je gemiddelde orderwaarde. Voor kleine bestellingen kan het percentage-model zelfs voordeliger uitpakken. Voor grotere bestellingen (€500+) zou het iets duurder kunnen zijn. De definitieve tarieven volgen later.

Wil je weten hoe dit uitpakt voor verschillende orderwaarden? Ik heb [een artikel over de Wero-kosten](/blog/wero-kosten-transactiekosten/) geschreven met rekenvoorbeelden.

## Wat doe je ermee?

Voor de meeste webshophouders is de overgang vrij rustig.

### Je gebruikt Mollie, Stripe of Adyen

Dan wordt het meeste voor je geregeld. Lekker. Als je hun hosted checkout gebruikt (waar je klant naar hun betaalpagina wordt doorgestuurd), wordt het logo automatisch aangepast. Mollie is in januari 2026 Principal Member geworden van EPI en belooft een soepele overgang. [Mijn gids over Mollie en Wero](/blog/wero-mollie-integratie/) gaat daar dieper op in.

### iDEAL-logo op je site?

Als het iDEAL-logo ergens hardcoded staat, in je footer, op een informatiepagina, in e-mail templates, dan is het handig om dat te vervangen door het nieuwe "iDEAL | Wero" logo. De assets zijn beschikbaar via je payment provider.

### Custom checkout?

Als je een volledig custom checkout hebt gebouwd met directe API-koppelingen, is er wat meer werk. Je past het logo handmatig aan en schakelt later Wero als aparte betaalmethode in. Je payment provider heeft hier documentatie voor.

Een [praktische checklist met 5 concrete stappen](/blog/wero-webshops-checklist-maart/) heb ik hier op een rij gezet.

## Wat er leuk aan is

Nederlandse webshops krijgen straks met één integratie toegang tot klanten in vijf landen. Duitsers, Belgen, Fransen en Luxemburgers betalen alsof ze Nederlandse klanten zijn. Vooral als je producten of diensten aanbiedt die ook over de grens interessant zijn, opent Wero deuren die voorheen wat lastiger te openen waren.

En Request-to-Pay is voor dienstverleners en ZZP'ers eigenlijk gewoon een cadeautje. Factuur sturen via de bankapp, automatisch matchen met je boekhouding, herinneringen die zichzelf versturen. Dat scheelt een hoop gedoe.

---

Heb je vragen over hoe dit voor jouw situatie werkt? [Plan gerust een gesprek](/aanvragen/) en ik denk met je mee.
