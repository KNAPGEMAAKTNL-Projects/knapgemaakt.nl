---
title: "Wero en Mollie: Hoe werkt de integratie?"
description: "Gebruik je Mollie als payment provider? De overgang van iDEAL naar Wero gaat grotendeels automatisch. Wat Mollie regelt en wat je zelf aanpast."
publishDate: 2026-02-01
author: "Yannick Veldhuisen"
tags: ["Wero", "iDEAL", "Mollie", "Webshop", "Betalingen", "Integratie"]
image: "/assets/blog/wero-mollie-integratie.webp"
imageAlt: "Wero en Mollie integratie voor webshops uitgelegd"
---

Mollie is een van de meest gebruikte payment providers in Nederland, en in januari 2026 zijn ze "Principal Member" geworden van EPI, de organisatie achter Wero. Dat is het hoogste lidmaatschapsniveau. Voor jou als webshophouder betekent dit vooral: de [overgang van iDEAL naar Wero](/blog/ideal-wordt-wero/) gaat grotendeels vanzelf.

## Wat regelt Mollie automatisch?

Als je Mollie's hosted checkout gebruikt (waarbij je klant wordt doorgestuurd naar de Mollie-betaalpagina), wordt het meeste automatisch geregeld.

**Het logo.** Het iDEAL-logo wordt automatisch vervangen door het gecombineerde "iDEAL | Wero" logo. Mollie haalt de nieuwe assets op en toont ze aan je klanten.

**De technische koppeling.** Achter de schermen verandert er van alles. Wero draait op SEPA Instant Credit Transfer in plaats van de oude iDEAL-infrastructuur. Maar Mollie handelt dit af. Je krijgt gewoon je geld, net als voorheen.

**De betaalmethode-routing.** Als straks Wero als zelfstandige betaalmethode beschikbaar komt (verwacht eind 2026), kun je het activeren via je Mollie-dashboard. Letterlijk een vinkje aanzetten.

## Welk type integratie heb je?

Hoeveel werk je hebt, hangt af van hoe je Mollie hebt geïntegreerd. Er zijn grofweg drie scenario's.

### Scenario 1: Hosted checkout

Dit is de meest voorkomende setup. Je klant klikt op "Betalen", wordt doorgestuurd naar een Mollie-pagina, kiest een betaalmethode, en keert terug naar je webshop.

**Wat je aanpast:** Aan je checkout zelf niets. Mollie regelt de logo's en de techniek. Het is wel handig om even te kijken of het oude iDEAL-logo ergens anders op je site staat (footer, informatiepagina's, e-mail templates). Die afbeeldingen vervang je zelf.

### Scenario 2: Plugin (WooCommerce, Shopify, Magento)

Als je de Mollie for WooCommerce plugin gebruikt, of de Shopify-integratie, zit je goed. De plugin haalt de betaalopties op via Mollie's API, inclusief de juiste logo's.

**Wat je aanpast:** Check of je plugin up-to-date is. De Mollie for WooCommerce plugin versie 7.x en hoger ondersteunt de nieuwe "iDEAL | Wero" branding. Je versie vind je in WordPress onder Plugins > Geïnstalleerde plugins.

### Scenario 3: Custom API-integratie

Heb je een volledig custom checkout gebouwd met directe API-calls naar Mollie? Dan is er iets meer te doen.

**Wat je aanpast:**

1. **Logo bijwerken.** Vervang je iDEAL-logo handmatig door het "iDEAL | Wero" co-branded logo. Mollie biedt de assets aan via hun documentatie.
2. **API-responses checken.** Als je de betaalmethode-naam uit de API haalt om te tonen, check dan of je code de nieuwe naam correct toont.
3. **Webhook-handlers reviewen.** Wero introduceert nieuwe statussen voor disputes. Handig om te checken of je code daarmee overweg kan.

Voor een developer is dit een middag werk.

## De tijdlijn voor Mollie-gebruikers

| Datum | Wat er gebeurt |
|-------|----------------|
| Januari 2026 | Mollie is Principal Member van EPI geworden |
| 29 januari 2026 | Het co-branded logo mag worden getoond |
| 31 maart 2026 | Webshops tonen het nieuwe logo |
| Eind 2026 | Wero als zelfstandige betaalmethode beschikbaar in Mollie |
| Eind 2027 | iDEAL verdwijnt volledig, alleen Wero blijft over |

De 31 maart gaat specifiek over het logo. De technische overstap naar Wero komt later, en ook dan regelt Mollie het meeste.

## Wat verandert er qua kosten?

Mollie rekent momenteel €0,29 per iDEAL-transactie (plus eventuele andere fees afhankelijk van je pakket). Tot eind 2028 geldt er een prijsgarantie, dus dat blijft voorlopig gelijk.

Daarna gaat Wero waarschijnlijk over op een percentage-model. Wat dit precies betekent voor Mollie's tarieven is nog niet bekend. In [mijn artikel over de Wero-kosten](/blog/wero-kosten-transactiekosten/) ga ik dieper in op wat dat kan betekenen voor verschillende orderwaarden.

## Nieuwe mogelijkheden via Mollie

De overstap naar Wero brengt ook nieuwe features mee die Mollie waarschijnlijk gaat ondersteunen.

**Internationale betalingen.** Met Wero kunnen Duitse, Belgische, Franse en Luxemburgse klanten betalen via hun eigen bankapp. Mollie ondersteunt dit straks automatisch. Geen aparte integraties meer voor Giropay of Bancontact. Vooral voor [verkopen aan Duitse klanten](/blog/meer-verkopen-duitsers-wero/) is dat interessant.

**Request-to-Pay.** Voor dienstverleners interessant: je stuurt een betaalverzoek dat direct in de bankapp van je klant verschijnt. Mollie zal dit waarschijnlijk integreren in hun API.

**Subscriptions.** Wero krijgt ondersteuning voor terugkerende betalingen zonder de papierwinkel van SEPA-incasso. Als je ooit een SEPA-incasso hebt aangevraagd weet je hoeveel formulieren dat kost. Dit is dat, maar dan zonder de formulieren. Mollie biedt al subscriptions aan, en de Wero-variant kan het nog wat soepeler maken.

Deze features komen in de loop van 2026 en 2027. Mollie communiceert hierover via hun blog en changelog.

## Checklist voor Mollie-gebruikers

### Voor 31 maart 2026

1. **Check je integratie-type.** Hosted checkout, plugin, of custom API?
2. **Update je plugin.** Als je WooCommerce of Shopify gebruikt, installeer de nieuwste versie
3. **Zoek hardcoded logo's.** Footer, informatiepagina's, e-mail templates
4. **Vervang oude logo's.** Download de nieuwe assets via Mollie's documentatie

### Eind 2026 (wanneer Wero zelfstandig beschikbaar komt)

5. **Activeer Wero in je dashboard.** Waarschijnlijk een vinkje in Mollie
6. **Test een transactie.** Doe een testbestelling om te checken of alles werkt
7. **Test internationaal** (optioneel). Vraag iemand uit Duitsland of België om te testen

In [mijn algemene checklist voor de Wero-overgang](/blog/wero-webshops-checklist-maart/) staan stappen die voor elke payment provider gelden.

## Wat als je geen Mollie gebruikt?

Stripe, Adyen en MultiSafepay ondersteunen de Wero-overgang ook. De details verschillen per aanbieder.

**Stripe** behandelt Wero als een "Bank Redirect" methode, vergelijkbaar met hoe ze Giropay en Bancontact afhandelen. De overgang gaat grotendeels automatisch voor moderne Stripe-integraties.

**Adyen** focust vooral op enterprise-klanten. Ze bieden directe Wero-ondersteuning, en voor hosted checkouts wordt het logo automatisch bijgewerkt.

**MultiSafepay** heeft de integratie in januari 2026 gelanceerd. Bij hen is het goed om te weten dat je na de co-branding fase Wero als aparte betaalmethode zelf toevoegt. Dat gaat niet automatisch.

## Samengevat

**Hosted checkout?** Mollie regelt het.
**Plugin?** Update naar de nieuwste versie.
**Custom API?** Een middag werk.

De 31 maart gaat over het logo. De technische overstap komt later, en ook dan doet Mollie het zware werk. Fijn als je je tijd liever aan andere dingen besteedt.

---

Meer over de Wero-overgang? Lees [wat iDEAL naar Wero betekent voor je webshop](/blog/ideal-wordt-wero/), bekijk [de checklist met 5 dingen die je voor 31 maart kunt regelen](/blog/wero-webshops-checklist-maart/), of lees [wat Wero gaat kosten](/blog/wero-kosten-transactiekosten/).

Heb je vragen over de Wero-overgang? [Plan gerust een gesprek](/aanvragen/) en ik denk met je mee.
