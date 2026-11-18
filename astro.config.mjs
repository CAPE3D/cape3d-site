import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://cape3d.github.io',
  base: '/cape3d-site',
  output: 'static',
  trailingSlash: 'never'
});
