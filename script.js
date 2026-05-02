document.addEventListener("DOMContentLoaded", () => {
    // 1. Reveal Animations on Scroll
    const revealElements = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 2. Trigger initially visible elements specifically for the hero section
    setTimeout(() => {
        const heroReveals = document.querySelectorAll(".hero-section .reveal");
        heroReveals.forEach(el => el.classList.add("is-visible"));
    }, 100);

    // 3. Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navMenu = document.querySelector(".nav-menu");

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }
});
