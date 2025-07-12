import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://suitmedia-backend.suitdev.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api'),
      },
    },
    '/image-proxy': {
        target: 'https://assets.suitdev.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/image-proxy/, ''),
      }
  }
})