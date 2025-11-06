const { Sequelize } = require("sequelize");
const PORT = Number(process.env.PORT);
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

// Configuración de conexión
const sequelize = new Sequelize("raquetapp", DB_USER, DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    port: PORT,
    password: DB_PASSWORD,
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
