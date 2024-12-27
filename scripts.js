document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');

  // Resize canvas to fill the page
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Particle system variables
  let particlesArray = [];
  const mouse = { x: null, y: null, radius: 100 }; // Define mouse radius for interaction

  // Particle class definition
  class Particle {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.velocityX = Math.random() * 2 - 1; // Random velocity
      this.velocityY = Math.random() * 2 - 1;
      this.originalX = x;
      this.originalY = y;
    }

    // Draw the particle
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    // Update the particle position
    update() {
      // Attraction or repulsion effect when mouse is nearby
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const maxDistance = mouse.radius;

      // If within range, attract particles
      if (distance < maxDistance) {
        if (maxDistance - distance > 10) {
          this.x += forceDirectionX * 2;  // Move towards mouse
          this.y += forceDirectionY * 2;
        }
      } else {
        // Move particles back to their original position when mouse is far
        if (this.x !== this.originalX) {
          this.x -= (this.x - this.originalX) / 20;
        }
        if (this.y !== this.originalY) {
          this.y -= (this.y - this.originalY) / 20;
        }
      }

      // Bounce particles off the edges
      if (this.x < 0 || this.x > canvas.width) this.velocityX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.velocityY *= -1;

      this.x += this.velocityX;
      this.y += this.velocityY;
    }
  }

  // Initialize particles
  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 200; i++) {
      const size = Math.random() * 3 + 1;  // Particle size
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const color = 'rgba(255, 0, 255, 1)'; // Vibrant purple color
      particlesArray.push(new Particle(x, y, size, color));
    }
  }

  // Connect particles with lines
  function connectParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
      for (let j = i; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) { // Draw line between close particles
          ctx.beginPath();
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.strokeStyle = 'rgba(255, 0, 255, 0.5)'; // Connect with purple lines
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  // Mouse interaction: Map mouse position relative to canvas
  window.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
  });

  // Animation loop to update and render the particles
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas

    // Update and draw each particle
    particlesArray.forEach(particle => {
      particle.draw();
      particle.update();
    });

    // Connect the particles with lines
    connectParticles();

    requestAnimationFrame(animate);  // Recursively call the animate function for smooth animation
  }

  // Initialize and start the animation
  initParticles();
  animate();
});
