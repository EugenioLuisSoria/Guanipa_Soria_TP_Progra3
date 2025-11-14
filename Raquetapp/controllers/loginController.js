const db = require("../models/index.js");

const loginController = {
    home: (req, res) => {
        try {
            res.render("login");
        } catch (error) {
            console.error("Error al cargar view/login.ejs", error);
        }
    },
    login: (req,res) =>{
        
    }
};

module.exports = loginController;
