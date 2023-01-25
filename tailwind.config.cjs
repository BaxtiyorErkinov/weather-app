/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-dark': "#242424"
      },
      fontFamily: {
        'sans': ['Raleway']
      }
    },
    fontFamily: {
      'sans': ['Raleway']
    }
  },
  plugins: [],
}