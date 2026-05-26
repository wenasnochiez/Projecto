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
const translations = {
  es: {
    menu_home: "Inicio",
    menu_calendar: "Calendario",
    menu_about: "Sobre mí",
    menu_settings: "Ajustes",
    footer_rights: "Todos los derechos reservados"
  },
  ca: {
    menu_home: "Inici",
    menu_calendar: "Calendari",
    menu_about: "Sobre mi",
    menu_settings: "Configuració",
    footer_rights: "Tots els drets reservats"
  },
  en: {
    menu_home: "Home",
    menu_calendar: "Calendar",
    menu_about: "About me",
    menu_settings: "Settings",
    footer_rights: "All rights reserved"
  },
  it: {
    menu_home: "Home",
    menu_calendar: "Calendario",
    menu_about: "Chi sono",
    menu_settings: "Impostazioni",
    footer_rights: "Tutti i diritti riservati"
  }
};

function initLanguage() {
  const saved = localStorage.getItem("lang") || "es";
  applyLanguage(saved);

  const select = document.getElementById("lang-select");
  select.value = saved;

  select.addEventListener("change", () => {
    const lang = select.value;
    localStorage.setItem("lang", lang);
    applyLanguage(lang);
  });
}

function applyLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key];
  });
}

// MINI-SPA SUAVE PARA EL MENÚ
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;
  const href = link.getAttribute("href");
  if (!href.endsWith(".html")) return;

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
      }
    });
});


// Mantener navegación al usar atrás/adelante
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
      }
    });
});
