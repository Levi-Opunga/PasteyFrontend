const plugin = require('tailwindcss/plugin')


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        fira: "Fira Sans Condensed",
        kumb: "Kumbh Sans",
        roboto: "Roboto",
        pirata: "Pirata One",
        poppins: "Poppins",
      },
    },
  },
  plugins: [
    plugin(function({addVariant}) {
      addVariant('theme-red', '.theme:has(#red:checked) &');
      addVariant('theme-green', '.theme:has(#green:checked) &');
    })
  ],
}
