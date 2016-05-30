/**
 * Helper function to propercase a string by
 * Starting with a capital and lowercasing the
 * rest.
 */
String.prototype.toProperCase = function() {
  return this.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

exports.first = function(obj) {
    for (var a in obj) return obj[a];
};

exports.StringToIntArray = function(stringToSplit){
  function isInt(value) {
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value));
  }
  var m = stringToSplit
    .replace(/\s\s+/g, ' ')
    .replace(/^\s+|\s+$/g,",")
    .split(/\s*,\s*/);
  var o = [];
  for (var i = 0; i < m.length; i++) {
    if(isInt(m[i])){
      o.push(parseInt(m[i], 10));
    }
  }
  return o;
};

/**
 * Compact arrays with null entries; delete keys from objects with null value
 *
 * @param {json} data
 * @returns data with nulls removed.
 */
exports.removeNulls = function(data) {
  var y;
  for (var x in data) {
    y = data[x];
    if (y === "null" || y === null || y === "" || typeof y === "undefined" || (y instanceof Object && Object.keys(y).length === 0)) {
      delete data[x];
    }
    if (y instanceof Object) y = removeNulls(y);
  }
  return data;
};

exports.getConfig = function(key) {
  var fs = require("fs");
  var config;
  var env = process.env.NODE_ENV || "development";
  if (!fs.existsSync(__dirname + '/../config.json')) {
    console.log('Warning, no config.json present. Falling back to config.default.json');
    config = require(__dirname + '/../config.default.json')[env];
  } else {
    config = require(__dirname + '/../config.json')[env];
  }
  return config[key];
};
