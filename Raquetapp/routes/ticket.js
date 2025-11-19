var express = require("express");
var router = express.Router();
const ticketController = require("../controllers/ticketController.js");
router.get("/pdf", ticketController.descargarticket);
router.get("/:id", ticketController.getticket);



module.exports = router;
