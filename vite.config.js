import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/movies-and-favourite-/',  // Base URL for GitHub Pages
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'icons/*'],
      manifest: {
        name: 'Movie Search & Favorites',
        short_name: 'MovieSearch',
        description: 'Search movies, view details, and save your favorites',
        theme_color: '#0f1724',
        start_url: '/',
        icons: [
          {
            src: '            src: '/movies-and-favourite-/icons/icon-192x192.png',',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/www\.omdbapi\.com/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'omdb-api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ]
});