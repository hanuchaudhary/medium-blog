
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customOrange: "#E99F4C",
        customLightOrange: "#EDDCD8",
        customPink: "#DE5499",
      }
    },
  },
  plugins: [],
}