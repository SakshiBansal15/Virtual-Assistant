/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all React files in src
  ],
  theme: {
    extend: {
      animation: {
        "expand-center": "expandFromCenter 2s ease-out forwards",
      },
      keyframes: {
        expandFromCenter: {
          "0%": {
            transform: "scaleX(0)", // Start collapsed
            transformOrigin: "center", // Center of the text
          },
          "100%": {
            transform: "scaleX(1)", // Expand to full width
          },
        },
      },
    },
  },
  plugins: [],
};

