/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'pulse-bg': {
          '0%': { backgroundColor: '#3B82F6' }, 
          '50%': { backgroundColor: '#2563EB' },
          '100%': { backgroundColor: '#3B82F6' }, 
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'pulse-bg': 'pulse-bg 5s ease-in-out infinite',
        'fade-in': 'fade-in 1.5s ease-in-out',
      },
    },
  },
  plugins: [],
}