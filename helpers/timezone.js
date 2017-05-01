var jsts = require('jsts');
var geojsonReader = new jsts.io.GeoJSONReader();

exports.getTimezone = function(point){
  jstsPoint = geojsonReader.read(point);
  var result;
  var polygons = [
    { type: 'Polygon', coordinates: [[[100, 180], [100, 100], [180, 100], [180, 180], [100, 180]]], properties: {name: "test_timezone_1"}},
    { type: 'Polygon', coordinates: [[[20, 100], [20, 20], [100, 20], [100, 100], [20, 100]]], properties: {name: "test_timezone_2"}}
  ];
  var jstsPolygons = polygons.map(function(polygon, index) {
    jstsPolygon = geojsonReader.read(polygon);
    jstsPolygon.__index = index;
    return jstsPolygon;
  });
  // Find polygon containing point
  var result = [];
  jstsPolygons.filter(function(jstsPolygon){
    var within = jstsPoint.within(jstsPolygon);
    return within;
  }).forEach(function(poly) {
    result.push(polygons[poly.__index].properties.name);
  });
  return result;
};