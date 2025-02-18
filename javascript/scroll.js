document.addEventListener("DOMContentLoaded", () => {
  let ticking = false;
  let lastScrollPosition = 0;
  const modal = document.getElementById("workModal");
  const modalBottom = window.scrollY;
  const nameSvg = [...document.getElementsByClassName("name-svg")];
  const titleSvg = document.getElementById("title-svg");

  const showTitle = () => {
    nameSvg.map((svg) => {
      svg.style.stroke = "black";
      svg.classList.add("animate");
    });

    setTimeout(() => {
      nameSvg.map((svg) => svg.classList.add("filled"));
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
      window.requestAnimationFrame(() => {
        handleScroll(modal);
        ticking = false;
      });
      ticking = true;
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
      return htmlElement.style.filter === "invert(0)"
        ? (htmlElement.style.filter = "invert(0.95)")
        : (htmlElement.style.filter = "invert(0)");
    } else {
      return !!isInverted
        ? (htmlElement.style.filter = "invert(0)")
        : (htmlElement.style.filter = "invert(0.95)");
    }
  };

  invertButton.addEventListener("click", toggleInvertFilter);
});
