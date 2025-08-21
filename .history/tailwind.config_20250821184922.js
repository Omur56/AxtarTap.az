/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
       'tiny': { 'min': '100px', 'max': '500px' }, // 100–500px arası ekran
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      },
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

