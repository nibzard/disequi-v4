// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Main animation controller
document.addEventListener('DOMContentLoaded', () => {
  if (prefersReducedMotion) {
    // Show everything immediately for reduced motion
    document.querySelectorAll('#main-title, #subtitle, .motion-section, .motion-section > *').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }
  
  // Set up Intersection Observer for motion sections
  const observerOptions = {
    root: null,
    rootMargin: '-10% 0px -10% 0px',
    threshold: 0.2
  };
  
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('in-view')) {
        // Add class to trigger CSS animations
        entry.target.classList.add('in-view');
        
        // Stop observing this element
        observer.unobserve(entry.target);
      }
    });
  };
  
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  // Observe all motion sections
  document.querySelectorAll('.motion-section').forEach(section => {
    observer.observe(section);
  });
  
  // Enhanced CTA button interactions
  const ctaButton = document.getElementById('cta-button');
  if (ctaButton) {
    let animationTimer;
    
    ctaButton.addEventListener('mouseenter', () => {
      // Clear any existing animation
      if (animationTimer) clearTimeout(animationTimer);
      
      // Add pulsing border effect
      ctaButton.style.borderColor = '#000000';
      animationTimer = setTimeout(() => {
        ctaButton.style.borderColor = '#111827';
      }, 400);
    });
    
    ctaButton.addEventListener('mouseleave', () => {
      if (animationTimer) clearTimeout(animationTimer);
      ctaButton.style.borderColor = '#111827';
    });
  }
});

// Konami code easter egg (preserved from original)
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      // Trigger easter egg
      const ctaButton = document.getElementById('cta-button');
      if (ctaButton) {
        ctaButton.style.transition = 'all 0.5s ease';
        ctaButton.style.transform = 'rotate(360deg) scale(1.2)';
        ctaButton.style.background = '#111827';
        ctaButton.style.color = '#ffffff';
        
        setTimeout(() => {
          ctaButton.style.transform = 'rotate(0) scale(1)';
          ctaButton.style.background = '';
          ctaButton.style.color = '';
        }, 500);
      }
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});