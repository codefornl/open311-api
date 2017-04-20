var http = require('http');
var querystring = require('querystring');

var search = function(res, req, callback){
  var queryparams = req.params;
  queryparams.format ='json';
  queryparams.polygon = 0;
  queryparams.addressdetails = 1;
  queryparams.limit = 1;
  queryparams['accept-language'] = req.headers["accept-language"].substring(0,2);
  var Feature;
  var options = {
    host: 'nominatim.openstreetmap.org',
    port: 80,
    path: '/search?' + querystring.stringify(queryparams)
  };
  http.get(options, function(remote_res){
    var mybuf = '';
    remote_res.on('error', function(e) {
      return callback(e);
    });
    remote_res.on('data',function(chunk){
      mybuf += chunk;
    });
    remote_res.on('end',function(){
      if (remote_res.headers['content-type'].indexOf('json') > -1){
        myResult = JSON.parse(mybuf);
        if (myResult.length === 1){
            Feature = {type: "Feature"};
            Feature.geometry = {type: "Point", coordinates: [ parseFloat(myResult[0].lat), parseFloat(myResult[0].lon) ]};
            Feature.geometry.crs = { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" }};
            Feature.properties = {"address" :myResult[0].address};
            Feature.properties.class = myResult[0].class;
            Feature.properties.type = myResult[0].type;
            Feature.properties.source = 'nominatim';
            Feature.properties.osm = {type: myResult[0].osm_type, id: myResult[0].osm_id, license: 'Map data (c) OpenStreetMap contributors, CC-BY-SA'};
            return callback(Feature);
        } else if (myResult.length > 1){
            var Features = {type: "FeatureCollection"};
            Features.features = [];
            for(var p=0; p<myResult.length; ++p) {
                Feature = {type: "Feature"};
                Feature.geometry = {type: "Point", coordinates: [ parseFloat(myResult[0].lat), parseFloat(myResult[0].lon) ]};
                Feature.geometry.crs = { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" }};
                Feature.properties = {"address" :myResult[0].address};
                Feature.properties.class = myResult[0].class;
                Feature.properties.type = myResult[0].type;
                Feature.properties.source = 'nominatim';
                Feature.properties.osm = {type: myResult[0].osm_type, id: myResult[0].osm_id, license: 'Map data (c) OpenStreetMap contributors, CC-BY-SA'};
                Feature.features.push(Feature);
            }
            return callback(Features);
        } else {
            return callback({"problem": 1});
        }
      } else {
        return callback({"problem": 2});
      }
    });
    return callback({"problem": 3});
  });
};

var reverse = function(res, req, callback){
  var queryparams = req.params || {};
  queryparams.lat = req.query.lat || 0;
  queryparams.lon = req.query.lon || 0;
  queryparams.zoom = req.query.zoom || 18;
  queryparams.format ='json';
  queryparams.polygon = 0;
  queryparams.addressdetails = 1;
  queryparams.extratags = 0;
  queryparams.namedetails = 0;
  queryparams.limit = 1;
  queryparams.email = 'milo@dogodigi.net';
  queryparams['accept-language'] = req.headers["accept-language"].substring(0,2);
  var Feature;
  var options = {
    host: 'nominatim.openstreetmap.org',
    port: 80,
    path: '/reverse?' + querystring.stringify(queryparams)
  };
  http.get(options, function(remote_res){
    var mybuf = '';
    remote_res.on('error', function(e) {
    return callback(e);
    });
    remote_res.on('data',function(chunk){
      mybuf += chunk;
    });
    remote_res.on('end',function(){
      if (remote_res.headers['content-type'].indexOf('json') > -1){
        myResult = JSON.parse(mybuf);
        return callback(myResult);
      } else {
        return callback({"error": "nominatimError", "message": mybuf});
      }
    });
  });
};
exports.reverse = reverse;
exports.search = search;
