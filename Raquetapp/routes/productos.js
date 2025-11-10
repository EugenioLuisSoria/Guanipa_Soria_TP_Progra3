var express = require("express");
var router = express.Router();
const productosController = require("../controllers/productosController.js");

/* GET home page. */
router.get("/raquetas", productosController.getRaquetas);
router.get("/cuerdas", productosController.getCuerdas);

router.get("/raquetas/:id", productosController.getOne);
router.get("/cuerdas/:id", productosController.getOne);

module.exports = router;
