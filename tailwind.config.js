/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: "#B3BCBB",
        customDarkGreen: "#323232",
      },
      fontFamily: {
        mono: ['"Roboto Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
