const db = require("../models/index.js");

const mainController = {
    home: async (req, res) => {
        try {
            const productos = await db.Producto.findAll({
                include: {
                    model: db.Categoria,
                    where: { tipo: "raqueta" },
                },
            });

            /* res.render("index", { productos }); */
            res.send({ productos: productos });
        } catch (error) {
            console.error("Error al obtener productos:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
};

module.exports = mainController;
