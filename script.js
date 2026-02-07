AOS.init({ duration: 1000, once: false });

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
  item.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(2)";
  });
  item.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
});

const langToggle = document.getElementById("lang-toggle");
let currentLang = "en";

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "pl" : "en";
  const targets = document.querySelectorAll(".translatable");
  const surveyBtn = document.getElementById("survey-btn");

  langToggle.classList.add("switching");
  targets.forEach((el) => el.classList.add("switching"));

  setTimeout(() => {
    langToggle.querySelector(".lang-label").innerText = currentLang === "en" ? "PL" : "EN";

    if (surveyBtn) {
      surveyBtn.setAttribute("href", surveyBtn.getAttribute(`data-${currentLang}-link`));
    }

    targets.forEach((el) => {
      const newText = el.getAttribute(`data-${currentLang}`);
      el.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
          node.textContent = newText;
        }
      });
      el.classList.remove("switching");
    });
    langToggle.classList.remove("switching");
  }, 300);
});

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const themeLabel = themeToggle.querySelector(".theme-label");
const storedTheme = localStorage.getItem("horizon_theme");
const initialIsDark = storedTheme ? storedTheme === "dark" : document.documentElement.classList.contains("dark");

setTheme(initialIsDark);

themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");
  localStorage.setItem("horizon_theme", isDark ? "dark" : "light");
  setTheme(isDark);
});

function setTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  document.documentElement.classList.toggle("dark", isDark);
  if (isDark) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    themeLabel.textContent = "Light";
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    themeLabel.textContent = "Dark";
  }
}
