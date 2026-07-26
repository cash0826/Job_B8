import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default {
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5555',
        changeOrigin: true,
        secure: false,
      }
    }
  }
}