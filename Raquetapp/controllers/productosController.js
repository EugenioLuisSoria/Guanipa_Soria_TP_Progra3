const db = require("../models/index.js");

const productosController = {
    getRaquetas: async (req, res) => {
        try {
            const producto = await db.Producto.findAll({
                include: {
                    model: db.Categoria,
                    where: { tipo: "raquetas" },
                },
                limit: 6,
            });

            res.render("productos", { producto: producto, tipo: "raquetas" });
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
                    where: { tipo: "cuerdas" },
                },
            });
            res.render("productos", { producto: producto, tipo: "cuerdas" });
        } catch (error) {
            console.error("Error al obtener productos:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    getOne: async (req, res) => {
        try {
            let idOne = req.params.id;
            const producto = await db.Producto.findAll({
                where: { id: idOne },
            });
            res.render("item", { producto: producto });
        } catch {
            console.error("Error al obtener productos:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
};

module.exports = productosController;
