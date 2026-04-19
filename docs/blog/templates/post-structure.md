# Canonical Post Structure

Used by `/blog` during Phase 3 drafting. Two length tiers:

- **Pillar / commercial (2000-3500 words)**: high-commercial-intent queries with sizeable ranking opportunity.
- **Cluster / authority / how-to (1200-1800 words)**: tactical or specific-angle posts.

The `tier` field in `docs/blog/roadmap.md` picks which tier applies.

## Shared frontmatter (both tiers)

```yaml
---
title: "50 to 70 chars, keyword-forward"
description: "120 to 160 chars, primary keyword naturally"
publishDate: YYYY-MM-DD
author: "Yannick Veldhuisen"
tags: ["Tag1", "Tag2"]
cluster: "hovenier"           # matches docs/blog/research/<cluster>.md
image: "/assets/blog/[slug].webp"
imageAlt: "descriptive, primary keyword once"
faqs:
  - question: "..."
    answer: "..."
  - question: "..."
    answer: "..."
---
```

`faqs` drives the FAQ section rendered by the blog layout via `FAQSchema.astro` plus a visible Q&A block.

## Shared body layout (both tiers)

1. **Answer capsule** directly under the H1 (the title is the H1, rendered by the layout). 40 to 60 words. Structure: who/what/where/differentiator-with-number, 1 or 2 sentences. No preamble.
2. **4 to 6 H2 sections**. 60 to 70% phrased as customer questions. Each H2 followed by a 40 to 60 word sub-capsule, then expansion.
3. **FAQ section** as the final content block before the layout renders its shared footer blocks. Mirrors the `faqs` frontmatter.

The layout automatically appends:
- `<FAQSchema faqs={frontmatter.faqs} />` (JSON-LD only, no visible content).
- Existing Author Bio section (already in layout).
- `<Stage0CTABlock />`.

## Pillar additions (2000-3500 words, commercial)

Insert these sections inside the body, between H2 sections where topically natural:

- **Verborgen kosten**: 5 to 10 concrete items with Euro ranges and real reasons. Natural Dutch framing. Never anxiety-framed, never insider-reveal framing ("wat niemand je vertelt").
- **ROI of investering terugverdienen**: one worked example. Concrete numbers: investment, leads per month, conversion rate, value per customer, payback months.
- **Comparison tables**: 3 to 5 across the post (price tiers, CMS options, hourly rates, template vs maatwerk).

Constraints:
- 2000 to 3500 words.
- 6 to 12 outgoing internal links.
- 1 to 2 links to `/webdesign/`.
- 5+ named entities.
- 3 to 5 moments of personality (approximately 1 per 500 to 700 words).

## Cluster additions (1200-1800 words, authority/tactical)

No Hidden costs or ROI section unless the topic genuinely calls for it. 2 to 3 comparison tables.

Constraints:
- 1200 to 1800 words.
- 5 to 10 outgoing internal links.
- 3+ named entities.
- 3 to 5 moments of personality (approximately 1 per 300 to 400 words).

## Hard rules (both tiers)

- Trailing slash on every internal link (`/webdesign/`, `/blog/<slug>/`).
- No em-dashes or en-dashes anywhere in prose.
- H2-as-question ratio at least 60%.
- Answer capsule present under H1, 40 to 60 words.
- `faqs` array present with 5 to 7 pairs, each answer 30 to 50 words.
- Author already enforced by layout; no bespoke author bio inside post body.
- No manual bottom CTA paragraph; the layout's `<Stage0CTABlock />` handles it.

## Reference implementations

After Task 13 strips manual CTAs from existing posts, the cleanest cluster-post reference is `src/content/blog/wero-mollie-integratie.md`. After the pillar retrofit (handled by `/blog edit` post-merge), `website-laten-maken-kosten.md` becomes the pillar reference.

For positive structural reference from competitor corpus, see `docs/blog/research/reference-examples.md`. For negative voice reference, the same file lists what not to copy.
