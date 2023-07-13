import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: { manifest: true },
  base: process.env.NODE_ENV === 'production'? '/static/' : '/',
  root: './src',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: [ { find: '@', replacement: path.resolve(__dirname, 'src')}]
  },
  plugins: [react()],
})
