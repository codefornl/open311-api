var models = require('../models');
var multer  = require('multer');
var errors = require('./errors');

exports.validJurisdiction = function(req, res, next){
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
  if (req.body.jurisdiction_id) {
    whereClause = {
      where: {
        jurisdiction_id: req.body.jurisdiction_id
      }
    };
  }
  models.jurisdiction.findOne(whereClause).then(function(jurisdiction) {
    req.jurisdiction = jurisdiction;
    if(!result){
      errors.catchError(req, res, {
          "name": req.i18n.t('error.type.JurisdictionError'),
          "message": req.i18n.t('error.message.invalid_jurisdiction_id')
      }, 400);
    } else {
      next();
    }
  });
};

exports.validServiceCode = function(req,res,next){
  if(req.body.service_code || parseInt(req.body.service_code, 10) >= 0) {
    models.service.findOne(
      {
        where: {
          id: parseInt(req.body.service_code, 10)
        },
        attributes: ['id']
      }
    ).then(function(result){
      if(!result){
        errors.catchError(req, res, {
            "name": req.i18n.t('error.type.ServiceCodeError'),
            "message": req.i18n.t('error.message.invalid_service_code')
        }, 403);
      } else {
        next();
      }
    });
  } else {
    errors.catchError(req, res, {
      "name": req.i18n.t('error.type.ServiceCodeError'),
      "message": req.i18n.t('error.message.invalid_service_code')
    }, 403);
  }
};

exports.ensureApiKey = function(req,res,next){
  if(req.body.api_key){
    models.application.findOne(
      {
        where: {
          api_key: req.body.api_key
        }
      }
    ).then(function(result){
      if(!result || !result.id){
        res.status(403).json({
          type: req.i18n.t('error.type.forbidden'),
          code: 'middleware_15',
          message: req.i18n.t('error.message.invalid_api_key')
        });
        return;
      }
      req.body.application = result.id;
      req.body.assignee = result.person_id;
      next();
    });
  } else {
    res.status(403).json({
      type: req.i18n.t('error.type.forbidden'),
      code: 'middleware_26',
      message: req.i18n.t('error.message.missing_api_key')
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
  var check_Person = {};
  var check_Email;
  var name;
  if(req.body.first_name){
    check_Person = check_Person || {};
    check_Person.name = req.body.first_name;
  }
  if(req.body.last_name){
    name = check_Person || {};
    check_Person.name += " " + req.body.last_name;
  }
  if(req.body.email){
    check_Email = req.body.email;
  } else {
    check_Email = "anonymous@foo.bar";
  }

  if(!check_Person) {
    //Anonymous
    check_Person = {
      name: "Anonymous",
      username: "anonymous",
      role: "anonymous"
    };
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
    models.person.findOne({
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

exports.processMedia = function(req, res, next) {
  var m = multer({ dest: 'media/tmp/' });
  var upload = m.single('media');
  upload(req, res, function (err) {
     if (err) {
       console.log(err);
     }
     next();
   });

};
