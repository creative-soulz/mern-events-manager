import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  server: {
    proxy: { "/api/": "http://localhost:5000" },
  },
  resolve: {
    alias: {
      '@heroicons/react': '/node_modules/@heroicons/react'
    }
  },
});
