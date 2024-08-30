import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Ini memungkinkan server mendengarkan pada semua antarmuka jaringan
    port: 5173,      // Port yang ingin digunakan
  },
})
