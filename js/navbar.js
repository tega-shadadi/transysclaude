(function () {
  const navbar = document.querySelector(".navbar");
  const toggle = document.querySelector(".navbar__toggle");
  const mobileMenu = document.querySelector(".navbar__mobile");

  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 12) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.classList.toggle("is-open");
      mobileMenu.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.classList.remove("is-open");
        mobileMenu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
