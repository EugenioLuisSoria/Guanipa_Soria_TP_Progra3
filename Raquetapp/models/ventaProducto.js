const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const VentaProducto = sequelize.define(
    "VentaProducto",
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        venta_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
        },
        producto_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: true,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        tableName: "VentaProducto",
        timestamps: false,
    }
);

module.exports = VentaProducto;
