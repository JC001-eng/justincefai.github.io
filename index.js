const getById = id => document.getElementById(id);
const wrapperMain = document.getElementById("wrapper-main");

const modals = {
  about: {
    modal: getById("aboutModal"),
    body: getById("aboutBody"),
    openButtons: [getById("openAbout"), getById("openAboutDesktop")],
    closeButton: getById("closeAbout"),
    url: "/about/about.html"
  },
  contact: {
    modal: getById("contactModal"),
    body: getById("contactBody"),
    openButtons: [getById("openContact"), getById("openContactDesktop")],
    closeButton: getById("closeContact"),
    url: "/contact/contact.html"
  },
  work: {
    modal: getById("workModal"),
    body: getById("workBody"),
    openButtons: [getById("openWork"), getById("openWorkDesktop")],
    closeButton: getById("closeWork"),
    url: "/work/workV2.html"
  }
};

const openModal = (modalObj) => {
  const { modal, body, url } = modalObj;
  modal.classList.add("show");
  document.body.classList.add('modal-open');
  wrapperMain.classList.add('modal-open');

  body.innerHTML = '';

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
  modal.classList.remove("show");
  document.body.classList.remove('modal-open');
  wrapperMain.classList.remove('modal-open');
  closeMobileNav();
};

const setupModalButtons = (modalObj) => {
  modalObj.openButtons.forEach(button => {
    button.onclick = (event) => {
      event.preventDefault();
      openModal(modalObj);
    };
  });

  modalObj.closeButton.onclick = () => {
    closeModal(modalObj.modal);
  };
};

Object.values(modals).forEach(modalObj => setupModalButtons(modalObj));

const mobileNavButton = getById("mobile-nav-button");
const mobileNavList = getById("mobile-nav-list");
const closeMobileNavBtn = getById("closeMobileNav");

function closeMobileNav() {
  mobileNavList.classList.remove("visible");
}

mobileNavButton.onclick = () => {
  mobileNavList.classList.add("visible");
};

closeMobileNavBtn.onclick = closeMobileNav;

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

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    Object.values(modals).forEach(modalObj => closeModal(modalObj.modal));
  }
});

window.onclick = (event) => {
  Object.values(modals).forEach(modalObj => {
    if (event.target === modalObj.modal) {
      closeModal(modalObj.modal);
    }
  });
};

document.addEventListener('click', (event) => {
  const { target } = event;

  if (target.classList.contains('read-more')) {
    const content = target.parentElement.previousElementSibling;

    if (content && content.classList.contains('line-clamp')) {
      content.classList.remove("line-clamp");
      target.style.display = 'none';
    }
  }
});
