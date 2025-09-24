document.addEventListener("DOMContentLoaded", () => {
  // ===== Header Responsiveness =====
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // ===== Smooth Scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== Navbar Active Link on Scroll =====
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // ===== Fade-in Sections =====
  const faders = document.querySelectorAll('section');
  const appearOnScroll = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
  faders.forEach(fader => appearOnScroll.observe(fader));

  // ===== Portfolio Accordion =====
  const accordions = document.querySelectorAll(".accordion-btn");
  accordions.forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector(".accordion-icon");

      // Close all others
      document.querySelectorAll(".accordion-content.open").forEach(openContent => {
        if (openContent !== content) {
          openContent.classList.remove("open");
          openContent.style.maxHeight = null;
          openContent.previousElementSibling
            .querySelector(".accordion-icon").textContent = "+";
        }
      });

      // Toggle clicked one
      const isOpen = content.classList.contains("open");
      content.classList.toggle("open");
      content.style.maxHeight = isOpen ? null : content.scrollHeight + "px";
      icon.textContent = isOpen ? "+" : "-";
    });
  });

  // ===== Blog Reveal =====
  const blogSections = document.querySelectorAll(".blog-posts, .featured-post");
  const revealSections = () => {
    blogSections.forEach(section => {
      if (section.getBoundingClientRect().top < window.innerHeight - 100) {
        section.classList.add("visible");
      }
    });
  };
  revealSections();
  window.addEventListener("scroll", revealSections);
});
