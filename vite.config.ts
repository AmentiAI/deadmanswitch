import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), wasm()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'buffer': 'buffer',
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress all problematic warnings for now
        if (warning.code === 'MISSING_EXPORT') {
          return
        }
        if (warning.code === 'UNRESOLVED_IMPORT') {
          return
        }
        if (warning.code === 'CIRCULAR_DEPENDENCY') {
          return
        }
        warn(warning)
      },
      external: [],
      output: {
        globals: {
          buffer: 'Buffer'
        }
      }
    }
  },
  optimizeDeps: {
    include: ['buffer'],
    exclude: ['@rollup/plugin-node-resolve']
  },
  define: {
    global: 'globalThis',
    'process.env': {},
  }
})
