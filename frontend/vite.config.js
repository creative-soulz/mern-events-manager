import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { "/api/": "http://localhost:5000" },

  },
  resolve: {
    alias: {
      '@heroicons/react': require.resolve('@heroicons/react')
    }
  },
  build: {
    rollupOptions: {
      external: ['@heroicons/react'],
    },
  },
});
