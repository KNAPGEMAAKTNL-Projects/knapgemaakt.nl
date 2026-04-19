# Blog Machine Files

This directory holds the topic queue, templates, and research artifacts used by the three blog slash commands. See `docs/superpowers/specs/2026-04-19-blog-machine-design.md` for the full design.

## Files

- `roadmap.md`: Topic queue + publication ledger. Edit manually when planning clusters; automatically updated by `/blog` (publish date + status) and `/blog-refresh` (last-refresh date + status changes).
- `image-prompt.md`: Standing image-generation prompt with `[TITLE]` slot. Used by `/blog` Phase 5 to produce a per-post prompt.
- `templates/post-structure.md`: Canonical post skeleton for pillar (2000-3500 words) and cluster (1200-1800 words) tiers. Loaded by `/blog` during drafting.
- `templates/research-prompt.md`: Base prompt that `/blog-research` customizes per cluster before handing to Claude.ai.
- `research/<cluster>.md`: Long-term cluster research (keyword map, named entities, internal linking plan). One file per cluster. Refreshed roughly annually or on trigger events.
- `research/reference-examples.md`: Stable structural-pattern reference from 6 competitor posts collected on 2026-04-19.

## Commands

Commands live in `~/.claude/commands/` on the operator's machine, not in this repo.

- `/blog [slug-or-title]`: Draft + publish a new post, or `/blog edit <path>` to improve an existing post.
- `/blog-refresh`: Monthly audit, selects 3 stalled or aging posts and proposes updates.
- `/blog-research <cluster>`: Generates a deep-research prompt for a new or revisited cluster.

## Source of truth

- Roadmap is git-tracked; its history acts as the publication ledger.
- Cluster research files are long-term context (revisit yearly); per-post SERP analysis is ephemeral and not saved.
- The Stage 0 CTA at the bottom of every blog post is driven by `src/config/stage-0-offer.ts` via the shared `Stage0CTABlock` component in the blog layout.
