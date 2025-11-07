const Producto = require("./producto.js");
const Categoria = require("./categoria.js");
const Venta = require("./venta.js");
const sequelize = require("../database/database.js");

Categoria.hasMany(Producto, { foreignKey: "categoria" });
Producto.belongsTo(Categoria, { foreignKey: "categoria" });

Producto.belongsToMany(Venta, { through: "VentaProducto", foreignKey: "producto_id" });
Venta.belongsToMany(Producto, { through: "VentaProducto", foreignKey: "venta_id" });

module.exports = { Producto, Categoria, Venta, sequelize };
