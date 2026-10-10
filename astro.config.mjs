// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.gracelakey.com',
  integrations: [
    sitemap({
      filter: (page) => !/^\/links\/?$/.test(new URL(page).pathname)
    })
  ],
  adapter: vercel()
});