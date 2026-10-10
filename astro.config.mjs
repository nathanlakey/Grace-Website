// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

const buildOnlyPackages = ['rolldown', '@vercel/routing-utils'];

// https://astro.build/config
export default defineConfig({
  site: 'https://www.gracelakey.com',
  integrations: [
    sitemap({
      filter: (page) => !/^\/links\/?$/.test(new URL(page).pathname)
    })
  ],
  adapter: vercel(),
  vite: {
    build: {
      rolldownOptions: {
        treeshake: {
          // @astrojs/vercel's runtime entrypoint imports constants from its build-time
          // index, which leaves bare `import "rolldown"` / `import "@vercel/routing-utils"`
          // in the serverless bundle. Neither is used at runtime, so let them be dropped.
          moduleSideEffects: (id, external) =>
            !(external && buildOnlyPackages.some((pkg) => id === pkg || id.startsWith(`${pkg}/`)))
        }
      }
    }
  }
});