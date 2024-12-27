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
});
