import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Pure Harvest",
        short_name: "Pure Harvest",
        description: "MERN Stack",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/icons/logo-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/logo-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/logo-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist'
  }
})
