// Polyfills for Node.js compatibility in the browser
import { Buffer } from 'buffer';

// Make Buffer available globally
(window as any).Buffer = Buffer;

if (typeof global === 'undefined') {
  (window as any).global = window;
}

if (typeof process === 'undefined') {
  (window as any).process = { env: {} };
}

// Ensure Buffer is available in the global scope
if (typeof (window as any).Buffer === 'undefined') {
  (window as any).Buffer = Buffer;
}
