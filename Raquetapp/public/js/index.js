document.addEventListener("DOMContentLoaded", () => {
    /* para modal */
    const modal = document.getElementById("modal_bienvenida");
    const form = document.querySelector("#modal_bienvenida form");
    const textarea = document.querySelector("#nombreUsuario");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombreUsuarioSTORAGE = textarea.value.trim().toUpperCase();

        if (nombreUsuarioSTORAGE !== "") {
            localStorage.setItem("nombreUsuarioSTORAGE", nombreUsuarioSTORAGE);
            modal.classList.add("fadeOut");

            /* para nombreUsuarioSTORAGE */
            const welcome = document.getElementById("welcomeNombre");
            welcome.textContent = `Welcome to RaquetApp, ${nombreUsuarioSTORAGE}`;

            // Esperamos 1 segundo (duración del fade) y luego ocultamos el modal
            setTimeout(() => {
                modal.classList.add("displayNone");
            }, 1000);
        } else {
            alert("Por favor, ingrese su nombre."); //MODIFICARLO PARA QUE SEA LINDO, Y APAREZCA NO COMO ALERT
        }
    });
});
