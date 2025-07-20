# Functional & Technical Specification

*Landing page rebuild for **disequi.com***
*(version 0.9 · 21 Jul 2025)*

---

## 1 ▸ Project Goal

Deliver an **ultra‑light (≈ 5 kB gzipped)** single‑page site that feels like 1995 plain‑text web—but loads snappy on 4G, ranks for SEO, and delights with restrained **Tailwind‑powered layout** and **Framer‑Motion micro‑animations**.
Content source = approved copy in previous chat (`DISEQUI · THE SHADOW STUDIO …`). No analytics, no cookies, no fonts hosted off‑site except system monospace.

---

## 2 ▸ Core Experience Requirements

| Area              | Requirement                                                                                                                                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Visual DNA**    | Pure white background `#ffffff`, 1‑px grey ASCII rules `#d3d3d3`, system monospace stack (`ui-monospace, SFMono-Regular, Menlo, Monaco, "Courier New", monospace`). Max width 640 px on desktop, full‑width on ≤ 480 px.               |
| **Copy Flow**     | Five “chapters” separated by ASCII separators (`---`). No scroll hijack; natural mobile scrolling.                                                                                                                                     |
| **CTA**           | Single button‑look link: `[ Book the cheatcode ]` → `https://cal.com/nikola`. Opens in new tab, aria‑label “Book 20‑minute intro with Nikola”.                                                                                         |
| **Interactivity** | Entry fade‑in of H1 (150 ms), gentle slide‑up of each chapter on first viewport entry (200 ms, 15 px offset). Button has scale‑down on tap (95 %). All via **Framer Motion**; animation disabled for `prefers-reduced-motion: reduce`. |
| **Assets**        | Zero images, zero external fonts, single SVG favicon (optional).                                                                                                                                                                       |
| **Compliance**    | Footer text: “We bake zero cookies. Your visit is invisible. © 2024‑2025 Disequi d.o.o. · Privacy · Terms”. `privacy.html` & `terms.html` = static text pages, same style, same size budget.                                           |
| **Performance**   | Largest Contentful Paint < 1 s on mobile; total HTML+CSS+JS ≤ 25 kB uncompressed, ≤ 7 kB gzipped (Tailwind purged).                                                                                                                    |
| **SEO / OG**      | `<title>DISEQUI · The Shadow Studio</title>`; meta description 150 chars; basic OG tags; canonical = `/`.                                                                                                                              |

---

## 3 ▸ Tech Stack

| Layer      | Choice                                                                                                                                                                                          | Rationale                           |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| Mark‑up    | **Static HTML**                                                                                                                                                                                 | Keeps bundle tiny; deploy anywhere. |
| Styles     | **Tailwind v3.5 CDN JIT** (`<script src="https://cdn.tailwindcss.com?plugins=typography"></script>`) with `tailwind.config.inlineContent` for Purge; exported minimal `styles.css` (≈ 3 kB gz). |                                     |
| Animations | **Framer Motion 11 ESM** via `esm.sh` CDN (`10–12 kB gz`) + `IntersectionObserver` polyfill (1 kB) for in‑view triggers.                                                                        |                                     |
| Build      | Simple Node script or `vite` to: 1) strip unused Tailwind classes, 2) inline critical CSS into `<style>` tag, 3) copy minified framer module.                                                   |                                     |
| Deployment | Netlify / Vercel static or any S3 bucket + CloudFront. Ensure `Cache‑Control: public,max-age=31536000,immutable` for CSS/JS.                                                                    |                                     |

---

## 4 ▸ Component & Layout Map

```
<body class="bg-white text-gray-900 font-mono leading-relaxed">
┌ Header (max‑w‑screen-sm mx‑auto px‑4 py‑10 text-center)
│  └ h1 .text-2xl sm:text-4xl font-bold tracking-wide
│  └ subtitle small caps .mt-4
│  └ <hr> .border-dashed
├ Main (prose prose-sm sm:prose base text)
│  ├ Section x5 (.my-10) each wrapped in <motion.div>
│  │  ├ h2 .text-lg sm:text-xl font-semibold
│  │  └ p + lists
│  └ CTA container text-center .my-14
│     └ <motion.a> button styles
├ Footer (text-xs text-gray-500 text-center py-8)
│  └ copy line + inline links
└ Scripts (framer, observers) at body‑end, async
</body>
```

---

## 5 ▸ Animation Details

| Element            | Motion props                                                                             | Trigger          |
| ------------------ | ---------------------------------------------------------------------------------------- | ---------------- |
| **H1**             | `initial:{opacity:0,y:10}` → `animate:{opacity:1,y:0,transition:{duration:0.15}}`        | DOM ready        |
| **Section blocks** | same but `duration:0.20` + `once:true`                                                   | `useInView` 40 % |
| **CTA link**       | `whileHover:{scale:1.02}` · `whileTap:{scale:0.95}`                                      | interactive      |
| **ASCII `<hr>`**   | subtle `opacity` pulse keyframe `[0.6,1,0.6]` over 6 s, `repeat:∞`                       | auto             |
| **Reduced motion** | Wrap motion props in `prefersReducedMotion()` hook; if reduced → no translate, opacity 1 |                  |

---

## 6 ▸ Tailwind Configuration Snippet

```js
// tailwind.config.js
module.exports = {
  content: ['./index.html','./privacy.html','./terms.html'],
  theme: {
    extend: {
      fontFamily: { mono: ['ui-monospace','SFMono-Regular','Menlo','Monaco','"Courier New"', 'monospace'] },
      colors: { accent: '#000' }, // future use
      typography: { DEFAULT: { css: { code: { fontWeight: '400' } } } }
    },
    container: { center: true, padding: '1rem' }
  },
  plugins: [require('@tailwindcss/typography')],
}
```

Run:

```bash
npx tailwindcss -c tailwind.config.js -m -o public/styles.css
```

Expect ≈ 3 kB gz after purge.

---

## 7 ▸ HTML Skeleton (excerpt)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>DISEQUI · The Shadow Studio</title>
  <meta name="description" content="Architects of investable growth for early‑stage rebels. Sworn to secrecy. Book the cheatcode.">
  <style>@tailwind base;@tailwind components;@tailwind utilities;</style>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'.../>">
</head>
<body class="bg-white text-gray-900 font-mono leading-relaxed">
  <main id="app">
    <!-- content injected here -->
  </main>
  <script type="module" src="https://esm.sh/framer-motion@11.0.4"></script>
  <script type="module" src="/inview.js"></script>
</body>
</html>
```

`inview.js` registers each `.motion-section` with `IntersectionObserver` and applies Framer `animate` only once.

---

## 8 ▸ Accessibility & SEO

* All text high‑contrast (#000 on #fff).
* `<h1>` → sequential `<h2>` for chapters.
* Button link includes aria‑label.
* Skip‑link not needed for one‑screen page but header landmarks retained.
* OG tags for preview (title, description).

---

## 9 ▸ Testing Checklist

| Scenario                   | Pass criteria                                                     |         |                  |
| -------------------------- | ----------------------------------------------------------------- | ------- | ---------------- |
| **Mobile ≤ 375px**         | No horizontal scroll; content legible; CTA visible without pinch. |         |                  |
| **Desktop ≥ 1440px**       | Max‑width container centered; whitespace pleasant.                |         |                  |
| **No‑JS**                  | All content visible, animations absent.                           |         |                  |
| **Prefers‑reduced‑motion** | Animations disabled.                                              |         |                  |
| **Lighthouse**             | Perf ≥ 95, Accessibility ≥ 100, Best Practice ≥ 100, SEO ≥ 90.    |         |                  |
| **Gzip size**              | \`curl -s https\://…                                              | gzip -9 | wc -c\` ≤ 7 000. |

---

## 10 ▸ Deployment Steps

1. `npm i && npm run build` (calls Tailwind build, minifies js).
2. Copy `/public/*` to host bucket.
3. Configure fallback redirects for `/privacy.html` & `/terms.html`.
4. Set headers: `Cache-Control: public,max-age=31536000,immutable` for CSS/JS; `no-cache` for HTML.
5. Smoke‑test on real device via 3G throttling.

---

### END — ready for developer kickoff.
