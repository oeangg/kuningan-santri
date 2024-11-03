/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        twBlue: "var(--blue)",
        twPurple: "var(--purple)",
        twYellow: "var(--yellow)",
        twPink: "var(--pink)",
        twWhite: "var(--white)",
      },
    },
  },
  plugins: [],
};
