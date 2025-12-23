// Konami code easter egg
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      const ctaButton = document.getElementById('cta-button');
      if (ctaButton) {
        if (prefersReducedMotion) {
          ctaButton.textContent = '[ No cheats, just grit ]';
        } else {
          ctaButton.style.transition = 'all 0.5s ease';
          ctaButton.style.transform = 'rotate(360deg) scale(1.2)';
          ctaButton.style.background = '#111827';
          ctaButton.style.color = '#ffffff';
          ctaButton.textContent = '[ No cheats, just grit ]';

          setTimeout(() => {
            ctaButton.style.transform = 'rotate(0) scale(1)';
            ctaButton.style.background = '';
            ctaButton.style.color = '';
          }, 500);
        }
      }
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});
