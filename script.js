document.addEventListener("DOMContentLoaded", () => {
  // NAV TOGGLE (mobile)
  const navToggle = document.querySelector("#nav-toggle");
  const navLinks = document.querySelector("#nav-links");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navToggle.classList.toggle("active"); // rotate burger
  });

  // smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        navLinks.classList.remove("active");
        navToggle.classList.remove("active");
      }
    });
  });

  // ACCORDION
  document.querySelectorAll(".accordion-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const isOpen = content.classList.contains("open");

      document.querySelectorAll(".accordion-content.open").forEach(openEl => {
        if (openEl !== content) {
          openEl.classList.remove("open");
          openEl.style.maxHeight = null;
          openEl.previousElementSibling.querySelector(".accordion-icon").textContent = "+";
        }
      });

      if (isOpen) {
        content.classList.remove("open");
        content.style.maxHeight = null;
        btn.querySelector(".accordion-icon").textContent = "+";
      } else {
        content.classList.add("open");
        content.style.maxHeight = content.scrollHeight + "px";
        btn.querySelector(".accordion-icon").textContent = "−";
      }
    });
  });

  // Reveal sections on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });
  document.querySelectorAll("section").forEach(sec => observer.observe(sec));

  // Reveal blog cards on scroll
  const blogCards = document.querySelectorAll('.post-card');
  const blogObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        blogObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  blogCards.forEach(card => blogObserver.observe(card));

  // ✅ Animate QA Highlights heading when in view
  const qaHeading = document.querySelector('.blog h2');
  if (qaHeading) {
    const headingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          qaHeading.classList.add('animate');
          headingObserver.unobserve(qaHeading);
        }
      });
    }, { threshold: 0.2 });
    headingObserver.observe(qaHeading);
  }
});
