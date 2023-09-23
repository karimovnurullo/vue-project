import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    exclude: [
      "**/node_modules/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
    ],
    coverage: {
      exclude: [
        "**/src/store/**",
        "**/src/modules/auth",
        "**/src/modules/session.ts",
        "**/src/modules/home/mapper.ts",
        "**/src/pages/auth/login-token",
      ],
    },
  },
});
