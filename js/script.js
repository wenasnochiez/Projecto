/* ============================
   SISTEMA DE RECETAS POP-UP
   ============================ */

const recipes = {
  pancakes: {
    title: "Pancakes Proteicos",
    img: "https://i.imgur.com/7uQ5Z8F.jpeg",
    ingredients: [
      "100 g cottage",
      "1 huevo M",
      "60 g claras",
      "20 g harina",
      "1 cdta vainilla",
      "1/2 cdta levadura",
      "Edulcorante"
    ],
    steps: [
      "Tritura cottage + huevo + claras.",
      "Añade vainilla y edulcorante.",
      "Añade harina + levadura y mezcla suave.",
      "Reposa 1 minuto.",
      "Cocina 2–3 min por lado a fuego medio-bajo.",
      "Tapa 30–40 s al inicio."
    ]
  },

  crepes: {
    title: "Crepes Proteicos",
    img: "https://i.imgur.com/2xkz6yM.jpeg",
    ingredients: [
      "100 g cottage",
      "1 huevo M",
      "30–50 ml leche",
      "1 cdta vainilla",
      "Edulcorante",
      "Opcional: 1 cdta harina o maicena"
    ],
    steps: [
      "Tritura cottage + huevo.",
      "Añade vainilla y edulcorante.",
      "Ajusta con leche hasta textura líquida.",
      "Cocina 1 min por lado."
    ]
  },

  pupusa: {
    title: "Pupusa de Queso",
    img: "https://i.imgur.com/5p5Q2nG.jpeg",
    ingredients: [
      "1 taza de harina de maíz (masa harina)",
      "1/2 taza de agua tibia",
      "100 g queso mozzarella o fresco",
      "Pizca de sal"
    ],
    steps: [
      "Mezcla harina + agua + sal hasta formar masa.",
      "Haz una bola y aplánala.",
      "Rellena con queso.",
      "Cierra y aplana de nuevo.",
      "Cocina 3–4 min por lado en sartén."
    ]
  }
};


/* ============================
   ABRIR POP-UP
   ============================ */

document.querySelectorAll(".recipe-card").forEach(card => {
  card.addEventListener("click", () => {
    const key = card.dataset.recipe;
    const r = recipes[key];

    // Rellenar contenido
    document.getElementById("popup-title").textContent = r.title;
    document.getElementById("popup-img").src = r.img;

    const ing = document.getElementById("popup-ingredients");
    ing.innerHTML = "";
    r.ingredients.forEach(i => ing.innerHTML += `<li>${i}</li>`);

    const steps = document.getElementById("popup-steps");
    steps.innerHTML = "";
    r.steps.forEach(s => steps.innerHTML += `<li>${s}</li>`);

    // Mostrar popup
    const popup = document.getElementById("recipe-popup");
    popup.style.display = "flex";

    // Reset animación por si se cerró antes
    const content = document.querySelector(".popup-content");
    content.style.animation = "popupIn 0.35s ease forwards";
  });
});


/* ============================
   CERRAR POP-UP
   ============================ */

function closePopup() {
  const popup = document.getElementById("recipe-popup");
  const content = document.querySelector(".popup-content");

  // Animación de salida
  content.style.animation = "popupOut 0.25s ease forwards";

  // Esperar a que termine la animación
  setTimeout(() => {
    popup.style.display = "none";
  }, 250);
}

// Botón cerrar
document.querySelector(".close-popup").addEventListener("click", closePopup);

// Cerrar clicando fuera del contenido
document.getElementById("recipe-popup").addEventListener("click", (e) => {
  if (e.target.id === "recipe-popup") {
    closePopup();
  }
});

// Cerrar con tecla ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePopup();
  }
});
