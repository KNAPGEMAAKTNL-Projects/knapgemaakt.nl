// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: "https://knapgemaakt.nl",
  trailingSlash: "always",
  output: 'server', // Server-side rendering with Cloudflare Workers
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],

  experimental: {
    clientPrerender: true
  }
});
