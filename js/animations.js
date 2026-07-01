(function () {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.revealDelay || 0;
          setTimeout(() => entry.target.classList.add("is-visible"), Number(delay));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
})();



(function () {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.revealDelay || 0;
            setTimeout(() => entry.target.classList.add("is-visible"), Number(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((el) => observer.observe(el));
  }
})();

/* Animated bar fills */
(function () {
  const bars = document.querySelectorAll("[data-bar]");
  if (!bars.length || !("IntersectionObserver" in window)) {
    bars.forEach((b) => {
      b.style.width = b.dataset.bar + "%";
    });
    return;
  }

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          setTimeout(() => {
            el.style.width = el.dataset.bar + "%";
          }, 200);
          barObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  bars.forEach((b) => barObserver.observe(b));
})();
(function () {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const decimals = el.dataset.decimals ? Number(el.dataset.decimals) : 0;
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = prefix + value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((el) => counterObserver.observe(el));
})();
