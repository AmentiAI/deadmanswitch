// Polyfills for globalThis and related issues
if (typeof globalThis === 'undefined') {
  (globalThis as any) = global || window || self
}

// Handle globalXpub issue
if (typeof (globalThis as any).globalXpub === 'undefined') {
  (globalThis as any).globalXpub = undefined
}

// Ensure buffer is available
if (typeof window !== 'undefined') {
  (window as any).Buffer = (window as any).Buffer || require('buffer').Buffer
}

// Handle process.env
if (typeof process === 'undefined') {
  (globalThis as any).process = { env: {} }
} else if (!process.env) {
  process.env = {}
}

export {}
