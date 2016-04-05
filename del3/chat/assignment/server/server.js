var http = require("http");
var express = require("express");
var app = express();
var port = process.env.PORT || 5000;


// Serve the files in the client folder
app.use(express.static(__dirname + "/../client"));
var server = http.createServer(app);
server.listen(port);
console.log("http server listening on %d", port);