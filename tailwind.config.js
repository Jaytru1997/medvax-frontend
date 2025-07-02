export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        "light-blue": {
          100: "#E5F5FA",
          300: "#CDECF5",
          500: "#9BD9EB",
          700: "#38B2D8",
          900: "#079FCE",
        },
        "bright-blue": {
          100: "#E1ECFF",
          300: "#B4CBF1",
          500: "#87AAE2",
          700: "#2E68C5",
          900: "#0147B7",
        },
        "dark-blue": {
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
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        deep: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
