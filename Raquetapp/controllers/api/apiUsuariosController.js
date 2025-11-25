const db = require("../../models/index.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const apiUsuariosController = {
    home: (req, res) => {
        try {
            res.json({
                api: "Usuarios",
                get: "/api/usuarios/listado",
                getPaginado: "/api/usuarios/listado?pag=1&limit=5",
                getOne: "/api/usuarios/listado/:id",
                crear: "/api/usuarios/crear",
                modificar: "/api/usuarios/modificar/:id",
                eliminar: "/api/usuarios/eliminar/:id",
            });
        } catch (error) {
            console.error("Error al cargar api/usuarios", error);
        }
    },
    listado: async (req, res) => {
        try {
            // 1) Leer query params
            let pag = Number(req.query.pag) || 1; // página actual
            let limit = Number(req.query.limit) || 50; // usuarios por página
            let offset = (pag - 1) * limit; // saltea los primeros N

            // 2) Obtener total de usuarios
            let totalUsuarios = await db.Usuario.count();

            // 3) Obtener usuarios paginados
            let usuarios = await db.Usuario.findAll({
                limit,
                offset,
            });

            // 4) Respuesta API REST estandarizada
            res.json({
                meta: {
                    status: 200,
                    pag,
                    limit,
                    total: totalUsuarios,
                    totalPages: Math.ceil(totalUsuarios / limit),
                    next: pag * limit < totalUsuarios ? `/api/usuarios/listado?pag=${pag + 1}&limit=${limit}` : null,
                    prev: pag > 1 ? `/api/usuarios/listado?pag=${pag - 1}&limit=${limit}` : null,
                },
                data: usuarios,
            });
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
            let { nombre, mail, password, tipo } = req.body;

            // Usuario existente
            let existe = await db.Usuario.findOne({
                where: { mail },
            });
            if (existe) {
                return res.render("registro", {
                    msj: "El usuario ya está registrado",
                });
            }

            // VALIDACIÓN
            if (!nombre || !mail || !password || !tipo) {
                return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
            }
            // Hash
            let hashedPass = await bcrypt.hash(password, saltRounds);

            // CREACIÓN DEL USUARIO
            let nuevoUsuario = await db.Usuario.create({
                nombre: nombre,
                mail: mail,
                password: hashedPass,
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
            let id = req.params.id;
            let usuario = await db.Usuario.findByPk(id);

            await db.Usuario.update(
                {
                    nombre: req.body.nombre ?? producto.nombre,
                    mail: req.body.mail ?? usuario.mail,
                    password: req.body.password ?? usuario.password,
                    tipo: req.body.tipo ? Number(req.body.tipo) : usuario.tipo,
                },
                { where: { id } }
            );

            let usuarioFinal = await db.Usuario.findByPk(id);

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
            let eliminado = await db.Usuario.destroy({
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
