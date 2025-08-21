/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'm1': '100px',
      'xs': '200px',   
      'xs2': '300px',  
      'xs3': '400px',  
      'xs4': '500px', },

      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-450px 0' },
          '100%': { backgroundPosition: '450px 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite linear',
      },
      backgroundSize: {
        'shimmer': '900px 100%',
      },
    },
  },
  plugins: [],
}

