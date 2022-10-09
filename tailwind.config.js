/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        Leaving: "leaving 100ms ease-in-out",
        Entering: "entering 150ms ease-in-out",
      },
      keyframes: {
        entering: {
          From: { opacity: 0, transform: "scale(0.5) " },
          To: { opacity: 1, transform: "scale(1) " },
        },
        leaving: {
          From: { opacity: 1, transform: "scale(1) " },
          To: { opacity: 0, transform: "scale(0.5) " },
        },
      },
    },
  },
  plugins: [
    // require( 'flowbite/plugin' ),
  ],
};
