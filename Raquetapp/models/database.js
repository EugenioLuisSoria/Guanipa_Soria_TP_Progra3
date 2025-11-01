const { Sequelize } = require("sequelize");

// Configuración de conexión
// IMPORTANTE: Ajusta estos valores según tu configuración de MySQL
const sequelize = new Sequelize("raquetapp", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 8889, // Si usas MAMP/XAMPP generalmente es 8889, si es MySQL estándar usa 3306
  logging: false, // Cambia a console.log si quieres ver las queries SQL
});

// Probar la conexión
sequelize
  .authenticate()
  .then(() => console.log("✅ Conectado correctamente a MySQL"))
  .catch((err) => {
    console.error("❌ Error al conectar a MySQL:", err.message);
    console.error("💡 Verifica:");
    console.error("   1. Que MySQL/MAMP esté corriendo");
    console.error("   2. Que el usuario/contraseña sean correctos");
    console.error("   3. Que el puerto sea el correcto (8889 para MAMP, 3306 para MySQL estándar)");
    console.error('   4. Que la base de datos "raquetapp" exista');
  });

module.exports = sequelize;
