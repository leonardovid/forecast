var forecast = require("./forecast.js");

var zipcode= process.argv[2];

forecast.forecast(zipcode);

