// main.js

// Navbar Navigation
const navbarLinks = document.querySelectorAll('.navbar a');
navbarLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Sidebar Toggle
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
sidebarToggle.addEventListener('click', function () {
    sidebar.classList.toggle('active');
});

// Testimonial Carousel
let testimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = (i === index) ? 'block' : 'none';
    });
}

showTestimonial(testimonialIndex);
setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
}, 5000); // Change every 5 seconds

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-button');
const portfolioItems = document.querySelectorAll('.portfolio-item');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        portfolioItems.forEach(item => {
            item.style.display = (item.classList.contains(filter) || filter === 'all') ? 'block' : 'none';
        });
    });
});

// Modal Dialogs
const modalButtons = document.querySelectorAll('.modal-button');
const closeModalButtons = document.querySelectorAll('.close-modal');
modalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.getAttribute('data-modal'));
        modal.style.display = 'block';
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        modal.style.display = 'none';
    });
});

// Form Interactions
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Form submission logic here
    alert('Form submitted!'); // Placeholder for form logic
    form.reset(); // Reset form
});

// Smooth transitions
const elements = document.querySelectorAll('.fade-element');
elements.forEach(element => {
    element.style.transition = 'opacity 0.5s ease-in-out';
    element.style.opacity = 0;
    setTimeout(() => {
        element.style.opacity = 1;
    }, 100);
});

'use strict';

// ===== ELEMENT SELECTION =====
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
const navbarLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

// Portfolio Filter Elements
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');
const filterSelect = document.querySelector('[data-select]');
const filterSelectValue = document.querySelector('[data-select-value]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectList = document.querySelector('.select-list');

// Testimonial Elements
const testimonialItems = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

// Form Elements
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');

// ===== SIDEBAR TOGGLE =====
function toggleSidebar() {
    sidebar.classList.toggle('active');
    sidebarBtn.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
}

sidebarBtn.addEventListener('click', toggleSidebar);

// Close sidebar when clicking on links
navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !sidebarBtn.contains(e.target)) {
        sidebar.classList.remove('active');
        sidebarBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== NAVBAR NAVIGATION =====
const navigationFunction = function (selectedNav) {
    // Remove active class from all pages
    pages.forEach(page => page.classList.remove('active'));

    // Add active class to selected page
    document.querySelector(`[data-page="${selectedNav}"]`).classList.add('active');

    // Update navbar buttons
    navbarLinks.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
};

navbarLinks.forEach((link, index) => {
    link.addEventListener('click', function () {
        navigationFunction(this.getAttribute('data-nav-link'));
    });
});

// ===== PORTFOLIO FILTER =====
let selectedCategory = 'All';

// Filter button functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Update selected category
        selectedCategory = this.textContent.trim();

        // Filter items
        filterFunction();
    });
});

// Filter select functionality
filterSelect.addEventListener('click', function () {
    this.classList.toggle('active');
});

selectItems.forEach(item => {
    item.addEventListener('click', function () {
        selectedCategory = this.textContent.trim();
        filterSelectValue.textContent = selectedCategory;
        filterSelect.classList.remove('active');

        // Update active button
        selectItems.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Filter items
        filterFunction();
    });
});

function filterFunction() {
    filterItems.forEach(item => {
        if (selectedCategory === 'All') {
            setTimeout(() => {
                item.classList.add('active');
            }, 50);
        } else {
            const category = item.getAttribute('data-category');
            if (category === selectedCategory.toLowerCase()) {
                setTimeout(() => {
                    item.classList.add('active');
                }, 50);
            } else {
                item.classList.remove('active');
            }
        }
    });
}

// Close filter select when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('[data-select]')) {
        filterSelect.classList.remove('active');
    }
});

// ===== TESTIMONIALS MODAL =====
const modalFunction = function () {
    modalContainer.classList.remove('active');
    overlay.classList.remove('active');
};

// Show modal when clicking testimonial
testimonialItems.forEach((item, index) => {
    item.addEventListener('click', function () {
        const testimonialAvatar = this.querySelector('[data-testimonials-avatar]');
        const testimonialTitle = this.querySelector('[data-testimonials-title]');
        const testimonialText = this.querySelector('[data-testimonials-text]');

        const modalAvatar = document.querySelector('[data-modal-img]');
        const modalTitle = document.querySelector('[data-modal-title]');
        const modalText = document.querySelector('[data-modal-text]');

        if (testimonialAvatar && testimonialTitle && testimonialText) {
            modalAvatar.src = testimonialAvatar.src;
            modalTitle.textContent = testimonialTitle.textContent;
            modalText.innerHTML = testimonialText.innerHTML;

            modalContainer.classList.add('active');
            overlay.classList.add('active');
        }
    });
});

// Close modal
modalCloseBtn.addEventListener('click', modalFunction);
overlay.addEventListener('click', modalFunction);

// Close modal when pressing Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('active')) {
        modalFunction();
    }
});

// ===== FORM VALIDATION =====
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate inputs
        let isValid = true;
        formInputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ff6b6b';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });

        if (isValid) {
            // Reset form
            form.reset();

            // Show success message (optional)
            console.log('Form submitted successfully!');

            // You can add additional actions here
            // For example: send data to server
        }
    });

    // Clear error on input
    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.borderColor = '';
        });
    });
}

// ===== SIDEBAR INFO MORE TOGGLE =====
const sidebarMoreBtn = document.querySelector('.info-more-btn');
const sidebarMoreContent = document.querySelector('.sidebar-info-more');

if (sidebarMoreBtn) {
    sidebarMoreBtn.addEventListener('click', function () {
        sidebarMoreContent.classList.toggle('active');

        // Update button text
        const span = this.querySelector('span');
        if (sidebarMoreContent.classList.contains('active')) {
            span.textContent = 'Hide Contacts';
        } else {
            span.textContent = 'Show Contacts';
        }
    });
}

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({behavior: 'smooth'});
            }
        }
    });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== ACTIVE PAGE ON LOAD =====
window.addEventListener('DOMContentLoaded', () => {
    navbarLinks[0].classList.add('active');
});

// ===== UTILITY FUNCTIONS =====
function addLoadingState(element) {
    element.disabled = true;
    element.style.opacity = '0.6';
}

function removeLoadingState(element) {
    element.disabled = false;
    element.style.opacity = '1';
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-item, .timeline-item, .project-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    // Alt + N to navigate through pages
    if (e.altKey && e.code === 'KeyN') {
        e.preventDefault();
        const currentPage = document.querySelector('[data-page].active');
        const pages = Array.from(document.querySelectorAll('[data-page]'));
        const currentIndex = pages.indexOf(currentPage);
        const nextIndex = (currentIndex + 1) % pages.length;

        navbarLinks[nextIndex].click();
    }
});

console.log('Portfolio website loaded successfully! 🚀');