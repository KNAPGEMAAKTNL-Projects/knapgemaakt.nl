# Blog Machine Design

**Date:** 2026-04-19
**Author:** Yannick Veldhuisen + Claude Code
**Status:** Design approved, ready for implementation plan

## Goal

Build a production system for reliably publishing 2 blog posts per month per the scaling plan's Stage 0 cadence (§3A), while preserving Yanni's voice, passing the anti-AI-detection checklist, and compounding topical authority through cluster structure and programmatic internal linking.

## Architecture

A hybrid shape: one evolved slash command for draft-plus-publish in a single flow, one separate command for monthly refresh audits, one command for cluster-level research prompt generation, plus four project-level files under `docs/blog/` that track state and templates.

- Claude Code does: prompt generation, file placement, structure validation, self-check against SOP rules, cross-link proposals, roadmap synchronization.
- Claude.ai (web UI) does: the deep cluster research (once per cluster), via a prompt `/blog-research` generates.
- Yanni does: polish drafts, generate images in his tool of choice, approve cross-link edits, commit.

## Tech Stack

- Astro 5 SSR on Cloudflare Workers (existing).
- Existing `FAQSchema.astro` component reused per post for FAQPage JSON-LD.
- New `Stage0CTABlock.astro` component reads `src/config/stage-0-offer.ts` to flip Stage 0 vs Stage 1 closer based on config.
- Slash commands at `~/.claude/commands/blog.md`, `blog-refresh.md`, `blog-research.md`.
- Project state at `docs/blog/` (README, roadmap, image-prompt, templates, research).

---

## 1. Directory structure

```
docs/blog/
├── README.md                    Index + how to use each file
├── roadmap.md                   Topic queue + publication ledger (git-tracked source of truth)
├── image-prompt.md              Standing image prompt with [TITLE] slot + reference paths
├── templates/
│   ├── post-structure.md        Canonical post skeleton (pillar + cluster variants)
│   └── research-prompt.md       Base prompt /blog-research customizes per cluster
└── research/
    ├── reference-examples.md    The 6 competitor posts Yanni sent, saved as negative/positive reference
    ├── hovenier.md              Active, Stage 0 primary (created after /blog-research hovenier runs)
    ├── wero.md                  Backfill (7 existing posts)
    ├── kosten.md                Backfill (2 existing posts, incl. Kosten pillar)
    ├── zzp.md                   Backfill (1 existing post, ZZP pillar)
    └── wordpress-vs.md          Backfill (1 existing post)

~/.claude/commands/
├── blog.md                      Evolved: draft + publish end-to-end
├── blog-refresh.md              New: monthly audit
└── blog-research.md             New: cluster research prompt generator
```

---

## 2. Post structure template (two length tiers)

Based on 6 competitor posts Yanni supplied that rank in ChatGPT, commercial pillar posts on high-volume queries run 2500 to 4500 words. The machine therefore uses two length tiers.

### 2.1 Pillar / commercial (2000 to 3500 words)

Used for high-commercial-intent queries like "Wat kost een hovenier-website", "WordPress of maatwerk voor hoveniers", "Website voor hovenier: €500 of €5000".

Frontmatter:

```yaml
---
title: "[50-70 chars, keyword-forward]"
description: "[120-160 chars, primary keyword naturally]"
publishDate: YYYY-MM-DD
author: "Yannick Veldhuisen"
tags: ["Tag1", "Tag2"]
image: "/assets/blog/[slug].webp"
imageAlt: "[descriptive, primary keyword once]"
---
```

Body layout:

1. **Answer capsule** directly under H1, 40 to 60 words. Structure: who/what/where/differentiator-with-number, 1 to 2 sentences.
2. **4 to 6 H2 sections**, 60 to 70% phrased as customer questions. Each H2 gets a 40 to 60 word sub-capsule before expansion.
3. **Hidden costs section** ("Verborgen kosten waar je op moet letten" or similar natural Dutch framing, never "10 kosten die niemand je vertelt" insider-reveal framing). 5 to 10 concrete items with specific Euro ranges and real reasons. Not anxiety-framed.
4. **ROI or "investering terugverdienen" section** with one worked example. Concrete numbers: investment, leads per month, conversion rate, value per customer, payback months.
5. **Comparison tables** (3 to 5 total across the post): price tiers, CMS options, hourly rates, template vs maatwerk, etc. Tables are the single biggest structural signal in the competitor corpus.
6. **FAQ section** "## Veelgestelde vragen over [topic]", 5 to 7 Q&A pairs, each answer 30 to 50 words, self-contained, non-promotional.
7. **`<FAQSchema faqs={faqs} />`** render block (reuses existing component).
8. **`<Stage0CTABlock />`** render block (auto-variant from config).
9. **Author bio block** at the bottom (E-E-A-T signal, all 6 competitor posts have this): short paragraph plus link to /over/.

Constraints:
- 2000 to 3500 words
- 6 to 12 outgoing internal links (slight increase for longer format)
- 1 to 2 links to `/webdesign/` service page
- 5+ named entities (Dutch cities, industry terms, tools, regulations, specific providers)
- 3 to 5 moments of personality spread across the post (roughly 1 per 500 to 700 words for pillar length)

### 2.2 Cluster / authority / how-to (1200 to 1800 words)

Used for tactical posts like "Google Bedrijfsprofiel voor hoveniers", "Reviews verzamelen als hovenier zonder gedoe", "AVG-proof contactformulier voor hoveniers".

Same body layout as pillar, with these differences:
- Skip the Hidden costs section (not applicable to tactical posts).
- Skip the ROI section unless the post naturally calls for it.
- 2 to 3 tables instead of 3 to 5.
- FAQ still mandatory.
- 5 to 10 outgoing internal links.
- 3 to 5 moments of personality (roughly 1 per 300 to 400 words).

### 2.3 Shared enforcements (both tiers)

- Answer capsule under H1 is mandatory.
- H2-as-question ratio >= 60%.
- FAQ section with `<FAQSchema/>` is mandatory.
- `<Stage0CTABlock/>` is mandatory.
- Author bio at bottom is mandatory.
- All internal links end with trailing slash.

---

## 3. Cluster research gate (`/blog-research`)

### 3.1 When it runs

- **Mandatory** before publishing the first post in a new cluster (gate).
- **One-time backfill** for existing clusters with published posts: `wero`, `kosten`, `zzp`, `wordpress-vs`. Approximately 4 sessions, one per month alongside the regular refresh cycle.
- **Triggered re-run** when the cluster is reactivated, facts change (e.g., Wero pricing update, new Astro version, major SEO algorithm shift), or the file ages past roughly 12 months. Cluster research is long-term context but not forever; a periodic revisit keeps keyword maps and entity lists current.

### 3.2 Flow

1. Yanni runs `/blog-research hovenier`.
2. Claude Code reads the cluster entry from `docs/blog/roadmap.md` (topic list, audience, stage, any seed keywords from the legacy `Hub/business/context/blog-content-strategy.md` where applicable).
3. Claude Code reads `docs/blog/templates/research-prompt.md` and injects cluster-specific variables: `[CLUSTER_NAME]`, `[CLUSTER_AUDIENCE]`, `[TOPIC_LIST]`, `[ADJACENT_CLUSTERS]`, `[STAGE_0_CONFIG]`, `[EXISTING_POSTS]`.
4. Outputs the completed prompt as a copy-paste block. Claude Code does not run the research itself. Claude.ai (web UI) has better deep-research and web-search for this kind of analysis.
5. Yanni pastes the prompt into Claude.ai, iterates if needed, pastes the output back into the Claude Code session.
6. Claude Code saves the output to `docs/blog/research/[cluster].md`, validates the structure (all required headers present), and updates `roadmap.md` to mark the cluster as researched plus the date.

### 3.3 Research file structure

```markdown
# Cluster: [name]

Last researched: YYYY-MM-DD
Source: Claude.ai deep research

## Primary keywords (10-15)
[keyword | est. NL search volume | intent (commercial/informational) | competition]

## Secondary keywords / semantic halo (30-50)
[plain list, natural Dutch]

## PAA questions (top 20)
[Q | 30-50 word canonical answer in Dutch]

## Competitor SERP gaps
[for each of 5 highest-volume primary keywords: who ranks top 3, their
 content structure, where knapgemaakt's gap or angle sits]

## Named entities
[local: Dutch cities/regions |
 industry: associations/tools/certifications |
 Dutch-specific: KvK, BTW, AVG, NEN-normen, etc.]

## Answer capsule candidates (40-60 words each, Dutch)
[one per primary keyword, ready to drop under an H1]

## FAQ candidates (20 Q&A pairs, Dutch)
[Q | 30-50 word A]

## Stats + numbers (10, sourced, dated)
[fact | source URL | date]

## Internal linking map
[for each post in the cluster: which adjacent cluster posts should link
 from and to it]
```

---

## 4. Drafting plus publish flow (`/blog`)

### 4.1 Invocation

- `/blog` with no argument: lists the top 5 queued posts from roadmap, Yanni picks.
- `/blog <slug-or-title>`: jumps to that specific post.
- `/blog edit <path>`: improve an existing post.

### 4.2 Phase 1: Context load (automatic, no asks)

Claude Code reads in parallel:

From the project:
- Roadmap entry for the target post (title, cluster, type, pillar flag, linking hints, status).
- `docs/blog/research/[cluster].md`.
- `src/config/stage-0-offer.ts`.
- All existing posts in the same cluster (`src/content/blog/*.md` filtered by cluster tag in roadmap).
- `docs/blog/templates/post-structure.md`.
- `docs/blog/research/reference-examples.md` for pillar posts (the 6 competitor references, used as positive structure + negative voice reference).

From `Hub/business/sops/copywriting/` (dynamic, these change over time):
- `core/anti-ai-detection.md`: 18-item structural red-flag checklist.
- `lang/nl/anti-ai-nl.md`: Dutch-specific AI tells.
- `lang/nl/find-replace-nl.md`: 50+ AI-Dutch to natural-Dutch patterns.
- `lang/nl/formality-nl.md`: je/jij rules, modal particles (even, toch, maar, gewoon).
- `voice/hovenier.md` (or the matching voice guide for the cluster audience).
- `feedback/FEEDBACK-LOG.md` (last 10 entries) to avoid repeating past mistakes.
- `feedback/golden-examples/` matching post type if one exists.

From the scaling plan (when cluster is hovenier):
- `Hub/business/knapgemaakt-scaling-plan.md` §3A for the hovenier topic list and strategic context.

### 4.3 Phase 2: Per-post SERP analysis (ephemeral, not saved)

Before drafting, Claude Code prompts Yanni to run a quick AI search on the post's primary keyword in ChatGPT or Claude.ai. Yanni pastes back the top 1 to 3 ranking articles: URLs plus content or a short summary.

Claude Code extracts, in session memory only:

- Structural patterns across the top 3 (sections they share, word counts, tables, FAQ presence, author boxes).
- What they cover well and where they have gaps.
- Named entities and stats they cite.
- Specific angle for knapgemaakt to beat them (counter-position, depth, humor, specificity).
- Signals that the drafting plan should shift.

This output stays in session memory only. No file saved. SERP data (PAA, featured snippets, AI Overview citations) shifts month to month; archiving it creates stale reference material. When the post is revisited during `/blog-refresh`, Yanni redoes the SERP check with current data.

The one-time `docs/blog/research/reference-examples.md` (the 6 competitor posts Yanni supplied on 2026-04-19) serves as the stable structural-pattern reference. Per-post SERP analysis is the tactical layer on top of that.

Adds approximately 10 to 15 minutes of search and paste per post. The quality gain is the signal on which exact articles are winning the query right now.

### 4.4 Phase 3: Draft generation

Claude produces a markdown file at `src/content/blog/[slug].md` matching the template for the post's tier (pillar 2000 to 3500 words, cluster 1200 to 1800 words). All frontmatter fields populated. Answer capsule under H1. Question-form H2s at 60% or more. FAQ section with 5 to 7 Q&A pairs sourced from the research file's FAQ candidates. `<FAQSchema/>` and `<Stage0CTABlock/>` imports included. 5 to 10 outgoing internal links (or 6 to 12 for pillar) embedded in prose. Author bio block at bottom.

For pillar posts only: Hidden costs section with 5 to 10 items (natural Dutch framing, no anxiety), ROI worked example, 3 to 5 comparison tables.

For cluster posts: 2 to 3 tables.

### 4.5 Phase 4: Self-check (automatic)

Claude Code runs the checks in order and flags failures for Phase 6 polish.

**Voice checks (from evolved `/blog` command):**
- No em-dashes or en-dashes anywhere.
- Varied sentence length (short 5-8 words mixed with long 20-35 words, no three consecutive similar-length sentences).
- 3 to 5 moments of personality spread across the post (never consecutive).
- No anxiety framing, no drama, no pushy CTAs.
- No "iedereen kent/heeft/weet" presumptions.
- No defensive meta-commentary ("laat me eerlijk zijn", "om duidelijk te zeggen").
- Natural Dutch word order (not translated English).

**SEO structural checks:**
- Title length 50 to 70 chars.
- Meta description 120 to 160 chars.
- Answer capsule present under H1, 40 to 60 words.
- H2-as-question ratio 60% or more.
- FAQ count 5 to 7.
- FAQ answer length 30 to 50 words each.
- Word count in the right tier range.
- Internal link count in range for tier.
- At least 3 named entities for cluster post, 5+ for pillar.

**Anti-AI structural checks (from `anti-ai-detection.md`):**
- 18-item red-flag checklist.
- Paragraph length variance (standard deviation >= 25 words across 6+ paragraphs).
- No schoolbook intro-body-conclusion rigidity where final paragraph merely restates opening.
- No transition over-signaling (<=50% paragraphs opening with "Furthermore/Additionally/Moreover/Daarnaast/Bovendien" at paragraph start).
- No participial-phrase tacking >20% of sentences.
- No hypophora abuse (rhetorical question immediately answered as transition).
- No three or more tricolons within 200 words.
- No inflated stakes language ("revolutioneren", "transformeren").

**Competitor-anti-pattern checks (from the 6 reference posts Yanni sent):**
- No "Belangrijkste punten om te onthouden" TL;DR openers.
- No "Rode vlaggen" anxiety listicles.
- No "Expert tip" sidebar callouts.
- No negation-elevation ("GEEN X, WEL Y", "Niet alleen X maar Y").
- No exclamation marks in headers or CTAs.
- No clichés: "goedkoop is duurkoop", "IKEA-kast vs maatwerk", "AI-knutselsite vs maatwerk", "visitekaartje" as a cliché-ed metaphor.
- No "het deel dat minder vaak wordt verteld", "wat niemand je vertelt", "de keerzijde" insider-reveal framing.

**Positive humor gate:**
- If the post has zero dry asides, one-word reactions, relatable comparisons, or moments of self-deprecation, fail. Humor is a positive gate, not just absence-of-anxiety.

### 4.6 Phase 5: Image prompt output

Claude Code reads `docs/blog/image-prompt.md`, injects the post title into the `[TITLE]` slot, and outputs the completed prompt as a copy-paste block along with the two reference image paths. Instructs: generate the image in Yanni's tool of choice (Claude.ai, ChatGPT, Midjourney, Nano Banana), save the 2048x1024 output to `src/assets/blog/[slug].webp`, confirm back in session.

### 4.7 Phase 6: Polish (Yanni)

Yanni reviews the draft, edits for voice, optionally adds a personal anecdote or opinion. Flagged issues from Phase 4 are addressed. Final save.

### 4.8 Phase 7: Publish

- Frontmatter validation (all required fields present).
- Cross-link pass: Claude Code identifies 2 to 3 related existing posts that should link to the new one, proposes exact edits, Yanni approves each.
- Commit with a conventional commit message (e.g., `feat(blog): add [post-title] to [cluster] cluster`).
- Push to master, Cloudflare auto-deploys in approximately 1 minute.
- Post-deploy actions:
  - Submit URL to Google Search Console (instruction to Yanni, URL pre-filled).
  - IndexNow ping to Bing endpoint with the new URL.
  - Update `docs/blog/roadmap.md`: status changes to published, publishDate is filled.

---

## 5. Monthly refresh (`/blog-refresh`)

### 5.1 Invocation

`/blog-refresh` with no arguments. Runs the monthly cycle. Cadence: first week of each month, paired with the 2-posts-per-month publish rhythm.

### 5.2 Phase 1: Selection

Claude Code reads `roadmap.md`, scores published posts on age (older posts prioritized), last-refresh date (never-refreshed prioritized), and cluster activity (new siblings published since last refresh). Presents 3 to 5 candidates and asks Yanni for GSC data (28-day position, impressions, clicks, CTR). Selects 3 posts based on:

- Stalled rankings (position drifting down over 90 days).
- High impressions + low CTR (title/meta issue).
- Aging posts with declining traffic.

### 5.3 Phase 2: Diagnosis per post

Claude Code reads each selected post plus GSC numbers plus the cluster research file and flags:

- Stale facts, prices, or dates (over 6 months old).
- Answer capsule missing (pre-template posts).
- H2s not in question form.
- Missing FAQ section.
- Missing `<FAQSchema/>` or `<Stage0CTABlock/>`.
- Broken internal links (sibling renamed or deleted).
- Sparse internal links (<5).
- Low CTR suggesting title or meta needs rewrite.
- Rank ceiling suggesting content depth issue (length, entities, link count).

### 5.4 Phase 3: Action plan per post

Claude Code proposes one of:

- **Update in-place**: fix title/meta, add capsule, add FAQ, refresh stats, add cross-links, re-sync Stage 0 CTA.
- **Consolidate**: merge into stronger sibling, add 301 redirect in `public/_redirects`, archive the consolidated URL in roadmap with reason.
- **Deprecate**: 301 redirect to a sibling, archive in roadmap with reason and date.
- **Leave**: healthy post, just bump last-refresh date in roadmap.

Yanni approves each action.

### 5.5 Phase 4: Execute

For updates: Claude edits, Yanni reviews, commit + push. For consolidation or deprecation: `public/_redirects` entry, archive note in roadmap, commit + push. For leave: bump roadmap only, commit.

Post-deploy: IndexNow ping for all changed URLs so Bing/ChatGPT re-crawl.

### 5.6 Phase 5: Ledger update

Roadmap entries get updated last-refresh date. Any status changes are written (published becomes consolidated becomes archived with reason and date).

---

## 6. Templates and components

### 6.1 `docs/blog/templates/post-structure.md`

Canonical post skeleton. Two sections: pillar (2000 to 3500 words) and cluster (1200 to 1800 words). Frontmatter fields specified, body layout specified per section 2 of this spec, constraints listed per tier. Reference implementation: `src/content/blog/website-laten-maken-kosten.md` after its retrofit in migration step 3.

### 6.2 `docs/blog/templates/research-prompt.md`

Base prompt body for Claude.ai. Variables `[CLUSTER_NAME]`, `[CLUSTER_AUDIENCE]`, `[TOPIC_LIST]`, `[ADJACENT_CLUSTERS]`, `[STAGE_0_CONFIG]`, `[EXISTING_POSTS]` injected by `/blog-research`. Asks Claude.ai for all sections listed in spec §3.3. Output: Dutch for customer-facing copy (capsules, FAQs, PAA answers), English for analysis headers, sources as footnotes, dated.

### 6.3 `docs/blog/image-prompt.md`

Yanni's standing prompt with `[TITLE]` slot. The original prompt had em-dashes that must be replaced with commas or periods per the absolute no-em-dash rule. Reference images are stored at `~/Downloads/Gemini_Generated_Image_remedoremedoreme.png` and `~/Downloads/myprofilepicture.jpeg`. Appended instruction: save output to `src/assets/blog/[slug].webp` at 2048x1024.

### 6.4 `src/components/cta/Stage0CTABlock.astro`

New component. Reads `src/config/stage-0-offer.ts`. When `enabled: true`: renders the Stage 0 callout ("Bouw ik nu een website voor jou, tijdelijk gratis?", `bedrijvenLabel()` dynamic spots count, CTA to `/aanvragen/`). When `enabled: false`: renders the Stage 1 closer ("€497 setup + €47/mo, 90 dagen garantie", CTA to `/aanvragen/`). Single source of truth: one config change flips all posts on the next build.

### 6.5 `src/components/seo/FAQSchema.astro`

Existing component, already used on `src/pages/veelgestelde-vragen.astro`. Reused per blog post from the `faqs` array defined in the post's frontmatter or body script block.

### 6.6 `docs/blog/research/reference-examples.md`

Saved copies of the 6 competitor posts Yanni supplied on 2026-04-19, annotated with:
- What they do well (structure, tables, hidden costs section, ROI math, author bio).
- What they do badly that knapgemaakt must not copy (Belangrijkste punten openers, rode vlaggen anxiety lists, Expert tip sidebars, clichés, exclamation marks).

Loaded by `/blog` when drafting pillar posts as both positive structure reference and negative voice reference.

---

## 7. Cross-linking and pillar ritual

### 7.1 Per-post rules

- **Incoming links:** at publish, 2 to 3 related existing posts get updated to link to the new post (accelerates indexing, topical authority signal).
- **Outgoing links:** 5 to 10 embedded in cluster-post drafts, 6 to 12 in pillar drafts. Targets: sibling cluster posts, the cluster pillar, `/webdesign/` service page.
- **Diminishing returns:** SEO research places diminishing returns past 44 internal links per page; 5 to 10 is the performance sweet spot.

### 7.2 Pillar ritual (per cluster)

As the hovenier cluster accumulates 12 posts over 6 months, the Month 1 commercial post ("Wat kost een hovenier-website in 2026?") and Month 1 authority post ("Hoveniers die boven in Google staan") become de facto pillars.

- Every cluster post gets a "Meer over dit onderwerp" section at or near the bottom that links to the pillar.
- The pillar keeps an updated table-of-contents block listing cluster siblings. `/blog` updates this at Phase 7 publish time whenever a new sibling is added.

---

## 8. Distribution (post-publish)

Distribution level A from brainstorm: basic push plus GSC plus IndexNow plus cross-link updates.

- Push to master, Cloudflare auto-deploys in approximately 1 minute.
- Submit URL to Google Search Console via the GSC UI (manual, instruction surfaced by Phase 7).
- IndexNow ping to the Bing endpoint:
  ```
  POST https://api.indexnow.org/indexnow
  Body: { "host": "knapgemaakt.nl", "key": "<indexnow-key>", "urlList": ["<new-url>"] }
  ```
  Key is stored in a new `public/<key>.txt` file served at `https://knapgemaakt.nl/<key>.txt`.
- Cross-link updates to 2 to 3 existing posts (handled at Phase 7 before commit).
- Roadmap ledger update with publishDate and published status.

LinkedIn, email newsletter, and outreach DM are out of scope for this machine iteration. Can be added later as a separate distribution command.

---

## 9. Roadmap file shape

`docs/blog/roadmap.md` is the single source of truth for what is queued, published, researched, and refreshed. Git-tracked; change history acts as a publication ledger.

```markdown
# Blog Roadmap + Ledger

Last updated: 2026-04-19
Cadence: 2 posts per month per scaling plan §3A.

## Clusters

### hovenier (active, Stage 0 primary)
Research: docs/blog/research/hovenier.md (status: needed)
Pillars: Post 1 (commercial), Post 2 (authority)
Source: scaling plan §3A

| # | Title | Slug | Tier | Status | Published | Type | Research | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | Wat kost een hovenier-website in 2026? | hovenier-website-kosten-2026 | pillar | queued | - | commercial | - | Month 1 Post 1 |
| 2 | Hoveniers die boven in Google staan: wat doen ze anders? | hoveniers-google-top | pillar | queued | - | authority | - | Month 1 Post 2 |
| 3 | Hovenier-website met of zonder WordPress? | hovenier-website-wordpress | cluster | queued | - | comparison | - | Month 2 Post 1 |
| 4 | Google Bedrijfsprofiel voor hoveniers: 7 meest gemiste velden | google-bedrijfsprofiel-hoveniers | cluster | queued | - | tactical | - | Month 2 Post 2 |
| 5 | Website voor hovenier: €500 of €5000, het eerlijke verschil | hovenier-website-500-of-5000 | cluster | queued | - | comparison | - | Month 3 Post 1 |
| 6 | Lokale SEO voor hoveniers in [regio] | lokale-seo-hoveniers | cluster | queued | - | tactical | - | Month 3 Post 2 |
| 7 | AVG-proof contactformulier voor hoveniers | avg-contactformulier-hoveniers | cluster | queued | - | tactical | - | Month 4 Post 1 |
| 8 | Reviews verzamelen als hovenier zonder gedoe | reviews-hovenier-zonder-gedoe | cluster | queued | - | tactical | - | Month 4 Post 2 |
| 9 | Offerte-systeem voor hoveniers: 4 aanpakken vergeleken | offerte-systeem-hoveniers | cluster | queued | - | comparison | - | Month 5 Post 1 |
| 10 | Hovenier-portfolio: 6 voor/na-voorbeelden | hovenier-portfolio-voor-na | cluster | queued | - | showcase | - | Month 5 Post 2 |
| 11 | Wat verdient een hovenier met een goede website meer per jaar? | hovenier-extra-omzet-website | cluster | queued | - | roi | - | Month 6 Post 1 |
| 12 | Lokale SEO voor hoveniers in [gemeente-variant] | lokale-seo-hoveniers-gemeente | cluster | queued | - | tactical | - | Month 6 Post 2 |

### wero (existing)
Research: docs/blog/research/wero.md (status: backfill needed)
Pillar: ideal-wordt-wero
Posts published: 7

| # | Title | Slug | Tier | Status | Published | Type | Research | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | iDEAL wordt Wero... | ideal-wordt-wero | pillar | published | 2026-01-XX | informational | - | Wero pillar |
(Fill in when building the roadmap file.)

### kosten (existing)
Research: docs/blog/research/kosten.md (status: backfill needed)
Pillar: website-laten-maken-kosten
Posts published: 2

(Fill in when building the roadmap file.)

### zzp (existing)
Research: docs/blog/research/zzp.md (status: backfill needed)
Pillar: website-voor-zzp
Posts published: 1

(Fill in when building the roadmap file.)

### wordpress-vs (existing)
Research: docs/blog/research/wordpress-vs.md (status: backfill needed)
Posts published: 1

(Fill in when building the roadmap file.)

## Backlog (deprioritized)

From the January 2026 `Hub/business/context/blog-content-strategy.md` doc: horeca, beauty, zorg, fitness, makelaardij, creatieve beroepen, integraties, vergelijkingen, conversie. Only reactivate after hovenier cluster graduates (per scaling plan §3A Month 6+).

## Archive

Deprecated or deleted posts listed here with reason and date.
```

The `Fill in when building` markers are acceptable in the spec because the migration plan (§11) explicitly handles populating the roadmap with the existing 11 posts in Step 1.

---

## 10. Anti-patterns enforced in self-check

Consolidated list, enforced in `/blog` Phase 4 and `/blog-refresh` Phase 2 diagnosis.

**AI structural tells** (from `anti-ai-detection.md`):
- Paragraph length uniformity (SD < 25 words across 6+ paragraphs).
- Sentence length uniformity (no sentences under 8 or over 30 words).
- Schoolbook structure (final paragraph restates opening).
- Transition over-signaling (>50% paragraphs open with formal transition).
- Three or more tricolons within 200 words.
- Hypophora abuse (question then immediate answer as structural transition).
- Negation-elevation ("GEEN X, WEL Y", "Niet alleen X maar Y").
- Participial-phrase tacking >20% of sentences.
- Inflated stakes ("revolutioneren", "transformeren" for ordinary products).

**Voice anti-patterns** (from `/blog` command):
- Em-dashes anywhere (absolute rule).
- Anxiety framing, drama, manufactured urgency.
- Pushy CTAs, exclamation marks, fake scarcity.
- Condescension, presumption ("iedereen kent/heeft/weet").
- Defensive meta-commentary ("laat me eerlijk zijn").
- AI vocabulary: "delve, robust, pivotal, crucial, leverage as verb, cutting-edge, innovative, transformative, comprehensive, seamless, streamline, myriad, plethora, tapestry".
- Opening formulas: "In today's...", "Furthermore/Additionally/Moreover" at sentence starts, "In conclusion".

**Competitor anti-patterns** (from reference-examples.md):
- "Belangrijkste punten om te onthouden" TL;DR openers.
- "Rode vlaggen" anxiety listicles.
- "Expert tip" sidebar callouts.
- Clichés: "goedkoop is duurkoop", "IKEA-kast vs maatwerk", "AI-knutselsite vs maatwerk", "visitekaartje" metaphor.
- Insider-reveal framing: "het deel dat minder vaak wordt verteld", "wat niemand je vertelt", "de keerzijde".

**Positive gates** (failure if absent):
- Humor and friendliness: 3 to 5 moments of personality per post, spread out (1 per 300 to 400 words for cluster, 1 per 500 to 700 words for pillar).
- Specificity: 3+ named entities for cluster post, 5+ for pillar.
- Evidence: at least one specific number, stat, or example for every major claim.

---

## 11. Migration plan

### Step 1: Infrastructure (one-shot session, approximately 2 hours)

Build the directory tree, commands, and component. Seed the roadmap with the 11 existing posts plus the 12 hovenier queue entries.

Creates or edits:
- `docs/blog/README.md`
- `docs/blog/roadmap.md` (populated with existing 11 + 12 queued)
- `docs/blog/image-prompt.md` (Yanni's prompt, em-dashes stripped)
- `docs/blog/templates/post-structure.md`
- `docs/blog/templates/research-prompt.md`
- `docs/blog/research/reference-examples.md` (6 competitor posts saved)
- `src/components/cta/Stage0CTABlock.astro` (new)
- `~/.claude/commands/blog.md` (evolved from existing)
- `~/.claude/commands/blog-refresh.md` (new)
- `~/.claude/commands/blog-research.md` (new)
- `public/<indexnow-key>.txt` (new, for IndexNow verification)

### Step 2: Stage 0 CTA drop-in (one-shot, approximately 30 minutes)

Replace the manual bottom CTAs in all 11 existing posts with `<Stage0CTABlock />`. Mechanical pass: remove existing closer, add component import, add component render.

### Step 3: Retrofit the 3 existing pillars (one-shot, approximately 3 to 4 hours)

Full template upgrade (answer capsule, question-form H2s, FAQ + FAQPage schema, author bio) for the three cluster pillars:
- `ideal-wordt-wero.md` (Wero pillar).
- `website-laten-maken-kosten.md` (Kosten pillar).
- `website-voor-zzp.md` (ZZP pillar).

Pillars rank-or-lose, so they earn the upfront effort. Other 8 posts retrofit emergently through Step 6.

### Step 4: Hovenier cluster research (first working session, approximately 1 hour)

Run `/blog-research hovenier`. Yanni pastes the prompt into Claude.ai, pastes output back. Saved to `docs/blog/research/hovenier.md`. Roadmap marks hovenier cluster as researched with date. Ready to draft Month 1 Post 1 and Post 2.

### Step 5: Remaining cluster research (one per month, over 4 months)

Run `/blog-research wero`, then `kosten`, then `zzp`, then `wordpress-vs`. One per month alongside the regular refresh cycle. Enables smarter refresh decisions as those clusters come up in the monthly audit.

### Step 6: Retrofit other 8 existing posts (emergent, via `/blog-refresh`)

No big-bang migration. When `/blog-refresh` selects a post for update, it gets the full template upgrade at the same time: answer capsule added, H2s converted to question form where natural, FAQ section added with FAQPage schema, Stage 0 CTA block dropped in if not already (Step 2 handles this). Natural prioritization through the refresh scoring.

### Step 7: Ongoing cadence (starts immediately after Step 4)

Month 1 (April to May 2026): "Wat kost een hovenier-website in 2026?" + "Hoveniers die boven in Google staan". Proceed through the scaling plan §3A 6-month list.

---

## 12. Success metrics

Tracked in roadmap.md monthly and reviewed during `/blog-refresh`.

- **Publish cadence:** 2 posts per month, on schedule.
- **Cluster coverage:** hovenier cluster reaches 12 posts by Month 6. 5 clusters researched by end of Month 5.
- **Rank trajectory:** GSC-reported position improving for cluster keywords quarter over quarter.
- **AI citation signal:** watch for ChatGPT mentions of knapgemaakt.nl for hovenier-related queries, trackable via brand search spikes and manual checks.
- **Zero anxiety regressions:** every refresh cycle, verify no anxiety framing has crept in through edits.

---

## 13. Open questions (deferred, not blocking)

- LinkedIn post distribution: deferred to a future `/blog-linkedin` command or manual process.
- Email newsletter: Yanni does not have one set up yet; revisit when he does.
- Programmatic `/hovenier-[stad]/` pages: per scaling plan §3A, these ship after the first hovenier case study is live, not as part of the blog machine.
- Outreach DM template tied to blog posts: out of scope.

---

## 14. Implementation handoff

After this spec is committed, Yanni reviews. Changes go back into this file. Once approved, transition to `superpowers:writing-plans` to produce a task-by-task implementation plan that covers Step 1 of the migration (infrastructure) first, then Steps 2 and 3 (Stage 0 CTA drop-in and pillar retrofit), as those are the one-shot items. Steps 4 through 7 are ongoing operations, not build work.
