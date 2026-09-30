// ================================
// MOBILE NAVIGATION
// ================================

const navMenu = document.querySelector(".nav-menu");
const navButton = document.querySelector(".nav-button");

// Create mobile menu button
const mobileMenuButton = document.createElement("button");

mobileMenuButton.classList.add("mobile-menu-button");
mobileMenuButton.innerHTML = "☰";
mobileMenuButton.setAttribute("aria-label", "Open navigation menu");

document.querySelector(".navbar-container").insertBefore(
    mobileMenuButton,
    navMenu
);


// Toggle mobile menu
mobileMenuButton.addEventListener("click", () => {
    navMenu.classList.toggle("mobile-active");

    if (navMenu.classList.contains("mobile-active")) {
        mobileMenuButton.innerHTML = "✕";
    } else {
        mobileMenuButton.innerHTML = "☰";
    }
});


// Close menu after clicking a link
const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("mobile-active");

        mobileMenuButton.innerHTML = "☰";

    });

});


// ================================
// SCROLL REVEAL ANIMATION
// ================================

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-container, " +
    ".stat-card, " +
    ".timeline-item, " +
    ".approach-card, " +
    ".video-card, " +
    ".education-card, " +
    ".contact-content, " +
    ".contact-info"
);


const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


// ================================
// ACTIVE NAVIGATION LINK
// ================================

const sections = document.querySelectorAll("section[id]");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const linkTarget = link.getAttribute("href");

        if (linkTarget === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

});


// ================================
// STATISTICS COUNTER
// ================================

const statNumbers = document.querySelectorAll(".stat-card span");

let countersStarted = false;


function startCounters() {

    if (countersStarted) return;

    countersStarted = true;

    statNumbers.forEach(counter => {

        const originalText = counter.textContent.trim();

        const number = parseInt(
            originalText.replace(/\D/g, ""),
            10
        );

        const suffix = originalText.includes("+")
            ? "+"
            : "";


        let currentNumber = 0;

        const duration = 1500;

        const increment = Math.max(
            1,
            Math.ceil(number / (duration / 20))
        );


        const counterInterval = setInterval(() => {

            currentNumber += increment;

            if (currentNumber >= number) {

                currentNumber = number;

                clearInterval(counterInterval);

            }

            counter.textContent =
                currentNumber + suffix;

        }, 20);

    });

}


// Detect statistics section
const statisticsSection =
    document.querySelector(".statistics");


if (statisticsSection) {

    const statisticsObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        startCounters();

                    }

                });

            },
            {
                threshold: 0.5
            }
        );


    statisticsObserver.observe(statisticsSection);

}


// ================================
// FOOTER YEAR
// ================================

const footerText =
    document.querySelector(".footer p");


if (footerText) {

    const currentYear =
        new Date().getFullYear();

    footerText.innerHTML =
        `© ${currentYear} Mohamed Abdallah Ibrahim. All Rights Reserved.`;

}


// ================================
// VIDEO LINKS
// ================================

const videoCards =
    document.querySelectorAll(".video-card");


videoCards.forEach(card => {

    const videoLink =
        card.querySelector(".video-link");

    const playButton =
        card.querySelector(".play-button");


    if (videoLink && playButton) {

        playButton.addEventListener("click", (event) => {

            if (videoLink.getAttribute("href") === "#") {

                event.preventDefault();

                alert(
                    "Video link will be added soon."
                );

            }

        });

    }

});


// ================================
// BACK TO TOP
// ================================

const backToTop =
    document.querySelector(".footer a");


if (backToTop) {

    backToTop.addEventListener("click", (event) => {

        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// ================================
// PAGE LOADED
// ================================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});
