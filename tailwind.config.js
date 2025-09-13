module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@fluid-design/fluid-ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        gray: {
          50: '#f4f7fb',
          100: '#d8dbdf',
          200: '#bdc0c4',
          300: '#a2a5a9',
          400: '#888b8f',
          500: '#6f7276',
          600: '#575a5d',
          700: '#404346',
          800: '#2b2d30',
          900: '#17191c',
        },
      },
      // Other extended theme properties
    },
  },
  plugins: [
    require('@fluid-design/fluid-ui/dist/plugin/core'), // main plugin
    require('@fluid-design/fluid-ui/dist/plugin/button'), // for button component
  ],
}

