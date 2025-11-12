const db = require("../models/index.js");

const carritoController = {
    getCarrito: async (req, res) => {
        try {
            let ids = req.query.ids ? req.query.ids.split(",").map(Number) : [];
            let productos = await db.Producto.findAll({
                where: { id: ids },
            });

            res.render("carrito", { productos });
        } catch (error) {
            console.error("Error al obtener productos:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    pagarCarrito: async (req, res) => {
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
        totalPago = productosTotales.reduce((acum, producto) => {
            return acum + Number(producto.precio);
        }, 0);
        res.render("pago", { productosBase, totalPago, conteo });
    },
};

module.exports = carritoController;
