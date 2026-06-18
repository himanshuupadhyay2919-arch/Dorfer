/**
 * Dorfer Solutions — Tailwind CDN theme tokens.
 * Loaded right after the Tailwind CDN <script>, before content is scanned.
 */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B2545', // Deep Trust Blue — primary header/footer
          800: '#0F2E52',
          700: '#173F73',
          600: '#1E4E8E',
        },
        cyan: {
          50: '#E9FBFF',
          100: '#CDF4FC',
          400: '#3FC9E6',
          500: '#00B4D8', // Primary accent — CTAs
          600: '#0096B5',
          700: '#017A93',
        },
        amber: {
          400: '#FFC862',
          500: '#F2A93B', // Alert accent — live status / urgency
          600: '#DB8E1D',
        },
        ink: {
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 24px 48px -16px rgba(11,37,69,0.28)',
        pill: '0 8px 20px -6px rgba(0,180,216,0.55)',
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
};
