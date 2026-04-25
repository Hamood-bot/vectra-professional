const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        const isOpen = document.body.classList.toggle("nav-open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "Close" : "Menu";
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "Menu";
        }
    });
});

const revealElements = document.querySelectorAll("[data-reveal]");
const metricValues = document.querySelectorAll(".metric-value");

const animateMetric = (element) => {
    const target = Number(element.dataset.target || 0);
    const duration = 1200;
    const start = performance.now();

    const frame = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = String(Math.round(target * eased));

        if (progress < 1) {
            requestAnimationFrame(frame);
        }
    };

    requestAnimationFrame(frame);
};

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.18 }
);

revealElements.forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index * 60, 280)}ms`;
    observer.observe(el);
});

const metricsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateMetric(entry.target);
                metricsObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.7 }
);

metricValues.forEach((metric) => metricsObserver.observe(metric));

const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        const answer = button.nextElementSibling;

        faqButtons.forEach((otherButton) => {
            otherButton.setAttribute("aria-expanded", "false");
            const otherAnswer = otherButton.nextElementSibling;
            if (otherAnswer) {
                otherAnswer.hidden = true;
            }
        });

        button.setAttribute("aria-expanded", String(!expanded));
        if (answer) {
            answer.hidden = expanded;
        }
    });
});

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = "Request Sent";
            submitButton.disabled = true;
        }
    });
}
const stickyCta = document.querySelector('.sticky-cta');
const heroSection = document.querySelector('.hero');

if (stickyCta && heroSection) {
    const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    ctaObserver.observe(heroSection);
}
