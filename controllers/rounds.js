var models = require('../models');
var express = require('express');
var util = require('../helpers/util.js');
var objectAssign = require('object-assign');
var router = express.Router();
var defaults = {
  attributes: [
    ['datum', 'date'],
    ['actueel', 'actual'],
    ['reden', 'reason'],
    ['bijzonderheden', 'particularities'],
  ],
  include: [{
    model: models.User,
    attributes: [
      ['real_name', 'name'],
      'credit'
    ]
  }, {
    model: models.Remark,
    attributes: [
      ['omschrijving', 'description'],
      ['bijzonderheid', 'particularity'],
    ]
  }]
};
router.route('/api/rounds').all(util.ensureAuthorized).get(function(req, res) {
  var options = objectAssign({},defaults);
  models.Round.findAll(defaults).then(function(results) {
    res.json(results);
  });
});

router.route('/api/round/:id').all(util.ensureAuthorized).get(function(req, res) {
  var options = objectAssign({
    where: {
      id: req.params.id
    }
  }, defaults);
  models.Round.findOne(options).then(function(result) {
    res.json(result);
  });
});

module.exports = router;
