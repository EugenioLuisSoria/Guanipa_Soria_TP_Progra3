const db = require("../models/index.js");

const adminController = {
    home: (req, res) => {
        try {
            res.render("admin/indexAdmin", { msj: null });
        } catch (error) {
            console.error("Error al cargar view/registro.ejs", error);
        }
    },
    
};

module.exports = adminController;
