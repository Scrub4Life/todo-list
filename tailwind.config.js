const { textTransform } = require('@mui/system');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bb: "hsl(220, 98%, 61%)",
        // light theme
        vlg: "hsl(0, 0%, 98%)",
        vlgb: "hsl(236, 33%, 92%)",
        lgbLight: "hsl(233, 11%, 84%)",
        dgbLight: "hsl(236, 9%, 61%)",
        vdgb: "hsl(235, 19%, 35%)",
        background1: "hsl(192, 100%, 67%)",
        backgrund2: "hsl(280, 87%, 65%)",
        listBgColor: "hsl(233, 14%, 35%)",
        // dark theme
        vdb: "hsl(235, 21%, 11%)",
        vddb: "hsl(235, 24%, 19%)",
        lgbDark: "hsl(234, 39%, 85%)",
        lgbh: "hsl(236, 33%, 92%)",
        dgbDark: "hsl(234, 11%, 52%)",
        vdgb1Dark: "hsl(233, 14%, 35%)",
        vdgb2Dark: "hsl(237, 14%, 26%)",
      },
      fontFamily: {
        josefin: ["Josefin Sans", " sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            'li::first-letter':{
              textTransform: 'capitalize',
            }
          }
        }
      }
    },
  },
  plugins: [],
};
