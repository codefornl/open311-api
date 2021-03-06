var models = require('../models');
var express = require('express');
var util = require('../helpers/util.js');
var objectAssign = require('object-assign');
var router = express.Router();
var env = process.env.NODE_ENV || "development";

var getServices = function(req, res) {
  // :input can be all, a category or a unique identifier
  var now = new Date();
  var format = req.params.format || 'xml';
  res.status(404).send({error: 'not implemented'});
};
var getFacilities = function(req, res) {
  // :input can be all, a category or a unique identifier
  var now = new Date();
  var format = req.params.format || 'xml';
  res.status(404).send({error: 'not implemented'});
};
var getFaqs = function(req, res) {
  // :input can be all, a category or a unique identifier
  var now = new Date();
  var format = req.params.format || 'xml';
  res.status(404).send({error: 'not implemented'});
};
var getRss = function(req, res) {
  // :rss should be 311today
  var now = new Date();
  var format = req.params.format || 'xml';
  res.status(404).send({error: 'not implemented'});
};

router.route('/inquiry/v2/services/:input.:format').get(getServices);
router.route('/inquiry/v2/facilities/:input.:format').get(getFacilities);
router.route('/inquiry/v2/web_faqs/:input.:format').get(getFaqs);

router.route('/inquiry/v2/:rss.rss').get(getRss);
module.exports = router;
