document.addEventListener("DOMContentLoaded", () => {

    const formPagar = document.querySelector(".formPagar");
    const modal = document.getElementById("modal_pagar");
    const btnConfirmar = modal.querySelector(".btn_confirmar_modal");
    const btnCancelar = modal.querySelector(".btn_cerrar_modal");

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

});
