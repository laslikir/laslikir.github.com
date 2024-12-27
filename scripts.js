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

  // Neural Network
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

  function updateNeurons() {
    neurons.forEach(neuron => {
      neuron.x += neuron.vx;
      neuron.y += neuron.vy;

      if (neuron.x < 0 || neuron.x > canvas.width) neuron.vx *= -1;
      if (neuron.y < 0 || neuron.y > canvas.height) neuron.vy *= -1;

      // Mouse interaction
      if (mouse.x && mouse.y) {
        const dx = neuron.x - mouse.x;
        const dy = neuron.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 100) {
          neuron.vx += dx / 5000;
          neuron.vy += dy / 5000;
        }
      }
    });
  }

  function drawNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    neurons.forEach((n1, i) => {
      neurons.slice(i + 1).forEach(n2 => {
        const dist = Math.hypot(n2.x - n1.x, n2.y - n1.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = `rgba(50, 50, 50, ${1 - dist / 120})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    });

    // Draw neurons
    neurons.forEach(neuron => {
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#333';
      ctx.fill();
    });
  }

  canvas.addEventListener('mousemove', e => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

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
