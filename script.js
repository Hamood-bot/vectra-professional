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
            
            // Prevent background page from scrolling when menu is open
            if (navMenu.classList.contains("active")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        });

        // Close menu if a link is clicked inside it
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                document.body.style.overflow = "";
            });
        });
    }

    // 4. Smooth Page Transitions
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Check if link points to another page on the same site and doesn't just scroll to a hash
            if (
                href && 
                !href.startsWith('#') && 
                link.target !== '_blank' &&
                (href.startsWith('/') || !href.startsWith('http'))
            ) {
                e.preventDefault(); // Stop immediate navigation
                
                // Trigger the fade-out animation
                document.body.classList.add('page-transition-out');
                
                // Wait for the animation to finish, then navigate
                setTimeout(() => {
                    window.location.href = href;
                }, 350); // Matches the 0.4s fade out easing
            }
        });
    });
});
