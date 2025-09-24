
//header reesponsiveness 
const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
// Simple smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
  });
});
// Navbar active link on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});
// Fade-in sections on scroll
const faders = document.querySelectorAll('section');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});


//portfolio
document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".accordion-btn");

  accordions.forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector(".accordion-icon");

      // Close all other sections first
      document.querySelectorAll(".accordion-content.open").forEach(openContent => {
        if (openContent !== content) {
          openContent.classList.remove("open");
          openContent.style.maxHeight = null;
          openContent.previousElementSibling
            .querySelector(".accordion-icon").textContent = "+";
        }
      });

      // Toggle the clicked one
      const isOpen = content.classList.contains("open");
      content.classList.toggle("open");
      content.style.maxHeight = isOpen ? null : content.scrollHeight + "px";
      icon.textContent = isOpen ? "+" : "-";
    });
  });
});

//blog
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".blog-posts, .featured-post");

  const revealSections = () => {
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (sectionTop < windowHeight - 100) {
        section.classList.add("visible");
      }
    });
  };

  revealSections();
  window.addEventListener("scroll", revealSections);
});




  






