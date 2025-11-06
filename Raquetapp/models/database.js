const { Sequelize } = require('sequelize');

// Configuración de conexión
const sequelize = new Sequelize('raquetapp', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql'
});

// Probar la conexión
sequelize.authenticate()
  .then(() => console.log(' Conectado correctamente a MySQL'))
  .catch(err => console.error(' Error al conectar a MySQL:', err));

module.exports = sequelize;

