document.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".btn_agregar");

    botones.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let idItem = e.target.dataset.id;
            let carritoOBJ = JSON.parse(localStorage.getItem("carritoItems")) || [];
            carritoOBJ.push(idItem);
            localStorage.setItem("carritoItems", JSON.stringify(carritoOBJ));
            console.log(localStorage.getItem("carritoItems"));
        });
    });
});