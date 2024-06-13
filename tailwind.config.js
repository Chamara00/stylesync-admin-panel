/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    screens: {
      xs: '450px',
      sm: '640px',
      md: '768px',
      xmd: '900px',
      lg: '1025px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1800px',
    },
    colors: {
      primary: '#C9A899',
      secondary: '#844704',
      font_primary: '#FFFFFF',
      font_secondary: '#2B2B2B',
    },
    fontFamily: {
      primary: ['"Poppins", sans-serif'],
    },
  },
};

export const plugins = [];
