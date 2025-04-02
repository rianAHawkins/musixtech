import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external connections (important for Docker)
    port: 5173 // Default port (can be changed)
  },
  preview: {
    host: '0.0.0.0',
    port: 8080 // Default preview port (can be changed)
  }
})
