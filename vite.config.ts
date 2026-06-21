import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      '/api': 'https://web-production-5954e.up.railway.app',
    },
  },
});
