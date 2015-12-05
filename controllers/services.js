var models = require('../models');
var express = require('express');
var util = require('../helpers/util.js');
var json2xml = require('json2xml');
var objectAssign = require('object-assign');
var router = express.Router();

var getServices = function(req, res) {
  var options = objectAssign({}, defaults);
  switch (req.params.type) {
    case 'xml':
      res.set('Content-Type', 'text/xml');
      res.send(json2xml.xml({
        services: ''
      }, {
        header: true
      }));
      break;
    default:
      res.json({});
  }
  /**
   * The numbers represent the HTTP status code returned for each error type:
   * 404 - jurisdiction_id provided was not found (specify in error response)
   * 400 - jurisdiction_id was not provided (specify in error response)
   * 400 - General service error (Anything that fails during service list processing. The client will need to notify us)
   */

};

router.route('/api/services.:type').get(getServices);
module.exports = router;
