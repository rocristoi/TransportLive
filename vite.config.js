import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // CORS proxy server
        changeOrigin: true,
        rewrite: (path) => {
          // Remove '/api' and forward the remaining part to the proxy server
          const newPath = path.replace(/^\/api\//, '/');
          return newPath;
        },
      },
    },
  },
})