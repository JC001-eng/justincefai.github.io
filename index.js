// document.addEventListener("DOMContentLoaded", function () {
//   // Get references to the buttons and sections
//   const projectsButton = document.getElementById("showProjects");
//   const testimonialsButton = document.getElementById("showTestimonials");
//   const projectsSection = document.getElementById("projects");
//   const testimonialsSection = document.getElementById("testimonials");

//   console.log(testimonialsButton)

//   // Show Projects and hide Testimonials on page load
//   projectsSection.style.display = "block";
//   testimonialsSection.style.display = "none";

//   // Event listener for the "Projects" button
//   projectsButton.addEventListener("click", function (e) {
//     e.preventDefault();
//     projectsSection.style.display = "block"; // Show Projects section
//     testimonialsSection.style.display = "none"; // Hide Testimonials section
//   });

//   // Event listener for the "Testimonials" button
//   testimonialsButton.addEventListener("click", function (e) {
//     e.preventDefault();
//     console.log("button clicked")
//     testimonialsSection.style.display = "block"; // Show Testimonials section
//     projectsSection.style.display = "none"; // Hide Projects section
//   });
// });

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

document.addEventListener("DOMContentLoaded", function () {
  // Open About Modal
  openAbout.onclick = function (event) {
    event.preventDefault();
    aboutModal.classList.add("show");

    fetch("/about/about.html")
      .then((response) => response.text())
      .then((data) => {
        aboutBody.innerHTML = data;
      })
      .catch((error) => console.error("Error loading about page:", error));
  };

  closeAbout.onclick = function () {
    aboutModal.classList.remove("show");
  };

  // Open Contact Modal
  openContact.onclick = function (event) {
    event.preventDefault();
    contactModal.classList.add("show");

    fetch("/contact/contact.html")
      .then((response) => response.text())
      .then((data) => {
        contactBody.innerHTML = data;
      })
      .catch((error) => console.error("Error loading contact page:", error));
  };

  closeContact.onclick = function () {
    contactModal.classList.remove("show");
  };

  // Open Work Modal
  openWork.onclick = function (event) {
    event.preventDefault();
    workModal.classList.add("show");

    fetch("/work/work.html")
      .then((response) => response.text())
      .then((data) => {
        workBody.innerHTML = data;

        const projects = document.getElementById("projects");
        const testimonials = document.getElementById("testimonials");

        projects.classList.add("show"); 
        testimonials.classList.remove("show");

        document.getElementById("projectsNav").onclick = function (event) {
          event.preventDefault();
          projects.classList.add("show");
          testimonials.classList.remove("show");
        };

        document.getElementById("testimonialsNav").onclick = function (event) {
          event.preventDefault();
          projects.classList.remove("show");
          testimonials.classList.add("show");
        };
      })
      .catch((error) => console.error("Error loading work page:", error));
  };

  closeWork.onclick = function () {
    workModal.classList.remove("show");
  };

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      workModal.classList.remove("show");
      document.body.classList.remove("body-no-scroll");
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
