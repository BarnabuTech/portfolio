'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
sidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  // Convert the selected value to lowercase and replace spaces with hyphens to match data-category format
  const formattedValue = selectedValue.toLowerCase().replace(/\s+/g, '-');
  
  for (let i = 0; i < filterItems.length; i++) {
    const item = filterItems[i];
    const itemCategory = item.getAttribute('data-category').toLowerCase().replace(/\s+/g, '-');
    
    if (formattedValue === 'all' || itemCategory.includes(formattedValue)) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  }

  // Update URL hash for deep linking
  window.location.hash = selectedValue === 'all' ? '#' : `#${formattedValue}`;
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

// Function to set active state on filter buttons
const setActiveFilterButton = (value) => {
  for (let i = 0; i < filterBtn.length; i++) {
    const btn = filterBtn[i];
    const btnValue = btn.innerText.toLowerCase();
    
    if (value === 'all' && btnValue === 'all') {
      btn.classList.add('active');
      lastClickedBtn = btn;
    } else if (btnValue === value.toLowerCase()) {
      btn.classList.add('active');
      lastClickedBtn = btn;
    } else {
      btn.classList.remove('active');
    }
  }
};

// Initialize with 'All' filter active
setActiveFilterButton('all');

// Add click events to filter buttons
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    setActiveFilterButton(selectedValue);
  });
}

// Handle initial load with hash in URL
const handleInitialFilter = () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    const formattedHash = hash.replace(/-/g, ' ');
    const matchingBtn = Array.from(filterBtn).find(
      btn => btn.innerText.toLowerCase() === formattedHash
    );
    
    if (matchingBtn) {
      matchingBtn.click();
    }
  } else {
    // Default to 'All' filter
    filterFunc('all');
  }
};

// Run on initial load
window.addEventListener('load', handleInitialFilter);

// Also run when hash changes
window.addEventListener('hashchange', handleInitialFilter);



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// Backend Integration for Contact Form with Django.

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const formInputs = document.querySelectorAll(".form-input");
  const formBtn = document.getElementById("submitBtn");
  const responseMessage = document.getElementById("responseMessage");

  // Enable the submit button when form is valid
  formInputs.forEach(input => {
      input.addEventListener("input", function () {
          formBtn.disabled = !form.checkValidity();
      });
  });

  // Handle form submission
  form.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Disable button & show loading text
      formBtn.disabled = true;
      formBtn.innerHTML = `<ion-icon name="paper-plane"></ion-icon> Sending...`;

      // Collect form data
      const formData = {
          full_name: document.getElementById("full_name").value.trim(),
          email_address: document.getElementById("email_address").value.trim(),
          message: document.getElementById("message").value.trim()
      };

      // Basic front-end validation
      if (!formData.full_name || !formData.email_address || !formData.message) {
          responseMessage.textContent = "All fields are required!";
          responseMessage.style.color = "red";
          formBtn.innerHTML = `<ion-icon name="paper-plane"></ion-icon> Send Message`;
          formBtn.disabled = false;
          return;
      }

      // Send data to Django backend
      try {
          const response = await fetch("https://YOUR-RENDER-BACKEND-URL.onrender.com/contact/submit/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
          });

          const result = await response.json();
          
          if (response.ok) {
              responseMessage.textContent = "Message sent successfully!";
              responseMessage.style.color = "green";
              form.reset(); // Clear the form
              formBtn.disabled = true; // Disable button again after submission
          } else {
              responseMessage.textContent = result.error || "Error submitting form!";
              responseMessage.style.color = "red";
          }

      } catch (error) {
          console.error("Submission Error:", error);
          responseMessage.textContent = "Error: Unable to submit form. Try again later!";
          responseMessage.style.color = "red";
      }

      // Reset button text
      formBtn.innerHTML = `<ion-icon name="paper-plane"></ion-icon> Send Message`;
  });
});

