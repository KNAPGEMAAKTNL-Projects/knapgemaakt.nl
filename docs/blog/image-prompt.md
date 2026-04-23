# Standing Image Prompt

Used by `/blog` Phase 5 and `/blog-refresh` Phase 4 (image-refresh case). Injects the post title into the `[TITLE]` slot and outputs a copy-paste prompt for Yanni.

## Generation flow

1. Claude outputs the filled-in prompt below.
2. Yanni pastes it into his image tool (ChatGPT image generation). No reference images attached — ChatGPT already has the KNAP GEMAAKT. character style in its context from prior sessions.
3. The image tool cannot write to disk, so Yanni saves the output manually (usually to `~/Downloads/...`) and pastes the path back into the session.
4. Claude converts + resizes to WebP 2048×1024 using ffmpeg, writes to `public/assets/blog/[slug].webp`, and confirms size is under 200KB.

## ffmpeg conversion command (Claude runs this)

```bash
ffmpeg -y -i "<source-path>" \
  -vf "scale=2048:1024:force_original_aspect_ratio=decrease,pad=2048:1024:(ow-iw)/2:(oh-ih)/2:color=black" \
  -q:v 80 \
  "C:/Code/clients/knapgemaakt.nl/public/assets/blog/[slug].webp"
```

Confirm output with `ls -l` — target is <200 KiB. If oversized, re-run with `-q:v 70` or lower.

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
