var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var tables = [
   {
       routeName:
   }
];

var awaiting = [
   {

   }
];
app.get("/", function(req, res) {
   res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
   res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reservations", function(req, res) {
   res.sendFile(path.join(__dirname, "reservations.html"));
});

app.get("/api/tables/:table", function(req, res) {
   var chosen = req.params.table;

   console.log(chosen);

   for (var i=0; i<tables.length; i++) {
       if (chosen === tables[i].routeName) {
           return res.json(tables[i]);
       }
   }
   return res.json(false);
});

app.post("/api/tables", function(req, res) {
   var newTable = req.body;
   newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();

   console.log(newTable);

   tables.push(newTable);

   res.json(newTable);
});

app.get("/api/waitinglist/:awaiting", function(req, res) {
   var chosen = req.params.awaiting;

   console.log(chosen);

   for (var i=0; i<awaiting.length; i++) {
       if (chosen === awaiting[i].routeName) {
           return res.json(awaiting[i]);
       }
   }
   return res.json(false);
});

app.post("api/waitinglist", function(req, res) {
   var newAwaiting = req.body;
   newAwaiting.routeName = newAwaiting.name.replace(/\s+/g, "").toLowerCase();

   console.log(newAwaiting);

   awaiting.push(newAwaiting);

   res.json(newAwaiting);
});

app.listen(process.env.PORT || 3000, function() {
   console.log("App listening");
});