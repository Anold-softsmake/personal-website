document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  const nav = document.querySelector(".nav-wrap");
  const revealItems = document.querySelectorAll(".reveal");
  const sections = document.querySelectorAll("main section[id]");
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  // Mobile navigation
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
      body.classList.toggle("menu-open", open);
    });

    navAnchors.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        body.classList.remove("menu-open");
      });
    });
  }

  // Scroll reveal with staggered timing
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -50px 0px" });

    revealItems.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min((index % 7) * 70, 420)}ms`);
      observer.observe(item);
    });
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Navigation reacts to scrolling
  const setScrolled = () => {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 30);
  };
  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

    sections.forEach(section => sectionObserver.observe(section));
  }

  // Subtle hero movement based on pointer position
  const heroVisual = document.querySelector(".unique-hero");
  if (heroVisual && window.matchMedia("(pointer:fine)").matches) {
    heroVisual.addEventListener("pointermove", (event) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      heroVisual.style.setProperty("--mx", `${x * 12}px`);
      heroVisual.style.setProperty("--my", `${y * 12}px`);
    });

    heroVisual.addEventListener("pointerleave", () => {
      heroVisual.style.setProperty("--mx", "0px");
      heroVisual.style.setProperty("--my", "0px");
    });
  }

  // Project-card pointer glow
  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("pointermove", (event) => {
      if (!window.matchMedia("(pointer:fine)").matches) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--px", `${event.clientX - rect.left}px`);
      card.style.setProperty("--py", `${event.clientY - rect.top}px`);
    });
  });

  // Smooth keyboard focus for anchor navigation
  navAnchors.forEach(link => {
    link.addEventListener("keydown", event => {
      if (event.key === "Enter") link.click();
    });
  });
});
