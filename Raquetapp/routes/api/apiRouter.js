var express = require("express");
var router = express.Router();
const upload = require("../../middlewares/multerMiddleware.js");

//Controllers
const apiProductosController = require("../../controllers/api/apiProductosController.js");
const apiUsuariosController = require("../../controllers/api/apiUsuariosController.js");
const apiVentasController = require("../../controllers/api/apiVentasController.js");
//Validaciones middleware
const { validarProductoCrear, validarProductoModificar } = require("../../middlewares/apiMiddleware/apiProductoValidaciones.js");
const { validarUsuarioCrear, validarUsuarioModificar } = require("../../middlewares/apiMiddleware/apiUsuarioValidaciones.js");
const { validarVentaCrear, validarVentaModificar } = require("../../middlewares/apiMiddleware/apiVentasValidaciones.js");
const validarCampos = require("../../middlewares/apiMiddleware/apiValidarCampos.js");

//RUTAS PRODUCTOS
router.get("/productos", apiProductosController.home);
router.get("/productos/listado", apiProductosController.listado);
router.get("/productos/listado/:id", apiProductosController.getOne);
router.post("/productos/crear", upload.single("imagen"), validarProductoCrear, validarCampos, apiProductosController.crear);
router.put("/productos/modificar/:id", upload.single("imagen"), validarProductoModificar, validarCampos, apiProductosController.modificar);
router.delete("/productos/eliminar/:id", apiProductosController.eliminar);

//RUTAS USUARIOS
router.get("/usuarios", apiUsuariosController.home);
router.get("/usuarios/listado", apiUsuariosController.listado);
router.get("/usuarios/listado/:id", apiUsuariosController.getOne);
router.post("/usuarios/crear", validarUsuarioCrear, validarCampos, apiUsuariosController.crear);
router.put("/usuarios/modificar/:id", validarUsuarioModificar, validarCampos, apiUsuariosController.modificar);
router.delete("/usuarios/eliminar/:id", apiUsuariosController.eliminar);

//RUTAS VENTAS
router.get("/ventas", apiVentasController.home);
router.get("/ventas/listado", apiVentasController.listado);
router.get("/ventas/listado/:id", apiVentasController.getOne);
router.post("/ventas/crear", validarVentaCrear, validarCampos, apiVentasController.crear);
router.put("/ventas/modificar/:id", validarVentaModificar, validarCampos, apiVentasController.modificar);
router.delete("/ventas/eliminar/:id", apiVentasController.eliminar);

module.exports = router;
