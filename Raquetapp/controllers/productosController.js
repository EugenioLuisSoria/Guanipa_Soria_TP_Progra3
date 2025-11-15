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

            res.render("admin/productosAdmin", { producto: producto, tipo: "raquetas" });
        } catch (error) {
            console.error("Error al obtener admin/productosAdmin:", error);
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
            res.render("admin/productosAdmin", { producto: producto, tipo: "cuerdas" });
        } catch (error) {
            console.error("Error al obtener admin/productosAdmin:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    getOne: async (req, res) => {
        try {
            let idOne = req.params.id;
            const producto = await db.Producto.findAll({
                where: { id: idOne },
            });
            res.render("admin/itemAdmin", { producto: producto });
        } catch {
            console.error("Error al obtener admin/productosAdmin:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    deleteOne: async (req, res) => {
        try {
            let idOne = req.params.id;
            
            const eliminado = await db.Producto.destroy({
                where: { id: idOne },
            });

            if (!eliminado) {
                return res.status(404).send("Producto no encontrado");
            }

            res.render("admin/productosAdmin", { msj: "Producto Eliminado" }); // o la vista que quieras
        } catch (error) {
            console.error("Error al eliminar:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
};

module.exports = productosController;
