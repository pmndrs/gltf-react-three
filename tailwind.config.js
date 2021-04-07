module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'night-green': 'rgb(173, 219, 103)',
        'night-dark': 'rgb(1, 22, 39)',
      },
    },
  },
  variants: {
    extend: {
      gridTemplateRows: {
        autofill: 'auto 1fr',
      },
    },
  },
  plugins: [],
}
