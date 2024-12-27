document.addEventListener('DOMContentLoaded', () => {
  // === TABS FUNCTIONALITY ===
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

  // === INTERACTIVE NEURAL NETWORK ===
  const canvas = document.getElementById('neuralCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const neurons = [];
  const connections = [];
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
          ctx.strokeStyle = `rgba(50, 50, 50, ${1 - distance / 120})`;
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

  // Mouse interaction
  canvas.addEventListener('mousemove', e => {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
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
});
