var express = require("express");
var router = express.Router();
const ticketController = require("../controllers/ticketController.js");
router.get("/pdf", ticketController.descargarticket);
router.get("/pdf/:id", ticketController.getticket);


module.exports = router;
