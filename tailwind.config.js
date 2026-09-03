/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF9F6', // Warm Ivory
        surface: '#E8E6E1', // Soft Grey
        'surface-dark': '#111111', // Deep Graphite
        primary: '#111111', // Deep Graphite
        secondary: '#8C8C8C', // Steel Grey
        muted: '#A1A1AA',
        accent: '#FF5A00', // Blaze Orange
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
