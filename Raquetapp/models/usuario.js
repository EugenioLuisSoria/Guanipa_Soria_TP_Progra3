const { DataTypes } = require("sequelize");
const sequelize = require("../database/database.js");

const Usuario = sequelize.define(
    "Usuario",
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        mail: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        tipo: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
    },
    {
        tableName: "Usuario",
        timestamps: false,
    }
);

module.exports = Usuario;
