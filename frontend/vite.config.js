import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    rollupOptions: {
      external: ['@heroicons/react'],
    },
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
