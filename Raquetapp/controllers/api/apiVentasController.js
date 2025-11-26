const db = require("../../models/index.js");

const apiUsuariosController = {
    home: (req, res) => {
        try {
            res.json({
                api: "Ventas",
                get: "/api/ventas/listado",
                getPaginado: "/api/ventas/listado?pag=1&limit=5",
                getOne: "/api/ventas/listado/:id",
                crear: "/api/ventas/crear",
                crear_forma: " Se espera que 'items' sea un array así items: [ { producto_id: 3, cantidad: 2 }, { producto_id: 7, cantidad: 1 } ]",
                modificar: "/api/ventas/modificar/:id",
                eliminar: "/api/ventas/eliminar/:id",

            });
        } catch (error) {
            console.error("Error al cargar api/ventas", error);
        }
    },
    listado: async (req, res) => {
        try {
            // 1) Leer query params
            let pag = Number(req.query.pag) || 1; // página actual
            let limit = Number(req.query.limit) || 50; // usuarios por página
            let offset = (pag - 1) * limit; // saltea los primeros N

            // 2) Obtener total de ventas
            let totalVentas = await db.Ventas.count();

            // 3) Obtener ventas paginados
            let ventas = await db.Ventas.findAll({
                include: [
                    {
                        model: db.VentaProducto,
                        include: [
                            {
                                model: db.Producto,
                            },
                        ],
                    },
                ],
                limit,
                offset,
            });

            // 4) Respuesta API REST estandarizada
            res.json({
                meta: {
                    status: 200,
                    pag,
                    limit,
                    total: totalVentas,
                    totalPages: Math.ceil(totalVentas / limit),
                },
                data: ventas,
            });
        } catch (error) {
            console.error("Error al cargar api/ventas", error);
        }
    },
    getOne: async (req, res) => {
        try {
            let idOne = req.params.id;

            const venta = await db.Ventas.findByPk(idOne, {
                include: [
                    {
                        model: db.VentaProducto,
                        include: [
                            {
                                model: db.Producto,
                            },
                        ],
                    },
                ],
            });

            if (!venta) {
                return res.status(404).json({
                    mensaje: "Venta no encontrada",
                });
            }

            res.json({ venta });
        } catch (error) {
            console.error("Error al obtener api/ventas", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    crear: async (req, res) => {
        try {
            const { fecha, medio, nombre, items } = req.body;

            /*
                Se espera que "items" sea un array así:
    
                items: [
                    { producto_id: 3, cantidad: 2 },
                    { producto_id: 7, cantidad: 1 }
                ]
            */

           // 1) Calcular total
            let total = 0;

            for (let item of items) {
                let prod = await db.Producto.findByPk(item.producto_id);

                if (!prod) {
                    return res.status(400).json({
                        mensaje: `Producto ID ${item.producto_id} no existe`,
                    });
                }

                total += Number(prod.precio) * Number(item.cantidad);
            }

            // 2) Crear la venta
            const nuevaVenta = await db.Ventas.create({
                fecha,
                medio,
                nombre,
                total,
            });

            // 3) Crear los registros en VentaProducto
            for (let item of items) {
                await db.VentaProducto.create({
                    venta_id: nuevaVenta.id,
                    producto_id: item.producto_id,
                    cantidad: item.cantidad,
                });
            }

            // 4) Cargar venta completa con include
            const ventaFinal = await db.Ventas.findByPk(nuevaVenta.id, {
                include: [
                    {
                        model: db.VentaProducto,
                        include: [{ model: db.Producto }],
                    },
                ],
            });

            // 5) Respuesta final
            return res.json({
                meta: {
                    status: 200,
                    mensaje: "Venta creada correctamente",
                    id: nuevaVenta.id,
                },
                data: ventaFinal,
            });
        } catch (error) {
            console.error("Error al crear venta:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    modificar: async (req, res) => {
        try {
            const id = req.params.id;
            const { fecha, medio, nombre, items } = req.body;

            // 1) Buscar la venta original
            const venta = await db.Ventas.findByPk(id);

            if (!venta) {
                return res.status(404).json({
                    mensaje: "Venta no encontrada",
                });
            }

            // 2) Calcular nuevo total si te mandan items
            let total = venta.total;

            if (items) {
                total = 0;

                for (let item of items) {
                    const prod = await db.Producto.findByPk(item.producto_id);
                    if (!prod) {
                        return res.status(400).json({
                            mensaje: `Producto ID ${item.producto_id} no existe`,
                        });
                    }
                    total += Number(prod.precio) * Number(item.cantidad);
                }
            }

            // 3) Actualizar venta
            await db.Ventas.update(
                {
                    fecha: fecha ?? venta.fecha,
                    medio: medio ?? venta.medio,
                    nombre: nombre ?? venta.nombre,
                    total: total,
                },
                { where: { id } }
            );

            // 4) Si te mandaron nuevos items => borrar items viejos y crearlos devuelta
            if (items) {
                await db.VentaProducto.destroy({ where: { venta_id: id } });

                for (let item of items) {
                    await db.VentaProducto.create({
                        venta_id: id,
                        producto_id: item.producto_id,
                        cantidad: item.cantidad,
                    });
                }
            }

            // 6) Traer venta final después de actualización
            const ventaFinal = await db.Ventas.findByPk(id, {
                include: [
                    {
                        model: db.VentaProducto,
                        include: [{ model: db.Producto }],
                    },
                ],
            });

            return res.json({
                meta: {
                    status: 200,
                    mensaje: "Venta modificada correctamente",
                },
                data: ventaFinal,
            });
        } catch (error) {
            console.error("Error al modificar venta:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    eliminar: async (req, res) => {
        try {
            const id = req.params.id;
    
            // 1) Verificar si la venta existe
            const venta = await db.Ventas.findByPk(id);
    
            if (!venta) {
                return res.status(404).json({
                    mensaje: "Venta no encontrada",
                });
            }
    
            // 2) Borrar primero los items asociados (tabla intermedia)
            await db.VentaProducto.destroy({
                where: { venta_id: id }
            });
    
            // 3) Borrar la venta principal
            await db.Ventas.destroy({
                where: { id }
            });
    
            // 4) Respuesta final
            return res.json({
                meta: {
                    status: 200,
                    mensaje: "Venta eliminada correctamente",
                    id,
                }
            });
    
        } catch (error) {
            console.error("Error al eliminar venta:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
};

module.exports = apiUsuariosController;
