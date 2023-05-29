const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.js"],
  theme: { extend: {
    colors: { primary: "#56A254", typing: colors.gray[500] },
    fontFamily: { sans: [ "Poppins", ...defaultTheme.fontFamily.sans ]},
    height: { "18": "4.5rem" }
  }},
  plugins: [ require("@tailwindcss/typography") ],
}