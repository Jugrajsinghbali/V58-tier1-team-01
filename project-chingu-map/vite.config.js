import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/V58-tier1-team-01/project-chingu-map/',
  plugins: [react(), tailwindcss(),],
})
