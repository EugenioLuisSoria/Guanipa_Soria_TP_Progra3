function inicializarFooter() {
    const linkCarrito = document.getElementById("aCarrito");
    const carritoItems = JSON.parse(localStorage.getItem("carritoItems")) || [];
    const query = carritoItems.join(",");
  
    linkCarrito.href = carritoItems.length > 0
      ? `/carrito?ids=${query}`
      : "/carrito";
  }

  document.addEventListener("DOMContentLoaded", inicializarFooter);