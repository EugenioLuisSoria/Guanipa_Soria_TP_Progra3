document.addEventListener("DOMContentLoaded", () => {
    /* para modal */
    const modal = document.getElementById("modal_bienvenida");
    const form = document.querySelector("#modal_bienvenida form");
    const textarea = document.querySelector("#nombreUsuario");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombreUsuarioSTORAGE = textarea.value.trim().toUpperCase();

        if (nombreUsuarioSTORAGE !== "") {
            localStorage.clear();
            localStorage.setItem("sesionActiva", "1")  //ver pago.js que ahi FINALIZA la sesion en front, de la compra
            localStorage.setItem("nombreUsuarioSTORAGE", nombreUsuarioSTORAGE);

            modal.classList.add("fadeOut");
            /* para nombreUsuarioSTORAGE */
            const welcome = document.getElementById("welcomeNombre");
            welcome.textContent = `Welcome to RaquetApp, ${nombreUsuarioSTORAGE}`;

            //para desaparcer link a Carrito sin session:
            /* const aCarritoLink = document.getElementById("aCarrito")
            if (localStorage.getItem("sessionActiva" )== 1)
            aCarritoLink.classList.toggle("displayNone" );  */

            // Esperamos 1/2 segundo (duración del fade) y luego ocultamos el modal
            setTimeout(() => {
                modal.classList.add("displayNone");
            }, 500);
        } else {
            alert("Por favor, ingrese su nombre."); //MODIFICARLO PARA QUE SEA LINDO, Y APAREZCA NO COMO ALERT
        }
    });
});
