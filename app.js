'use strict';

var express = require('express')
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express()

//Archivos estaticos
app.use(express.static('public'));

//Rutas
app.use(require("./server/routes.js"));

//Template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//Body parser para JSON
app.use(bodyParser.json())

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})