/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Specify the files where your styles are used
    './public/index.html', // Specify your HTML file
  ],
  theme: {
    extend: {colors: {
      'softBlue': '#007F03'
    }},
  },
  plugins: [],
}