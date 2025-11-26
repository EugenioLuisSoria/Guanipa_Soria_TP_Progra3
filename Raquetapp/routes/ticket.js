var express = require("express");
var router = express.Router();
const ticketController = require("../controllers/ticketController.js");
router.get("/pdf/:id", ticketController.getticket);
router.get("/pdf", ticketController.descargarticket);


module.exports = router;
