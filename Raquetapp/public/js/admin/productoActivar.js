document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".btn_activar");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const id = boton.dataset.id;
            const modal = document.getElementById(`modal_${id}`);
            modal.classList.remove("displayNone");

            const btnConfirmar = modal.querySelector(".btn_confirmar_modal");
            const btnCerrar = modal.querySelector(".btn_cerrar_modal");

            btnConfirmar.onclick = async () => {
                try {
                    const respuesta = await fetch(`/api/productos/modificar/${id}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ activo: 1 })
                    });

                    if (respuesta.ok) {
                        modal.classList.add("displayNone");
                        location.reload();
                    } else {
                        const data = await respuesta.json();
                        console.error("Error:", data);
                    }
                } catch (error) {
                    console.error("Error en fetch:", error);
                }
            };

            btnCerrar.onclick = () => {
                modal.classList.add("displayNone");
            };
        });
    });
});
