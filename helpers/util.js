/**
 * Helper function to propercase a string by
 * Starting with a capital and lowercasing the
 * rest.
 */
String.prototype.toProperCase = function() {
  return this.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

var models = require('../models');

/**
 * Middleware function to check if a request contains the right credentials to be
 * Authenticated. This function needs more work.
 * See http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543
 * for a possible implementation.
 */
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
    res.status(403).json({
      type: 'forbidden',
      message: 'Sorry, cannot let you in'
    });
  }
};

/**
 * Middleware to check if request contains the
 * credentials for a user that has adminstrative rights.
 * Needs more work.
 */
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
    res.status(403).json({
      type: 'forbidden',
      message: 'Sorry, cannot let you in'
    });
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
