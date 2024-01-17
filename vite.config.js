import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: 'auto',
      includeAssets: ['/favicon.ico'],
      manifest: {
        name: 'Encuesta BierFest',
        short_name: 'Encuesta',
        description: 'Encuesta para BierFest 2024',
        lang: 'es-ES',
        display_override: ['window-controls-overlay'],
        theme_color: '#242424',
        background_color: '#242424',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ]
})