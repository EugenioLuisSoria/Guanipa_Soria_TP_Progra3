const { Producto } = require("./producto.js");
const { Categoria } = require("./categoria.js");


Producto.hasOne(Categoria, { foreignKey: "id_categoria" }); //va a agregar idUser a la tabla perfil
Categoria.belongsTo(Producto, { foreignKey: "id_categoria" });

module.exports = { Producto, Categoria };
