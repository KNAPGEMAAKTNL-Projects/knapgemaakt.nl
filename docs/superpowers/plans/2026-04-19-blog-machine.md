# Blog Machine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bootstrap the blog production machine per spec `docs/superpowers/specs/2026-04-19-blog-machine-design.md`: project `docs/blog/` tree, content-schema extension, Stage0CTABlock component wired into the blog layout, CTA drop-in on 11 existing posts, 3 evolved slash commands.

**Architecture:** Docs-first content machine. Project-level files (`docs/blog/`) are the source of truth for topic queue, templates, and research. An Astro component (`Stage0CTABlock`) reads `src/config/stage-0-offer.ts` and renders in the blog post layout, so a single config flip swaps Stage 0 vs Stage 1 closer across every post. FAQPage schema is rendered from per-post frontmatter via the existing `FAQSchema.astro`. Three slash commands at `~/.claude/commands/` (`blog`, `blog-refresh`, `blog-research`) operate on these project files.

**Tech Stack:** Astro 5 content collections (zod schema), React 19 islands (unused here), Tailwind CSS 4, existing `FAQSchema.astro`, new `Stage0CTABlock.astro`, markdown frontmatter, git feature branch workflow.

**Pillar retrofits deferred:** Step 3 of the spec (retrofit `ideal-wordt-wero.md`, `website-laten-maken-kosten.md`, `website-voor-zzp.md` to the full pillar template) is handled by `/blog edit` after this plan is merged, not by this plan.

**Branch:** `feat/blog-machine`.

---

## File Structure

**New project files (git-tracked):**

| Path | Responsibility |
|---|---|
| `docs/blog/README.md` | Index + usage guide for the tree. |
| `docs/blog/roadmap.md` | Topic queue + publication ledger. Single source of truth. |
| `docs/blog/image-prompt.md` | Standing image prompt with `[TITLE]` slot + reference paths. |
| `docs/blog/templates/post-structure.md` | Canonical post skeleton (pillar + cluster tiers). |
| `docs/blog/templates/research-prompt.md` | Base prompt `/blog-research` customizes. |
| `docs/blog/research/reference-examples.md` | 6 competitor cost posts annotated. |
| `docs/blog/research/.gitkeep` | Keep dir present before cluster files exist. |
| `src/components/cta/Stage0CTABlock.astro` | Shared Stage 0 / Stage 1 closer, reads config. |
| `public/<indexnow-key>.txt` | IndexNow verification token. |

**Modified project files (git-tracked):**

| Path | Change |
|---|---|
| `src/content/config.ts` | Add optional `faqs` array and `cluster` string to schema. |
| `src/pages/blog/[slug].astro` | Render FAQSchema (when `faqs` present) + Stage0CTABlock between Content and Author Bio. |
| `src/content/blog/*.md` (11 files) | Strip manual bottom CTA paragraphs; rely on layout-level block. |

**Out-of-project files (on Yanni's machine, not committed):**

| Path | Change |
|---|---|
| `~/.claude/commands/blog.md` | Evolve existing command per spec §4. |
| `~/.claude/commands/blog-refresh.md` | New, per spec §5. |
| `~/.claude/commands/blog-research.md` | New, per spec §3. |

---

## Task 1: Feature branch

**Files:** none (git state change).

- [ ] **Step 1: Confirm clean tree on master**

Run:
```bash
git status
```
Expected: `nothing to commit, working tree clean` (or only untracked plan file, which is fine).

- [ ] **Step 2: Pull latest master**

Run:
```bash
git checkout master
git pull origin master
```
Expected: `Already up to date` or fast-forward from origin.

- [ ] **Step 3: Create and switch to feature branch**

Run:
```bash
git checkout -b feat/blog-machine
```
Expected: `Switched to a new branch 'feat/blog-machine'`.

---

## Task 2: Create `docs/blog/` directory scaffold

**Files:**
- Create: `docs/blog/templates/.gitkeep`
- Create: `docs/blog/research/.gitkeep`

- [ ] **Step 1: Create directories and placeholders**

Run:
```bash
mkdir -p docs/blog/templates docs/blog/research
touch docs/blog/templates/.gitkeep docs/blog/research/.gitkeep
```
Expected: no errors. Verify with `ls docs/blog/`:
```
research  templates
```

- [ ] **Step 2: Stage the scaffold**

Run:
```bash
git add docs/blog/
git status
```
Expected: two new `.gitkeep` files staged.

- [ ] **Step 3: Commit**

Run:
```bash
git commit -m "docs(blog): scaffold docs/blog tree"
```

Note: `.gitkeep` files will be removed by subsequent tasks as real files are added to those dirs.

---

## Task 3: Create `docs/blog/README.md`

**Files:**
- Create: `docs/blog/README.md`

- [ ] **Step 1: Write the README**

Write the following to `docs/blog/README.md`:

```markdown
# Blog Machine Files

This directory holds the topic queue, templates, and research artifacts used by the three blog slash commands. See `docs/superpowers/specs/2026-04-19-blog-machine-design.md` for the full design.

## Files

- `roadmap.md`: Topic queue + publication ledger. Edit manually when planning clusters; automatically updated by `/blog` (publish date + status) and `/blog-refresh` (last-refresh date + status changes).
- `image-prompt.md`: Standing image-generation prompt with `[TITLE]` slot. Used by `/blog` Phase 5 to produce a per-post prompt.
- `templates/post-structure.md`: Canonical post skeleton for pillar (2000-3500 words) and cluster (1200-1800 words) tiers. Loaded by `/blog` during drafting.
- `templates/research-prompt.md`: Base prompt that `/blog-research` customizes per cluster before handing to Claude.ai.
- `research/<cluster>.md`: Long-term cluster research (keyword map, named entities, internal linking plan). One file per cluster. Refreshed roughly annually or on trigger events.
- `research/reference-examples.md`: Stable structural-pattern reference from 6 competitor posts Yanni collected on 2026-04-19.

## Commands

Commands live in `~/.claude/commands/` on Yanni's machine, not in this repo.

- `/blog [slug-or-title]`: Draft + publish a new post, or `/blog edit <path>` to improve an existing post.
- `/blog-refresh`: Monthly audit, selects 3 stalled or aging posts and proposes updates.
- `/blog-research <cluster>`: Generates a deep-research prompt for a new or revisited cluster.

## Source of truth

- Roadmap is git-tracked; its history acts as the publication ledger.
- Cluster research files are long-term context (revisit yearly); per-post SERP analysis is ephemeral and not saved.
- The Stage 0 CTA at the bottom of every blog post is driven by `src/config/stage-0-offer.ts` via the shared `Stage0CTABlock` component in the blog layout.
```

- [ ] **Step 2: Commit**

Run:
```bash
git add docs/blog/README.md
git commit -m "docs(blog): add README index"
```

---

## Task 4: Create `docs/blog/image-prompt.md`

**Files:**
- Create: `docs/blog/image-prompt.md`

Yanni's original prompt contained em-dashes inside the character pose bullet and the scene composition bullet about decorative filler. Per the absolute no-em-dash rule, those are already replaced with commas or periods in the prompt body below.

- [ ] **Step 1: Write the prompt file**

Write the following to `docs/blog/image-prompt.md`:

````markdown
# Standing Image Prompt

Used by `/blog` Phase 5. Injects the post title into the `[TITLE]` slot, outputs the completed prompt as a copy-paste block, and instructs Yanni to generate and save the image.

## Reference images (attach in generation tool)

- `~/Downloads/Gemini_Generated_Image_remedoremedoreme.png`
- `~/Downloads/myprofilepicture.jpeg`

## Output target

`src/assets/blog/[slug].webp` at 2048x1024 pixels.

## Prompt template

Inject the blog title into the `[TITLE]` slot.

```text
Create a blog header illustration in EXACTLY 2:1 landscape aspect ratio (e.g., 2048x1024 pixels). The image MUST be twice as wide as it is tall.
Article title: "     [TITLE]     "

Art style (strict):
- Animated film style inspired by Spider-Man: Into the Spider-Verse, The Mitchells vs. the Machines, and Arcane (Netflix)
- Visible halftone dots, subtle grain texture, slightly imperfect linework
- Bold lighting and shadow for depth, not smooth gradients
- Hand-drawn feel, digitally colored

Color palette (strict):
- Primary background: Pure black (#000000)
- Accent color: Electric lime/acid green (#CCFF00)
- Secondary: White (#FFFFFF) for contrast
- Lime green used sparingly: rim lighting, highlights, one or two focal elements
- Shadows in deep charcoal, not pure black

Character:
- Use the recurring KNAP GEMAAKT. character (see reference images)
- Doing something specific and recognizable related to the blog topic
- Relaxed, natural pose, never stiff or "presenting"
- One small lime green detail on clothing
- Pick a random piece of clothing from the character images

Scene composition:
- One clear visual metaphor or concrete scene for the blog topic
- Every element earns its place, no decorative filler
- Generous negative space on the left or right side
- Sharp foreground subject, simplified or slightly blurred background
- Cinematic framing: think a key frame from an animated film

Mood: Confident, slightly cinematic, warm personality. Like a frame from a film, not a tech blog header.

Do NOT include: Text, logos, watermarks, floating icons, abstract decorative shapes, UI mockups, gear/lightbulb/chat bubble icons, scattered objects, smooth vector rendering, corporate illustration style, stock photo aesthetic.

CRITICAL: Output must be landscape 2:1 ratio. Not square. Not 16:9. Exactly twice as wide as tall.
```

## After generation

1. Save the output to `src/assets/blog/[slug].webp` at 2048x1024.
2. Add `image: "/assets/blog/[slug].webp"` and `imageAlt: "[descriptive alt, primary keyword once]"` to the post frontmatter.
3. Confirm back in the session so `/blog` proceeds to Phase 6 polish.
````

- [ ] **Step 2: Commit**

Run:
```bash
git add docs/blog/image-prompt.md
git commit -m "docs(blog): add standing image prompt template"
```

---

## Task 5: Create `docs/blog/templates/post-structure.md`

**Files:**
- Create: `docs/blog/templates/post-structure.md`
- Delete: `docs/blog/templates/.gitkeep`

- [ ] **Step 1: Write the template**

Write the following to `docs/blog/templates/post-structure.md`:

````markdown
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
````

- [ ] **Step 2: Remove `.gitkeep`**

Run:
```bash
rm docs/blog/templates/.gitkeep
```

- [ ] **Step 3: Commit**

Run:
```bash
git add docs/blog/templates/
git commit -m "docs(blog): canonical post-structure template"
```

---

## Task 6: Create `docs/blog/templates/research-prompt.md`

**Files:**
- Create: `docs/blog/templates/research-prompt.md`

- [ ] **Step 1: Write the research prompt template**

Write the following to `docs/blog/templates/research-prompt.md`:

````markdown
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
````

- [ ] **Step 2: Commit**

Run:
```bash
git add docs/blog/templates/research-prompt.md
git commit -m "docs(blog): research-prompt template for /blog-research"
```

---

## Task 7: Create `docs/blog/research/reference-examples.md`

**Files:**
- Create: `docs/blog/research/reference-examples.md`
- Delete: `docs/blog/research/.gitkeep`

The 6 competitor posts Yanni collected on 2026-04-19 are stable structural reference for pillar drafting. Annotate what they do well (to emulate structurally) and what they do badly (to never copy).

- [ ] **Step 1: Write the annotated reference file**

Write the following to `docs/blog/research/reference-examples.md`:

````markdown
# Reference Examples: "Wat kost een website laten maken"

Collected 2026-04-19 from the top ranking results in ChatGPT for "wat kost een website laten maken". Used by `/blog` when drafting pillar posts as a structural reference. Do not copy voice or framing; copy structure only.

## Sources

1. OnlineLabs: "Wat kost een website laten maken? Prijzen en tips voor 2026" (Sanne Verschoor, 5 dec 2025).
2. Appfront: "Wat kost een website laten maken?" (no clear publish date, 2026).
3. iMediaStars: "Webdesign prijzen 2026: wat zijn de gemiddelde kosten van een website?".
4. Hollevoet (Dwayne Snoeren): "Wat kost het om een website te laten maken? Blog Wat kost het om een website te laten maken?".
5. Websteen (Roy Jongerden): "Wat kost het om een website te laten maken in 2026?" (7-4-2026).
6. GOOHW (Mark Gelderblom): "Wat kost het om een website te laten maken" (2 maart 2026).
7. Seobureau: "Wat kost een B2B-website laten maken in 2026?" (14 nov 2025).
8. webwrk (David): "ZZP Website Laten Maken Prijs in 2026" (2 maart 2026).
9. Slim Besteed (Christian Francke): "Wat kost een website laten maken?" (3 april 2026).

## Structural patterns to emulate (every post has these)

- **Price table in first 30% of content**: type of website vs Euro range vs doorlooptijd.
- **Answer-first opening**: short answer in 1 to 2 paragraphs near the top before diving into sections.
- **Tiered price examples with hours breakdown**: "Starter website X uren x Y euro = total" in a table.
- **Verborgen kosten section**: 5 to 10 items, each with a Euro range and a reason.
- **Doorlopende kosten table**: hosting, domein, SSL, onderhoud, e-mail, with per-maand and per-jaar columns.
- **ROI of rendement section**: worked example. Investment + leads per month + conversion + value per klant = payback.
- **Uurtarief reference table**: type of aanbieder vs tarief vs geschikt voor.
- **Template vs maatwerk comparison table**: aspect by aspect.
- **FAQ block at bottom**: 5 to 10 Q&A pairs.
- **Author bio with photo at bottom**: name + role + expertise.
- **Multiple CTA placements**: 2 to 3 mid-content CTAs, not just one at the bottom.

## Voice or framing patterns to avoid (several competitors use these)

- **"Belangrijkste punten om te onthouden" TL;DR list** (Slim Besteed). Pure AI pattern.
- **"Rode vlaggen" anxiety listicles** (OnlineLabs, Slim Besteed). "Extreem lage prijzen zonder uitleg" as a warning.
- **"Expert tip" sidebar callouts** (GOOHW). Template-y.
- **Negation-elevation**: "GEEN X, WEL Y" or "Niet alleen X, maar Y". Appears in multiple.
- **Exclamation marks in CTAs or headers**: "Website die écht werkt!".
- **Clichés**: "Goedkoop is duurkoop" (Slim Besteed). "AI-knutselsite vs maatwerk meubilair" (OnlineLabs). "IKEA-kast vs maatwerk" (Slim Besteed). "Als een winkel zonder etalage".
- **Insider-reveal framing**: "het deel dat minder vaak wordt verteld", "wat niemand je vertelt", "de keerzijde".
- **"Want dat hangt ervan af"** as the opening sentence. Cliché, adds nothing.
- **Rhetorical question avalanche** in opener (4+ rapid questions).
- **Bolded lead-in phrases on every bullet** (Appfront's Verborgen kosten list). AI formatting artifact.
- **Inflated stakes**: "Een website is meer dan een visitekaartje" as revelation rather than calm fact.
- **Generic ROI examples** without named customer or verifiable stat.

## Wedges where knapgemaakt's existing voice already beats all 9

Evidence from `src/content/blog/website-laten-maken-kosten.md` (before pillar retrofit):

- Warmer opening: "Goede vraag. Minder goed antwoord: het hangt ervan af." Honest, dry.
- Analogies that land: "Een Dacia is ook gewoon een prima auto." Specific, non-cliché, real Dutch brand familiarity.
- Personality beats: "Of aan koffie." at the end of a benefits list. "Sommige mensen vinden dat leuk. Anderen kijken na uur twee al verlangend naar hun eigenlijke werk."
- Zero anxiety framing anywhere.
- No exclamation marks, no "GEEN X, WEL Y".

When `/blog edit` retrofits pillars, those wedges stay. Template upgrade adds structure; voice upgrade is none needed.

## Where competitors have more content depth

The existing `website-laten-maken-kosten.md` clocks in at around 1400 words. Competitor pillars run 2500 to 4500. Missing pieces to add during pillar retrofit:

- Dedicated Verborgen kosten section (10 items).
- Dedicated ROI of rendement worked example.
- More granular price tables (uurtarief table, CMS comparison table).
- 5 to 7 FAQ pairs with FAQPage schema (handled by frontmatter + layout).
````

- [ ] **Step 2: Remove `.gitkeep`**

Run:
```bash
rm docs/blog/research/.gitkeep
```

- [ ] **Step 3: Commit**

Run:
```bash
git add docs/blog/research/
git commit -m "docs(blog): annotated reference examples from 6 competitor posts"
```

---

## Task 8: Create `docs/blog/roadmap.md`

**Files:**
- Create: `docs/blog/roadmap.md`

Seed with the 11 existing posts plus 12 hovenier queue entries from scaling plan §3A.

- [ ] **Step 1: List existing posts to populate tables**

Run:
```bash
ls src/content/blog/*.md
```

Expected output (11 files):
```
src/content/blog/ideal-wordt-wero.md
src/content/blog/meer-verkopen-duitsers-wero.md
src/content/blog/wero-kosten-transactiekosten.md
src/content/blog/wero-mollie-integratie.md
src/content/blog/wero-request-to-pay-zzp.md
src/content/blog/wero-vs-ideal-verschillen.md
src/content/blog/wero-webshops-checklist-maart.md
src/content/blog/website-500-of-5000-verschil.md
src/content/blog/website-laten-maken-kosten.md
src/content/blog/website-voor-zzp.md
src/content/blog/wordpress-vs-moderne-alternatieven.md
```

- [ ] **Step 2: Grab publish dates from each post's frontmatter**

Run:
```bash
grep -H "^publishDate:" src/content/blog/*.md
```

Record each post's `publishDate` value for the roadmap's `Published` column.

- [ ] **Step 3: Write the roadmap**

Write the following to `docs/blog/roadmap.md`, substituting the publish dates observed in Step 2 where `YYYY-MM-DD` appears:

```markdown
# Blog Roadmap + Ledger

Last updated: 2026-04-19
Cadence: 2 posts per month per `Hub/business/knapgemaakt-scaling-plan.md` §3A.

## Active clusters

### hovenier  (Stage 0 primary)

Research: `docs/blog/research/hovenier.md`  (status: needed)
Pillars: Post 1 (commercial), Post 2 (authority)
Source: scaling plan §3A

| # | Title | Slug | Tier | Status | Published | Type | Research | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | Wat kost een hovenier-website in 2026? | hovenier-website-kosten-2026 | pillar | queued | - | commercial | - | Month 1 Post 1 |
| 2 | Hoveniers die boven in Google staan: wat doen ze anders? | hoveniers-google-top | pillar | queued | - | authority | - | Month 1 Post 2 |
| 3 | Hovenier-website met of zonder WordPress? | hovenier-website-wordpress | cluster | queued | - | comparison | - | Month 2 Post 1 |
| 4 | Google Bedrijfsprofiel voor hoveniers: 7 meest gemiste velden | google-bedrijfsprofiel-hoveniers | cluster | queued | - | tactical | - | Month 2 Post 2 |
| 5 | Website voor hovenier: 500 of 5000, het eerlijke verschil | hovenier-website-500-of-5000 | cluster | queued | - | comparison | - | Month 3 Post 1 |
| 6 | Lokale SEO voor hoveniers | lokale-seo-hoveniers | cluster | queued | - | tactical | - | Month 3 Post 2 |
| 7 | AVG-proof contactformulier voor hoveniers | avg-contactformulier-hoveniers | cluster | queued | - | tactical | - | Month 4 Post 1 |
| 8 | Reviews verzamelen als hovenier zonder gedoe | reviews-hovenier-zonder-gedoe | cluster | queued | - | tactical | - | Month 4 Post 2 |
| 9 | Offerte-systeem voor hoveniers: 4 aanpakken vergeleken | offerte-systeem-hoveniers | cluster | queued | - | comparison | - | Month 5 Post 1 |
| 10 | Hovenier-portfolio: 6 voor-na-voorbeelden | hovenier-portfolio-voor-na | cluster | queued | - | showcase | - | Month 5 Post 2 |
| 11 | Wat verdient een hovenier met een goede website meer per jaar? | hovenier-extra-omzet-website | cluster | queued | - | roi | - | Month 6 Post 1 |
| 12 | Lokale SEO voor hoveniers per gemeente | lokale-seo-hoveniers-gemeente | cluster | queued | - | tactical | - | Month 6 Post 2 |

### wero  (existing)

Research: `docs/blog/research/wero.md`  (status: backfill needed)
Pillar: `ideal-wordt-wero`

| # | Title | Slug | Tier | Status | Published | Type | Research | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | iDEAL wordt Wero: Wat betekent dit voor jouw webshop? | ideal-wordt-wero | pillar | published | YYYY-MM-DD | informational | - | Wero pillar, pending retrofit |
| 2 | Wero voor webshops: 5 dingen die je voor 31 maart moet regelen | wero-webshops-checklist-maart | cluster | published | YYYY-MM-DD | tactical | - | |
| 3 | Wat kost Wero? Transactiekosten voor ondernemers uitgelegd | wero-kosten-transactiekosten | cluster | published | YYYY-MM-DD | commercial | - | |
| 4 | Wero en Mollie: Hoe werkt de integratie? | wero-mollie-integratie | cluster | published | YYYY-MM-DD | tactical | - | |
| 5 | Meer verkopen aan Duitsers met Wero | meer-verkopen-duitsers-wero | cluster | published | YYYY-MM-DD | commercial | - | |
| 6 | Wero vs iDEAL: De 7 belangrijkste verschillen | wero-vs-ideal-verschillen | cluster | published | YYYY-MM-DD | comparison | - | |
| 7 | Request-to-Pay met Wero: Sneller betaald worden als ZZP'er | wero-request-to-pay-zzp | cluster | published | YYYY-MM-DD | tactical | - | |

### kosten  (existing)

Research: `docs/blog/research/kosten.md`  (status: backfill needed)
Pillar: `website-laten-maken-kosten`

| # | Title | Slug | Tier | Status | Published | Type | Research | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | Wat kost een website laten maken in 2026? Complete prijsgids | website-laten-maken-kosten | pillar | published | YYYY-MM-DD | commercial | - | Kosten pillar, pending retrofit |
| 2 | Website laten maken: 500 of 5000? Het verschil uitgelegd | website-500-of-5000-verschil | cluster | published | YYYY-MM-DD | comparison | - | |

### zzp  (existing)

Research: `docs/blog/research/zzp.md`  (status: backfill needed)
Pillar: `website-voor-zzp`

| # | Title | Slug | Tier | Status | Published | Type | Research | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | Website voor ZZP'ers: Alles wat je moet weten | website-voor-zzp | pillar | published | YYYY-MM-DD | commercial | - | ZZP pillar, pending retrofit |

### wordpress-vs  (existing)

Research: `docs/blog/research/wordpress-vs.md`  (status: backfill needed)

| # | Title | Slug | Tier | Status | Published | Type | Research | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | WordPress vs moderne alternatieven | wordpress-vs-moderne-alternatieven | cluster | published | YYYY-MM-DD | comparison | - | |

## Backlog (deprioritized, from Jan-2026 content-strategy.md)

Horeca, beauty, zorg, fitness, makelaardij, creatieve beroepen, integraties, vergelijkingen, conversie. Reactivate only after hovenier cluster graduates (scaling plan §3A Month 6+).

## Archive

Deprecated or deleted posts listed here with reason and date.
```

- [ ] **Step 4: Commit**

Run:
```bash
git add docs/blog/roadmap.md
git commit -m "docs(blog): seed roadmap with 11 existing posts + 12 hovenier queue"
```

---

## Task 9: Extend content collection schema

**Files:**
- Modify: `src/content/config.ts`

Add `faqs` (optional array of `{question, answer}`) and `cluster` (optional string) to the blog schema.

- [ ] **Step 1: Read the current file**

Read `src/content/config.ts`. Current schema fields:

```typescript
title: z.string(),
description: z.string().max(160),
publishDate: z.coerce.date(),
updatedDate: z.coerce.date().optional(),
author: z.string().default("Knap Gemaakt"),
metaTitle: z.string().max(60).optional(),
canonicalUrl: z.string().url().optional(),
tags: z.array(z.string()).default([]),
readingTime: z.number().optional(),
draft: z.boolean().default(false),
image: z.string().optional(),
imageAlt: z.string().optional(),
```

- [ ] **Step 2: Add the new fields**

Edit `src/content/config.ts`. Replace the current schema block with:

```typescript
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

export const collections = {
	blog: blogCollection,
};
```

- [ ] **Step 3: Verify the build still passes**

Run:
```bash
npm run build
```
Expected: `build finished` with no schema errors. Existing posts have no `faqs` or `cluster` fields; both are optional so their absence is fine.

- [ ] **Step 4: Commit**

Run:
```bash
git add src/content/config.ts
git commit -m "feat(blog): extend content schema with faqs + cluster fields"
```

---

## Task 10: Create `src/components/cta/Stage0CTABlock.astro`

**Files:**
- Create: `src/components/cta/Stage0CTABlock.astro`

Renders two variants driven by `src/config/stage-0-offer.ts`. When `enabled: true`, show the Stage 0 callout. When disabled, show the Stage 1 closer.

- [ ] **Step 1: Create the component directory**

Run:
```bash
mkdir -p src/components/cta
```

- [ ] **Step 2: Verify what's exported from the config**

Read `src/config/stage-0-offer.ts`. Exports:
- `stage0Offer` object with `enabled`, `month`, `year`, `spotsRemaining`, `ctaUrl`, `detailsUrl`.
- `spotsLabel(n?)` function.
- `bedrijvenLabel(n?)` function.
- `monthUpper()` function.

- [ ] **Step 3: Write the component**

Write the following to `src/components/cta/Stage0CTABlock.astro`:

```astro
---
import { stage0Offer, bedrijvenLabel } from "../../config/stage-0-offer";

const enabled = stage0Offer.enabled;
const url = stage0Offer.ctaUrl;
---

{enabled ? (
	<section class="px-6 md:px-12 lg:px-16 py-14 md:py-20 bg-ink text-canvas">
		<div class="max-w-2xl mx-auto">
			<h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-5">
				Bouw ik nu een website voor jou, tijdelijk gratis?
			</h2>
			<p class="text-lg text-canvas/80 leading-relaxed mb-4">
				Ik bouw momenteel {bedrijvenLabel()} websites gratis voor Nederlandse ondernemers, in ruil voor een case study en een testimonial na 90 dagen. Voorkeur gaat uit naar hoveniers en lokale dienstverleners, maar als je bedrijf past kunnen we het altijd bespreken.
			</p>
			<p class="text-lg text-canvas/80 leading-relaxed mb-8">
				Dit is geen "proeftuin", het is een volledig pakket: maatwerk site, Google-vindbaarheid, lead-motor, reviews, hosting. De enige reden dat het gratis is, is dat ik case studies bouw voordat ik met een duidelijk betaald aanbod start.
			</p>
			<a
				href={url}
				class="inline-flex items-center gap-3 bg-accent text-ink px-8 py-4 rounded-lg font-bold tracking-tight hover:bg-accent/90 transition-colors group"
			>
				Past dit bij jouw bedrijf? Plan een gesprek
				<span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
			</a>
		</div>
	</section>
) : (
	<section class="px-6 md:px-12 lg:px-16 py-14 md:py-20 bg-ink text-canvas">
		<div class="max-w-2xl mx-auto">
			<h2 class="text-2xl md:text-3xl font-bold tracking-tight mb-5">
				Klaar voor een website die werkt?
			</h2>
			<p class="text-lg text-canvas/80 leading-relaxed mb-8">
				497 euro setup en 47 euro per maand, alles erin. 90 dagen niet-goed-geld-terug garantie op de setup-fee.
			</p>
			<a
				href={url}
				class="inline-flex items-center gap-3 bg-accent text-ink px-8 py-4 rounded-lg font-bold tracking-tight hover:bg-accent/90 transition-colors group"
			>
				Plan een kennismaking
				<span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
			</a>
		</div>
	</section>
)}
```

Design notes:
- Matches the existing design tokens (`bg-ink`, `text-canvas`, `bg-accent`, `text-ink`). Those are defined in `src/styles/global.css`.
- Rounded padding and spacing match `veelgestelde-vragen.astro` CTA block.
- No em-dashes. Uses commas.
- Single arrow glyph only.

- [ ] **Step 4: Verify build**

Run:
```bash
npm run build
```
Expected: build succeeds. Component is defined but not yet imported anywhere, so no render test yet.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/components/cta/Stage0CTABlock.astro
git commit -m "feat(cta): Stage0CTABlock component reading from config"
```

---

## Task 11: Wire Stage0CTABlock + FAQSchema into blog post layout

**Files:**
- Modify: `src/pages/blog/[slug].astro`

Render FAQSchema (when `post.data.faqs` is defined) and Stage0CTABlock. Place Stage0CTABlock after the Author Bio section that already exists. FAQSchema generates JSON-LD only, no visible content.

- [ ] **Step 1: Read the existing layout**

Read `src/pages/blog/[slug].astro`. Current imports (lines 1-8):
```astro
import Layout from "../../layouts/Layout.astro";
import Footer from "../../components/Footer.astro";
import BlogPostSchema from "../../components/seo/BlogPostSchema.astro";
import BreadcrumbSchema from "../../components/seo/BreadcrumbSchema.astro";
import BlogCardImage from "../../components/blog/BlogCardImage.astro";
import { getCollection, type CollectionEntry } from "astro:content";
```

Author Bio section is at lines 175-198. Verder lezen section follows at lines 200-221.

- [ ] **Step 2: Add imports**

Edit `src/pages/blog/[slug].astro`. Add these two imports after the existing ones (between line 5 and line 6):

```astro
import FAQSchema from "../../components/seo/FAQSchema.astro";
import Stage0CTABlock from "../../components/cta/Stage0CTABlock.astro";
```

The import block becomes:

```astro
import Layout from "../../layouts/Layout.astro";
import Footer from "../../components/Footer.astro";
import BlogPostSchema from "../../components/seo/BlogPostSchema.astro";
import BreadcrumbSchema from "../../components/seo/BreadcrumbSchema.astro";
import BlogCardImage from "../../components/blog/BlogCardImage.astro";
import FAQSchema from "../../components/seo/FAQSchema.astro";
import Stage0CTABlock from "../../components/cta/Stage0CTABlock.astro";
import { getCollection, type CollectionEntry } from "astro:content";
```

- [ ] **Step 3: Render FAQSchema conditionally**

Edit `src/pages/blog/[slug].astro`. Locate the `<BreadcrumbSchema items={breadcrumbs} />` line (around line 73). Directly after it, add:

```astro
{post.data.faqs && post.data.faqs.length > 0 && (
	<FAQSchema faqs={post.data.faqs} />
)}
```

The result should read:

```astro
<BlogPostSchema ... />
<BreadcrumbSchema items={breadcrumbs} />
{post.data.faqs && post.data.faqs.length > 0 && (
	<FAQSchema faqs={post.data.faqs} />
)}
```

- [ ] **Step 4: Render Stage0CTABlock after Author Bio**

Edit `src/pages/blog/[slug].astro`. Locate the closing `</section>` of the Author Bio block (around line 198). Directly after that closing tag, before the Verder lezen conditional, insert:

```astro
			<Stage0CTABlock />

```

The Author Bio section's closing tag followed by the new insert should read:

```astro
			</section>

			<Stage0CTABlock />

			<!-- Verder lezen -->
			{otherPosts.length > 0 && (
```

- [ ] **Step 5: Build verify**

Run:
```bash
npm run build
```
Expected: build succeeds. Warnings about FAQSchema being unused on posts without `faqs` are OK and expected.

- [ ] **Step 6: Visual smoke test**

Run the dev server:
```bash
npm run dev
```

Open `http://localhost:4321/blog/website-laten-maken-kosten/` in a browser. Expected:
- Post renders normally.
- Author Bio block is at the bottom.
- Stage 0 CTA block renders below Author Bio, before "Verder lezen".
- CTA uses the Stage 0 variant ("Bouw ik nu een website voor jou, tijdelijk gratis?") because `stage0Offer.enabled = true` in the current config.
- Stop the dev server (Ctrl+C).

- [ ] **Step 7: Commit**

Run:
```bash
git add src/pages/blog/[slug].astro
git commit -m "feat(blog): render FAQSchema + Stage0CTABlock in post layout"
```

---

## Task 12: Strip manual CTAs from 11 existing posts

**Files:**
- Modify: all 11 `src/content/blog/*.md` files.

Each post currently ends with a manual CTA paragraph (typically "Plan gerust een gesprek" or similar). The layout now handles the Stage 0 CTA, so the manual paragraph is redundant. Strip it.

- [ ] **Step 1: Identify the closer pattern in each post**

Run:
```bash
tail -5 src/content/blog/*.md
```

Observe the closing pattern. Most posts end with a `---` separator followed by a short paragraph containing a link to `/contact/` or `/aanvragen/`.

- [ ] **Step 2: Strip closer from Wero cluster (7 posts)**

For each of these files, remove the final `---` separator and the CTA paragraph that follows it. Keep the substantive content (including any final H2 section, FAQ, or summary table).

- `src/content/blog/ideal-wordt-wero.md`
- `src/content/blog/meer-verkopen-duitsers-wero.md`
- `src/content/blog/wero-kosten-transactiekosten.md`
- `src/content/blog/wero-mollie-integratie.md`
- `src/content/blog/wero-request-to-pay-zzp.md`
- `src/content/blog/wero-vs-ideal-verschillen.md`
- `src/content/blog/wero-webshops-checklist-maart.md`

For each file, read it, locate the last `---` that precedes a CTA paragraph (not the frontmatter fence at top), and delete from that `---` through end-of-file.

Example: `src/content/blog/wero-mollie-integratie.md` currently ends at line 120 with:
```markdown
Meer over de Wero-overgang? Lees [wat iDEAL naar Wero betekent voor je webshop](/blog/ideal-wordt-wero/), bekijk [de checklist met 5 dingen die je voor 31 maart kunt regelen](/blog/wero-webshops-checklist-maart/), of lees [wat Wero gaat kosten](/blog/wero-kosten-transactiekosten/).

Heb je vragen over de Wero-overgang? [Plan gerust een gesprek](/contact/) en ik denk met je mee.
```

After strip, the file ends with:
```markdown
Meer over de Wero-overgang? Lees [wat iDEAL naar Wero betekent voor je webshop](/blog/ideal-wordt-wero/), bekijk [de checklist met 5 dingen die je voor 31 maart kunt regelen](/blog/wero-webshops-checklist-maart/), of lees [wat Wero gaat kosten](/blog/wero-kosten-transactiekosten/).
```

The preceding `---` separator also gets removed, and any trailing blank line after the stripped section.

- [ ] **Step 3: Strip closer from remaining 4 posts**

Same pattern for:
- `src/content/blog/website-500-of-5000-verschil.md`
- `src/content/blog/website-laten-maken-kosten.md`
- `src/content/blog/website-voor-zzp.md`
- `src/content/blog/wordpress-vs-moderne-alternatieven.md`

- [ ] **Step 4: Build verify**

Run:
```bash
npm run build
```
Expected: build succeeds. All 11 posts render.

- [ ] **Step 5: Visual smoke test**

Run dev server. Visit 3 different posts (e.g. `/blog/wero-mollie-integratie/`, `/blog/website-laten-maken-kosten/`, `/blog/wordpress-vs-moderne-alternatieven/`). Expected:
- Each post ends with its substantive content (no dangling manual CTA).
- Author Bio + Stage 0 CTA block + Verder lezen section render correctly.
- No duplicated CTA.
- Stop dev server.

- [ ] **Step 6: Commit**

Run:
```bash
git add src/content/blog/
git commit -m "refactor(blog): strip manual bottom CTAs, layout now handles Stage 0 block"
```

---

## Task 13: Generate IndexNow key + create verification file

**Files:**
- Create: `public/<key>.txt`

IndexNow expects a file at `https://knapgemaakt.nl/<key>.txt` containing only the key as verification that the domain owns the key.

- [ ] **Step 1: Generate a random IndexNow key**

Run:
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

Expected: a 32-character hex string, e.g. `a3f8b19c4d2e6f0a1b8c9d4e5f6a7b8c`. Record this value; it goes into two places.

- [ ] **Step 2: Create the verification file**

Create `public/<key>.txt` where `<key>` is the string from Step 1. The file contains only the key, no trailing newline:

```bash
echo -n "<key>" > public/<key>.txt
```

Replace `<key>` with the actual value in both the filename and file content.

- [ ] **Step 3: Record the key in the command reference**

This key will be used by the `/blog` command in Task 15 for the IndexNow ping. Record the full key string for use in that task.

- [ ] **Step 4: Build verify**

Run:
```bash
npm run build
```
Expected: file is served at `/<key>.txt` after build. Astro copies `public/*` verbatim.

- [ ] **Step 5: Commit**

Run:
```bash
git add public/
git commit -m "feat(indexnow): add verification key file"
```

---

## Task 14: Infrastructure final build + smoke test

**Files:** none (verification only).

- [ ] **Step 1: Full clean build**

Run:
```bash
npm run build
```
Expected: no errors, all posts render, no TypeScript errors on the extended schema.

- [ ] **Step 2: Dev server smoke test**

Run:
```bash
npm run dev
```

Visit these URLs and verify:
- `/blog/`: index renders, all 11 posts listed.
- `/blog/wero-mollie-integratie/`: Author Bio + Stage 0 CTA + Verder lezen in correct order.
- `/blog/website-laten-maken-kosten/`: same structure, no double CTA.
- `/<indexnow-key>.txt`: returns the key as plain text (check in browser or via `curl http://localhost:4321/<key>.txt`).

Stop dev server.

- [ ] **Step 3: Confirm git status is clean**

Run:
```bash
git status
```
Expected: `nothing to commit, working tree clean`. Infrastructure work is complete.

---

## Task 15: Evolve `~/.claude/commands/blog.md`

**Files:**
- Modify: `~/.claude/commands/blog.md` (outside the repo, not git-tracked)

Rewrite the existing `/blog` command to implement spec §4 end-to-end. The new command is longer and more structured than the current version.

- [ ] **Step 1: Read the current command**

Read `~/.claude/commands/blog.md`. Preserve the voice section (it's already aligned with the design). The rewrite reorganizes everything else.

- [ ] **Step 2: Replace the file with the evolved command**

Write the following to `~/.claude/commands/blog.md` (overwriting the existing file). Substitute `<INDEXNOW_KEY>` with the key generated in Task 13.

````markdown
# Claude Command: blog

Draft and publish a blog post for knapgemaakt.nl, or improve an existing one.

## Usage

- `/blog`: lists the top 5 queued posts from the roadmap, you pick.
- `/blog <slug-or-title>`: jumps to that specific post from the roadmap.
- `/blog edit <path>`: improve an existing post (pillar retrofit or targeted refresh).

## Phase 1: Context load (automatic, no asks)

Read in parallel, from the project (cwd = `C:/Code/clients/knapgemaakt.nl/` or wherever `/blog` is invoked):

- `docs/blog/roadmap.md`: resolve the target post's row (title, cluster, tier, type, notes).
- `docs/blog/research/[cluster].md`: long-term cluster context (keywords, entities, PAA, linking map).
- `docs/blog/research/reference-examples.md`: structural reference (load for pillar posts; skip for cluster posts).
- `docs/blog/templates/post-structure.md`: canonical skeleton.
- `docs/blog/image-prompt.md`: standing image prompt.
- `src/config/stage-0-offer.ts`: Stage 0 state.
- `src/content/blog/*.md` filtered to the target cluster: for internal linking targets and deduplication.

Read from Yanni's Hub (cross-project SOPs):

- `C:/Users/yanni/Hub/business/sops/copywriting/core/anti-ai-detection.md`
- `C:/Users/yanni/Hub/business/sops/copywriting/lang/nl/anti-ai-nl.md`
- `C:/Users/yanni/Hub/business/sops/copywriting/lang/nl/find-replace-nl.md`
- `C:/Users/yanni/Hub/business/sops/copywriting/lang/nl/formality-nl.md`
- `C:/Users/yanni/Hub/business/sops/copywriting/voice/hovenier.md` (when cluster is hovenier; pick the matching voice file otherwise)
- `C:/Users/yanni/Hub/business/sops/copywriting/feedback/FEEDBACK-LOG.md` (last 10 entries)

If the cluster is `hovenier`, also read `C:/Users/yanni/Hub/business/knapgemaakt-scaling-plan.md` §3A.

## Phase 2: Per-post SERP analysis (ephemeral)

Before drafting, prompt Yanni to run a quick AI search on the target post's primary keyword. Ask for:

- URLs of the top 1 to 3 ranking articles in ChatGPT or Claude.ai for the query.
- Pasted content or short summary of each.

Extract in session memory only (no file saved):

- Structural patterns across the top 3 (sections they share, word counts, tables, FAQ presence, author boxes).
- What they cover well and where they have gaps.
- Named entities and stats they cite.
- Specific angle for knapgemaakt to beat them.
- Any signals that shift the drafting plan.

This output stays in session memory only. SERP shifts month to month; saving creates stale reference.

## Phase 3: Draft generation

Produce a markdown file at `src/content/blog/[slug].md` matching the tier:

- Pillar (2000 to 3500 words): includes Verborgen kosten, ROI example, 3 to 5 comparison tables.
- Cluster (1200 to 1800 words): no Hidden costs or ROI, 2 to 3 tables.

Mandatory on every post:
- Frontmatter per `docs/blog/templates/post-structure.md` (includes `cluster` field matching the target and `faqs` array with 5 to 7 Q&A pairs).
- Answer capsule under H1, 40 to 60 words.
- 4 to 6 H2 sections, 60% or more as customer questions, each with a sub-capsule.
- FAQ section inside the body (mirrors the `faqs` frontmatter; the layout adds JSON-LD via FAQSchema and renders no duplicate visible block, so the visible Q&A lives in the body text).
- 5 to 10 outgoing internal links (6 to 12 for pillar), 1 to 2 to `/webdesign/`, trailing slashes on every internal link.

Author Bio and Stage0CTABlock are rendered by the layout, do not include them in the post body.

## Phase 4: Self-check (automatic)

Run every check in order. Any failure stops progress until addressed.

Voice and editorial:
- No em-dashes or en-dashes in prose.
- Sentence length variance: mix of short (5 to 8 words) and long (20 to 35 words), no three consecutive similar-length sentences.
- 3 to 5 moments of personality spread across the post, never consecutive.
- No anxiety framing, no drama, no pushy CTAs, no exclamation marks in headers.
- No "iedereen kent/heeft/weet" presumption, no defensive meta-commentary.
- Natural Dutch word order, not translated English.

SEO structural:
- Title 50 to 70 chars, meta 120 to 160 chars.
- Answer capsule present under H1, 40 to 60 words.
- H2-as-question ratio at least 60%.
- FAQ count 5 to 7, each answer 30 to 50 words.
- Word count in tier range.
- Internal link count in tier range.
- 3+ named entities (5+ for pillar).

Anti-AI structural (from `anti-ai-detection.md`):
- Paragraph length SD at least 25 across 6+ paragraphs.
- No schoolbook closer that restates opening.
- Transition markers open fewer than 50% of paragraphs.
- Participial phrase tacking on fewer than 20% of sentences.
- Fewer than three tricolons per 200 words.
- No inflated stakes ("revolutioneren", "transformeren").

Competitor anti-patterns (from `reference-examples.md`):
- No "Belangrijkste punten om te onthouden" openers.
- No "Rode vlaggen" anxiety listicles.
- No "Expert tip" sidebar callouts.
- No "GEEN X, WEL Y" negation-elevation.
- No clichés: "goedkoop is duurkoop", "IKEA-kast vs maatwerk", "AI-knutselsite vs maatwerk", "visitekaartje" metaphor.
- No insider-reveal framing.

Positive humor gate:
- If the post has zero dry asides, one-word reactions, relatable comparisons, or self-deprecation moments, fail. Humor is required, not optional.

Flag every failure and pause until addressed in Phase 6 polish.

## Phase 5: Image prompt output

Read `docs/blog/image-prompt.md`. Inject the post title into the `[TITLE]` slot. Output the completed prompt as a copy-paste block plus the two reference image paths:

- `~/Downloads/Gemini_Generated_Image_remedoremedoreme.png`
- `~/Downloads/myprofilepicture.jpeg`

Instruct Yanni to generate the image in his preferred tool, save to `src/assets/blog/[slug].webp` at 2048x1024, and confirm in the session before moving to Phase 7.

## Phase 6: Polish (Yanni)

Yanni reviews the draft, edits for voice, optionally adds a personal anecdote or opinion. Addresses any Phase 4 failures. Saves final.

## Phase 7: Publish

1. Validate frontmatter (all required fields populated, no placeholders).
2. Propose 2 to 3 cross-link edits to related existing posts within the same or adjacent cluster. Each proposal is a specific line edit. Yanni approves each.
3. Stage edits and commit with a conventional message:
   ```bash
   git add src/content/blog/<slug>.md src/assets/blog/<slug>.webp [cross-linked post paths]
   git commit -m "feat(blog): [post title]"
   ```
4. Push to the current branch (master unless Yanni specifies otherwise):
   ```bash
   git push
   ```
5. Wait for Cloudflare deploy (roughly 1 minute).
6. Submit URL to Google Search Console: surface the GSC URL-inspection URL to Yanni: `https://search.google.com/search-console/inspect?resource_id=sc-domain%3Aknapgemaakt.nl&id=https%3A%2F%2Fknapgemaakt.nl%2Fblog%2F<slug>%2F`. Yanni clicks through and requests indexing.
7. Ping IndexNow:
   ```bash
   curl -X POST https://api.indexnow.org/indexnow \
     -H "Content-Type: application/json" \
     -d '{
       "host": "knapgemaakt.nl",
       "key": "<INDEXNOW_KEY>",
       "keyLocation": "https://knapgemaakt.nl/<INDEXNOW_KEY>.txt",
       "urlList": ["https://knapgemaakt.nl/blog/<slug>/"]
     }'
   ```
   Expected: HTTP 200 or 202.
8. Update `docs/blog/roadmap.md`: set the post's `Status` column to `published` and `Published` column to today's date. Commit the roadmap update:
   ```bash
   git add docs/blog/roadmap.md
   git commit -m "docs(blog): mark [slug] published"
   git push
   ```

## Voice rules (unchanged from previous command version)

[Keep the three non-negotiables and the voice + Dutch calibration + what-to-never-do sections from the original command, verbatim. They remain the authoritative voice guide.]

- ZERO anxiety framing.
- Personality is MANDATORY (3 to 5 moments per post).
- Explain tech terms only when they matter.
- Je register, never u.
- Natural Dutch, avoid translated English.
- No em-dashes or en-dashes anywhere.
- No dramatic openings, no clickbait, no manufactured urgency.

## References (loaded in Phase 1)

See the Phase 1 list above. The copywriting SOP files and voice guides are authoritative; this command is a workflow wrapper.
````

- [ ] **Step 3: Record the change**

The `/blog` command is outside the repo. Ask Yanni to confirm the file is in place:

```bash
ls ~/.claude/commands/blog.md
```
Expected: file exists.

- [ ] **Step 4: No commit**

This file is outside the project repo; nothing to commit to the feature branch.

---

## Task 16: Create `~/.claude/commands/blog-refresh.md`

**Files:**
- Create: `~/.claude/commands/blog-refresh.md`

- [ ] **Step 1: Write the command**

Write the following to `~/.claude/commands/blog-refresh.md`:

````markdown
# Claude Command: blog-refresh

Monthly audit of published posts. Selects 3 posts for refresh, diagnoses issues, proposes action per post.

## Usage

- `/blog-refresh`: runs the monthly cycle. No arguments.

## Phase 1: Selection

1. Read `docs/blog/roadmap.md`. Filter to `Status = published`.
2. Score each post on:
   - Age since publish (older is higher priority).
   - Last-refresh date (never-refreshed is priority; posts refreshed within the last 90 days are deprioritized).
   - Cluster activity (post whose cluster has gained siblings since last refresh gets a bump).
3. Present the top 5 candidates in a table. Ask Yanni to paste GSC data for each:
   - 28-day average position.
   - Impressions.
   - Clicks.
   - CTR.
4. Select 3 posts for this cycle based on:
   - Stalled rankings (position drifting down over 90 days).
   - High impressions plus low CTR (title or meta issue).
   - Aging posts with declining traffic.

## Phase 2: Diagnosis (per selected post)

Read each post plus the cluster research file plus the pasted GSC numbers. Flag:

- Stale facts, prices, dates more than 6 months old.
- Answer capsule missing (pre-template posts).
- H2s not in question form (where natural).
- Missing `faqs` in frontmatter.
- Broken internal links (sibling renamed or deleted).
- Sparse internal links (fewer than 5 outgoing).
- Low CTR suggesting title or meta rewrite.
- Rank ceiling suggesting depth issue (length, entities, link count).

## Phase 3: Action plan (per post)

Propose one of:

- **Update in-place**: fix title or meta, add capsule, add `faqs`, refresh stats, add cross-links, re-sync Stage 0 CTA reference if needed (though the CTA is layout-driven so typically no edit required).
- **Consolidate**: merge into a stronger sibling, add 301 redirect in `public/_redirects`, archive in roadmap with reason.
- **Deprecate**: 301 redirect to a sibling, archive in roadmap with reason and date.
- **Leave**: healthy post, just bump `last-refresh` column in roadmap.

Yanni approves each action individually.

## Phase 4: Execute

For each approved action:

**Update in-place:**
1. Claude edits the post.
2. Yanni reviews.
3. Commit:
   ```bash
   git add src/content/blog/<slug>.md docs/blog/roadmap.md
   git commit -m "refresh(blog): update <slug> [summary]"
   git push
   ```
4. IndexNow ping:
   ```bash
   curl -X POST https://api.indexnow.org/indexnow \
     -H "Content-Type: application/json" \
     -d '{
       "host": "knapgemaakt.nl",
       "key": "<INDEXNOW_KEY>",
       "keyLocation": "https://knapgemaakt.nl/<INDEXNOW_KEY>.txt",
       "urlList": ["https://knapgemaakt.nl/blog/<slug>/"]
     }'
   ```

**Consolidate or deprecate:**
1. Merge relevant content from the doomed post into the sibling (if consolidating).
2. Add redirect to `public/_redirects`:
   ```
   /blog/<old-slug>/ /blog/<sibling-slug>/ 301
   ```
3. Delete the post file:
   ```bash
   git rm src/content/blog/<old-slug>.md
   ```
4. Update `docs/blog/roadmap.md`: move the entry to the Archive section with reason + date.
5. Commit:
   ```bash
   git add public/_redirects docs/blog/roadmap.md src/content/blog/
   git commit -m "refresh(blog): consolidate <old-slug> into <sibling-slug>"
   git push
   ```

**Leave:**
1. Update `docs/blog/roadmap.md`: set `last-refresh` column to today's date.
2. Commit:
   ```bash
   git add docs/blog/roadmap.md
   git commit -m "refresh(blog): bump last-refresh for <slug> (no changes)"
   git push
   ```

## Phase 5: Ledger update

After all actions complete, confirm `docs/blog/roadmap.md` reflects:

- Any status changes (published -> consolidated -> archived with reason).
- Last-refresh dates bumped on updated posts.

## Cadence

First week of each month, paired with the 2-posts-per-month publish rhythm.
````

- [ ] **Step 2: Confirm file is in place**

Run:
```bash
ls ~/.claude/commands/blog-refresh.md
```
Expected: file exists.

- [ ] **Step 3: No commit**

Outside the project repo.

---

## Task 17: Create `~/.claude/commands/blog-research.md`

**Files:**
- Create: `~/.claude/commands/blog-research.md`

- [ ] **Step 1: Write the command**

Write the following to `~/.claude/commands/blog-research.md`:

````markdown
# Claude Command: blog-research

Generate a tailored research prompt for a cluster. Yanni pastes the prompt into Claude.ai (web UI) for deep research, then pastes the output back. This command saves the result to `docs/blog/research/<cluster>.md`.

## Usage

- `/blog-research <cluster>`: generate and display the prompt for the named cluster.

## Phase 1: Resolve cluster context

1. Read `docs/blog/roadmap.md`. Find the cluster section matching `<cluster>`. Extract:
   - Cluster audience (derive from cluster name and notes, e.g., "hoveniers in Nederland").
   - Full topic list (queued + published).
   - Existing posts in this cluster with slugs.
2. Read `docs/blog/templates/research-prompt.md` for the base prompt body.
3. Read `src/config/stage-0-offer.ts` for the current Stage 0 config.
4. Read `docs/blog/research/*.md` (other cluster files) to list adjacent clusters with published posts for internal linking.

## Phase 2: Generate the prompt

Inject the variables from Phase 1 into the base prompt body:

- `[CLUSTER_NAME]`
- `[CLUSTER_AUDIENCE]`
- `[TOPIC_LIST]` (bullet list of queued + published titles)
- `[ADJACENT_CLUSTERS]` (table of adjacent clusters with post slugs)
- `[STAGE_0_CONFIG]` (stringified version of the config object)
- `[EXISTING_POSTS]` (table of already published posts in this cluster)

Display the completed prompt as a copy-paste block.

## Phase 3: Wait for Claude.ai output

Instruct Yanni to:
1. Paste the prompt into Claude.ai (web UI, Deep Research or extended research mode).
2. Iterate if needed (add follow-ups to fill gaps).
3. Paste the final output back into this Claude Code session.

## Phase 4: Save and validate

1. Save the pasted output to `docs/blog/research/<cluster>.md`.
2. Validate required headers are present:
   - `## Primary keywords`
   - `## Secondary keywords / semantic halo`
   - `## PAA questions`
   - `## Competitor SERP gaps`
   - `## Named entities`
   - `## Answer capsule candidates`
   - `## FAQ candidates`
   - `## Stats + numbers`
   - `## Internal linking map`
3. Flag any missing sections for Yanni to fill manually.

## Phase 5: Update roadmap

Edit `docs/blog/roadmap.md`: change the cluster's `Research` line from `(status: needed)` or `(status: backfill needed)` to:

```
Research: docs/blog/research/<cluster>.md (last researched: YYYY-MM-DD)
```

## Phase 6: Commit

```bash
git add docs/blog/research/<cluster>.md docs/blog/roadmap.md
git commit -m "docs(blog): research file for <cluster> cluster"
git push
```

## When to run

- **Mandatory** before publishing the first post in a new cluster.
- **Backfill** one per month for existing clusters (`wero`, `kosten`, `zzp`, `wordpress-vs`).
- **Triggered re-run** when facts change (Wero pricing update, new Astro version, major SEO algorithm shift) or the file ages past about 12 months.
````

- [ ] **Step 2: Confirm file is in place**

Run:
```bash
ls ~/.claude/commands/blog-research.md
```
Expected: file exists.

- [ ] **Step 3: No commit**

Outside the project repo.

---

## Task 18: Final project build + smoke test

**Files:** none (verification only).

- [ ] **Step 1: Clean build**

Run:
```bash
rm -rf dist .astro
npm run build
```
Expected: full build succeeds without warnings or errors.

- [ ] **Step 2: Smoke test critical paths**

Run:
```bash
npm run dev
```

In a browser, verify:
- `/blog/` loads, all 11 posts listed.
- Open 3 posts from different clusters: verify each shows Author Bio, then Stage 0 CTA block, then Verder lezen, in that order.
- `/<indexnow-key>.txt` returns the key string.
- No console errors.

Stop dev server.

- [ ] **Step 3: Ensure all commits are on the feature branch**

Run:
```bash
git log --oneline master..feat/blog-machine
```

Expected: list of commits from Tasks 2 through 13. Approximately 10 commits (one per Task that commits).

- [ ] **Step 4: Diff summary**

Run:
```bash
git diff master --stat
```
Expected: changes grouped under `docs/blog/`, `src/components/cta/`, `src/content/config.ts`, `src/pages/blog/[slug].astro`, `src/content/blog/*.md`, `public/<key>.txt`.

---

## Task 19: Push branch and open PR

**Files:** none (GitHub state change).

- [ ] **Step 1: Push the branch**

Run:
```bash
git push -u origin feat/blog-machine
```
Expected: branch pushed, upstream tracking set.

- [ ] **Step 2: Create PR**

Run:
```bash
gh pr create --title "feat: blog machine infrastructure + Stage 0 CTA drop-in" --body "$(cat <<'EOF'
## Summary

- Adds `docs/blog/` tree: README, roadmap (seeded with 11 existing + 12 hovenier queue), standing image prompt, post-structure + research-prompt templates, annotated competitor reference examples.
- Extends content collection schema with optional `faqs` and `cluster` fields.
- Adds `Stage0CTABlock.astro` component reading `src/config/stage-0-offer.ts`.
- Wires `FAQSchema` (conditional) + `Stage0CTABlock` into the blog post layout (`src/pages/blog/[slug].astro`).
- Strips redundant manual CTAs from 11 existing posts; layout now handles.
- Adds IndexNow verification key file.

Companion slash commands (outside the repo, on operator's machine):
- `~/.claude/commands/blog.md` evolved to the 7-phase flow per spec.
- `~/.claude/commands/blog-refresh.md` created for monthly audits.
- `~/.claude/commands/blog-research.md` created for per-cluster research prompts.

Spec: `docs/superpowers/specs/2026-04-19-blog-machine-design.md`.
Plan: `docs/superpowers/plans/2026-04-19-blog-machine.md`.

Pillar retrofits (Step 3 of the migration) are intentionally deferred: they will be executed by `/blog edit` after merge, post-by-post.

## Test plan

- [ ] `npm run build` succeeds.
- [ ] `/blog/` index renders all 11 posts.
- [ ] Opening 3 random posts shows Author Bio, then Stage 0 CTA block, then Verder lezen (no manual CTA before the block).
- [ ] `/<indexnow-key>.txt` returns only the key.
- [ ] Frontmatter `faqs` on any post triggers FAQSchema JSON-LD in the rendered HTML.
- [ ] Flipping `stage0Offer.enabled` to `false` in config swaps all post CTAs to the Stage 1 variant on rebuild.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: PR URL returned. Paste URL in session for Yanni to review.

- [ ] **Step 3: Hand off**

Display the PR URL. Remind Yanni:

> PR open. After merge, the first usage of the machine will be `/blog-research hovenier` followed by `/blog edit src/content/blog/ideal-wordt-wero.md` (and the other two pillars) to handle Step 3 of the migration.

---

## Self-review checklist

- [ ] Spec coverage: directory structure (Task 2), README (Task 3), image prompt (Task 4), post-structure template (Task 5), research-prompt template (Task 6), reference-examples (Task 7), roadmap (Task 8), schema extension (Task 9), Stage0CTABlock (Task 10), layout wiring (Task 11), manual CTA strip (Task 12), IndexNow (Task 13), command evolution (Tasks 15-17), smoke test (Tasks 14, 18), PR (Task 19). Pillar retrofit deferred to post-merge by design.
- [ ] No placeholders: all code blocks contain real content. Roadmap's `YYYY-MM-DD` cells are intentional lookups resolved by Task 8 Step 2.
- [ ] Type consistency: `faqs` schema shape (`{question, answer}`) matches between Task 9 (schema definition) and Task 11 (usage in layout conditional); `cluster` schema field matches template and command references; Stage0CTABlock imports match the config module's actual exports.
- [ ] Every internal link in the plan uses trailing slash (`/webdesign/`, `/blog/<slug>/`).
- [ ] No em-dashes in the plan itself.
- [ ] IndexNow key placeholder `<INDEXNOW_KEY>` in command tasks is explicitly linked to Task 13's generation step.
