const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Producto = sequelize.define('Producto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING, //en sequlize escribe la ruta en string
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

module.exports = Producto;
