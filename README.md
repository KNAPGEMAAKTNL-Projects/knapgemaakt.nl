# knapgemaakt.nl

The marketing website for **KNAP GEMAAKT.**, a Dutch web design agency delivering professional websites in 7 days for €595.

## Overview

KNAP GEMAAKT. ("Beautifully Made" in Dutch) is a web design agency targeting Dutch small businesses who need a professional online presence without the long timelines and high costs of traditional agencies. The website showcases:

- **Value proposition**: Professional websites delivered in 7 days for a fixed price of €595
- **Portfolio**: Horizontal-scrolling showcase of completed projects
- **Service offerings**: Clear breakdown of what's included
- **Request form**: Simple intake process for potential clients

## Tech Stack

- **Framework:** Astro 5 with React components
- **Styling:** Tailwind CSS 4 + Tailwind Merge
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Scrolling:** Lenis for smooth scroll experiences
- **Font:** Inter Tight via Fontsource
- **Package Manager:** npm

## Project Structure

```
/
├── public/              # Static assets (images, favicon, robots.txt)
├── src/
│   ├── components/      # Reusable React and Astro components
│   ├── config/          # Site configuration (availability calendar)
│   ├── content/         # Astro content collections (blog posts)
│   ├── data/            # Static data (blog metadata, cities, projects)
│   ├── layouts/         # Page layouts (includes SEO meta tags)
│   ├── lib/             # Utility functions and helpers
│   ├── pages/           # Route pages (auto-routed by Astro)
│   └── styles/          # Global stylesheets
├── dist/                # Production build output
└── package.json         # Dependencies and scripts
```

Astro automatically creates routes from files in `src/pages/`. Learn more about [Astro's routing](https://docs.astro.build/en/core-concepts/routing/).

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or your preferred package manager

### Environment Setup

Copy the example environment file and configure your values:

```bash
cp .env.example .env
```

Required for full functionality:
- `RESEND_API_KEY` - For contact form email delivery

Optional analytics (GDPR-compliant, blocked until consent):
- `PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4
- `PUBLIC_META_PIXEL_ID` - Meta (Facebook) Pixel
- `PUBLIC_CLARITY_ID` - Microsoft Clarity
- `PUBLIC_LEADINFO_ID` - Leadinfo B2B tracking

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts a local dev server at `http://localhost:4321`. The site will hot-reload as you make changes.

### Building

```bash
npm run build
```

Creates a production-ready build in the `./dist/` directory.

### Preview

```bash
npm run preview
```

Preview your production build locally before deploying.

## Deployment

This project is deployed via Cloudflare Pages. Pushes to the `master` branch automatically trigger production deployments.

## License

MIT - See LICENSE file for details

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
