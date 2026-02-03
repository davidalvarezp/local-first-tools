// Inserta partials en sus contenedores correspondientes
const loadPartial = (selector, path) => {
    fetch(path)
        .then(res => res.text())
        .then(html => document.querySelector(selector).innerHTML = html)
        .catch(err => console.error(`Error loading ${path}:`, err));
};

// Cargar todos los partials
document.addEventListener("DOMContentLoaded", () => {
    loadPartial("#header", "/assets/partials/header.html");
    loadPartial("#sidebar-left", "/assets/partials/sidebar-left.html");
    loadPartial(".sidebar-right", "/assets/partials/sidebar-right.html");
    loadPartial("#footer", "/assets/partials/footer.html");
});
