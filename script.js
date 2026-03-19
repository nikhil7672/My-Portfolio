const siteHeader = document.querySelector("#siteHeader");
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const revealItems = document.querySelectorAll(".reveal");
const tiltCard = document.querySelector("[data-tilt-card]");

const syncHeaderState = () => {
    if (!siteHeader) return;
    siteHeader.classList.toggle("scrolled", window.scrollY > 24);
};

syncHeaderState();
window.addEventListener("scroll", syncHeaderState);

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
        });
    });
}

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

if (tiltCard) {
    const resetTilt = () => {
        tiltCard.style.transform = "rotateX(0deg) rotateY(0deg)";
    };

    tiltCard.addEventListener("mousemove", (event) => {
        const rect = tiltCard.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        const rotateY = ((offsetX / rect.width) - 0.5) * 14;
        const rotateX = (0.5 - (offsetY / rect.height)) * 14;

        tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    tiltCard.addEventListener("mouseleave", resetTilt);
    tiltCard.addEventListener("blur", resetTilt, true);
}
