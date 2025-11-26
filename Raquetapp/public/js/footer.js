function inicializarFooter() {
    const linkCarrito = document.getElementById("aCarrito");
    const carritoItems = JSON.parse(localStorage.getItem("carritoItems")) || [];
    const query = carritoItems.join(",");

    linkCarrito.href = carritoItems.length > 0 ? `/carrito?ids=${query}` : "/carrito";

    /* Para evitar que el modal del inicio se active siempre: */
    const ruta = window.location.pathname;
    const modal = document.getElementById("modal_bienvenida");
    if (ruta === "/") {
        if (localStorage.getItem("sesionActiva") == 1) {
            modal.classList.add("displayNone");
        }
    }
    console.log(localStorage.getItem("sesionActiva"));

    // Para que aparezca el boton carrito cuando hay items sumados al carro
    const aCarritoLink = document.getElementById("aCarrito");
    if (localStorage.getItem("carritoItems") > 0) {
        aCarritoLink.classList.remove("displayNone");
    } 

    //boton SALIR:
    const btnSalir = document.getElementById("btnSalir");
    btnSalir.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.setItem("sesionActiva", "0");
        localStorage.setItem("modo_oscuro", "0");
        window.location.href = e.target.href;
    });
}

document.addEventListener("DOMContentLoaded", inicializarFooter);
