import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import path from 'path';

export default defineConfig({
  site: 'https://independent-arts.org',
  integrations: [sitemap()],
  vite: {
    resolve: {
      alias: {
        '@styles': path.resolve('./src/styles'),
      },
    },
  },
});