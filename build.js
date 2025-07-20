#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Ensure public directory exists
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Files to copy to public directory
const filesToCopy = [
  'index.html',
  'inview.js',
  'privacy.html',
  'terms.html',
  'favicon.ico',
  'favicon-32x32.png',
  'favicon-16x16.png',
  'apple-touch-icon.png',
  'site.webmanifest',
  'ogimage.png'
];

// Copy files
filesToCopy.forEach(file => {
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