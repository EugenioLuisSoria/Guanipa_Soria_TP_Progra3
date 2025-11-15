const jwt = require("jsonwebtoken");
const CLAVE_SECRETA = "Soy una clave secreta"; // pásalo luego a .env

const verificarToken = (req, res, next) => {
    const token = req.cookies.token;

    // No hay cookie
    if (!token) {
        req.user = null;
        return res.render("login", { msj: "Token inválido o expirado:" });
        /* return next(); */
    }

    try {
        // Verificar token
        const userData = jwt.verify(token, CLAVE_SECRETA);

        // Guardar los datos del usuario en req
        req.user = userData;

        return next();
    } catch (error) {
        console.error("Token inválido o expirado:", error);
        return res.render("login", { msj: "ERROR : Token inválido o expirado:" });
        /* return next(); */
    }
};

module.exports = verificarToken;
