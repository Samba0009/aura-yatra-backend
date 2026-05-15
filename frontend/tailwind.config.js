/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgBase: '#000000',
        surface: 'rgba(255, 255, 255, 0.05)',
        surfaceElevated: 'rgba(255, 255, 255, 0.1)',
        surfaceAccent: 'rgba(255, 255, 255, 0.15)',
        borderSubtle: 'rgba(255, 255, 255, 0.05)',
        borderDefault: 'rgba(255, 255, 255, 0.1)',
        borderActive: 'rgba(239, 159, 39, 0.5)', // Gold amber
        textPrimary: '#ffffff',
        textSecondary: '#a1a1aa', // Zinc 400
        textMuted: '#71717a', // Zinc 500
        textDisabled: '#52525b', // Zinc 600
        textPlaceholder: '#3f3f46', // Zinc 700
        accentPurple: '#ef9f27', // Repurposed to Amber/Gold
        accentPurpleBright: '#fbbf24',
        accentPurpleDeep: '#b45309',
        accentPurpleMid: '#d97706',
        lightBg: '#18181b', // Replaced with dark zinc
        lightCard: '#27272a',
        lightBorder: '#3f3f46',
        lightText: '#ffffff',
        lightSubtext: '#a1a1aa',
        goldAmber: '#ef9f27',
        tealNature: '#5dcaa5',
        blueTravel: '#85b7eb',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(to bottom right, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
      },
    },
  },
  plugins: [],
}
