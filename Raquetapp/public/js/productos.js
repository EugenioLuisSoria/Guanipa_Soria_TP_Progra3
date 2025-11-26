//PAGINADO DE PRODUCTOS
document.addEventListener("DOMContentLoaded", () => {
    let paginaActual = 0;
    const itemsPorPagina = 3;

    const items = Array.from(document.querySelectorAll(".nav_raquetas"));

    function renderizarPagina() {
        items.forEach((item, index) => {
            if (index >= paginaActual * itemsPorPagina && index < (paginaActual + 1) * itemsPorPagina) {
                item.style.display = "grid";
            } else {
                item.style.display = "none";
            }
        });
    }

    const btnAnterior = document.getElementById("btn_anterior");
    const btnSiguiente = document.getElementById("btn_siguiente");

    btnAnterior.addEventListener("click", () => {
        if (paginaActual > 0) {
            paginaActual--;
            renderizarPagina();
        }
    });

    btnSiguiente.addEventListener("click", () => {
        if ((paginaActual + 1) * itemsPorPagina < items.length) {
            paginaActual++;
            renderizarPagina();
        }
    });

    renderizarPagina();
});
