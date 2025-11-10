const db = require("../models/index.js");

const carritoController = {
    getCarrito: async (req, res) => {
        try {
            res.render("carrito", {});
        } catch (error) {
            console.error("Error al obtener productos:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
};

module.exports = carritoController;
