const db = require("../../models/index.js");

const apiProductosController = {
    home: (req, res) => {
        try {
            res.json({ hola: "hola Productos" });
        } catch (error) {
            console.error("Error al cargar api/productos", error);
        }
    },
    listado: async (req, res) => {
        try {
            let productos = await db.Producto.findAll({
                include: [{ model: db.Categoria }],
            });
            res.json({ productos });
        } catch (error) {
            console.error("Error al cargar api/productos", error);
        }
    },
    getOne: async (req, res) => {
        try {
            let idOne = req.params.id;
            const producto = await db.Producto.findByPk(idOne);
            res.json({ producto });
        } catch {
            console.error("Error al obtener api/productos", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    crear: async (req, res) => {
        try {
            const { nombre, descripcion, precio, categoria, stock, activo } = req.body;

            // VALIDACIÓN
            if (!nombre || !descripcion || !precio || !categoria || !stock) {
                return res.status(400).send("Faltan datos obligatorios");
            }

            // SI VIENE IMAGEN DEL MULTER
            let imagenFinal = "";
            if (req.file) {
                imagenFinal = "/images/productos/" + req.file.filename;
            }

            // CREACIÓN DEL PRODUCTO
            const nuevoProducto = await db.Producto.create({
                nombre: nombre,
                descripcion: descripcion,
                imagen: imagenFinal,
                precio: Number(precio),
                stock: Number(stock),
                categoria: Number(categoria),
                activo: activo ? 1 : 0,
            });

            return res.json({
                meta: {
                    status: 200,
                    mensaje: "Producto creado correctamente",
                    id: nuevoProducto.id,
                },
                data: nuevoProducto,
            });
        } catch (error) {
            console.error("Error al crear producto:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    modificar: async (req, res) => {
        try {
            const id = req.params.id;
            const producto = await db.Producto.findByPk(id);

            let imagenFinal = producto.imagen;
            if (req.file) {
                imagenFinal = "/images/productos/" + req.file.filename;
            }

            await db.Producto.update(
                {
                    nombre: req.body.nombre ?? producto.nombre,
                    descripcion: req.body.descripcion ?? producto.descripcion,
                    precio: req.body.precio ? Number(req.body.precio) : producto.precio,
                    categoria: req.body.categoria ? Number(req.body.categoria) : producto.categoria,
                    stock: req.body.stock ? Number(req.body.stock) : producto.stock,
                    activo: req.body.activo !== undefined ? req.body.activo : producto.activo,
                    imagen: imagenFinal,
                },
                { where: { id } }
            );

            const productoFinal = await db.Producto.findByPk(id);

            return res.json({
                meta: {
                    status: 200,
                    mensaje: "Producto modificado correctamente",
                },
                data: {
                    producto: productoFinal,
                },
            });
        } catch (error) {
            console.error("Error al cargar api/productos", error);
        }
    },
    eliminar: async (req, res) => {
        try {
            let idOne = req.params.id;
            const eliminado = await db.Producto.destroy({
                where: { id: idOne },
            });
            if (!eliminado) {
                return res.json({
                    mensaje: "Producto NO Eliminado. Producto no encontrado",
                });
            } else {
                return res.json({
                    meta: {
                        status: 200,
                        mensaje: "Producto ELIMINADO correctamente",
                    },
                });
            }
        } catch (error) {
            console.error("Error al cargar api/productos", error);
        }
    },
};

module.exports = apiProductosController;
