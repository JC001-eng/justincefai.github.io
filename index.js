const aboutModal = document.getElementById("aboutModal");
const aboutBody = document.getElementById("aboutBody");
const openAbout = document.getElementById("openAbout");
const closeAbout = document.getElementById("closeAbout");

const contactModal = document.getElementById("contactModal");
const contactBody = document.getElementById("contactBody");
const openContact = document.getElementById("openContact");
const closeContact = document.getElementById("closeContact");

const workModal = document.getElementById("workModal");
const workBody = document.getElementById("workBody");
const openWork = document.getElementById("openWork");
const closeWork = document.getElementById("closeWork");

const showProjects = document.getElementById("showProjects");
const showTestimonials = document.getElementById("showTestimonials");
const wrapperMain = document.getElementById("wrapper-main");

document.addEventListener("DOMContentLoaded", function () {
  // Open About Modal
  openAbout.onclick = function (event) {
    event.preventDefault();
    aboutModal.classList.add("show");
    document.body.classList.add('modal-open');
    wrapperMain.classList.add('modal-open');

    fetch("/about/about.html")
      .then((response) => response.text())
      .then((data) => {
        aboutBody.innerHTML = data;
      })
      .catch((error) => console.error("Error loading about page:", error));
  };

  closeAbout.onclick = function () {
    aboutModal.classList.remove("show");
    document.body.classList.remove('modal-open');
    wrapperMain.classList.remove('modal-open');
  };

  // Open Contact Modal
  openContact.onclick = function (event) {
    event.preventDefault();
    contactModal.classList.add("show");
    document.body.classList.add('modal-open');
    wrapperMain.classList.add('modal-open');

    fetch("/contact/contact.html")
      .then((response) => response.text())
      .then((data) => {
        contactBody.innerHTML = data;
      })
      .catch((error) => console.error("Error loading contact page:", error));
  };

  closeContact.onclick = function () {
    contactModal.classList.remove("show");
    document.body.classList.remove('modal-open');
    wrapperMain.classList.remove('modal-open');
  };

  // Open Work Modal
  openWork.onclick = function (event) {
    event.preventDefault();
    workModal.classList.add("show");
    document.body.classList.add('modal-open');
    wrapperMain.classList.add('modal-open');

    fetch("/work/workV2.html")
      .then((response) => response.text())
      .then((data) => {
        workBody.innerHTML = data;

        const projects = document.getElementById("projects");
        const testimonials = document.getElementById("testimonials");
        const projectsNav = document.getElementById("projectsNav");
        const testimonialsNav = document.getElementById("testimonialsNav");

        projects.classList.add("show"); 
        testimonials.classList.remove("show");
        projectsNav.classList.add("active");

        projectsNav.onclick = function (event) {
          event.preventDefault();
          projects.classList.add("show");
          testimonials.classList.remove("show");
          testimonialsNav.classList.remove("active");
          projectsNav.classList.add("active");
        };

        testimonialsNav.onclick = function (event) {
          event.preventDefault();
          projects.classList.remove("show");
          testimonials.classList.add("show");
          testimonialsNav.classList.add("active");
          projectsNav.classList.remove("active");
        };
      })
      .catch((error) => console.error("Error loading work page:", error));
  };

  closeWork.onclick = function () {
    workModal.classList.remove("show");
    document.body.classList.remove('modal-open');
    wrapperMain.classList.remove('modal-open');
  };

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      workModal.classList.remove("show");
      document.body.classList.remove('modal-open');
      wrapperMain.classList.remove('modal-open');
    }
  });

  window.onclick = function (event) {
    if (event.target == aboutModal) {
      aboutModal.classList.remove("show");
    }
    if (event.target == contactModal) {
      contactModal.classList.remove("show");
    }
  };
});
