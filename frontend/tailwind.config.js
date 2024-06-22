/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        "main":"#0B0C10",
        "sub":"#1F2833",
        "sub2":"#263c57",
        "light":"",
      }
    },
  },
  plugins: [],

});