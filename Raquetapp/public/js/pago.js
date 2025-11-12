document.addEventListener("DOMContentLoaded", () => {
    /* para boton pago */
    const btn = document.getElementById("terminarPago");

    btn.addEventListener("click", (e) => { // te puedo modificarlo para que sea con FORM
        localStorage.clear();
        localStorage.setItem("sesionActiva", "0");

        
        });
});
