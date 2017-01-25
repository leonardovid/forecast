var forecast = require("./server/forecast.js");

var zipcode= process.argv[2];

forecast.forecast(zipcode);

