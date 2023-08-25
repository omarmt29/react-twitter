/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUdA4gN7dPL5JyaCZSq7_dBpMPxxsSynK2hsRm70cs0w&s')",
        'footer-texture': "url('/img/footer-texture.png')",
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('preline/plugin')
  ],
}