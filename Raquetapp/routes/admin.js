var express = require("express");
var router = express.Router();
const verificarToken = require("../middleware/verificarToken.js");
const adminController = require("../controllers/adminController.js");
const productosController = require("../controllers/productosController.js");
const upload = require("../middleware/multerMiddleware.js");

router.get("/", verificarToken, adminController.home);

/* RUTAS PARA QUE ADMIN PUEDA MODIFICAR PRODUCTOS */
router.get("/raquetas", verificarToken, productosController.getRaquetas_ADMIN);
router.get("/cuerdas", verificarToken, productosController.getCuerdas_ADMIN);

router.get("/raquetas/:id", verificarToken, productosController.getOne_ADMIN);
router.get("/cuerdas/:id", verificarToken, productosController.getOne_ADMIN);

router.delete("/raquetas/:id", verificarToken, productosController.deleteOne_ADMIN);
router.delete("/cuerdas/:id", verificarToken, productosController.deleteOne_ADMIN);

router.get("/nuevoProducto", verificarToken, productosController.nuevoProductoForm_ADMIN);
router.post("/nuevoProducto", verificarToken, upload.single("imagen"), productosController.crear_ADMIN);

router.get("/modificarProducto", verificarToken, productosController.modificarForm_ADMIN);
router.put("/modificarProducto", verificarToken, upload.single("imagen"), productosController.modificar_ADMIN);

module.exports = router;
