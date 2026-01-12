// Theme switcher
(function() {
  const THEME_KEY = 'preferred-theme';
  
  // Apply saved theme or default to dark
  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem(THEME_KEY, theme);
  }
  
  // Load saved theme immediately to prevent flash
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(savedTheme);
  
  // Initialize theme toggle button
  document.addEventListener('DOMContentLoaded', function() {
    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle theme');
    toggleBtn.innerHTML = document.body.classList.contains('light-theme') ? '🌙' : '☀️';
    document.body.appendChild(toggleBtn);
    
    // Toggle theme on click
    toggleBtn.addEventListener('click', function() {
      const isLight = document.body.classList.contains('light-theme');
      const newTheme = isLight ? 'dark' : 'light';
      applyTheme(newTheme);
      toggleBtn.innerHTML = newTheme === 'light' ? '🌙' : '☀️';
    });
  });
})();

// Initialize Magnific Popup for image links
$(document).ready(function() {
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom',
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300
    }
  });
});
