import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://dubproject-production.up.railway.app",
      "/uploads": "https://dubproject-production.up.railway.app"
    }
  }
});
