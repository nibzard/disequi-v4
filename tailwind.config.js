module.exports = {
  content: ['./index.html', './privacy.html', './terms.html'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', '"Courier New"', 'monospace']
      },
      colors: {
        accent: '#000'
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