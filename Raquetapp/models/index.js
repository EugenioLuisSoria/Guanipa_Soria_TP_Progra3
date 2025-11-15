const Producto = require("./producto.js");
const Categoria = require("./categoria.js");
const Ventas = require("./ventas.js");
const Usuario = require("./usuario.js");
const VentaProducto = require("./ventaProducto.js");
const sequelize = require("../database/database.js");

Categoria.hasMany(Producto, { foreignKey: "categoria" });
Producto.belongsTo(Categoria, { foreignKey: "categoria" });

Producto.belongsToMany(Ventas, { through: "VentaProducto", foreignKey: "producto_id" });
Ventas.belongsToMany(Producto, { through: "VentaProducto", foreignKey: "venta_id" });

module.exports = { Producto, Categoria, Ventas, VentaProducto, Usuario, sequelize };
