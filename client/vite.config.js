import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/jobs': 'http://localhost:5555',
      '/contacts': 'http://localhost:5555',
      '/events': 'http://localhost:5555',
      '/documents': 'http://localhost:5555',
      '/login': 'http://localhost:5555',
      '/signup': 'http://localhost:5555',
      '/checkjwtid': 'http://localhost:5555'
    }
  }
})
