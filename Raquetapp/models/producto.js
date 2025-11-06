const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Producto = sequelize.define("Producto", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
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
    stock: {
        type: DataTypes.NUMBER,
        allowNull: true,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
});

module.exports = Producto;
