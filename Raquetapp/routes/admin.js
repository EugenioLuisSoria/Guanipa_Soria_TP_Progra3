var express = require("express");
var router = express.Router();

const verificarToken = require("../middleware/verificarToken.js");
const adminController = require("../controllers/adminController.js");

router.get("/", verificarToken, adminController.home);

module.exports = router;
