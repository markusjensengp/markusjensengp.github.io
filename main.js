// main.js - Shared scripts for all pages

// Initialize after DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
  
  setupFadeSections();
  setupDropdowns();
  // Fade in hero scroll icon after 1s
  setTimeout(function() {
    var scrollIcon = document.querySelector('.hero-scroll-icon');
    if (scrollIcon) scrollIcon.classList.add('visible');
  }, 1000);
});

// Fade-in/out on scroll for all sections except hero
function setupFadeSections() {
  const fadeSections = document.querySelectorAll('.skills-section, .timeline-section, .projects-section, .project-contributions, .section-title, .project-layout, #about');
  fadeSections.forEach(sec => {
    sec.classList.add('fade-section');
    sec.style.visibility = 'hidden';
    sec.addEventListener('transitionend', function(e) {
      if (!sec.classList.contains('visible') && e.propertyName === 'opacity') {
        sec.style.visibility = 'hidden';
      }
    });
  });
  let lastScrollY = window.scrollY;
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If section is entering from the top, set data-fade-up
      const sectionTop = entry.boundingClientRect.top;
      const isScrollingUp = window.scrollY < lastScrollY;
      if (sectionTop < window.innerHeight / 2) {
        entry.target.setAttribute('data-fade-up', 'true');
      } else {
        entry.target.removeAttribute('data-fade-up');
      }
      if (entry.isIntersecting && entry.intersectionRatio > 0) {
        entry.target.classList.add('visible');
        entry.target.style.visibility = 'visible';
      } else {
        entry.target.classList.remove('visible');
        // visibility will be set to hidden after transitionend
      }
    });
    lastScrollY = window.scrollY;
  }, { threshold: 0.01, rootMargin: '-15% 0px -15% 0px' });
  fadeSections.forEach(sec => observer.observe(sec));
}

// Dropdown code toggle for learn-more.html
function setupDropdowns() {
  document.querySelectorAll('#snippet').forEach(btn => {
    btn.addEventListener('click', function() {
      const content = this.nextElementSibling;
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
        // Highlight code blocks inside this snippet if not already highlighted
        content.querySelectorAll('pre code').forEach((block) => {
          if (!block.classList.contains('hljs')) {
            hljs.highlightElement(block);
          }
        });
      }
    });
  });
}