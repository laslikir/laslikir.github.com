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

  // === NEURAL NETWORK VISUALIZATION ===
  const canvas = document.getElementById('neuralCanvas');
  const ctx = canvas.getContext('2d');

  // Set canvas size
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const layers = [
    { neurons: 4, x: 100 }, // Input layer
    { neurons: 6, x: 300 }, // Hidden layer 1
    { neurons: 4, x: 500 }, // Hidden layer 2
    { neurons: 2, x: 700 }  // Output layer
  ];
  const neuronRadius = 15;

  function drawNeuron(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, neuronRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
  }

  function drawConnection(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'rgba(50, 50, 50, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  function drawNeuralNetwork() {
    const layerPositions = layers.map(layer => {
      const yOffset = (canvas.height - (layer.neurons * (2 * neuronRadius + 20))) / 2;
      return Array.from({ length: layer.neurons }, (_, i) => ({
        x: layer.x,
        y: yOffset + i * (2 * neuronRadius + 20)
      }));
    });

    // Draw connections
    for (let i = 0; i < layerPositions.length - 1; i++) {
      const currentLayer = layerPositions[i];
      const nextLayer = layerPositions[i + 1];
      currentLayer.forEach(neuron => {
        nextLayer.forEach(nextNeuron => {
          drawConnection(neuron.x, neuron.y, nextNeuron.x, nextNeuron.y);
        });
      });
    }

    // Draw neurons
    layerPositions.flat().forEach(({ x, y }) => {
      drawNeuron(x, y);
    });
  }

  drawNeuralNetwork();
});
