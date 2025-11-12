var express = require("express");
var router = express.Router();
const carritoController = require("../controllers/carritoController.js");

router.get("/", carritoController.getCarrito);

router.post("/pagar", carritoController.pagarCarrito);



//SUMAR Y RESTAR PRODS DEL CARRITO
//ES POR EL FRONT
/* router.post('/agregar', carritoController.agregarCarrito);
router.post('/eliminar', carritoController.eliminarCarrito);
router.post('/actualizar', carritoController.actualizarCarrito); */




module.exports = router;
