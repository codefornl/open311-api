var jsts = require('jsts');
var geojsonReader = new jsts.io.GeoJSONReader();

exports.getTimezone = function(point, callback){
  jstsPoint = geojsonReader.read(point);
  var result;
  var fs = require('fs');
  var path = require('path');
  var featurecollection;
  fs.readFile(path.resolve(__dirname, '../assets/ne_10m_time_zones.geojson'), 'utf8', function (err, data) {
    if (err) callback(err, null);
    featurecollection = JSON.parse(data).features;
    var jstsPolygons = featurecollection.map(function(feature, index) {
      var geometry = feature.geometry;
      geometry.properties = feature.properties;
      jstsPolygon = geojsonReader.read(geometry);
      jstsPolygon.__index = index;
      return jstsPolygon;
    });
    // Find polygon containing point
    var result = [];
    jstsPolygons.filter(function(jstsPolygon){
    var within = jstsPoint.within(jstsPolygon);
      return within;
    }).forEach(function(poly) {
      var props = featurecollection[poly.__index].properties;
      result.push({
        "tz": props.time_zone,
        "name": props.name,
        "tz_name": props.tz_name1st
      });
    });
    callback(null, result);
  });
};