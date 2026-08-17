document.addEventListener("DOMContentLoaded", () => {
  /* ---------- icons ---------- */
  if (window.lucide) lucide.createIcons();

  /* ---------- navbar scroll state + mobile menu ---------- */
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");

  const onScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (navToggle && navbar) {
    navToggle.addEventListener("click", () => {
      navbar.classList.toggle("mobile-open");
      navToggle.classList.toggle("open");
    });
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("mobile-open");
        navToggle.classList.remove("open");
      });
    });
  }

  /* ---------- highlight active section link ---------- */
  const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (sectionLinks.length) {
    const targets = Array.from(sectionLinks)
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);
    if (targets.length && "IntersectionObserver" in window) {
      const spy = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (!link) return;
            if (entry.isIntersecting) {
              sectionLinks.forEach((l) => l.classList.remove("active"));
              link.classList.add("active");
            }
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      targets.forEach((t) => spy.observe(t));
    }
  }

  /* ---------- scroll reveal animations ---------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll(".reveal").forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: (i % 4) * 0.08,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("revealed"));
  }

  /* ---------- animated stat counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const animateCount = (el) => {
      const target = parseFloat(el.getAttribute("data-count"));
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => counterObserver.observe(c));
  }

  /* ---------- partner logo carousel ---------- */
  if (window.Swiper && document.querySelector(".partners-swiper")) {
    new Swiper(".partners-swiper", {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: true,
      autoplay: { delay: 2400, disableOnInteraction: false },
      pagination: { el: ".partners-swiper .swiper-pagination", clickable: true },
      breakpoints: {
        640: { slidesPerView: 3 },
        980: { slidesPerView: 5 },
      },
    });
  }

  /* ---------- product gallery carousel ---------- */
  if (window.Swiper && document.querySelector(".gallery-swiper")) {
    new Swiper(".gallery-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: { delay: 3200, disableOnInteraction: false },
      navigation: {
        nextEl: ".gallery-swiper .swiper-button-next",
        prevEl: ".gallery-swiper .swiper-button-prev",
      },
      pagination: { el: ".gallery-swiper .swiper-pagination", clickable: true },
    });
  }

  /* ---------- crossfading image pairs ---------- */
  document.querySelectorAll(".fade-images").forEach((wrap) => {
    const imgs = wrap.querySelectorAll("img");
    if (imgs.length < 2) return;
    let current = 0;
    imgs[0].classList.add("fade-active");
    setInterval(() => {
      imgs[current].classList.remove("fade-active");
      current = (current + 1) % imgs.length;
      imgs[current].classList.add("fade-active");
    }, 3500);
  });

  /* ---------- footer year ---------- */
  document.querySelectorAll(".current-year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});
