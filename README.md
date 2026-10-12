# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Brand logo

Use `src/assets/brand/logo-coral-clean.svg` directly as an SVG for the nav,
section seals, photo-band seal, large gallery seal, and favicon. Do not rasterize
it or apply filters, opacity, or color overrides. The nav logo is 64px tall on
desktop and 52px at widths up to 768px; small seals are 48px.

## Photo band and footer layout

The photo band uses `src/assets/photos/photo-band-wide.jpg` as a full-width
image with `object-fit: cover` and `object-position: center 30%`, without a
background color or edge fade. It is 420px tall above 640px and 280px on phones.
The seal and footer content align with the centered 72rem page container,
with 1.5rem side gutters. Footer social links remain on the right on desktop.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
