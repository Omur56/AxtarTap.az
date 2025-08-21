/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        ""
      'xs': '200px',   // ən kiçik ekran (200px-dən yuxarı)
      'xs2': '300px',  // 300px-dən yuxarı
      'xs3': '400px',  // 400px-dən yuxarı
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

