# Cluster Research Prompt Template

Used by `/blog-research` to generate a tailored prompt for Claude.ai. The command injects cluster-specific variables before displaying the prompt to Yanni.

## Variables injected by `/blog-research`

| Variable | Source |
|---|---|
| `[CLUSTER_NAME]` | Argument to the command. |
| `[CLUSTER_AUDIENCE]` | Derived from cluster name and roadmap notes (e.g., "hoveniers in Nederland"). |
| `[TOPIC_LIST]` | All queued + published topics for this cluster from `docs/blog/roadmap.md`. |
| `[ADJACENT_CLUSTERS]` | Other active clusters with their published-post slugs for internal linking. |
| `[STAGE_0_CONFIG]` | Current value of `src/config/stage-0-offer.ts` stringified. |
| `[EXISTING_POSTS]` | List of published posts within this cluster (slug + title). |

## Prompt body

After injection, the prompt handed to Claude.ai reads:

```text
You are an SEO research specialist for knapgemaakt.nl, a Dutch web design agency targeting [CLUSTER_AUDIENCE]. Produce a structured research file for the [CLUSTER_NAME] cluster to feed blog posts over the coming 6 to 12 months.

Brand voice rules:
- Plain Dutch, je/jij register.
- Direct, evidence over hype, no marketing clichés.
- No em-dashes. No "GEEN X, WEL Y" negation-elevation. No "belangrijkste punten" TL;DR openers.
- Never anxiety framing, never insider-reveal framing.

Target market: Netherlands, local-service focus.
Cluster topic list: [TOPIC_LIST]
Adjacent clusters with published posts for linking: [ADJACENT_CLUSTERS]
Existing posts already published in this cluster: [EXISTING_POSTS]
Stage 0 offer config: [STAGE_0_CONFIG]

Produce a Markdown file with these exact section headers, in this order:

## Primary keywords (10-15)
Table: keyword | estimated NL monthly search volume | intent (commercial/informational/transactional) | competition estimate (low/medium/high)

## Secondary keywords / semantic halo (30-50)
Plain list, natural Dutch.

## PAA questions (top 20)
Table: question | 30-50 word canonical answer in Dutch

## Competitor SERP gaps
For each of the 5 highest-volume primary keywords: who ranks top 3 (domains), their content structure, and where knapgemaakt's gap or angle sits.

## Named entities
Three subsections:
- Local: Dutch cities, regions, neighborhoods relevant to this audience.
- Industry: associations, tools, certifications, brand names.
- Dutch-specific: KvK, BTW, AVG, NEN-normen, other regulatory references.

## Answer capsule candidates (40-60 words each, Dutch)
One per primary keyword, ready to drop under an H1.

## FAQ candidates (20 Q&A pairs, Dutch)
Table: question | 30-50 word answer

## Stats + numbers (10, sourced, dated)
Table: fact | source URL | date

## Internal linking map
For each topic in [TOPIC_LIST]: which adjacent cluster posts should link from and to it.

Output everything customer-facing (capsules, FAQs, PAA answers) in Dutch. Use English for analysis headers and tables if useful. Include sources as footnotes. Date the file at the top with today's date.
```

## How `/blog-research` handles the output

1. Yanni pastes the output back into the Claude Code session.
2. Command saves it to `docs/blog/research/[CLUSTER_NAME].md`.
3. Validates all required headers are present.
4. Updates `docs/blog/roadmap.md`: marks cluster as researched with today's date.
5. Reports any missing sections for Yanni to fill manually.
