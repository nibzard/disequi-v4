import { motion, animate } from 'https://esm.sh/framer-motion@11.0.4';

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Animate main title on load
document.addEventListener('DOMContentLoaded', () => {
  const mainTitle = document.getElementById('main-title');
  if (mainTitle && !prefersReducedMotion) {
    animate(mainTitle, 
      { opacity: [0, 1], y: [10, 0] }, 
      { duration: 0.15 }
    );
  } else if (mainTitle) {
    mainTitle.style.opacity = '1';
  }

  // Pulse animation for HR
  const pulseHr = document.getElementById('pulse-hr');
  if (pulseHr && !prefersReducedMotion) {
    animate(pulseHr,
      { opacity: [0.8, 1, 0.8] },
      { duration: 6, repeat: Infinity }
    );
  }

  // CTA button hover effects
  const ctaButton = document.getElementById('cta-button');
  if (ctaButton && !prefersReducedMotion) {
    ctaButton.addEventListener('mouseenter', () => {
      animate(ctaButton, { scale: 1.02 }, { duration: 0.1 });
    });
    
    ctaButton.addEventListener('mouseleave', () => {
      animate(ctaButton, { scale: 1 }, { duration: 0.1 });
    });
    
    ctaButton.addEventListener('mousedown', () => {
      animate(ctaButton, { scale: 0.95 }, { duration: 0.05 });
    });
    
    ctaButton.addEventListener('mouseup', () => {
      animate(ctaButton, { scale: 1.02 }, { duration: 0.05 });
    });
  }
});

// Intersection Observer for section animations
if (!prefersReducedMotion) {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
        entry.target.setAttribute('data-animated', 'true');
        
        animate(entry.target,
          { opacity: [0, 1], y: [15, 0] },
          { duration: 0.2 }
        );
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all motion sections
  document.querySelectorAll('.motion-section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
  });
} else {
  // If reduced motion is preferred, just show all sections
  document.querySelectorAll('.motion-section').forEach(section => {
    section.style.opacity = '1';
  });
}