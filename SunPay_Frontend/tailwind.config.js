/** @type {import('tailwindcss').Config} */
module.exports = {
  screens: {
    'md': '720px'
  },
  content: [ "./src/**/*.{js,jsx,ts,tsx}",
  'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    
    extend: {
      colors: {
        'orange': '#ea5a32',
      },
      gridTemplateColumns: {
        sidebar: "300px auto", //for sidebar layout
        "sidebar-collapsed": "64px auto", //for collapsed sidebar layout
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar-hide')
  ],
}

