import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      sm: {'min': '0px', 'max': '667px'},
      md: {'min': '668px', 'max': '1024px'},
      lg: {'min': '1024px', 'max': '1280px'},
      xl: {'min': '1280px', 'max': '1536px'},
      '2xl': {'min': '1536px'}
    },
    colors: {
      'primary' : '#359B41',
      'second' : '#ffffff',
      'transparent': '#ffffff00',
      'black': '#222222',
      'colortext': '#7DA640',
      'gray': '#F3F4F6',
      'light-green': '#F4FDE7'
    },
    'mask-image': {
      'gradient': 'linear-gradient(to right, black 80%, transparent 100%)',
    }
  },
  mode: "jit",
  purge: false,
  variants: {
    extend: {},
  },
  plugins: [],
};
export default config;
