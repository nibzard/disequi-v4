# Deployment Guide

This document provides complete instructions for deploying the disequi-v4 landing page to **Vercel** or **Cloudflare Workers**.

## Prerequisites

- **Node.js** (v18 or later)
- **Git** installed and configured
- Account on your chosen platform (Vercel or Cloudflare)
- Project built locally (`npm run build` completed)

---

## 🚀 Vercel Deployment

### Method 1: CLI Deployment (Recommended)

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Login to Vercel
```bash
vercel login
```

#### 3. Deploy from Project Root
```bash
# First deployment (creates project)
vercel

# Follow the prompts:
# ? Set up and deploy "~/dev/disequi-v4"? [Y/n] Y
# ? Which scope do you want to deploy to? [your-username]
# ? Link to existing project? [y/N] N
# ? What's your project's name? disequi-v4
# ? In which directory is your code located? ./
# ? Want to override the settings? [y/N] N

# Deploy to production
vercel --prod
```

#### 4. Configure Custom Domain (Optional)
```bash
vercel domains add disequi.com
vercel domains ls
```

### Method 2: Git Integration

#### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. Import to Vercel
1. Visit [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure settings:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `public`
5. Click "Deploy"

### Vercel Configuration (Optional)

Create `vercel.json` for custom configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "public",
  "headers": [
    {
      "source": "/styles.css",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/inview.js",
      "headers": [
        {
          "key": "Cache-Control", 
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*).html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/privacy",
      "destination": "/privacy.html"
    },
    {
      "source": "/terms", 
      "destination": "/terms.html"
    }
  ]
}
```

---

## ⚡ Cloudflare Workers Deployment

### 1. Install Wrangler CLI
```bash
npm install -g wrangler
```

### 2. Authenticate with Cloudflare
```bash
wrangler login
```

### 3. Create wrangler.toml Configuration

Create `wrangler.toml` in your project root:

```toml
name = "disequi-v4"
main = "src/index.js"
compatibility_date = "2025-01-01"

[assets]
directory = "./public"
binding = "ASSETS"
not_found_handling = "single-page-application"

[[rules]]
type = "Text"
globs = ["**/*.html"]
fallthrough = false

[[rules]]
type = "Text"
globs = ["**/*.css", "**/*.js"]
fallthrough = false

[env.production]
name = "disequi-v4-production"
```

### 4. Create Worker Script

Create `src/index.js`:

```javascript
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle clean URLs for privacy and terms
    if (url.pathname === '/privacy') {
      url.pathname = '/privacy.html';
    } else if (url.pathname === '/terms') {
      url.pathname = '/terms.html';
    }
    
    // Serve static assets
    const asset = await env.ASSETS.fetch(url.toString());
    
    if (asset.status === 404) {
      // For SPA behavior, serve index.html for unmatched routes
      return env.ASSETS.fetch(new URL('/index.html', request.url).toString());
    }
    
    // Add security headers
    const response = new Response(asset.body, asset);
    
    // Cache headers
    if (url.pathname.match(/\.(css|js)$/)) {
      response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (url.pathname.match(/\.html$/)) {
      response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    }
    
    // Security headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    return response;
  },
};
```

### 5. Deploy to Cloudflare Workers
```bash
# Deploy to staging
wrangler deploy

# Deploy to production
wrangler deploy --env production
```

### 6. Configure Custom Domain
```bash
# Add custom domain (requires Cloudflare DNS)
wrangler custom-domain add disequi.com --env production
```

---

## 📊 Performance Verification

### Bundle Size Check
```bash
# Verify total gzipped size (should be < 7KB)
npm run test:size

# Individual file sizes
gzip -9c public/index.html | wc -c
gzip -9c public/styles.css | wc -c  
gzip -9c public/inview.js | wc -c
```

### Performance Testing
```bash
# Install lighthouse CLI
npm install -g lighthouse

# Test performance
lighthouse https://your-domain.com --only-categories=performance
```

---

## 🔧 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies  
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

#### Vercel Deployment Issues
```bash
# Check deployment logs
vercel logs [deployment-url]

# Force new deployment
vercel --force

# Check project settings
vercel ls
```

#### Cloudflare Workers Issues
```bash
# Check Worker logs
wrangler tail

# Validate wrangler.toml
wrangler config validate

# Check deployment status
wrangler deployments list
```

#### CSS Not Loading
- Ensure `styles.css` is in the `public/` directory after build
- Check network tab for 404 errors
- Verify file paths in HTML match deployed assets

#### Animation Issues
- Check browser console for Framer Motion import errors
- Verify `inview.js` is being served correctly
- Test with network throttling

### Performance Issues

#### Large Bundle Size
```bash
# Analyze CSS bundle
npx tailwindcss -i input.css -o output.css --minify --content "./index.html"

# Check for unused CSS
npm install -g purgeCSS
purgecss --css public/styles.css --content public/*.html
```

#### Slow Loading
- Enable compression (gzip/brotli) on your hosting platform
- Verify cache headers are set correctly
- Use CDN for external dependencies

---

## 🚦 CI/CD Integration

### GitHub Actions for Vercel
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### GitHub Actions for Cloudflare Workers
Create `.github/workflows/deploy-workers.yml`:

```yaml
name: Deploy to Cloudflare Workers
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          command: deploy --env production
```

---

## 🔄 Rollback Procedures

### Vercel Rollback
```bash
# List recent deployments
vercel ls

# Promote previous deployment to production
vercel promote [deployment-url]
```

### Cloudflare Workers Rollback
```bash
# List deployments
wrangler deployments list

# Rollback to specific version
wrangler rollback [deployment-id]
```

---

## 📝 Post-Deployment Checklist

- [ ] Verify site loads at custom domain
- [ ] Test all internal links (privacy, terms)
- [ ] Confirm CTA button links to correct Cal.com URL
- [ ] Check mobile responsiveness
- [ ] Verify animations work (and respect reduced-motion)
- [ ] Test page load speed (<1s LCP target)
- [ ] Confirm bundle size under 7KB gzipped
- [ ] Validate HTML and accessibility
- [ ] Set up monitoring/alerts (optional)

---

## 🆘 Support

- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Cloudflare Workers**: [developers.cloudflare.com/workers](https://developers.cloudflare.com/workers)
- **Performance Issues**: Run `lighthouse` audit and address specific recommendations