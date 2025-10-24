var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('productos', { title: 'Express' });
});


/* todavia el uso de rutas no se comprende aun...  */
/* Si seran rutas dinamicas: una p/raquetas una p/cuerdas */
/* o será una pagina para cada opcion */
module.exports = router;
