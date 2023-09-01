// basic express server
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const mongodb = require('./src/db/connect');
const mongoose = require('mongoose');
const router = express.Router();

router.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });
  app.use("/", require("./src/router"));

// Start the server on port 3000

// Main
mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    mongoose
    .connect(process.env.MONGODB_URI)
    app.listen(port);
    console.log(`Connected to port => ${port}`);
  }
});