/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Fraunces', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': { from: { height: 0 }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: 0 } },
        aurora: {
          from: { backgroundPosition: '50% 50%, 50% 50%' },
          to:   { backgroundPosition: '350% 50%, 350% 50%' },
        },
        shimmer: {
          from: { backgroundPosition: '0 0' },
          to:   { backgroundPosition: '-200% 0' },
        },
        'border-beam': {
          '100%': { 'offset-distance': '100%' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%':       { opacity: 0.5 },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        gradient: {
          to: { backgroundPosition: 'var(--bg-size) 0' },
        },
        meteor: {
          '0%':   { transform: 'rotate(215deg) translateX(0)', opacity: 1 },
          '70%':  { opacity: 1 },
          '100%': { transform: 'rotate(215deg) translateX(-500px)', opacity: 0 },
        },
        ripple: {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
          '50%':      { transform: 'translate(-50%, -50%) scale(0.9)' },
        },
      },
      animation: {
        aurora:       'aurora 60s linear infinite',
        shimmer:      'shimmer 8s infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        fadeUp:       'fadeUp 0.5s ease forwards',
        fadeIn:       'fadeIn 0.4s ease forwards',
        'spin-slow':  'spin-slow 3s linear infinite',
        gradient:     'gradient 8s linear infinite',
        meteor:       'meteor 5s linear infinite',
        ripple:       'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
