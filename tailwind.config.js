module.exports = {
  content: ['./index.html', './privacy.html', './terms.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', '"Courier New"', 'monospace']
      },
      colors: {
        accent: '#000'
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