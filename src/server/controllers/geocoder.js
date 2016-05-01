var models = require('../models');
var express = require('express');
var util = require('../helpers/util.js');
var nominatim = require('../helpers/nominatim.js');
var json2xml = require('json2xml');
var objectAssign = require('object-assign');
var router = express.Router();
var env = process.env.NODE_ENV || "development";

var getAddressInfo = function(req, res) {
  var now = new Date();
  //requires lat and lon
  var result = {};
  var format = req.params.format || 'xml';
  if(req.query.lat && req.query.lon){
    // Construct the url, can be overridden from the endpoint model
    //result = {"message": "A reverse geocoder will appear here"};
    nominatim.reverse(res,req,function(result){
      switch (format) {
          case 'json':
            var jsonFormats = [
              'text/xml',
              'application/json'
            ];
            result.format = jsonFormats;
            res.json(result);
            break;
          default:
            var xmlResult = result;
            res.set('Content-Type', 'text/xml');
            res.send(json2xml({
              result: xmlResult
            }, {
              header: true
            }));
        }
    });
  } else {
    res.status(400);
    result = {"error": "MissingParameters", "message": "The parameters lat and lon are required"};
    switch (format) {
        case 'json':
          var jsonFormats = [
            'text/xml',
            'application/json'
          ];
          result.format = jsonFormats;
          res.json(result);
          break;
        default:
          var xmlResult = result;
          res.set('Content-Type', 'text/xml');
          res.send(json2xml({
            result: xmlResult
          }, {
            header: true
          }));
      }
  }
};

router.route('/api/geo/reverse.:format').get(getAddressInfo);
module.exports = router;
