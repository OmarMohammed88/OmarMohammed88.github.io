// Copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Nav scroll effect
const nav = document.getElementById('nav');
function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveLink();
}
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    const open = navToggle.classList.toggle('open');
    navMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// Scroll-reveal animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger siblings within the same parent grid/list
            const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, Math.min(idx * 80, 320));
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
function updateActiveLink() {
    const y = window.scrollY + 120;
    sections.forEach(section => {
        const top    = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id     = section.getAttribute('id');
        const link   = document.querySelector(`.nav__link[href="#${id}"]`);
        if (link) link.classList.toggle('active', y >= top && y < bottom);
    });
}

// Smooth scroll polyfill for Safari
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
