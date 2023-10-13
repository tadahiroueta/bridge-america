const defaultTheme = require( "tailwindcss/defaultTheme" )

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.js" ],
  theme: { extend: { 
    colors: { ashes: {
      100: "#FFFFFF",
      300: "#F6F1F1",
      500: "#555B6E",
      700: "#749987",
      900: "#C4E3BE"
    }},
    fontFamily: { 
      sans: [ "Nunito", ...defaultTheme.fontFamily.sans ],
      title: [ "Archivo", ...defaultTheme.fontFamily.sans ]
    }
  }},
  plugins: [ require( "@tailwindcss/typography" )]
}