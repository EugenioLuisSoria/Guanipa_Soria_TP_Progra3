const db = require("../models/index.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

        console.log("BODY:", req.body);

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
            });

            return res.render("indexAdmin");
        } catch (error) {
            console.error("Error en registro:", error);
            return res.render("registro", { msj: "Error al registrar usuario" });
        }
    },
};

module.exports = registroController;
