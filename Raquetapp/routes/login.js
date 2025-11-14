var express = require("express");
var router = express.Router();

const loginController = require("../controllers/loginController.js");

router.get('/', loginController.home);

router.post('/', loginController.login);

module.exports = router;
