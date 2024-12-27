document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for anchor links
  const links = document.querySelectorAll("a[href^='#']");

  links.forEach(link => {
      link.addEventListener("click", (event) => {
          event.preventDefault();
          const targetId = link.getAttribute("href").substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 50, // Adjust for header height
                  behavior: "smooth"
              });
          }
      });
  });

  // Animated appearance of elements on scroll
  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.2
  });

  const featureItems = document.querySelectorAll(".feature-item");

  featureItems.forEach(item => {
      item.classList.add("hidden"); // Start hidden
      observer.observe(item);
  });

  // Particle Background Effect
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);
  canvas.style.position = "fixed";
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 100;

  class Particle {
      constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.radius = Math.random() * 3 + 1;
          this.xSpeed = Math.random() * 2 - 1;
          this.ySpeed = Math.random() * 2 - 1;
      }

      draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(230, 0, 115, 0.8)";
          ctx.fill();
      }

      update() {
          this.x += this.xSpeed;
          this.y += this.ySpeed;

          if (this.x < 0 || this.x > canvas.width) this.xSpeed *= -1;
          if (this.y < 0 || this.y > canvas.height) this.ySpeed *= -1;
      }
  }

  for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
  }

  function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
          particle.update();
          particle.draw();
      });
      requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  });
});
