import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'slate': '#0f172a',
      'rose': '#ffe4e6',
      'black': '#0C0002',
      'green': '#7B832D',
      'orange': '#FC5B13',
      'yellow': '#FBA824',
      'blue': '#00B3B0',
    }
  },
  plugins: [],
}
export default config
