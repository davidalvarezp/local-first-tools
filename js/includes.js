function loadPartial(id, file) {
    fetch(file)
        .then(res => res.text())
        .then(html => {
            document.getElementById(id).innerHTML = html;
        });
}

loadPartial("header", "/local-first-tools/partials/header.html");
loadPartial("sidebar", "/local-first-tools/partials/sidebar.html");
loadPartial("right-ads", "/local-first-tools/partials/right-ads.html");
loadPartial("footer", "/local-first-tools/partials/footer.html");
