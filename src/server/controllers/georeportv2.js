var models = require('../models');
var express = require('express');
var util = require('../helpers/util.js');
var json2xml = require('json2xml');
var js2xmlparser = require("js2xmlparser");
var objectAssign = require('object-assign');
var router = express.Router();
var env = process.env.NODE_ENV || "development";

/**
 * Open311 - GET Service List
 * @see http://wiki.open311.org/GeoReport_v2/#get-service-list
 */
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
    var options = {
      attributes: [['id', 'service_code'], ['name', 'service_name'], 'description','customFields', 'keywords'],
      include: [{
        model: models.service_group,
        attributes: ['name']
      }]

    };
    if(jurisdiction){
      options.where = {
        jurisdictionId: jurisdiction.id
      };
    }

    models.service.findAll(options).then(function(results) {
      for(var i in results){
        results[i].dataValues.group = results[i].dataValues.service_group.name;

        if(results[i].dataValues.keywords) {
          var keywords = results[i].dataValues.keywords.replace(", ", ",");
          keywords = keywords.replace(",", " ");
          results[i].dataValues.keywords = keywords.split(' ');
          if(format === 'xml'){
            results[i].dataValues.keywords = results[i].dataValues.keywords.join(', ');
          }
        }

        results[i].dataValues.type = 'realtime';
        if(results[i].dataValues.customFields){
          results[i].dataValues.metadata = true;
        } else {
          results[i].dataValues.metadata = true;
        }
        delete results[i].dataValues.service_group;
        delete results[i].dataValues.customFields;
      }
      switch (format) {
        case 'json':

          res.json(results);
          break;
        default:
          var xmlResult = results;
          var xmlServices = [];
          for (var x in xmlResult) {
            xmlServices.push(xmlResult[x].dataValues);
          }
          var final = js2xmlparser("services", xmlServices, {
            arrayMap: {
              services: "service"
            }
          });
          //var final = json2xml({services: xmlServices}, {header: true});
          //console.log(xmlServices);
          //xmlResult.services = xmlServices;
          res.set('Content-Type', 'text/xml');
          res.send(final);
      }
    });
  });
};

/**
 * Open311 - GET Service Definition
 * @see http://wiki.open311.org/GeoReport_v2/#get-service-definition
 */
var getServiceDefinition = function(req, res) {
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
    var options = {
      where:{
        id: req.params.service_code
      },
      attributes: [['id', 'service_code'],['customFields', 'attributes']]
    };
    if(jurisdiction){
      options.where = {
        jurisdictionId: jurisdiction.id
      };
    }
    models.service.findOne(options).then(function(results) {
      var attributes = JSON.parse(results.dataValues.attributes);
      // format the values as "key" and "name"
      for(var j in attributes){
        if(attributes[j].values){
          for (var val in attributes[j].values){
            var tempval = attributes[j].values[val];
            attributes[j].values[val] = {"key": tempval, "name": tempval};
          }
        }
      }
      results.dataValues.attributes = attributes;
      switch (format) {
        case 'json':
          res.json(results.dataValues);
          break;
        default:
          var xmlResult = results.dataValues;
          var final = js2xmlparser("service_definition", xmlResult,{
            arrayMap: {
              values: "value",
              attributes: "attribute"
            }
          });
          //var final = json2xml({services: xmlServices}, {header: true});
          res.set('Content-Type', 'text/xml');
          res.send(final);
      }
    });
  });
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
