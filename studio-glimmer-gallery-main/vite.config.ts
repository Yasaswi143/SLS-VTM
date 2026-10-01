import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlifyTanstackStart from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  vite: {
    plugins: [netlifyTanstackStart()],
  },

  nitro: {
    preset: "netlify",
  },

  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});