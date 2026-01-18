# knapgemaakt.nl

A modern B2B booking system with integrated calendar functionality built with Astro, React, and Tailwind CSS.

## Overview

knapgemaakt.nl is a professional booking platform designed for service providers and their clients. The system features an in-house calendar booking interface with real-time scheduling capabilities.

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
├── public/              # Static assets (images, robots.txt, etc.)
├── src/
│   ├── components/      # Reusable React and Astro components
│   ├── layouts/         # Page layouts
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

This project is deployed via Cloudflare Pages. Pushes to the `main` branch automatically trigger production deployments.

## License

MIT - See LICENSE file for details

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
