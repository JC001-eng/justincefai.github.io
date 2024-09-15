document.addEventListener("DOMContentLoaded", () => {
  const getById = (id) => document.getElementById(id);

  const wrapperMain = document.getElementById("wrapper-main");

  const modals = {
    about: {
      modal: getById("aboutModal"),
      body: getById("aboutBody"),
      openButtons: [getById("openAbout")],
      closeButton: getById("closeAbout"),
      homeButton: getById("aboutHomeButton"), // Use unique ID for home button
      url: "/about/about.html",
    },
    contact: {
      modal: getById("contactModal"),
      body: getById("contactBody"),
      openButtons: [getById("openContact")],
      closeButton: getById("closeContact"),
      homeButton: getById("contactHomeButton"), // Use unique ID for home button
      url: "/contact/contact.html",
    },
    work: {
      modal: getById("workModal"),
      body: getById("workBody"),
      openButtons: [getById("openWork")],
      closeButton: getById("closeWork"),
      homeButton: getById("workHomeButton"), // Use unique ID for home button
      url: "/work/workV2.html",
    },
  };

  const openModal = (modalObj) => {
    const { modal, body, url } = modalObj;
    modal.classList.add("show");
    document.body.classList.add("modal-open");
    wrapperMain.classList.add("modal-open");

    body.innerHTML = "";

    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        body.innerHTML = data;

        if (modalObj === modals.work) {
          setupWorkNavigation();
        }
      })
      .catch((error) => console.error(`Error loading ${url}:`, error));
  };

  const closeModal = (modal) => {
    if (modal) {
      console.log("Closing modal:", modal); // Log the modal being closed
      modal.classList.remove("show"); // Remove the 'show' class
    } else {
      console.error("Modal reference not found!");
    }
    document.body.classList.remove("modal-open");
    wrapperMain.classList.remove("modal-open");
  };

  const setupModalButtons = (modalObj) => {
    // Open modal when any of the open buttons is clicked
    modalObj.openButtons.forEach((button) => {
      button.onclick = (event) => {
        event.preventDefault();
        openModal(modalObj);
      };
    });

    // Close modal when close button is clicked
    modalObj.closeButton.onclick = () => {
      closeModal(modalObj.modal); // Pass the correct modal to close
    };

    // Close both modal and navigation when home button is clicked
    modalObj.homeButton.onclick = () => {
      closeModal(modalObj.modal); // Pass the correct modal to close
      closeNav(); // Close the navigation
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
  });
});
