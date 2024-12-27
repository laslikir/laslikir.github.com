document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('neuralCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const neurons = [];
  const mouse = { x: null, y: null };

  // Generate neurons
  for (let i = 0; i < 50; i++) {
    neurons.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: 4 + Math.random() * 2,
    });
  }

  // Update neuron positions
  function updateNeurons() {
    neurons.forEach(neuron => {
      neuron.x += neuron.vx;
      neuron.y += neuron.vy;

      if (neuron.x < 0 || neuron.x > canvas.width) neuron.vx *= -1;
      if (neuron.y < 0 || neuron.y > canvas.height) neuron.vy *= -1;
    });
  }

  // Draw neurons and connections
  function drawNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    neurons.forEach((n1, i) => {
      neurons.slice(i + 1).forEach(n2 => {
        const distance = Math.hypot(n2.x - n1.x, n2.y - n1.y);

        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          const opacity = 1 - distance / 120;
          ctx.strokeStyle = `rgba(50, 50, 50, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });

    // Draw neurons
    neurons.forEach(neuron => {
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        neuron.x,
        neuron.y,
        neuron.radius / 2,
        neuron.x,
        neuron.y,
        neuron.radius
      );
      gradient.addColorStop(0, '#333');
      gradient.addColorStop(1, '#fff');
      ctx.fillStyle = gradient;
      ctx.fill();
    });
  }

  // Mouse interaction
  canvas.addEventListener('mousemove', e => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;

    neurons.forEach(neuron => {
      const dx = neuron.x - mouse.x;
      const dy = neuron.y - mouse.y;
      const distance = Math.hypot(dx, dy);

      if (distance < 100) {
        neuron.vx += dx / 5000;
        neuron.vy += dy / 5000;
      }
    });
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Animation loop
  function animate() {
    updateNeurons();
    drawNetwork();
    requestAnimationFrame(animate);
  }

  animate();

  // Resize canvas dynamically
  window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  });
});
