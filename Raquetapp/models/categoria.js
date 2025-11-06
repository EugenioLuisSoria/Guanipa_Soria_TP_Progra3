const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Categoria = sequelize.define("Categoria", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Categoria;
