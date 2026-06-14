import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Sommer/',
  server: {
    proxy: {
      // Forward API calls to the Express server during development.
      '/api': 'http://localhost:3001',
    },
  },
})
