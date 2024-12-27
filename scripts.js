document.addEventListener('DOMContentLoaded', () => {
  // Tabs Functionality
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');

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

  // Neural Network Canvas
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particlesArray = [];
  const mouse = { x: null, y: null };

  // Particle class definition
  class Particle {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.velocityX = Math.random() * 2 - 1;
      this.velocityY = Math.random() * 2 - 1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      this.x += this.velocityX;
      this.y += this.velocityY;

      // Bounce particles off the edges
      if (this.x < 0 || this.x > canvas.width) this.velocityX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.velocityY *= -1;

      // Draw a line to the mouse if it gets close enough
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = 'rgba(0, 198, 255, 0.5)'; // Neon Blue
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  // Initialize particles
  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 3 + 1;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const color = 'rgba(0, 198, 255, 1)'; // Neon Blue
      particlesArray.push(new Particle(x, y, size, color));
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach((particle) => {
      particle.draw();
      particle.update();
    });

    requestAnimationFrame(animate);
  }

  // Mouse interaction
  window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  // Resize event
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });

  initParticles();
  animate();
});
