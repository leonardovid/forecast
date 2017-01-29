var https = require("https");
var forecast = require('./forecast')

function decode(place, country, res){
    var url ="https://maps.googleapis.com/maps/api/geocode/json?address="+place+"&components=country:"+country+"&key=AIzaSyD3ULGjizEUvrlF1Bbp-TeE4q-m7NRHqhg";
    var data="";
    var request = https.get(url,function(response){
        if(response.statusCode===200){
            
            response.on("data",function(datachunk){
                data+=datachunk;
            });
            response.on("end",function(){
                var geodecoding= JSON.parse(data).results[0]; 
              
                var lat=geodecoding.geometry.location.lat;
                var lng=geodecoding.geometry.location.lng;
                var city=geodecoding.formatted_address;
              
                forecast.getForecast(lat,lng,city,res);
                
            });
            response.on("error",function(error){
                console.error(error.message)
            });
          
        }else {
            console.log("There was an error trying to decode (Error "+response.statusCode+")");
            res.render('error',{"error":response.statusCode});
        }
    });
    
}

module.exports.decode=decode;