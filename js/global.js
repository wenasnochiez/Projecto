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
// MENÚ HAMBURGUESA DERECHA
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

// -----------------------------
// POP-UP DE RECETAS
// -----------------------------
document.addEventListener("click", (e) => {
  const card = e.target.closest(".recipe-card");
  if (!card) return;

  const title = card.querySelector("h2").textContent;

  const recetas = {
    "Tortilla de patatas": {
      img: "img/tortilla.jpg",
      ingredientes: [
        "4 huevos",
        "3 patatas",
        "Aceite de oliva",
        "Sal"
      ],
      pasos: [
        "Pelar y cortar las patatas.",
        "Freírlas a fuego medio.",
        "Batir los huevos.",
        "Mezclar todo y cuajar."
      ]
    },
    "Pancakes proteicos": {
      img: "img/pancakes.jpg",
      ingredientes: [
        "2 huevos",
        "40g avena",
        "1 scoop proteína",
        "Leche"
      ],
      pasos: [
        "Mezclar todos los ingredientes.",
        "Calentar la sartén.",
        "Verter la mezcla.",
        "Dar la vuelta y servir."
      ]
    }
  };

  const r = recetas[title];

  const modal = `
    <div class="recipe-modal-bg">
      <div class="recipe-modal">
        <img src="${r.img}">
        <h2>${title}</h2>

        <h3>Ingredientes</h3>
        <ul>${r.ingredientes.map(i => `<li>${i}</li>`).join("")}</ul>

        <h3>Pasos</h3>
        <ol>${r.pasos.map(p => `<li>${p}</li>`).join("")}</ol>

        <button class="close-modal">Cerrar</button>
      </div>
    </div>
  `;

  document.getElementById("recipe-modal-container").innerHTML = modal;
});

// Cerrar modal
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close-modal") ||
      e.target.classList.contains("recipe-modal-bg")) {
    document.getElementById("recipe-modal-container").innerHTML = "";
  }
});
