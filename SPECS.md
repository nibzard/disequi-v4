# Functional & Technical Specification

*Landing page rebuild for **disequi.com***
*(version 1.0 · Dec 2025)*

---

## 1  Project Goal

Deliver an **ultra-light (≈ 7 kB gzipped)** single-page site that feels like 1995 plain-text web—but loads snappy on 4G, ranks for SEO. Content source = approved copy in `COPY.md`. No analytics, no cookies, no external fonts except system stack.

---

## 2  Core Experience Requirements

| Area              | Requirement                                                                                                                                                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Visual DNA**    | White `#ffffff` / dark `#0f0f12` backgrounds, 1-px grey rules `#d3d3d3`/`#404040`, system fonts (Inter sans, ui-monospace). Max width 640px on desktop, full-width on ≤ 480px. Dark mode via `prefers-color-scheme`.     |
| **Copy Flow**     | Five "chapters" separated by dashed `<hr>`. Natural scrolling.                                                                                                                                                               |
| **CTA**           | Single button-look link: `15-min call with Nikola` → `https://cal.com/disequi/intro`. Opens in new tab, aria-label "Book 15-minute intro call with Nikola".                                                                 |
| **Interactivity** | Konami code easter egg (↑↑↓↓←→←→BA) triggers CTA button animation. Disabled for `prefers-reduced-motion: reduce`.                                                                                                            |
| **Assets**        | Zero external fonts. Favicon suite (ico, png, apple-touch-icon, webmanifest). OG image.                                                                                                                                      |
| **Compliance**    | Footer: "We bake zero cookies. Your visit is invisible. © 2024-2025 Disequi d.o.o. · Privacy · Terms · LinkedIn · X". `privacy.html` & `terms.html` = static text pages. Article at `/navigating-ai-era`.                    |
| **Performance**   | Total bundle: CSS 45KB (≈3KB gzipped), JS <1KB, HTML ~11KB. ≈7KB gzipped total.                                                                                                                                                |
| **SEO / OG**      | Full meta tags, OpenGraph, schema.org JSON-LD Organization markup. Canonical = `/`.                                                                                                                                          |

---

## 3  Tech Stack

| Layer      | Choice                                          | Rationale                           |
| ---------- | ----------------------------------------------- | ----------------------------------- |
| Mark-up    | **Static HTML**                                 | Keeps bundle tiny; deploy anywhere. |
| Styles     | **Tailwind v3.5** + @tailwindcss/typography     | Purged to ~3KB gzipped.             |
| Animations | **None** (static site) + Konami easter egg JS   | Intentionally minimal.              |
| Build      | Node script (`build.js`) + Tailwind CLI         | Injects footer, copies assets.      |
| Deployment | Cloudflare Workers (wrangler.toml)             | Serves /public/* with clean URLs.   |

---

## 4  Component & Layout Map

```
<body class="font-mono leading-relaxed-custom" + CSS vars for dark mode>
  Header (max-w-container mx-auto px-6 sm:px-4 py-12 sm:py-10 text-center)
    h1 .text-3xl sm:text-4xl font-bold font-sans
    subtitle small caps .text-muted
    <hr> .border-dashed
  Main (prose prose-base sm:prose)
    Section x5 (.my-12 sm:my-10)
      h2 .font-semibold .font-sans .flame
      p + lists
    CTA container text-center .my-16
      a#cta-button (border-2, hover states)
      konami hint .electric
  Footer (injected from src/footer.html)
    privacy, terms, social links
  Script src="inview.js" (Konami code handler)
</body>
```

---

## 5  Animation Details

| Element            | Behavior                                                                                           |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| **Konami Easter Egg** | On ↑↑↓↓←→←→BA: CTA button rotates 360°, scales to 1.2, shows "[ No cheats, just grit ]".           |
| **Reduced Motion** | `prefers-reduced-motion: reduce` skips rotation, only updates text.                                |
| **CTA Hover**      | CSS transitions: border-color → flame, background → flame, box-shadow with orange glow.            |
| **No entry animations** | Static load, no fade/slide effects (intentional deviation from v0.9).                              |

---

## 6  Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  content: ['./index.html', './navigating-ai-era.html', './privacy.html', './terms.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Courier New', 'monospace']
      },
      colors: {
        flame: '#ea580c',
        electric: '#60a5fa'
      },
      lineHeight: {
        'relaxed-custom': '1.65'
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            code: { fontWeight: '400' }
          }
        }
      })
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
```

Build: `npx tailwindcss -c tailwind.config.js -m -o public/styles.css`

---

## 7  File Structure

```
/
├── index.html              # Main landing ({{FOOTER}} placeholder)
├── navigating-ai-era.html  # Article page
├── privacy.html            # Privacy policy
├── terms.html              # Terms of service
├── inview.js               # Konami code handler (reduced-motion aware)
├── styles.css              # Source Tailwind directives
├── build.js                # Build script: footer injection + asset copy
├── tailwind.config.js      # Tailwind config
├── wrangler.toml           # Cloudflare Workers config
├── src/
│   └── footer.html         # Shared footer component
└── public/                 # Built output (deployment)
    ├── styles.css          # Purged CSS (~45KB / ~3KB gzipped)
    ├── inview.js           # Copied from root
    └── assets/             # Icons, OG image
```

---

## 8  Accessibility & SEO

* High contrast text (#111827 on #fff, #d6d6d6 on #0f0f12).
* `<h1>` → sequential `<h2>` for chapters.
* Button link includes proper aria-label.
* `prefers-reduced-motion` respected for Konami animation.
* Schema.org JSON-LD Organization markup.
* OpenGraph tags for social sharing.

---

## 9  Testing Checklist

| Scenario                   | Pass criteria                                                     |
| -------------------------- | ----------------------------------------------------------------- |
| **Mobile ≤ 375px**         | No horizontal scroll; content legible; CTA tappable (48px min).  |
| **Desktop ≥ 1440px**       | Max-width 640px container centered.                               |
| **No-JS**                  | All content visible; Konami easter egg non-functional (acceptable). |
| **Prefers-reduced-motion** | Konami animation skipped; text only.                              |
| **Dark mode**              | System preference detected; colors swap correctly.                |
| **Lighthouse**             | Perf ≥95, A11y ≥100, BP ≥100, SEO ≥90.                            |
| **Gzip size**              | `curl -s https://disequi.com | gzip -9 | wc -c` ≤ 7000.            |

---

## 10  Deployment Steps

1. `npm i && npm run build` (Tailwind build + footer injection).
2. `npx wrangler pages deploy public` or push to git for auto-deploy.
3. Configure Cloudflare routing for clean URLs (`/privacy` → `/privacy.html`).
4. Set headers: `Cache-Control: public,max-age=31536000,immutable` for CSS/JS.
5. Smoke-test on real device via 3G throttling.

---

### END — current implementation documented.
