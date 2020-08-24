const express = require('express');
const server = express();
const http = require("http").Server(server);
const path = require('path');

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

server.set("json spaces", 2);
server.use('/', express.static(path.resolve(__dirname, 'public')));

server.use((req, res, next) => {
  const error = new Error("Error 404");
  error.status = 404;
  next(error);
});

server.use((error, req, res, next) => {
  res.status(error.status || 500);
  if (error.status === 404) {
    res.sendFile(path.join(__dirname, "/404.html"));
  }
  else {
    res.sendFile(path.join(__dirname, "/500.html"));
  }
});

let port = 80;
let ip = "0.0.0.0";

http.listen(port, ip, () => {
  console.log("listening at port: " + port);
});