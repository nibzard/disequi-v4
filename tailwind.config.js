module.exports = {
  content: ['./index.html', './privacy.html', './terms.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', '"Courier New"', 'monospace']
      },
      colors: {
        accent: '#000',
        // Brand colors from BRAND.md
        'flame-primary': '#FF4500',
        'flame-secondary': '#FF6B35', 
        'electric-blue': '#00D4FF',
        'steel-gray': '#4A4A4A'
      },
      lineHeight: {
        'relaxed-custom': '1.65'
      },
      fontSize: {
        'fluid-base': 'clamp(0.875rem, 2.5vw, 1rem)',
      },
      maxWidth: {
        'container': '640px'
      },
      typography: {
        DEFAULT: {
          css: {
            code: {
              fontWeight: '400'
            }
          }
        }
      }
    },
    container: {
      center: true,
      padding: '1rem'
    }
  },
  plugins: [require('@tailwindcss/typography')]
}