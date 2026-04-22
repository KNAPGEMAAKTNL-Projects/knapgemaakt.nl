# Inbound Staged Client Review — Design Spec

**Date:** 2026-04-22
**Author:** Yannick + Claude (brainstorm)
**Status:** Spec (pre-implementation)
**Scope:** Inbound project workflow only (client-initiated). Outbound cold-pitch workflow is a separate follow-up spec.

## Problem

The current 7-session SOP (S1 design direction → S7 post-launch) has zero formalised pre-launch client touchpoints. Every `HUMAN:` checkpoint is Yannick reviewing internally. The only client-facing touchpoints are:

- S2 Prompt 7 footer: *"Optionally send CONTENT/ to client for approval"* — optional, markdown-based, impractical for non-technical SMBs
- S7A handoff meeting — site is already live, way too late for structural feedback
- S7B5 `/copy-approve` — post-launch visual-context copy check, also too late for structural decisions

This means:
1. Client anxiety builds across 4–6 weeks with no reveals
2. No protection against scope creep (no revision cap, no deemed acceptance, no sign-off)
3. No protection against the two failure modes that kill small-agency profitability: silent anxious clients and piecemeal scope drip
4. No research-backed handover playbook (Loom + Pastel + countdown language + pre-scheduled call)

## Goals

1. Insert **five client-facing touchpoints** across S1–S6, each with a specific artifact, tool, deadline, and revision-round classification
2. Centralise all handoff mechanics in one reference file (`website-creation-handoff-playbook.md`) — sessions stay production-focused
3. Enforce scope via SOW clauses: 2 revision rounds + 2 approval gates + deemed acceptance + revision-vs-scope-change definition + sign-off-triggered payment + 30-day warranty
4. Preserve free-tier tooling where possible (Pastel free = 1 canvas per project)
5. Produce a brand book PDF at T1 that feels like a real deliverable, using the project's own `@theme` design tokens for visual consistency
6. All client-facing copy (emails, Loom scripts, scope scripts) drafted in English for Yannick to translate

## Non-goals

- Automating PandaDoc sign-off flow (manual template fill for now; automation is a future spec)
- Outbound cold-pitch workflow (separate follow-up spec — will reuse T1 artifact pattern)
- Replacing existing `/copy-approve` post-launch ritual (stays as-is, it's visual-context only)
- Changing the copywriting/voice-bible system (stays as-is)

## Tooling stack

| Tool | Role | Plan | Notes |
|---|---|---|---|
| **Loom** | Async walkthroughs at T1–T4 | Free tier acceptable | Assume Yannick already has it |
| **Pastel** | Click-and-type comments on staging | **Free (1 active canvas)** | Opened at T1, versioned through T4, archived after sign-off. One canvas per project. Upgrade to Pro ($35/mo) only if two projects overlap at the homepage-review phase. |
| **Google Docs** | Copy review at T2 | Free via Workspace | Master doc per project, created via `mcp__claude_ai_Google_Drive__create_file`. Parallel to existing `CONTENT/*.md` files (which stay for S3 build). |
| **PandaDoc** | Sign-off sheet at T5 | Free (60 sigs/year) | Template-based. Automation-friendly for future. |
| **Playwright** | Brand book PDF export at T1 | MCP already available | Print `brand-book.astro` with project's own `global.css`/`@theme` tokens. Visual fidelity matches the live site. |
| **Anthropic PDF skill (reportlab)** | Invoices, proposals, maintenance one-pagers (future) | Free | Not for the brand book — programmatic layout unfit for designer artifacts. Reserved for text-heavy programmatic PDFs later. |

## Touchpoint map

Five client-facing moments. Sessions S1–S7 stay production-focused; each touchpoint is a thin hook into the central handoff playbook.

| # | Moment | Hooks into | URL / Artifact | Tool | Deadline | Round type |
|---|---|---|---|---|---|---|
| **T1** | **Direction Reveal** — brand book PDF + homepage reference | After S1 Step 11 (new) | `{slug}.knapgemaakt.nl` v1 static | Loom + PDF + Pastel canvas (opens here) | 3 business days | Approval (1 direction-swap included) |
| **T2** | **Copy Approval** — all page copy | After S2 Prompt 8 (new) | Master Google Doc | Loom + Google Docs comments | 3 business days | Approval (1 copy-revision included) |
| **T3** | **Homepage v1** — built, live, interactive | After S3 Prompt 3b (new) | Same subdomain, v2 on Pastel canvas | Loom (5-beat) + Pastel + pre-scheduled 30-min call | 5 business days | **Revision round 1 of 2** |
| **T4** | **Full Site Review** — QA'd, pre-launch | After S5 Prompt 10 (new) | Same subdomain, v3 on Pastel canvas | Loom + Pastel | 5 business days | **Revision round 2 of 2** + countdown |
| **T5** | **Sign-off** | Between S5 and S6 P1 | PandaDoc sign-off sheet | PandaDoc + email | 10 business days deemed acceptance | Payment trigger + warranty start |

### Approvals vs revisions

- **T1 and T2 are approvals**, not revisions. Each includes one direction-swap / copy-revision cycle. Fundamental change of direction = scope change.
- **T3 and T4 are the two revision rounds** counted against the SOW.
- **Total client-facing feedback cycles:** 4 (2 approvals + 2 revisions). Generous by industry standard, cleaner to enforce than a flat 2-round count.

### Pastel canvas lifecycle

One canvas per project, opens at T1, persists through T4, archived at T5 sign-off:

- **T1:** new canvas on `{slug}.knapgemaakt.nl` (static homepage-reference-v1.html)
- **T3:** new version of same canvas (URL now serves Astro homepage build)
- **T4:** new version of same canvas (URL now serves full QA'd site)
- **T5:** canvas archived

Requires one Cloudflare Pages project at `{slug}.knapgemaakt.nl` created at T1 and upgraded (wired to GitHub repo) at S3 Prompt 2 so the Astro build replaces the static HTML at the same URL.

---

## T1 — Design Direction Reveal

### S1 production additions

| Step | What | Owner |
|---|---|---|
| **Step 1 add-on: Logo intake** | Does client have a logo? Collect source (SVG/AI > PNG). If none, the brand book's Logo section becomes a **typography wordmark** only (business name set in project's heading font, a few sizes). No upsell framing. | AI asks, HUMAN collects |
| **Step 7 (existing)** | Design tokens — unchanged; derive palette from logo colors where present | AI |
| **New Step 7b: Logo variants** | Only if logo exists. Generates `src/assets/brand/logo-{on-white,on-dark,monochrome,small}.svg` + clearspace notes. Skipped cleanly if no logo. | AI |
| **Step 10 (existing)** | DESIGN.md — unchanged | AI |
| **New Step 11: Brand Direction PDF** | AI writes `brand-book.astro` using project `global.css` + `@theme` tokens. HUMAN reviews rendered page at `localhost:4321/brand-book`. On HUMAN approval, AI runs Playwright headless print → `{slug}-brand-direction.pdf`. | AI generates, HUMAN gates |
| **New Step 12: Deploy T1 preview subdomain** | Create Cloudflare Pages project at `{slug}.knapgemaakt.nl`, direct-upload `homepage-reference-v1.html` + static assets. Noindex headers set. | AI |
| **T1 Trigger (new Step 13)** | HUMAN invokes handoff playbook §T1: open Pastel canvas on the preview URL, record Loom, send framing email | HUMAN |

### Brand book PDF contents

1. Cover — business name, logo, "Brand Direction v1", Yannick contact
2. Color palette — primary/accent/neutrals/semantic, HEX + oklch + usage notes
3. Typography — heading + body font, scale examples H1–H4 + body + small, pairing rationale
4. Logo variants — on white, on dark, monochrome, small-size, clearspace (or typography wordmark if no logo)
5. Layout principles — section rhythm, grid, spacing scale
6. Interaction vocabulary — scroll behavior, hover pattern, signature interaction, in plain terms
7. Visual craft — decorative elements used (blobs, shapes, accent lines)
8. Anti-patterns — "what we explicitly won't do" (from DESIGN.md §15)
9. Homepage preview — 2–3 screenshots of homepage-reference with context
10. Next steps — link to live preview, Pastel link, 3-business-day deadline, focus-vs-not-yet

### T1 client-facing package

1. `{slug}-brand-direction.pdf` attached
2. `{slug}.knapgemaakt.nl` with Pastel canvas attached
3. Loom walkthrough (5–8 min)

### T1 framing email (English draft — translate)

```
Subject: [Business name] — first design direction

Hi [Name],

The first design direction for [business name] is ready. Three things
to go through:

🎥 Loom (6 min): [link]
📄 PDF with colors, typography, and logo: attached
🖥️ Live preview: {slug}.knapgemaakt.nl

Watch the Loom first. I explain why I made certain choices, and how to
use the live preview to leave comments. You click on an element and
type your reaction. No account needed.

What I want feedback on:
• Do the colors and typography fit your business?
• Does the mood feel right?

What you don't need to worry about yet:
• The text. We write that next week.
• Photos. Coming later.
• Inner pages. We build those after you sign off on this.

Let it sit for a day or two before you respond. That works better than
reacting immediately. Ideally I'd hear back by {date, 3 business days
out}. If that doesn't work, just say so.

— Yannick
```

### T1 Loom beats

| Beat | Time | What to say |
|---|---|---|
| 1. Restate goal | 0:00–0:30 | "The brief was: {concrete goal}. Everything is built around that." |
| 2. Recap constraints | 0:30–1:30 | "Your competitors all use {X}. I deliberately chose {Y} so you stand out but still feel professional. Your audience is mostly on mobile, so the typography is tuned for that." |
| 3. Walk homepage top-to-bottom, outcome language | 1:30–6:00 | Per section: WHY this choice, tied to the brief. No design jargon. |
| 4. Two focus areas + three "not yet" items | 6:00–7:00 | "I want feedback on (1) palette and typography, (2) overall mood. Not yet on (1) text, (2) photos, (3) inner pages." |
| 5. Deadline + one channel | 7:00–8:00 | "Take a day or two. Leave visual comments on the live preview. WhatsApp only if urgent. Deadline: {date}." |

### T1 revision mechanics

- 1 direction-swap cycle included (e.g., palette warmer, typography different pairing). One iteration.
- Fundamental change of direction = scope change, written change order required.
- Deemed acceptance at 10 business days of silence.

### T1 scope / objection scripts (English)

- **Nitpicker:** "I hear that you'd like {X} different. We can do that. It does mean {concrete trade-off}. Is that trade-off what you want?"
- **Rubber-stamper:** "I'd love for you to be excited about this. What would help you feel more excited? And who else needs to see this before we move on?"
- **Direction-swap (in scope):** "Got it — I'll swap {X} to {Y} and resend the brand direction. Same deadline still works for the re-review."
- **Direction-swap (scope change):** "What you're describing is a different direction, not a tweak. That sits outside what we agreed. Let me write up a quick change order with the new scope and cost so you can decide whether to go there. No work until you sign that off."
- **Piecemeal feedback:** "Perfect — I'll hold all of these and action them together once you've completed the review by {deadline}. That keeps us on schedule."
- **Deemed-acceptance chase at day +5:** "Quick nudge on the design direction — we're at the deadline. Anything keeping you from reviewing? Happy to jump on a 15-min call if easier."
- **Deemed-acceptance notice at day +10:** "Haven't heard back, so per our agreement I'm treating the design direction as approved and moving on to copywriting. Let me know right away if that's wrong."

---

## T2 — Copy Approval

### S2 production additions

| Step | What | Owner |
|---|---|---|
| **New Prompt 8: Client Copy Review Doc** | AI uses `mcp__claude_ai_Google_Drive__create_file` to generate a master Google Doc `{Business name} — Copy Review`. Contains: (1) how-to-use note, (2) ToC with anchor links, (3) section per page rendered as formatted text from `CONTENT/*.md`, (4) footer with deadline and reply instructions. | AI generates, HUMAN reviews |
| **T2 Trigger** | Share Doc with comment access, send framing email + Loom | HUMAN |

### T2 client-facing package

1. Google Doc link (comment access, not edit)
2. Loom (3–4 min)

### T2 framing email (English draft — translate)

```
Subject: [Business name] — copy ready for review

Hi [Name],

The copy for your full website is ready. This is the text that will
go on every page — homepage, services, about, contact, FAQ, and the
legal pages.

🎥 Loom (3 min): [link]
📄 Google Doc: [link]

Watch the Loom first. I walk through a couple of the choices I made
(why this headline, why this tone) and show you how to leave comments
in Google Docs — just highlight a sentence and click the comment
icon. Please don't edit the doc directly, only comment.

What I want feedback on:
• Are all the facts correct? (Services, prices, KvK, opening hours,
  anything specific about your business.)
• Does it sound like you? If a sentence feels off, leave a comment.

What you don't need to worry about:
• How it will look on the page — we build that in Week 3.
• Small word-level edits that don't change meaning. I handle those.

Three business days for review. Ideally I'd hear back by {date}. When
you're happy, just reply "akkoord" to this email.

— Yannick
```

### T2 Loom beats (3–4 min)

| Beat | Time | What to say |
|---|---|---|
| 1. Show how to comment | 0:00–0:30 | Screenshare, highlight sentence, click comment icon, type reaction. "Use comments, not direct edits." |
| 2. Tour hero + about-opener | 0:30–2:30 | Explain two voice choices: *"I wrote this hero because you said X in our intake — the rhythm echoes how you talked about your work."* |
| 3. Focus areas + not-yet items | 2:30–3:00 | "Facts correct, does it sound like you. Not needed: small tweaks I handle, legal pages unless factually wrong." |
| 4. Deadline | 3:00–3:30 | "Three business days. Reply 'akkoord' when happy, or comment in Doc by {date}." |

### T2 revision mechanics

- One copy-revision cycle included (client comments → you resolve → updated Doc).
- Wholesale rewrite of tone = scope change.
- **Push-back for taste-based comments that weaken copy:**
  > "I wrote it this way because {concrete reason tied to brief/voice}. Changing it to {their version} would {concrete consequence}. Happy to change if you want, but I'd recommend keeping it. Your call."

### T2 closing the loop

When client replies "akkoord" (or deemed-accepted at day +10):

1. AI reads final Doc via `mcp__claude_ai_Google_Drive__download_file_content`
2. AI diffs against `CONTENT/*.md`
3. Apply accepted changes to each `CONTENT/{page}.md`
4. Run `/copy-approve` on voice-compliant changes (save as golden examples)
5. Commit: `feat: apply client copy revisions from T2 review`
6. Session 3 build proceeds with locked copy

### T2 failure-mode guardrails

- **Direct edits in Doc:** revert via version history, redirect: *"I noticed some direct edits — please use comments instead so we keep a clean trail. I've reverted those, add them as comments."*
- **Stakeholder proliferation:** *"To keep this manageable, let's funnel everything through you as the decision-maker. Happy to get a list from others, but final decisions need to come from one place."*
- **Piecemeal comments:** same "I'll action these together by {deadline}" response as T1.

---

## T3 — Homepage v1 Reveal

### S3 production additions

| Step | What | Owner |
|---|---|---|
| **S3 Prompt 3 (existing)** | Build homepage as Astro. HUMAN reviews internally. | AI + HUMAN |
| **New Prompt 3b: Deploy homepage to preview subdomain** | Astro build replaces static HTML at `{slug}.knapgemaakt.nl`. Cloudflare Pages project (created at T1) now wired to GitHub repo — push to `main` deploys. Noindex headers stay. Other routes either 404 or show minimal "binnenpagina's volgen" placeholder. Smoke test: homepage loads, Lighthouse mobile ≥70, no console errors. | AI |
| **T3 Trigger** | Record Loom, update Pastel canvas (new version), pre-schedule 48–72h feedback call, send framing email with calendar invite | HUMAN |
| **S3 Prompt 4 (existing)** | **GATED** — blocked until T3 approved. | AI + HUMAN |

### T3 client-facing package

1. Loom (5–8 min, full 5-beat script)
2. Live homepage at `{slug}.knapgemaakt.nl` with Pastel canvas (new version)
3. **Pre-scheduled 30-min call** 48–72h out — calendar invite sent with the email

### T3 framing email (English draft — translate)

```
Subject: [Business name] — homepage v1 is live

Hi [Name],

Your homepage is built and running. This is the first time you see
the real thing in a browser — not a static reference, the actual site.

🎥 Loom (7 min): [link]
🖥️ Live homepage: {slug}.knapgemaakt.nl

Watch the Loom first. I walk you through what I built and why, top to
bottom. You already know how to leave comments on the live page from
our design review — same Pastel canvas, new version.

What I want feedback on:
• How it feels when you scroll — does it flow, is anything missing?
• Anything factually wrong (services, contact info, claims).

What you don't need to worry about yet:
• Inner pages (services, about, contact). I build those next, after
  you sign off on this homepage.
• Small animation tweaks and polish. That's a later pass.
• Mobile performance metrics. We optimize those in Week 4.

I've put a 30-minute call in your calendar for {date+2 business days}
so we can talk through any feedback together. Take 48 hours before
reacting — leave comments as they come up, but don't feel pressured
to decide right away. Written feedback by {date+5 business days}.

Important: this is revision round 1 of 2 in your package. Most
homepages are approved after round 1. Round 2 covers inner pages and
final polish.

— Yannick
```

### T3 Loom beats (5–8 min, 5-beat)

| Beat | Time | What to say |
|---|---|---|
| 1. Restate goal | 0:00–0:30 | "The brief was: {concrete goal}. Every section below ladders up to that." |
| 2. Recap constraints | 0:30–1:30 | "You told me {X} in intake. That's why the hero is {Y}. Most traffic is mobile, so {Z}." |
| 3. Walk homepage top-to-bottom | 1:30–6:00 | Per section: WHY, tied to brief. *"Service cards are in this order because you said {X} is your biggest revenue driver."* |
| 4. Two focus areas + three not-yet items | 6:00–7:00 | "Feedback on (1) flow when scrolling, (2) factually wrong things. Not yet: (1) inner pages, (2) animation polish, (3) mobile speed." |
| 5. Deadline + call + channel | 7:00–8:00 | "Take 48h. Drop comments on Pastel. 30-min call booked for {day}. Written by {deadline}." |

**Never end Loom with "so what do you think?"** End with logistics.

### T3 revision mechanics (Round 1 of 2)

- Client returns consolidated Pastel comments by deadline
- Deliver Round 1 revisions within 2–3 business days
- On delivery: "These changes are in. Next, I start on the inner pages. Your remaining revision round (Round 2) covers the full site."
- Fundamental hero-concept change after approved T1 direction = scope change

### T3 scope / objection scripts (English)

- **Rubber-stamper:** "I'd love for you to be excited about this. What would help you feel more excited? If you had to change one thing, what would it be? And who else needs to see this before I build the inner pages?"
- **Nitpicker with taste:** "We can change that. Here's what it would look like: [mockup]. It does mean sacrificing {concrete trade-off}. Is that trade-off worth it to you?"
- **Taste vs audience reframe:** "Let's park your personal taste for a second. How might your customers react to {X}? That's what we're optimizing for."
- **Scope-creep new section:** "Interesting idea. That sits outside our agreed scope. Is this must-have for launch, or later iteration? If must-have, I'll write up a change order."
- **Client skips the call:** "The call makes a big difference — easier to discuss trade-offs live. 30 minutes. If you really can't, we switch to written feedback only."

### Why the pre-scheduled call matters

Research-backed: scheduling 48–72h out BEFORE sending v1 dramatically improves written-comment quality because clients know they'll discuss it. They take it more seriously, think longer, involve stakeholders before the call. Calendar invite goes in the same email as the Loom.

---

## T4 — Full Site Pre-Launch Review

### S5 production additions

| Step | What | Owner |
|---|---|---|
| **S5 Prompt 9 (existing)** | QA verdict. READY FOR LAUNCH required to proceed. | AI + HUMAN |
| **New Prompt 10: Final deploy to preview subdomain** | Full QA'd site pushed to `{slug}.knapgemaakt.nl`. Noindex headers stay (domain stays hidden until S6). Final smoke test. | AI |
| **T4 Trigger** | Record Loom, update Pastel canvas (new version), send framing email. No pre-scheduled call — written feedback + optional 15-min call on request. | HUMAN |
| **S6 Prompt 1 (existing)** | **GATED** — blocked until T4 approved AND T5 sign-off returned. | HUMAN |

### T4 client-facing package

1. Loom (4–5 min — shorter than T3)
2. Live full site at `{slug}.knapgemaakt.nl`, same Pastel canvas, new version

### T4 framing email (English draft — translate)

```
Subject: [Business name] — full site ready for final review

Hi [Name],

Your full site is built, tested, and running on the preview domain.
This is the last review before we launch on your real domain.

🎥 Loom (4 min): [link]
🖥️ Live full site: {slug}.knapgemaakt.nl

I walk through the inner pages in the Loom — services, about, contact,
FAQ. The homepage you've already seen, so I skip that.

What I want feedback on:
• Anything factually wrong on any page (services, prices, contact
  info, hours, KvK numbers).
• Any copy that reads differently in context than it did in the
  Google Doc review.
• Any broken-feeling interactions (clicking, scrolling, forms).

What you don't need to worry about:
• Mobile page-speed numbers. Already optimized, we verified with
  Lighthouse.
• SEO technical stuff (schema, meta tags). That's under the hood and
  correct.

Important: this is revision round 2 of 2, your last included round.
Most sites only need small fixes at this stage. If something big
comes up that changes scope, I'll let you know and we discuss
separately.

Five business days for review. Ideally I'd hear back by {date}. If
you want to walk through anything live, WhatsApp me for a quick
15-min call. When you're happy, I'll send a one-page sign-off sheet.

— Yannick
```

### T4 Loom beats (4–5 min)

| Beat | Time | What to say |
|---|---|---|
| 1. Skip preamble | 0:00–0:20 | "Quick tour of the inner pages. Homepage you've seen." |
| 2. Services overview + one service detail | 0:20–1:30 | Structure, cross-links, FAQ placement, related-services block. |
| 3. About page | 1:30–2:30 | "Your story, photo, credentials. Check facts, hours, KvK." |
| 4. Contact + forms | 2:30–3:30 | Form structure. "Real spam protection goes live with domain switch." |
| 5. Countdown + deadline | 3:30–4:30 | "Round 2 of 2. Most sites pass with small fixes. If scope-changing, I'll flag it. Written by {deadline}." |

### T4 revision mechanics (Round 2 of 2)

- This is the **final included** revision round
- Deliver revisions within 2 business days
- After Round 2 revisions → send T5 sign-off sheet
- If client wants Round 3:
  - Option A: paid additional round at €150 flat / €95 hourly *(pricing defaults — confirm with Yannick before adding to SOW)*
  - Option B: sign off now + **residual to-do list** — minor fixes Yannick commits to handling in the first week post-launch, documented on the sign-off sheet. Distinct from warranty work: residual list is courtesy close-out, warranty covers reproducible bugs. Clarify this in the email if it comes up.
- Countdown script (with Round 2 delivery):
  > "These fixes are in. Per your package this is the last included revision round. If there's more to do, we have two options: (1) add a paid round to polish further before launch, or (2) sign off now and I handle any minor non-bug items in the first week after launch as a residual list. Most clients pick option 2. Your call."

---

## T5 — Sign-off + Payment + Warranty Start

### T5 mechanics

Triggered when client approves T4 revisions OR approves as-is with residual list.

| Step | What | Owner |
|---|---|---|
| **PandaDoc template fill** | Open `knapgemaakt-signoff-template`. Fill: business name, project name, deliverables (auto from `CONTENT/sitemap.md`), final preview URL, sign-off date, final payment amount, 7-day payment term, warranty start date = sign-off date. | HUMAN manually; automation later |
| **Send for signature** | PandaDoc emails client the doc. Track status. | PandaDoc |
| **Client signs** | Triggers: final invoice (7-day term), 30-day warranty start, S6 launch green-lit. | PandaDoc + HUMAN |
| **Deemed acceptance** | Silent client: gentle chase at day +5, formal notice at day +10. Work continues per SOW clause. | HUMAN |

### T5 framing email (English draft — translate)

```
Subject: [Business name] — sign-off & final step

Hi [Name],

Glad you're happy with the site. One last step before we go live.

📄 Sign-off sheet: [PandaDoc link]

The sheet is one page. It lists what's been delivered, links to the
final preview, and your signature releases the final payment plus
starts the 30-day warranty.

After you sign:
• Final invoice sent (7-day payment term)
• I coordinate with you on the DNS switch to your real domain
• 30-day warranty starts — I fix any reproducible bugs in the site
  at no cost during that window

If anything on the sheet looks wrong, reply first and I'll fix.

— Yannick
```

### Sign-off sheet contents (one page)

1. **Project name + date** — e.g., "KNAP GEMAAKT. × {Business name} — Website Project, {date}"
2. **Deliverable list** — auto-populated: homepage, N service pages, about, contact, FAQ, legal, location pages (if any), schema/SEO, hosting setup, launch
3. **Final preview link** — `{slug}.knapgemaakt.nl` at the exact version signed off
4. **Residual to-do list** (if any) — minor fixes accepted for warranty window
5. **Declaration of acceptance** — *"Ondergetekende verklaart dat de bovengenoemde deliverables zijn opgeleverd en geaccepteerd."*
6. **Payment trigger** — *"Deze sign-off geeft de laatste factuur vrij. Betalingstermijn: 7 dagen."*
7. **Warranty** — *"De 30-daagse garantieperiode start op de handtekeningdatum. Gedekt: reproduceerbare bugs in door KNAP GEMAAKT. geleverde code. Niet gedekt: wijzigingen door derden, externe plugins, nieuwe features."*
8. **Signature field** + date

---

## SOW clauses — the teeth

All touchpoint mechanics collapse without these in the signed proposal. The playbook file includes them as ready-to-paste text.

**Clause 1 — Revisions included**
> *Included: 2 consolidated revision rounds during the design-and-build phase. A "revision round" is a single consolidated set of written feedback submitted via the agreed feedback channel (Pastel). Piecemeal feedback across multiple messages counts as one round. Additional revision rounds: €150 flat per round, or €95 per hour.*

**Clause 2 — Approval gates (not counted as revisions)**
> *Included in addition to the two revision rounds: one design direction approval and one copy approval. Each approval allows one direction-swap cycle at no additional cost. Fundamentally different direction or rewrite constitutes a scope change.*

**Clause 3 — Revision vs scope change**
> *A revision is an adjustment within an existing agreed direction. A scope change introduces a new deliverable, a new page, or a fundamentally different direction. Scope changes require a written change order and revised estimate, signed before work continues.*

**Clause 4 — Deemed acceptance**
> *Deliverables are deemed accepted if Client does not provide specific written objections within 10 business days of delivery. This protects the schedule when communication stalls.*

**Clause 5 — Final payment**
> *Final payment is released on signed sign-off sheet, not at launch. Payment term: 7 days post-sign-off.*

**Clause 6 — Warranty**
> *30 days from sign-off. Covers: reproducible bugs in code delivered by KNAP GEMAAKT. Excludes: client-altered code, third-party plugin issues, new features, content changes, hosting/DNS issues not caused by the delivered code.*

**Clause 7 — Single point of contact**
> *Client designates one person with final decision authority. All feedback is consolidated through this person. Stakeholders contacting KNAP GEMAAKT. directly will be redirected to the designated contact.*

---

## Handoff playbook file structure

New file: `C:\Users\yanni\Hub\business\sops\website-creation-handoff-playbook.md`

```
# Website Creation — Client Handoff Playbook

## Overview
  - When this playbook is invoked
  - Tool stack (Loom, Pastel, Google Docs, PandaDoc)
  - Two revision rounds + two approvals model

## §T1 — Design Direction Reveal
  - Artifact specs (brand book PDF + homepage-reference on subdomain)
  - Loom script (5-beat, English)
  - Email template (English)
  - Pastel canvas mechanics
  - Deadline: 3 business days
  - Scope scripts
  - Deemed acceptance

## §T2 — Copy Approval
  - Artifact (master Google Doc)
  - Loom script (3-4 min)
  - Email template
  - Revision cycle
  - Closing the loop (Doc → CONTENT/*.md)

## §T3 — Homepage v1 Reveal
  - Artifact (Astro homepage on subdomain)
  - Loom script (5-beat, 5-8 min)
  - Pre-scheduled call logistics
  - Email template
  - Round 1 of 2 mechanics
  - Scope scripts for built-homepage reveals

## §T4 — Full Site Pre-Launch Review
  - Artifact (full QA'd site)
  - Loom script (4-5 min)
  - Email template
  - Round 2 of 2 + countdown
  - Residual to-do list mechanics

## §T5 — Sign-off + Payment + Warranty
  - PandaDoc template structure
  - Email template
  - Payment + warranty mechanics
  - Deemed acceptance chase sequence

## §SOW — Proposal Clauses
  - 7 clauses ready to paste

## §Failure-mode scripts (cross-cutting)
  - Rubber-stamper
  - Nitpicker
  - Piecemeal feedback
  - Stakeholder proliferation
  - Missed deadline / silent client
  - Taste-based feedback that would weaken the design

## §Deadline & date math
  - Working-day calculator notes (NL public holidays)
  - Standard deadlines per touchpoint (T1: 3, T2: 3, T3: 5, T4: 5, T5: 10)
```

Plus thin hook prompts inserted into existing sessions:
- **S1** new Step 11 (brand book PDF) + Step 12 (deploy preview) + Step 13 ("invoke §T1")
- **S2** new Prompt 8 (generate Google Doc) + "invoke §T2"
- **S3** new Prompt 3b (deploy homepage) + "invoke §T3"; Prompt 4 gated until T3 approved
- **S5** new Prompt 10 (final deploy) + "invoke §T4"
- **S6** new Prompt 0 (verify T5 sign-off) + gate Prompt 1 accordingly

## Open questions deferred

- **Pricing numbers** (€150 flat per additional round, €95/hour, €150 residual list, 7-day payment term) — these are sensible defaults I invented based on research (€100–€500 per round range, Kim Hobson's €200/hr argument tempered for Dutch SMB market). **Yannick to confirm before these go into any SOW template.**
- **PandaDoc automation** (template auto-fill via API) — future spec once manual volume justifies it
- **Dutch translations** of all English templates — Yannick owns this, not Claude
- **Outbound cold-pitch workflow** — separate follow-up spec, will reuse T1 artifact pattern
- **Cloudflare Pages project upgrade mechanics** (T1 direct-upload → GitHub-wired at S3 Prompt 2) — implementation detail for the build plan, not the design spec
- **Working-day calculator** — NL public holidays list needs to live somewhere the playbook can reference; could be a simple static table in the playbook itself or a utility function called by session prompts

## Why this is the right design

1. **Research-backed**: Loom + Pastel + staged reveals + 2-round cap + pre-scheduled call + deemed acceptance are all industry-standard agency moves the research converged on
2. **Solo-agency bandwidth-aware**: one Pastel canvas per project, one doc per project, reuses the same subdomain URL throughout — no tool sprawl
3. **Free-tier friendly**: Pastel free, PandaDoc free, Google Docs free — only cost is Playwright (already in stack)
4. **Matches Yannick's voice**: all client-facing copy drafted in English for him to translate; no Dutch mimicry
5. **SOW-enforceable**: the 7 clauses give every touchpoint legal teeth
6. **Outbound-friendly**: T1 artifact pattern (static homepage-reference on subdomain + Pastel canvas) is structurally identical to the future cold-pitch deliverable
