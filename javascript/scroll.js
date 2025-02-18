document.addEventListener("DOMContentLoaded", () => {
  let ticking = false;
  let lastScrollPosition = 0;
  const modal = document.getElementById("workModal");
  const modalBottom = window.scrollY;
  const nameSvg = [...document.getElementsByClassName("name-svg")];
  const titleSvg = document.getElementById("title-svg");

  const showTitle = () => {
    nameSvg.forEach((svg) => {
      svg.style.stroke = "black";
      svg.classList.add("animate");
    });

    setTimeout(() => {
      nameSvg.forEach((svg) => svg.classList.add("filled"));
    }, 2300);

    setTimeout(() => {
      titleSvg.classList.add("svg-show");
    }, 2100);
  };

  setTimeout(() => {
    showTitle();
  }, 500);

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
      ticking = true;
      window.requestAnimationFrame(() => {
        handleScroll(modal);
        ticking = false;
      });
    }
  });

  const invertButton = document.getElementById("darkMode");

  const toggleInvertFilter = () => {
    const htmlElement = document.documentElement;
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isInverted = htmlElement.style.filter === "invert(0.95)";

    if (prefersDarkMode) {
      htmlElement.style.filter =
        htmlElement.style.filter === "invert(0)" ? "invert(0.95)" : "invert(0)";
    } else {
      htmlElement.style.filter = isInverted ? "invert(0)" : "invert(0.95)";
    }
  };

  invertButton.addEventListener("click", toggleInvertFilter);
});
