document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".btn_activar");

    botones.forEach(boton => {
        boton.addEventListener("click", async () => {
            const id = boton.dataset.id;

            try {
                const respuesta = await fetch(`/api/productos/modificar/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ activo: 1 })
                });

                const data = await respuesta.json();

                if (respuesta.ok) {
                    location.reload();
                } else {
                    console.error("Error:", data);
                }
            } catch (error) {
                console.error("Error en fetch:", error);
            }
        });
    });
});
