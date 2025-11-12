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
    console.log(localStorage.getItem("sesionActiva"));

    const aCarritoLink = document.getElementById("aCarrito");
    if (localStorage.getItem("carritoItems") > 0) {
        aCarritoLink.classList.remove("displayNone");
    } /* else if(localStorage.getItem("carritoItems") == 0 || null || undefined) 
    {
        aCarritoLink.classList.add("displayNone")
    } */

    //boton SALIR:
    const btnSalir = document.getElementById("btnSalir");
    btnSalir.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.setItem("sesionActiva", "0");
        window.location.href = "/";
        window.location.reload();
        window.location.reload(); //si! hay que hacer dos veces este reload() ... AVERIGUAR POR QUÉ!!!!!!!!!!
    });

    btnSalir.href = btnSalir.length > 0 ? `/carrito?ids=${query}` : "/carrito";
}

document.addEventListener("DOMContentLoaded", inicializarFooter);
