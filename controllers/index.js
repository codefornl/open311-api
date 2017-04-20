var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path");
var env = process.env.NODE_ENV || "development";
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    router.use(require(path.join(__dirname, file)));
  });

module.exports = router;
