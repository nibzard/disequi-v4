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