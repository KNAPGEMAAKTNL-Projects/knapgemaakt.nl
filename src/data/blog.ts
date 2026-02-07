/**
 * Blog post metadata for sitemap generation
 *
 * Note: This file is used by sitemap.xml.ts which can't access Astro Content Collections.
 * Keep this in sync with actual blog posts in src/content/blog/
 */

export interface BlogPostMeta {
	slug: string;
	title: string;
	shortTitle: string; // Compact label for footer links
	publishDate: string; // ISO date string
}

/**
 * List of all published blog posts
 * Update this when adding new posts
 */
export const blogPosts: BlogPostMeta[] = [
	{
		slug: "ideal-wordt-wero",
		title: "iDEAL wordt Wero: Wat betekent dit voor jouw webshop?",
		shortTitle: "iDEAL wordt Wero",
		publishDate: "2026-01-29",
	},
	{
		slug: "wero-webshops-checklist-maart",
		title: "Wero voor webshops: 5 dingen die je voor 31 maart moet regelen",
		shortTitle: "Wero checklist webshops",
		publishDate: "2026-01-30",
	},
	{
		slug: "wero-kosten-transactiekosten",
		title: "Wat kost Wero? Transactiekosten voor ondernemers uitgelegd",
		shortTitle: "Wero transactiekosten",
		publishDate: "2026-01-31",
	},
	{
		slug: "wero-mollie-integratie",
		title: "Wero en Mollie: Hoe werkt de integratie?",
		shortTitle: "Wero & Mollie",
		publishDate: "2026-02-01",
	},
	{
		slug: "website-laten-maken-kosten",
		title: "Wat kost een website laten maken in 2026? Complete prijsgids",
		shortTitle: "Website kosten 2026",
		publishDate: "2026-01-31",
	},
	{
		slug: "meer-verkopen-duitsers-wero",
		title: "Meer verkopen aan Duitsers met Wero",
		shortTitle: "Verkopen aan Duitsers",
		publishDate: "2026-02-02",
	},
	{
		slug: "website-500-of-5000-verschil",
		title: "Website laten maken: €500 of €5000? Het verschil uitgelegd",
		shortTitle: "€500 vs €5000",
		publishDate: "2026-02-03",
	},
];

export function getAllBlogPosts(): BlogPostMeta[] {
	return blogPosts;
}
