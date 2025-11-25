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
    getOne: async (req, res) => {
        try {
            let idOne = req.params.id;
            const usuario = await db.Usuario.findByPk(idOne);
            res.json({ usuario });
        } catch {
            console.error("Error al obtener api/usuarios", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    crear: async (req, res) => {
        try {
            console.log("BODY QUE LLEGA A LA API ===>", req.body);
            const { nombre, mail, password, tipo } = req.body;

            // VALIDACIÓN
            if (!nombre || !mail || !password || !tipo) {
                return res.status(400).send("Faltan datos obligatorios");
            }

            // CREACIÓN DEL USUARIO
            const nuevoUsuario = await db.Usuario.create({
                nombre: nombre,
                mail: mail,
                password: password,
                tipo: Number(tipo),
            });

            return res.json({
                meta: {
                    status: 200,
                    mensaje: "Usuario creado correctamente",
                    id: nuevoUsuario.id,
                },
                data: nuevoUsuario,
            });
        } catch (error) {
            console.error("Error al crear usuario:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    modificar: async (req, res) => {
        try {
            const id = req.params.id;
            const usuario = await db.Usuario.findByPk(id);

            await db.Usuario.update(
                {
                    nombre: req.body.nombre ?? producto.nombre,
                    mail: req.body.mail ?? usuario.mail,
                    password: req.body.password ?? usuario.password,
                    tipo: req.body.tipo ? Number(req.body.tipo) : usuario.tipo,
                },
                { where: { id } }
            );

            const usuarioFinal = await db.Usuario.findByPk(id);

            return res.json({
                meta: {
                    status: 200,
                    mensaje: "Usuario modificado correctamente",
                },
                data: {
                    usuario: usuarioFinal,
                },
            });
        } catch (error) {
            console.error("Error al cargar api/usuarios", error);
        }
    },
    eliminar: async (req, res) => {
        try {
            let idOne = req.params.id;
            const eliminado = await db.Usuario.destroy({
                where: { id: idOne },
            });
            if (!eliminado) {
                return res.json({
                    mensaje: "Usuario NO Eliminado. Usuario no encontrado",
                });
            } else {
                return res.json({
                    meta: {
                        status: 200,
                        mensaje: "Usuario ELIMINADO correctamente",
                    },
                });
            }

        } catch (error) {
            console.error("Error al cargar api/productos", error);
        }
    },
};

module.exports = apiUsuariosController;
