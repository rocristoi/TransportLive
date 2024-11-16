import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://transportlive-cors-proxy-4226bad6419b.herokuapp.com/', // CORS proxy server
        changeOrigin: true,
        rewrite: (path) => {
          const newPath = path.replace(/^\/api\//, '/');
          return newPath;
        },
      },
    },
  },
})