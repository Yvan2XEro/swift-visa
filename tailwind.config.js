/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        mobileBg: "url('/assets/images/bg-sidebar-mobile.svg')",
        desktopBg: "url('/assets/images/bg-sidebar-desktop.svg')",
        omMomoBg: "url('/assets/images/om-momo.jpg')"
      },
    },
  },
  plugins: [],
}
