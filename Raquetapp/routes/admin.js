var express = require("express");
var router = express.Router();
const verificarToken = require("../middleware/verificarToken.js");
const adminController = require("../controllers/adminController.js");
const productosController = require("../controllers/productosController.js");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

router.get("/", verificarToken, adminController.home);

/* RUTAS PARA QUE ADMIN PUEDA MODIFICAR PRODUCTOS */
router.get("/raquetas", verificarToken, productosController.getRaquetas);
router.get("/cuerdas", verificarToken, productosController.getCuerdas);

router.get("/raquetas/:id", verificarToken, productosController.getOne);
router.get("/cuerdas/:id", verificarToken, productosController.getOne);

router.post("/raquetas/:id", verificarToken, productosController.deleteOne);
router.post("/cuerdas/:id", verificarToken, productosController.deleteOne);

router.get("/nuevoProducto" ,verificarToken, productosController.nuevoProductoForm)
router.post("/nuevoProducto", verificarToken, upload.single("imagen"), productosController.crear);

module.exports = router;
