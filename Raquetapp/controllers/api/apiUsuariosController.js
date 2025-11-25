const db = require("../../models/index.js");

const apiUsuariosController = {
    home: (req, res) => {
        try {
            res.json({ hola: "hola Usuarios" });
        } catch (error) {
            console.error("Error al cargar api/usuarios", error);
        }
    },
    listado: async (req, res) => {
        try {
            let usuarios = await db.Usuario.findAll();
            res.json({ usuarios });
        } catch (error) {
            console.error("Error al cargar api/usuarios", error);
        }
    },
    crear: async (req, res) => {
        try {
        } catch (error) {
            console.error("Error al cargar api/usuarios", error);
        }
    },
    modificar: async (req, res) => {
        try {
        } catch (error) {
            console.error("Error al cargar api/usuarios", error);
        }
    },
    eliminar: async (req, res) => {
        try {
        } catch (error) {
            console.error("Error al cargar api/usuarios", error);
        }
    },
};

module.exports = apiUsuariosController;
