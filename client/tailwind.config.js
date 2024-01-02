/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        acme: ["Acme", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
      },
      boxShadow: {
        custom: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
