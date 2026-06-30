(function () {
  const root = document.querySelector("[data-testimonials]");
  if (!root) return;

  const viewport = root.querySelector(".testimonials__viewport");
  const track = root.querySelector(".testimonials__track");
  const slides = Array.from(track.children);
  const dotsWrap = root.querySelector(".testimonials__dots");
  const prevBtn = root.querySelector("[data-prev]");
  const nextBtn = root.querySelector("[data-next]");
  const progressBar = root.querySelector(".testimonials__progress-bar");

  const AUTOPLAY_MS = 6000; // 5-7s window, 6s default
  let perView = getPerView();
  let index = 0;
  let autoplayTimer = null;
  let progressStart = null;
  let isPaused = false;

  function getPerView() {
    const w = window.innerWidth;
    if (w <= 640) return 1;
    if (w <= 1024) return 2;
    return 3;
  }

  function maxIndex() {
    return Math.max(0, slides.length - perView);
  }

  function buildDots() {
    dotsWrap.innerHTML = "";
    const dotCount = maxIndex() + 1;
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement("button");
      dot.className = "testimonials__dot";
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      dot.addEventListener("click", () => goTo(i, true));
      dotsWrap.appendChild(dot);
    }
    updateDots();
  }

  function updateDots() {
    Array.from(dotsWrap.children).forEach((dot, i) => {
      dot.classList.toggle("is-active", i === index);
    });
  }

  function update() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = 24;
    track.style.transform = `translateX(-${index * (slideWidth + gap)}px)`;
    updateDots();
  }

  function goTo(i, userInitiated) {
    index = Math.min(Math.max(i, 0), maxIndex());
    update();
    if (userInitiated) restartAutoplay();
  }

  function next() {
    index = index >= maxIndex() ? 0 : index + 1;
    update();
  }

  function prev() {
    index = index <= 0 ? maxIndex() : index - 1;
    update();
  }

  function startProgress() {
    if (!progressBar) return;
    progressBar.classList.remove("is-animating");
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    // force reflow
    void progressBar.offsetWidth;
    progressBar.classList.add("is-animating");
    progressBar.style.transition = `width ${AUTOPLAY_MS}ms linear`;
    progressBar.style.width = "100%";
  }

  function startAutoplay() {
    clearTimeout(autoplayTimer);
    if (isPaused) return;
    startProgress();
    autoplayTimer = setTimeout(() => {
      next();
      startAutoplay();
    }, AUTOPLAY_MS);
  }

  function restartAutoplay() {
    clearTimeout(autoplayTimer);
    startAutoplay();
  }

  function pause() {
    isPaused = true;
    clearTimeout(autoplayTimer);
    if (progressBar) {
      const computed = getComputedStyle(progressBar).width;
      progressBar.style.transition = "none";
      progressBar.style.width = computed;
    }
  }

  function resume() {
    if (!isPaused) return;
    isPaused = false;
    startAutoplay();
  }

  // Click-to-play: swap thumbnail for live YouTube iframe
  root.querySelectorAll("[data-video-id]").forEach((wrapper) => {
    wrapper.addEventListener("click", () => {
      const videoId = wrapper.getAttribute("data-video-id");
      if (wrapper.querySelector("iframe")) return;
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      iframe.title = "Customer testimonial video";
      iframe.allow = "accelerate-x; autoplay; encrypted-media; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.loading = "lazy";
      wrapper.appendChild(iframe);
      pause();
    });
  });

  prevBtn?.addEventListener("click", () => {
    prev();
    restartAutoplay();
  });

  nextBtn?.addEventListener("click", () => {
    next();
    restartAutoplay();
  });

  viewport.addEventListener("mouseenter", pause);
  viewport.addEventListener("mouseleave", resume);
  viewport.addEventListener("focusin", pause);
  viewport.addEventListener("focusout", resume);

  // Touch swipe support
  let touchStartX = 0;
  viewport.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      pause();
    },
    { passive: true }
  );
  viewport.addEventListener(
    "touchend",
    (e) => {
      const delta = e.changedTouches[0].clientX - touchStartX;
      if (delta > 40) prev();
      if (delta < -40) next();
      resume();
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    const newPerView = getPerView();
    if (newPerView !== perView) {
      perView = newPerView;
      buildDots();
    }
    index = Math.min(index, maxIndex());
    update();
  });

  buildDots();
  update();
  startAutoplay();
})();