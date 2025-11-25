const Producto = require("./producto.js");
const Categoria = require("./categoria.js");
const Ventas = require("./ventas.js");
const Usuario = require("./usuario.js");
const VentaProducto = require("./ventaProducto.js");
const sequelize = require("../database/database.js");

// Relación Categoria 1:N Producto
Categoria.hasMany(Producto, { foreignKey: "categoria" });
Producto.belongsTo(Categoria, { foreignKey: "categoria" });

// Relación Venta 1:N VentaProducto
Ventas.hasMany(VentaProducto, { foreignKey: "venta_id" });
VentaProducto.belongsTo(Ventas, { foreignKey: "venta_id" });

// Relación Producto 1:N VentaProducto
Producto.hasMany(VentaProducto, { foreignKey: "producto_id" });
VentaProducto.belongsTo(Producto, { foreignKey: "producto_id" });

// Relación N:M (acceso directo Productos ↔ Ventas)
Producto.belongsToMany(Ventas, { through: VentaProducto, foreignKey: "producto_id" });
Ventas.belongsToMany(Producto, { through: VentaProducto, foreignKey: "venta_id" });

module.exports = { Producto, Categoria, Ventas, VentaProducto, Usuario, sequelize };
