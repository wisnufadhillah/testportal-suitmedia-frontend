import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load env variables from .env files
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        // Proxy untuk API
        '/api': {
          target: env.VITE_API_PATH,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api'),
        },
        // Proxy untuk gambar
        '/image-proxy': {
          target: env.VITE_API_PATH_IMAGE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/image-proxy/, ''),
        }
      }
    }
  };
});