// -----------------------------
// CARGAR HEADER Y FOOTER
// -----------------------------
function loadComponent(id, file) {
  fetch(file)
    .then(r => r.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (id === "header") initTheme();
    });
}

loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");

// -----------------------------
// TEMA CLARO / OSCURO
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
// MINI‑SPA (NAVEGACIÓN SIN RECARGAR)
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
      }
    });
});

// -----------------------------
// MENÚ HAMBURGUESA
// -----------------------------
document.addEventListener("click", (e) => {
  const menu = document.getElementById("side-menu");
  const toggle = document.getElementById("menu-toggle");

  if (e.target === toggle) {
    menu.classList.toggle("open");
  } else if (!menu.contains(e.target) && e.target !== toggle) {
    menu.classList.remove("open");
  }
});