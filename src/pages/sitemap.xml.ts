const site = import.meta.env.SITE ?? "https://knapgemaakt.nl";

const staticPages = [
  "/",
  "/aanvragen",
  "/algemene-voorwaarden",
  "/privacy",
  "/sitemap",
];

const cities = [
  "Culemborg",
  "Utrecht",
  "Houten",
  "Nieuwegein",
  "Geldermalsen",
  "Tiel",
  "Vianen",
  "IJsselstein",
  "Beesd",
  "Buren",
];

const cityPages = cities.map((city) => `/webdesign-${city.toLowerCase()}`);

const urlEntries = [...staticPages, ...cityPages]
  .map((path) => `  <url>\n    <loc>${site}${path}</loc>\n  </url>`)
  .join("\n");

const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `${urlEntries}\n` +
  `</urlset>\n`;

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
