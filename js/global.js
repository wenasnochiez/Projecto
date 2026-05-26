let translations = {};
let currentLang = "es";

// -----------------------------
// CARGAR HEADER Y FOOTER
// -----------------------------
function loadComponent(id, file) {
  fetch(file)
    .then(r => r.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (id === "header") {
        initTheme();
        initLanguage();
      }
    });
}

loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");

// -----------------------------
// CARGAR TRADUCCIONES
// -----------------------------
fetch("translations/translations.json")
  .then(r => r.json())
  .then(json => {
    translations = json;
    const saved = localStorage.getItem("lang") || "es";
    currentLang = saved;
    applyLanguage(currentLang);
  });

// -----------------------------
// MODO CLARO / OSCURO
// -----------------------------
function initTheme() {
  const saved = localStorage.getItem("theme") || "dark";
  document.body.classList.toggle("light", saved === "light");

  const btn = document.getElementById("theme-toggle");
  btn.textContent = saved === "dark" ? "☀️" : "🌙";

  btn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    const newTheme = isLight ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    btn.textContent = newTheme === "dark" ? "☀️" : "🌙";
  });
}

// -----------------------------
// IDIOMAS
// -----------------------------
function initLanguage() {
  const select = document.getElementById("lang-select");
  select.value = currentLang;

  select.addEventListener("change", () => {
    currentLang = select.value;
    localStorage.setItem("lang", currentLang);
    applyLanguage(currentLang);
  });
}

function applyLanguage(lang) {
  if (!translations[lang]) return;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const t = translations[lang][key];
    if (t) el.textContent = t;
  });
}

// -----------------------------
// MINI‑SPA: NAVEGACIÓN SIN RECARGAR
// -----------------------------
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href || !href.endsWith(".html")) return;

  e.preventDefault();

  fetch(href)
    .then(r => r.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const newContent = doc.querySelector(".content");
      const currentContent = document.querySelector(".content");
      if (newContent && currentContent) {
        currentContent.innerHTML = newContent.innerHTML;
        window.history.pushState({}, "", href);
        applyLanguage(currentLang);
      }
    });
});

window.addEventListener("popstate", () => {
  fetch(location.pathname)
    .then(r => r.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const newContent = doc.querySelector(".content");
      const currentContent = document.querySelector(".content");
      if (newContent && currentContent) {
        currentContent.innerHTML = newContent.innerHTML;
        applyLanguage(currentLang);
      }
    });
});
