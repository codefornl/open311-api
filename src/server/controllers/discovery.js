var models = require('../models');
var express = require('express');
var util = require('../helpers/util.js');
var json2xml = require('json2xml');
var objectAssign = require('object-assign');
var router = express.Router();
var env = process.env.NODE_ENV || "development";

var getDiscovery = function(req, res) {
  var now = new Date();
  var format = req.params.format || 'xml';
  // Construct the url, can be overridden from the endpoint model
  models.discovery.findOne({
    attributes: ['changeset', 'contact', 'key_service'],
    include: {
      model: models.endpoint,
      attributes: ['specification', 'url', 'changeset', 'type']
    }
  }).then(function(result) {
    //var fullUrl = req.protocol + '://' + req.get('host') + req.baseUrl + '/api/';
    ///var keyUrl = req.protocol + '://' + req.get('host') + req.baseUrl + '/signup/';
    if (result) {
      result = result.toJSON();
    } else {
      result = {
        "endpoints": []
      };
    }
    switch (format) {
      case 'json':
        var jsonFormats = [
          'text/xml',
          'application/json'
        ];
        for (var y in result.endpoints) {
          result.endpoints[y].formats = jsonFormats;
        }
        res.json(result);
        break;

      default:
        var xmlResult = result;
        var xmlEndpoints = [];
        var xmlFormats = [{
          format: 'text/xml'
        }, {
          format: 'application/json'
        }];
        for (var x in xmlResult.endpoints) {
          xmlResult.endpoints[x].formats = xmlFormats;
          xmlEndpoints.push({
            endpoint: xmlResult.endpoints[x]
          });
        }
        xmlResult.endpoints = xmlEndpoints;
        res.set('Content-Type', 'text/xml');
        res.send(json2xml({
          discovery: xmlResult
        }, {
          header: true
        }));
    }
  });
};

router.route('/api/').get(getDiscovery);
router.route('/api/v2/').get(function(req, res) {
  res.redirect('/api/v2/discovery.xml');
});
router.route('/api/v2/discovery.:format').get(getDiscovery);
module.exports = router;
