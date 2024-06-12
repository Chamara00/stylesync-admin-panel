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
  },
};
export const plugins = [];
