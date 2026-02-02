// Inserta partials en sus contenedores correspondientes
const loadPartial = (selector, path) => {
    fetch(path)
        .then(res => res.text())
        .then(html => document.querySelector(selector).innerHTML = html)
        .catch(err => console.error(`Error loading ${path}:`, err));
};

// Cargar todos los partials
document.addEventListener("DOMContentLoaded", () => {
    loadPartial("#header", "/local-first-tools/assets/partials/header.html");
    loadPartial("#sidebar", "/local-first-tools/assets/partials/sidebar.html");
    loadPartial(".right-ads", "/local-first-tools/assets/partials/right-ads.html");
    loadPartial("#footer", "/local-first-tools/assets/partials/footer.html");
});
