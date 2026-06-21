/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
    },
    extend: {
      colors: {
        party: {
          red: "#C8102E",
          "red-dark": "#8B0000",
          "red-darker": "#5C0000",
          "red-deepest": "#3D0000",
          gold: "#FFD700",
          "gold-soft": "#E8C26A",
          "gold-deep": "#B8860B",
          paper: "#F5EFE0",
          "paper-dim": "#EDE4D0",
          ink: "#1A0A0A",
          "ink-soft": "#3D1F1F",
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', 'Georgia', 'serif'],
        sans: ['"Noto Sans SC"', '"Source Han Sans SC"', 'system-ui', 'sans-serif'],
        display: ['"Noto Serif SC"', '"Source Han Serif SC"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'party-gradient': 'linear-gradient(135deg, #5C0000 0%, #8B0000 50%, #C8102E 100%)',
        'gold-gradient': 'linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #E8C26A 100%)',
        'paper-texture': "radial-gradient(circle at 20% 30%, rgba(232, 194, 106, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(200, 16, 46, 0.06) 0%, transparent 50%)",
      },
      boxShadow: {
        'party': '0 10px 40px -10px rgba(139, 0, 0, 0.5)',
        'gold-glow': '0 0 20px rgba(255, 215, 0, 0.4), 0 0 40px rgba(255, 215, 0, 0.2)',
        'card-hover': '0 20px 50px -15px rgba(139, 0, 0, 0.6), 0 0 0 1px rgba(255, 215, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 215, 0, 0.5)' },
          '50%': { boxShadow: '0 0 0 12px rgba(255, 215, 0, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
