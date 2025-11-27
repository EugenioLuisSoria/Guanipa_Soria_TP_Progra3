document.addEventListener("DOMContentLoaded", () => {
    function cargarHeader() {
        const nombreUsuarioLocal = localStorage.getItem("nombreUsuarioSTORAGE");
        const nombreUsuarioSTORAGE = nombreUsuarioLocal.trim().toUpperCase();

        if (nombreUsuarioSTORAGE !== "") {
            const welcome = document.getElementById("welcomeNombre");
            welcome.textContent = `Welcome to RaquetApp, ${nombreUsuarioSTORAGE}`;
        }
    }
    cargarHeader();
});
