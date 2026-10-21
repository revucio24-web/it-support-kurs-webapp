import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

// BASE_PATH: für GitHub Pages unter /<repo>/, lokal leer lassen.
const base = (process.env.BASE_PATH ?? '').trim();

export default defineConfig({
  site: 'https://revucio24-web.github.io',
  base,
  trailingSlash: 'never',
  integrations: [mdx(), tailwind({ applyBaseStyles: true })],
  markdown: {
    shikiConfig: {
      theme: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
});
