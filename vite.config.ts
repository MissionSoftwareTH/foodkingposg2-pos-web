import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    allowedHosts: ['posking-server.poskingsolution.com'],
    host: "0.0.0.0",
    port: 3000,
  },
});
