var express = require("express");
var router = express.Router();

const registroController = require("../controllers/registroController.js");

router.get("/", registroController.home);

router.post("/", registroController.register);

module.exports = router;
