// --- HEADER SCROLL BEHAVIOR ---
let lastScrollTop = 0;
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.style.top = "-100px"; // hide
    } else {
        header.style.top = "0"; // show
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// --- LIGHT / DARK MODE TOGGLE ---
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    if (document.body.classList.contains("light-mode")) {
        themeToggle.textContent = "Dark mode";
    } else {
        themeToggle.textContent = "Light mode";
    }
});

// --- BURGER MENU TOGGLE ---
const burgerMenu = document.getElementById("burger-menu");
const navMenu = document.getElementById("nav-menu");

burgerMenu.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});
