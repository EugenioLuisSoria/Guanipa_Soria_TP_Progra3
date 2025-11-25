const db = require("../../models/index.js");

const apiProductosController = {
    home: (req, res) => {
        try {
            res.json(
                {hola: "hola Productos"}
            );
        } catch (error) {
            console.error("Error al cargar view/index.ejs", error);
        }
    },
};

module.exports = apiProductosController;
