var models = require('../models');
var express = require('express');
var util = require('../helpers/util.js');
var middleware = require('../helpers/middleware.js');
var js2xmlparser = require('js2xmlparser');
//var moment = require('moment');
var moment = require('moment-business-time');
var objectAssign = require('object-assign');
var router = express.Router();
var env = process.env.NODE_ENV || "development";
var multer  = require('multer');
var upload = multer({ dest: 'media/tmp/' });
var fs = require('fs-extra');

/*
 *
 *
 */
var getResponsible = function(req, res, next) {
  var format = req.params.format || 'xml';
  var lat = req.body.lat;
  var lon = req.body.long;
  var service_id = req.body.service_code || 1;
  var address_string = req.body.address_string;
  var tolerance = util.getConfig('tolerance') || 10;
  tolerance = req.body.tolerance || tolerance;

  var call = 'CALL `DepartmentsAtLocation`(:orig_lat, :orig_lon, :service_id, :tolerance)';
  var replacements = {
    service_id: service_id,
    tolerance: tolerance,
    orig_lat: 0,
    orig_lon: 0
  };
  if(address_string) {
    replacements.address_string = address_string;
    call = 'CALL `SearchAtLocation`(:orig_lat, :orig_lon, :service_id, :address_string, :tolerance)';
  }

  if(lat & lon){
    replacements.orig_lat = lat;
    replacements.orig_lon = lon;
  }
  models.sequelize.query(call,
    {
      raw: true,
      replacements: replacements,
      type: models.sequelize.QueryTypes.RAW
    }
  ).then(function(hits) {
    next(util.first(hits));
  });
 };


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
          var final = js2xmlparser.parse("services", xmlServices, {
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
  var where;
  if(req.query.service_request_id){
    where = where || {};
    where.id = {
      $in: util.StringToIntArray(req.query.service_request_id)
    };
  }
  if(req.query.service_code){
    where = where || {};
    where.category_id = {
      $in: util.StringToIntArray(req.query.service_code)
    };
  }

  var datewindow;
  if(req.query.start_date){
    datewindow = { $lt: req.query.start_date};
  }
  if(req.query.end_date){
    datewindow = datewindow || {};
    datewindow.$gt = req.query.end_date;
  }
  if(datewindow){
    where = where || {};
    where.enteredDate = datewindow;
  }

  if(req.query.status){
    where = where || {};
    where.status = req.query.status;
  }
  if(where){
    options.where = where;
  }
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
          var port = util.getConfig('remote_port') || req.app.settings.port;
          if(results[i].issues[l].media[m].media_type === 'url'){
            results[i].dataValues.media_url = results[i].issues[l].media[m].filename;
          } else {
            var callingUrl = req.protocol +
              '://' +
              req.hostname +
              ( port == 80 || port == 443 ? '' : ':' + port ) + '/media/';
            results[i].dataValues.media_url = callingUrl + moment(results[i].dataValues.issues[l].media[m].uploaded).format('YYYY/M/D') +
            "/" + results[i].dataValues.issues[l].media[m].internalFilename;
          }
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
  console.log(req.body.media);
  console.log(req.file);
  console.log(req.files);
  var format = req.params.format || 'xml';
  var ticket = {
    "category_id": parseInt(req.body.service_code,10),
    "latitude": 0,
    "longitude": 0,
    "enteredByPerson_id": req.body.person_id,
    "client_id": req.body.application,
    "assignedPerson_id": req.body.assignee
  };
  if(req.body.lat){
    ticket.latitude = parseFloat(req.body.lat);
  }
  if(req.body.long){
    ticket.longitude = parseFloat(req.body.lat);
  }
  if(req.body.address_string){
    ticket.location = req.body.address_string;
  }
  if(req.body.address_id){
    ticket.addressId = req.body.address_id;
  }

  models.request.create(ticket).then(function(ticket) {
    //Update the corresponding issue
    var issue = {
      "ticket_id": ticket.id,
      "contacMethod_id": req.body.contactmethod,
      "reportedByPerson_id": req.body.person_id,
      "description": req.body.description
    };
    models.issue.create(issue).then(function(issue){
      if(req.file){
        //media attached
        postWithMedia(req,res,issue); //todo ```then``` instead of duplicate code.
      } else {
        if(req.body.media){
          console.log('Gonna post with media url');
          postWithMediaUrl(req,res,issue); //todo ```then``` instead of duplicate code.
        } else {
          postTextOnly(req,res,issue);
        }
      }

    }); //models.issue.create
  });
};
postWithMediaUrl = function(req,res,issue){
  var format = req.params.format || 'xml';
  var curtime = moment();
  var media = {
    issue_id: issue.id,
    filename: req.body.media,
    internalFilename: '-',
    media_type: 'url',
    uploaded: curtime,
    person_id: req.body.person_id
  };
  models.media.create(media).then(function(media){
    var mailer = require('../helpers/mail.js');
    //We have ticket, issue, and media, plus some user details in the req object.
    //get the responsible party
    getResponsible(req,res,function(responsible){
      var send_to = req.i18n.t('mail.system');
      var translate_string = 'service.notice-system';
      if(responsible){
        req.to_open311 = {
          "name": responsible.name,
          "email": responsible.email
        };
        send_to = responsible.name;
        translate_string = 'service.notice-closed';
        var currtime = moment().format('YYYY-MM-DDTHH:mm:ss');
        if(moment(currtime).isWorkingDay() && moment(currtime).isWorkingTime()){
          translate_string = 'service.notice';
        }
      } else {
        req.to_open311 = {
          "name": req.i18n.t('mail.system'),
          "email": util.getConfig('email'),
        };
      }

      var service_notice = req.i18n.t(translate_string,
        {
          "responsible": send_to
        }
      );

      mailer.newRequest(req, issue.ticket_id);
      var results = [{
        "service_request_id": issue.ticket_id,
        "service_notice": service_notice,
        "account_id": null
      }];
      switch (format) {
        case 'json':
          res.json(results);
          break;
        default:
          var xmlServiceRequests = results;
          var final = js2xmlparser("service_requests", xmlServiceRequests, {
            arrayMap: {
              service_requests: "request"
            }
          });
          res.set('Content-Type', 'text/xml');
          res.send(final);
        }
      }); //getResponsible
    }); //models.media.create
};
postWithMedia = function(req,res,issue){
  var format = req.params.format || 'xml';
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
        var mailer = require('../helpers/mail.js');
        //We have ticket, issue, and media, plus some user details in the req object.
        //get the responsible party
        getResponsible(req,res,function(responsible){
          var send_to = req.i18n.t('mail.system');
          var translate_string = 'service.notice-system';
          if(responsible){
            req.to_open311 = {
              "name": responsible.name,
              "email": responsible.email
            };
            send_to = responsible.name;
            translate_string = 'service.notice-closed';
            var currtime = moment().format('YYYY-MM-DDTHH:mm:ss');
            if(moment(currtime).isWorkingDay() && moment(currtime).isWorkingTime()){
              translate_string = 'service.notice';
            }
          } else {
            // A responsible party could not be found, route to system.
            req.to_open311 = {
              "name": req.i18n.t('mail.system'),
              "email": util.getConfig('email'),
            };
          }

          var service_notice = req.i18n.t(translate_string,
            {
              "responsible": send_to
            }
          );

          mailer.newRequest(req, issue.ticket_id);
          var results = [{
            "service_request_id": issue.ticket_id,
            "service_notice": service_notice,
            "account_id": null
          }];
          switch (format) {
            case 'json':
              res.json(results);
              break;
            default:
            var xmlServiceRequests = results;
            var final = js2xmlparser("service_requests", xmlServiceRequests, {
              arrayMap: {
                service_requests: "request"
              }
            });
            res.set('Content-Type', 'text/xml');
            res.send(final);
          }
        }); //getResponsible
      }); //models.media.create
    }
  }); //fs.move
};
postTextOnly = function(req,res,issue){
  var format = req.params.format || 'xml';
  var mailer = require('../helpers/mail.js');
  //We have ticket, issue, and media, plus some user details in the req object.
  //get the responsible party
  getResponsible(req,res,function(responsible){
    var send_to = req.i18n.t('mail.system');
    var translate_string = 'service.notice-system';
    if(responsible){
      req.to_open311 = {
        "name": responsible.name,
        "email": responsible.email
      };
      send_to = responsible.name;
      translate_string = 'service.notice-closed';
      var currtime = moment().format('YYYY-MM-DDTHH:mm:ss');
      if(moment(currtime).isWorkingDay() && moment(currtime).isWorkingTime()){
        translate_string = 'service.notice';
      }
    } else {
      // A responsible party could not be found, route to system.
      req.to_open311 = {
        "name": req.i18n.t('mail.system'),
        "email": util.getConfig('email'),
      };
    }

    var service_notice = req.i18n.t(translate_string,
      {
        "responsible": send_to
      }
    );

    mailer.newRequest(req, issue.ticket_id);
    var results = [{
      "service_request_id": issue.ticket_id,
      "service_notice": service_notice,
      "account_id": null
    }];
    switch (format) {
      case 'json':
        res.json(results);
        break;
      default:
        var xmlServiceRequests = results;
        var final = js2xmlparser("service_requests", xmlServiceRequests, {
          arrayMap: {
            service_requests: "request"
          }
        });
        res.set('Content-Type', 'text/xml');
        res.send(final);
    }
  }); //getResponsible
};
router.route('/api/v2/services').get(getServiceList);
router.route('/api/v2/services.:format').get(getServiceList);
router.route('/api/v2/services/:service_code.:format').get(getServiceDefinition);
router.route('/api/v2/requests.:format').get(getServiceRequests);
router.route('/api/v2/requests.:format').post(upload.single('media'), middleware.ensureApiKey, middleware.ensureIdentified, postServiceRequest);
router.route('/api/v2/request.:format').post(upload.single('media'), middleware.ensureApiKey, middleware.ensureIdentified, postServiceRequest);

module.exports = router;
