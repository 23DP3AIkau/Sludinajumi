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
const themeToggleMobile = document.getElementById("theme-toggle-mobile");

function toggleTheme() {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");

    // Update both buttons (desktop + mobile)
    if (themeToggle) themeToggle.textContent = isLight ? "Dark mode" : "Light mode";
    if (themeToggleMobile) themeToggleMobile.textContent = isLight ? "Dark mode" : "Light mode";
}

if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener("click", toggleTheme);

// --- RESPONSIVE NAV DROPDOWN ---
const dropdownBtn = document.getElementById("nav-dropdown-btn");
const dropdownMenu = document.getElementById("nav-dropdown");

if (dropdownBtn) {
    dropdownBtn.addEventListener("click", () => {
        dropdownMenu.classList.toggle("active");
    });
}

// Optional: close menu when link or button is clicked
if (dropdownMenu) {
    dropdownMenu.querySelectorAll("a, button").forEach(item => {
        item.addEventListener("click", () => {
            dropdownMenu.classList.remove("active");
        });
    });
}


// --- MODAL FUNCTIONALITY ---
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalPrice = document.getElementById("modal-price");
const modalClose = document.querySelector(".modal-close");

// Open modal when a "Skatīt" button is clicked
document.querySelectorAll(".card button").forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".card");
        modalImg.src = card.querySelector("img").src;
        modalTitle.textContent = card.querySelector("h3").textContent;
        modalDesc.textContent = card.querySelector(".desc").textContent;
        modalPrice.textContent = card.querySelector(".price").textContent;

        modal.style.display = "flex";
    });
});

// Close modal
modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal when clicking outside the content
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
