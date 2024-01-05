/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      maxWidth: {
        "45/100": "45%",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
