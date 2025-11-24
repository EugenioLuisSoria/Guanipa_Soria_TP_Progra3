const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Ventas = sequelize.define(
    "Ventas",
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        medio: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    },
    },
    {
        tableName: "Ventas",
        timestamps: false,
    }
);

module.exports = Ventas;