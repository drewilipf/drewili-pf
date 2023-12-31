/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      chiliRed: "#E62F05",
      eerieBlack: "#1A1A1A",
      onyx: "#404145",
      whiteSmoke: "#F2F2F2",
      white: '#FFF'
    },
    extend: {
      width: {
        '60vw': '70vw',
        '90vw': '80vw'
      },
      height:{
        '40vh':'50vh'
      }
    },
  },
  plugins: [],
};
