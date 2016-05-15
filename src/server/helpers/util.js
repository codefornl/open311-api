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


exports.ensureApiKey = function(req,res,next){
  console.log(req.body);
  if(req.body.api_key){
    models.application.findOne(
      {
        where: {
          api_key: req.body.api_key
        }
      }
    ).then(function(result){
      req.body.application = result.id;
      req.body.assignee = result.contactPerson_id;
      req.body.contactmethod = result.contactMethod_id;
      next();
    });
  } else {
    res.status(403).json({
      type: 'forbidden',
      message: 'Sorry, you need to provide a valid api_key'
    });
  }
};
/**
 * Check if the issuer is known within the system.
 * Sequence:
 *   1. Email?
 *   2. Person?
 *   3. DeviceId?
 *   4. IP address

 *
 * If email is known, but person doesn't match, throw error
 * If email is unknown, and Person is unknown, add person and email and return new personid
 * If email and person match; return personid
 * If none of the above applies, set user to anonymous, (register ip?)
 */
exports.ensureIdentified = function(req, res, next) {
  var check_ip = req.ip || '0.0.0.0';
  var check_Person;
  var check_Email;
  var check_Deviceid;
  if(req.body.deviceid){
    check_Deviceid = req.body.deviceid;
  }
  if(req.body.last_name){
    check_Person = check_Person || {};
    check_Person.lastname = req.body.last_name;
  }
  if(req.body.first_name){
    check_Person = check_Person || {};
    check_Person.firstname = req.body.first_name;
  }
  if(req.body.email){
    check_Email = check_Email || req.body.email;
  }
  if(check_Email && check_Person){
    models.person.findOrCreate(
      {
        where: check_Person
      }
    ).spread(function(user, created) {
      console.log(user.id);
      console.log(created);
      models.personEmail.findOrCreate(
        {
          where: {
            person_id: user.id,
            email: check_Email
          }
        }
      ).spread(function(email, created){
        req.body.person_id = email.person_id;
        console.log(email.id);
        console.log(email.person_id);
        console.log(created);
        next();
      });
    });
  } else {
    //Anonymous
    if(check_Deviceid){

    }
  }
};

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
var getConfig = function(key) {
  var fs = require("fs");
  var config;
  var env = process.env.NODE_ENV || "development";
  if (!fs.existsSync(__dirname + '/../config.json')) {
    console.log('Warning, no config.json present. Falling back to config.default.json');
    config = require(__dirname + '/../config.default.json')[env];
  } else {
    config = require(__dirname + '/../config.json')[env];
  }
  return config[key];
};
exports.getConfig = getConfig;
exports.removeNulls = removeNulls;

exports.ensureAuthorized = ensureAuthorized;
exports.ensureAdmin = ensureAdmin;
