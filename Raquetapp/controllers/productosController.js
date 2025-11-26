const db = require("../models/index.js");
const fs = require("fs");

const productosController = {
    getRaquetas: async (req, res) => {
        try {
            const producto = await db.Producto.findAll({
                include: {
                    model: db.Categoria,
                    where: { tipo: "raquetas" },
                },
            });

            res.render("productos", { producto: producto, tipo: "raquetas" });
        } catch (error) {
            console.error("Error al obtener admin/productosAdmin:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    getCuerdas: async (req, res) => {
        try {
            const producto = await db.Producto.findAll({
                include: {
                    model: db.Categoria,
                    where: { tipo: "cuerdas" },
                },
            });
            res.render("productos", { producto: producto, tipo: "cuerdas" });
        } catch (error) {
            console.error("Error al obtener admin/productosAdmin:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    getOne: async (req, res) => {
        try {
            let idOne = req.params.id;
            const producto = await db.Producto.findAll({
                where: { id: idOne },
            });
            res.render("item", { producto: producto });
        } catch {
            console.error("Error al obtener admin/productosAdmin:", error);
            res.status(500).send("Error interno del servidor");
        }
    },

    //SOLO PARA ADMIN!!! :
    //SOLO PARA ADMIN!!! :
    getRaquetas_ADMIN: async (req, res) => {
        try {
            const producto = await db.Producto.findAll({
                include: {
                    model: db.Categoria,
                    where: { tipo: "raquetas" },
                },
            });

            res.render("admin/productosAdmin", { producto: producto, tipo: "raquetas" });
        } catch (error) {
            console.error("Error al obtener admin/productosAdmin:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    getCuerdas_ADMIN: async (req, res) => {
        try {
            const producto = await db.Producto.findAll({
                include: {
                    model: db.Categoria,
                    where: { tipo: "cuerdas" },
                },
            });
            res.render("admin/productosAdmin", { producto: producto, tipo: "cuerdas" });
        } catch (error) {
            console.error("Error al obtener admin/productosAdmin:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    getOne_ADMIN: async (req, res) => {
        try {
            let idOne = req.params.id;
            const producto = await db.Producto.findAll({
                where: { id: idOne },
            });
            res.render("admin/itemAdmin", { producto: producto });
        } catch {
            console.error("Error al obtener admin/productosAdmin:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    deleteOne_ADMIN: async (req, res) => {
        try {
            let idOne = req.params.id;

            //ESTO ES PARA ELIMINAR DE DB:
            /* const eliminado = await db.Producto.destroy({
                where: { id: idOne },
            }); 
            if (!eliminado) {
                return res.status(404).send("Producto no encontrado");
            } */

            //TP PIDE "ELIMINAR" PONIENDO COMO INACTIVO EL PRODUCTO
            await db.Producto.update({ activo: 0 }, { where: { id: idOne } });

            res.render("admin/indexAdmin", { msj: "Producto Eliminado" }); // o la vista que quieras
        } catch (error) {
            console.error("Error al eliminar:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    nuevoProductoForm_ADMIN: async (req, res) => {
        res.render("admin/crearProductoAdmin");
    },
    crear_ADMIN: async (req, res) => {
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
                categoria: Number(categoria),
                stock: Number(stock),
                activo: activo ? 1 : 0,
            });

            console.log("Producto creado:", nuevoProducto.id);
            msj = "Nuevo Producto creado";
            // DESPUÉS DE CREAR → REDIRIGIR A LA LISTA ADMIN
            return res.render("admin/indexAdmin", { msj });
            // O /cuerdas según lo que corresponda
        } catch (error) {
            console.error("Error al crear producto:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    modificarForm_ADMIN: async (req, res) => {
        try {
            idProd = req.params.id;
            const producto = await db.Producto.findOne({
                where: { id: idProd },
                include: db.Categoria,
            });

            res.render("admin/modificarProductoAdmin", { producto });
        } catch (error) {
            console.error("Error al obtener admin/productosAdmin:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    modificar_ADMIN: async (req, res) => {
        try {
            const id = req.params.id;
            const { nombre, descripcion, precio, categoria, stock, activo, imagenActual } = req.body;

            let imagenFinal = imagenActual; // usar la anterior por defecto

            if (req.file) {
                imagenFinal = "/images/productos/" + req.file.filename;
            }

            await db.Producto.update(
                {
                    nombre,
                    descripcion,
                    precio: Number(precio),
                    categoria: Number(categoria),
                    stock: Number(stock),
                    activo,
                    imagen: imagenFinal,
                },
                { where: { id } }
            );

            return res.redirect("/admin");
        } catch (err) {
            console.error(err);
            res.status(500).send("Error interno del servidor");
        }
    },
};

module.exports = productosController;
