const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    const query = req.body.city;
    const appid = "18c9de79170248cb83f247c773597e22";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data); //JSON.stringify to the save space

            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const imgIcon = weatherData.weather[0].icon;
            const url = "http://openweathermap.org/img/wn/" + imgIcon + "@2x.png";
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temperature + " degree Celcuis.</h1>");
            res.write("<img src=" + url +"></img>");
            res.send();
        });
    });
});

app.listen(3000,function(){
    console.log("Server is running at port number 3000.");
});