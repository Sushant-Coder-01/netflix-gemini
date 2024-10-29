/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".custom-scrollbar-horizontal": {
          "scrollbar-width": "thin",
          "scrollbar-color": "#e50914 #1a1a1a",
        },
        ".custom-scrollbar-horizontal::-webkit-scrollbar": {
          height: "4px",
        },
        ".custom-scrollbar-horizontal::-webkit-scrollbar-track": {
          background: "#1a1a1a",
        },
        ".custom-scrollbar-horizontal::-webkit-scrollbar-thumb": {
          backgroundColor: "#e50914",
          borderRadius: "10px",
        },
        ".custom-scrollbar-horizontal::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#ff0a16",
        },
      });
    },
  ],
};
