# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a landing page rebuild for **disequi.com** - an ultra-light (≈5kB gzipped) single-page site with 1995 plain-text web aesthetics but modern performance. The project aims to create a static HTML site using Tailwind CSS and Framer Motion for minimal animations.

## Key Files

- `COPY.md` - Approved marketing copy content for the landing page
- `SPECS.md` - Complete functional & technical specification (v0.9)

## Build Commands

Based on the specs, the expected build process is:
```bash
npm i && npm run build
```

The build should:
1. Run Tailwind CSS build with purging: `npx tailwindcss -c tailwind.config.js -m -o public/styles.css`
2. Minify JavaScript files
3. Copy `/public/*` to deployment directory

## Architecture

### Tech Stack
- **Markup**: Static HTML
- **Styles**: Tailwind v3.5 CDN JIT with inline critical CSS (≈3kB gzipped after purge)
- **Animations**: Framer Motion 11 ESM via esm.sh CDN (10-12kB gzipped)
- **Build**: Node script or Vite for Tailwind purging and CSS inlining

### Performance Requirements
- Largest Contentful Paint < 1s on mobile
- Total bundle ≤ 25kB uncompressed, ≤ 7kB gzipped
- No external fonts (system monospace stack only)
- Zero images, single SVG favicon

### Layout Structure
- Max width 640px on desktop, full-width on ≤480px
- Pure white background (#ffffff), 1px grey ASCII rules (#d3d3d3)
- System monospace font stack
- Five "chapters" with ASCII separators
- Single CTA button linking to https://cal.com/nikola

### Animation Details
- H1 fade-in (150ms) on DOM ready
- Chapter sections slide-up (200ms, 15px offset) on viewport entry
- CTA button scale effects on hover/tap
- All animations disabled for `prefers-reduced-motion: reduce`

## File Organization
Expected structure after implementation:
```
/
├── index.html          # Main landing page
├── privacy.html        # Privacy policy page
├── terms.html          # Terms of service page
├── public/
│   └── styles.css      # Purged Tailwind CSS
├── tailwind.config.js  # Tailwind configuration
└── inview.js          # IntersectionObserver for animations
```

## Development Guidelines

### CSS Classes
Use Tailwind utility classes following the component map in SPECS.md:
- Container: `max-w-screen-sm mx-auto px-4`
- Typography: `font-mono leading-relaxed`
- Responsive: `text-2xl sm:text-4xl`

### Accessibility Requirements
- High contrast text (#000 on #fff)
- Sequential heading structure (h1 → h2)
- Aria-labels for interactive elements
- Skip-link landmarks where needed

### Testing Checklist
- Mobile ≤375px: No horizontal scroll
- Desktop ≥1440px: Centered max-width container
- No-JS: All content visible
- Lighthouse scores: Perf ≥95, A11y ≥100, BP ≥100, SEO ≥90
- Gzip size verification: `curl -s https://... | gzip -9 | wc -c` ≤ 7000

## Deployment
Target platforms: Netlify/Vercel static or S3 + CloudFront
Required headers:
- CSS/JS: `Cache-Control: public,max-age=31536000,immutable`
- HTML: `Cache-Control: no-cache`

### Deployment Workflow
- For deployment always read DEPLOYMENT.md and use wrangler to deploy.