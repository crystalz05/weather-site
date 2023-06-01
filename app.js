const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html")
});

app.get("/:city", function(req, res){

    const city = req.params.city;
    const apiKey = "6d04310bc681c5951666615e52a6caf2";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric"

    https.get(url, function (response) {
        let data = "";

        response.on("data", function (chunk) {
            data += chunk;
          });

            response.on("end", function () {
                const weatherData = JSON.parse(data);
                const img = weatherData.weather[0].icon;
                const temp = weatherData.main.temp;
                const descri = weatherData.weather[0].description;
                const place = weatherData.name;
                const imgUrl = "https://openweathermap.org/img/wn/"+img+"@2x.png";
          
                res.json({ 
                    image: imgUrl,
                    temperature: temp,
                    description: descri,
                    place: place
                });
        });
    });

});   

app.listen(3000, function(){
    console.log("server stated at port 3000");
})
