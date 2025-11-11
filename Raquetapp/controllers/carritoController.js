const db = require("../models/index.js");
const productosController = require("./productosController.js");

const carritoController = {
    getCarrito: async (req, res) => {
        try {
            let ids = req.query.ids ? req.query.ids.split(",").map(Number) : [];
            let productos = await db.Producto.findAll({
                where: { id: ids }
              });

            res.render("carrito", { productos });
        } catch (error) {
            console.error("Error al obtener productos:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
};

module.exports = carritoController;
