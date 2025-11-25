var express = require("express");
var router = express.Router();

const apiProductosController = require("../../controllers/api/apiProductosController.js");
const apiUsuariosController = require("../../controllers/api/apiUsuariosController.js");

router.get('/productos', apiProductosController.home);


router.get('/usuarios', apiUsuariosController.home);

module.exports = router;
