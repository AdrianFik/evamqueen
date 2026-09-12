/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: '#1C1B1A',
        grafito: '#34312E',
        corten: '#B84F2E',
        terracota: '#C87552',
        tierra: '#9B7558',
        piedra: '#D5C7B5',
        cal: '#F1EAE0',
        blancoLuz: '#FAF6EF',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'architectural': '0 20px 40px -15px rgba(28, 27, 26, 0.12)',
        'corten': '0 10px 30px -5px rgba(184, 79, 46, 0.25)',
      }
    },
  },
  plugins: [],
}
