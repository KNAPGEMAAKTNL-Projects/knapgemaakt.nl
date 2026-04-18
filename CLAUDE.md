# KNAP GEMAAKT. Project Guidelines

## Brand Name
Always write the brand name as **KNAP GEMAAKT.** (all caps, with period). Never use "Knapgemaakt" or "Knap Gemaakt".

---

## Tech Stack
- Framework: **Astro 5** (not 6 — pinned intentionally)
- Rendering: **SSR** via Cloudflare Workers (`output: 'server'`). This is intentional — the site uses a React island (interactive quiz) and server-rendered funnel tracking. Do NOT change to SSG.
- Adapter: `@astrojs/cloudflare` with `platformProxy.enabled: true`
- Styling: Tailwind CSS 4 (via `@tailwindcss/vite`, NOT `@astrojs/tailwind`)
- Islands: React 19 (`@astrojs/react`) for interactive components only — Astro components everywhere else
- Deployment: Cloudflare Workers (Wrangler)

## Design System
- Tokens live in `src/styles/global.css` under `@theme` — this is the single source of truth for colors and fonts
- The `design-system/knap-gemaakt/` folder holds extracted references
- Heading/body font: Inter Tight (with metric-adjusted fallback to Arial for CLS)

## Copy Language
Dutch (nl). All website copy is written in Dutch with `je`/`jij` (informal). See SOP copywriting reference files in `C:\Users\yanni\Hub\business\sops\copywriting\` when rewriting copy.

## Critical Rules

### URLs
- **Astro config has `trailingSlash: "always"`** — ALL internal links MUST end with a trailing slash. This is intentional and differs from the standard SOP default (`"never"`).
  - Correct: `/blog/wero-mollie-integratie/`, `/contact/`, `/portfolio/`
  - Wrong: `/blog/wero-mollie-integratie`, `/contact`, `/portfolio`
- Applies everywhere: blog posts, components, pages, frontmatter, sitemap, canonicals, redirects.

### Copy
- Never use "Versturen" as form button text — use "Stuur bericht", "Verstuur aanvraag" or similar concrete verbs.
- Never use aggressive sales language ("Wij zijn de #1…", "Neem vandaag nog contact op!").
- Never use "bel ons maar even" — use "bel gerust" or "neem even contact op".
- Never use hyphens in Dutch web copy — `hyphens: auto` produces ugly breaks. Use `overflow-wrap: break-word` instead.
- Plain Dutch only: readable by a 10-year-old, no marketing jargon, no vague claims.
- Never embarrass clients on case study pages; frame "before" as opportunity, not failure.
- "Papierwinkel" is not natural Dutch — use "rompslomp" or "papierwerk".

### Imagery
- Never use stock photos for team/project imagery.
- Never fabricate social proof (fake logos, unverifiable stats, generic testimonials).

### Layout (from `.claude/rules/design-fidelity.md` + SOP anti-patterns)
- NEVER add `max-w-*`, `mx-auto`, or container wrappers not in the original reference design.
- NEVER normalize padding/margin values across sections — varied rhythm is intentional.
- NEVER symmetrize asymmetric layouts (7/5, 8/4, 3/3/6 splits are deliberate).
- NEVER replace `grid` with `flex` or vice versa to "simplify".
- No uniform card heights in grids. No centered-everything layout.
- No gradient text. No glassmorphism / glow borders. No rounded corners > 8px.
- No identical card layouts repeated 3–4 times — vary layout per service/section.
- No `opacity: 0` on hero elements (LCP trap).

### Performance
- Keep React islands minimal. Prefer Astro components + vanilla JS for interactivity where possible.
- Do NOT add a fluid root font-size (`html { font-size: clamp(...) }`) — this site was tuned with a fixed 16px root and 18px body. The SOP's fluid-root rule caused visible zoom-in and was reverted 2026-04-17.

## Blog Writing
All blog writing guidelines are in the `/blog` skill. Use `/blog` to write or edit blog posts.

## Design Fidelity
Read `.claude/rules/design-fidelity.md` before making any visual changes — it overrides any instinct to "clean up" layouts.

## Impeccable Skills
Impeccable commands (`/audit`, `/critique`, `/polish`, `/normalize`, `/typeset`, etc.) are available. Run `/teach-impeccable` once to generate `.impeccable.md` with brand/design context — not done yet for this project.
