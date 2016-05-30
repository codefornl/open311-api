var models = require('../models');

exports.ensureApiKey = function(req,res,next){
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
  var check_Person;
  var check_Email;
  if(req.body.last_name){
    check_Person = check_Person || {};
    check_Person.lastname = req.body.last_name;
  }
  if(req.body.first_name){
    check_Person = check_Person || {};
    check_Person.firstname = req.body.first_name;
  }
  if(req.body.email && req.body.email){
    check_Email = req.body.email;
  }
  if(!req.body.email && !check_Person) {
    //Anonymous
    check_Person = {
      firstname: "Anonymous",
      username: "anonymous",
      role: "anonymous"
    };
    check_Email = "anonymous@foo.bar";
  }
  models.person.findOrCreate(
    {
      where: check_Person
    }
  ).spread(function(user, created) {
    req.body.user = user;
    models.personEmail.findOrCreate(
      {
        where: {
          person_id: user.id,
          email: check_Email
        }
      }
    ).spread(function(email, created){
      //Register/find Device and/or phone
      req.body.user.email = email;
      var device;
      if(req.body.device_id){
        device = device || {};
        if(!req.body.phone){
          device.number = req.ip;
          device.label = 'Main';
        }
        device.deviceId = req.body.device_id;

      }
      if(req.body.phone){
        device = device || {};
        if(!device.deviceId){
          device.deviceId = req.ip;
          device.label = 'Mobile';
        }
          device.number = req.body.phone;
      }
      if(device){
        device.person_id = email.person_id;
        models.personDevice.findOrCreate(
          {
            where: device
          }
        ).spread(function(device, created){
          req.body.user.device = device;
          req.body.person_id = device.person_id;
          next();
        });
      } else {
        //Register the ip address of the request.
        device = {
          number: req.ip,
          label: 'Other'
        };
        device.person_id = email.person_id;
        models.personDevice.findOrCreate(
          {
            where: device
          }
        ).spread(function(device, created){
          req.body.person_id = device.person_id;
          next();
        });
      }
    });
  });
};

/**
 * Middleware function to check if a request contains the right credentials to be
 * Authenticated. This function needs more work.
 * See http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543
 * for a possible implementation.
 */
 exports.ensureAuthorized = function(req, res, next) {
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
exports.ensureAdmin = function(req, res, next) {
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
