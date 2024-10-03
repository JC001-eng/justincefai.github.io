document.addEventListener("DOMContentLoaded", () => {
  let ticking = false;
  let lastScrollPosition = 0;
  const modal = document.getElementById("workModal");
  const modalBottom = window.scrollY;

  const handleScroll = (modal) => {
    const scrollPosition = modal.scrollTop;

    const homeButton = document.getElementById("workCloseButton");
    const closeButton = document.getElementById("homeWork");

    if (scrollPosition < lastScrollPosition || scrollPosition < 150) {
      homeButton.classList.add("fixed");
      closeButton.classList.add("fixed");
      homeButton.classList.remove("hidden");
      closeButton.classList.remove("hidden");
    } else {
      homeButton.classList.add("hidden");
      closeButton.classList.add("hidden");
    }

    lastScrollPosition = scrollPosition;
  };

  modal.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll(modal);
        ticking = false;
      });
      ticking = true;
    }
  });
});
