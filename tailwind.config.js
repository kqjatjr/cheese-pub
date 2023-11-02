import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cheese: '#F5A524',
        bgColor: '#3A3535',
        mainColor: '#1F1F1F',
        darkColor: '#292929',
      },
      fontFamily: {
        title: ['Lemonada', 'Fantasy'],
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
