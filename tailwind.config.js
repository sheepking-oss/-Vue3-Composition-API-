/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'music-red': '#ec4141',
        'music-dark': '#1a1a1a',
        'music-gray': '#2d2d2d',
        'music-light': '#f5f5f5',
      },
    },
  },
  plugins: [],
}
