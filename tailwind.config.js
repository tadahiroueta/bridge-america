const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.js"],
  theme: { extend: {
    colors: { primary: "#56A254" },
    fontFamily: { sans: [ "Poppins", ...defaultTheme.fontFamily.sans ]},
    width: { "160": "40rem" }
  }},
  plugins: [ require("@tailwindcss/typography") ],
}