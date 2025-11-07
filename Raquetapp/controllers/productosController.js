const db = require("../models/index.js");

const productosController = {
    getRaquetas: async (req, res) => {
        try {
            const producto = await db.Producto.findAll({
                include: {
                    model: db.Categoria,
                    where: { tipo: "raqueta" },
                },
                limit: 6
            });

            res.render("productos", { producto });
        } catch (error) {
            console.error("Error al obtener productos:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    getCuerdas: async (req, res) => {
        try {
            const producto = await db.Producto.findAll({
                include: {
                    model: db.Categoria,
                    where: { tipo: "cuerda" },
                },
            });

            res.render("productos", { producto });
        } catch (error) {
            console.error("Error al obtener productos:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
};

module.exports = productosController;
