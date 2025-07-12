import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: `${import.meta.env.VITE_API_PATH}`,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api'),
      },
    },
    '/image-proxy': {
        target: `${import.meta.env.VITE_API_PATH_IMAGE}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/image-proxy/, ''),
      }
  }
})