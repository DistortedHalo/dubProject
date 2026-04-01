import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://dubsync-backend.vercel.app",
      "/uploads": "https://dubsync-backend.vercel.app"
    }
  }
});
