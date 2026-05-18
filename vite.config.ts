import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    target: 'ES2020',
    minify: 'terser',

    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('recharts')) {
              return 'charts'
            }

            if (
              id.includes('date-fns') ||
              id.includes('jwt-decode') ||
              id.includes('framer-motion')
            ) {
              return 'utils'
            }

            return 'vendor'
          }
        },
      },
    },

    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
  },

  server: {
    port: 5173,
    open: true,
    cors: true,
  },
})