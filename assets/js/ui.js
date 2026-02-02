document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector('.menu-toggle');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-open');
        });
    }

    // Opcional: cerrar sidebar al hacer click fuera
    document.addEventListener('click', e => {
        if (!e.target.closest('#sidebar') && !e.target.closest('.menu-toggle')) {
            document.body.classList.remove('sidebar-open');
        }
    });
});
