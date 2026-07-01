(function () {
  const lightbox = document.querySelector(".lightbox");
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector(".lightbox__img");
  const closeBtn = lightbox.querySelector(".lightbox__close");
  const items = document.querySelectorAll(".gallery__item[data-full]");

  function open(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => { lightboxImg.src = ""; }, 300);
  }

  items.forEach((item) => {
    item.addEventListener("click", () => {
      open(item.dataset.full, item.dataset.alt);
    });
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") open(item.dataset.full, item.dataset.alt);
    });
  });

  closeBtn?.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
})();