import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  // Enable Solid to support Solid JSX components.
  integrations: [solid({
    include: ['**/components/**/*'],
  }), tailwind(

  ), react({
    include: ['**/solar-components/**/*'],
  }),
],
});