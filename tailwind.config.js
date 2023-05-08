const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: { primary: "#56A254" },
      fontFamily: { sans: [ "Poppins", ...defaultTheme.fontFamily.sans ]}
  }},
  plugins: [],
}

