String.prototype.toProperCase = function() {
  return this.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
var models = require('../models');
// See http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543 for details. Needs more work!
var ensureAuthorized = function(req, res, next) {
  var bearerToken;
  var bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    var bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    console.log(bearerToken);
    req.token = bearerToken;
    models.account.findOne({
      token: req.token
    }).then(function(err, user) {
      if (err) {
        res.status(403).json({
          type: 'forbidden',
          message: 'Sorry, cannot let you in'
        });
      } else {
        if (user) {
          next();
        } else {
          res.status(403).json({
            type: 'forbidden',
            message: 'User not found'
          });
        }
      }
    });
  } else {
    if (req.query.token) {
      console.log('Entered the loophole!');
      req.token = req.query.token;
      next();
    } else {
      res.status(403).json({
        type: 'forbidden',
        message: 'Sorry, cannot let you in'
      });
    }
  }
};

var ensureAdmin = function(req, res, next) {
  var bearerToken;
  var bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    var bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    req.token = bearerToken;
    models.account.findOne({
      where: {
        token: req.token,
        role: 'admin'
      }
    }).then(function(result) {
      if (result) {
        next();
      } else {
        res.status(403).json({
          type: 'forbidden',
          message: 'User not found'
        });
      }

    });
  } else {
    if (req.query.token) {
      console.log('Entered the loophole!');
      req.token = req.query.token;
      next();
    } else {
      res.status(403).json({
        type: 'forbidden',
        message: 'Sorry, cannot let you in'
      });
    }
  }
};


/**
 * Compact arrays with null entries; delete keys from objects with null value
 *
 * @param {json} data
 * @returns data with nulls removed.
 */
var removeNulls = function(data) {
  var y;
  for (var x in data) {
    y = data[x];
    if (y === "null" || y === null || y === "" || typeof y === "undefined" || (y instanceof Object && Object.keys(y).length === 0)) {
      delete data[x];
    }
    if (y instanceof Object) y = removeNulls(y);
  }
  return data;
};

exports.removeNulls = removeNulls;
exports.ensureAuthorized = ensureAuthorized;
exports.ensureAdmin = ensureAdmin;
