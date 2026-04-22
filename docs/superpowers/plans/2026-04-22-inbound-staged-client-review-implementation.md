# Inbound Staged Client Review — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the five-touchpoint staged client review workflow (T1 Direction, T2 Copy, T3 Homepage v1, T4 Full Site, T5 Sign-off) into the existing 7-session KNAP GEMAAKT. SOP, backed by a new central handoff playbook file.

**Architecture:** One new reference file (`website-creation-handoff-playbook.md` in Hub) owns all client-facing mechanics — Loom scripts, email templates, Pastel canvas lifecycle, scope scripts, SOW clauses, deadlines, NL working-day math. Five existing session SOPs (S1, S2, S3, S5, S6) get thin hook prompts that invoke specific playbook sections at the right moment. No code changes — this is SOP editing only, except for one `brand-book.astro` template pattern documented in the playbook that session prompts will follow.

**Tech Stack:** Markdown (SOP files), the tooling stack locked in the spec (Loom, Pastel free, Google Docs via Claude MCP, PandaDoc free, Playwright MCP for brand book PDF).

**Source of truth:** `docs/superpowers/specs/2026-04-22-inbound-staged-client-review-design.md` — plan tasks reference this spec for content to copy into the playbook.

**Important note:** Per user feedback memory, all client-facing Dutch copy drafts are written in ENGLISH in the playbook. Yannick translates to Dutch himself. Do not attempt Dutch translations when filling sections.

---

## File Structure

### New files

- `C:\Users\yanni\Hub\business\sops\website-creation-handoff-playbook.md` — central reference for all 5 client touchpoints

### Modified files

- `C:\Users\yanni\Hub\business\sops\website-creation-session1-design-direction-v3.md` — add Steps 11 (brand book PDF), 12 (preview subdomain deploy), 13 (T1 trigger)
- `C:\Users\yanni\Hub\business\sops\website-creation-session2-copywriting-v3.md` — add Prompt 8 (generate Google Doc + T2 trigger)
- `C:\Users\yanni\Hub\business\sops\website-creation-session3-build-v2.md` — add Prompt 3b (deploy homepage + T3 trigger), gate Prompt 4 behind T3 approval
- `C:\Users\yanni\Hub\business\sops\website-creation-session5-qa.md` — add Prompt 10 (final deploy + T4 trigger)
- `C:\Users\yanni\Hub\business\sops\website-creation-session6-launch.md` — add Prompt 0 (verify T5 sign-off received)

### Manual / out-of-plan tasks (HUMAN only)

- Create `knapgemaakt-signoff-template` in PandaDoc web UI with the 8 blocks documented in playbook §T5
- Translate English templates to Dutch inside the playbook when Yannick is ready
- Maintain NL public-holidays table in playbook §Deadline-math as years pass

---

## Phase A — Build the handoff playbook

### Task 1: Create playbook skeleton

**Files:**
- Create: `C:\Users\yanni\Hub\business\sops\website-creation-handoff-playbook.md`

- [ ] **Step 1: Verify the file does not yet exist**

Run: `ls C:\Users\yanni\Hub\business\sops\website-creation-handoff-playbook.md 2>/dev/null && echo "EXISTS" || echo "OK, not yet"`
Expected: `OK, not yet`

- [ ] **Step 2: Create file with full section skeleton**

Write the following content to the file:

````markdown
# Website Creation — Client Handoff Playbook

> **Purpose:** Owns all client-facing mechanics across the 7-session website SOP. Session files invoke specific sections of this playbook at five defined touchpoints (T1–T5). Keeping handoff logic here (not scattered across session files) means templates, scripts, and deadlines live in one place.
>
> **Companion spec:** `docs/superpowers/specs/2026-04-22-inbound-staged-client-review-design.md`
>
> **Translation note:** All client-facing copy in this playbook is drafted in ENGLISH. Yannick translates to Dutch before sending. Do not auto-translate — voice fidelity matters more than speed.

## Overview

### The five touchpoints

| # | Moment | Hooks into | URL / Artifact | Deadline | Round type |
|---|---|---|---|---|---|
| **T1** | Direction Reveal | After S1 Step 13 | `{slug}.knapgemaakt.nl` v1 static + brand book PDF | 3 business days | Approval (1 direction-swap included) |
| **T2** | Copy Approval | After S2 Prompt 8 | Master Google Doc | 3 business days | Approval (1 copy-revision included) |
| **T3** | Homepage v1 | After S3 Prompt 3b | Same subdomain, Astro homepage | 5 business days | Revision round 1 of 2 |
| **T4** | Full Site Review | After S5 Prompt 10 | Same subdomain, full QA'd site | 5 business days | Revision round 2 of 2 + countdown |
| **T5** | Sign-off | Between S5 and S6 P1 | PandaDoc | 10 business days deemed acceptance | Payment trigger + warranty start |

### Approvals vs revisions model

- T1 and T2 are APPROVALS. Each allows one direction-swap / copy-revision. Fundamentally different direction = scope change.
- T3 and T4 are the two REVISION ROUNDS counted against the SOW.
- No charging for additional revisions — the 2-round cap is structural discipline, not a billing gate. Items surfaced after Round 2 become residual to-do list (see §T4).

### Tool stack

| Tool | Role | Plan |
|---|---|---|
| Loom | Async walkthroughs at T1–T4 | Free tier |
| Pastel | Click-and-type comments on staging | Free (1 canvas per project) |
| Google Docs | Copy review at T2 | Via `mcp__claude_ai_Google_Drive__create_file` |
| PandaDoc | Sign-off sheet at T5 | Free (60 sigs/year) |
| Playwright | Brand book PDF export at T1 | MCP |

### Pastel canvas lifecycle

One canvas per project:
- Opens at T1 on `{slug}.knapgemaakt.nl` (static homepage-reference)
- Gets new version at T3 (same URL, now serving Astro homepage build)
- Gets new version at T4 (same URL, now serving full QA'd site)
- Archived at T5 sign-off

---

## §T1 — Design Direction Reveal

*(Filled by Task 2)*

---

## §T2 — Copy Approval

*(Filled by Task 3)*

---

## §T3 — Homepage v1 Reveal

*(Filled by Task 4)*

---

## §T4 — Full Site Pre-Launch Review

*(Filled by Task 5)*

---

## §T5 — Sign-off + Payment + Warranty

*(Filled by Task 6)*

---

## §SOW — Proposal Clauses

*(Filled by Task 7)*

---

## §Failure-mode scripts (cross-cutting)

*(Filled by Task 8)*

---

## §Deadline & date math

*(Filled by Task 9)*
````

- [ ] **Step 3: Verify skeleton exists with all 9 section markers**

Use Grep with pattern `^## §|^## Overview` against the new file.
Expected: 9 matching headers (Overview, §T1, §T2, §T3, §T4, §T5, §SOW, §Failure-mode, §Deadline).

- [ ] **Step 4: Commit skeleton**

```bash
cd C:\Users\yanni\Hub
git add business/sops/website-creation-handoff-playbook.md
git commit -m "docs(sops): create handoff playbook skeleton with 9 sections"
```

---

### Task 2: Fill §T1 (Design Direction Reveal)

**Files:**
- Modify: `C:\Users\yanni\Hub\business\sops\website-creation-handoff-playbook.md`
- Reference: `docs/superpowers/specs/2026-04-22-inbound-staged-client-review-design.md` §T1 section (read lines covering T1 — search for `## T1 — Design Direction Reveal`)

- [ ] **Step 1: Read the spec T1 section**

Read the entire `## T1 — Design Direction Reveal` section of the spec (from that heading until the next `## T2` heading). This content is the source-of-truth material.

- [ ] **Step 2: Replace the `*(Filled by Task 2)*` placeholder with T1 content**

Replace the line `*(Filled by Task 2)*` under `## §T1 — Design Direction Reveal` with the following structure, copying content from the spec where indicated:

````markdown
**When invoked:** After S1 Step 13, once the brand book PDF is approved internally and the preview subdomain is live.

**Prerequisites (HUMAN verifies before sending to client):**
- [ ] `{slug}-brand-direction.pdf` generated and reviewed
- [ ] `{slug}.knapgemaakt.nl` serving `homepage-reference-v1.html`
- [ ] Pastel canvas created on the preview URL
- [ ] Loom recorded (5-beat structure below)
- [ ] Client's preferred email confirmed from CLIENT-DATA.md

### Brand book PDF — required contents

*(Copy the 10-item list from spec §T1 "Brand book PDF contents")*

### Loom script — 5-beat structure

*(Copy the 5-beat table from spec §T1 "T1 Loom beats")*

**Rule:** Never end the Loom with "so what do you think?" End with logistics.

### Email template (English — translate to Dutch before sending)

*(Copy the English email block from spec §T1 "T1 framing email")*

### Pastel canvas setup

1. Create a new canvas on `{slug}.knapgemaakt.nl`
2. Set comment access to "anyone with the link — no account needed"
3. Guest reviewer access: unlimited on free plan
4. One canvas per project; do not create a second canvas for T3 — update the URL's version instead

### Revision mechanics

- **Approval, not revision round.** One direction-swap cycle included (e.g., "palette warmer", different typography pairing). One iteration, no cost.
- **Fundamental direction change** (e.g., "completely different layout concept") = scope change. Requires written change order before work continues.
- **Deemed acceptance** at 10 business days of silence.

### Scope / objection scripts

*(Copy all 7 scripts from spec §T1 "T1 scope / objection scripts" — keep English)*

### Deemed-acceptance chase sequence

- **Day +5 (past deadline):** *"Quick nudge on the design direction — we're at the deadline. Anything keeping you from reviewing? Happy to jump on a 15-min call if easier."*
- **Day +10 (deemed accepted):** *"Haven't heard back, so per our agreement I'm treating the design direction as approved and moving on to copywriting. Let me know right away if that's wrong."*
````

- [ ] **Step 3: Verify T1 section has all expected blocks**

Use Grep with pattern `^###` inside the `## §T1` section.
Expected: 7 subsection headers (Brand book PDF, Loom script, Email template, Pastel canvas setup, Revision mechanics, Scope / objection scripts, Deemed-acceptance chase sequence).

- [ ] **Step 4: Commit**

```bash
cd C:\Users\yanni\Hub
git add business/sops/website-creation-handoff-playbook.md
git commit -m "docs(sops): fill playbook §T1 Design Direction Reveal"
```

---

### Task 3: Fill §T2 (Copy Approval)

**Files:**
- Modify: `C:\Users\yanni\Hub\business\sops\website-creation-handoff-playbook.md`
- Reference: spec `## T2 — Copy Approval` section

- [ ] **Step 1: Read the spec T2 section**

Read the entire `## T2 — Copy Approval` section of the spec until `## T3`.

- [ ] **Step 2: Replace `*(Filled by Task 3)*` with T2 content**

Replace the placeholder under `## §T2 — Copy Approval` with:

````markdown
**When invoked:** After S2 Prompt 8 generates the master Google Doc and HUMAN reviews it internally.

**Prerequisites:**
- [ ] `CONTENT/*.md` files all written and committed
- [ ] Master Google Doc generated with ToC, per-page sections, how-to-use note, footer
- [ ] Client's Google account confirmed (for comment access)

### Google Doc structure

1. Title: `{Business name} — Copy Review`
2. First page: how-to-use note (highlight sentence → click comment icon → type; do NOT edit directly)
3. Table of contents with anchor links to each page section
4. One section per page (rendered as formatted text from `CONTENT/*.md` — headings, paragraphs, bullets):
   - Homepage
   - Each service page
   - About
   - Contact
   - FAQ
   - Privacy
   - Algemene voorwaarden
5. Footer: *"When you're happy, reply 'akkoord' to the email. Otherwise leave comments by {deadline}."*

### Loom script — 3–4 min

*(Copy the 4-beat T2 Loom beats table from spec §T2)*

### Email template (English — translate)

*(Copy the English email block from spec §T2 "T2 framing email")*

### Revision mechanics

- **Approval, not revision round.** One copy-revision cycle included.
- **Wholesale rewrite of tone** = scope change.
- **Push-back script for taste-based comments that weaken copy:** *"I wrote it this way because {concrete reason tied to brief/voice}. Changing it to {their version} would {concrete consequence}. Happy to change if you want, but I'd recommend keeping it. Your call."*

### Closing the loop — Doc → CONTENT/*.md

When client replies "akkoord" (or deemed-accepted at day +10):

1. Read final Doc via `mcp__claude_ai_Google_Drive__download_file_content`
2. Diff against `CONTENT/*.md`
3. Apply accepted changes to each `CONTENT/{page}.md`
4. Run `/copy-approve` on voice-compliant changes (saves as golden examples)
5. Commit: `feat: apply client copy revisions from T2 review`
6. Session 3 build proceeds with locked copy

### Failure-mode guardrails

- **Direct edits instead of comments:** Revert via Docs version history. Redirect: *"I noticed some direct edits — please use comments instead so we keep a clean trail. I've reverted those, add them as comments."*
- **Stakeholder proliferation:** *"To keep this manageable, let's funnel everything through you as the decision-maker. Happy to get a list from others, but final decisions need to come from one place."*
- **Piecemeal comments across days:** *"Perfect — I'll hold all of these and action them together once you've completed the review by {deadline}. Keeps us on schedule."*
````

- [ ] **Step 3: Verify**

Grep the playbook for `### Closing the loop` — should return 1 match.

- [ ] **Step 4: Commit**

```bash
cd C:\Users\yanni\Hub
git add business/sops/website-creation-handoff-playbook.md
git commit -m "docs(sops): fill playbook §T2 Copy Approval"
```

---

### Task 4: Fill §T3 (Homepage v1 Reveal)

**Files:**
- Modify: `C:\Users\yanni\Hub\business\sops\website-creation-handoff-playbook.md`
- Reference: spec `## T3 — Homepage v1 Reveal` section

- [ ] **Step 1: Read the spec T3 section**

- [ ] **Step 2: Replace `*(Filled by Task 4)*` with T3 content**

Replace with:

````markdown
**When invoked:** After S3 Prompt 3b deploys the Astro homepage to `{slug}.knapgemaakt.nl` and smoke test passes.

**Prerequisites:**
- [ ] Astro homepage deployed, URL loads in browser
- [ ] Lighthouse mobile ≥70 on the staged homepage
- [ ] No console errors
- [ ] Inner-page routes either 404 or show a minimal "binnenpagina's volgen" placeholder (intentional — homepage-only reveal)
- [ ] Pastel canvas has new version (same URL, new capture)
- [ ] Loom recorded (5-beat, 5–8 min)
- [ ] **30-min feedback call pre-scheduled 48–72h after email send** — calendar invite attached to the email

### Loom script — 5-beat structure (5–8 min)

*(Copy the 5-beat T3 Loom beats table from spec §T3)*

**Rule:** Never end the Loom with "so what do you think?" End with logistics.

### Email template (English — translate)

*(Copy the English email block from spec §T3 "T3 framing email")*

### Why the pre-scheduled call matters

Research-backed: scheduling 48–72h out BEFORE sending v1 dramatically improves written-comment quality. Clients know they'll discuss it, so they take it more seriously. Calendar invite goes in the same email as the Loom. If client tries to skip: *"The call makes a big difference — easier to discuss trade-offs live. 30 minutes. If you really can't, we switch to written feedback only."*

### Revision round 1 of 2 mechanics

- Client returns consolidated Pastel comments by deadline
- Deliver Round 1 revisions within 2–3 business days
- On delivery, tell the client: *"These changes are in. Next, I start on the inner pages. Your remaining revision round (Round 2) covers the full site — inner pages and any final homepage polish."*
- Fundamental hero-concept change after approved T1 direction = scope change

### Scope / objection scripts

*(Copy all 5 scripts from spec §T3 "T3 scope / objection scripts" — keep English)*
````

- [ ] **Step 3: Verify**

Grep for `pre-scheduled call` inside the §T3 section — should find 2+ matches (heading + rule).

- [ ] **Step 4: Commit**

```bash
cd C:\Users\yanni\Hub
git add business/sops/website-creation-handoff-playbook.md
git commit -m "docs(sops): fill playbook §T3 Homepage v1 Reveal"
```

---

### Task 5: Fill §T4 (Full Site Pre-Launch Review)

**Files:**
- Modify: `C:\Users\yanni\Hub\business\sops\website-creation-handoff-playbook.md`
- Reference: spec `## T4 — Full Site Pre-Launch Review` section

- [ ] **Step 1: Read the spec T4 section**

- [ ] **Step 2: Replace `*(Filled by Task 5)*` with T4 content**

Replace with:

````markdown
**When invoked:** After S5 Prompt 10 deploys the full QA'd site to `{slug}.knapgemaakt.nl` and smoke test passes.

**Prerequisites:**
- [ ] `QA-REPORT.md` says READY FOR LAUNCH
- [ ] Full site deployed, every page loads
- [ ] Broken-link-checker run clean
- [ ] Noindex headers still in place (domain stays hidden until S6)
- [ ] Pastel canvas has new version
- [ ] Loom recorded (4–5 min, inner-pages focus)

### Loom script — 4–5 min

*(Copy the 5-beat T4 Loom beats table from spec §T4)*

**Key framing:** Skip the homepage (client has seen it at T3). Focus on inner pages and anything new since T3 (SEO additions like schema don't show visually, so don't tour them).

### Email template (English — translate)

*(Copy the English email block from spec §T4 "T4 framing email")*

### Revision round 2 of 2 mechanics + countdown language

- This is the **final included** revision round
- Deliver revisions within 2 business days
- **No paid Round 3.** The 2-round cap is structural, not billing — KNAP GEMAAKT. does not charge for additional revisions.
- If client surfaces more items after Round 2: default path is **residual to-do list** on the sign-off sheet — minor non-bug fixes handled in the first week post-launch at no cost.
- **Substantial** change requests after Round 2 (new sections, new pages, fundamentally different direction) = scope change, written change order required.

### Countdown script (with Round 2 delivery)

*(Copy the countdown script from spec §T4 "T4 revision mechanics")*

### Residual to-do list vs warranty

- **Residual list:** courtesy polish items (non-bugs) handled in first week post-launch. Examples: copy tweaks, spacing adjustments, minor layout preferences.
- **Warranty (30 days):** reproducible bugs in code delivered by KNAP GEMAAKT. Examples: form submission error, broken link, schema validation error, wrong text on wrong page.
- Overlap is rare. When unclear, treat it as residual (more generous).
````

- [ ] **Step 3: Verify**

Grep for `Residual to-do list vs warranty` — should return 1 match.

- [ ] **Step 4: Commit**

```bash
cd C:\Users\yanni\Hub
git add business/sops/website-creation-handoff-playbook.md
git commit -m "docs(sops): fill playbook §T4 Full Site Review"
```

---

### Task 6: Fill §T5 (Sign-off)

**Files:**
- Modify: `C:\Users\yanni\Hub\business\sops\website-creation-handoff-playbook.md`
- Reference: spec `## T5 — Sign-off + Payment + Warranty Start` section

- [ ] **Step 1: Read the spec T5 section**

- [ ] **Step 2: Replace `*(Filled by Task 6)*` with T5 content**

Replace with:

````markdown
**When invoked:** After client approves T4 revisions OR approves as-is with residual list.

**Prerequisites:**
- [ ] T4 revisions applied (or client accepted as-is + residual list agreed)
- [ ] Final preview URL version pinned
- [ ] PandaDoc template `knapgemaakt-signoff-template` exists (one-time setup)

### PandaDoc sign-off sheet — 8 blocks (one page)

1. **Project name + date** — e.g., "KNAP GEMAAKT. × {Business name} — Website Project, {date}"
2. **Deliverable list** — auto-populated from `CONTENT/sitemap.md`: homepage, N service pages, about, contact, FAQ, legal, location pages (if any), schema/SEO implementation, hosting setup, launch coordination
3. **Final preview link** — `{slug}.knapgemaakt.nl` at the exact version being signed off
4. **Residual to-do list** — minor non-bug fixes to handle in first week post-launch (can be empty)
5. **Declaration of acceptance** (Dutch, legally binding) — *"Ondergetekende verklaart dat de bovengenoemde deliverables zijn opgeleverd en geaccepteerd."*
6. **Payment trigger** (Dutch) — *"Deze sign-off geeft de laatste factuur vrij. Betalingstermijn: 7 dagen."*
7. **Warranty** (Dutch) — *"De 30-daagse garantieperiode start op de handtekeningdatum. Gedekt: reproduceerbare bugs in door KNAP GEMAAKT. geleverde code. Niet gedekt: wijzigingen door derden, externe plugins, nieuwe features."*
8. **Signature field** + signature date

### Sign-off workflow

1. HUMAN opens `knapgemaakt-signoff-template` in PandaDoc
2. HUMAN fills variables: business name, project name, deliverables, final preview URL, sign-off date, final payment amount, residual list (if any)
3. HUMAN sends for signature via PandaDoc
4. Client signs → triggers:
   - Final invoice sent with 7-day payment term
   - 30-day warranty clock starts
   - S6 launch green-lit (DNS migration can proceed)
5. HUMAN archives the signed PDF in project folder

### Email template (English — translate)

*(Copy the English email block from spec §T5 "T5 framing email")*

### Deemed-acceptance chase sequence

- **Day +5 (past deadline):** *"Quick nudge on the sign-off sheet — we're at the deadline. Any reason you haven't signed? Happy to adjust anything that looks wrong."*
- **Day +10 (deemed accepted):** *"Haven't heard back, so per our agreement I'm treating the sign-off as given and proceeding with launch. Final invoice going out today. Warranty starts from this date."*

Deemed-acceptance notice in writing (sent alongside invoice) protects the relationship and the payment timeline.

### Future automation (out of scope for this plan)

- PandaDoc API integration to auto-fill template from project state — would eliminate the manual variable fill. Worth building once monthly project volume justifies the wiring time.
````

- [ ] **Step 3: Verify**

Grep for `### PandaDoc sign-off sheet` — should return 1 match.

- [ ] **Step 4: Commit**

```bash
cd C:\Users\yanni\Hub
git add business/sops/website-creation-handoff-playbook.md
git commit -m "docs(sops): fill playbook §T5 Sign-off + Payment + Warranty"
```

---

### Task 7: Fill §SOW clauses

**Files:**
- Modify: `C:\Users\yanni\Hub\business\sops\website-creation-handoff-playbook.md`
- Reference: spec `## SOW clauses — the teeth` section (use UPDATED Clause 1 from the spec which removed the pricing)

- [ ] **Step 1: Read the spec SOW section**

- [ ] **Step 2: Replace `*(Filled by Task 7)*` with SOW clauses**

Replace with:

````markdown
**Purpose:** Ready-to-paste clauses for SOW / proposal / algemene voorwaarden. Without these, the touchpoint mechanics have no teeth.

**Translation note:** Clauses below are in English for reference. Dutch translations go into the actual SOW template (separate file, not this playbook).

### Clause 1 — Revisions included

*Included: 2 consolidated revision rounds during the design-and-build phase. A "revision round" is a single consolidated set of written feedback submitted via the agreed feedback channel (Pastel). Piecemeal feedback across multiple messages counts as one round. Minor polish items raised after Round 2 are collected on a residual to-do list and handled in the first week post-launch at no additional cost. Substantial changes that alter scope (new sections, new pages, fundamentally different direction) require a written change order before work continues — see Clause 3.*

### Clause 2 — Approval gates (not counted as revisions)

*Included in addition to the two revision rounds: one design direction approval and one copy approval. Each approval allows one direction-swap cycle at no additional cost. Fundamentally different direction or rewrite constitutes a scope change.*

### Clause 3 — Revision vs scope change

*A revision is an adjustment within an existing agreed direction. A scope change introduces a new deliverable, a new page, or a fundamentally different direction. Scope changes require a written change order and revised estimate, signed before work continues.*

### Clause 4 — Deemed acceptance

*Deliverables are deemed accepted if Client does not provide specific written objections within 10 business days of delivery. This protects the schedule when communication stalls.*

### Clause 5 — Final payment

*Final payment is released on signed sign-off sheet, not at launch. Payment term: 7 days post-sign-off.*

### Clause 6 — Warranty

*30 days from sign-off. Covers: reproducible bugs in code delivered by KNAP GEMAAKT. Excludes: client-altered code, third-party plugin issues, new features, content changes, hosting/DNS issues not caused by the delivered code.*

### Clause 7 — Single point of contact

*Client designates one person with final decision authority. All feedback is consolidated through this person. Stakeholders contacting KNAP GEMAAKT. directly will be redirected to the designated contact.*
````

- [ ] **Step 3: Verify**

Grep for `### Clause` in the playbook — should return 7 matches.

- [ ] **Step 4: Commit**

```bash
cd C:\Users\yanni\Hub
git add business/sops/website-creation-handoff-playbook.md
git commit -m "docs(sops): fill playbook §SOW with 7 ready-to-paste clauses"
```

---

### Task 8: Fill §Failure-mode scripts (cross-cutting)

**Files:**
- Modify: `C:\Users\yanni\Hub\business\sops\website-creation-handoff-playbook.md`

- [ ] **Step 1: Replace `*(Filled by Task 8)*` with cross-cutting scripts**

Replace with:

````markdown
**Purpose:** These scripts appear across multiple touchpoints. Keep them here once; reference from §T1–§T5 by name.

### Rubber-stamper ("looks great!")

*"I'd love for you to be excited about this. What would help you feel more excited about this? What concerns do you have? If you had to change one thing, what would it be? And who else needs to see this before we move on?"*

**Why this works:** Research shows the rubber-stamper's silence comes back as contradictory feedback two weeks later once stakeholders weigh in. These four probes surface the real reactions before they fester.

### Nitpicker with taste-based comments

*"We can change that. Here's what it would look like: [mockup or screenshot]. It does mean sacrificing {visual hierarchy / readability / something concrete tied to the brief}. Is that trade-off worth it to you?"*

**Why this works:** Reframes the conversation from the nitpicker's personal taste to an explicit trade-off decision. They either commit to the change (knowing the cost) or back off.

### Taste-vs-audience reframe

*"Let's park your personal taste for a second. How might your customers react to {X}? That's what we're optimizing for."*

**Why this works:** Shifts the frame from "do I like this?" to "does my target market like this?" — which is the actual success criterion.

### Piecemeal feedback (drip of small comments)

*"Perfect — I'll hold these and action them together once you've completed your review by {deadline}. Keeps us on schedule."*

**Why this works:** Explicitly refuses the drip pattern. Consolidation protects scope definition and the revision-round count.

### Stakeholder proliferation

*"To keep this manageable, let's funnel everything through you as the decision-maker. Happy to get a list of concerns from others, but final decisions need to come from one place."*

**Reference:** SOW Clause 7.

### Missed deadline — silent client

Use the escalation pattern (adapt per touchpoint):

- Day 0 (deadline passes)
- Day +2: Soft nudge via WhatsApp — *"Hey, any news on {X}?"*
- Day +5: Formal email chase with call offer — *"Quick nudge on {X} — we're at the deadline. Anything keeping you from reviewing? Happy to jump on a 15-min call if easier."*
- Day +10: Deemed-acceptance notice — *"Haven't heard back, so per our agreement I'm treating {X} as approved and moving on. Let me know right away if that's wrong."*

### Scope-change trigger

*"What you're describing is a different direction, not a tweak. That sits outside what we agreed. Let me write up a quick change order with the new scope and cost so you can decide whether to go there. No work until you sign that off."*

**Reference:** SOW Clause 3.
````

- [ ] **Step 2: Verify**

Grep for `### ` inside §Failure-mode scripts section — should find 7 script headings.

- [ ] **Step 3: Commit**

```bash
cd C:\Users\yanni\Hub
git add business/sops/website-creation-handoff-playbook.md
git commit -m "docs(sops): fill playbook §Failure-mode scripts (cross-cutting)"
```

---

### Task 9: Fill §Deadline & date math

**Files:**
- Modify: `C:\Users\yanni\Hub\business\sops\website-creation-handoff-playbook.md`

- [ ] **Step 1: Replace `*(Filled by Task 9)*` with deadline reference**

Replace with:

````markdown
**Purpose:** Standard deadlines per touchpoint + NL working-day math for calculating accurate "by {date}" phrasing in client emails.

### Standard deadlines per touchpoint

| Touchpoint | Client-side | KG response |
|---|---|---|
| T1 | 3 business days to review + direction swap | 2–3 bd to incorporate |
| T2 | 3 business days to comment | 1–2 bd to incorporate |
| T3 | 5 business days for written feedback (+ call 48–72h after send) | 2–3 bd for Round 1 revisions |
| T4 | 5 business days for written feedback | 2 bd for Round 2 revisions |
| T5 | 10 business days deemed acceptance | — (signature triggers launch) |

### NL public holidays (maintain yearly)

**Fixed-date holidays:**
- 1 Jan — Nieuwjaarsdag
- 27 Apr — Koningsdag
- 5 May — Bevrijdingsdag (official national holiday only every 5 years: 2025, 2030, 2035)
- 25 Dec — Eerste Kerstdag
- 26 Dec — Tweede Kerstdag

**Easter-linked holidays (check each year):**
- Goede Vrijdag
- Eerste Paasdag
- Tweede Paasdag
- Hemelvaartsdag (39 days after Easter)
- Eerste Pinksterdag (49 days after Easter)
- Tweede Pinksterdag (50 days after Easter)

**2026 specific dates** (verify against Rijksoverheid.nl when in doubt):
- Goede Vrijdag: 3 April
- Eerste Paasdag: 5 April
- Tweede Paasdag: 6 April
- Koningsdag: 27 April
- Hemelvaartsdag: 14 May
- Eerste Pinksterdag: 24 May
- Tweede Pinksterdag: 25 May

**Note on Bevrijdingsdag:** In 2026, 5 May is NOT an official holiday (public-sector only in every-5th year). Most SMB clients still work. Treat as a normal business day for deadline math unless the specific client says otherwise.

### Working-day calculation rule

1. Start from the email send date
2. Add the touchpoint's business-day count (3, 5, or 10)
3. Skip Saturdays, Sundays, and any NL public holiday that falls in the range
4. The resulting date is the `{deadline}` placeholder in email templates
5. If deadline lands on a Friday afternoon, consider bumping to Monday morning to give client weekend thinking space (optional — not required)

### Sanity check

After calculating a deadline, read it back: *"Sending on {today}, reviewing for {N} business days, so the client responds by {deadline}."* If it feels rushed or absurd (e.g., over a holiday weekend), adjust.
````

- [ ] **Step 2: Verify**

Grep for `Tweede Paasdag` — should return 2 matches (recurring + 2026 specific).

- [ ] **Step 3: Commit**

```bash
cd C:\Users\yanni\Hub
git add business/sops/website-creation-handoff-playbook.md
git commit -m "docs(sops): fill playbook §Deadline & date math with NL holidays table"
```

---

## Phase B — Wire handoff playbook into session SOPs

### Task 10: Insert S1 hooks (Steps 11, 12, 13)

**Files:**
- Modify: `C:\Users\yanni\Hub\business\sops\website-creation-session1-design-direction-v3.md`

Current S1 ends at Step 10 (DESIGN.md extraction). Add Steps 11, 12, 13.

- [ ] **Step 1: Locate the end of Step 10 in S1**

Read S1 file. Find the last `**HUMAN:**` line under `### 10 — Extract DESIGN.md` (currently: `**HUMAN:** Review DESIGN.md. Once approved, Session 1 is complete. Proceed to Session 2 (Content & Copywriting).`).

- [ ] **Step 2: Replace that HUMAN line + append three new steps**

Find the text `**HUMAN:** Review DESIGN.md. Once approved, Session 1 is complete. Proceed to Session 2 (Content & Copywriting).`

Replace with:

````markdown
**HUMAN:** Review DESIGN.md. Once approved, proceed to Step 11.

---

### 11 — Brand Direction PDF

**AI:**
```
Read DESIGN.md, .impeccable.md, homepage-reference-v1.html, and (if they exist)
src/assets/brand/logo-*.svg.

Create src/pages/brand-book.astro — a single printable page that uses the project's
own global.css + @theme tokens to render the brand book. Contents (10 blocks):

1. Cover — business name, logo (or typography wordmark if no logo), "Brand Direction
   v1", Yannick contact details
2. Color palette — primary/accent/neutrals/semantic, each with HEX + oklch + usage notes
3. Typography — heading + body font, scale examples (H1–H4, body, small), pairing rationale
4. Logo variants — on white, on dark, monochrome, small-size, clearspace rules. If no
   logo: show typography wordmark at 3 sizes instead
5. Layout principles — section rhythm, grid, spacing scale
6. Interaction vocabulary — scroll behavior, hover pattern, signature interaction
   (plain language, no design jargon)
7. Visual craft — decorative elements used (blobs, shapes, accent lines, with examples)
8. Anti-patterns — "what we explicitly won't do" (from DESIGN.md §15)
9. Homepage preview — 2–3 screenshots of homepage-reference with context captions
10. Next steps — link placeholder, Pastel placeholder, 3-business-day deadline note,
    focus areas, not-yet items

Use print-specific CSS (@media print) to paginate cleanly. Keep typography at
readable print sizes (body 11pt, headings proportionally).

After building, run: npm run dev → open http://localhost:4321/brand-book to confirm
it renders.
```

**HUMAN:** Review the rendered brand-book page in browser. If satisfied, tell AI "export to PDF".

**AI (on export trigger):**
```
Use the Playwright MCP to render http://localhost:4321/brand-book as PDF:
- browser_navigate to localhost:4321/brand-book
- browser_evaluate to trigger print-to-PDF via Chrome's page.pdf() (or equivalent
  Playwright method)
- Save to {slug}-brand-direction.pdf in project root

If Playwright MCP cannot directly produce PDF, fall back:
1. browser_take_screenshot of the full page
2. Use the Anthropic PDF skill (reportlab) only as last resort — NOT for visual
   fidelity, only as fallback if browser_pdf path fails
```

**HUMAN:** Verify the generated PDF visually matches the page. Keep if good, re-render if broken.

---

### 12 — Deploy T1 preview subdomain

**AI:**
```
The goal: homepage-reference-v1.html (and any referenced assets — brand images,
fonts, logo variants) deployed to https://{slug}.knapgemaakt.nl with noindex headers.

Implementation using the Cloudflare MCP:

1. set_active_account with account ID d956a8df0362c9ffc0663196ddd51ba4
2. Create a Cloudflare Pages project named {slug} via direct-upload mode
   (this is the ONLY time direct-upload is acceptable — at S3 Prompt 2 the
   project is migrated to GitHub-connected; see Task 12 in the implementation
   plan for migration details)
3. Direct-upload homepage-reference-v1.html + all referenced assets (images,
   fonts, CSS if inline)
4. Ensure public/_headers includes:
      /*
        X-Robots-Tag: noindex
        Cache-Control: no-cache
5. Add a custom subdomain: {slug}.knapgemaakt.nl via Cloudflare Pages API
6. Create CNAME DNS record: {slug} → {project-name}.pages.dev, proxied=true
   (zone ID for knapgemaakt.nl: 8a2e13646d2254034e74e3fbf52a527f)
7. Wait for SSL to propagate (1–2 min)
8. curl -I https://{slug}.knapgemaakt.nl → expect 200 + X-Robots-Tag: noindex
```

**HUMAN:** Open https://{slug}.knapgemaakt.nl in browser. Confirm homepage loads, no search-engine indexing. If broken, debug with AI before T1 trigger.

---

### 13 — T1 Trigger (invoke handoff playbook §T1)

**HUMAN:**
Follow `C:\Users\yanni\Hub\business\sops\website-creation-handoff-playbook.md` §T1 end-to-end:

1. Verify prerequisites checklist (PDF + subdomain + Pastel + Loom + email)
2. Open Pastel canvas on https://{slug}.knapgemaakt.nl — set comment access to link-only, no login
3. Record the 5-beat Loom (script in §T1)
4. Draft the email in English from §T1 template
5. Translate email to Dutch yourself (never outsource translation to Claude)
6. Calculate deadline using §Deadline & date math: today + 3 business days, skip NL holidays
7. Send with: brand-direction PDF attached, Pastel link, Loom link, deadline in email body

After sending: monitor Pastel canvas daily. Apply scope-scripts from §T1 as needed.

On client approval (or deemed-acceptance at day +10): proceed to Session 2.

**Session 1 is complete at the point of T1 approval.**
````

- [ ] **Step 3: Verify the three new steps are in place**

Grep S1 for `### 11 — Brand Direction PDF` — should return 1 match.
Grep S1 for `### 12 — Deploy T1 preview subdomain` — should return 1 match.
Grep S1 for `### 13 — T1 Trigger` — should return 1 match.

- [ ] **Step 4: Commit**

```bash
cd C:\Users\yanni\Hub
git add business/sops/website-creation-session1-design-direction-v3.md
git commit -m "docs(sops): S1 add Steps 11 (brand book PDF) + 12 (preview deploy) + 13 (T1 trigger)"
```

---

### Task 11: Insert S2 hook (Prompt 8)

**Files:**
- Modify: `C:\Users\yanni\Hub\business\sops\website-creation-session2-copywriting-v3.md`

Current S2 ends at Prompt 7 (Legal Pages). Add Prompt 8 after Prompt 7.

- [ ] **Step 1: Locate end of Prompt 7 in S2**

Read S2. Find the line: `**HUMAN:** Review legal pages. Session 2 is complete. Optionally send CONTENT/ to client for approval before Session 3.`

This line becomes obsolete (T2 is no longer optional). Replace it.

- [ ] **Step 2: Replace the end-of-S2 HUMAN line + append Prompt 8**

Find: `**HUMAN:** Review legal pages. Session 2 is complete. Optionally send CONTENT/ to client for approval before Session 3.`

Replace with:

````markdown
**HUMAN:** Review legal pages. When all CONTENT/*.md files are correct and committed, proceed to Prompt 8.

---

### 8 — Generate Client Copy Review Google Doc

**AI:**
```
Goal: generate a master Google Doc containing all page copy, formatted for
client review with native Google Docs commenting.

Read all CONTENT/*.md files:
- CONTENT/homepage.md
- CONTENT/diensten/*.md (all service pages)
- CONTENT/over-ons.md
- CONTENT/contact.md
- CONTENT/faq.md
- CONTENT/privacy.md
- CONTENT/algemene-voorwaarden.md
- Any additional sitemap pages

Use mcp__claude_ai_Google_Drive__create_file to create a new Google Doc titled
"{Business name} — Copy Review".

Document structure:

1. FIRST PAGE — how-to-use note:
   "How to review this document:
    - Highlight a sentence and click the comment icon (top-right of the highlight)
    - Type your reaction
    - Please do NOT edit the text directly — use comments only
    - When you're happy, reply 'akkoord' to the email
    - Deadline: {date, 3 business days from send}"

2. TABLE OF CONTENTS (with anchor links to each page section below):
   - Homepage
   - Service pages (one entry per)
   - About
   - Contact
   - FAQ
   - Privacy
   - Algemene voorwaarden

3. ONE SECTION PER PAGE — rendered as formatted text (not raw markdown):
   For each CONTENT/*.md file:
     a. H1: "{Page name} — {URL}"
     b. Render the markdown into Google Docs format:
        - Markdown # headings → Doc Heading 1/2/3
        - Paragraphs → body text
        - Bullet/numbered lists → preserved
        - Bold/italic → preserved
     c. Add horizontal divider between pages

4. FOOTER: "Reply 'akkoord' when you're happy with the copy, or leave comments
   by {deadline}."

Save the Doc in Google Drive under a folder named "{Business name} — Website Project"
(create the folder if it doesn't exist via create_file with mimeType
application/vnd.google-apps.folder).

After creation, share settings:
- Commenter access for client email (from CLIENT-DATA.md)
- Comment access for Yannick (veldhuiseny@gmail.com / yannick@knapgemaakt.nl)

Return the Doc URL to HUMAN for review.
```

**HUMAN:** Open the Doc. Verify: all pages present, no raw markdown characters, ToC anchors work, sharing is correct. If broken, AI regenerates. If good, proceed to T2 trigger.

**T2 Trigger — HUMAN:**
Follow `C:\Users\yanni\Hub\business\sops\website-creation-handoff-playbook.md` §T2 end-to-end:

1. Verify prerequisites checklist (Doc + sharing + Loom recorded)
2. Record 3–4 min Loom per §T2 script
3. Draft email in English from §T2 template
4. Translate to Dutch yourself
5. Calculate deadline: today + 3 business days, skip holidays
6. Send to client with Doc link + Loom link

On client "akkoord" (or deemed-acceptance at day +10): run the closing-the-loop
procedure from §T2 (Doc → CONTENT/*.md diff → commit).

**Session 2 is complete at the point of T2 approval.**
````

- [ ] **Step 3: Verify**

Grep S2 for `### 8 — Generate Client Copy Review Google Doc` — should return 1 match.
Grep S2 for `T2 Trigger` — should return 1 match.

- [ ] **Step 4: Commit**

```bash
cd C:\Users\yanni\Hub
git add business/sops/website-creation-session2-copywriting-v3.md
git commit -m "docs(sops): S2 add Prompt 8 (Client Copy Review Google Doc + T2 trigger)"
```

---

### Task 12: Insert S3 hook (Prompt 3b + gate Prompt 4)

**Files:**
- Modify: `C:\Users\yanni\Hub\business\sops\website-creation-session3-build-v2.md`

Need to: (a) add Prompt 3b after Prompt 3, and (b) gate Prompt 4 behind T3 approval.

- [ ] **Step 1: Locate COMPACTION POINT after Prompt 3 in S3**

Read S3. Find the block:
```
> **--- COMPACTION POINT (after Prompt 3) ---**
> Homepage and all reusable components are on disk in src/components/.
> After compaction, reload ALL reference files listed at top of this document.
```

- [ ] **Step 2: Insert Prompt 3b between Prompt 3 and the compaction point**

Find the existing `HUMAN: Run \`npm run dev\`. Review the homepage. Request changes. AI edits in place.` line (end of current Prompt 3).

Replace the block:
```
HUMAN: Run `npm run dev`. Review the homepage. Request changes. AI edits in place.

---

> **--- COMPACTION POINT (after Prompt 3) ---**
> Homepage and all reusable components are on disk in src/components/.
> After compaction, reload ALL reference files listed at top of this document.

---

### Prompt 4 — Subpage Build
```

with:

````markdown
HUMAN: Run `npm run dev`. Review the homepage. Request changes. AI edits in place. When internally satisfied, proceed to Prompt 3b.

---

### Prompt 3b — Deploy Homepage to Preview Subdomain + T3 Trigger

AI:
```
The T1 Cloudflare Pages project at {slug}.knapgemaakt.nl currently serves the
static homepage-reference-v1.html from direct upload. Now migrate it to the
GitHub-connected Astro build.

MIGRATION STEPS:
1. Note: Cloudflare does not support converting a direct-upload Pages project to
   GitHub-connected (API error 8000069). So: delete the direct-upload project
   AND recreate it GitHub-connected using the same project name → this preserves
   the {slug}.knapgemaakt.nl subdomain.
   
   Steps:
   a. Delete existing direct-upload Pages project: DELETE
      /accounts/{ACCOUNT_ID}/pages/projects/{project-name}
   b. Recreate as GitHub-connected using the pattern from
      Hub/business/sops/astro6-cloudflare-reference.md Section 3c.
   c. Re-attach the custom subdomain {slug}.knapgemaakt.nl.
   d. CNAME DNS record should still exist from Step 12 — verify and recreate only
      if missing.
   e. Trigger first build by pushing to main (or empty commit).

2. Verify homepage deploys:
   - curl -I https://{slug}.knapgemaakt.nl → 200
   - Homepage HTML contains the actual Astro-built content, not the old static HTML
   - Noindex headers intact: curl -I | grep -i x-robots-tag → noindex

3. Inner-page routes:
   - Option A (preferred): if the routes only have empty page shells from S3 P2,
     they will render blank pages — replace each with a placeholder page that says
     "Binnenpagina volgt na akkoord op de homepage." Same layout shell, different
     body.
   - Option B: configure Pages to 404 on unknown routes.
   - Choose A for clarity; it signals intent rather than feeling broken.

4. Smoke test on production preview (NOT dev server):
   - Lighthouse mobile on the live subdomain, expect Performance ≥70
   - No console errors in headless browser check
   - Hero image loads with fetchpriority=high

5. Update the existing Pastel canvas: add a NEW VERSION for
   https://{slug}.knapgemaakt.nl (same URL as T1, Pastel captures the new
   homepage automatically via re-capture).
```

**HUMAN:** Verify live homepage loads at https://{slug}.knapgemaakt.nl. Run Lighthouse on production preview. If pass, proceed to T3 trigger.

**T3 Trigger — HUMAN:**
Follow `C:\Users\yanni\Hub\business\sops\website-creation-handoff-playbook.md` §T3 end-to-end:

1. Verify §T3 prerequisites checklist (deployed + Lighthouse + no errors + placeholders + Pastel canvas + Loom + pre-scheduled call)
2. Record 5–8 min 5-beat Loom per §T3 script
3. Draft email in English from §T3 template
4. Translate to Dutch yourself
5. Calculate deadline: today + 5 business days, skip holidays
6. **Block a 30-min call 48–72h from send date** in your calendar. Create calendar event for client. Include join link.
7. Send email to client with: Loom link, preview URL, calendar invite
8. Monitor Pastel canvas daily during review window

On client approval (round 1 of 2 revisions applied): proceed to Prompt 4 (subpages).
On fundamental change request: trigger scope-change per §T3 scripts.
On silence at day +10: deemed-acceptance notice per §T3.

---

> **--- COMPACTION POINT (after Prompt 3b, if T3 review takes several days) ---**
> Homepage deployed. Client in review. After compaction, reload ALL reference files
> when client feedback arrives.

---

> **--- GATE: Prompt 4 is BLOCKED until T3 is approved. ---**
> Do NOT run Prompt 4 subpage build before the client has approved the homepage
> via Pastel comments + email confirmation, OR deemed-acceptance has triggered
> at day +10. Inner pages are built against the final approved homepage direction.

---

### Prompt 4 — Subpage Build
````

Then leave the existing Prompt 4 content as-is.

- [ ] **Step 3: Verify**

Grep S3 for `Prompt 3b — Deploy Homepage` — should return 1 match.
Grep S3 for `GATE: Prompt 4 is BLOCKED` — should return 1 match.
Grep S3 for `T3 Trigger — HUMAN:` — should return 1 match.

- [ ] **Step 4: Commit**

```bash
cd C:\Users\yanni\Hub
git add business/sops/website-creation-session3-build-v2.md
git commit -m "docs(sops): S3 add Prompt 3b (homepage deploy + T3 trigger), gate Prompt 4"
```

---

### Task 13: Insert S5 hook (Prompt 10)

**Files:**
- Modify: `C:\Users\yanni\Hub\business\sops\website-creation-session5-qa.md`

Current S5 ends at Prompt 9 (Content + Legal verdict). Add Prompt 10 after.

- [ ] **Step 1: Locate end of Prompt 9 in S5**

Read S5. Find the line: `HUMAN: Review QA-REPORT.md. Resolve any NEEDS FIXES items. When verdict is READY FOR LAUNCH, proceed to Session 6.`

- [ ] **Step 2: Replace the end-of-S5 HUMAN line + append Prompt 10**

Find: `HUMAN: Review QA-REPORT.md. Resolve any NEEDS FIXES items. When verdict is READY FOR LAUNCH, proceed to Session 6.`

Replace with:

````markdown
HUMAN: Review QA-REPORT.md. Resolve any NEEDS FIXES items. When verdict is READY FOR LAUNCH, proceed to Prompt 10.

---

### Prompt 10 — Final Deploy to Preview Subdomain + T4 Trigger

AI:
```
Push the full QA'd site to https://{slug}.knapgemaakt.nl. The site is already
GitHub-connected to Cloudflare Pages from S3 Prompt 3b, so a push to main
triggers the build.

Verify:
1. Run npm run build locally — zero errors.
2. Git push latest main — Cloudflare Pages auto-deploys.
3. Wait for deploy to complete (check Pages dashboard or API).
4. Verify on {slug}.knapgemaakt.nl:
   - Every page from CONTENT/sitemap.md loads (manually or via broken-link-checker
     on the live preview URL)
   - Schema validates (use one page, run through Google Rich Results Test)
   - All forms render (submission not expected to work — Turnstile not wired
     until S6; explain this to client in T4 email)
   - Lighthouse on production preview → all pages ≥90 mobile (QA'd in S5 Prompt 4,
     but re-verify on live preview)
5. CRITICAL: noindex headers still present on {slug}.knapgemaakt.nl.
   curl -I https://{slug}.knapgemaakt.nl | grep -i x-robots-tag → noindex
6. Update Pastel canvas: add new version for https://{slug}.knapgemaakt.nl — the
   canvas now captures the full site state (homepage + inner pages).
```

**HUMAN:** Click through every page on live preview. If all loads clean, proceed to T4 trigger.

**T4 Trigger — HUMAN:**
Follow `C:\Users\yanni\Hub\business\sops\website-creation-handoff-playbook.md` §T4 end-to-end:

1. Verify §T4 prerequisites checklist (full site deployed + broken-link-checker + noindex + Pastel + Loom)
2. Record 4–5 min Loom per §T4 script (focus on inner pages, skip homepage)
3. Draft email in English from §T4 template
4. Translate to Dutch yourself
5. Calculate deadline: today + 5 business days, skip holidays
6. Send email with: Loom link, preview URL, **countdown language** ("round 2 of 2")
7. Monitor Pastel canvas daily

On client approval (round 2 of 2 revisions applied OR residual to-do list accepted):
proceed to Session 6 via T5 sign-off.

On silence at day +10: deemed-acceptance notice per §T4.
````

- [ ] **Step 3: Verify**

Grep S5 for `Prompt 10 — Final Deploy` — should return 1 match.
Grep S5 for `T4 Trigger — HUMAN` — should return 1 match.

- [ ] **Step 4: Commit**

```bash
cd C:\Users\yanni\Hub
git add business/sops/website-creation-session5-qa.md
git commit -m "docs(sops): S5 add Prompt 10 (final deploy + T4 trigger)"
```

---

### Task 14: Insert S6 hook (Prompt 0 — T5 sign-off gate)

**Files:**
- Modify: `C:\Users\yanni\Hub\business\sops\website-creation-session6-launch.md`

Current S6 starts with Prompt 1 (Client Launch Prerequisites). Add Prompt 0 BEFORE Prompt 1, gating all of S6 behind signed sign-off sheet.

- [ ] **Step 1: Locate the start of S6 Prompt 1**

Read S6. Find the line: `### Prompt 1 — Client Launch Prerequisites`

- [ ] **Step 2: Insert Prompt 0 before Prompt 1**

Find: `### Prompt 1 — Client Launch Prerequisites`

Replace with:

````markdown
### Prompt 0 — Verify T5 Sign-off Received

> **GATE: all of Session 6 is BLOCKED until this prompt succeeds.**

**HUMAN:**
Before starting the Cloudflare Pages + Resend + DNS work below, verify that the T5 PandaDoc sign-off sheet has been returned SIGNED by the client.

Checklist:
- [ ] Signed PandaDoc sheet received and archived in project folder
- [ ] Residual to-do list captured (if any) in a dedicated text file: `RESIDUAL-LIST.md`
- [ ] Final invoice sent with 7-day payment term
- [ ] Warranty window noted: starts on signature date, ends 30 days later
- [ ] Client confirmed DNS-access credentials available for the cutover

If any item is missing, do NOT proceed. Options:
- Unsigned but deadline past: issue deemed-acceptance notice per playbook §T5, then proceed
- Signed but invoice not sent: send invoice before continuing (so client can't retroactively say "I thought launch triggered the invoice")
- Client reports issues blocking signature: loop back to T4 for another revision cycle (scope-change if needed)

When all checks pass, proceed to Prompt 1.

---

### Prompt 1 — Client Launch Prerequisites
````

Then the existing Prompt 1 content stays unchanged.

- [ ] **Step 3: Verify**

Grep S6 for `Prompt 0 — Verify T5 Sign-off` — should return 1 match.
Grep S6 for `GATE: all of Session 6 is BLOCKED` — should return 1 match.

- [ ] **Step 4: Commit**

```bash
cd C:\Users\yanni\Hub
git add business/sops/website-creation-session6-launch.md
git commit -m "docs(sops): S6 add Prompt 0 (verify T5 sign-off gate)"
```

---

## Phase C — Final verification

### Task 15: End-to-end playbook trace

Verify that a simulated project could traverse all 5 touchpoints cleanly using only the playbook + updated session files as reference.

**Files (read-only):**
- `C:\Users\yanni\Hub\business\sops\website-creation-handoff-playbook.md`
- `C:\Users\yanni\Hub\business\sops\website-creation-session1-design-direction-v3.md`
- `C:\Users\yanni\Hub\business\sops\website-creation-session2-copywriting-v3.md`
- `C:\Users\yanni\Hub\business\sops\website-creation-session3-build-v2.md`
- `C:\Users\yanni\Hub\business\sops\website-creation-session5-qa.md`
- `C:\Users\yanni\Hub\business\sops\website-creation-session6-launch.md`

- [ ] **Step 1: Playbook completeness check**

Read `website-creation-handoff-playbook.md` from start to finish. Confirm every placeholder from Task 1's skeleton has been replaced with real content (no `*(Filled by Task N)*` markers remain).

Grep the playbook for `*(Filled by` — expected: 0 matches.

- [ ] **Step 2: Session hook presence check**

For each of S1, S2, S3, S5, S6 — grep for the specific hook string:

```bash
cd C:\Users\yanni\Hub

# S1
grep -c "### 11 — Brand Direction PDF" business/sops/website-creation-session1-design-direction-v3.md  # expect: 1
grep -c "### 12 — Deploy T1 preview subdomain" business/sops/website-creation-session1-design-direction-v3.md  # expect: 1
grep -c "### 13 — T1 Trigger" business/sops/website-creation-session1-design-direction-v3.md  # expect: 1

# S2
grep -c "### 8 — Generate Client Copy Review Google Doc" business/sops/website-creation-session2-copywriting-v3.md  # expect: 1
grep -c "T2 Trigger — HUMAN:" business/sops/website-creation-session2-copywriting-v3.md  # expect: 1

# S3
grep -c "Prompt 3b — Deploy Homepage" business/sops/website-creation-session3-build-v2.md  # expect: 1
grep -c "GATE: Prompt 4 is BLOCKED" business/sops/website-creation-session3-build-v2.md  # expect: 1

# S5
grep -c "Prompt 10 — Final Deploy" business/sops/website-creation-session5-qa.md  # expect: 1
grep -c "T4 Trigger — HUMAN:" business/sops/website-creation-session5-qa.md  # expect: 1

# S6
grep -c "Prompt 0 — Verify T5 Sign-off" business/sops/website-creation-session6-launch.md  # expect: 1
grep -c "GATE: all of Session 6 is BLOCKED" business/sops/website-creation-session6-launch.md  # expect: 1
```

All 11 grep commands should return 1.

- [ ] **Step 3: Cross-reference check**

Each session's new hook mentions the playbook file. Verify:

```bash
cd C:\Users\yanni\Hub

grep -c "website-creation-handoff-playbook.md" business/sops/website-creation-session1-design-direction-v3.md  # expect: 1+
grep -c "website-creation-handoff-playbook.md" business/sops/website-creation-session2-copywriting-v3.md  # expect: 1+
grep -c "website-creation-handoff-playbook.md" business/sops/website-creation-session3-build-v2.md  # expect: 1+
grep -c "website-creation-handoff-playbook.md" business/sops/website-creation-session5-qa.md  # expect: 1+
grep -c "website-creation-handoff-playbook.md" business/sops/website-creation-session6-launch.md  # expect: 1+
```

All 5 should return 1 or more.

- [ ] **Step 4: Simulated walkthrough**

Mental trace (no code). Starting from a fresh client intake:
1. S1 runs → Step 13 invokes §T1 → client approves → S2 starts
2. S2 runs → Prompt 8 generates Doc → §T2 invoked → client confirms → CONTENT/*.md updated → S3 starts
3. S3 Prompt 1–3 runs → Prompt 3b deploys homepage + invokes §T3 → client Round 1 feedback → revisions → approval → Prompt 4 unblocked → S3 P4–P7 runs → S4 runs → S5 runs
4. S5 P1–P9 runs → Prompt 10 deploys full site + invokes §T4 → client Round 2 feedback → revisions → approval → T5 sign-off
5. T5 PandaDoc signed → S6 Prompt 0 passes gate → S6 P1–P10 runs → S7 runs

Every transition is explicitly documented. No touchpoint is optional. Gates prevent out-of-order work.

- [ ] **Step 5: Document the verification result**

Append a short note to the BOTTOM of the playbook's Overview section:

````markdown
### Implementation audit (last verified YYYY-MM-DD)

All 5 touchpoints wired into the following session hooks:

| Touchpoint | Session hook |
|---|---|
| T1 | S1 Step 13 |
| T2 | S2 Prompt 8 end |
| T3 | S3 Prompt 3b |
| T4 | S5 Prompt 10 |
| T5 | S6 Prompt 0 gate |

If you edit any session SOP and break a hook, run Task 15 from the implementation
plan to re-verify the chain.
````

- [ ] **Step 6: Commit**

```bash
cd C:\Users\yanni\Hub
git add business/sops/website-creation-handoff-playbook.md
git commit -m "docs(sops): end-to-end playbook trace verified; audit note added"
```

---

## Self-review (done before handing plan off to executor)

**1. Spec coverage check:**

| Spec section | Plan task |
|---|---|
| T1 mechanics (brand book PDF, deploy, trigger, Loom, email, scope scripts, deemed acceptance) | Tasks 1, 2 (playbook §T1), Task 10 (S1 hooks) |
| T2 mechanics (Google Doc, Loom, email, closing the loop, failure modes) | Task 3 (playbook §T2), Task 11 (S2 hook) |
| T3 mechanics (deploy, Loom, email, pre-scheduled call, Round 1, scripts) | Task 4 (playbook §T3), Task 12 (S3 hook + gate) |
| T4 mechanics (deploy, Loom, email, Round 2 + countdown, residual vs warranty) | Task 5 (playbook §T4), Task 13 (S5 hook) |
| T5 mechanics (PandaDoc 8 blocks, workflow, email, deemed acceptance) | Task 6 (playbook §T5), Task 14 (S6 hook gate) |
| SOW clauses (7) | Task 7 (playbook §SOW) |
| Failure-mode scripts (cross-cutting) | Task 8 (playbook §Failure-mode) |
| Deadline & NL holidays | Task 9 (playbook §Deadline) |
| Handoff playbook file creation | Task 1 (skeleton) |
| End-to-end wiring verification | Task 15 |

Every spec section has a task.

**2. Placeholder scan:**

- No "TBD" / "TODO" / "fill in later" remain in task steps
- Every step with a code/content change shows the actual content
- Every commit message is specific
- Session-hook content is embedded in the plan tasks, not "see spec for content"

**3. Type / name consistency:**

- `{slug}` placeholder is used consistently for the client's project subdomain
- `{deadline}` placeholder consistent in email templates
- Business-days counts consistent with spec: T1=3, T2=3, T3=5, T4=5, T5=10
- Playbook section anchors §T1 through §T5, §SOW, §Failure-mode, §Deadline consistent
- Task numbering 1–15 continuous

**4. Cross-session dependency chain:**

- S1 completion (T1 approved) blocks S2 start
- S2 completion (T2 approved) blocks S3 start
- S3 Prompt 3b (T3 approved) blocks S3 Prompt 4
- S5 Prompt 10 (T4 approved + T5 signed) blocks S6 Prompt 1

No broken chains found.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-22-inbound-staged-client-review-implementation.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration. Good fit here because Hub-side changes happen in `C:\Users\yanni\Hub\` (a separate git repo from the current project), and per-task subagents keep context clean.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints for review.

**Which approach?**
