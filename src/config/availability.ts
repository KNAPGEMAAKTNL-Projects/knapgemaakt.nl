/**
 * Beschikbaarheid van KNAP GEMAAKT. Vervangt de Stage 0-aanbieding (mei 2026).
 * Zolang fullyBooked true is toont de site "{maand} zit vol" en verwijzen de
 * kennismaak-CTA's naar de contactpagina. Weer klanten aannemen: zet
 * fullyBooked op false; consumers vallen dan terug op de betaalde-aanbod copy.
 *
 * Let op: currentMonth() draait op prerendered pagina's op het buildmoment.
 * Zichtbare maandvermeldingen horen via <CurrentMonth /> te lopen, die de
 * maand client-side corrigeert als de build ouder is dan een maand.
 */
export const availability = {
  fullyBooked: true,
  ctaUrl: "/contact/",
} as const;

const monthFormat = new Intl.DateTimeFormat("nl-NL", {
  month: "long",
  timeZone: "Europe/Amsterdam",
});

export function currentMonth(): string {
  return monthFormat.format(new Date());
}

export function currentMonthCapitalized(): string {
  const month = currentMonth();
  return month.charAt(0).toUpperCase() + month.slice(1);
}
