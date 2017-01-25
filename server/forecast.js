var https = require("https");

function printCord(lat, lng){
    console.log("latitude: "+lat+" longitude: "+lng);
}

function forecast(zipcode){
    var url ="https://maps.googleapis.com/maps/api/geocode/json?address="+zipcode+"&key=AIzaSyD3ULGjizEUvrlF1Bbp-TeE4q-m7NRHqhg";
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
                var city=geodecoding.address_components[3].long_name;
              
                showWheather(lat,lng,city);
            });
            response.on("error",function(error){
                console.error(error.message)
            });
          
        }else {
            console.log("There was an error trying to decode (Error "+response.statusCode+")");
        }
    });
    
}
function showWheather(lat,lng,city){
    var url ="https://api.forecast.io/forecast/180006f69b9c10514c752ae8fe5e6716/"+lat+","+lng;
    var data="";
    var request = https.get(url,function(response){
        if(response.statusCode===200){
            
            response.on("data",function(datachunk){
                data+=datachunk;
            });
            response.on("end",function(){
                var forecast= JSON.parse(data);                              
                console.log("City: "+city+" Sky: "+forecast.currently.summary+" Temperature: "+forecast.currently.temperature);
            });
            response.on("error",function(error){
                console.error(error.message)
            });
          
        }else {
            console.log("There was an error trying to get the Wheather (Error "+response.statusCode+")");
        }
    });

}


module.exports.forecast= forecast;