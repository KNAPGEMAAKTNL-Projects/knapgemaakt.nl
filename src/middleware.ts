import { defineMiddleware } from "astro:middleware";

/**
 * Legacy URL Handler Middleware
 *
 * Returns 410 Gone for URLs from the previous website that used this domain.
 * This tells Google to permanently remove these URLs from its index,
 * rather than 404 which means "try again later".
 *
 * The domain previously hosted a Dutch crafts/artisan marketplace.
 */

// Patterns from the old website that should return 410 Gone
const LEGACY_PATTERNS = [
  // Old WordPress portfolio items
  /^\/portfolio-item\//,
  /^\/portfolio_items\//,

  // WordPress media and system files
  /^\/wp-content\//,
  /^\/wp-admin/,
  /^\/wp-includes/,
  /^\/wp-json/,

  // WordPress feeds
  /^\/feed\/?$/,
  /^\/comments\/feed\/?$/,
  /.*\/feed\/?$/,

  // Old category pages
  /^\/sieraden\/?$/,
  /^\/meubels\/?$/,
  /^\/modeaccessoires\/?$/,
  /^\/kandelaars-klokken\/?$/,
  /^\/delicatessen\/?$/,
  /^\/shops\/?$/,

  // Old tag pages
  /^\/tag\//,

  // Old maker/artist profile pages (common patterns)
  /^\/wies-jegerings\/?$/,
  /^\/jacqlins-tassen\/?$/,
  /^\/carolien-brusse\/?$/,
  /^\/atelier-jeannette-mommers\/?$/,
  /^\/amstergem\/?$/,
  /^\/12lovecrafts\/?$/,
  /^\/gelukdoosje\/?$/,
  /^\/ans-bakker-glaskunst\/?$/,
  /^\/keramiek-met-een-glimlach\/?$/,

  // Old blog posts/announcements
  /^\/geopend-kerstshop/,
  /^\/onze-najaar-shop/,
  /^\/familiefeest\/?$/,

  // Apple app association files (not applicable)
  /^\/apple-app-site-association$/,
  /^\/.well-known\/apple-app-site-association$/,

  // Cloudflare email protection (old site artifact)
  /^\/cdn-cgi\/l\/email-protection$/,
];

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;

  // Check if the URL matches any legacy pattern
  const isLegacyUrl = LEGACY_PATTERNS.some(pattern => pattern.test(pathname));

  if (isLegacyUrl) {
    // Return 410 Gone - tells search engines this content is permanently removed
    return new Response(
      `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex">
  <title>Pagina Verwijderd | KNAP GEMAAKT.</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 600px; margin: 100px auto; padding: 20px; text-align: center; }
    h1 { font-size: 2rem; margin-bottom: 1rem; }
    p { color: #666; margin-bottom: 2rem; }
    a { color: #000; font-weight: bold; }
  </style>
</head>
<body>
  <h1>Deze pagina bestaat niet meer</h1>
  <p>De pagina die je zoekt was onderdeel van een oude website en is permanent verwijderd.</p>
  <p><a href="/">Ga naar de homepage van KNAP GEMAAKT.</a></p>
</body>
</html>`,
      {
        status: 410,
        statusText: "Gone",
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "X-Robots-Tag": "noindex",
        },
      }
    );
  }

  // Continue with normal request handling
  return next();
});
