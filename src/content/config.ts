/**
 * Astro Content Collections Configuration
 * Defines the schema for blog posts with SEO-optimized fields
 */

import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
	type: "content",
	schema: z.object({
		// Core metadata
		title: z.string(),
		description: z.string().max(160), // Meta description, max 160 chars
		publishDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		author: z.string().default("Knap Gemaakt"),

		// SEO
		metaTitle: z.string().max(60).optional(), // Override title for meta tag
		canonicalUrl: z.string().url().optional(),

		// Categorization
		tags: z.array(z.string()).default([]),
		cluster: z.string().optional(), // matches docs/blog/research/<cluster>.md

		// Content hints
		readingTime: z.number().optional(), // Will be calculated
		draft: z.boolean().default(false),

		// Featured image for social sharing
		image: z.string().optional(),
		imageAlt: z.string().optional(),

		// FAQPage schema (rendered by blog layout when present)
		faqs: z
			.array(
				z.object({
					question: z.string(),
					answer: z.string(),
				}),
			)
			.optional(),
	}),
});

const locationsCollection = defineCollection({
	type: "content",
	schema: z.object({
		heroSubheadline: z.string().optional(),
		localProof: z.string().optional(),
		customFAQs: z
			.array(
				z.object({
					question: z.string(),
					answer: z.string(),
				}),
			)
			.optional(),
	}),
});

export const collections = {
	blog: blogCollection,
	locations: locationsCollection,
};
