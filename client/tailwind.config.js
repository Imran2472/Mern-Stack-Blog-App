/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  plugins: [],
};
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "rgba(0,0,0,0.3)",
        secondary: "#e74c3c",
        light: "#f1c40f",
        dark: "#2c3e50",
      },
    },
  },
  plugins: [],
});
