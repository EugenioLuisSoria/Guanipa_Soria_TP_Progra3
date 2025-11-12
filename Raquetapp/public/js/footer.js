function inicializarFooter() {
    const linkCarrito = document.getElementById("aCarrito");
    const carritoItems = JSON.parse(localStorage.getItem("carritoItems")) || [];
    const query = carritoItems.join(",");

    linkCarrito.href = carritoItems.length > 0 ? `/carrito?ids=${query}` : "/carrito";

    /* Para evitar que el modal del inicio se active siempre: */
    const modal = document.getElementById("modal_bienvenida");
    if (localStorage.getItem("sesionActiva") == 1) {
        modal.classList.add("displayNone");
    }
}

document.addEventListener("DOMContentLoaded", inicializarFooter);
