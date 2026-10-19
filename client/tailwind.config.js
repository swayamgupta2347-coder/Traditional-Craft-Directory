/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          terracotta: '#C85A32',
          'terracotta-dark': '#9A3B18',
          ochre: '#D97724',
          marigold: '#F3A628',
          sand: '#FAF6EF',
          sandDark: '#EFE6D6',
          indigo: '#1B365D',
          'indigo-dark': '#10223D',
          kohl: '#1E232A',
          forest: '#26533A',
          copper: '#B85D19',
          gold: '#C59A3F'
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
