import { getAllProjects } from "../data/projects";
import { getAllCities } from "../data/cities";

const site = import.meta.env.SITE ?? "https://knapgemaakt.nl";

interface PageEntry {
    path: string;
    lastmod: string;
    changefreq: "daily" | "weekly" | "monthly" | "yearly";
    priority: string;
}

function generateSitemap(): string {
    // Generate fresh date on each request to avoid stale/epoch dates
    const today = new Date().toISOString().split("T")[0];

    const staticPages: PageEntry[] = [
        { path: "/", lastmod: today, changefreq: "weekly", priority: "1.0" },
        { path: "/aanvragen", lastmod: today, changefreq: "monthly", priority: "0.9" },
        { path: "/aanvragen/bedankt", lastmod: today, changefreq: "monthly", priority: "0.3" },
        { path: "/portfolio", lastmod: today, changefreq: "weekly", priority: "0.8" },
        { path: "/algemene-voorwaarden", lastmod: "2026-01-20", changefreq: "yearly", priority: "0.3" },
        { path: "/privacy", lastmod: "2026-01-20", changefreq: "yearly", priority: "0.3" },
    ];

    // Dynamically generate project pages from data
    const projectPages: PageEntry[] = getAllProjects().map((project) => ({
        path: `/project/${project.slug}`,
        lastmod: today,
        changefreq: "monthly" as const,
        priority: "0.7",
    }));

    // Dynamically generate city pages from data
    const cityPages: PageEntry[] = getAllCities().map((city) => ({
        path: `/webdesign-${city.slug}`,
        lastmod: today,
        changefreq: "weekly" as const,
        priority: "0.8",
    }));

    const allPages = [...staticPages, ...projectPages, ...cityPages];

    const urlEntries = allPages
        .map(
            (page) =>
                `  <url>
    <loc>${site}${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
        )
        .join("\n");

    return (
        `<?xml version="1.0" encoding="UTF-8"?>\n` +
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        `${urlEntries}\n` +
        `</urlset>\n`
    );
}

export function GET() {
    return new Response(generateSitemap(), {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600", // Cache for 1 hour, then regenerate
        },
    });
}
