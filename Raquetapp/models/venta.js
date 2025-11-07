const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");

const Venta = sequelize.define(
    "Venta",
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        producto: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        medio: {
            type: DataTypes.STRING, 
            allowNull: false,
        }
    },
    {
        tableName: "Venta",
        timestamps: false,
    }
);

module.exports = Venta;
