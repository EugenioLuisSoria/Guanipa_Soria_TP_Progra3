const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");

const Categoria = sequelize.define(
    "Categoria",
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "Categoria",
        timestamps: false,
    }
);

module.exports = Categoria;
