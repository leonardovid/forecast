'use strict';

var express = require('express')
var exphbs  = require('express-handlebars');
var app = express()

//Archivos estaticos
app.use(express.static('public'));

//Rutas
app.use(require("./server/routes.js"));

//Template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})