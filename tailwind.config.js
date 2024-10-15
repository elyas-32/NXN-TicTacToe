/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // fontFamily:{
      //   'Baloo' : 'Baloo'
      // },
      transitionTimingFunction: {
        'myTransitionFunc': 'cubic-bezier(0.4, 0, 0.12, 0.97)'
      }
    },
  },
  plugins: [],
}

