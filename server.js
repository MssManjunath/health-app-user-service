var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require('cors');
require('dotenv').config()


var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors('*'));
app.use('/public', express.static('public'));
app.use(express.static(__dirname + "/public"));
require("./app/routes")(app);
app.listen(port);
console.log(`App started at port ${port}`);

mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)
}); 

mongoose.connection.on('open', function (err) {
    if (err) {
        console.log("database error");
        console.log(err);
    } else {
        console.log("database connection open success");
    }
}); 

exports = module.exports = app;
