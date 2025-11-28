// USANDO FORM TRADICIONAL, INSERTANDO EN INPUT:

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".formPagar");
    const inputProductos = document.getElementById("inputProductos");
    const inputUsuario = document.getElementById("inputUsuario");

    //EVITAR SUBMIT PAGAR, SI ESTÁ VACIO
    form.addEventListener("submit", (e) => {
        let carritoItems = JSON.parse(localStorage.getItem("carritoItems")) || [];
        let nombreUsuario = localStorage.getItem("nombreUsuarioSTORAGE");
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
    //
    // ELIMINAR ITEMS SI CARRO VACIO (si LocalStorage está vacio)
    let itemsGrid = document.getElementById("items_grid");
    let noProductosEnCarro = document.getElementById("no_productos_carro");
    let paginacion = document.getElementById("paginacion");

    let botonesQuitar = document.querySelectorAll(".btn_quitar1");
    let botonesEliminar = document.querySelectorAll(".btn_eliminarTodos");

    // Devuelve siempre el carrito actualizado
    function getCarrito() {
        return JSON.parse(localStorage.getItem("carritoItems")) || [];
    }

    // Esconde lo que corresponda según el estado del carrito
    function ordenarCarritoVacio() {
        let carrito = getCarrito();
    
        if (carrito.length == 0) {
            itemsGrid.classList.add("displayNone");
            noProductosEnCarro.classList.remove("displayNone");
            paginacion.classList.add("displayNone");
        } else {
            itemsGrid.classList.remove("displayNone");
            noProductosEnCarro.classList.add("displayNone");
            paginacion.classList.remove("displayNone");
        }
    
        // SIEMPRE se recorre — no está aislado detrás de return
        document.querySelectorAll("#items_grid > div[data-id]").forEach((div) => {
            let id = div.dataset.id; //string
    
            if (!carrito.includes(id) && div.classList.contains("estoy_en_carro")) {
                div.classList.add("displayNone");
            } else {
                div.classList.remove("displayNone");
            }
        });
    }

    // LISTENERS
    botonesQuitar.forEach((btn) => {
        btn.addEventListener("click", () => {
            setTimeout(ordenarCarritoVacio, 50);
        });
    });

    botonesEliminar.forEach((btn) => {
        btn.addEventListener("click", () => {
            setTimeout(ordenarCarritoVacio, 50);
        });
    });

    // Ejecutar al cargar
    ordenarCarritoVacio();
});

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
