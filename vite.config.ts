import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import { resolve } from 'path'

// Custom plugin to handle globalThis issues
const globalThisPlugin = () => {
  return {
    name: 'globalThis-resolver',
    resolveId(source: string) {
      if (source.includes('globalThis/')) {
        return source
      }
      return null
    },
    load(id: string) {
      if (id.includes('globalThis/')) {
        return 'export default undefined;'
      }
      return null
    }
  }
}

export default defineConfig({
  plugins: [react(), wasm(), globalThisPlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'buffer': 'buffer',
      'globalThis': 'globalThis',
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
        // Suppress problematic warnings
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
    exclude: ['@rollup/plugin-node-resolve'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  define: {
    global: 'globalThis',
    'process.env': {},
    'globalThis.globalXpub': 'undefined',
    'globalThis.globalThis': 'globalThis',
    'typeof globalThis': '"object"'
  }
})
