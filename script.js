AOS.init({ duration: 1000, once: true });

window.addEventListener("scroll", function () {
  const nav = document.querySelector(".navbar");
  window.scrollY > 50 ? nav.classList.add("scrolled") : nav.classList.remove("scrolled");
});

const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

const clickables = document.querySelectorAll("a, button, .lang-btn-modern, .work-item");
clickables.forEach((item) => {
  item.addEventListener("mouseenter", () => cursor.style.transform = "translate(-50%, -50%) scale(2)");
  item.addEventListener("mouseleave", () => cursor.style.transform = "translate(-50%, -50%) scale(1)");
});

const langToggle = document.getElementById("lang-toggle");
const themeToggle = document.getElementById("theme-toggle");

let currentLang = localStorage.getItem("horizon_lang") || "en";
let currentTheme = localStorage.getItem("horizon_theme") || "light";

function applyTheme(theme, fast = false) {
  if (fast) {
    document.documentElement.classList.add("no-transition");
  }

  if (theme === "dark") {
    document.body.classList.add("dark");
    themeToggle.querySelector("i").className = "fas fa-sun";
    themeToggle.querySelector(".theme-label").innerText = "LIGHT";
  } else {
    document.body.classList.remove("dark");
    themeToggle.querySelector("i").className = "fas fa-moon";
    themeToggle.querySelector(".theme-label").innerText = "DARK";
  }

  if (fast) {
    void document.documentElement.offsetHeight;
    document.documentElement.classList.remove("no-transition");
  }
}

function applyLang(lang, fast = false) {
  const targets = document.querySelectorAll(".translatable");
  const surveyBtn = document.getElementById("survey-btn");
  const langLabel = langToggle.querySelector(".lang-label");

  if (!fast) {
    langToggle.classList.add("switching");
    targets.forEach(el => el.classList.add("switching"));
  }

  setTimeout(() => {
    langLabel.innerText = lang === "en" ? "PL" : "EN";

    if (surveyBtn) {
      surveyBtn.setAttribute(
        "href",
        surveyBtn.getAttribute(`data-${lang}-link`)
      );
    }

    targets.forEach(el => {
      const newText = el.getAttribute(`data-${lang}`);
      if (newText) {
        el.textContent = newText;
      }
      el.classList.remove("switching");
    });

    langToggle.classList.remove("switching");
  }, fast ? 0 : 300);
}


applyTheme(currentTheme, true);
applyLang(currentLang, true);

themeToggle.addEventListener("click", () => {
  currentTheme = document.body.classList.toggle("dark") ? "dark" : "light";
  localStorage.setItem("horizon_theme", currentTheme);
  applyTheme(currentTheme, false);
});

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "pl" : "en";
  localStorage.setItem("horizon_lang", currentLang);
  applyLang(currentLang);
});


