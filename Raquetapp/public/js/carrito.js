document.addEventListener("DOMContentLoaded", () => {
    const carrito = document.getElementById("carrito");
    let carritoOBJ = JSON.parse(localStorage.getItem("carritoItems"));

    /* fetch("/api/carrito", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carritoOBJ }),
    }); */
});
