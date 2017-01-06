var models = require('../models');
var express = require('express');
var util = require('../helpers/util.js');
var errors = require('../helpers/errors.js');
var middleware = require('../helpers/middleware.js');
var js2xmlparser = require('js2xmlparser');
//var moment = require('moment');
var moment = require('moment-business-time');
var objectAssign = require('object-assign');
var router = express.Router();
var env = process.env.NODE_ENV || "development";
var fs = require('fs-extra');
var guess = require("guess-content-type");
/**
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
  if (address_string) {
    replacements.address_string = address_string;
    call = 'CALL `SearchAtLocation`(:orig_lat, :orig_lon, :service_id, :address_string, :tolerance)';
  }

  if (lat & lon) {
    replacements.orig_lat = lat;
    replacements.orig_lon = lon;
  }
  models.sequelize.query(call, {
    raw: true,
    replacements: replacements,
    type: models.sequelize.QueryTypes.RAW
  }).then(function(hits) {
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
      attributes: [
        ['id', 'service_code'],
        ['name', 'service_name'], 'description', 'customFields', 'keywords'
      ],
      include: [{
        model: models.service_group,
        attributes: ['name']
      }]

    };
    if (jurisdiction) {
      options.where = {
        jurisdiction_id: jurisdiction.id
      };
    } else {
      // Only get services without jurisdiction
      options.where = {
        jurisdiction_id: null
      };
    }

    models.service.findAll(options).then(function(results) {
      for (var i in results) {
        if (results[i].dataValues.service_group) {
          results[i].dataValues.group = results[i].dataValues.service_group.name;
          delete results[i].dataValues.service_group;
        }

        if (results[i].dataValues.keywords) {
          results[i].dataValues.keywords = results[i].dataValues.keywords
            .replace(/, /g, ',')
            .replace(/,/g, ' ')
            .split(' ');
            results[i].dataValues.keywords = results[i].dataValues.keywords.join(',');
        }

        results[i].dataValues.type = results[i].dataValues.type || 'realtime';
        if (results[i].dataValues.customFields) {
          results[i].dataValues.metadata = true;
        } else {
          results[i].dataValues.metadata = false;
        }

        delete results[i].dataValues.customFields;
      }
      results = util.removeNulls(results);
      switch (format) {
        case 'json':
          res.json(results);
          break;
        default:
          var final = js2xmlparser.parse("services", {"service": results});
          res.set('Content-Type', 'text/xml');
          res.send(final);
      }
    });
  }).catch(function(e) {
    //Catch any unexpected errors
    errors.catchError(req,res, e);
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
      where: {
        id: req.params.service_code
      },
      attributes: [
        ['id', 'service_code'],
        ['customFields', 'attributes']
      ]
    };
    if (jurisdiction) {
      options.where.jurisdiction_id = jurisdiction.id;
    } else {
      // Only get services without jurisdiction
      options.where.jurisdiction_id = null;
    }
    models.service.findOne(options).then(function(results) {
      if(results && results.dataValues.attributes){
        var attributes = JSON.parse(results.dataValues.attributes);
        // format the values as "key" and "name"
        for (var j in attributes) {
          if (attributes[j].values) {
            for (var val in attributes[j].values) {
              var tempval = attributes[j].values[val];
              attributes[j].values[val] = {
                "key": tempval,
                "name": tempval
              };
            }
          }
        }
        results.dataValues.attributes = attributes;
        results = util.removeNulls(results);
        switch (format) {
          case 'json':
            res.json(results);
            break;
          default:
            var final = js2xmlparser.parse("service_definition", results, {
              arrayMap: {
                values: "value",
                attributes: "attribute"
              }
            });
            res.set('Content-Type', 'text/xml');
            res.send(final);
        }
      } else {
        if(!results){
          errors.catchError(req,res, {
            "name": "ServiceError",
            "message": "The requested service doesn't exist"
          }, 404);
        } else {
          var e = {
            "name": "ServiceAttributesError",
            "message": "There requested service has no attributes"
          };
          errors.catchError(req,res, e, 400);
        }
      }
    }).catch(function(e) {
      //Catch any unexpected errors
      errors.catchError(req,res, {
        "name": "ServiceCodeError",
        "message": "No service_code, or no valid service_code provided"
      }, 400);
    });
  }).catch(function(e) {
    //Catch any unexpected errors
    errors.catchError(req,res, {
      "name": "JurisdictionError",
      "message": "No jurisdiction_id, or no valid jurisdiction_id provided"
    }, 400);
  });
};

/**
 * Open311 - GET Service Requests
 * @see http://wiki.open311.org/GeoReport_v2/#post-service-request
 */
var getServiceRequests = function(req, res) {
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
    var service_where = {
      jurisdiction_id: null
    };
    if (jurisdiction) {
      service_where = {
        jurisdiction_id: jurisdiction.id
      };
    }
    var options = {
      include: [{
        model: models.service,
        where: service_where,
        attributes: ['service_name'],
        // include: [{
        //   model: models.service_group
        // }]
      }, {
        model: models.issue,
        attributes: ['description'],
        include: [{
          model: models.media
        }]
      }, {
        model: models.person,
        attributes: ['firstname', 'middlename', 'lastname'],
        include: [{
          model: models.department,
          attributes: ['name']
        }]
      }],
      order: [
        ['enteredDate', 'DESC'],
        ['id', 'DESC']
      ]
    };
    var where;
    if (req.query.service_request_id) {
      where = where || {};
      where.id = {
        $in: util.StringToIntArray(req.query.service_request_id)
      };
    }
    if (req.query.service_code) {
      where = where || {};
      where.category_id = {
        $in: util.StringToIntArray(req.query.service_code)
      };
    }

    var datewindow;
    if (req.query.start_date) {
      datewindow = {
        $lt: req.query.start_date
      };
    }
    if (req.query.end_date) {
      datewindow = datewindow || {};
      datewindow.$gt = req.query.end_date;
    }
    if (datewindow) {
      where = where || {};
      where.enteredDate = datewindow;
    }

    if (req.query.status) {
      where = where || {};
      where.status = req.query.status;
    }
    if (req.query.page){
      //default page size = 10
      var page_size = parseInt(req.query.page_size) || 10;
      options.limit = page_size;
      if(parseInt(req.query.page) > 0){
        options.offset = (parseInt(req.query.page) - 1) * page_size || 0;
      }
    }
    if (where) {
      options.where = where;
    }
    models.request.findAll(options).then(function(results) {
      var catcher = [];
      var geojson = {type: "FeatureCollection",
        "features": []
      };
      for (var i in results) {
        var request = {};
        request.service_request_id = results[i].id;
        request.status = results[i].status;
        request.status_notes = null; //todo not implemented!

        if (results[i].service) {
          request.service_name = results[i].service.service_name;
          // if (results[i].service.service_group) {
          //   request.group = results[i].service.service_group.name;
          // }
        }

        request.service_code = results[i].category_id;
        request.description = results[i].description || null;
        if (results[i].person) {
          if (results[i].person.department) {
            request.agency_responsible = results[i].person.department.name;
          }
        }

        request.service_notice = null; //todo not implemented!

        request.requested_datetime = moment(results[i].enteredDate).format('YYYY-MM-DDTHH:mm:ssZ');
        request.updated_datetime = moment(results[i].lastModified).format('YYYY-MM-DDTHH:mm:ssZ');

        request.expected_datetime = null; //todo not implemented!
        request.address = results[i].location || null;
        request.address_id = results[i].addressId || null;
        request.zipcode = results[i].zip || null;

        request.lat = results[i].latitude;
        request.long = results[i].longitude;

        //Media and description
        var first = true;
        var extras = [];
        for (var l in results[i].issues) {
          request.description = request.description || "";
          request.description = results[i].issues[l].description;
          for (var m in results[i].issues[l].media) {
            var port = util.getConfig('remote_port') || req.app.settings.port;
            var callingUrl = req.protocol +
              '://' +
              req.hostname +
              (port == 80 || port == 443 ? '' : ':' + port) + '/media/';
              if (parseInt(m) === 0 && first){
                if (results[i].issues[l].media[m].media_type === 'url') {
                  request.media_url = results[i].issues[l].media[m].filename;
                } else {
                  request.media_url = callingUrl + moment(results[i].issues[l].media[m].uploaded).format('YYYY/M/D') +
                    "/" + results[i].issues[l].media[m].internalFilename;
                }
                first = false;
              } else {
                if (results[i].issues[l].media[m].media_type === 'url') {
                  extras.push({
                    "url":results[i].issues[l].media[m].filename,
                    "mimetype": results[i].issues[l].media[m].mime_type,
                    "uploaded": moment(results[i].issues[l].media[m].uploaded).format('YYYY-MM-DDTHH:mm:ssZ')
                  });
                } else {
                  extras.push({
                    " url": callingUrl + moment(results[i].issues[l].media[m].uploaded).format('YYYY/M/D') +
                    "/" + results[i].issues[l].media[m].internalFilename,
                    "mimetype": results[i].issues[l].media[m].mime_type,
                    "uploaded": moment(results[i].issues[l].media[m].uploaded).format('YYYY-MM-DDTHH:mm:ssZ')
                  });
                }
              }
            }
          }
        if (extras.length > 0){
          request.extended_attributes = {"attachments": extras };
        }
        if (request.description === ""){
          request.description = null;
        }
        if(format === 'geojson'){
          if(request.lat && request.long){
            var feature = {
              "type": "Feature",
              "id": request.service_request_id,
              "geometry": {
                "type": "Point",
                "coordinates":[
                  request.long,
                  request.lat
                ]
              },
            };
            delete request.lat;
            delete request.long;
            feature.properties = util.removeNulls(request);
            geojson.features.push(feature);
          }
        } else {
          catcher.push(request);
        }
      }
      catcher = util.removeNulls(catcher);
      switch (format) {
        case 'geojson':
          res.json(geojson);
          break;
        case 'json':
          res.json(catcher);
          break;
        default:
          var final = js2xmlparser.parse("service_requests", {"service_request": catcher});
          res.set('Content-Type', 'text/xml');
          res.send(final);
        }
    }).catch(function(e) {
      //Catch any unexpected errors
      errors.catchError(req,res, e);
    });
  });
};

/**
 * Open311 - POST Service Request
 * @see http://wiki.open311.org/GeoReport_v2/#post-service-request
 */
var postServiceRequest = function(req, res) {
  var format = req.params.format || 'xml';
  var ticket = {
    "category_id": parseInt(req.body.service_code, 10),
    "enteredByPerson_id": req.body.person_id,
    "client_id": req.body.application,
    "assignedPerson_id": req.body.assignee
  };
  if (req.body.lat) {
    ticket.latitude = parseFloat(req.body.lat);
  }
  if (req.body.long) {
    ticket.longitude = parseFloat(req.body.long);
  }
  if (req.body.address_string) {
    ticket.location = req.body.address_string;
  }
  if (req.body.address_id) {
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
    models.issue.create(issue).then(function(issue) {
      var curtime = moment();

      var media = {
        issue_id: issue.id,
        uploaded: curtime,
        person_id: req.body.person_id,
        internalFilename: '-',
        media_type: 'image'
      };

      if (req.file) {
        var path = require('path');
        var ext = path.extname(req.file.originalname);
        var targetPath = './media/' + curtime.format('YYYY/M/D') + "/";
        var targetFile = req.file.filename + ext;
        //move the uploaded file to the correct path (/media/year/month)
        fs.move(req.file.path, targetPath + targetFile, function(err) {
          //After move, store the corresponding media record.
          media.filename = req.file.originalname;
          media.internalFilename = targetFile;
          media.mime_type = req.file.mimetype;
          if (err) {
            // @todo res.send error
            return console.error(err);
          } else {
            models.media.create(media).then(function(media) {
              sendMail(req, res, issue);
            }); //models.media.create
          }
        }); //fs.move
      } else {
        if (req.body.media) {
          if (Array.isArray(req.body.media)) {
            var bulkmedia = [];
            for (var i = 0; i < req.body.media.length; i++){
              var _media = JSON.parse(JSON.stringify(media));
              _media.filename = req.body.media[i];
              _media.media_type = 'url';
              _media.mime_type = guess(req.body.media[i]);
              bulkmedia.push(_media);
            }
            //bulkCreate, woohooohoo!
            models.media.bulkCreate(bulkmedia).then(function(){
              sendMail(req, res, issue);
            });
          } else {
            media.filename = req.body.media;
            media.media_type = 'url';
            media.mime_type = guess(req.body.media);
            models.media.create(media).then(function(media) {
              sendMail(req, res, issue);
            });
          }
        } else {
          sendMail(req, res, issue);
        }
      }
    });
  });
};

var sendMail = function(req, res, issue) {
  var format = req.params.format || 'xml';
  var mailer = require('../helpers/mail.js');
  //We have ticket, issue, and media, plus some user details in the req object.
  //get the responsible party
  getResponsible(req, res, function(responsible) {
    var send_to = req.i18n.t('mail.system');
    var translate_string = 'service.notice-system';
    if (responsible) {
      req.to_open311 = {
        "name": responsible.name,
        "email": responsible.email
      };
      send_to = responsible.name;
      translate_string = 'service.notice-closed';
      var currtime = moment().format('YYYY-MM-DDTHH:mm:ss');
      if (moment(currtime).isWorkingDay() && moment(currtime).isWorkingTime()) {
        translate_string = 'service.notice';
      }
    } else {
      req.to_open311 = {
        "name": req.i18n.t('mail.system'),
        "email": util.getConfig('email'),
      };
    }

    var service_notice = req.i18n.t(translate_string, {
      "responsible": send_to
    });

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
        var final = js2xmlparser.parse("service_requests", results, {
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
router.route('/api/v2/requests.:format').post(middleware.processMedia, middleware.ensureApiKey, middleware.ensureIdentified, postServiceRequest);
router.route('/api/v2/request.:format').post(middleware.processMedia, middleware.ensureApiKey, middleware.ensureIdentified, postServiceRequest);

module.exports = router;
