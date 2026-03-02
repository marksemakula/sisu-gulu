/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ges-navy': '#0A2342',
        'ges-gold': '#C5A572',
        'ges-cream': '#F8F5F0',
        'ges-teal': '#2A9D8F',
        'ges-burgundy': '#8A1538',
        'ges-slate': '#6C757D',
        'ges-blue': '#1E40AF',
        'ges-orange': '#F59E0B',
        'ges-purple': '#7C3AED',
        'ges-green': '#059669',
      },
      fontFamily: {
        sans: ['Ubuntu', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'ges-gradient': 'linear-gradient(135deg, #0A2342 0%, #1a3a5f 100%)',
        'ges-gold-gradient': 'linear-gradient(135deg, #C5A572 0%, #D4B886 100%)',
      },
    },
  },
  plugins: [],
}