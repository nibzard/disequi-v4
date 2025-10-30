#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Ensure public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Load shared footer
const footerPath = path.join(__dirname, 'src', 'footer.html');
const sharedFooter = fs.existsSync(footerPath) ? fs.readFileSync(footerPath, 'utf8') : '';

// Files to process (HTML files that need footer injection)
const htmlFiles = ['index.html', 'privacy.html', 'terms.html'];

// Other files to copy as-is
const otherFiles = [
  'inview.js',
  'favicon.ico',
  'favicon-32x32.png',
  'favicon-16x16.png',
  'apple-touch-icon.png',
  'site.webmanifest',
  'ogimage.png'
];

// Process HTML files with footer injection
htmlFiles.forEach(file => {
  const srcPath = path.join(__dirname, file);
  const destPath = path.join(publicDir, file);
  
  if (fs.existsSync(srcPath)) {
    let content = fs.readFileSync(srcPath, 'utf8');
    
    // Replace footer placeholder or existing footer with shared footer
    if (content.includes('{{FOOTER}}')) {
      content = content.replace('{{FOOTER}}', sharedFooter);
    } else if (content.includes('<footer')) {
      // Replace existing footer section
      content = content.replace(/<footer[\s\S]*?<\/footer>/g, sharedFooter);
    }
    
    fs.writeFileSync(destPath, content);
    console.log(`✓ Processed ${file} with shared footer`);
  } else {
    console.log(`⚠ Skipped ${file} (not found)`);
  }
});

// Copy other files as-is
otherFiles.forEach(file => {
  const srcPath = path.join(__dirname, file);
  const destPath = path.join(publicDir, file);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Copied ${file} to public/`);
  } else if (!file.endsWith('.css')) { // Don't warn about CSS files since they're built separately
    console.log(`⚠ Skipped ${file} (not found)`);
  }
});

console.log('\n✨ Build complete!');