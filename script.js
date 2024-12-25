// Neural Network Effect
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const mouse = {
    x: null,
    y: null,
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

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

        if (this.x < 0 || this.x > canvas.width) this.velocityX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.velocityY *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = 'rgba(255, 111, 0, 0.5)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();
        }
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = 'rgba(255, 111, 0, 1)';
        particlesArray.push(new Particle(x, y, size, color));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach((particle) => {
        particle.draw();
        particle.update();
    });

    requestAnimationFrame(animate);
}

initParticles();
animate();

// Tab Functionality
const tabs = document.querySelectorAll('.left-tabs li');
const mainContent = document.querySelector('.main-content');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // Remove 'active' class from all tabs
        tabs.forEach((t) => t.classList.remove('active'));

        // Add 'active' class to the clicked tab
        tab.classList.add('active');

        // Update main content based on the clicked tab
        switch (index) {
            case 0:
                mainContent.innerHTML = `
                    <h2>Welcome to Flipper Zero Hub</h2>
                    <p>Explore content, projects, and resources related to Flipper Zero. Use the tabs on the left to navigate!</p>
                `;
                break;
            case 1:
                mainContent.innerHTML = `
                    <h2>Projects</h2>
                    <p>Discover amazing projects created using Flipper Zero. From hacking tools to creative mods, there's plenty to explore.</p>
                `;
                break;
            case 2:
                mainContent.innerHTML = `
                    <h2>Resources</h2>
                    <p>Access tutorials, guides, and documentation to help you get the most out of your Flipper Zero.</p>
                `;
                break;
            case 3:
                mainContent.innerHTML = `
                    <h2>Contact</h2>
                    <p>Have questions? Get in touch with the community or the developers for support and collaboration opportunities.</p>
                `;
                break;
            default:
                mainContent.innerHTML = `
                    <h2>Welcome</h2>
                    <p>Select a tab to see its content.</p>
                `;
                break;
        }
    });
});
