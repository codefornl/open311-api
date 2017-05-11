var models = require('../models');
var express = require('express');
var util = require('../helpers/util.js');
var js2xmlparser = require("js2xmlparser");
var moment = require('tz-business-time');
var objectAssign = require('object-assign');
var router = express.Router();
var env = process.env.NODE_ENV || "development";

var getDiscovery = function(req, res) {
  var format = req.params.format || 'xml';
  var port = util.getConfig('remote_port') || req.app.settings.port;
  var url = req.protocol +
    '://' +
    req.hostname +
    ( port == 80 || port == 443 ? '' : ':' + port ) + '/api/v2/';
  var keyservice = req.protocol +
    '://' +
    req.hostname +
    ( port == 80 || port == 443 ? '' : ':' + port ) + '/key.html';
  var discovery = {
    "changeset": moment().format('YYYY-MM-DDTHH:mm:ssZ'),
    "contact": "You can email " + util.getConfig('email') + " for assistance",
    "key_service": "You can request a key at: " + keyservice,
    "endpoints":[{
      "specification": "http://wiki.open311.org/GeoReport_v2",
      "url": url,
      "type": env,
      "changeset": moment().format('YYYY-MM-DDTHH:mm:ssZ')
    }]
  };
  var jsonFormats = [
    'text/xml',
    'application/json'
  ];

  for (var y in discovery.endpoints) {
    discovery.endpoints[y].formats = jsonFormats;
  }

  switch (format) {
    case 'json':
      res.json(discovery);
      break;

    default:
      res.set('Content-Type', 'text/xml');
      res.send(js2xmlparser.parse("discovery", discovery,{
        arrayMap: {
          endpoints: "endpoint",
          formats: "format"
        }
      }));
  }
};

router.route('/api/').get(getDiscovery);
router.route('/api/v2/').get(function(req, res) {
  res.redirect('/api/v2/discovery.xml');
});
router.route('/api/v2/discovery.:format').get(getDiscovery);
module.exports = router;
