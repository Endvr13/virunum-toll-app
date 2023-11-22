/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.tsx",
],

  theme: {
    extend: {
      colors: {
        'amaranth-red': '#d32929',
        'deep-lemon': '#facd1e',
        'old-lace': '#fff5e6',
        'dutch-white': '#e5dbb7',
        'dark-vanilla': '#cac198',
        'antique-ruby': '#7f2122',
      },
      maxWidth: {
        '3/4': '75%'
      }
    },
  },
  plugins: [],
}