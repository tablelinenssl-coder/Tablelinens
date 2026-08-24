/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F172A',
          light: '#1E293B',
          dark: '#080D1A',
          subtle: '#172554',
        },
        midnight: '#0A0F1D',
        champagne: {
          DEFAULT: '#C59B5F',
          light: '#E2CBA3',
          dark: '#A67E44',
          subtle: '#FDF8F0',
        },
        slateText: {
          main: '#0F172A',
          muted: '#64748B',
          light: '#94A3B8',
        },
        pearl: '#F8FAFC',
        surface: {
          50: '#FFFFFF',
          100: '#F8FAFC',
          200: '#F1F5F9',
          300: '#E2E8F0',
          400: '#CBD5E1',
          500: '#94A3B8',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.25em',
      },
    },
  },
  plugins: [],
}
