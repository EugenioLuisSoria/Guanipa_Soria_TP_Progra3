const Producto = require("./producto.js");
const Categoria = require("./categoria.js");
const sequelize = require("../database/database.js");

/* Producto.hasOne(Categoria, { foreignKey: "id_categoria" }); //va a agregar idUser a la tabla perfil
Categoria.belongsTo(Producto, { foreignKey: "id_categoria" }); */

Categoria.hasMany(Producto, { foreignKey: "categoria" });
Producto.belongsTo(Categoria, { foreignKey: "categoria" });

module.exports = { Producto, Categoria, sequelize };
