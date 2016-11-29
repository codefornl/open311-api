(function () {
  'use strict';
  var fs = require("fs");
  var path = require("path");
  var Sequelize = require("sequelize");
  var env = process.env.NODE_ENV || "development";
  var config;
  if (!fs.existsSync(__dirname + '/../config.json')) {
      //console.log('Warning, no config.json present. Falling back to config.default.json');
      //check to see if config file exists, if not, default to config.default.json
      config = require(__dirname + '/../config.default.json')[env];
  } else {
      config = require(__dirname + '/../config.json')[env];
  }
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
  var db = {};
  fs
    .readdirSync(__dirname)
    .filter(function(file) {
      return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
      var model = sequelize.import(path.join(__dirname, file));
      db[model.name] = model;
    });
  Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
      db[modelName].associate(db);
    }
  });
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  module.exports = db;
}());
