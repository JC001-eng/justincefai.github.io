document.addEventListener("DOMContentLoaded", () => {
  const getById = (id) => document.getElementById(id);
  const wrapperMain = getById("wrapper-main");

  const modals = {
    about: {
      modal: getById("aboutModal"),
      body: getById("aboutBody"),
      openButtons: [getById("openAbout")],
      closeButton: getById("homeAbout"),
      homeButton: getById("aboutCloseButton"),
      url: "/about/about.html",
    },
    contact: {
      modal: getById("contactModal"),
      body: getById("contactBody"),
      openButtons: [getById("openContact")],
      closeButton: getById("homeContact"),
      homeButton: getById("contactCloseButton"),
      url: "/contact/contact.html",
    },
    work: {
      modal: getById("workModal"),
      body: getById("workBody"),
      openButtons: [getById("openWork")],
      closeButton: getById("homeWork"),
      homeButton: getById("workCloseButton"),
      url: "/work/workV2.html",
    },
  };

  const preloadStylesheets = () => {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    return Promise.all(
      Array.from(links).map(
        (link) =>
          new Promise((resolve, reject) => {
            link.onload = resolve;
            link.onerror = reject;
          })
      )
    );
  };

  const openModal = (modalObj) => {
    const { modal, body, url } = modalObj;

    body.innerHTML = "";

    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        body.innerHTML = data;

        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = data;
        const newStylesheets = tempDiv.querySelectorAll(
          'link[rel="stylesheet"]'
        );

        const promises = Array.from(newStylesheets).map((link) => {
          if (!document.head.querySelector(`link[href="${link.href}"]`)) {
            const newLink = document.createElement("link");
            newLink.rel = "stylesheet";
            newLink.href = link.href;
            document.head.appendChild(newLink);
            return new Promise((resolve, reject) => {
              newLink.onload = resolve;
              newLink.onerror = reject;
            });
          }
          return Promise.resolve();
        });

        Promise.all(promises)
          .then(() => {
            modal.classList.add("show");
            document.body.classList.add("modal-open");
            wrapperMain.classList.add("modal-open");

            if (modalObj === modals.work) {
              setupWorkNavigation();
            }
          })
          .catch((error) => console.error("Stylesheet loading error:", error));
      })
      .catch((error) => console.error(`Error loading ${url}:`, error));
  };

  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove("show");
    }
    document.body.classList.remove("modal-open");
    wrapperMain.classList.remove("modal-open");
  };

  const setupModalButtons = (modalObj) => {
    modalObj.openButtons.forEach((button) => {
      button.onclick = (event) => {
        event.preventDefault();
        openModal(modalObj);
      };
    });

    modalObj.closeButton.onclick = () => {
      closeModal(modalObj.modal);
    };

    modalObj.homeButton.onclick = () => {
      closeModal(modalObj.modal);
      closeNav();
    };
  };

  Object.values(modals).forEach((modalObj) => setupModalButtons(modalObj));

  const navButton = getById("nav-button");
  const navList = getById("nav-list");
  const closeNavBtn = getById("closeNav");

  function closeNav() {
    navList.classList.remove("visible");
  }

  navButton.onclick = () => {
    navList.classList.add("visible");
  };

  closeNavBtn.onclick = closeNav;

  const setupWorkNavigation = () => {
    const projects = getById("projects");
    const testimonials = getById("testimonials");
    const projectsNav = getById("projectsNav");
    const testimonialsNav = getById("testimonialsNav");

    projects.classList.add("show");
    testimonials.classList.remove("show");
    projectsNav.classList.add("active");

    projectsNav.onclick = (event) => {
      event.preventDefault();
      projects.classList.add("show");
      testimonials.classList.remove("show");
      projectsNav.classList.add("active");
      testimonialsNav.classList.remove("active");
    };

    testimonialsNav.onclick = (event) => {
      event.preventDefault();
      projects.classList.remove("show");
      testimonials.classList.add("show");
      testimonialsNav.classList.add("active");
      projectsNav.classList.remove("active");
    };
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      Object.values(modals).forEach((modalObj) => closeModal(modalObj.modal));
    }
  });

  window.onclick = (event) => {
    Object.values(modals).forEach((modalObj) => {
      if (event.target === modalObj.modal) {
        closeModal(modalObj.modal);
      }
    });
  };

  document.addEventListener("click", (event) => {
    const { target } = event;

    if (target.classList.contains("read-more")) {
      const content = target.parentElement.previousElementSibling;

      if (content && content.classList.contains("line-clamp")) {
        content.classList.remove("line-clamp");
        target.style.display = "none";
      }
    }

    const anchor = document.getElementById("work-main");

    const backToTopTarget = event.target.closest(
      ".scroll-to-top, .scroll-to-top svg"
    );

    if (backToTopTarget) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    const resume = document.getElementById("resume-wrapper");
    const resumeBtn = event.target.closest("#resume-btn");
    const closeResume = event.target.closest("#close-resume");

    if (resumeBtn) resume.classList.add("visible");
    if (closeResume) resume.classList.remove("visible");
  });

  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;

  const minSwipeDistanceX = 80;
  const maxVerticalSwipeDistance = 50;

  const handleSwipe = () => {
    const horizontalSwipeDistance = touchEndX - touchStartX;
    const verticalSwipeDistance = Math.abs(touchEndY - touchStartY);

    if (
      horizontalSwipeDistance > minSwipeDistanceX &&
      verticalSwipeDistance < maxVerticalSwipeDistance
    ) {
      Object.values(modals).forEach((modalObj) => closeModal(modalObj.modal));
    }
  };

  window.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
  });

  window.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    touchEndY = event.changedTouches[0].screenY;
    handleSwipe();
  });

  preloadStylesheets().then(() => {
    Object.values(modals).forEach((modalObj) => setupModalButtons(modalObj));
  });
});
