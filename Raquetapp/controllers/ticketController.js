const db = require("../models/index.js");

const ticketController = {
    getticket: async (req, res) => {
        try {
            const id = req.params.id;
            const venta = await db.Ventas.findByPk(id, {
                include: [
                    {
                        model: db.Producto,
                        attributes: { exclude: ["cantidad"] }, // TRAE TODOS LOS CAMPOS
                        through: {
                            attributes: { exclude: [] }, // TRAE TODOS LOS CAMPOS DEL PIVOT
                        },
                        
                    },
                ],
                attributes: { exclude: [] }, // TRAE TODOS LOS CAMPOS DE VENTAS
            });
            console.log("VENTA:", venta.dataValues);
            console.log("PRODUCTOS:", venta.Productos.map(p => p.dataValues));


            if (!venta) {
                return res.status(404).send("Venta no encontrada");
            }
            const ticket = {
                idticket: venta.id,
                fechaCompra: venta.fecha,
                productos: venta.Productos.map((prod) => ({
                    id: prod.id,
                    nombre: prod.nombre,
                    precio: prod.precio,
                    cantidad: prod.VentaProducto.cantidad,
                })),
                medioPago: venta.medio,
                nombreCliente: venta.nombre /* ,
                cliente: venta.Usuario.nombre,
                emailCliente: venta.Usuario.mail,
                precioUnitario: venta.Producto.precio,
                cantidad: 1, // si no tienes columna cantidad
                total: venta.Producto.precio * 1 */,
            };
            ticket.esVista = true;
            res.render("ticket", { ticket });
        } catch (error) {
            console.log(error);
            //res.status(500).send("Error interno del servidor");
        }
    },

    descargarticket: async (req, res) => {
        try {
            let ids = req.query.ids ? req.query.ids.split(",").map(Number) : [];
            const venta = await db.Ventas.findByPk(ids[0], {
                include: [
                    { model: db.Producto } /* ,
                { model: db.Usuario } */,
                ],
            });

            if (!venta) {
                return res.status(404).send("Venta no encontrada");
            }

            const ticket = {
                idticket: venta.id,
                fechaCompra: venta.fecha,
                medioPago: venta.medio,
                nombreCliente: venta.nombre /* ,
            cliente: venta.Usuario.nombre,
            emailCliente: venta.Usuario.mail,
            producto: venta.Producto.nombre,
            precioUnitario: venta.Producto.precio,
            cantidad: 1,
            total: venta.Producto.precio * 1 */,
            };

            res.render("ticket", { ticket });
        } catch (error) {
            console.error("Error al descargar el ticket:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
};

module.exports = ticketController;
