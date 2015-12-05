var models = require('../models');
var express = require('express');
var util = require('../helpers/util.js');
var router = express.Router();

router.route('/api/users').all(util.ensureAuthorized).get(function(req, res) {
  models.User.findAll().then(function(results) {
    res.json(results);
  });
});

router.route('/api/user/:id').all(util.ensureAuthorized).get(function(req, res) {
  models.User.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(result) {
    res.json(result);
  });
});


module.exports = router;
