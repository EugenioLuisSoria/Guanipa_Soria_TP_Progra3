const db = require("../models/index.js");

const mainController = {
    home: (req, res) => {
        try {
            res.render("index");
        } catch (error) {
            console.error("Error al cargar view/index.ejs", error);
        }
    },
};

module.exports = mainController;
