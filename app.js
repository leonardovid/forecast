'use strict';


var forecast = require("./server/forecast.js");
var express = require('express')
var app = express()

//Archivos estaticos
app.use(express.static('public'));

//Rutas
app.use(require("./server/routes.js"));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})