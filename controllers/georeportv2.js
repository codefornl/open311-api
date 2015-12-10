var models = require('../models');
var express = require('express');
var util = require('../helpers/util.js');
var json2xml = require('json2xml');
var objectAssign = require('object-assign');
var router = express.Router();
var env = process.env.NODE_ENV || "development";

var getServiceList = function(req, res) {
  var format = req.params.format || 'xml';
  var whereClause = {
    where: {
      is_default: true
    }
  };
  if (req.query.jurisdiction_id) {
    whereClause = {
      where: {
        jurisdiction_id: req.query.jurisdiction_id
      }
    };
  }
  models.jurisdiction.findOne(whereClause).then(function(jurisdiction) {
    models.service.findAll({
      where: {
        jurisdictionId: jurisdiction.id
      },
      attributes: ['service_code', 'service_name', 'description', 'metadata', 'type', 'keywords', 'group']
    }).then(function(results) {
      switch (format) {
        case 'json':
          res.json(results);
          break;
        default:
          var xmlResult = results;
          var xmlServices = [];
          for (var x in xmlResult) {
            xmlServices.push({
              service: xmlResult[x].dataValues
            });
          }
          //console.log(xmlServices);
          //xmlResult.services = xmlServices;
          res.set('Content-Type', 'text/xml');
          res.send(json2xml({services: xmlServices}, {
            header: true
          }));
      }
    });
  });
};

var getServiceDefinition = function(req, res) {
  var skeleton = {
    service_definition: {
      "service_code": "FPV1",
      "attributes": [{
        "variable": true,
        "code": "WHISHETN",
        "datatype": "singlevaluelist",
        "required": true,
        "datatype_description": null,
        "order": 1,
        "description": "Hoe ernstig is de vervuiling?",
        "values": [{
          "key": 1,
          "name": "Klein, zelf verwijderd"
        }, {
          "key": 2,
          "name": "Matig, gemeentewerker gewenst"
        }, {
          "key": 3,
          "name": "Ernstig, reinigingsploeg nodig"
        }]
      }]
    }

  };
  if (req.query.jurisdiction_id) {
    console.log(req.query);
  }
  switch (req.params.format) {
    case 'xml':
      res.set('Content-Type', 'text/xml');
      res.send(json2xml(skeleton, {
        header: true
      }));
      break;
    default:
      res.json(skeleton.service_definition);
  }
  /**
   * The numbers represent the HTTP status code returned for each error type:
   * 404 - jurisdiction_id provided was not found (specify in error response)
   * 400 - jurisdiction_id was not provided (specify in error response)
   * 400 - General service error (Anything that fails during service list processing. The client will need to notify us)
   */

};

var postServiceRequest = function(req, res) {
  if (req.params.jurisdiction_id) {
    console.log(req.query);
  }
  switch (req.params.format) {
    case 'xml':
      res.set('Content-Type', 'text/xml');
      res.send(json2xml({
        service_requests: ''
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
router.route('/api/v2/services').get(getServiceList);
router.route('/api/v2/services.:format').get(getServiceList);
router.route('/api/v2/services/:service_code.:format').get(getServiceDefinition);
router.route('/api/v2/request.:format').post(postServiceRequest);
module.exports = router;
