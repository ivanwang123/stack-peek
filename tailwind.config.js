module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: "#FCFDFD",
        foreground: "#FAFBFC",
        "font-primary": "#24292E",
        "font-secondary": "#586069",
        "nav-primary": "#1B1F23",
        "nav-secondary": "#6A737D",
        "border-color": "#E1E4E8",
        "button-color": "#1074E7",
        link: "#0366D6",
        tag: "#F1F8FF",
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["active"],
      fontWeight: ["hover"],
      backgroundColor: ["active", "disabled"],
      borderColor: ["active"],
      borderWidth: ["focus"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
};
