var https = require("https");


function getForecast(lat, lng, city, res){
    var url ="https://api.forecast.io/forecast/180006f69b9c10514c752ae8fe5e6716/"+lat+","+lng+"?exclude=minutely,hourly,daily,alerts,flags&lang=es&units=si";
    var data="";
    var request = https.get(url,function(response){
        if(response.statusCode===200){
            
            response.on("data",function(datachunk){
                data+=datachunk;
            });
            response.on("end",function(){
                var forecast= JSON.parse(data);                              
                forecast.currently.city = city;
                res.render('wheather',forecast.currently);
            });
            response.on("error",function(error){
                console.error(error.message)
            });
          
        }else {
            console.log("There was an error trying to get the Wheather (Error "+response.statusCode+")");
            res.render('error');
        }
    });

}


module.exports.getForecast= getForecast;
