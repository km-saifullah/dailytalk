/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  theme: {
    extend: {
      maxWidth: {
        container: "1320px",
      },
      colors: {
        primary: "#222222",
        textColor: "rgba(34, 34, 34, 0.7)",
        secondary: "rgba(34, 34, 34, 0.5)",
        statBg: "rgba(34, 34, 34, 0.1)",
        navbar: "#0C0C0C",
      },
      fontFamily: {
        roboto: "'Roboto', sans-serif",
        robotoFlex: "'Roboto Flex', sans-serif",
        lato: "'Lato', sans-serif",
        nunito: "'Nunito Sans', sans-serif",
      },
    },
  },
};
