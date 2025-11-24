const db = require("../models/index.js");

const carritoController = {
    getCarrito: async (req, res) => {
        try {
            let ids = req.query.ids ? req.query.ids.split(",").map(Number) : [];
            let productos = await db.Producto.findAll({
                where: { id: ids },
            });
            const usuario = req.session?.usuario || { nombre: "Invitado" };
            res.render("carrito", { productos, usuario });
        } catch (error) {
            console.error("Error al obtener productos:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    pagarCarrito: async (req, res) => {
        try {
            let ids = req.body.productosParaPagar.split(",").map(Number);
            let nombreUsuario = req.body.nombreUsuario;

            // Traemos los productos únicos
            const productosBase = await db.Producto.findAll({
                where: { id: [...new Set(ids)] },
            });

            // Reconstruimos el array manteniendo duplicados
            const productosTotales = ids.map((id) => {
                return productosBase.find((p) => p.id === id);
            });

            // Crea obj Conteo, donde {id: cantidadDeVecesRepetido}
            const conteo = ids.reduce((acum, id) => {
                acum[id] = (acum[id] || 0) + 1;
                return acum;
            }, {});

            // Calculamos el total
            const totalPago = productosBase.reduce((acum, p) => acum + p.precio * conteo[p.id], 0);

            // Creamos la venta
            const venta = await db.Ventas.create({
                fecha: new Date(),
                medio: "Tarjeta", // o lo que venga del formulario
                nombre: nombreUsuario,
                total: totalPago,
            });

            for (const p of productosBase) {
                await venta.addProducto(p, { through: { cantidad: conteo[p.id] } });
            }

            // Redirigir a la descarga de PDF
            res.redirect(`/tickets/pdf?ids=${venta.id}`);
        } catch (error) {
            console.error("Error al pagar carrito:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
};

module.exports = carritoController;
