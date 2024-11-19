import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  base: './',
  define: {
    'process.env.API_URL': mode === 'production' 
      ? JSON.stringify('https://api.folioar.com')
      : JSON.stringify('http://localhost:5000')
  }
}));