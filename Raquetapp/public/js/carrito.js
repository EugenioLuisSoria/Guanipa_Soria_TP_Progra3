// USANDO FORM TRADICIONAL, INSERTANDO EN INPUT:

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".formPagar");
    const inputProductos = document.getElementById("inputProductos");
    const inputUsuario = document.getElementById("inputUsuario");;



    form.addEventListener("submit", (e) => {
        let carritoItems = JSON.parse(localStorage.getItem("carritoItems")) || [];
        let nombreUsuario = localStorage.getItem("nombreUsuarioSTORAGE") 
        console.log(carritoItems);

        if (carritoItems.length === 0) {
            e.preventDefault(); // detenemos el envío si está vacío
            alert("El carrito está vacío");
            return;
        }

        // Guardamos los IDs en el input oculto, separados por comas
        inputProductos.value = carritoItems.join(",");
        inputUsuario.value = nombreUsuario;
    });
});

//USANDO FETCH:

/* document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".formPagar");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let carritoItems = JSON.parse(localStorage.getItem("carritoItems")) || [];

        if (carritoItems.length === 0) {
            alert("El carrito está vacío");
            return;
        }

        try {
            let response = await fetch("/carrito/pagar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productos: carritoItems }),
            });

            if (!response.ok) throw new Error("Error al enviar el pedido");

            let data = await response.json();
            console.log("Respuesta del servidor:", data);

            alert("Compra registrada correctamente");
            //localStorage.removeItem("carritoItems"); // limpiar carrito
        } catch (error) {
            console.error("Error al pagar:", error);
            alert("Hubo un problema al enviar el pedido");
        }
    });
});
 */
