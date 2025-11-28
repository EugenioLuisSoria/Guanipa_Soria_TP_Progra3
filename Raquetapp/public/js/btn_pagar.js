document.addEventListener("DOMContentLoaded", () => {
    const formPagar = document.querySelector(".formPagar");
    const btnPagar = document.querySelector(".btnPagar");
    const modal = document.getElementById("modal_pagar");
    const btnConfirmar = modal.querySelector(".btn_confirmar_modal");
    const btnCancelar = modal.querySelector(".btn_cerrar_modal");


    //OCULTAR BOTON PAGAR , si no hay prods en carro
    function getCarrito() {
        return JSON.parse(localStorage.getItem("carritoItems")) || [];
    }
    function mostrarBtnPago() {
        let carrito = getCarrito();

        if (carrito.length == 0) {
            formPagar.classList.add("displayNone");
        }
    }

    //MODAL CONFIRMACION PAGO (ABRIR/CERRAR)
    formPagar.addEventListener("submit", (e) => {
        e.preventDefault();
        modal.classList.remove("displayNone");
    });

    btnConfirmar.addEventListener("click", () => {
        modal.classList.add("displayNone");
        formPagar.submit();
    });

    btnCancelar.addEventListener("click", () => {
        modal.classList.add("displayNone");
    });
    mostrarBtnPago();
});
