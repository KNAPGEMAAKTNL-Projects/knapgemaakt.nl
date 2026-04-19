# Voice Bible: KNAP GEMAAKT. — Blog voice

Version: `0.1` · Last derived: `2026-04-19` · Copy language: `nl` · Corpus: pre-populated from `brand-voice.md` + `blog.md` inline rules + `reference-examples.md` anti-patterns + `src/content/blog/website-laten-maken-kosten.md` exemplar

---

## Meta — how to use this document

This is the **blog Voice Bible** for KNAP GEMAAKT. It governs every post written via `/blog`, every refresh via `/blog-refresh`, every research pass via `/blog-research`.

It's the blog-specific analog of the per-client `VOICE-BIBLE.md` used in the website-creation SOPs (`Hub/business/sops/website-creation-session1-design-direction-v3.md` PART 3). Structure follows `Hub/business/sops/copywriting/templates/VOICE-BIBLE-template.md`.

**Density rules** (hard limits):
- Active system-prompt payload: ≤2,000 tokens. If this file bloats past that, move exemplars to a `docs/blog/exemplars/` folder for RAG retrieval.
- The Dutch §11 block is mandatory since the blog is NL.

**Lifecycle rules:**
- Lock v1.0 only after Yannick validates via the approach documented below (§12 changelog).
- Re-derive every 12 months or when three or more posts ship that feel off-voice.

**Source of truth:** `C:\Users\yanni\Hub\business\sops\copywriting\research\voice-cloning-research-2026-04.md`.

**Yannick's v1.0 content decision (pending — see §12 changelog):**

Three paths to lock v1.0:

- **Option 1 — Natural voice.** Run `Hub/business/sops/copywriting/research-prompts/voice-interview-protocol.md` on yourself. Record 60–90 min answering the 4-round questions. Transcribe, derive, validate §1/§3/§6/§8 against the transcript. Most authentic. Scoped to how you actually talk.
- **Option 2 — Aspirational voice.** List 3–5 admired brands/writers whose voice embodies what you want KNAP GEMAAKT. to be. Extract their stylistic features via descriptor induction. Populate §3 fingerprint + §7 register from that extraction. Risk: may feel less authentically yours.
- **Option 3 — Hybrid (recommended).** Populate §1 DNA + §6 stance from a self-interview (identity/values anchored in reality). Populate §3 fingerprint + §7.4 long-form register from admired-site extraction (the craft target). Best of both — stays authentic in principle while pulling craft upward.

The pre-population below is based on what's already documented in `brand-voice.md` + `blog.md` + `reference-examples.md`, so a lot of the floor is set. Validation targets are flagged `[VALIDATE ON LOCK]`.

---

## §1 — Voice DNA (3–5 traits)

- **Quietly helpful:** expertise delivered without ego — the post exists to help the reader, not to flex. Never condescending, never "well actually."
- **Dry and specific:** concrete Dutch analogies (Dacia, IKEA-kast, koffie) over marketing abstraction. One-word reactions ("Lekker.") land because they're rare.
- **Zero anxiety:** never dramatize downside, never weaponize FOMO, never "let op / pas op / je moet NU." When comparing options, state what each offers — don't make alternatives sound scary.
- **Evidence over enthusiasm:** concrete numbers, real examples, named tools, visible trade-offs. Rather than "een geweldige ROI," show "€3.000 investering, 2 leads/maand, €600 per lead = terugverdiend in maand 6."
- **Slightly shy, not self-assured:** quietly confident. Doesn't announce its own cleverness. Understated.

> **Why this exists:** Anchors identity. Derived from `brand-voice.md` ("warm but professional / direct, no-nonsense / confident but not arrogant") and `blog.md` lines 156-172 ("zero anxiety / personality mandatory / super helpful / slightly shy"). **`[VALIDATE ON LOCK — does this 5-trait compression match how Yannick actually experiences the brand?]`**

---

## §2 — Tone coordinates (NN/g 4-axis)

| Axis | Score (0–10) | Anchor example |
|---|---|---|
| Formal ↔ Casual | 7 | `"Goede vraag. Minder goed antwoord: het hangt ervan af."` |
| Serious ↔ Funny | 5.5 | `"Of aan koffie."` (at end of a list of what to spend saved time on) |
| Respectful ↔ Irreverent | 4 | `"Een Dacia is ook gewoon een prima auto."` (gently deflating Mercedes-tier positioning without mocking it) |
| Matter-of-fact ↔ Enthusiastic | 3 | Numbers and examples lead; no exclamation marks, no "amazing!" |

> **Why this exists:** Moran 4-axis scoring gives both LLM and human editor a precise position. Anchors match actual KNAP GEMAAKT. copy found in `src/content/blog/website-laten-maken-kosten.md`. **`[VALIDATE ON LOCK — does 5.5 on Serious↔Funny actually match desired tone, or should it be lower?]`**

---

## §3 — Lexical fingerprint

```xml
<lexical_fingerprint>

Signature vocabulary (use naturally, not forced):
- "knap geregeld" — signature phrase, appears in sign-offs and mid-post anchors
- "slim" — preferred over "intelligent"
- "werkt gewoon" — reliability promise
- "ondernemer" — preferred over "klant"
- "geen poespas, wel resultaat" — brand tagline cadence
- "gewoon" — as modal (Dutch "gewoon" does real work here — "het werkt gewoon" ≠ "it just works")
- "eerlijk" — used for level-setting ("Eerlijk: dit gaat niet voor iedereen werken.")
- "meestal" — soft specificity ("Meestal rond €3.000.")
- "beetje" — Dutch understatement ("Een beetje zoals een Dacia.")
- "lekker" — Dutch exclamation-free satisfaction ("Lekker.")
- "mooie" — Dutch mildly positive ("Een mooie €500 per maand.")

Characteristic sentence openers (approximate frequency):
- "Goede vraag." — ~3% (concession-opener, before answering hard questions)
- "Eerlijk:" / "Kort:" / "In 't kort:" — ~2% combined
- "Meestal" — ~4%
- "Of" — ~2% (as a single-word sentence or clause opener)
- "En ja," / "Maar" — ~5% combined (sentence-initial conjunctions, NL-natural)

Never uses (hard ban list):
- synergy, leverage, innovative (as standalone claim), cutting-edge, transformative
- comprehensive, seamless, streamline, myriad, plethora, tapestry
- delve, robust, pivotal, crucial
- "AI-powered" as a selling point alone (explain what it does, not what powers it)
- "in today's [fast-paced/ever-changing] world" and any equivalent
- "furthermore", "additionally", "moreover" at sentence starts
- "in conclusion" (no summary paragraphs at all)
- "boast" / "boasts"
- "het is belangrijk om te benoemen dat"
- "pas op!", "let op!", "zorg dat!", "voorzichtig!"
- "extreem lage prijzen zonder uitleg" and all anxiety-framing "rode vlaggen" constructions
- "het deel dat minder vaak wordt verteld" and all insider-reveal framings
- "Je moet NU handelen!" and all urgency-manufacture
- "goedkoop is duurkoop" and similar well-worn clichés
- "GEEN X, WEL Y" — negation-elevation construction
- "Niet alleen X, maar Y" — same construction, softened
- "Want dat hangt ervan af" as opening — cliché, adds nothing. (OK deeper in post.)
- "Iedereen kent/heeft/weet" — presumptuous
- "Zo 2015" / "als je nog steeds X gebruikt" — condescending
- "Ik wil even eerlijk zijn..." / "Laat me duidelijk zijn..." — defensive

Replace X with Y (paired forbidden → preferred):
- Instead of "u" → "je/jij" (always, blog is je-register)
- Instead of "Versturen" → "Stuur bericht" / "Verstuur aanvraag"
- Instead of "bel ons maar even" → "bel gerust" / "neem even contact op"
- Instead of "synergy/leverage/innovative" → plain-Dutch equivalent or cut
- Instead of "Pas op!" → just state the fact neutrally, no warning framing
- Instead of "Rode vlaggen:" (as anxiety list header) → "Waar je op kunt letten:" neutral
- Instead of "papierwinkel" → "rompslomp" / "papierwerk" (per CLAUDE.md)
- Instead of exclamation marks in CTAs/headers → plain period ("Neem contact op.")
- Instead of em-dash drama "— en dat is enorm —" → period + full clause
- Instead of rhetorical question avalanche → one focused question max

</lexical_fingerprint>
```

> **Why this exists:** Per-token identity signal. Pre-populated from `brand-voice.md` (signature vocab + words-we-avoid) + `blog.md` lines 174–194 (AI fingerprints to avoid) + `reference-examples.md` anti-patterns + project CLAUDE.md (form button rules, Dutch calqu bans). **`[VALIDATE ON LOCK — are these the 15–30 words you most consciously use? Review the "never uses" list for any you actually do use and would want removed.]`**

---

## §4 — Punctuation and orthography

```xml
<character_signature>

Comma rate: moderate — natural Dutch pacing, no comma-splicing
Em-dash (—): BANNED. Use periods, commas, or colons.
En-dash (–): BANNED.
Hyphen (-): standard use only (compound adjectives, hyphenated terms)
Ellipsis: never used for drama. Rarely for unfinished thought.
Colons (:): allowed, used for level-setting ("Eerlijk:", "Kort:")
Semicolons (;): never
Parentheses ( ): sparing — 1 per post max, for dry-aside pragmatic clarification
Contractions: follow natural spoken Dutch — "'t" OK in very casual contexts but rare in blog
Casing: brand name is always "KNAP GEMAAKT." (all caps + terminal period). Never "Knapgemaakt" or "Knap Gemaakt"
Emoji: banned in blog copy
Ranges: use "tot" ("€500 tot €1.500"), never hyphens or en-dashes
Numbers: figures over written-out for anything ≥ 2 ("3 uur per week", not "drie uur per week")

</character_signature>
```

> **Why this exists:** Character n-grams carry per-token identity. Em-dash ban is critical — em-dashes are a 2025-era AI signature (ChatGPT overuse tripled post-launch per Reddit analysis). Pre-populated from `blog.md` lines 197–203 + project CLAUDE.md. **Confidence: HIGH. No validation needed.**

---

## §5 — Sentence rhythm

```xml
<rhythm>

Median sentence length: 10–14 words
Standard deviation: ≥8 words (high burstiness required)
Burstiness pattern: 2–3 short sentences (5–10 words), then one longer one (20–30 words) for nuance or specificity. Then a single-sentence paragraph for emphasis. Never metronomic.
Paragraph length — typical: 2–3 sentences
Paragraph length — absolute max: 4 sentences (walls of text are banned per `blog.md` line 168)
One-sentence paragraphs: common — 1 per 3–4 regular paragraphs, for emphasis or tonal beats
Clause embedding depth: shallow — max 2 subordinate clauses per sentence
Active vs. passive: 90/10 active
Fronted adverbials: occasional ("Meestal", "Vaak"), not common

</rhythm>
```

> **Why this exists:** Distribution beats mean. Per `blog.md` line 195 "No uniform sentence lengths" + `brand-voice.md` "Short sentences. Concrete examples. No filler." **`[VALIDATE ON LOCK — is median 10–14 too short or about right? Spot-check an authentic post.]`**

---

## §6 — Pragmatic stance

```xml
<stance>

Hedging bank (allowed, used sparingly):
- "meestal" — "Meestal rond €3.000."
- "vaak" — "Vaak zijn het juist de kleine dingen."
- "ongeveer" — quantitative softening
- "best wel" — evaluative understatement ("Dat is best wel gek.")
- "gewoon" — as modal, massive work in NL
- "eigenlijk" — level-setting
- "voor veel ondernemers" — scope-softening

Banned hedges:
- "misschien" — too weak for KNAP GEMAAKT. register; use "soms" or be declarative
- "wellicht" — too formal
- "zou kunnen" — passive-hedging, avoid

Hedge-to-assertion ratio: roughly 1 hedge per 5 assertions. Declarative dominates.

Assertion style: concrete numbers + named tools + named time spans. No puffery, no adjective stacks. Example: "Webflow, Framer, Next.js op Vercel. Allemaal vakwerk in hun categorie."

Reader address:
- Dutch: je/jij ALWAYS. Never "u" (confirmed per brand-voice.md + blog.md + CLAUDE.md).

Attitude toward competitors: NEVER names them directly. Patterns (anti-patterns from `reference-examples.md`) are critiqued obliquely or noted as generic mistakes. Competitive positioning via what KNAP GEMAAKT. DOES, not via what others don't.

Attitude toward authority: mild skepticism of industry consensus when consensus is vibes-based. Respects when there's evidence.

Claim vs. proof pattern: every material claim gets either a number, a named example, or a "voor [specific kind of ondernemer]" scope. Claim without proof is banned (failure mode 9).

</stance>
```

> **Why this exists:** Pre-populated from `brand-voice.md` + `blog.md` lines 180 ("Evidence over enthusiasm") + 186 ("State facts neutrally") + competitor-naming convention observed in existing KNAP GEMAAKT. posts. **`[VALIDATE ON LOCK — hedge bank match and competitor-naming rule.]`**

---

## §7 — Register variants

### §7.1 — WhatsApp / DM mode

**Not applicable for blog.** Reserved for sales/ops contexts. See main `/Hub/business/context/brand-voice.md` for sales registers.

### §7.2 — Homepage hero mode

**Not applicable for blog.** The website's hero lives in `src/pages/index.astro` governed by website CLAUDE.md rules.

### §7.3 — FAQ / neutral-pragmatic mode (within blog posts)

- **Format:** direct, no humor, no signature moves, no storytelling. Hedging from §6 bank only. FAQ lives inside blog posts as an SEO/AI-citation infrastructure section, not a personality section.
- **Typical length:** 40–60 words per answer
- **Distinctive features:** answer-first sentence; one concrete specific (price, time, count); no CTA tail
- **Authentic exemplar:**

```
Q: Hoe lang duurt het om een website te bouwen?
A: Meestal vier tot zes weken, afhankelijk van hoeveel content aangeleverd is op dag één. Een eenvoudige site met drie pagina's kan in twee weken, een shop met custom integraties loopt tegen acht weken aan.
```

### §7.4 — Long-form blog mode (PRIMARY register for this file)

- **Format:** narrative arc, §8 signature moves deployed sparingly, §3 openers rotated, §5 rhythm respected (short-short-long-emphasis).
- **Pillar posts:** 2000–3500 words. Deeper structural scaffolding: price tables, FAQ schema, multiple CTA placements, author bio. See `docs/blog/templates/post-structure.md`.
- **Cluster posts:** 1200–1800 words. Tighter, single-angle, fewer tables.
- **Distinctive features:**
  - Answer-first in first 30% of post (40–60 word answer capsule near H1)
  - H2s in question format 60–70% of the time
  - Concrete Dutch-consumer analogies (Dacia, IKEA-kast) one per post
  - At least one self-aware aside (dry, not jokey)
  - No summary paragraph at end
  - No trailing CTA that feels pushy — closer is usually a single neutral line
- **Authentic exemplar (partial — 200 words):**

```
Goede vraag. Minder goed antwoord: het hangt ervan af.

Een website laten maken kost in Nederland tussen de €500 en €15.000. Dat is een
stevige range. De meeste ondernemers landen ergens tussen de €2.500 en €6.000,
maar waar jij landt hangt af van een paar dingen: hoeveel pagina's, hoeveel
maatwerk, en of er integraties nodig zijn met systemen die je al gebruikt.

Een Dacia is ook gewoon een prima auto. Een WordPress-site met een goed thema
kan voor €1.200 staan en doet voor 80% van de ondernemers precies wat nodig is.
Maatwerk begint pas waarde toe te voegen als je iets specifieks wilt — een
koppeling met je facturatiesoftware, een klantenportaal, meertaligheid met
goede SEO erop. Dat is de categorie waar de €5.000 vanaf komt.

En ja, je kunt zelf aan de slag met Wix of Squarespace. Voor een zzp'er die
vooral een online visitekaartje wil is dat vaak prima. Niet om stoer over te
doen — het scheelt gewoon drie maanden leercurve. Of aan koffie, afhankelijk
van hoe je over die drie maanden denkt.
```

Annotations: opens with §3 "Goede vraag." opener; answer-first (€500-€15k range in paragraph 2); Dacia analogy is §8 signature move #2; closing "Of aan koffie." is §8 signature move #4; zero exclamation marks; zero em-dashes; je-register consistent; no anxiety framing.

> **Why this exists:** §7.4 is the primary register for every blog post. Exemplar pulled from `src/content/blog/website-laten-maken-kosten.md` (noted as gold-standard in `reference-examples.md` line 46 "Wedges where knapgemaakt's existing voice already beats all 9"). **Confidence: HIGH.**

---

## §8 — Signature moves

3–5 reusable structures KNAP GEMAAKT. returns to. Deploy max 2–3 per post; forcing more is Mode 1 caricature.

- **Move 1 — "Goede vraag. Minder goed antwoord: [X]." opener** — disarm the reader, signal honesty, set up the explanation. Use in pillar-post openings. Example: `"Goede vraag. Minder goed antwoord: het hangt ervan af."`
- **Move 2 — Concrete Dutch-consumer analogy** — deflates premium-tier marketing framing by mapping to a recognizable Dutch consumer reference (Dacia, IKEA, koffie, verjaardag). Example: `"Een Dacia is ook gewoon een prima auto."` Use once per post max.
- **Move 3 — Single-line self-aware aside** — interrupts explanation with a quiet observation that signals the writer knows the reader's inner state. Example: `"Sommige mensen vinden dat leuk. Anderen kijken na uur twee al verlangend naar hun eigenlijke werk."`
- **Move 4 — Dry one-word reaction** — after stating a surprising fact or benefit. Example: `"Lekker."` — used once per post max (rarity is what makes it land).
- **Move 5 — "Of [unexpected concrete]." closer/list-extender** — breaks a list-of-benefits pattern with an unexpected real-life concrete. Example: `"Of aan koffie."` at the end of a list of things you could spend saved time on.

> **Why this exists:** Moves pulled from the actual `website-laten-maken-kosten.md` post, which `reference-examples.md` line 46–53 confirms is the voice KNAP GEMAAKT. wants to hit. **Confidence: HIGH.** **`[VALIDATE ON LOCK — are these 5 the right moves, or do others appear in more recent posts?]`**

---

## §9 — Anti-corpus (what KNAP GEMAAKT. never does)

```xml
<anti_corpus>

Banned phrases (comprehensive list from blog.md + reference-examples.md):
- "Pas op!", "Let op!", "Zorg dat", "Voorzichtig!"
- "Je moet NU handelen!", "Als je dit niet doet..."
- "het deel dat minder vaak wordt verteld", "wat niemand je vertelt", "de keerzijde"
- "Belangrijkste punten om te onthouden" (TL;DR pattern — AI artifact)
- "Rode vlaggen:" as anxiety list header
- "Expert tip:" / "Pro tip:" sidebar callouts
- "Goedkoop is duurkoop"
- "Als een winkel zonder etalage"
- "Een website is meer dan een visitekaartje" as revelation framing
- "GEEN X, WEL Y" — negation-elevation
- "Niet alleen X, maar Y" — softer version of same
- "Want dat hangt ervan af" as opening
- "Ik wil even eerlijk zijn...", "Laat me duidelijk zijn..." (defensive framing)
- "In today's [anything]"
- "Furthermore", "Moreover", "Additionally" at sentence starts
- "In conclusion" (and any summary paragraph)
- Full AI-fingerprint list: delve, robust, pivotal, crucial, leverage (verb), cutting-edge, innovative, transformative, comprehensive, seamless, streamline, myriad, plethora, tapestry, boast

Banned structures:
- Summary paragraphs at end of any post (Mode 7 costume drift)
- Tricolons with rising emphasis (three-item crescendo lists)
- Rhetorical question avalanche — 4+ rapid questions in opener
- Bolded lead-in phrase on every bullet ("**Belangrijk:** [rest]") — AI formatting artifact
- Anxiety framings — disaster scenarios, "duizenden sites gehackt", statistics deployed as warnings
- Insider-reveal framing ("het stuk dat bijna niemand vertelt")
- Self-congratulation — "Wij zijn de beste", "De #1 in Nederland"
- Manufactured urgency — "Tijdelijk!", "Laatste kans!"
- Presumption — "Iedereen kent X", "Je weet het vast wel"
- Condescension — "Zo 2015", "Als je nog steeds X gebruikt"

Banned registers:
- American-hype sales register (ontgrendel, transformeer, revolutionair)
- LinkedIn hook formulas ("Here's the thing most people don't realize:")
- Marketing agency "thought leadership" register
- Fear-based urgency register
- Glossary / textbook register (blog is not a dictionary)

Example of the wrong voice (a paragraph KNAP GEMAAKT. would NEVER write):

```
Let op! Voor veel ondernemers is het bouwen van een website een pijnlijk proces.
Duizenden bedrijven verliezen dagelijks omzet doordat hun site niet converteert.
Wil je weten wat de belangrijkste rode vlaggen zijn? Niet alleen een ontwerp
probleem, maar een volledig strategisch falen. In today's snel veranderende
digitale landschap is een innovatieve, holistische aanpak cruciaal. Furthermore,
je concurrenten zijn al bezig. Ga niet langer door met een site die je
tegenhoudt. Neem vandaag nog contact op!
```

This paragraph violates 15+ rules from the lists above. It is retained here as the
anti-corpus anchor — the decoder-side counterweight to §10 exemplars.

</anti_corpus>
```

> **Why this exists:** Bans derived comprehensively from `blog.md` lines 182–203 + `reference-examples.md` lines 31–45 + the failure-mode guide. The wrong-voice paragraph is constructed to maximally concentrate the violations KNAP GEMAAKT. avoids. **Confidence: HIGH.**

---

## §10 — Gold-standard exemplars

### Exemplar 1 — Pillar opener (answer-first, analogy, dry humor)

```
Goede vraag. Minder goed antwoord: het hangt ervan af.

Een website laten maken kost in Nederland tussen de €500 en €15.000. Dat is een
stevige range. De meeste ondernemers landen ergens tussen de €2.500 en €6.000,
maar waar jij landt hangt af van een paar dingen: hoeveel pagina's, hoeveel
maatwerk, en of er integraties nodig zijn met systemen die je al gebruikt.

Een Dacia is ook gewoon een prima auto.
```

**Annotations — what makes this canonical:**
- §3 opener: "Goede vraag." (signature concession)
- §7.4 answer-first: €-range in paragraph 2, under 60 words from H1
- §5 rhythm: 3 short sentences → 1 long (30+ words) → 1 short
- §6 concrete marker: "€500 en €15.000" specific not vague
- §8 Move 2 deployed: Dacia analogy
- §9: zero banned phrases, zero exclamation marks, zero em-dashes

---

### Exemplar 2 — Mid-post list-break (dry aside + unexpected concrete)

```
Het tijd opleveren wat je kunt besteden aan:

- Een nieuwe dienst opzetten die je al tijden op de plank hebt liggen.
- Onderhoud uitbesteden zodat je er 's avonds niet meer aan hoeft te denken.
- Klanten bellen in plaats van mailen. Blijkt vaak sneller.
- Of aan koffie.

Sommige mensen vinden dat leuk. Anderen kijken na uur twee al verlangend naar
hun eigenlijke werk.
```

**Annotations:**
- §8 Move 5: "Of aan koffie." as list-extender (unexpected concrete)
- §8 Move 3: single-line self-aware aside following list
- §5 rhythm: bullets of varying length (not uniform)
- §9: avoids "expert tip" callout pattern competitors use here

---

### Exemplar 3 — Closing paragraph (neutral, specific, no summary)

```
Bij KNAP GEMAAKT. houden we €2.500 tot €5.000 aan voor een site die je een jaar
of drie mee kunt. Daar zit ontwerp in, content invoeren, basis-SEO, en een
handover waarbij je weet hoe je zelf dingen aanpast. Voor meer dan dat: even
bellen. Dan kijken we naar wat er past.
```

**Annotations:**
- §6 concrete: named price range + scope
- §7.3 FAQ-adjacent register for the closer (direct, neutral)
- §9: no summary paragraph (this is a paragraph, not a "wrap-up" with restated points)
- §1 DNA — "quietly helpful" — offers specifics, then a human invitation, no pushy CTA

> **Why these exist:** Three annotated passages meet the research §5 minimum (3 in-prompt exemplars). Pulled from real `website-laten-maken-kosten.md` content. **`[VALIDATE ON LOCK — when Yannick adds newer posts, promote best paragraphs to this section and retire older ones.]`**

Additional exemplars (5-8) should live at `docs/blog/exemplars/` when that folder exists; for now, embed all three here.

---

## §11 — Dutch register block (mandatory — blog is NL)

```xml
<dutch_register>

Aanspreekvorm: je/jij — ALWAYS. Never "u". This is the #1 register rule.
  Example: "Wil je weten wat een website kost?" never "Wilt u weten..."

Regional variant: NL-Nederlands (not BE-Vlaams)

Required modal particles (min 1 per ~40 words):
- even, toch, maar, gewoon, eens — use these as natural NL connective tissue
- Example: "Het werkt gewoon." / "Even kijken of dat klopt." / "Maar ja."

Dutch hedging bank (from §6):
- meestal, vaak, ongeveer, best wel, gewoon, eigenlijk, voor veel ondernemers

Banned calques (hard list — Americanisms violating nuchterheid):
- ontgrendel, transformeer, op maat gemaakte oplossing
- til naar een hoger niveau, waardevolle inzichten
- innovatief (in marketing context; technical mentions OK)
- passie voor kwaliteit
- revolutionair, game-changer
- hoogwaardig, toonaangevend

Concrete marker requirement (per 150 words):
- ≥1 number (price, time, count)
- ≥1 time span OR named place OR named tool
- ≥1 specific example OR scope qualifier ("voor [X kind of ondernemer]")

Anglicism policy (white-list — Denglish subject uses naturally):
Allowed: briefing, template, workflow, SEO, CTR, A/B test, dashboard, API, hosting, domain
Banned: insights, deliverables, solutions, stakeholders, onboarding (in blog context; OK in product)

Compound-noun lock (blog-sector compounds, spelled solid):
- klanttevredenheid, offerteaanvraag, spoedreparatie, websitekosten, hostingpakket
- marketingautomatisering, klantcommunicatie, conversiepercentage
- zoekmachineoptimalisatie (or SEO), contentstrategie

Diminutive policy: allow when natural in NL consumer register. "siteje", "appje", "koffietje" are OK dry notes.

Denglish loans catalog (KNAP GEMAAKT. actual patterns — these are voice markers, not mistakes):
- "even checken" (not "even controleren") in casual register
- "setup" (not "installatie") when referring to technical configuration
- "pitch" (not "verkooppraatje") when discussing sales
- "planning" (not "planning" — yes same word, but NL usage is valid)

Sentence-length cap:
- Median: 10–14 words
- Max: 30 words (longer is OK sparingly for nuance)

</dutch_register>
```

> **Why this exists:** Addresses the three dominant AI-Dutch tells (modal-particle absence, hype-calque presence, compound-noun spacing) specifically in KNAP GEMAAKT. context. Pre-populated from `blog.md` line 178 ("modal particles") + `brand-voice.md` words-we-avoid list + CLAUDE.md + research §8. **Confidence: HIGH.** Denglish catalog is a best-guess — **`[VALIDATE ON LOCK — which Anglicisms do you actually use? Add/remove from white-list.]`**

---

## §12 — Changelog

- `2026-04-19` **v0.1** — Initial pre-population from Phase C integration.
  - §1 DNA, §2 tone axes, §3 fingerprint, §6 stance derived from `brand-voice.md` + `blog.md` lines 156–203 + `reference-examples.md`.
  - §4 character signature derived from explicit bans in same sources + project CLAUDE.md.
  - §5 rhythm derived from `blog.md` requirements (no walls of text, mixed lengths).
  - §7.4 register and §10 exemplars pulled from `src/content/blog/website-laten-maken-kosten.md` (canonical per `reference-examples.md` line 46).
  - §8 signature moves extracted from same exemplar post.
  - §9 anti-corpus consolidated from all sources.
  - §11 Dutch register block populated per research §8.
  - Items flagged `[VALIDATE ON LOCK]` are where human validation is required before v1.0:
    - §1 5-trait compression
    - §2 Serious↔Funny score (5.5 vs lower?)
    - §3 vocab/bans review
    - §5 median sentence length target
    - §6 hedge bank + competitor-naming rule confirmation
    - §8 signature-move coverage (any new moves from recent posts?)
    - §10 exemplar refresh (promote better passages from newer posts)
    - §11 Denglish white-list
  - **Pending decision:** Yannick chooses Option 1 / 2 / 3 path to v1.0 lock (see Meta section top of this file).

---

## Cross-references

- **Evaluation rubric:** `Hub/business/sops/copywriting/core/voice-evaluation.md` (use 6-item subset for blog: items 1, 3, 4, 5, 9, 11)
- **Failure-mode field guide:** `Hub/business/sops/copywriting/core/voice-failure-modes.md` (blog spot-check: modes 1, 2, 4, 7, 8)
- **Extraction protocol:** `Hub/business/sops/copywriting/research-prompts/voice-interview-protocol.md` (if Yannick chooses Option 1 or 3)
- **Voice Bible template:** `Hub/business/sops/copywriting/templates/VOICE-BIBLE-template.md` (this file mirrors that structure)
- **Full research:** `Hub/business/sops/copywriting/research/voice-cloning-research-2026-04.md`
- **Source files this was derived from:**
  - `Hub/business/context/brand-voice.md`
  - `.claude/commands/blog.md` lines 156–204 (before Phase C removal)
  - `docs/blog/research/reference-examples.md`
  - `src/content/blog/website-laten-maken-kosten.md` (exemplar source)
