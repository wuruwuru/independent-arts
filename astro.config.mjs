import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify/functions';
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: 'https://wuruwuru.com',
  adapter: netlify(),
  integrations: [sitemap()]
});