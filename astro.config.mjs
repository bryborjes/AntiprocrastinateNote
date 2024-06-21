import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";
import node from "@astrojs/node";
import preact from "@astrojs/preact";
import preactHooks from "@astrojs/preact";

import preactJsxRuntime from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), preact(), preactHooks(), preactJsxRuntime()],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});