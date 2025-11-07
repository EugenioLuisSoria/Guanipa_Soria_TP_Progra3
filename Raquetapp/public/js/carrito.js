document.addEventListener("DOMContentLoaded", () => {
    const carrito = document.getElementById("carrito");
    const items = carrito.children.length;
  
    if (items <= 2) {
      carrito.style.gridTemplateColumns = "repeat(2, 1fr)";
    } else if (items <= 4) {
      carrito.style.gridTemplateColumns = "repeat(3, 1fr)";
    } else {
      carrito.style.gridTemplateColumns = "repeat(auto-fit, minmax(180px, 1fr))";
    }
  });