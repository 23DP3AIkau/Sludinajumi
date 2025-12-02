/* --------------------- HEADER SCROLL HIDE ----------------------- */

let lastScrollTop = 0;
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        header.style.top = "-100px";
    } else {
        header.style.top = "0";
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

/* --------------------- THEME TOGGLE ----------------------------- */

const themeToggle = document.getElementById("theme-toggle");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");

function toggleTheme() {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");

    if (themeToggle) themeToggle.textContent = isLight ? "Dark mode" : "Light mode";
    if (themeToggleMobile) themeToggleMobile.textContent = isLight ? "Dark mode" : "Light mode";
}

if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener("click", toggleTheme);

/* --------------------- DROPDOWN MENU ------------------------------ */

const dropdownBtn = document.getElementById("nav-dropdown-btn");
const dropdownMenu = document.getElementById("nav-dropdown");
const searchMobile = document.getElementById("search-mobile");

if (dropdownBtn) {
    dropdownBtn.addEventListener("click", () => {
        dropdownMenu.classList.toggle("active");

        if (dropdownMenu.classList.contains("active") && searchMobile) {
            setTimeout(() => searchMobile.focus(), 120);
        }
    });
}

if (dropdownMenu) {
    dropdownMenu.querySelectorAll("a, button").forEach(item => {
        item.addEventListener("click", () => {
            dropdownMenu.classList.remove("active");
        });
    });
}

/* --------------------- MODAL ------------------------------ */

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalPrice = document.getElementById("modal-price");
const modalClose = document.querySelector(".modal-close");

document.querySelectorAll(".card button").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".card");
        modalImg.src = card.querySelector("img").src;
        modalTitle.textContent = card.querySelector("h3").textContent;
        modalDesc.textContent = card.querySelector(".desc").textContent;
        modalPrice.textContent = card.querySelector(".price").textContent;

        modal.style.display = "flex";
    });
});

modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
});

/* --------------------- FORM VALIDATION ------------------------------ */

const contactForm = document.getElementById("contact-form");
const formMsg = document.getElementById("form-msg");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    formMsg.classList.remove("error", "success");

    if (!name || !email || !message) {
        formMsg.textContent = "Lūdzu aizpildi visus laukus!";
        formMsg.classList.add("error");
        formMsg.style.opacity = 1;
        return;
    }

    if (!emailPattern.test(email)) {
        formMsg.textContent = "E-pasta formāts nav pareizs!";
        formMsg.classList.add("error");
        formMsg.style.opacity = 1;
        return;
    }

    formMsg.textContent = "Forma veiksmīgi iesniegta!";
    formMsg.classList.add("success");
    formMsg.style.opacity = 1;

    contactForm.reset();
});

/* --------------------- SEARCH (DESKTOP + MOBILE) ------------------------------ */

const search = document.getElementById("search");

function filterCards(query) {
    const value = query.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const text = card.querySelector(".desc").textContent.toLowerCase();

        if (title.includes(value) || text.includes(value)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

if (search) {
    search.addEventListener("input", () => {
        filterCards(search.value);
        if (searchMobile) searchMobile.value = search.value; // sync
    });
}

if (searchMobile) {
    searchMobile.addEventListener("input", () => {
        filterCards(searchMobile.value);
        if (search) search.value = searchMobile.value; // sync
    });
}

/* --------------------- H1 Scroll to Top + No Selection ------------------------------ */

const siteTitle = document.getElementById("site-title");

if (siteTitle) {
    siteTitle.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    siteTitle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });

    siteTitle.addEventListener("mousedown", e => e.preventDefault());
}

/* --------------------- API's ------------------------------ */


// Name API section
const guessBtn = document.getElementById("guess-btn");
const nameInput = document.getElementById("name-input");
const resultsDiv = document.getElementById("guess-results");

if (guessBtn) {
  guessBtn.addEventListener("click", async () => {
    const name = nameInput.value.trim();
    resultsDiv.innerHTML = "";  

    if (!name) {
      resultsDiv.textContent = "Lūdzu ievadi vārdu.";
      return;
    }

    try {
      // Gender
      const genderResp = await fetch(`https://api.genderize.io?name=${encodeURIComponent(name)}`);
      const genderData = await genderResp.json();


      // Nationality
      const natResp = await fetch(`https://api.nationalize.io?name=${encodeURIComponent(name)}`);
      const natData = await natResp.json();

      // Build
      const gender = genderData.gender || "nezināms";
      const genderProb = genderData.probability != null ? `${(genderData.probability * 100).toFixed(1)}%` : "";
      const countries = (natData.country || []).sort((a, b) => b.probability - a.probability).slice(0, 3);  // top 3
      const countryList = countries.length
        ? countries.map(c => `${c.country_id} (${(c.probability * 100).toFixed(1)}%)`).join(", ")
        : "–";

      resultsDiv.innerHTML = `
        <p><strong>Vārds:</strong> ${name}</p>
        <p><strong>Ģenerējais dzimums:</strong> ${gender} ${genderProb}</p>
        <p><strong>Iespējamā tautība (top 3):</strong> ${countryList}</p>
      `;
    } catch (err) {
      console.error(err);
      resultsDiv.textContent = "Kļūda — mēģini vēlreiz vai pārbaudi internetu.";
    }
  });
}



// IP + geolocation section
const getIpBtn = document.getElementById("get-ip-btn");
const ipResultsDiv = document.getElementById("ip-results");

if (getIpBtn) {
  getIpBtn.addEventListener("click", async () => {
    ipResultsDiv.innerHTML = "";  

    try {
      const ipRes = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipRes.json();
      const ip = ipData.ip;

      const infoRes = await fetch(`https://ipinfo.io/${ip}/json?token=31e9a670326015`);
      const infoData = await infoRes.json();

      const city = infoData.city || "—";
      const region = infoData.region || "—";
      const country = infoData.country || "—";
      const loc = infoData.loc || "—";

      ipResultsDiv.innerHTML = `
        <p><strong>IP:</strong> ${ip}</p>
        <p><strong>Pilsēta:</strong> ${city}</p>
        <p><strong>Reģions:</strong> ${region}</p>
        <p><strong>Valsts:</strong> ${country}</p>
        <p><strong>Koordinātas:</strong> ${loc}</p>
      `;
    } catch (err) {
      console.error(err);
      ipResultsDiv.textContent = "Kļūda — nevarēja iegūt IP / atrašanās vietu.";
    }
  });
}
