var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var tables = [
];

var awaiting = [
];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/tables.html", function(req, res) {
    res.sendFile(path.join(__dirname, "/tables.html"));
});

app.get("/reservations.html", function(req, res) {
    res.sendFile(path.join(__dirname, "/reservations.html"));
});

app.get("/api/tables", function(req, res) {
    return res.json(tables);
});

app.get("/api/reservations", function(req, res) {
    return res.json(awaiting);
});

app.post("/api/tables", function(req, res) {
    var newTable = req.body;
    
    console.log(newTable);
    if (tables.length <= 4) {
    tables.push(newTable);
    res.json(newTable);
    } else {
        awaiting.push(newTable);
        res.json(newTable);
    }    
});

app.listen(process.env.PORT || 3000, function() {
    console.log("App listening");
});