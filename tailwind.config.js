module.exports = {
  purge: ['../*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        // 'dark-mobile': "url('../images/bg-mobile-dark.jpg')",
        // 'light-mobile': "url('../images/bg-mobile-light.jpg')",
        // 'dark-desktop': "url('../images/bg-desktop-dark.jpg')",
        // 'light-desktop': "url('../images/bg-desktop-light.jpg')",
        'icon-sun': "url('../images/icon-sun.svg')",
        'icon-moon': "url('../images/icon-moon.svg')",
        'icon-check': "url('../images/icon-check.svg')",
        'icon-cross': "url('../images/icon-cross.svg')",
      }),
      fontFamily: {
        Josefin: ["'Josefin Sans', sans-serif"],
      },
      colors: {
        BrightBlue: '#3a7bfd',
        GrayDown: '#25273c',
      },
      fontSize: {
        FontBody: '18px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
