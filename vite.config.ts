import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimizaciones de build
    target: 'ES2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Code splitting para mejor caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'charts': ['recharts'],
          'utils': ['date-fns', 'jwt-decode', 'framer-motion']
        }
      }
    },
    // Optimización de assets
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
  },
  // Optimizaciones de desarrollo
  server: {
    middlewareMode: true,
  },
  // Optimizaciones generales
  esbuild: {
    target: 'ES2020',
    exclude: []
  }
})
