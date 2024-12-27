document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    const heroImg = document.getElementById('hero-img');
  
    // Neural network hover effect
    heroImg.addEventListener('mouseover', () => {
      heroImg.src = 'neural-network-animation.gif'; // Replace with animated image
    });
  
    heroImg.addEventListener('mouseout', () => {
      heroImg.src = 'hero-image.jpg'; // Replace with original static image
    });
  
    // Tab functionality
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabIndex = tab.getAttribute('data-tab');
  
        // Update tabs
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
  
        // Update content
        contents.forEach(content => {
          if (content.getAttribute('data-content') === tabIndex) {
            content.classList.add('active');
          } else {
            content.classList.remove('active');
          }
        });
      });
    });
  });
  