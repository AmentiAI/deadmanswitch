/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bitcoin-orange': '#F7931A',
        'bitcoin-gold': '#FFD700',
        'dark-bg': '#0F0F0F',
        'card-bg': '#1A1A1A',
        'border-color': '#333333',
        'text-primary': '#FFFFFF',
        'text-secondary': '#CCCCCC',
        'accent-red': '#DC2626',
        'accent-green': '#16A34A',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #F7931A, 0 0 10px #F7931A, 0 0 15px #F7931A' },
          '100%': { boxShadow: '0 0 10px #F7931A, 0 0 20px #F7931A, 0 0 30px #F7931A' },
        }
      }
    },
  },
  plugins: [],
}

