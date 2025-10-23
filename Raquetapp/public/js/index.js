document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal_bienvenida");

  modal.addEventListener("click", () => {
    // Agregamos la clase de fade-out
    modal.classList.add("fadeOut");

    // Esperamos 1 segundo (duración del fade) y luego ocultamos el modal
    setTimeout(() => {
      modal.classList.add("displayNone");
    }, 1000);
  });
});
