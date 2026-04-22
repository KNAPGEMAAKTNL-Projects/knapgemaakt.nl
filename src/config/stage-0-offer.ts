export const stage0Offer = {
  enabled: true,
  month: "mei",
  year: 2026,
  spotsRemaining: 2,
  ctaUrl: "/aanvragen/",
  detailsUrl: "/webdesign/",
} as const;

export function spotsLabel(n: number = stage0Offer.spotsRemaining): string {
  return n === 1 ? "1 plek" : `${n} plekken`;
}

export function bedrijvenLabel(n: number = stage0Offer.spotsRemaining): string {
  return n === 1 ? "1 bedrijf" : `${n} bedrijven`;
}

export function monthUpper(): string {
  return stage0Offer.month.toUpperCase();
}
