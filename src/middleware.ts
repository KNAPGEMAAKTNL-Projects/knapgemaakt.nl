import { defineMiddleware } from "astro:middleware";

/**
 * URL Handler Middleware
 *
 * Handles three types of legacy URLs:
 * 1. Returns 410 Gone for URLs from the previous website (Dutch crafts marketplace)
 * 2. Returns 410 Gone for removed blog posts and tags from strategy changes
 * 3. 301 redirects for renamed project slugs (preserves SEO equity)
 */

// Project slug redirects (old slug -> new slug)
const PROJECT_REDIRECTS: Record<string, string> = {
  "/project/fitcity-culemborg": "/project/maatwerk-website-voor-fitcity-culemborg/",
  "/project/byshakir": "/project/maatwerk-website-voor-by-shakir/",
};

// Blog post redirects (old slug -> new slug, consolidating content)
const BLOG_REDIRECTS: Record<string, string> = {
  "/blog/webdesign-utrecht": "/blog/website-laten-maken-kosten/",
  "/blog/webshop-laten-maken": "/blog/website-laten-maken-kosten/",
  "/blog/maatwerkwebsite-laten-maken": "/blog/website-laten-maken-kosten/",
  "/blog/zelf-website-maken-of-laten-maken": "/blog/website-laten-maken-kosten/",
};

// Removed blog posts that should return 410 Gone
const REMOVED_BLOG_POSTS = [
  "/blog/wordpress-vs-moderne-alternatieven",
  "/blog/website-voor-zzp",
];

// Removed tag pages that should return 410 Gone
const REMOVED_TAG_PAGES = [
  "/blog/tag/tips",
  "/blog/tag/utrecht",
  "/blog/tag/wordpress",
  "/blog/tag/gids",
  "/blog/tag/maatwerk",
  "/blog/tag/vergelijking",
];

// Removed projects that should return 410 Gone
const REMOVED_PROJECTS = [
  "/project/schildersbedrijf-visser",
];

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
  /^\/kralen-en-vilt\/?$/,
  /^\/vazen\/?$/,
  /^\/verslingerd\/?$/,
  /^\/webdesign-utrecht\/?$/,

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
  /^\/website-laten-maken\/?$/,
  /^\/agenda-kunstmarkten-2020\/?$/,

  // Apple app association files (not applicable)
  /^\/apple-app-site-association$/,
  /^\/.well-known\/apple-app-site-association$/,

  // Cloudflare email protection (old site artifact)
  /^\/cdn-cgi\/l\/email-protection$/,

  // Old asset directories and files
  /^\/assets\/projects\//,
  /^\/cities\//,
  /^\/favicon\.ico$/,
];

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;
  // Normalize pathname (remove trailing slash for comparison, except root)
  const normalizedPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");

  // Check for blog redirects (301 - consolidating content to current posts)
  if (BLOG_REDIRECTS[normalizedPath]) {
    return new Response(null, {
      status: 301,
      headers: {
        Location: BLOG_REDIRECTS[normalizedPath],
      },
    });
  }

  // Check for project redirects (301 - preserves SEO equity)
  if (PROJECT_REDIRECTS[normalizedPath]) {
    return new Response(null, {
      status: 301,
      headers: {
        Location: PROJECT_REDIRECTS[normalizedPath],
      },
    });
  }

  // Handle trailing slash redirects for webdesign-[city] pages
  // Redirect /webdesign-city to /webdesign-city/ (with trailing slash)
  const webdesignMatch = normalizedPath.match(/^\/webdesign-/);
  if (webdesignMatch && pathname !== normalizedPath) {
    // Request has trailing slash, but page should work with it, so continue
  } else if (webdesignMatch && pathname === normalizedPath) {
    // Request doesn't have trailing slash, redirect to version with trailing slash
    return new Response(null, {
      status: 301,
      headers: {
        Location: normalizedPath + "/",
      },
    });
  }

  // Check if the URL is a removed blog post, tag page, or project
  const isRemovedContent =
    REMOVED_BLOG_POSTS.some(url => normalizedPath === url) ||
    REMOVED_TAG_PAGES.some(url => normalizedPath === url) ||
    REMOVED_PROJECTS.some(url => normalizedPath === url);

  // Check if the URL matches any legacy pattern from old website
  const isLegacyUrl = LEGACY_PATTERNS.some(pattern => pattern.test(pathname));

  if (isRemovedContent || isLegacyUrl) {
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
