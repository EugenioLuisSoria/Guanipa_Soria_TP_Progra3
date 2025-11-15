const db = require("../models/index.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const CLAVE_SECRETA = "Soy una clave secreta"; //esta const no debe quedarse aqui... deberia ir en .ENV

const loginController = {
    home: (req, res) => {
        try {
            res.render("login");
        } catch (error) {
            console.error("Error al cargar view/login.ejs", error);
        }
    },
    login: async (req, res) => {
        let { mail, password } = req.body;

        try {
            // Usuario existente
            let usuario = await db.Usuario.findOne({
                where: { mail },
            });
            // Verificar contraseña
            if (!usuario) {
                return res.render("login", { msj: "El mail no se encuentra registrado" });
            }

            // Hash
            let resultado = await bcrypt.compare(password, usuario.password);

            if (!resultado) {
                return res.render("login", { msj: "Contraseña Incorrecta" });
            }
            //CASO PARA ADMINS --> se guarda en cookie el token
            if (resultado && usuario.tipo === 1) {
                const token = jwt.sign({ usuario }, CLAVE_SECRETA, { expiresIn: "5m", algorithm: "HS256" });
                res.cookie("token", token, {
                    httpOnly: true,
                    maxAge: 5 * 60 * 1000,
                });
                return res.render("indexAdmin");
            } else {
                return res.render("index");
            }
        } catch (error) {
            console.error("Error en registro:", error);
            return res.render("login", { msj: "Error al loguear usuario" });
        }
    },
};

module.exports = loginController;
