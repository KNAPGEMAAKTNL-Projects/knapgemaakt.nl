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
