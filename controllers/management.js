var models = require('../models');
var express = require('express');
var util = require('../helpers/util.js');
var json2xml = require('json2xml');
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
      jurisdiction_id: req.body.jurisdiction_id
    }
  }).then(function(jurisdiction, created) {
    res.json({
      created: created
    });
  });
};

var postService = function(req, res) {
  models.service.create(req.body).then(function(service, created) {
    res.json({
      created: created
    });
  });
};
router.route('/api/service').post(util.ensureAdmin).post(postService);
router.route('/api/jurisdiction').post(util.ensureAdmin).post(postJurisdiction);
router.route('/api/discovery').post(util.ensureAdmin).post(postDiscovery);
module.exports = router;
