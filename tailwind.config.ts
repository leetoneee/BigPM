import type { Config } from 'tailwindcss';
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      }
    },
    colors: {
      'white': '#F9FAFB',
      'on-primary': '#0E2040',
      'second-blue': '#F0F6FF',
      'main-blue': '#00AAFF',
      'on-secondary': '#0E2040',
      'container-focus': '#F0F6FF',
      'on-container-focus': '#5D7285',
      'primary-container': '#E5E8EF',
      'on-primary-container': '#212738',
      'secondary-container': '#FFE6E1',
      'on-secondary-container': '#FFC107',
      'outline': '#79747E',
      'outline-var': '#CAC4D0',
      'outline-focus': '#2E3C63',
    }
  },
  darkMode: "class",
  plugins: [nextui({
    addCommonColors: true
  })]
};
export default config;
