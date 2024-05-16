/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'select-company-gradient': 'linear-gradient(63.56deg, #5970F5 0.14%, #C3CBFF 24.64%, #C3CBFF 72.51%, #5970F5 99.59%)',
      }
    },
  },
  plugins: [],
}