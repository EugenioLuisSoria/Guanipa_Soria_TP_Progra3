const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Producto = sequelize.define("Producto", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    imagen: {
        type: DataTypes.STRING, //en sequlize escribe la ruta en string y las fotos guardas en /public
        allowNull: false,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

module.exports = Producto;
