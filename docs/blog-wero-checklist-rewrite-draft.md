---
title: "Wero voor webshops: de checklist voor na 31 maart"
description: "De deadline van 31 maart is voorbij. Een korte audit voor je webshop: staat het iDEAL | Wero logo nu echt overal goed, en wat komt er na?"
publishDate: 2026-04-22
author: "Yannick Veldhuisen"
tags: ["Betalingen", "Webshops"]
image: "/assets/blog/wero-webshop-checklist.webp"
imageAlt: "Webshophouder controleert na 31 maart of alles klopt rondom iDEAL en Wero"
---

Op 31 maart 2026 moesten Nederlandse webshops officieel overgestapt zijn op het gecombineerde "iDEAL | Wero" logo in hun checkout. Die deadline is voorbij. In de praktijk hebben de grote payment providers zoals Mollie, Stripe en Adyen het meeste zelf geregeld, dus voor de meeste webshops ging dit vrijwel onopgemerkt voorbij. Bij elke site waar nog wat handwerk bij kwam kijken, is de kans echter groot dat er ergens een oud logo staat te wachten dat vergeten is.

En de echte technische overgang moet nog komen. Ergens in Q4 2026 gaat iDEAL onder water over naar het Wero-platform, en tegen eind 2027 verdwijnt de iDEAL-naam helemaal. Er is dus nog genoeg om even op je aandachtslijstje te zetten.

Deze korte audit helpt je om snel door je site en je administratie te lopen.

## 1. Checkout-logo opnieuw controleren

Werk je met Mollie, Stripe, Adyen of een andere grote payment provider die een hosted checkout aanbiedt? Dan is het logo daar vrijwel zeker automatisch bijgewerkt. Dat betekent dat die kant van je site waarschijnlijk al in orde is.

Toch even doorlopen: doe een testbestelling en kijk wat je ziet op de betaalpagina. Staat er ergens nog een oud iDEAL-logo zonder de Wero-toevoeging? Dan heb je óf een oudere plugin-versie, óf ergens een los asset dat niet mee is gemigreerd.

## 2. De plekken waar je site het logo zelf toont

Je checkout loopt via een payment provider. De rest van je site doet dat niet. Op al deze plekken staat het iDEAL-logo vaak nog ongewijzigd:

- De footer, waar je meestal een rijtje betaalmethodes toont
- Je "hoe betalen" of "verzending en betaling"-pagina
- E-mailtemplates voor orderbevestiging en verzendbevestiging
- PDF-facturen
- Je 'veelgestelde vragen'-pagina

Het nieuwe co-branded logo is als SVG of PNG beschikbaar via je payment provider. Mollie, Stripe en Adyen bieden allemaal asset packs aan met alle varianten.

Loop je site eens door en noteer waar je het oude logo nog tegenkomt. Vervangen kost je waarschijnlijk maar een paar minuten.

## 3. Plugins en integraties up-to-date houden

Draai je WooCommerce, Shopify, Lightspeed of iets anders? Check dan even of je payment-plugin op de laatste versie staat. Oudere versies laden soms nog het oude logo uit hun eigen assets, ongeacht wat je zelf op de site hebt gezet.

Voor WooCommerce: de Mollie for WooCommerce plugin vanaf versie 7.x ondersteunt het nieuwe logo. Je vindt je huidige versie via WordPress onder *Plugins > Geïnstalleerde plugins*.

Voor Shopify: betaalopties vind je onder *Instellingen > Betalingen*. Gebruik je Mollie of een andere payment-app, kijk dan of die recent is geüpdatet.

## 4. Een simpel overzichtje

Als je met meerdere mensen aan je webshop werkt, of zelfs als je dat alleen doet, is het handig om op een A4'tje te hebben wat waar geregeld is. Dat voorkomt dat je het gevoel krijgt dat je iets mist.

| Onderdeel | Wordt automatisch bijgewerkt? | Zelf doen? |
|---|---|---|
| Checkout betaalpagina | Ja, door payment provider | Even testen |
| Footer-logo's | Nee | Ja |
| E-mailtemplates | Nee | Ja |
| Informatiepagina's | Nee | Ja |
| Plugin-versies | Nee | Check of alles actueel is |

Houd het simpel, puur om zelf het overzicht te bewaren.

## 5. Administratie klaar voor Wero-disputes

Vanaf Q4 2026 worden iDEAL-transacties onder water via Wero afgehandeld. Dat betekent ook een nieuw element dat iDEAL nooit had: klanten kunnen een betaling tot 120 dagen na de transactie betwisten, met een uitloop tot 540 dagen in specifieke gevallen. Bij iDEAL was een betaling definitief op het moment dat hij gedaan was.

Concreet: bij een klacht over een betaling moet jij als webshop kunnen aantonen dat je geleverd hebt wat was beloofd. Dat doe je met:

- Een verzendbevestiging met track-and-trace-code
- Ordergegevens die je standaard opslaat en kunt terugvinden
- Algemene voorwaarden die actueel zijn en vindbaar op je site staan

De meeste webshops doen dit al. Doe je dit nog niet gestructureerd, dan is nu een goed moment om het op te pakken. Het is meer een kwestie van administratief discipline dan van nieuwe systemen.

## De korte versie

1. **Checkout-test**: staat overal het iDEAL | Wero-logo in je betaalflow?
2. **Logo's buiten de checkout**: footer, e-mails, informatiepagina's, PDF's
3. **Plugins**: draait alles op de laatste versie?
4. **Overzichtje**: weet je wat automatisch gaat en wat niet?
5. **Administratie**: ben je klaar voor disputes die Wero straks introduceert?

Een half uurtje werk en dan staat je site klaar voor wat er in Q4 2026 onder de motorkap gaat veranderen.

---

Wil je meer info over wat Wero precies is en waarom deze overgang überhaupt plaatsvindt? Lees dan [mijn uitgebreide artikel over de iDEAL naar Wero overgang](/blog/ideal-wordt-wero/).
