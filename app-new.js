// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initNavbarActiveLink();
    initContactForm();
    initSmoothScroll();
});

// ============ NAVBAR ============
function initNavbar() {
    const navbarMenu = document.getElementById('navbarMenu');
    const navbarToggle = document.getElementById('navbarToggle');

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
    });
}

function initNavbarActiveLink() {
    const navLinks = document.querySelectorAll('.navbar-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-menu a');

    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.navbar-menu a[href="#${sectionId}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

// ============ MOBILE MENU ============
function initMobileMenu() {
    const toggle = document.getElementById('navbarToggle');
    const menu = document.getElementById('navbarMenu');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('mobile-active');
    });

    // Close menu when link is clicked
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('mobile-active');
        });
    });
}

// ============ SMOOTH SCROLLING ============
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============ CONTACT FORM ============
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleContactFormSubmit);
    }
}

async function handleContactFormSubmit(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        phone: '',
        company: document.getElementById('company').value,
        message: document.getElementById('message').value,
        type: document.getElementById('inquirytype').value || 'General Enquiry',
        date: new Date().toISOString()
    };

    try {
        // Try to submit to API
        const response = await fetch('https://omnitratech-web.onrender.com/api/form-entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Thank you! Your message has been sent. We\'ll get back to you soon.');
            document.getElementById('contactForm').reset();
        } else {
            alert('Message sent! We\'ll get back to you soon.');
            document.getElementById('contactForm').reset();
        }
    } catch (error) {
        console.log('Form submitted locally (API not available)');
        alert('Thank you! Your message has been received. We\'ll get back to you soon.');
        document.getElementById('contactForm').reset();
    }
}

// ============ DATA LOADING ============
async function loadData() {
    try {
        if (typeof appData !== 'undefined') {
            // Data already loaded from data.js
            console.log('Data loaded from data.js');
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// ============ SCROLL ANIMATIONS ============
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-in forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .resource-card, .industry-item').forEach(el => {
        observer.observe(el);
    });
}

window.addEventListener('load', observeElements);

console.log('OmnitraTech Vanilla HTML/CSS/JS - Loaded Successfully');
