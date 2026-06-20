import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/AllInOne/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5195',
        changeOrigin: true,
      }
    }
  }
})
