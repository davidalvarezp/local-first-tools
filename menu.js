fetch("menu.html")
    .then(response => response.text())
    .then(html => {
        document.getElementById("menu").innerHTML = html;
    })
    .catch(err => console.error("Error cargando el menú:", err));
