const carritoItems = JSON.parse(localStorage.getItem("carritoItems")) || [];

// Construimos la query tipo: ?ids=1,5,7
const query = carritoItems.join(",");

const linkCarrito = document.getElementById("aCarrito");

if (carritoItems.length > 0) {
    linkCarrito.href = `/carrito?ids=${query}`;
} else {
    linkCarrito.href = "/carrito";
}
