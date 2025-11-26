const db = require("../../models/index.js");

const apiProductosController = {
    home: (req, res) => {
        try {
            res.json({
                api: "Productos",
                get: "/api/productos/listado",
                getPaginado: "/api/productos/listado?pag=1&limit=5",
                getOne: "/api/productos/listado/:id",
                crear: "/api/productos/crear",
                crear_INDICACIONES: " nombre, descripcion, precio, categoria, stock, activo, imagen",
                modificar: "/api/productos/modificar/:id",
                eliminar: "/api/productos/eliminar/:id",
            });
        } catch (error) {
            console.error("Error al cargar api/productos", error);
        }
    },
    listado: async (req, res) => {
        try {
            // Leer query params
            let pag = Number(req.query.pag) || 1; // página actual
            let limit = Number(req.query.limit) || 50; // productos por página
            let offset = (pag - 1) * limit; // saltea los N primeros registros

            // Obtener total de productos
            let totalProductos = await db.Producto.count();

            // Obtener productos de la página solicitada
            let productos = await db.Producto.findAll({
                include: [{ model: db.Categoria }],
                limit,
                offset,
            });

            res.json({
                meta: {
                    status: 200,
                    pag,
                    limit,
                    total: totalProductos,
                    totalPages: Math.ceil(totalProductos / limit),
                    next: pag * limit < totalProductos ? `/api/productos/listado?pag=${pag + 1}&limit=${limit}` : null,
                    prev: pag > 1 ? `/api/productos/listado?pag=${pag - 1}&limit=${limit}` : null,
                },
                data: productos,
            });
        } catch (error) {
            console.error("Error al cargar api/productos", error);
            res.status(500).send("Error interno del servidor");
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
                activo: activo ?? 1,
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

            if (!producto) {
                return res.status(404).json({
                    meta: {
                        status: 404,
                        mensaje: "Producto no encontrado",
                    },
                });
            }

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
