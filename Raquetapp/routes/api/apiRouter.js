var express = require("express");
var router = express.Router();
const upload = require("../../middleware/multerMiddleware.js");

const apiProductosController = require("../../controllers/api/apiProductosController.js");
const apiUsuariosController = require("../../controllers/api/apiUsuariosController.js");

router.get("/productos", apiProductosController.home);
router.get("/productos/listado", apiProductosController.listado);
router.get("/productos/listado/:id", apiProductosController.getOne);
router.post("/productos/crear", upload.single("imagen"), apiProductosController.crear);
router.put("/productos/modificar/:id", upload.single("imagen"), apiProductosController.modificar);
router.delete("/productos/eliminar/:id", apiProductosController.eliminar);

router.get("/usuarios", apiUsuariosController.home);
router.get("/usuarios/listado", apiUsuariosController.listado);
router.get("/usuarios/listado/:id", apiUsuariosController.getOne);
router.post("/usuarios/crear", apiUsuariosController.crear);
router.put("/usuarios/modificar/:id", apiUsuariosController.modificar);
router.delete("/usuarios/eliminar/:id", apiUsuariosController.eliminar);

module.exports = router;
