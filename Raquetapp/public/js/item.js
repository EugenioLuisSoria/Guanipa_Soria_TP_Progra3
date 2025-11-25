document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".btn_agregar");
    //Agregar
    botones.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let idItem = e.target.dataset.id;
            let carritoOBJ = JSON.parse(localStorage.getItem("carritoItems")) || [];
            carritoOBJ.push(idItem);
            localStorage.setItem("carritoItems", JSON.stringify(carritoOBJ));
            console.log(localStorage.getItem("carritoItems")); //CONSOLE.LOG BORRRRRARRRR
            inicializarFooter();
            ocultarItemsSinCantidad();
            actualizarCantidadesEnDom();
        });
    });
    // +1
    const btnMas = document.querySelectorAll(".btn_agregar1");
    btnMas.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            let carrito = JSON.parse(localStorage.getItem("carritoItems")) || [];
            carrito.push(id);
            localStorage.setItem("carritoItems", JSON.stringify(carrito));
            console.log(localStorage.getItem("carritoItems")); //CONSOLE.LOG BORRRRRARRRR
            inicializarFooter();
            ocultarItemsSinCantidad();
            actualizarCantidadesEnDom();
        });
    });

    // -1
    const btnMenos = document.querySelectorAll(".btn_quitar1");
    btnMenos.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            let carrito = JSON.parse(localStorage.getItem("carritoItems")) || [];

            // Elimina SOLO UNA unidad
            const index = carrito.indexOf(id);
            if (index !== -1) {
                carrito.splice(index, 1);
            }

            localStorage.setItem("carritoItems", JSON.stringify(carrito));
            console.log(localStorage.getItem("carritoItems")); //CONSOLE.LOG BORRRRRARRRR

            inicializarFooter();
            ocultarItemsSinCantidad();
            actualizarCantidadesEnDom();
        });
    });

    // Eliminar TODOS
    const btnEliminarTodos = document.querySelectorAll(".btn_eliminarTodos");
    btnEliminarTodos.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            let carrito = JSON.parse(localStorage.getItem("carritoItems")) || [];

            // Filtra y saca TODAS las unidades de ese id
            carrito = carrito.filter((item) => item !== id);

            localStorage.setItem("carritoItems", JSON.stringify(carrito));
            console.log(localStorage.getItem("carritoItems")); //CONSOLE.LOG BORRRRRARRRR
            inicializarFooter();
            ocultarItemsSinCantidad();
            actualizarCantidadesEnDom();
        });
    });

    //FUNCIONES ESPECIFICAS
    function ocultarItemsSinCantidad() {
        const carrito = JSON.parse(localStorage.getItem("carritoItems")) || [];
        const itemsDOM = document.querySelectorAll(".item");

        itemsDOM.forEach((item) => {
            const id = item.querySelector("button").dataset.id; // cualquier botón tiene el data-id
            const cantidad = carrito.filter((x) => x === id).length;

            if (cantidad === 0) {
                item.style.display = "none"; // ocultar
            } else {
                item.style.display = "grid"; // volver a mostrar si existe
            }
        });
    }
    function actualizarCantidadesEnDom() {
        const spans = document.querySelectorAll(".cantidad");
        const carrito = JSON.parse(localStorage.getItem("carritoItems")) || [];

        spans.forEach((span) => {
            const id = span.dataset.id;
            const cantidad = carrito.filter((item) => item === id).length;
            span.textContent = `Cantidad: ${cantidad}`;
            if (cantidad === 0) {
                span.style.display = "none";
            } else {
                span.style.display = "inline";
            }
        });
    }
    // ELIMINACION: MODAL PARA ADMIN PARA VALIDAR
    function modalEliminar() {
        const formEliminar = document.getElementById("formEliminar");
        const modalEliminarDOM = document.getElementById("modal_eliminar");
        const btnCerrar = document.getElementById("cerrarValidacionEliminar");
        const btnConfirmar = document.getElementById("confirmarEliminar"); // <-- este botón lo agregás en el modal

        let permitirEnvio = false;

        formEliminar.addEventListener("submit", (e) => {
            if (!permitirEnvio) {
                e.preventDefault(); // frena el envío
                modalEliminarDOM.classList.remove("displayNone");
            }
        });

        btnCerrar.addEventListener("click", () => {
            modalEliminarDOM.classList.add("displayNone");
        });

        btnConfirmar.addEventListener("click", () => {
            permitirEnvio = true; // habilitás el envío
            formEliminar.submit(); // ahora sí, se envía
        });
    }
    actualizarCantidadesEnDom();
    modalEliminar()
});
