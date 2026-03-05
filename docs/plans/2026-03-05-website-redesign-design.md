# KNAP GEMAAKT. Website Redesign - Design Document

**Date:** 2026-03-05
**Status:** Approved
**Goal:** Redesign knapgemaakt.nl from bold/expressive creative studio to warm, trustworthy professional — targeting tech-unsavvy local business owners (starting with hoveniers) while maintaining cutting-edge polish that proves competence.

---

## Context & Strategy

### Business Direction
- Cold email outreach to 200+ hoveniers in 20km radius starting soon
- Service evolution: affordable AI-generated websites for local businesses, custom Shopify themes, future custom tools/dashboards
- No portfolio/testimonials yet — design quality IS the proof of competence
- Website must convert warm leads who click through from cold emails

### Target Audience
- Local business owners (hoveniers, loodgieters, schilders, etc.)
- Tech-unsavvy — need to feel trust, not be impressed by tech jargon
- Looking for: professionalism, clarity, personal connection

### Trust Triangle (Top 3 Signals)
1. **Professionalism** — clean design, no gimmicks, feels like a "real" business
2. **Process clarity** — "this is exactly what happens when you work with me"
3. **Personal connection** — your face, your story, "ik ben Yannick uit Buren"

---

## Visual Identity & Design System

### Color System

| Role | Value | Usage |
|------|-------|-------|
| Canvas (primary) | `#FAFAF8` | Main background — warm off-white |
| Canvas (alt) | `#F5F3EF` | Alternating sections — warm light gray |
| Ink (primary) | `#1A1A1A` | Primary text — soft black |
| Ink (secondary) | `#4A4A4A` | Secondary/body text |
| Accent: Acid | `#CCFF00` | Micro-accents only: dot indicators, underlines, hover glows, icon highlights. NEVER full buttons or section backgrounds |
| Accent: Electric | `#7C3AED` | Even more sparingly: gradient touches, link hovers |
| Warm neutral | `#E8E4DE` | Borders, cards, subtle dividers |
| Dark section | `#1A1A1A` | Footer, closing CTA section |

### Typography
- **Font:** Inter Tight (keep existing brand font)
- **Weights:** Use `font-bold` (700) more than `font-black` (900)
- **Leading:** `leading-snug` instead of `leading-[0.9]` — more relaxed
- **Uppercase:** Only for small labels, NOT full headings
- **Body size:** 18px base for readability
- **Line length:** Limit to 65-75 characters per line

### Component Style
- **Cards:** Subtle warm borders (`border-[#E8E4DE]`), slight shadow on hover, no harsh black backgrounds
- **Buttons:** Primary = soft black (`#1A1A1A`) with white text. Secondary = outlined. Acid green NEVER as full button fill — only as hover glow or small indicator
- **Spacing:** Generous — more breathing room than current design
- **Grid backgrounds:** Remove or make much subtler
- **Border radius:** Slightly rounded (8-12px), not sharp, not pill-shaped
- **Transitions:** 150-300ms, ease timing

### Animation Guidelines
- Subtle entrance animations (fade-up on scroll) via Intersection Observer
- All animations respect `prefers-reduced-motion`
- No continuous bouncing/spinning decorative animations
- No parallax scrolljacking
- No 3D/WebGL effects
- Total ~6-8 animated moments across the whole site
- CSS animations preferred over JS where possible
- Keep Lenis smooth scroll (already integrated)

---

## Site Structure

### Pages (New)

| Page | URL | Purpose |
|------|-----|---------|
| Homepage | `/` | Main conversion funnel: Problem > Capability > Process > About > CTA |
| Wat ik doe | `/wat-ik-doe/` | Detailed capabilities without pricing |
| Over mij | `/over-mij/` | Personal story, trust through human connection |
| Contact | `/contact/` | Form + booking calendar + direct contact details |
| Blog | `/blog/` | Keep as-is, visual refresh only |
| Blog posts | `/blog/[slug]/` | Keep as-is, visual refresh only |
| City pages | `/webdesign-[city]/` | Keep as-is for SEO, visual refresh only |
| Landing: Hoveniers | `/website-voor-hoveniers/` | NEW — focused conversion page for cold email campaign |
| Privacy | `/privacy/` | Keep as-is |
| Algemene voorwaarden | `/algemene-voorwaarden/` | Keep as-is |
| Sitemap | `/sitemap/` | Keep as-is |

### Pages to Remove (with redirects)
- `/website-laten-maken/` → redirect to `/wat-ik-doe/`
- `/automations/` → redirect to `/wat-ik-doe/`

### Navigation
- **Header:** Logo | Wat ik doe | Over mij | Blog | Contact (CTA button)
- **Mobile:** Hamburger menu with warm, clean overlay (no black fullscreen)

---

## Homepage Structure

### Section 1: Hero
- Clean warm background (`#FAFAF8`)
- Bold headline addressing the visitor's problem: "Jouw bedrijf verdient een website die werkt"
- Short subline (1 sentence) positioning who you are and who you help
- Single primary CTA button
- NO typing rotator — clarity over cleverness
- Modern touch: soft animated gradient orb behind headline

### Section 2: Problem Recognition ("Herken je dit?")
- 3-4 pain points in clean card grid
- Examples: verouderde website, niet vindbaar op Google, betaalt te veel, weet niet of website iets oplevert
- Warm, empathetic tone
- Modern touch: cards with glassmorphism on hover, fade-up entrance animation

### Section 3: Capability Grid ("Wat ik voor je kan doen")
- Visual bento grid (varying card sizes) — NOT boring uniform grid
- Cards: icon + title + short description
- Services: Websites op maat, Webshops, Online zichtbaarheid, Tools & dashboards
- Acid green dot accent on each card
- CTA: "Benieuwd wat dit voor jou kost?" > contact link

### Section 4: Process ("Zo werkt het")
- Trust centerpiece — animated 3-4 step timeline
- Steps: Kennismaking > Voorstel > Bouw > Live
- Modern touch showpiece: animated stepper with drawing line, acid green dots activating on scroll
- Each step: 1-2 sentence description

### Section 5: About ("Wie ik ben")
- Photo + name + city
- 2-3 personal sentences
- Trust badges: KVK-geregistreerd, Based in Rivierenland
- Link to full about page
- Modern touch: image with organic blob mask or subtle parallax

### Section 6: CTA ("Laten we kennismaken")
- Dark section (`#1A1A1A`) for visual closure
- Direct invitation
- Simple form or link to contact page
- Small acid green accent

---

## Other Pages Detail

### Wat ik doe
- Expanded capability sections (Websites, Webshops, Online zichtbaarheid, Tools & dashboards)
- No pricing — each section ends with soft CTA to get in touch
- Modern touch: bento grid or tabbed interface for overview

### Over mij
- Lead with who you are and why, not technical background
- Prominent warm portrait photo
- Values reframed for audience (business-focused, not tech philosophy)
- Small tools/tech section at bottom (Astro, Cloudflare, Shopify logos)

### Contact
- Clean form: name, email, phone (optional), message
- Booking calendar (keep existing React component)
- Direct contact details visible (email, phone, KVK)
- Local grounding: "Gevestigd in Buren, werkzaam door heel Nederland"

### Landing Page: `/website-voor-hoveniers/`
- Separate conversion page — minimal/no navigation to rest of site
- Hero speaking directly to hoveniers
- 3 hoveniersspecific pain points
- Solution with visual mockup
- Simplified 3-step process
- Single CTA: "Plan een gratis kennismaking"
- Duplicable template for future niches (loodgieters, schilders, etc.)

---

## Modern Component Touches (21st.dev / Uiverse inspired)

| Location | Component | Purpose |
|----------|-----------|---------|
| Hero | Soft animated gradient orb | Subtle life — "this is alive, not a template" |
| Problem grid | Glassmorphism cards on hover | Premium feel without overwhelming |
| Capability grid | Bento grid with varying sizes | Dynamic, designed layout |
| Process timeline | Animated stepper with drawing line | Trust showpiece — acid green dots activate on scroll |
| About section | Image with organic mask/soft parallax | Intentional, designed feel |
| Contact form | Floating labels with focus transitions | Inputs feel alive and polished |
| Landing page hero | Animated text reveal | Creates attention moment |
| Footer | Large KNAP GEMAAKT. with subtle gradient | Brand reinforcement — electric purple to acid green |

### Rules
- Max 6-8 animated moments across entire site
- CSS-first approach (better performance)
- React only where interactivity requires it
- Every animation earns its place — no decoration for decoration's sake
- All respect `prefers-reduced-motion`

---

## Technical Notes

### Stack (unchanged)
- Astro 5 + React 19 + Tailwind CSS v4
- Cloudflare Workers (SSR)
- Lenis smooth scroll

### Key Changes
- Update `global.css` theme variables for new color system
- Remove/soften grid backgrounds
- Update component styles throughout
- New page: `/wat-ik-doe/`
- New page: `/website-voor-hoveniers/`
- Redirect: `/website-laten-maken/` > `/wat-ik-doe/`
- Redirect: `/automations/` > `/wat-ik-doe/`
- Update Header navigation items
- Update Footer to match warm design

### SEO Considerations
- Blog content stays untouched
- City pages stay untouched (visual refresh only)
- Proper 301 redirects for removed pages
- Keep all existing schema markup
- Update meta descriptions for new pages
