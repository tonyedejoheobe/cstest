import { defineConfig } from 'vite'
import path from 'path'
 // Removed unstable Tailwind v4 vite plugin - using PostCSS v3 now
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    // tailwindcss via PostCSS
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['lucide-react', 'react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime']
  },
  build: {
    target: 'es2022',
    rolldownOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: undefined,
      },
      external: ['react-dom/client']
    },




    sourcemap: true,
  },
  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})

