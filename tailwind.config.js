export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1920px",
      },
      colors: {
        lightBlue: {
          100: "#E5F5FA",
          300: "#CDECF5",
          500: "#9BD9EB",
          700: "#38B2D8",
          900: "#079FCE",
        },
        brightBlue: {
          100: "#E1ECFF",
          300: "#B4CBF1",
          500: "#87AAE2",
          700: "#2E68C5",
          900: "#0147B7",
        },
        darkBlue: {
          100: "#98ADE3",
          300: "#7D91C3",
          500: "#6274A2",
          700: "#2D3B61",
          900: "#121F41",
        },
        pink: {
          100: "#FDE9F1",
          300: "#FAD2E3",
          500: "#F6A5C7",
          700: "#ED4B90",
          900: "#E81E74",
        },
        light: "#ECEDF0",
        dark: "#0C0C20",
        black: "#000000",
        white: "#FFFFFF",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
      },
    },
  },
  plugins: [],
};
