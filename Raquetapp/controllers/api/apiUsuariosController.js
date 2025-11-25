const db = require("../../models/index.js");

const apiUsuariosController = {
    home: (req, res) => {
        try {
            res.json({hola: "hola Usuarios"});
        } catch (error) {
            console.error("Error al cargar view/index.ejs", error);
        }
    },
};

module.exports = apiUsuariosController;
