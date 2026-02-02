document.addEventListener("click", e => {
    if (e.target.id === "menuToggle") {
        document.body.classList.toggle("sidebar-open");
    }
});
