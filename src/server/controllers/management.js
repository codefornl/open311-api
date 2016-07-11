var models = require('../models');
var express = require('express');
var util = require('../helpers/util.js');
var middleware = require('../helpers/middleware.js');
var objectAssign = require('object-assign');
var router = express.Router();
var env = process.env.NODE_ENV || "development";

var postDiscovery = function(req, res) {
  if (req.body) {
    models.discovery.create(req.body).then(function(discovery, created) {
      if (req.body.endpoints) {
        var _endpoints = req.body.endpoints;
        for (var x in _endpoints) {
          _endpoints[x].discoveryId = discovery.id;
        }
        models.endpoint.bulkCreate(_endpoints, {
          returning: true
        }).then(function(result) {
          res.json({
            created: created
          });
        });
      }
    });
  }
};

var postJurisdiction = function(req, res) {
  models.jurisdiction.findOrCreate({
    where: {
      jurisdiction_id: req.body.jurisdiction_id,
      is_default: req.body.is_default || false
    }
  }).then(function(jurisdiction, created) {
    res.json({
      created: created
    });
  });
};

var postService = function(req, res) {
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
    req.body.jurisdictionId = jurisdiction.id;
    models.service.create(req.body).then(function(service) {
      res.json({
        created: service.id
      });
    });
  });
};

var postServiceAttributes = function(req, res) {
  if (req.params.service_code) {
    whereClause = {
      where: {
        id: req.params.service_code
      }
    };
    models.service.findOne(whereClause).then(function(service) {
      req.body.serviceId = service.id;
      models.service_attribute.create(req.body).then(function(service_attribute) {
        res.json({
          created: service_attribute.code
        });
      });
    });
  } else {
    res.status(404).json({

    });
  }
};

var postServiceAttributeValues = function(req, res) {
  if (req.params.attribute_code) {
    whereClause = {
      where: {
        code: req.params.attribute_code
      }
    };
    models.service_attribute.findOne(whereClause).then(function(service_attribute) {
      //req.body.service_attributeId = service_attribute.id;
      //check to see if the values match the given type
      var _values = []; //req.body.endpoints;
      if (Array.isArray(req.body)) {
        _values = req.body;
        for (var x in req.body) {
          _values[x].serviceAttributeId = service_attribute.id;
        }
      } else {
        req.body.serviceAttributeId = service_attribute.id;
        _values.push(req.body);
      }
      models.service_attribute_value.bulkCreate(_values, {
        returning: true
      }).then(function(result) {
        res.json({
          created: result
        });
      });
    });
  } else {
    res.status(404).json({

    });
  }
};

router.route('/api/service').post(middleware.ensureAdmin).post(postService);
router.route('/api/service/:service_code/attribute').post(middleware.ensureAdmin).post(postServiceAttributes);
router.route('/api/service/:attribute_code/values').post(middleware.ensureAdmin).post(postServiceAttributeValues);
router.route('/api/jurisdiction').post(middleware.ensureAdmin).post(postJurisdiction);
router.route('/api/discovery').post(middleware.ensureAdmin).post(postDiscovery);
module.exports = router;
