# DISEQUI · The Shadow Studio

Ultra-light landing page for [disequi.com](https://disequi.com) - **under 7KB gzipped**.

## Features

- **Ultra-lightweight**: Total bundle size < 7KB gzipped
- **Modern animations**: Framer Motion with reduced-motion support  
- **Zero tracking**: No cookies, no analytics, completely private
- **Mobile-first**: Responsive design with system monospace fonts
- **Fast loading**: <1s Largest Contentful Paint target
- **Accessible**: High contrast, semantic HTML, ARIA labels

## Tech Stack

- **Static HTML** with semantic structure
- **Tailwind CSS** (purged, ~3KB gzipped)
- **Framer Motion** via ESM CDN for micro-animations
- **Vanilla JavaScript** for intersection observers
- **Node.js** build system with npm scripts

## Quick Start

```bash
# Clone repository
git clone https://github.com/nibzard/disequi-v4.git
cd disequi-v4

# Install dependencies
npm install

# Build for production
npm run build

# Serve locally
npm run serve
```

Visit `http://localhost:8000` to view the site.

## Development

```bash
# Watch CSS changes during development
npm run dev

# Check bundle size
npm run test:size
```

## Project Structure

```
├── index.html          # Main landing page
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service  
├── inview.js          # Animation controller
├── tailwind.config.js # Tailwind configuration
├── public/            # Built files (output)
│   ├── index.html
│   ├── styles.css     # Purged Tailwind CSS
│   └── ...
├── CLAUDE.md          # Development guidance
├── COPY.md            # Approved marketing copy
├── SPECS.md           # Technical specifications
└── DEPLOYMENT.md      # Deployment instructions
```

## Performance

- **Bundle Size**: ~7KB gzipped (HTML + CSS + JS)
- **CSS**: ~3KB gzipped (Tailwind purged)
- **JavaScript**: ~2KB gzipped (animations + observers)
- **HTML**: ~2KB gzipped (semantic markup)

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete instructions on deploying to:

- **Vercel** (recommended for simplicity)
- **Cloudflare Workers** (recommended for performance)

Quick deploy to Vercel:
```bash
npx vercel --prod
```

## Design Philosophy

> "We work in half‑light where ideas learn to breathe."

This site embodies DISEQUI's philosophy of minimal complexity with maximum impact:

- **1995 web aesthetics** with modern performance
- **System fonts only** (no external font loading)
- **Zero cookies** and invisible tracking
- **Monospace typography** for technical authenticity
- **Restrained animations** that respect user preferences

## Contributing

This is a private project for DISEQUI's landing page. See [CLAUDE.md](./CLAUDE.md) for development guidelines when working with Claude Code.

## License

© 2024‑2025 Disequi d.o.o. All rights reserved.