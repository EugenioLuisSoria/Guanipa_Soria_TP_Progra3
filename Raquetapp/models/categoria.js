const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Categoria = sequelize.define("Categoria", {
    nombre: {
        type: DataTypes.NUMBER,
        allowNull: false,
    }
});

module.exports = Categoria;
