const db = require("../models/index.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken")
const CLAVE_SECRETA = "Soy una clave secreta"; //esta const no debe quedarse aqui... deberia ir en .ENV


const registroController = {
    home: (req, res) => {
        try {
            res.render("registro", { msj: null });
        } catch (error) {
            console.error("Error al cargar view/registro.ejs", error);
        }
    },
    register: async (req, res) => {
        let { nombre, mail, password, tipo } = req.body;
        tipo = Number(tipo);

        try {
            // Usuario existente
            let existe = await db.Usuario.findOne({
                where: { mail },
            });
            if (existe) {
                return res.render("registro", {
                    msj: "El usuario ya está registrado",
                });
            }
            // Hash
            let hashedPass = await bcrypt.hash(password, saltRounds);
            // Crear usuario
            await db.Usuario.create({
                nombre,
                mail,
                password: hashedPass,
                tipo: tipo ?? 0, // evita que sea undefined
                /* tipo: tipo ?? 0, */ // evita que sea undefined
            });

            const token = jwt.sign({ nombre, mail, tipo }, CLAVE_SECRETA, { expiresIn: "5m", algorithm: "HS256" });


            if (tipo === 1) {
                return res.render("admin/indexAdmin", {token, msj:"Login Exitoso"});
            } else {
                return res.render("index");
            }
        } catch (error) {
            console.error("Error en registro:", error);
            return res.render("registro", { msj: "Error al registrar usuario" });
        }
    },
};

module.exports = registroController;
