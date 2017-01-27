var https = require("https");

function printCord(lat, lng){
    console.log("latitude: "+lat+" longitude: "+lng);
}

function wheather(place, country, res){
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
              
                getForecast(lat,lng,city,res);
                
            });
            response.on("error",function(error){
                console.error(error.message)
            });
          
        }else {
            console.log("There was an error trying to decode (Error "+response.statusCode+")");
        }
    });
    
}
function getForecast(lat, lng, city, res){
    var url ="https://api.forecast.io/forecast/180006f69b9c10514c752ae8fe5e6716/"+lat+","+lng+"?exclude=minutely,hourly,daily,alerts,flags";
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
        }
    });

}


module.exports.wheather= wheather;
