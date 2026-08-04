import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path' // Added for path resolution

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
  // Added Build Configuration for the Vanilla-JS Wrapper
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),       // Your main React platform
        widget: resolve(__dirname, 'src/embed.jsx')   // Your vanilla-JS wrapper
      },
      output: {
        // Forces the widget to compile into a clean 'learnbridge-widget.js' file
        entryFileNames: (assetInfo) => {
          return assetInfo.name === 'widget' ? 'learnbridge-widget.js' : 'assets/[name]-[hash].js';
        }
      }
    }
  }
})