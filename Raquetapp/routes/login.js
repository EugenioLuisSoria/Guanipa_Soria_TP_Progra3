var express = require("express");
var router = express.Router();


const loginController = require("../controllers/loginController.js");

router.get("/", loginController.home);
router.post("/", loginController.login);


//Ruta dev para cookies
router.get("/ver-cookies", (req, res) => {
    console.log(req.cookies);
    res.json(req.cookies);
});

module.exports = router;
