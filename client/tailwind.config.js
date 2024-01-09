/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      chiliRed: "#E62F05",
      eerieBlack: "#1A1A1A",
      onyx: "#404145",
      whiteSmoke: "#F2F2F2",
      white: '#FFF',
      blue: '#0000ff'
    },
    extend: {
      width: {
        '40vw': '40vw',
        '60vw': '70vw',
        '90vw': '80vw'
      },
      height:{
        '40vh':'50vh',
        '90vh': '89.7vh'
      },
      screens:{
        'tablet':'769px'
      }
    },
  },
  plugins: [],
};
