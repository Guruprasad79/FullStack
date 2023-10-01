const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/data.js");
const app = express();

var items = ["Learning Trading", "Learning Full Stack Development", "Look At The Trading Chart"];
let workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    /*var today = new Date();
    var currentDay = today.getDay();
    var day = "";
    if(currentDay === 6 || currentDay === 0){
        day = today.get;
    }else{
        //res.write("<p>It's not a weekend</p>");
        //res.write("<h1>Boo! Need to work</h1>");
        day = "Weekday";
    }*/
    /*switch (currentDay) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        default:
            console.log("Error: Current Day is equal to: " + currentDay);
            break;
    }
    var options = {
        day: "numeric",
        weekday: "long",
        month: "long"
    };

    day = today.toLocaleDateString("en-US", options);*/
    let day = date.getDate()    //let day = data.getDay();
    res.render("list",{listTitle : day, listItems: items});
});

app.post("/",function(req,res){
    var item = req.body.list;
    console.log(req.body);
    if(req.body.newItem === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work",function(req,res){
    res.render("list",{listTitle: "Work List", listItems: workItems});
});

app.post("/work",function(req,res){
    var item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(3000, function(){
    console.log("Server is running on Port 3000.");
});