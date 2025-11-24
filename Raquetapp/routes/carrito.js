var express = require("express");
var router = express.Router();
const carritoController = require("../controllers/carritoController.js");

router.get("/", carritoController.getCarrito);

router.post("/pagar", carritoController.pagarCarrito);




module.exports = router;
