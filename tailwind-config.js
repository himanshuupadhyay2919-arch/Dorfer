tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#0B0F1A',
          900: '#111827',
          800: '#1F2937',
          700: '#374151',
        },
        blue: {
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
          50:  '#EFF6FF',
          100: '#DBEAFE',
        },
        gold: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          100: '#FEF3C7',
        },
        slate: {
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        emerald: {
          400: '#34D399',
          500: '#10B981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        lift:  '0 24px 48px -16px rgba(15,23,42,0.22)',
        pill:  '0 8px 20px -6px rgba(37,99,235,0.45)',
        card:  '0 4px 24px -4px rgba(15,23,42,0.10)',
        glow:  '0 0 0 4px rgba(37,99,235,0.18)',
      },
      maxWidth: { '8xl': '90rem' },
    },
  },
};
