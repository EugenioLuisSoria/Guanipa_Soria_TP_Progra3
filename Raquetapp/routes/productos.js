var express = require("express");
var router = express.Router();
const productosController = require("../controllers/productosController.js");

/* GET home page. */
router.get("/raquetas", productosController.getRaquetas);
router.get("/cuerdas", productosController.getCuerdas);

module.exports = router;
