var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

//Body parser para x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

//Body parser para JSON
router.use(bodyParser.json())

router.get('/', function(req, res) {
  res.render('search');
});

router.post('/',function(req, res){
res.send(req.body);
});

module.exports = router;