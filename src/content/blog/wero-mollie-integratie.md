---
title: "Wero en Mollie: Hoe werkt de integratie?"
description: "Gebruik je Mollie? De overgang naar Wero is grotendeels automatisch. Ontdek wat Mollie regelt en wat je zelf moet doen voor de deadline."
publishDate: 2026-02-01
author: "Yannick Veldhuisen"
tags: ["Wero", "iDEAL", "Mollie", "Webshop", "Betalingen", "Integratie"]
image: "/assets/blog/wero-mollie-integratie.webp"
imageAlt: "Wero en Mollie integratie voor webshops uitgelegd"
---

Als je een webshop hebt in Nederland, is de kans groot dat je Mollie gebruikt voor je betalingen. Met meer dan 130.000 Nederlandse bedrijven is het verreweg de populairste payment provider. En dat is goed nieuws voor de [overgang van iDEAL naar Wero](/blog/ideal-wordt-wero).

Mollie is in januari 2026 "Principal Member" geworden van EPI, de organisatie achter Wero. Dat betekent dat ze de integratie op het hoogste niveau ondersteunen. Voor jou als webshophouder betekent dit vooral: minder werk.

## Wat regelt Mollie automatisch?

Laten we beginnen met het goede nieuws. Als je Mollie's hosted checkout gebruikt (waarbij je klant wordt doorgestuurd naar de Mollie-betaalpagina), wordt het meeste automatisch geregeld.

**Het logo-update:** Het iDEAL-logo wordt automatisch vervangen door het gecombineerde "iDEAL | Wero" logo. Je hoeft hier niets voor te doen. Mollie haalt de nieuwe assets op en toont ze aan je klanten.

**De technische koppeling:** Achter de schermen verandert er van alles. Wero draait op SEPA Instant Credit Transfer in plaats van de oude iDEAL-infrastructuur. Maar Mollie handelt dit af. Je krijgt gewoon je geld, net als voorheen.

**De betaalmethode-routing:** Als straks Wero als zelfstandige betaalmethode beschikbaar komt (verwacht eind 2026), kun je het activeren via je Mollie-dashboard. Het is letterlijk een vinkje aanzetten.

## Welk type Mollie-integratie heb je?

Hoeveel werk je hebt, hangt af van hoe je Mollie hebt geïntegreerd. Er zijn grofweg drie scenario's.

### Scenario 1: Hosted checkout

Dit is de meest voorkomende setup. Je klant klikt op "Betalen", wordt doorgestuurd naar een Mollie-pagina, kiest een betaalmethode, en keert terug naar je webshop.

**Wat je moet doen:** Eigenlijk niets aan je checkout. Mollie regelt de logo's en de techniek. Check wel even of je ergens anders op je site het oude iDEAL-logo hebt staan (footer, informatiepagina's). Die moet je zelf vervangen.

### Scenario 2: Plugin (WooCommerce, Shopify, Magento)

Als je de Mollie for WooCommerce plugin gebruikt, of de Shopify-integratie, zit je goed. De plugin haalt de betaalopties op via Mollie's API, inclusief de juiste logo's.

**Wat je moet doen:** Zorg dat je plugin up-to-date is. De Mollie for WooCommerce plugin versie 7.x en hoger ondersteunt de nieuwe "iDEAL | Wero" branding. Check je versie in WordPress onder Plugins > Geïnstalleerde plugins.

Als je een oudere versie draait, update dan naar de nieuwste. Dat is sowieso verstandig voor de beveiliging.

### Scenario 3: Custom API-integratie

Heb je een volledig custom checkout gebouwd met directe API-calls naar Mollie? Dan heb je iets meer werk.

**Wat je moet doen:**

1. **Logo bijwerken** - Vervang je iDEAL-logo handmatig door het "iDEAL | Wero" co-branded logo. Mollie biedt de assets aan via hun documentatie.
2. **API-responses checken** - Als je de betaalmethode-naam uit de API haalt om te tonen, check dan of je code de nieuwe naam correct toont.
3. **Webhook-handlers reviewen** - Wero introduceert nieuwe statussen, met name voor disputes. Zorg dat je code hiermee om kan gaan (of in ieder geval niet crasht).

Dit klinkt misschien technisch, maar voor een developer is het een middag werk. Niet meer.

## De tijdlijn voor Mollie-gebruikers

Hier is wat je wanneer kunt verwachten:

| Datum | Wat gebeurt er |
|-------|----------------|
| Januari 2026 | Mollie is Principal Member van EPI geworden |
| 29 januari 2026 | Het co-branded logo mag worden getoond |
| **31 maart 2026** | **Deadline: alle checkouts moeten het nieuwe logo tonen** |
| Eind 2026 | Wero als zelfstandige betaalmethode beschikbaar in Mollie |
| Eind 2027 | iDEAL verdwijnt volledig, alleen Wero blijft over |

De deadline van 31 maart gaat specifiek over het logo. De technische overstap naar Wero komt later, en ook dan regelt Mollie het meeste.

## Wat verandert er qua kosten?

Mollie rekent momenteel €0,29 per iDEAL-transactie (plus eventuele andere fees afhankelijk van je pakket). Tot eind 2028 geldt er een prijsgarantie, dus dat blijft voorlopig gelijk.

Daarna gaat Wero waarschijnlijk over op een percentage-model. Wat dit precies betekent voor Mollie's tarieven is nog niet bekend. Mollie zal dit communiceren zodra de definitieve tarieven van EPI bekend zijn.

In [mijn artikel over de Wero-kosten](/blog/wero-kosten-transactiekosten) ga ik dieper in op wat het percentage-model kan betekenen voor verschillende orderwaarden.

## Nieuwe mogelijkheden via Mollie

![Internationale betalingen met Wero in Europa](/assets/blog/internationale-betalingen-met-wero.webp)

De overstap naar Wero brengt ook nieuwe features mee die Mollie waarschijnlijk gaat ondersteunen.

**Internationale betalingen.** Met Wero kunnen Duitse, Belgische, Franse en Luxemburgse klanten betalen via hun eigen bankapp. Mollie ondersteunt dit straks automatisch. Je hoeft geen aparte integraties voor Giropay of Bancontact te onderhouden. In [mijn artikel over verkopen aan Duitsers](/blog/meer-verkopen-duitsers-wero) leg ik uit hoe je hier nu al op kunt voorbereiden.

**Request-to-Pay.** Voor dienstverleners interessant: je stuurt een betaalverzoek dat direct in de bankapp van je klant verschijnt. Mollie zal dit waarschijnlijk integreren in hun API.

**Subscriptions.** Wero krijgt ondersteuning voor terugkerende betalingen zonder de papierwinkel van SEPA-incasso. Mollie biedt al subscriptions aan, maar de Wero-variant kan soepeler worden.

Deze features komen in de loop van 2026 en 2027. Mollie communiceert hierover via hun blog en changelog.

## Stap-voor-stap: wat moet je doen?

Laten we het praktisch maken. Hier is een checklist specifiek voor Mollie-gebruikers.

### Vóór 31 maart 2026

1. **Check je integratie-type** - Hosted checkout, plugin, of custom API?
2. **Update je plugin** - Als je WooCommerce of Shopify gebruikt, installeer de nieuwste versie
3. **Zoek hardcoded logo's** - Footer, informatiepagina's, e-mail templates
4. **Vervang oude logo's** - Download de nieuwe assets via Mollie's documentatie

### Eind 2026 (wanneer Wero zelfstandig beschikbaar komt)

5. **Activeer Wero in je dashboard** - Waarschijnlijk een vinkje in Mollie
6. **Test een transactie** - Doe een testbestelling om te checken of alles werkt
7. **Test internationaal** (optioneel) - Vraag iemand uit Duitsland of België om te testen

### 2027-2028

8. **Houd tarieven in de gaten** - Mollie communiceert over de prijswijzigingen
9. **Evalueer je betaalopties** - Bekijk of je mix van betaalmethodes nog klopt

## Waarom Mollie een goede keuze is voor de overgang

Ik wil even eerlijk zijn: ik ben geen Mollie-ambassadeur en dit is geen gesponsorde content. Maar ik gebruik Mollie voor al onze klantprojecten bij KNAP GEMAAKT., en er zijn goede redenen voor.

**Ze zijn Principal Member van EPI.** Dat is het hoogste lidmaatschapsniveau. Mollie zit aan tafel waar de beslissingen worden genomen.

**Ze hebben ervaring met dit soort overgangen.** Mollie heeft al vaker nieuwe betaalmethodes uitgerold. Ze weten hoe ze dit soepel moeten doen voor hun klanten.

**De documentatie is goed.** Als je wel ergens tegenaan loopt, is de kans groot dat je het antwoord vindt in hun docs of bij hun support.

**Het dashboard is overzichtelijk.** Je ziet straks gewoon "Wero" verschijnen tussen je andere betaalmethodes, met dezelfde rapportages en exports die je gewend bent.

## Wat als je nog geen Mollie gebruikt?

Gebruik je een andere payment provider? Stripe, Adyen en MultiSafepay ondersteunen de Wero-overgang ook. De details verschillen per aanbieder.

**Stripe** behandelt Wero als een "Bank Redirect" methode, vergelijkbaar met hoe ze Giropay en Bancontact afhandelen. De overgang gaat grotendeels automatisch voor moderne Stripe-integraties.

**Adyen** focust vooral op enterprise-klanten. Ze bieden directe Wero-ondersteuning, maar voor hosted checkouts wordt het logo automatisch bijgewerkt.

**MultiSafepay** heeft de integratie in januari 2026 gelanceerd. Ze waarschuwen wel dat je na de co-branding fase Wero als aparte betaalmethode moet toevoegen. Dat is niet automatisch.

In [mijn checklist voor de Wero-deadline](/blog/wero-webshops-checklist-maart) vind je algemene stappen die voor elke payment provider gelden.

## Samengevat

Als je Mollie gebruikt, heb je geluk. De overgang van iDEAL naar Wero is grotendeels automatisch.

**Hosted checkout?** Mollie regelt het.
**Plugin?** Update naar de nieuwste versie.
**Custom API?** Een middag werk.

De deadline van 31 maart gaat over het logo. Dat is het enige waar je je nu druk over hoeft te maken. De rest komt later, en ook dan staat Mollie aan je kant.

---

Meer weten over de Wero-overgang? Lees [wat iDEAL naar Wero betekent voor je webshop](/blog/ideal-wordt-wero), bekijk [de complete checklist voor 31 maart](/blog/wero-webshops-checklist-maart), of lees [wat Wero gaat kosten](/blog/wero-kosten-transactiekosten).

Bij KNAP GEMAAKT. bouwen we webshops met Mollie-integratie die automatisch mee-updaten. Heb je vragen over de Wero-overgang? [Plan gerust een gesprek](/contact).
