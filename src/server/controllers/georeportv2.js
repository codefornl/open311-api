var models = require('../models');
var express = require('express');
var util = require('../helpers/util.js');
var js2xmlparser = require("js2xmlparser");
var moment = require('moment');
var objectAssign = require('object-assign');
var router = express.Router();
var env = process.env.NODE_ENV || "development";
var multer  = require('multer');
var upload = multer({ dest: 'media/tmp/' });
var fs = require('fs-extra');

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
        if(results[i].dataValues.service_group){
          results[i].dataValues.group = results[i].dataValues.service_group.name;
        }

        if(results[i].dataValues.keywords) {
          results[i].dataValues.keywords = results[i].dataValues.keywords
            .replace(/, /g, ',')
            .replace(/,/g, ' ')
            .split(' ');
          if(format === 'xml'){
            results[i].dataValues.keywords = results[i].dataValues.keywords.join(', ');
          }
        }

        results[i].dataValues.type = 'realtime';
        if(results[i].dataValues.customFields){
          results[i].dataValues.metadata = true;
        } else {
          results[i].dataValues.metadata = false;
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
          var final = js2xmlparser("service_definition", xmlResult ,{
            arrayMap: {
              values: "value",
              attributes: "attribute"
            }
          });
          res.set('Content-Type', 'text/xml');
          res.send(final);
      }
    });
  });
};

/**
 * Open311 - GET Service Requests
 * @see http://wiki.open311.org/GeoReport_v2/#post-service-request
 */
var getServiceRequests = function(req, res) {
  var format = req.params.format || 'xml';
  var options = {
    attributes: [
      ['id', 'service_request_id'],
      ['category_id', 'service_code'],
      'status',
      ['location', 'address'],
      ['latitude', 'lat'],
      ['longitude', 'long'],
      ['enteredDate', 'requested_datetime'],
      ['lastModified', 'updated_datetime']
    ],
    include: [{
      model: models.service,
      attributes: ['service_name']
    },{
      model: models.issue,
      attributes: ['description'],
      include: [{
        model: models.media
      }]
    },{
      model: models.person,
      attributes: ['firstname', 'middlename', 'lastname'],
      include: [{
        model: models.department,
        attributes: ['name']
      }]
    }
    ],
    order: [
      ['enteredDate', 'DESC']
    ]
  };
  models.request.findAll(options).then(function(results) {
    for(var i in results){

      results[i].dataValues.requested_datetime = moment(results[i].dataValues.requested_datetime).format('YYYY-MM-DDTHH:mm:ssZ');
      results[i].dataValues.updated_datetime = moment(results[i].dataValues.updated_datetime).format('YYYY-MM-DDTHH:mm:ssZ');

      if(results[i].dataValues.person){
        if(results[i].dataValues.person.department){
          results[i].dataValues.agency_responsible = results[i].dataValues.person.department.name;
        }
        delete results[i].dataValues.person;
      }

      if(results[i].dataValues.service){
        results[i].dataValues.service_name = results[i].dataValues.service.service_name;
        delete results[i].dataValues.service;
      }

      for (var l in results[i].dataValues.issues){
        results[i].dataValues.description = results[i].dataValues.issues[l].description;
        for (var m in results[i].dataValues.issues[l].media){
          var port = req.app.settings.port || cfg.port;
          var callingUrl = req.protocol +
            '://' +
            req.hostname +
            ( port == 80 || port == 443 ? '' : ':' + port ) + '/media/';
          results[i].dataValues.media_url = callingUrl + moment(results[i].dataValues.issues[l].media[m].uploaded).format('YYYY/M/D') +
            "/" +
            results[i].dataValues.issues[l].media[m].internalFilename;
        }
      }
      delete results[i].dataValues.issues;

    }
    switch (format) {
      case 'json':
        res.json(results);
        break;
      default:
      var xmlResult = results;
      var xmlServiceRequests = [];
      for (var x in xmlResult) {
        xmlServiceRequests.push(xmlResult[x].dataValues);
      }
      var final = js2xmlparser("service_requests", xmlServiceRequests, {
        arrayMap: {
          service_requests: "request"
        }
      });
      res.set('Content-Type', 'text/xml');
      res.send(final);
    }
  });
};

/**
 * Open311 - POST Service Request
 * @see http://wiki.open311.org/GeoReport_v2/#post-service-request
 */
var postServiceRequest = function(req, res) {

  //console.log(req.body);
  var ticket = {
    "category_id": parseInt(req.body.service_code,10),
    "latitude": parseInt(req.body.lat,10),
    "longitude": parseInt(req.body.long,10),
    "enteredByPerson_id": req.body.person_id,
    "client_id": req.body.application,
    "assignedPerson_id": req.body.assignee
  };

  models.request.create(ticket).then(function(ticket) {
    //Update the corresponding issue
    var issue = {
      "ticket_id": ticket.id,
      "contacMethod_id": req.body.contactmethod,
      "longitude": parseInt(req.body.long,10),
      "reportedByPerson_id": req.body.person_id,
      "description": req.body.description
    };
    models.issue.create(issue).then(function(issue){
      var path = require('path');
      var ext = path.extname(req.file.originalname);
      var targetFile = req.file.filename + ext;
      var curtime = moment();
      var targetPath = './media/' + curtime.format('YYYY/M/D') + "/";
      //move the uploaded file to the correct path (/media/year/month)
      fs.move(req.file.path,  targetPath + targetFile, function(err){
        //After move, store the corresponding media record.
        var media = {
          issue_id: issue.id,
          filename: req.file.originalname,
          internalFilename: targetFile,
          mime_type: req.file.mime_type,
          media_type: 'image',
          uploaded: curtime,
          person_id: req.body.person_id
        };
        if (err) {
          // @todo res.send error
          return console.error(err);
        } else {
          models.media.create(media).then(function(media){
            // @todo res.send success
            console.log("success!");
          });
        }
      });
    });
  });
};

  //Validate first if the minimal set of attributes is present.
  // switch (req.params.format) {
  //   case 'xml':
  //     res.set('Content-Type', 'text/xml');
  //     res.send(js2xmlparser("service_requests", ''));
  //     break;
  //   default:
  //     res.json({});
  // }
  /**
   * The numbers represent the HTTP status code returned for each error type:
   * 404 - jurisdiction_id provided was not found (specify in error response)
   * 400 - jurisdiction_id was not provided (specify in error response)
   * 400 - General service error (Anything that fails during service list processing. The client will need to notify us)
   */

router.route('/api/v2/services').get(getServiceList);
router.route('/api/v2/services.:format').get(getServiceList);
router.route('/api/v2/services/:service_code.:format').get(getServiceDefinition);
router.route('/api/v2/requests.:format').get(getServiceRequests);
router.route('/api/v2/requests.:format').post(upload.single('media'), util.ensureApiKey, util.ensureIdentified, postServiceRequest);
router.route('/api/v2/request.:format').post(postServiceRequest);

module.exports = router;
